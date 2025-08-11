"use client"
import React, { useEffect } from 'react';
import { Timeline } from "@/components/ui/timeline";
import { div } from 'motion/react-client';
import Image from 'next/image';
import { ArrowLeft, Clock, ExternalLink, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';
import { useState } from 'react';

function Itinerary() {
  //@ts-ignore
  const {tripDetailInfo,setTripDetailInfo}=useTripDetail();
  const [tripData,setTripData]=useState<TripInfo | null>(null)

  useEffect(() => {
  if (tripDetailInfo) {
    setTripData(tripDetailInfo); // store context data locally for rendering
  }
}, [tripDetailInfo]);

  const data = tripData?[
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData?.hotels.map((hotel, index) => (
            <HotelCardItem key={`hotel-${index}`} hotel={hotel} />
          ))}
        </div>
      ),
    },
    ...tripData?.itinerary.map((dayData, dayIndex) => ({
      title: `Day ${dayData?.day}`,
      content: (
        <div>
          <p>Best Time: {dayData?.best_time_to_visit}</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {dayData?.activities.map((activity, actIndex) => (
              <PlaceCardItem
                key={`day-${dayIndex}-activity-${actIndex}`}
                activity={activity}
              />
            ))}
          </div>
        </div>
      )
    }))
  ]: [];

  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {tripData?<Timeline data={data} tripData={tripData} />:
      <div>
         <h2 className='flex gap-2 items-center absolute text-3xl text-white left-20 bottom-20'><ArrowLeft />Getting to know you to build perfect trip here...</h2>
      <Image src={'/travel.png'} alt='travel' width={800}
      height={800} className='w-full h-full object-cover rounded-3xl'/>
     
      </div>}
    </div>
  );
}


export default Itinerary;
