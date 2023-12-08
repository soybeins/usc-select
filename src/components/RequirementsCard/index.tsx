import React, { useEffect } from "react";

import { Box, Heading, Stack, Text, Input } from "@chakra-ui/react";

const RequirementsCard: React.FC<any> = ({ title, data, setImageUpload }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      p="5"
      boxShadow="sm"
      position="relative"
      _hover={{ bg: "gray.100" }}
      borderStyle="dashed"
    >
      <Box borderBottomWidth="1px" width="100%">
        <Heading
          fontSize="lg"
          color="gray.700"
          fontWeight="bold"
          textAlign="center"
          pb="5"
        >
          {title}
        </Heading>
      </Box>
      <Stack pt="7" textAlign="center" spacing="1">
        {data ? (
          <>
            <Heading fontSize="md" color="gray.700" fontWeight="medium">
              {data}
            </Heading>
          </>
        ) : (
          <>
            <Heading fontSize="md" color="gray.700" fontWeight="medium">
              Drop images here
            </Heading>
            <Text fontSize="xs" fontWeight="light">
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
        onChange={(e) =>
          setImageUpload(e?.target?.files?.[0], title.replaceAll(" ", ""))
        }
      />
    </Box>
  );
};

export default RequirementsCard;
