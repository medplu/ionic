import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import CustomField from '../../components/CustomField';
import { Action } from '../../components/Action';
import { Wave } from '../../components/Wave'; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { 
  IonBackButton, IonButtons, IonCardTitle, IonCol, IonFooter, IonGrid, IonRow, 
  IonToolbar, IonPage, IonHeader, IonContent, IonButton, IonIcon 
} from '@ionic/react';
import { arrowBack, shapesOutline } from 'ionicons/icons';
import styles from './Login.module.scss';
import { InputChangeEventDetail } from '@ionic/core';

interface FormData {
  username: string;
  password: string;
}

interface LoginResponse {
  accountType: string;
  doctorInfo?: {
    _id: string;
  };
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const queryClient = useQueryClient();
  const history = useHistory();
  const fields = [
    { id: 'username', label: 'Username', input: { props: { type: 'text', name: 'username', value: formData.username, className: styles.outlineInput }, state: {} } },
    { id: 'password', label: 'Password', input: { props: { type: 'password', name: 'password', value: formData.password, className: styles.outlineInput }, state: {} } },
  ];

  const { mutate: loginMutation, isLoading, isError, error } = useMutation<LoginResponse, Error, FormData, unknown>({
    mutationFn: async ({ username, password }: FormData): Promise<LoginResponse> => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      return res.json();
    },
    onSuccess: (data: LoginResponse) => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      if (data.accountType === "professional" && data.doctorInfo) {
        history.push(`/doctor/${data.doctorInfo._id}`, { state: { doctorInfo: data.doctorInfo } });
      } else {
        history.push("/services");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const validateForm = (): Partial<FormData> => {
    const errors: Partial<FormData> = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      loginMutation(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleInputChange called', e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIonInputChange = (name: string) => (event: CustomEvent<InputChangeEventDetail>) => {
    const syntheticEvent = { target: { name, value: event.detail.value } } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(syntheticEvent);
  };

  const errors = Object.entries(formErrors).map(([key, value]) => ({
    id: key,
    message: value!,
  }));

  return (
    <IonPage className={styles.loginPage}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" className={styles.customBack} />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton className={styles.customButton}>
              <IonIcon icon={shapesOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <IonCardTitle>Log in</IonCardTitle>
              <h5>Welcome back, hope you're doing well</h5>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              {fields.map((field) => (
                <CustomField
                  key={field.id}
                  field={field}
                  errors={errors}
                  handleIonInputChange={handleIonInputChange}
                />
              ))}
              <IonButton color="warning" className={styles.customButton} expand="block" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <Action message="Don't have an account?" text="Sign up" link="/signup" />
          <Wave />
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default LoginPage;
