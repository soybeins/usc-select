"use client";

import FormImageInput from "@/components/FormImageInput";
import FormSelectInput from "@/components/FormSelectInput";
import FormTextInput from "@/components/FormTextInput";
import HomeLayout from "@/layout/HomeLayout";
import { generateCode } from "@/lib/generateCode";
import {
  Box,
  Button,
  Center,
  FormControl,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { imageValidate, uploadRequirementFile } from "@/lib/images";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { removeEmptyFile } from "@/lib/removeEmpty";
// interface IFormInput {
//   name: string;
//   firstname: string;
//   lastName: string;
//   middleName: string;
//   email: string;
//   contactNumber: string;
//   classification: string;
// }

const AdmissionForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const leftFormFields = [
    {
      name: "applicantNumber",
      label: "Applicant Number",
      options: {},
      disabled: true,
      variant: "filled",
    },

    {
      name: "email",
      label: "Email",
      options: { required: "Email is required" },
    },
    {
      name: "contactNumber",
      label: "Contact Number",
      options: { required: "Contact number is required" },
    },
    {
      name: "classification",
      label: "Classification",
      options: { required: "Classification is required" },
      type: "select",
      selectOptions: [
        { label: "Freshmen" },
        { label: "Returnee" },
        { label: "Transferee" },
      ],
    },
  ];

  const rightFormFields = [
    {
      name: "firstName",
      label: "First Name",
      options: { required: "First name is required" },
    },
    {
      name: "middleName",
      label: "Middle Name",
      options: { required: "Middle name is required" },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: { required: "Last name is required" },
    },
  ];

  const requirements = [
    {
      name: "tor",
      label: "Transcript of Records",
      options: { required: "TOR is required" },
      admissionFor: ["Freshmen", "Transferee"],
    },
    {
      name: "birthCertificate",
      label: "Birth Certificate",
      options: { required: "Birth certificate is required" },
      admissionFor: ["Freshmen", "Transferee"],
    },
    {
      name: "goodMoral",
      label: "Good Moral",
      options: { required: "Good moral is required" },
      admissionFor: ["Freshmen", "Transferee"],
    },
    {
      name: "shsDiploma",
      label: "Senior High School Diploma",
      options: { required: "Senior High School Diploma is required" },
      admissionFor: ["Freshmen"],
    },
    {
      name: "transferCredential",
      label: "Transfer Credentials",
      options: { required: "Transfer Credentials is required" },
      admissionFor: ["Transferee"],
    },
  ];

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);

    const {
      applicantNumber,
      email,
      contactNumber,
      classification,
      firstName,
      middleName,
      lastName,
      tor,
      birthCertificate,
      goodMoral,
      transferCredential,
      shsDiploma,
    } = data;

    const imageArray = [
      { name: "tor", file: tor?.[0] },
      { name: "birthCertificate", file: birthCertificate?.[0] },
      { name: "goodMoral", file: goodMoral?.[0] },
      { name: "transferCredentials", file: transferCredential?.[0] },
      { name: "seniorHighDiploma", file: shsDiploma?.[0] },
    ];

    const filteredImgArray = removeEmptyFile(imageArray);

    let uploadedImages: any = [];
    let images: any = {};

    if (filteredImgArray.length > 0) {
      await Promise.allSettled(
        filteredImgArray.map(async (value: any) => {
          const url = await uploadRequirementFile(
            value.file,
            applicantNumber,
            value.name
          );

          uploadedImages.push({ name: value.name, url });
        })
      );
    }

    if (uploadedImages.length > 0) {
      uploadedImages.map((img: any) => {
        images[img.name] = img.url;
      });
    }

    const { error } = await supabase.from("applicant").insert({
      applicantNumber,
      email,
      contactNumber,
      classification,
      firstName,
      middleName,
      lastName,
      status: "PENDING",
      ...images,
    });

    if (!error) {
      router.push(`/admission-page/${applicantNumber}`);
    } else {
      toast({
        title: "Error creating account.",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setValue("applicantNumber", generateCode());
  }, [setValue]);

  return (
    <HomeLayout h="full" overflow="auto" bg="gray.900">
      <Box>
        <Center pt="10">
          <Heading color="white">Admission Form</Heading>
        </Center>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid
            justifyContent="center"
            columns={2}
            mx="200"
            mt="20"
            mb="10"
            borderRadius="5"
            bg="gray.800"
          >
            <Box p="6">
              {leftFormFields.map((prop, index) => {
                if (prop.type === "select") {
                  return (
                    <Box key={index} mt="4">
                      <FormSelectInput
                        name={prop.name}
                        label={prop.label}
                        register={register}
                        error={errors?.[prop.name]?.message}
                        options={prop.options}
                        isWhite
                      >
                        <option value="" selected disabled hidden>
                          Choose classification here...
                        </option>
                        {prop.selectOptions.map((option, index) => (
                          <option key={index}>{option.label}</option>
                        ))}
                      </FormSelectInput>
                    </Box>
                  );
                }

                return (
                  <Box key={index} mt="4">
                    <FormTextInput
                      name={prop.name}
                      label={prop.label}
                      register={register}
                      error={errors?.[prop.name]?.message}
                      options={prop.options}
                      isDisabled={prop.disabled}
                      variant={prop.variant}
                      isWhite
                    />
                  </Box>
                );
              })}
            </Box>
            <Box p="6">
              {rightFormFields.map((prop, index) => (
                <Box key={index} mt="4">
                  <FormTextInput
                    name={prop.name}
                    label={prop.label}
                    register={register}
                    error={errors?.[prop.name]?.message}
                    options={prop.options}
                    isWhite
                  />
                </Box>
              ))}
            </Box>
          </SimpleGrid>
          <Box
            justifyContent="center"
            mx="200"
            my="10"
            borderRadius="5"
            bg="gray.800"
          >
            <Box p="10" justifyContent="center">
              <Heading color="white" size="md">
                Requirements
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={8} my="4">
                {requirements.map(
                  (requirement, index) =>
                    requirement.admissionFor.includes(
                      watch("classification")
                    ) && (
                      <GridItem key={index} width="auto">
                        <FormControl>
                          <FormImageInput
                            bg={"gray.400"}
                            errors={errors}
                            register={register}
                            name={requirement.name}
                            title={requirement.label}
                            options={{
                              ...imageValidate,
                              ...requirement.options,
                            }}
                            watch={watch}
                          />
                        </FormControl>
                      </GridItem>
                    )
                )}
              </Grid>
            </Box>
          </Box>
          <Center my="4" p="6">
            <Button
              type="submit"
              w="50vw"
              isDisabled={isLoading}
              isLoading={isLoading}
              colorScheme="teal"
            >
              Submit
            </Button>
          </Center>
        </form>
      </Box>
    </HomeLayout>
  );
};

export default AdmissionForm;
