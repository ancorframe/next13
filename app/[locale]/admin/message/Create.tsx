"use client"
import React from 'react'
import { Input } from "@/Components/Input/Input";
import { FormProvider, useForm } from "react-hook-form";

type FormValues = {
  en: {
    title: string;
    description: string;
  };
  ua: {
    title: string;
    description: string;
  };
};

const defaultValues = {
  en: {
    title: "",
    description: "",
  },
  ua: {
    title: "",
    description: "",
  },
};

async function createMessage(data:FormValues) {
    const res = await fetch("http://localhost:4499/api/message", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  const message = await res.json();
  return message;
}


function Create() {
    const methods = useForm<FormValues>({ defaultValues });
    const onSubmit = async (data: FormValues) => {
        console.log(data);
await createMessage(data)
    };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <p>en</p>
        <Input name="en.title" />
        <Input name="en.description" />
        <p>ua</p>
        <Input name="ua.title" />
        <Input name="ua.description" />
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
}

export default Create