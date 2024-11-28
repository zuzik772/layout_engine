import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MobileLayoutConfig } from "../data/typings";
import { addMobileConfig, getMobileConfig } from "../api/mobile-layout-configuration/[id]";
import { queryKeys } from "../data/query-keys";

export function useMobileLayoutConfig(id: number) {
  const queryClient = useQueryClient();
  const queryKey = [queryKeys.mobileLayoutConfig, id];
  const {
    isLoading,
    error,
    data: mobileConfig,
  } = useQuery<MobileLayoutConfig>({
    queryKey: queryKey,
    queryFn: () => getMobileConfig(id),
    initialData: () => {
      const cachedData = queryClient.getQueryData<MobileLayoutConfig>(queryKey);
      console.log("cachedData", cachedData);
      return cachedData;
    },
  });

  // Add a new mobile layout config mutation and invalidate query
  const addMobileConfigMutation = useMutation({
    mutationFn: (newConfig: MobileLayoutConfig) => addMobileConfig(id, newConfig),
    onMutate: async (newConfig: MobileLayoutConfig) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      console.log("newConfig", newConfig);
      const previousMobileConfig = queryClient.getQueryData<MobileLayoutConfig>(queryKey);
      queryClient.setQueryData<MobileLayoutConfig>(queryKey, newConfig);
      return { previousMobileConfig };
    },
    onError: (err, newConfig, context) => {
      queryClient.setQueryData<MobileLayoutConfig>(queryKey, context?.previousMobileConfig);
      console.error("Error adding mobile config:", err);
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
    mobileConfig,
    addMobileConfiguration: addMobileConfigMutation.mutate,
  };
}
