import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon, Button, Text, Box } from "@chakra-ui/react";

export default function NavItem({ label, link, icon }) {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <NavLink to={link} style={{ textDecoration: "none", width: "100%" }}>
      <Button
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        w="full"
        px={10}
        py={6}
        fontWeight="medium"
        bg={isActive ? "#0C359E" : "transparent"}
        color={isActive ? "white" : "#082b70"}
        borderRadius="70px 0px 0px 70px"
        boxShadow={isActive ? "44px 0px 0px 0px #0C359E" : "none"}
        _hover={{
          bg: isActive ? "#0C359E" : "transparent",
          
        }}
        transition="background-color 0.2s ease, box-shadow 0.2s ease"
      >
        <Icon as={icon} boxSize={"15px"} />
        <Text ml={5} fontSize="14px">
          {label}
        </Text>
        {isActive && (
          <Box
            h="full"
            w={2}
            position="absolute"
            right={0}
            borderRadius="0 5px 5px 0"
          />
        )}
      </Button>

    </NavLink>
  );
}
