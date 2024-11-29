import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DesktopLayoutConfig } from "../data/typings";
import { addDesktopConfig, getDesktopConfig, updateDesktopConfig } from "../api/desktop-layout-configuration/[id]";
import { queryKeys } from "../data/query-keys";

export function useDesktopLayoutConfig(id: number) {
  const queryClient = useQueryClient();
  const queryKey = [queryKeys.desktopLayoutConfig, id];
  const {
    isLoading,
    error,
    data: desktopConfig,
  } = useQuery<DesktopLayoutConfig>({
    queryKey: queryKey,
    queryFn: () => getDesktopConfig(id),
    initialData: () => {
      const cachedData = queryClient.getQueryData<DesktopLayoutConfig>(queryKey);
      return cachedData;
    },
  });

  // Add a new desktop layout config mutation and invalidate query
  const addDesktopConfigMutation = useMutation({
    mutationFn: (newConfig: DesktopLayoutConfig) => addDesktopConfig(id, newConfig),
    onMutate: async (newConfig: DesktopLayoutConfig) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      console.log("newConfig", newConfig);
      const previousDesktopConfig = queryClient.getQueryData<DesktopLayoutConfig>(queryKey);
      queryClient.setQueryData<DesktopLayoutConfig>(queryKey, newConfig);
      return { previousDesktopConfig };
    },
    onError: (err, newConfig, context) => {
      queryClient.setQueryData<DesktopLayoutConfig>(queryKey, context?.previousDesktopConfig);
      console.error("Error adding desktop config:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const updateDesktopConfigMutation = useMutation({
    mutationFn: (newConfig: DesktopLayoutConfig) => updateDesktopConfig(id, newConfig),
    onMutate: async (newConfig: DesktopLayoutConfig) => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const previousDesktopConfig = queryClient.getQueryData<DesktopLayoutConfig>(queryKey);
      queryClient.setQueryData<DesktopLayoutConfig>(queryKey, newConfig);
      return { previousDesktopConfig };
    },
    onError: (err, newConfig, context) => {
      queryClient.setQueryData<DesktopLayoutConfig>(queryKey, context?.previousDesktopConfig);
      console.error("Error updating desktop config:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  return {
    isLoading,
    error,
    desktopConfig,
    addDesktopConfiguration: addDesktopConfigMutation.mutate,
    updateDesktopConfiguration: updateDesktopConfigMutation.mutate,
  };
}
