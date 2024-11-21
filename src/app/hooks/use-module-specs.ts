import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../data/query-keys";

import { ModuleSpec } from "../data/typings";
import { getModuleSpecs } from "../api/module-specs";

export function useModuleSpecs() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<ModuleSpec[]>({
    queryKey: [queryKeys.moduleSpecs],
    queryFn: getModuleSpecs,
    initialData: () => {
      return queryClient.getQueryData([queryKeys.moduleSpecs]);
    },
  });

  return { isLoading, error, moduleSpecs: data };
}
