import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../data/query-keys";

import { ModuleGroup } from "../data/typings";
import { getModuleGroups } from "../api/module-groups";

export function useModuleGroups() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<ModuleGroup[]>({
    queryKey: [queryKeys.moduleGroups],
    queryFn: getModuleGroups,
    initialData: () => {
      return queryClient.getQueryData([queryKeys.moduleGroups]);
    },
  });

  return { isLoading, error, moduleGroups: data };
}
