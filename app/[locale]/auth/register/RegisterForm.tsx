"use client";

import { Input } from "@/Components/Input/Input";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  translate: {
    name: string;
    email: string;
    password: string;
  };
}

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const defaultValues = {
  name: "did",
  email: "admin",
  password: "123",
};

const RegisterForm = ({ translate }: Props) => {
  const { name, email, password } = translate;
  const methods = useForm<FormValues>({ defaultValues });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <p>{name}</p>
          <Input name="name" />
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
export default RegisterForm;
