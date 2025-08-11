"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hotel } from './ChatBox';
import { Wallet, Star } from 'lucide-react';
import axios from 'axios';

type Props = {
  hotel: Hotel;
};

function HotelCardItem({ hotel }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>('/placeholder.jpg');

  useEffect(() => {
    if (hotel) GetGooglePlaceDetail();
  }, [hotel]);

  const GetGooglePlaceDetail = async () => {
    try {
      const result = await axios.post('/api/google-place-detail', {
        placeName: hotel?.hotel_name,
      });

      if (result.data?.photos?.length > 0) {
        const photoRef = result.data.photos[0].photo_reference;
        const photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`;
        setPhotoUrl(photo);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      <Image
        src={photoUrl}
        alt='place-image'
        width={400}
        height={200}
        className='rounded-xl shadow object-cover mb-2'
      />
      <h2 className='font-semibold text-lg'>{hotel?.hotel_name}</h2>
      <h2 className='text-gray-500'>{hotel?.hotel_address}</h2>
      <div className='flex justify-between items-center'>
        <p className='flex gap-2 text-green-600'>
          <Wallet />
          {hotel?.price_per_night}
        </p>
        <p className='text-yellow-500 flex gap-2'>
          <Star />
          {hotel?.rating}
        </p>
      </div>
      <Link
        href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(
          hotel?.hotel_name
        )}`}
        target='_blank'
      >
        <Button variant={'outline'} className='mt-1 w-full'>
          View
        </Button>
      </Link>
    </div>
  );
}

export default HotelCardItem;
