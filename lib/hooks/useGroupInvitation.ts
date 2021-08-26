import useSWR from "swr";

import { fetcher } from "../StandardAPIFetcher";
import { GroupInvitation } from "../domain/group-invitation-type";
import { useEffect, useState } from "react";

export const buildGroupInvitationsUrl = (user: string) => {
  return `http://localhost:8080/v1/${user}/groupInvitations`;
};

export const useGroupInvitation = (user?: string) => {
  const {
    data,
    error,
    isValidating: loading,
  } = useSWR<{ groupInvitations: GroupInvitation[]; nextPageToken: string }>(
    () => (user ? buildGroupInvitationsUrl(user) : null),
    fetcher
  );

  const [groupInvitations, setGroupInvitations] = useState<GroupInvitation[]>(
    []
  );
  useEffect(() => {
    if (data) {
      setGroupInvitations(data.groupInvitations);
    }
  }, [data]);

  return { groupInvitations, error, loading };
};
