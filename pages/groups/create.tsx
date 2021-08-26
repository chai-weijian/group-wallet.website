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
  Select,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Card } from "../../components/Card";
import { CURRENCY_CODE_LIST, CurrencyCode } from "../../config/currencyCode";
import { useUser } from "../../lib/hooks/useUser";
import { useRouter } from "next/router";
import { extractGroupName } from "../../lib/domain/extractGroupName";
import { Group } from "../../lib/domain/group-type";

type GroupFormData = {
  name: string;
  currencyCode: CurrencyCode;
};

const Create: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<GroupFormData>({ mode: "onChange" });

  const { user } = useUser();

  const router = useRouter();
  const toast = useToast();
  const createGroup = (formData: GroupFormData) => {
    fetch(`http://localhost:8080/v1/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        group: {
          owner: user?.name,
          displayName: formData.name,
          currencyCode: formData.currencyCode,
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

        const group: Group = await res.json();
        toast({
          title: "Group created.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        router
          .push(
            {
              pathname: "/groups/[name]",
              query: { name: extractGroupName(group.name) },
            },
            `/${group.name}`
          )
          .catch((err) => console.error(err));
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
              Create group
            </Heading>
            <FormControl id="name" isInvalid={errors.name && dirtyFields.name}>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                name="name"
                type="text"
              />
              <FormErrorMessage>
                {errors.name && `Name is required`}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="name"
              isInvalid={errors.currencyCode && dirtyFields.currencyCode}
            >
              <FormLabel>Currency</FormLabel>
              <Select
                placeholder="Select option"
                {...register("currencyCode", { required: true })}
              >
                {CURRENCY_CODE_LIST.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.currencyCode && `Currency is required`}
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
