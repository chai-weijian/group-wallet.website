import { CurrencyCode } from "../../config/currencyCode";

export const GROUP_STATE = ["ACTIVE", "DELETED"] as const;
export type GroupState = typeof GROUP_STATE[number];

export type Group = {
  name: string;
  displayName: string;
  owner: string;
  state: GroupState;
  members: string[];
  currencyCode: CurrencyCode;
  createTime: string;
  aggregateVersion: number;
  etag: string;
};
