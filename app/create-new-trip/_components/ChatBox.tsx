"use client";
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader, Send } from 'lucide-react';
import axios from 'axios';
import EmptyBoxState from './EmptyBoxState';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
import SelectDaysUi from './SelectDaysUi';
import FinalUi from './FinalUi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useTripDetail, useUserDetail } from '@/app/provider';
import {v4 as uuidv4} from 'uuid';

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
};

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};

export type Itinerary = {
  day: number;
  day_plan: string;
  best_time_to_visit: string;
  activities: Activity[];
};

export type TripInfo = {
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
  hotels: Hotel[];
  itinerary: Itinerary[];
};


function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isFinal,setIsFinal]=useState(false);
  const [tripDetail,setTripDetail]=useState<TripInfo>();
  const SaveTripDetail=useMutation(api.TripDetail.CreateTripDetail);
  const {userDetail,setUserDetail}=useUserDetail();
  //@ts-ignore
  const {tripDetailInfo,setTripDetailInfo}=useTripDetail();

  const sendMessage = async (input: string) => {
    //if (!input?.trim()) return;
    setLoading(true);
    setUserInput('');

    const newMsg: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, newMsg]);

    try {
      const result = await axios.post('/api/aimodel', {
        messages: [...messages, newMsg],
        isFinal: isFinal
      });
      
      console.log(result.data);

      !isFinal&&setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result?.data?.resp,
          ui: result?.data?.ui,
        },
      ]);

      if (isFinal) {
  console.log("AI API Final Response:", result.data);
  setTripDetail(result?.data?.trip_plan);
  setTripDetailInfo(result?.data?.trip_plan);
  setIsFinal(false);

  const tripId = uuidv4();
  await SaveTripDetail({
    tripDetail: result?.data?.trip_plan,
    tripId: tripId,
    uid: userDetail?._id
  });
}


    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSend = () => {
    sendMessage(userInput);
  };

  const RenderGenerativeUi = (ui?: string) => {
    if (ui === 'budget') {
      return <BudgetUi onSelectedOption={(v:string)=>{sendMessage(v)} }/>;
    } else if (ui === 'groupSize') {
      return <GroupSizeUi onSelectedOption={(v:string)=>{sendMessage(v)} }/>
    }else if(ui==='tripDuration') {
      return <SelectDaysUi onSelectedOption={(v: string) => sendMessage(v)}/>
    }else if(ui==='final') {
      return <FinalUi  message="Thanks for the details! If you have no specific preferences for travel interests, I'll prepare a well-rounded itinerary for your trip."
        onViewTrip={() => console.log("View Trip clicked")}
        disable={!tripDetail}/>
    }
    return null;
  };

  useEffect(()=>{
    const lastMsg=messages[messages.length-1];
    if(lastMsg?.ui==='final') {
      setIsFinal(true);
      setUserInput('Ok,Great!');
      onSend();
    }
  },[messages])

  return (
    <div className='h-[80vh] flex flex-col border shadow rounded-2xl p-5'>
      {messages.length === 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            sendMessage(v); // send directly with the value
          }}
        />
      )}

      <section className='flex-1 overflow-y-auto p-4'>
  {messages.map((msg, index) =>
    msg.role === 'user' ? (
      <div className='flex justify-end mt-2' key={index}>
        <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
          {msg.content}
        </div>
      </div>
    ) : (
      <div className='flex justify-start mt-2' key={index}>
        <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
          {msg.content}
          {RenderGenerativeUi(msg.ui)}
        </div>
      </div>
    )
  )}

  {/* Show loader if waiting for AI response */}
  {loading && (
    <div className='flex justify-start mt-2'>
      <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
        <Loader className='animate-spin' />
      </div>
    </div>
  )}
</section>


      <section>
        <div className='border rounded-2xl p-4 relative'>
          <Textarea
            placeholder='Start typing here...'
            className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <Button
            size={'icon'}
            className='absolute bottom-6 right-6'
            onClick={onSend}
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
