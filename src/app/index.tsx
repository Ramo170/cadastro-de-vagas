import { auth } from "@/firebase/firebaseConfig";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    });

    return unsubcribe;
  }, []);
}
