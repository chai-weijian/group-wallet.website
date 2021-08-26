import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { buildUrlString } from "../buildUrlString";
import useSWR from "swr";
import StatusCode from "../../config/statusCode";
import { User } from "../domain/user-type";

export type UserState = "LOADING" | "INCOMPLETE_PROFILE" | "ACTIVE";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // If the status code is not in the range 200-299,
  // the body should be status object in JSON
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.status = await res.json();
    throw error;
  }

  return res.json();
};

export const useUser = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userState, setUserState] = useState<UserState>("LOADING");

  const {
    data: user,
    error,
    revalidate,
  } = useSWR<User>(() => {
    const uid = firebaseUser?.uid;
    if (uid) {
      return buildUrlString(`http://localhost:8080/v1/users:findUser`, {
        uid,
      });
    } else {
      return null;
    }
  }, fetcher);

  useEffect(() => {
    if (!user && !firebaseUser) {
      setUserState("LOADING");
    } else if (
      firebaseUser &&
      error &&
      error.status.code === StatusCode.NOT_FOUND
    ) {
      setUserState("INCOMPLETE_PROFILE");
    } else {
      setUserState("ACTIVE");
    }
  }, [user, error, firebaseUser]);

  useEffect(() => {
    return onAuthStateChanged(getAuth(), (user) => setFirebaseUser(user));
  }, []);

  return { user, firebaseUser, error, userState, revalidate };
};
