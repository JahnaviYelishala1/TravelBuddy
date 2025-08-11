import React from 'react'
import { Trip } from '../page'
import Image from 'next/image'
import { ArrowBigRight } from 'lucide-react'
import Link from 'next/link'

type Props={
    trip: Trip
}

function MyTripCardItem({trip}:Props) {
  return (
    <Link href={'/view-trips/'+trip?.tripId} className='p-3 shadow rounded-3xl'>
                <Image src={'/placeholder.jpg'} alt={trip.tripId}
                width={400} height={400} className='rounded-xl object-cover'/>
                <h2 className='flex gap-2 font-semibold text-xl'>{trip?.tripDetail?.destination}<ArrowBigRight />{trip?.tripDetail?.destination}</h2>
                <h2 className='mt-2 text-gray-500'>{trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget</h2>
            </Link>
  )
}

export default MyTripCardItem
