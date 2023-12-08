import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Link,
  Input,
  FormControl,
  FormLabel,
  HStack,
  FormErrorMessage,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { toHumanReadableLabel } from "@/lib/string";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";

const detailLabels = [
  "Applicant Number",
  "Name",
  "Email",
  "Contact Number",
  "Classification",
  "Status",
];

const requirementDetails = [
  "tor",
  "birthCertificate",
  "goodMoral",
  "seniorHighDiploma",
  "transferCredentials",
];

const ModalComponent = ({ isOpen, onClose, data }: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);

  const onSubmit = async (formData: any) => {
    setIsScheduleLoading(true);

    const { data: exam_schedule, error }: any = await supabase
      .from("exam_schedule")
      .insert(formData)
      .select()
      .limit(1)
      .single();

    if (error) {
      toast({
        title: "Cannot schedule exam.",
        description: "Please try again",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsScheduleLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("applicant")
      .update({ examScheduleId: exam_schedule.id })
      .eq("id", data.id);

    if (updateError) {
      toast({
        title: "Cannot schedule exam.",
        description: "Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsScheduleLoading(false);
      return;
    }
    console.log({ error, updateError });

    toast({
      title: "Exam Schedule Updated.",
      description: "Succesfully submitted exam schedule.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setIsScheduleLoading(false);
    return;
  };

  const handleApprove = async () => {
    setIsApproveLoading(true);
    const { error } = await supabase
      .from("applicant")
      .update({ status: "APPROVED" })
      .eq("id", data.id);

    if (error) {
      toast({
        title: "Cannot approve admission.",
        description: "Please try again",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsApproveLoading(false);
      return;
    }

    toast({
      title: "Successfully approved admission.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setIsApproveLoading(false);
    return;
  };

  useEffect(() => {
    if (data?.examScheduleId) {
      const fetchScheduleData = async () => {
        const { data: exam_schedule_data } = await supabase
          .from("exam_schedule")
          .select("schedule")
          .eq("id", data?.examScheduleId)
          .limit(1)
          .single();

        setValue(
          "schedule",
          !exam_schedule_data?.schedule
            ? null
            : new Date(exam_schedule_data?.schedule).toISOString().slice(0, 16)
        );
      };

      fetchScheduleData();
    }
  }, [data?.examScheduleId, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Applicant Details
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {detailLabels.map((label: any, index: number) => (
                <GridItem key={index}>
                  <Text fontWeight="bold">{label}:</Text>
                  <Text>
                    {
                      data[
                        label
                          .replace(/\s(.)/g, ($1: string) => $1.toUpperCase())
                          .replace(/\s/g, "")
                          .replace(/^(.)/, ($1: string) => $1.toLowerCase())
                      ]
                    }
                  </Text>
                </GridItem>
              ))}
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {requirementDetails.map((label, index) => (
                <GridItem key={index} my={2}>
                  <Text fontWeight="bold">{toHumanReadableLabel(label)}:</Text>
                  {!data?.[label] ? (
                    "-"
                  ) : (
                    <Link
                      href={data?.[label]}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="blue.800"
                    >
                      View Image
                    </Link>
                  )}
                </GridItem>
              ))}
            </Grid>

            {data.status === "APPROVED" && (
              <Box mt="15" w="600px">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl
                    isInvalid={!errors["schedule"]?.message ? false : true}
                  >
                    <FormLabel fontWeight="bold">Exam Schedule</FormLabel>
                    <Input
                      type="datetime-local"
                      isDisabled={data.examScheduleId}
                      {...register("schedule", {
                        required: "Please input exam schedule",
                      })}
                    />
                    <FormErrorMessage>
                      {errors?.["schedule"]?.message}
                    </FormErrorMessage>
                  </FormControl>
                  {!data.examScheduleId && (
                    <Box my="4">
                      <Button
                        type="submit"
                        colorScheme="gray"
                        isDisabled={
                          data?.status !== "APPROVED" || isScheduleLoading
                        }
                        isLoading={isScheduleLoading}
                      >
                        Update Schedule
                      </Button>
                    </Box>
                  )}
                </form>
              </Box>
            )}
          </Box>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button
            isDisabled={data.status === "APPROVED" || isApproveLoading}
            isLoading={isApproveLoading}
            colorScheme="blue"
            type="button"
            onClick={handleApprove}
          >
            Approve
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
