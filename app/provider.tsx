"use client";
import React, { useEffect, useCallback, useState, useContext } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import { TripContextType, TripDetailContext } from "@/context/TripDetailContext";
import { TripInfo } from "./create-new-trip/_components/ChatBox";
import Footer from "./_components/Footer";


function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const createUser = useMutation(api.user.CreateNewUser);
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>(null);
  const [tripDetailInfo,setTripDetailInfo]=useState<TripInfo |null>(null);

  const createNewUser = useCallback(async () => {
    if (user) {
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user?.imageUrl ?? "",
        name: user?.fullName ?? "",
      });

      setUserDetail(result); // store returned user data in state
    }
  }, [user, createUser]);

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user, createNewUser]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{tripDetailInfo,setTripDetailInfo}}>
      <div>
        <Header />
        {children}
      </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail=()=>{
  return useContext(UserDetailContext);
}

export const useTripDetail=():TripContextType | undefined=>{
  return useContext(TripDetailContext);
}