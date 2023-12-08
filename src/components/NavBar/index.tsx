import {
  Box,
  Flex,
  Spacer,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import logoWhite from "@/assets/lowgo-white.png";
import { useRouter } from "next/navigation";

const avatarImageSrc =
  "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg";

const NavigationBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <Flex bg="green.800" align="center" px="10" boxShadow="md">
      {/* Logo Container */}
      <Box>
        <Image src={logoWhite.src} alt="Logo" h="80px" />
      </Box>

      {/* Spacer to push the avatar to the right */}
      <Spacer />

      {/* Avatar Dropdown */}
      <HStack spacing={4}>
        <Menu>
          <MenuButton as={Avatar} name="User" src={avatarImageSrc} size="sm" />
          <MenuList>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default NavigationBar;
