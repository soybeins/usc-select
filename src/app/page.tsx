"use client";

import HomeLayout from "@/layout/HomeLayout";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Highlight,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import imageMain from "@/assets/main.jpg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormTextInput from "@/components/FormTextInput";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
export default function Home() {
  const router = useRouter();
  const [checkStatus, setCheckStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleApply = () => {
    router.push("/view-requirements");
  };

  const handleCheckStatus = () => setCheckStatus((prevState) => !prevState);

  const onSubmit = async (data: any) => {
    const { code } = data;
    setIsLoading((prevState) => !prevState);

    if (code.includes("ADMIN")) {
      const { data: admissionOfficer, error } = await supabase
        .from("admission_officer")
        .select()
        .eq("officerCode", code)
        .limit(1)
        .single();

      if (error) {
        toast({
          title: "Cannot find admission details.",
          description: "Please check the credentials you entered.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });

        setIsLoading((prevState) => !prevState);
        return;
      }

      router.replace(`/admission-dashboard/${code}`);
      setIsLoading((prevState) => !prevState);
      return;
    }

    const { data: applicant, error } = await supabase
      .from("applicant")
      .select()
      .eq("applicantNumber", code)
      .limit(1)
      .single();

    if (error) {
      toast({
        title: "Cannot find admission details.",
        description: "Please check the code you entered.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsLoading((prevState) => !prevState);
      return;
    }

    router.replace(`/admission-page/${code}`);
    setIsLoading((prevState) => !prevState);
    return;
  };

  return (
    <HomeLayout bg="gray.900">
      <Box mx="10%" height="100%" bg="neutral.900">
        <Grid h="100%" w="100%" templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Box
              bgImage={imageMain.src}
              bgSize="cover"
              bgPosition="center"
              h="100vh"
            >
              <Center h="100%" alignContent="center">
                <Box
                  bgGradient="linear(to-l, green.400, green.700)"
                  h="50vh"
                  w="40%"
                  p="4"
                  borderTopRightRadius="5"
                  borderBottomRightRadius="5"
                  opacity={0.8}
                  position="relative"
                />
                <Box
                  h="50vh"
                  w="60%"
                  p="4"
                  borderRadius="5"
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                >
                  <Flex align="end" h="100%">
                    <Heading size="3xl" color="white">
                      The
                      <br /> Carolinian
                      <br /> Portal
                    </Heading>
                  </Flex>
                </Box>
              </Center>
            </Box>
          </GridItem>
          <GridItem>
            <Box h="100%" bg="green.400">
              <Center h="100%" alignContent="center">
                <Box
                  bg="white"
                  h="20rem"
                  w="80%"
                  borderRadius="5"
                  p="5"
                  boxShadow="sm"
                >
                  {!checkStatus ? (
                    <>
                      <Center>
                        <Heading size="xl">Welcome to the Portal</Heading>
                      </Center>
                      <Box h="80%" w="100%">
                        <VStack pt="15%" gap={4}>
                          <Button
                            w="320px"
                            boxShadow="sm"
                            colorScheme="linkedin"
                            onClick={handleApply}
                          >
                            Apply
                          </Button>
                          <Button
                            w="320px"
                            boxShadow="sm"
                            colorScheme="yellow"
                            onClick={handleCheckStatus}
                          >
                            Check Status
                          </Button>
                        </VStack>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Center>
                        <Heading size="xl">Sign In</Heading>
                      </Center>
                      <Box h="80%" w="100%">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <VStack pt="15" gap={4}>
                            <Center>
                              <FormTextInput
                                name="code"
                                label="Applicant Number"
                                register={register}
                                error={errors?.["code"]?.message}
                                options={{ required: "Please enter code" }}
                                w="320px"
                              />
                            </Center>
                            <Button
                              w="320px"
                              type="submit"
                              boxShadow="sm"
                              colorScheme="yellow"
                              isDisabled={isLoading}
                              isLoading={isLoading}
                            >
                              Sign In
                            </Button>
                            <Box
                              mt="3"
                              w="320px"
                              cursor="pointer"
                              textAlign="center"
                              fontSize="sm"
                              onClick={handleCheckStatus}
                            >
                              Cancel
                            </Box>
                          </VStack>
                        </form>
                      </Box>
                    </>
                  )}
                </Box>
              </Center>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </HomeLayout>
  );
}
