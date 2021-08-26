import { NextPage } from "next";
import {
  Box,
  Button,
  useBoolean,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Card } from "../components/Card";
import { HiPencilAlt, HiX } from "react-icons/hi";
import { CardHeader } from "../components/profile/CardHeader";
import { CardContent } from "../components/profile/CardContent";
import { Property } from "../components/profile/Property";
import { ProfileForm } from "../components/profile/ProfileForm";
import { useUser } from "../lib/hooks/useUser";
import { useEffect } from "react";
import Link from "next/link";

const Profile: NextPage = () => {
  const { userState, user, revalidate } = useUser();

  const [editMode, setEditMode] = useBoolean();

  useEffect(() => {
    if (userState === "INCOMPLETE_PROFILE") {
      setEditMode.on();
    }
  }, [userState, setEditMode]);

  const toast = useToast();
  const updateCompleted = () => {
    setEditMode.off();
    revalidate().catch((err) => console.error(err));
    toast({
      title: "Account updated.",
      description: "We've updated your account for you.",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  };

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.100", "inherit")}
      py="12"
      px={{ md: "8" }}
    >
      <Card maxW="3xl" mx="auto">
        <CardHeader
          title="Profile Info"
          action={
            <Button
              onClick={setEditMode.toggle}
              variant="outline"
              minW="20"
              leftIcon={editMode ? <HiX /> : <HiPencilAlt />}
            >
              Edit
            </Button>
          }
        />
        <CardContent>
          {editMode ? (
            <ProfileForm updateCompleted={updateCompleted} />
          ) : (
            <>
              <Property label="Username" value={user?.name} />
              <Property label="Name" value={user?.displayName} />
              <Property label="Email" value={user?.email} />
            </>
          )}
        </CardContent>
        <Link href={`/home`} passHref>
          <Button mt="8" as="a" size="lg" colorScheme="green" fontWeight="bold">
            Back to home
          </Button>
        </Link>
      </Card>
    </Box>
  );
};

export default Profile;
