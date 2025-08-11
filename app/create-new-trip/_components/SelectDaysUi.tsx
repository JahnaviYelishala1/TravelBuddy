import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function SelectDaysUi({ onSelectedOption }: any) {
  const [days, setDays] = useState(3);

  const increment = () => setDays((prev) => prev + 1);
  const decrement = () => setDays((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col items-center gap-4 mt-2">
      <h2 className="text-lg font-semibold">How many days do you want to travel?</h2>

      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={decrement}>-</Button>
        <span className="text-xl font-bold">{days} Days</span>
        <Button variant="outline" onClick={increment}>+</Button>
      </div>

      <Button
        className="mt-2"
        onClick={() => onSelectedOption(`${days} Days`)}
      >
        Confirm
      </Button>
    </div>
  );
}

export default SelectDaysUi;
