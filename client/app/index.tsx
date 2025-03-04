// app/index.tsx
import React, { useEffect } from "react";
// import { useRouter } from "expo-router";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import { Layout } from "./_layout";

export default function Index() {
  // const router = useRouter();

  // useEffect(() => {
  //   router.replace("/home"); // o "/dashboard", a seconda della route che preferisci
  // }, []);

  return <Redirect href="/dashboard" />;
}
