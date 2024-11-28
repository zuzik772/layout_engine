import { QueryClient, QueryClientContext } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    //Query instances via useQuery or useInfiniteQuery by default consider cached data as stale.

    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        //Queries that fail are silently retried 3 times, with exponential backoff delay, we want to disable this.
        retry: false,
        //By default, staleTime is set to 0, meaning data is immediately considered stale after it is fetched.
        //We want to reduce the frequency of network requests, because data doesn’t need to be constantly refreshed
        //we set this to 5 minutes --> MAYBE WE CAN ADJUST THIS LATER ONCE WE GET MORE DATA UDPATES
        staleTime: 1000 * 60 * 5, // 5 minutes
        //By default, "inactive" queries are garbage collected after 5 minutes.
        //This means gcTime is set to 5 minutes, meaning that inactive queries are garbage collected after 5 minutes.
        //https://tanstack.com/query/v5/docs/framework/react/guides/caching
        gcTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  });
  return <QueryClientContext.Provider value={queryClient}>{children}</QueryClientContext.Provider>;
};
