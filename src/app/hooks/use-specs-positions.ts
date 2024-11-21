import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../data/query-keys";

import { SpecPosition } from "../data/typings";
import { getSpecsPositions } from "../api/specs-positions/[id]";

export function useSpecsPositions(id: number) {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<SpecPosition[]>({
    queryKey: [queryKeys.specsPositions, id],
    queryFn: () => getSpecsPositions(id),
    initialData: () => {
      return queryClient.getQueryData<SpecPosition[]>([queryKeys.specsPositions, id]);
    },
  });

  return { isLoading, error, specsPositions: data };
}
