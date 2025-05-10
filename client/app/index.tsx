// app/index.tsx
import React, { useEffect } from "react";
// import { useRouter } from "expo-router";
import { Redirect } from "expo-router";

export default function Index() {
  // const router = useRouter();

  // useEffect(() => {
  //   router.replace("/dashboard");
  // }, []);

  return <Redirect href="/dashboard" />;
}
