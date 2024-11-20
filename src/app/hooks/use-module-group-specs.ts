import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { queryKeys } from "../data/query-keys";
import {
  getModuleGroupSpecs,
  addModuleGroupSpec,
  deleteModuleGroupSpec,
} from "../api/module-group-spec-module-specs/[id]";
import { ModuleSpec } from "../data/typings";

export function useModuleGroupSpecs(id: number) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: moduleGroupSpecs,
  } = useQuery<ModuleSpec[]>({
    queryKey: [queryKeys.moduleGroupSpecs, id],
    queryFn: () => getModuleGroupSpecs(id),
    initialData: () => {
      // Get cached data to minimize initial loading
      return queryClient.getQueryData<ModuleSpec[]>([
        queryKeys.moduleGroupSpecs,
        id,
      ]);
    },
  });

  // Add a new module spec mutation and invalidate query
  const addModuleSpecMutation = useMutation({
    mutationFn: (newSpec: ModuleSpec) =>
      addModuleGroupSpec(id, newSpec.module_spec_id),
    onMutate: async (newSpec: ModuleSpec) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.moduleGroupSpecs, id],
      });
      //previos module group spec //before the mutation
      const previousModuleGroupSpecs = queryClient.getQueryData<ModuleSpec[]>([
        queryKeys.moduleGroupSpecs,
        id,
      ]);
      //optimistic update to the new spec
      queryClient.setQueryData<ModuleSpec[]>(
        [queryKeys.moduleGroupSpecs, id],
        (old = []) => [...old, newSpec]
      );
      return { previousModuleGroupSpecs };
    },
    onError: (err, newSpec, context) => {
      queryClient.setQueryData<ModuleSpec[]>(
        [queryKeys.moduleGroupSpecs, id],
        context?.previousModuleGroupSpecs
      );
      console.error("Error adding module spec:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.moduleGroupSpecs, id],
      });
    },
  });

  const deleteModuleSpecMutation = useMutation({
    mutationFn: (id: number) => deleteModuleGroupSpec(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.moduleGroupSpecs, id],
      });
      const previousModuleGroupSpecs = queryClient.getQueryData<ModuleSpec[]>([
        queryKeys.moduleGroupSpecs,
        id,
      ]);
      queryClient.setQueryData<ModuleSpec[]>(
        [queryKeys.moduleGroupSpecs, id],
        (old = []) => old.filter((spec) => Number(spec.id) !== id)
      );
      return { previousModuleGroupSpecs };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData<ModuleSpec[]>(
        [queryKeys.moduleGroupSpecs, id],
        context?.previousModuleGroupSpecs
      );
      console.error("Error deleting module spec:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.moduleGroupSpecs, id],
      });
    },
  });

  return {
    moduleGroupSpecs,
    isLoading,
    error,
    addModuleSpec: addModuleSpecMutation.mutate,
    deleteModuleSpec: deleteModuleSpecMutation.mutate,
  };
}
