import NavigationBar from "@/components/NavBar";
import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
  withNavbar?: boolean;
  h?: string | number;
  [p: keyof any]: any;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({
  children,
  withNavbar = false,
  h = "100vh",
  ...rest
}) => {
  return (
    <Box h={h} w="100vw" {...rest}>
      {withNavbar && <NavigationBar />}
      {children}
    </Box>
  );
};

export default HomeLayout;
