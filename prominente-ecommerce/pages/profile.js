import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useToast } from "@chakra-ui/react";

import { db } from "../src/utils/firebase/initClient";
import withPrivate from "../src/utils/routes/withPrivate";
import { PageLayout } from "../src/components/general/layouts";
import {
  ProfileAccountSettings,
  ProfileNav,
  ProfilePersonalInfo,
} from "../src/components/general/profileComponents";
import Show from "../src/components/wrapper/Show";
import { TabNav } from "../src/components/general/tabNavigation";

const Profile = ({ authContext }) => {
  const {
    logout,
    updateUserEmail,
    updateUserPassword,
    currentUser,
    userCredentials,
    getFirstName,
    firstname,
    setFirstname,
    surname,
    setSurname,
    address,
    setAddress,
    contact,
    setContact,

    handleSettingUserCredentials,
  } = authContext;

  const toast = useToast();

  const [activeTab, setActiveTab] = useState(0);

  const [newEmail, setNewEmail] = useState("");
  const [emailChangePasswordConfirm, setEmailChangePasswordConfirm] =
    useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // reauthentication
  const handleReauthentication = async (password) => {
    const cred = EmailAuthProvider.credential(currentUser.email, password);
    await reauthenticateWithCredential(currentUser, cred);
  };

  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const inputRef = useRef(null);
  const handleEmailForm = () => {
    setIsUpdatingEmail((prev) => !prev);
    setNewEmail("");
    setEmailChangePasswordConfirm("");
  };
  useEffect(() => {
    if (isUpdatingEmail) inputRef.current.focus();
  }, [isUpdatingEmail]);

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const passwordRef = useRef(null);
  const handlePasswordForm = () => {
    setIsUpdatingPassword((prev) => !prev);
    setOldPassword("");
    setNewPassword("");
  };
  useEffect(() => {
    if (isUpdatingPassword) passwordRef.current.focus();
  }, [isUpdatingPassword]);

  const handleNotifications = async (title, details, toastDesc) => {
    await addDoc(collection(db, `users/${currentUser?.uid}/notifications`), {
      title,
      details,
      timestamp: serverTimestamp(),
      read: "false",
    });
    toast({
      title: "Success",
      description: toastDesc,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    try {
      await handleReauthentication(emailChangePasswordConfirm);
    } catch (err) {
      alert(err.code);
      return;
    }
    try {
      if (newEmail !== currentUser.email) {
        await updateUserEmail(newEmail);
        await handleNotifications(
          "account update",
          "You have updated your email address.",
          "Successfully updated email address."
        );
        setIsUpdatingEmail(false);
      } else {
        alert("Duplicate email");
      }
    } catch (err) {
      alert(err.code);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      await handleReauthentication(oldPassword);
    } catch (err) {
      alert(err.code);
      return;
    }
    try {
      if (newPassword !== oldPassword) {
        await updateUserPassword(newPassword);
        await handleNotifications(
          "account update",
          "You have updated your account password.",
          "Successfully updated password."
        );
        setIsUpdatingPassword(false);
      } else alert("Duplicate password");
    } catch (err) {
      alert(err.code);
    }
  };

  const [isUpdatingFirstname, setIsUpdatingFirstname] = useState(false);
  const firstnameRef = useRef(null);
  const handleFirstnameForm = () => {
    setIsUpdatingFirstname((prev) => !prev);
    setFirstname(userCredentials.firstname);
  };
  useEffect(() => {
    if (isUpdatingFirstname) firstnameRef.current.focus();
  }, [isUpdatingFirstname]);

  const [isUpdatingSurname, setIsUpdatingSurname] = useState(false);
  const surnameRef = useRef(null);
  const handleSurnameForm = () => {
    setIsUpdatingSurname((prev) => !prev);
    setSurname(userCredentials.surname);
  };
  useEffect(() => {
    if (isUpdatingSurname) surnameRef.current.focus();
  }, [isUpdatingSurname]);

  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const addressRef = useRef(null);
  const handleAddressForm = () => {
    setIsUpdatingAddress((prev) => !prev);
    setAddress(userCredentials.address);
  };
  useEffect(() => {
    if (isUpdatingAddress) addressRef.current.focus();
  }, [isUpdatingAddress]);

  const [isUpdatingContact, setIsUpdatingContact] = useState(false);
  const contactRef = useRef(null);
  const handleContactForm = () => {
    setIsUpdatingContact((prev) => !prev);
    setContact(userCredentials.contact);
  };
  useEffect(() => {
    if (isUpdatingContact) contactRef.current.focus();
  }, [isUpdatingContact]);

  const handleUpdatePersonalInfo = async (e, credential) => {
    e.preventDefault();
    const userRef = doc(db, "users", currentUser.uid);

    if (credential === firstname) {
      await updateDoc(userRef, { firstname: firstname.toLowerCase() });
      await handleNotifications(
        "profile update",
        "You have updated your firstname.",
        "Successfully updated firstname."
      );
      setIsUpdatingFirstname(false);
      setSurname(surname);
      setAddress(address);
      setContact(contact);
    }
    if (credential === surname) {
      await updateDoc(userRef, { surname: surname.toLowerCase() });
      await handleNotifications(
        "profile update",
        "You have updated your surname.",
        "Successfully updated surname."
      );
      setIsUpdatingSurname(false);
      setFirstname(firstname);
      setAddress(address);
      setContact(contact);
    }
    if (credential === address) {
      await updateDoc(userRef, { address });
      await handleNotifications(
        "profile update",
        "You have updated your address.",
        "Successfully updated address."
      );
      setIsUpdatingAddress(false);
      setFirstname(firstname);
      setSurname(surname);
      setContact(contact);
    }
    if (credential === contact) {
      await updateDoc(userRef, { contact });
      await handleNotifications(
        "profile update",
        "You have updated your contact number.",
        "Successfully updated contact number."
      );
      setIsUpdatingContact(false);
      setFirstname(firstname);
      setSurname(surname);
      setAddress(address);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    handleSettingUserCredentials();
  }, []);

  return (
    <PageLayout pageTitle="Profile">
      <Head>
        <title>Profile | Prominente</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/vercel.svg" />
      </Head>

      {/* <Chatbot /> */}

      <div className="space-y-2">
        <h1 className="primary-header">{`Hello ${
          userCredentials ? getFirstName(userCredentials.firstname) : ""
        }!`}</h1>
        <p>
          Do you want to log in with a different profile?{" "}
          <span onClick={handleLogout} className="underline cursor-pointer">
            Log out
          </span>
        </p>
      </div>

      <div className="flex space-x-0 md:space-x-10 space-y-4 md:space-y-0 flex-col md:flex-row">
        <ProfileNav
          href="/cart"
          label="Shopping cart"
          desc="View items in your cart"
        />
        <ProfileNav href="/" label="Products" desc="View products" />
      </div>

      <TabNav
        tabs={["Personal Information", "Account Settings"]}
        activeTab={activeTab}
        setter={setActiveTab}
      />

      <Show when={activeTab === 0}>
        <div className="space-y-4">
          <ProfilePersonalInfo
            label="First name"
            credential={firstname}
            isUpdating={isUpdatingFirstname}
            formHandler={handleFirstnameForm}
            innerRef={firstnameRef}
            onChange={(e) => setFirstname(e.target.value)}
            submitHandler={(e) => handleUpdatePersonalInfo(e, firstname)}
            inputClassName="capitalize"
            placeholder={"Add firstname"}
          />
          <ProfilePersonalInfo
            label="Surname"
            credential={surname}
            isUpdating={isUpdatingSurname}
            formHandler={handleSurnameForm}
            innerRef={surnameRef}
            onChange={(e) => setSurname(e.target.value)}
            submitHandler={(e) => handleUpdatePersonalInfo(e, surname)}
            inputClassName="capitalize"
            placeholder={"Add surname"}
          />
          <ProfilePersonalInfo
            label="Address"
            credential={address}
            isUpdating={isUpdatingAddress}
            formHandler={handleAddressForm}
            innerRef={addressRef}
            onChange={(e) => setAddress(e.target.value)}
            submitHandler={(e) => handleUpdatePersonalInfo(e, address)}
            placeholder={"Add address"}
          />
          <ProfilePersonalInfo
            label="Contact number"
            credential={contact}
            isUpdating={isUpdatingContact}
            formHandler={handleContactForm}
            innerRef={contactRef}
            onChange={(e) => setContact(e.target.value)}
            submitHandler={(e) => handleUpdatePersonalInfo(e, contact)}
            placeholder={"Add contact number"}
          />
        </div>
      </Show>

      <Show when={activeTab === 1}>
        <div className="space-y-4">
          <ProfileAccountSettings
            label="Email address"
            formHandler={handleEmailForm}
            submitHandler={handleUpdateEmail}
            isUpdating={isUpdatingEmail}
          >
            <div className="space-y-2">
              {isUpdatingEmail && <p>Current email</p>}
              <p className="input-outline w-full px-3 py-2 overflow-x-auto">
                {currentUser.email}
              </p>
            </div>
            <Show when={isUpdatingEmail}>
              <div className="space-y-2">
                <p>New email</p>
                <input
                  type="email"
                  required
                  className="input-outline w-full overflow-x-auto"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <p>Password</p>
                <input
                  type="password"
                  required
                  ref={inputRef}
                  className="input-outline w-full overflow-x-auto"
                  value={emailChangePasswordConfirm}
                  onChange={(e) =>
                    setEmailChangePasswordConfirm(e.target.value)
                  }
                />
              </div>
              <button className="btn-primary-filled w-max px-4" type="submit">
                Save changes
              </button>
            </Show>
          </ProfileAccountSettings>
          <ProfileAccountSettings
            label="Password"
            formHandler={handlePasswordForm}
            submitHandler={handleUpdatePassword}
            isUpdating={isUpdatingPassword}
          >
            <Show when={!isUpdatingPassword}>
              <p className="text-slate-400">Update your password</p>
            </Show>
            <Show when={isUpdatingPassword}>
              <div className="space-y-2">
                {isUpdatingPassword && <p>Current password</p>}
                <input
                  type="password"
                  required
                  ref={passwordRef}
                  className="input-outline w-full overflow-x-auto"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <p>New password</p>
                <input
                  type="password"
                  required
                  className="input-outline w-full overflow-x-auto"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button className="btn-primary-filled w-max px-4" type="submit">
                Save changes
              </button>
            </Show>
          </ProfileAccountSettings>
        </div>
      </Show>
    </PageLayout>
  );
};

export default withPrivate(Profile);
