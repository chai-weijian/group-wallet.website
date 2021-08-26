import { Button, Flex, Spacer, Text, useToast } from "@chakra-ui/react";
import * as React from "react";
import { GroupInvitation } from "../../lib/domain/group-invitation-type";
import { mutate } from "swr";
import { useUser } from "../../lib/hooks/useUser";
import { buildGroupInvitationsUrl } from "../../lib/hooks/useGroupInvitation";

export type RowItemProps = { groupInvitation: GroupInvitation };
export const RowItem = ({ groupInvitation }: RowItemProps) => {
  const { revalidate: revalidateUser, user } = useUser();
  const toast = useToast();
  const accept = () => {
    fetch(`http://localhost:8080/v1/${groupInvitation.name}:accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        groupInvitation: {
          name: groupInvitation.name,
          etag: groupInvitation.etag,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Group invitation accepted.",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          revalidateUser().catch((err) => console.error(err));
          if (user?.name) {
            mutate(buildGroupInvitationsUrl(user.name)).catch((err) =>
              console.error(err)
            );
          }
        }
      })
      .catch(() => {
        toast({
          title: "Please try again.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };
  const reject = () => {
    fetch(`http://localhost:8080/v1/${groupInvitation.name}:reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        groupInvitation: {
          name: groupInvitation.name,
          etag: groupInvitation.etag,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Group invitation rejected.",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          if (user?.name) {
            mutate(buildGroupInvitationsUrl(user.name)).catch((err) =>
              console.error(err)
            );
          }
        }
      })
      .catch(() => {
        toast({
          title: "Please try again.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex color="white" p={3} gap={3}>
      <Text color={`black`}>{groupInvitation.group}</Text>
      <Spacer />
      <Button colorScheme={`green`} size={`sm`} mr={3} onClick={accept}>
        Accept
      </Button>
      <Button colorScheme={`red`} size={`sm`} onClick={reject}>
        Reject
      </Button>
    </Flex>
  );
};
