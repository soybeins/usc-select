import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

const FormSelectInput: React.FC<any> = ({
  children,
  register,
  name,
  label,
  placeholder,
  options,
  isWhite,
  error,
  ...rest
}) => {
  return (
    <FormControl isInvalid={error}>
      <FormLabel color={isWhite ? "gray.200" : "black"}>{label}</FormLabel>
      <Select
        bg={isWhite ? "gray.400" : "black"}
        {...register(name, options)}
        placeholder={placeholder}
        {...rest}
      >
        {children}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormSelectInput;
