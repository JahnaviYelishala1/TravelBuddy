"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

type FinalUiProps = {
  message: string;
  onViewTrip: () => void;
  disable?: boolean;
  tripDetail?: {
    destination?: string;
    duration?: string;
    budget?: string;
    group_size?: string;
  };
};

function FinalUi({ message, onViewTrip, disable, tripDetail }: FinalUiProps) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col items-center justify-center gap-3 p-6 bg-orange-50 border border-orange-200 rounded-xl w-full">
        
        {/* Icon */}
        <div className="bg-orange-100 p-3 rounded-full">
          <Plane className="h-6 w-6 text-orange-500" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-orange-600">
          ✈️ Planning your dream trip...
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm text-center">
          {message}
        </p>

        {/* Action Button */}
        <Button
          disabled={disable}
          onClick={onViewTrip}
          className="mt-2 w-full bg-orange-500 hover:bg-orange-500 text-white"
        >
          View Trip
        </Button>
      </div>
    </div>
  );
}

export default FinalUi;
