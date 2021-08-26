import { Box, Skeleton, LinkBox, LinkOverlay } from "@chakra-ui/react";
import * as React from "react";
import { useGroup } from "../../lib/hooks/useGroup";
import { PropsWithChildren } from "react";
import NextLink from "next/link";
import { extractGroupName } from "../../lib/domain/extractGroupName";

export type RowItemProps = { name: string };
export const RowItem = ({ name }: RowItemProps) => {
  const { group, loading } = useGroup(name);

  return (
    <LoadingWrapper loading={loading}>
      <LinkBox>
        <Box p={2}>
          <NextLink
            href={{
              pathname: "/groups/[name]",
              query: { name: extractGroupName(name) },
            }}
            passHref
          >
            <LinkOverlay>{group?.displayName}</LinkOverlay>
          </NextLink>
        </Box>
      </LinkBox>
    </LoadingWrapper>
  );
};

const LoadingWrapper = ({
  loading,
  children,
}: PropsWithChildren<{ loading: boolean }>) => {
  if (loading) {
    return <Skeleton>{children}</Skeleton>;
  } else {
    return <>{children}</>;
  }
};
