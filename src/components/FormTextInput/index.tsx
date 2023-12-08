import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface FormTextInputProps {
  name: string;
  label: string;
  options: any;
  error: any;
  register: UseFormRegister<any>;
  isWhite?: boolean;
  isDisabled?: boolean;
  variant?: string;
  [p: keyof any]: any;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  register,
  name,
  label,
  options,
  error,
  isDisabled,
  variant,
  isWhite = false,
  ...rest
}) => {
  return (
    <FormControl isInvalid={error}>
      <FormLabel color={isWhite ? "gray.200" : "black"}>{label}</FormLabel>
      <Input
        bg={isWhite ? "gray.400" : "gray.100"}
        isDisabled={isDisabled}
        variant={variant}
        {...register(name, options)}
        {...rest}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormTextInput;
