"use client";
import React, { useCallback, useState } from "react";
import InputField from "../atoms/InputField";
import EmailIcon from "../icon/EmailIcon";
import PasswordIcon from "../icon/PasswordIcon";
import validator from "validator";
import { userLogin } from "@/lib/axios";
import { redirect } from "next/navigation";
import UsernameIcon from "../icon/UsernameIcon";
import { useRouter } from "next/navigation";

interface Props {
  type: "login" | "register";
  submitHandler: (
    email: string,
    password: string,
    username?: string
  ) => Promise<any>;
}

function AuthForm({ type, submitHandler }: Props) {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [error, setError] = useState<null | string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const router = useRouter();

  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setEmail(e.target.value);
    },
    []
  );

  const onUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setUsername(e.target.value);
    },
    []
  );

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setPassword(e.target.value);
    },
    []
  );

  const onRePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setRePassword(e.target.value);
    },
    []
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setIsloading(true);
    const emailIsValid = validator.isEmail(email);
    const passwordIsStrong = validator.isStrongPassword(password);
    const passwordSimilar = password === rePassword;

    if (type === "login" && (!email || !password)) {
      setError("Please input all fields");
      setIsloading(false);
      return;
    }

    if (
      type === "register" &&
      (!email || !username || !password || !rePassword)
    ) {
      setError("Please input all fields");
      setIsloading(false);
      return;
    }

    if (!emailIsValid) {
      setError("Email Invalid");
      setIsloading(false);
      return;
    }

    if (type === "login") {
      try {
        const response = await submitHandler(email, password);

        if (response.status === "failed") {
          throw new Error(response.msg);
        }

        if (response.status === "success") {
          localStorage.setItem("token", JSON.stringify(response.payload));
          router.push("/");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsloading(false);
      }
    }

    if (type === "register") {
      try {
        console.log("check", passwordSimilar);

        if (!passwordIsStrong) {
          throw new Error("Password isn't strong");
        }

        if (!passwordSimilar) {
          throw new Error("Password isn't similar");
        }

        const response = await submitHandler(email, password, username);

        if (response.status === "failed") {
          throw new Error(response.msg);
        }

        if (response.status === "success") {
          router.push("/register-success");
        }

        setIsloading(false);
      } catch (error: any) {
        setError(error.message);
        setIsloading(false);
      }
    }
  };

  return (
    <form className="flex flex-col gap-2 items-center" onSubmit={onSubmit}>
      {error && (
        <p className="text-center text-error text-lg font-semibold">{error}</p>
      )}
      <InputField
        id="email"
        onChange={onEmailChange}
        placeholder="Email"
        value={email}
        icon={<EmailIcon />}
        type="text"
      />
      {type === "register" && (
        <InputField
          id="username"
          onChange={onUsernameChange}
          placeholder="Username"
          value={username}
          icon={<UsernameIcon />}
          type="text"
        />
      )}
      <InputField
        id="password"
        onChange={onPasswordChange}
        placeholder="Password"
        value={password}
        icon={<PasswordIcon />}
        type="password"
      />

      {type === "register" && (
        <InputField
          id="repassword"
          onChange={onRePasswordChange}
          placeholder="Re-type Password"
          value={rePassword}
          icon={<PasswordIcon />}
          type="password"
        />
      )}
      <button
        className="btn btn-primary w-full max-w-xs"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading" : "Submit"}
      </button>
    </form>
  );
}

export default AuthForm;
