import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as React from "react";
import { useUser } from "../../lib/hooks/useUser";
import { extractUsername } from "../../lib/domain/extractUsername";

type ProfileFormData = {
  username: string;
  name: string;
  email: string;
};

type ProfileFormProps = {
  updateCompleted: () => void;
};
export const ProfileForm = ({ updateCompleted }: ProfileFormProps) => {
  const { firebaseUser, user, userState } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<ProfileFormData>({ mode: "onChange" });

  const updateProfile = (formData: ProfileFormData) => {
    fetch(`http://localhost:8080/v1/users/${formData.username}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          uid: firebaseUser?.uid,
          displayName: formData.name,
          email: formData.email,
          etag: user?.etag,
        },
        updateMask: "email,displayName",
        allowMissing: true,
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

        updateCompleted();
      })
      .catch((error) => {
        console.error(error.status);
      });
  };

  return (
    <chakra.form px="6" py="4" onSubmit={handleSubmit(updateProfile)}>
      <Stack spacing="6">
        <FormControl
          id="username"
          isInvalid={errors.username && dirtyFields.username}
        >
          <FormLabel>Username</FormLabel>
          <Input
            {...register("username", { required: true })}
            defaultValue={extractUsername(user?.name ?? "")}
            name="username"
            type="text"
            readOnly={userState !== "INCOMPLETE_PROFILE"}
          />
          <FormErrorMessage>
            {errors.username && `Username is required`}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="name" isInvalid={errors.name && dirtyFields.name}>
          <FormLabel>Name</FormLabel>
          <Input
            {...register("name", { required: true })}
            defaultValue={user?.displayName ?? firebaseUser?.displayName ?? ""}
            name="name"
            type="text"
          />
          <FormErrorMessage>
            {errors.name && `Name is required`}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={errors.email && dirtyFields.email}>
          <FormLabel>Email address</FormLabel>
          <Input
            {...register("email", { required: true })}
            defaultValue={user?.email ?? firebaseUser?.email ?? ""}
            name="email"
            type="email"
            autoComplete="email"
          />
          <FormErrorMessage>
            {errors.email && `Email is required`}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Submit
        </Button>
      </Stack>
    </chakra.form>
  );
};
