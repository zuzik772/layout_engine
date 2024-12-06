import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { queryKeys } from "../data/query-keys";
import { getModuleGroupSpecs, addModuleGroupSpec, deleteModuleGroupSpec, updateModuleGroupSpec } from "../api/module-group-specs/[id]";
import { ModuleSpec } from "../data/typings";

export function useModuleGroupSpecs(id: number) {
  const queryClient = useQueryClient();
  const queryKey = [queryKeys.moduleGroupSpecs, id];
  const {
    isLoading,
    error,
    data: moduleGroupSpecs,
  } = useQuery<ModuleSpec[]>({
    queryKey,
    queryFn: () => getModuleGroupSpecs(id),
    initialData: () => {
      const cachedData = queryClient.getQueryData<ModuleSpec[]>(queryKey);
      return cachedData;
    },
  });

  // Add a new module spec mutation and invalidate query
  const addModuleSpecMutation = useMutation({
    mutationFn: (newSpec: ModuleSpec) => addModuleGroupSpec(id, newSpec.module_spec_id),
    onMutate: async (newSpec: ModuleSpec) => {
      await queryClient.cancelQueries({
        queryKey,
      });
      //previos module group spec //before the mutation
      const previousModuleGroupSpecs = queryClient.getQueryData<ModuleSpec[]>(queryKey);
      //optimistic update to the new spec
      const setdData = queryClient.setQueryData<ModuleSpec[]>(queryKey, (old = []) => [...old, newSpec]);
      console.log("setdData", setdData);
      return { previousModuleGroupSpecs };
    },
    onError: (err, newSpec, context) => {
      queryClient.setQueryData<ModuleSpec[]>(queryKey, context?.previousModuleGroupSpecs);
      console.error("Error adding module spec:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const deleteModuleSpecMutation = useMutation({
    mutationFn: (id: number) => deleteModuleGroupSpec(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const previousModuleGroupSpecs = queryClient.getQueryData<ModuleSpec[]>(queryKey);
      queryClient.setQueryData<ModuleSpec[]>(queryKey, (old = []) => old.filter((spec) => Number(spec.id) !== id));
      return { previousModuleGroupSpecs };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData<ModuleSpec[]>(queryKey, context?.previousModuleGroupSpecs);
      console.error("Error deleting module spec:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const updateModuleSpecMutation = useMutation({
    mutationFn: (spec: ModuleSpec) => updateModuleGroupSpec(spec),
    onMutate: async (spec: ModuleSpec) => {
      await queryClient.cancelQueries({
        queryKey,
      });
      console.log("cancel queries", spec, id, spec.disabled);
      const previousModuleGroupSpecs = queryClient.getQueryData<ModuleSpec[]>(queryKey);
      queryClient.setQueryData<ModuleSpec[]>(queryKey, (old = []) => old.map((s) => (s.id === spec.id ? { ...s, disabled: spec.disabled } : s)));
      console.log("previousModuleGroupSpecs", previousModuleGroupSpecs);
      return { previousModuleGroupSpecs };
    },
    onError: (err, spec, context) => {
      queryClient.setQueryData<ModuleSpec[]>(queryKey, context?.previousModuleGroupSpecs);
      console.error("Error updating module spec:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
  return {
    moduleGroupSpecs,
    isLoading,
    error,
    addModuleSpec: addModuleSpecMutation.mutate,
    deleteModuleSpec: deleteModuleSpecMutation.mutate,
    updateModuleSpec: updateModuleSpecMutation.mutate,
  };
}
