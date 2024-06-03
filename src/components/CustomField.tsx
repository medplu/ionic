import React from 'react';
import { IonInput, IonLabel, IonText } from "@ionic/react";
import styles from "./CustomField.module.scss";

interface Field {
  id: string;
  label: string;
  input: {
    props: React.InputHTMLAttributes<HTMLInputElement>; // Type of the props
    state: any; // Replace 'any' with the actual type of the state if necessary
  };
}

interface Error {
  id: string;
  message: string;
}

interface CustomFieldProps {
  field: Field;
  errors: Error[];
  handleIonInputChange: (name: string) => (event: CustomEvent) => void;
}

const CustomField: React.FC<CustomFieldProps> = ({ field, errors, handleIonInputChange }) => {
  const error = errors.find(e => e.id === field.id);
  const errorMessage = error ? error.message : '';

  return (
    <div className={styles.field}>
      <IonLabel className={styles.fieldLabel}>
        {field.label}
        {errorMessage && <IonText color="danger" className="animate__animated animate__bounceIn">{errorMessage}</IonText>}
      </IonLabel>
      <IonInput
        className={styles.customInput}
        {...field.input.props}
        onIonChange={handleIonInputChange(field.id)}
      />
    </div>
  );
};

export default CustomField;
