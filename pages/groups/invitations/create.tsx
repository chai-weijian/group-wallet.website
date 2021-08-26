import { NextPage } from "next";
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Card } from "../../../components/Card";

type GroupFormData = {
  user: string;
  group: string;
};

const Create: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<GroupFormData>({ mode: "onChange" });

  const toast = useToast();
  const createGroup = (formData: GroupFormData) => {
    fetch(`http://localhost:8080/v1/${formData.user}/groupInvitations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        groupInvitation: {
          group: formData.group,
        },
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error: any = new Error(
            "An error occurred while fetching the data."
          );
          // Attach extra info to the error object.
          error.status = await res.json();
          throw error;
        }

        toast({
          title: "Group invitation sent.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error.status);
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
        <chakra.form px="6" py="4" onSubmit={handleSubmit(createGroup)}>
          <Stack spacing="6">
            <Heading as="h2" fontSize="lg">
              Invite user
            </Heading>
            <FormControl
              id="group"
              isInvalid={errors.group && dirtyFields.group}
            >
              <FormLabel>Group</FormLabel>
              <Input
                {...register("group", { required: true })}
                group="group"
                type="text"
              />
              <FormErrorMessage>
                {errors.group && `Group is required`}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="user" isInvalid={errors.user && dirtyFields.user}>
              <FormLabel>User</FormLabel>
              <Input
                {...register("user", { required: true })}
                name="user"
                type="text"
              />
              <FormErrorMessage>
                {errors.user && `User is required`}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
              Submit
            </Button>
          </Stack>
        </chakra.form>
      </Card>
    </Box>
  );
};

export default Create;
