'use client';

import ProviderUserContext from "@/context/user/providerUserContext";
import { useUserContext } from "@/context/user/userContext";
import React from "react";



export function Providers({ children }:any) {
    const {} = useUserContext()
  return (
      <ProviderUserContext>{children}</ProviderUserContext>
  );
}