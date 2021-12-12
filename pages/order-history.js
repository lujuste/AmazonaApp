import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";

function OrderHistory() {
  const { state } = useContext(Store);
  const { useInfo } = state;
  const router = useRouter();

  useEffect(() => {
    if (!useInfo) {
      router.push("/login");
    }
  }, []);

  return <div></div>;
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
