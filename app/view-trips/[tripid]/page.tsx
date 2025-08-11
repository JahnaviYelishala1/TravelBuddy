"use client";
import { useUserDetail, useTripDetail } from '@/app/provider';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { api } from '@/convex/_generated/api';
import { Trip } from '@/app/my-trips/page';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import GlobalMap from '@/app/create-new-trip/_components/GlobalMap';


function ViewTrip() {
  const { tripid } = useParams();
  const { userDetail } = useUserDetail();
  const convex = useConvex();
  const [tripData, setTripData] = useState<Trip | null>(null);
  //@ts-ignore
  const {tripDetailInfo,setTripDetailInfo}=useTripDetail();

  useEffect(() => {
    if (userDetail && tripid) {
      GetTrip();
    }
  }, [userDetail, tripid]);

  const GetTrip = async () => {
    try {
      const result = await convex.query(api.TripDetail.GetTripById, {
        uid: userDetail?._id!,
        tripid: String(tripid)
      });

      if (result) {
        console.log("Fetched Trip:", result);
        setTripData(result);
        setTripDetailInfo(result.tripDetail);
      } else {
        console.warn("No trip found for given ID");
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
    }
  };

  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-3'>
        <Itinerary />
      </div>
      <div className='col-span-2'>
        <GlobalMap />
      </div>
    </div>
  );
}

export default ViewTrip;
