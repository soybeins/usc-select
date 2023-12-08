"use client";

import HomeLayout from "@/layout/HomeLayout";
import { formatDateTime } from "@/lib/date";
import { supabase } from "@/lib/supabase";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdmissionPage = ({ params: { code } }: { params: { code: string } }) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("applicant")
        .select(
          "id, created_at,	firstName,	middleName, lastName,	email, status, classification	, exam_schedule!applicant_examScheduleId_fkey ( id, schedule )"
        )
        .eq("applicantNumber", code)
        .limit(1)
        .single();

      if (!error) {
        setData(data);
      } else {
        console.log(error);
      }
    };

    fetchData();
  }, [code]);

  console.log(data);

  return (
    <HomeLayout withNavbar bg="gray.800">
      <Center my="4">
        <Box bg="white" borderRadius="5" p="6" w="800px" h="500px" gap={4}>
          <Heading size="lg">Admission Status</Heading>
          <HStack my="3">
            <Text size="lg">Applicant ID:</Text>
            <Text fontWeight="medium">{code}</Text>
          </HStack>
          <Center>
            <HStack>
              <VStack>
                <CheckCircleIcon h="50" w="50" color="green" />
                <Text>Apply</Text>
              </VStack>
              <Box
                w="120px"
                h="1"
                mb="5"
                bg={
                  data?.status === "APPROVED" ||
                  data?.classification === "Returnee"
                    ? "green"
                    : "orange"
                }
              ></Box>
              <VStack>
                <CheckCircleIcon
                  h="50"
                  w="50"
                  color={
                    data?.status === "APPROVED" ||
                    data?.classification === "Returnee"
                      ? "green"
                      : "orange"
                  }
                />
                <Text textAlign="center">Requirements</Text>
              </VStack>
              <Box
                w="120px"
                h="1"
                mb="5"
                bg={!data?.exam_schedule?.schedule ? "orange" : "green"}
              ></Box>
              <VStack>
                <CheckCircleIcon
                  h="50"
                  w="50"
                  color={!data?.exam_schedule?.schedule ? "orange" : "green"}
                />
                <Text>Schedule</Text>
              </VStack>
            </HStack>
          </Center>

          <Box my="10">
            <Heading size="md">Admission Details:</Heading>
            <Box p="2">
              <HStack>
                <Text size="xl">Name:</Text>
                <Text fontWeight="medium">
                  {`${data?.firstName || ""} ${data?.middleName || ""} ${
                    data?.lastName || ""
                  }`.trim()}
                </Text>
              </HStack>
              <HStack>
                <Text size="xl">Requirements Review:</Text>
                <Text fontWeight="medium">{data?.status ?? "PENDING"}</Text>
              </HStack>
              <HStack>
                <Text size="xl">Your Exam Schedule:</Text>
                <Text fontWeight="medium">
                  {!data?.exam_schedule?.schedule
                    ? "PENDING"
                    : formatDateTime(data?.exam_schedule?.schedule)}
                </Text>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Center>
    </HomeLayout>
  );
};

export default AdmissionPage;
