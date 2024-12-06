import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../data/query-keys";

import { SpecPosition } from "../data/typings";
import { getSpecsPositions, updateSpecsPositions } from "../api/specs-positions/[id]";

export function useSpecsPositions(id: number) {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<SpecPosition[]>({
    queryKey: [queryKeys.specsPositions, id],
    queryFn: () => getSpecsPositions(id),
    initialData: () => {
      return queryClient.getQueryData<SpecPosition[]>([queryKeys.specsPositions, id]);
    },
  });

  // update specs positions
  const updateSpecsPositionsMutation = useMutation({
    mutationFn: (newSpecPosition: SpecPosition[]) => updateSpecsPositions(id, newSpecPosition),
    onMutate: async (newSpecPosition: SpecPosition[]) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.specsPositions, id],
      });
      const previousSpecPosition = queryClient.getQueryData<SpecPosition[]>([queryKeys.specsPositions, id]);
      //optimistic update to the new position
      queryClient.setQueryData<SpecPosition[]>([queryKeys.specsPositions, id], newSpecPosition);
      return { previousSpecPosition };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData<SpecPosition[]>([queryKeys.specsPositions, id], context?.previousSpecPosition);
      console.error("Error updating specs positions:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.specsPositions, id],
      });
    },
  });

  return {
    isLoading,
    error,
    specsPositions: data,
    updateSpecsPositions: updateSpecsPositionsMutation.mutate,
  };
}
