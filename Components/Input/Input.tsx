import { Controller, useFormContext } from "react-hook-form";

export const Input = ({ name, ...props }: { name: string, type?:string }) => {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field }) => <input {...field} {...props} />}
      name={name}
      control={control}
      defaultValue=""
    />
  );
};
