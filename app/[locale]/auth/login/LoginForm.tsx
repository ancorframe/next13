"use client";

import { Input } from "@/Components/Input/Input";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  translate: { email: string; password: string };
}

type FormValues = {
  email: string;
  password: string;
};

const defaultValues = {
  email: "wotzad@mail.com",
  password: "190294hudhwkux88",
};

const LoginForm = ({ translate }: Props) => {
  const { email, password } = translate;
  const methods = useForm<FormValues>({ defaultValues });

  const onSubmit = async (data: FormValues) => {
    // console.log(data);
    await signIn("credentials", { ...data, redirect: true, callbackUrl: "/admin" });
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <p>{email}</p>
          <Input name="email" type="email" />
          <p>{password}</p>
          <Input name="password" type="password" />
          <button type="submit">submit</button>
        </form>
      </FormProvider>
    </>
  );
};
export default LoginForm;
