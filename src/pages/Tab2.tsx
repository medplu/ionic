import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { mailOutline, personOutline, keyOutline, createOutline, briefcaseOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import "./Tab2.css";

type FormData = {
  email: string;
  username: string;
  fullName: string;
  password: string;
  accountType: string;
  additionalInfo: {
    professionalTitle?: string;
    specialties?: string;
    institutionName?: string;
  };
};

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    fullName: "",
    password: "",
    accountType: "client",
    additionalInfo: {},
  });
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutate, isError, isLoading, error: mutationError } = useMutation({
    mutationFn: async ({ email, username, fullName, password, accountType, additionalInfo }: FormData) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, fullName, password, accountType, additionalInfo }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create account");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e: CustomEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = e.detail.value;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAdditionalInfoChange = (e: CustomEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = e.detail.value;
    setFormData({
      ...formData,
      additionalInfo: { ...formData.additionalInfo, [name]: value },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <div className="ion-text-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dws2bgxg4/image/upload/v1715661676/l4lremtb1xcbi4m9mwmo.jpg')", backgroundSize: "cover", backgroundPosition: "center", height: "300px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Link to="/" className="ion-no-padding">
            <div className="logo-container">
              <div className="logo-icon">
                <svg fill="#FFFFFF" width="18px" height="18px" viewBox="0 0 431.771 431.771">
                  <path d="M332.314,239.837c2.292,6.147,8.154,10.219,14.711,10.219h69.044c8.664,0,15.701-7.029,15.701-15.701 c0-8.66-7.037-15.701-15.701-15.701h-58.144L326.647,134.7c-2.236-6.014-7.927-10.057-14.335-10.215 c-6.455-0.134-12.282,3.619-14.811,9.506l-28.236,65.866L232.733,63.702c-1.884-7.077-8.491-11.936-15.726-11.621 c-7.309,0.26-13.471,5.534-14.853,12.717l-43.703,226.947L127.473,169.25c-1.688-6.658-7.494-11.447-14.349-11.834 c-6.899-0.294-13.167,3.749-15.577,10.169l-22.506,60.018H15.699C7.025,227.603,0,234.631,0,243.304 c0,8.664,7.025,15.7,15.699,15.7h70.214c6.546,0,12.403-4.063,14.704-10.198l8.706-23.22l35.962,142.256 c1.773,6.993,8.057,11.862,15.214,11.862c0.156,0,0.307,0,0.463-0.008c7.356-0.217,13.573-5.507,14.966-12.728l44.15-229.239 l30.612,114.021c1.731,6.464,7.358,11.116,14.046,11.598c6.561,0.433,12.908-3.326,15.537-9.474l30.629-71.471L332.314,239.837z"/>
                </svg>
              </div>
              <div className="logo-text">Medplus<sup>+</sup></div>
            </div>
          </Link>
          <div>
            <h2 className="heading">Welcome to Medplus Health</h2>
            <p>Connecting Patients with Trusted Medical Professionals.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">
              <IonIcon icon={mailOutline} /> Email
            </IonLabel>
            <IonInput
              type="email"
              name="email"
              value={formData.email}
              onIonChange={handleInputChange}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              <IonIcon icon={personOutline} /> Username
            </IonLabel>
            <IonInput
              type="text"
              name="username"
              value={formData.username}
              onIonChange={handleInputChange}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              <IonIcon icon={createOutline} /> Full Name
            </IonLabel>
            <IonInput
              type="text"
              name="fullName"
              value={formData.fullName}
              onIonChange={handleInputChange}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              <IonIcon icon={keyOutline} /> Password
            </IonLabel>
            <IonInput
              type="password"
              name="password"
              value={formData.password}
              onIonChange={handleInputChange}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel>Account Type</IonLabel>
            <IonSelect
              name="accountType"
              value={formData.accountType}
              onIonChange={handleInputChange}
              required
            >
              <IonSelectOption value="client">Client</IonSelectOption>
              <IonSelectOption value="professional">Professional</IonSelectOption>
              <IonSelectOption value="institution">Institution</IonSelectOption>
            </IonSelect>
          </IonItem>
          {formData.accountType !== "client" && (
            <>
              {formData.accountType === "professional" && (
                <>
                  <IonItem>
                    <IonLabel position="floating">
                      <IonIcon icon={briefcaseOutline} /> Professional Title
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="professionalTitle"
                      value={formData.additionalInfo.professionalTitle || ""}
                      onIonChange={handleAdditionalInfoChange}
                      required
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Specialties (comma separated)</IonLabel>
                    <IonInput
                      type="text"
                      name="specialties"
                      value={formData.additionalInfo.specialties || ""}
                      onIonChange={handleAdditionalInfoChange}
                      required
                    />
                  </IonItem>
                </>
              )}
              {formData.accountType === "institution" && (
                <IonItem>
                  <IonLabel position="floating">Institution Name</IonLabel>
                  <IonInput
                    type="text"
                    name="institutionName"
                    value={formData.additionalInfo.institutionName || ""}
                    onIonChange={handleAdditionalInfoChange}
                    required
                  />
                </IonItem>
              )}
            </>
          )}
          <IonButton
            type="submit"
            expand="block"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </IonButton>
          {error && (
            <IonText color="danger">
              <p className="ion-padding-top">Error: {error}</p>
            </IonText>
          )}

          {isError && (
            <IonText color="danger">
              <p className="ion-padding-top">Error: {mutationError.message}</p>
            </IonText>
          )}

<Link to="/login" className="ion-margin-top text-red-500">
  Already have an account? Log in
</Link>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
