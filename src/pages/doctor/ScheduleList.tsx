import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

interface Slot {
  startTime: string;
  endTime: string;
  place: string;
}

interface ScheduleListProps {
  slots: Slot[];
}

const ScheduleList: React.FC<ScheduleListProps> = ({ slots }) => {
  return (
    <div className="schedule-container">
      <div className="flex space-x-4 p-4">
        {slots.map((slot, index) => (
          <IonCard
            key={index}
            className="min-w-[150px] p-4 rounded-lg shadow-md flex-shrink-0"
          >
            <IonCardContent>
              <p className="font-medium text-sm text-slate-900">
                {slot.startTime} - {slot.endTime}
              </p>
              <p className="text-sm text-gray-700">{slot.place}</p>
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;