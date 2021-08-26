export const GROUP_INVITATION_STATE = [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
] as const;
export type GroupInvitationState = typeof GROUP_INVITATION_STATE[number];

export type GroupInvitation = {
  name: string;
  group: string;
  state: GroupInvitationState;
  createTime: string;
  updateTime: string;
  aggregateVersion: number;
  etag: string;
};
