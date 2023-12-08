import { Box, Heading, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";

const FormImageInput: React.FC<any> = ({
  errors,
  title,
  options,
  name,
  register,
  watch,
  isWhite,
  ...rest
}) => {
  return (
    <Stack>
      <Box
        {...rest}
        borderColor={
          errors?.[name]?.message || errors?.[name]?.type === "validate"
            ? "red.400"
            : "gray.300"
        }
        borderStyle="dashed"
        borderWidth="2px"
        rounded="md"
        shadow="sm"
        role="group"
        transition="all 150ms ease-in-out"
        _hover={{
          shadow: "md",
        }}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <Box position="relative" height="100%" width="100%">
          <Box borderBottomWidth="1px" width="100%" py="5">
            <Heading
              fontSize="lg"
              color={
                errors?.[name]?.message || errors?.[name]?.type === "validate"
                  ? "red.500"
                  : "gray.700"
              }
              fontWeight="bold"
              textAlign="center"
            >
              {title}
            </Heading>
          </Box>
          <Stack py="7" textAlign="center" spacing="1">
            {watch(name)?.length ? (
              <Heading
                fontSize="md"
                color={
                  errors?.[name]?.message || errors?.[name]?.type === "validate"
                    ? "red.500"
                    : "gray.700"
                }
              >
                {watch(name)[0].name}
              </Heading>
            ) : (
              <>
                <Heading
                  fontSize="md"
                  color={
                    errors?.[name]?.message ||
                    errors?.[name]?.type === "validate"
                      ? "red.500"
                      : "gray.700"
                  }
                >
                  Drop images here
                </Heading>
                <Text
                  fontSize="xs"
                  color={
                    errors?.[name]?.message ||
                    errors?.[name]?.type === "validate"
                      ? "red.500"
                      : "gray.700"
                  }
                  fontWeight="light"
                >
                  or click to upload
                </Text>
              </>
            )}
          </Stack>
          <Input
            type="file"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*"
            {...register(name, {
              ...options,
            })}
          />
        </Box>
      </Box>

      <Text color="red.500" fontSize="sm">
        {errors?.[name]?.message}
      </Text>
    </Stack>
  );
};

export default FormImageInput;
