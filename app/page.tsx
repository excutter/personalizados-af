"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    console.log("Main page");
    redirect("/dashboard");
  }, []);
  return <div>Main page</div>;
};

export default page;
