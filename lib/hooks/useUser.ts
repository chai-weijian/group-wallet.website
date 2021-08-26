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
import { fetcher } from "../StandardAPIFetcher";

export type UserState = "LOADING" | "INCOMPLETE_PROFILE" | "ACTIVE";

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
