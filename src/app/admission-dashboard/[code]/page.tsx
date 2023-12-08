"use client";

import ModalComponent from "@/components/Modal";
import Modal from "@/components/Modal";
import TableComponent from "@/components/Table";
import HomeLayout from "@/layout/HomeLayout";
import { supabase } from "@/lib/supabase";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

// Example usage:
const sampleData = [
  {
    id: 1,
    applicantNumber: "ABC123",
    status: "Pending",
    created_at: "2023-12-08T15:34:32+00:00",
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
    classification: "Regular",
  },
  // Add more data as needed
];

const AdmissionDashboard = ({
  params: { code },
}: {
  params: { code: string };
}) => {
  const [applicants, setApplicants] = useState<any>([]);
  const [currentApplicant, setCurrentApplicant] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleView = (id: any) => {
    const selectedApplicant = applicants.find(
      (applicant: any) => applicant.id === id
    );

    console.log({ selectedApplicant });

    setCurrentApplicant(selectedApplicant);
    onOpen();
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      const { data, error } = await supabase.from("applicant").select();

      const formmatedApplicants = data?.map((applicant) => ({
        ...applicant,
        name: `${applicant.firstName} ${applicant.middleName} ${applicant.lastName}`,
      }));

      console.log(formmatedApplicants);

      if (!error) {
        setApplicants(formmatedApplicants);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <HomeLayout withNavbar bg="gray.800">
      <Box bg="gray.200" mx="50" my="20" borderRadius="5" p="4">
        <Text fontSize="2xl">List of Applicants</Text>
        <TableComponent data={applicants} onClick={handleView} />
      </Box>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        data={currentApplicant}
      />
    </HomeLayout>
  );
};

export default AdmissionDashboard;
