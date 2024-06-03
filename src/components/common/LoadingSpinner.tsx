import { IonSpinner } from '@ionic/react';
import React from 'react';

interface LoadingSpinnerProps {
  size?: "small" | "default" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "default" }) => {
  return <IonSpinner name="crescent" size={size} />;
};

export default LoadingSpinner;