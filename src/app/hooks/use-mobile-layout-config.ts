import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MobileLayoutConfig } from "../data/typings";
import {
  addMobileConfig,
  getMobileConfig,
} from "../api/mobile-layout-configuration/[id]";
import { queryKeys } from "../data/query-keys";

export function useMobileLayoutConfig(id: number) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: mobileConfig,
  } = useQuery<MobileLayoutConfig>({
    queryKey: [queryKeys.mobileLayoutConfig, id],
    queryFn: () => getMobileConfig(id),
    initialData: () => {
      const cachedData = queryClient.getQueryData<MobileLayoutConfig[]>([
        queryKeys.mobileLayoutConfig,
        id,
      ]);
      console.log(cachedData?.find((config) => config.spec_id === id));
      return cachedData?.find((config) => config.spec_id === id);
    },
  });

  // Add a new mobile layout config mutation and invalidate query
  const addMobileConfigMutation = useMutation({
    mutationFn: (newConfig: MobileLayoutConfig) =>
      addMobileConfig(id, newConfig),
    onMutate: async (newConfig: MobileLayoutConfig) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.mobileLayoutConfig, id],
      });

      console.log("newConfig", newConfig);
      const previousMobileConfig = queryClient.getQueryData<MobileLayoutConfig>(
        [queryKeys.mobileLayoutConfig, id]
      );
      queryClient.setQueryData<MobileLayoutConfig>(
        [queryKeys.mobileLayoutConfig, id],
        newConfig
      );
      return { previousMobileConfig };
    },
    onError: (err, newConfig, context) => {
      queryClient.setQueryData<MobileLayoutConfig>(
        [queryKeys.mobileLayoutConfig, id],
        context?.previousMobileConfig
      );
      console.error("Error adding mobile config:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.mobileLayoutConfig, id],
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
