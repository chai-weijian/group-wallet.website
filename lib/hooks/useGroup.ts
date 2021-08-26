import useSWR from "swr";
import { Group } from "../domain/group-type";

import { fetcher } from "../StandardAPIFetcher";

export const useGroup = (name?: string) => {
  const {
    data: group,
    error,
    isValidating: loading,
  } = useSWR<Group>(
    () => (name ? `http://localhost:8080/v1/${name}` : null),
    fetcher
  );

  return { group, error, loading };
};
