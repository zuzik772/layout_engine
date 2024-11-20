import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../data/query-keys";
import { getModuleGroups } from "../api/module-group-specs";

export function useModuleGroups() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: [queryKeys.moduleGroups],
    queryFn: getModuleGroups,
    initialData: () => {
      return queryClient.getQueryData([queryKeys.moduleGroups]);
    },
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!isLoading && !error) {
    return data;
  }
}
