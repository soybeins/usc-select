"use client";

import HomeLayout from "@/layout/HomeLayout";
import {
  Box,
  Button,
  Center,
  Container,
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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const admissionRequirements = [
  {
    title: "Freshmen",
    requirements: [
      "TOR",
      "Birth Certificate",
      "Senior High Diploma",
      "Good Moral",
    ],
  },
  {
    title: "Transferee",
    requirements: [
      "TOR",
      "Birth Certificate",
      "Good Moral",
      "Transfer Credentials",
    ],
  },
  {
    title: "Returnee",
    requirements: ["-"],
  },
];

export default function ViewRequirements() {
  const router = useRouter();

  const handleProceed = () => {
    router.push("/admission-form");
  };

  return (
    <HomeLayout bg="gray.900">
      <Box mx="10%" height="100%" bg="gray.200" p="10">
        <VStack gap="8" h="100%">
          <Heading size="xl">Admission Requirements</Heading>
          <Box w="100%" h="70%">
            <Grid templateColumns="repeat(3, 1fr)" gap={6} h="100%">
              {admissionRequirements.map((value, index) => (
                <GridItem key={index}>
                  <Box
                    bg="green.400"
                    boxShadow="sm"
                    borderRadius={5}
                    p={5}
                    h="100%"
                    w="100%"
                  >
                    <Heading size="md">{value.title}</Heading>
                    <Box>
                      {value.requirements?.map((req, index) => (
                        <Text size="lg" m={3} key={index}>
                          -{req}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Button size="lg" colorScheme="linkedin" onClick={handleProceed}>
            Proceed
          </Button>
        </VStack>
      </Box>
    </HomeLayout>
  );
}
