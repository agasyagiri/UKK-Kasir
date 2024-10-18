// import library yang dibutuhkan
import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

// buat komponen ButtonAdd
export default function ButtonAdd({ heading, onclick }) {
  return (
    <Button
      bg={"#0c359e"}  // Warna background tombol
      color="white"  // Warna teks tombol
      size={{ base: "sm", md: "md" }}
      px={"10"}
      fontWeight={400}
      fontFamily={"Poppins"}
      borderRadius={"2xl"}
      onClick={() => onclick()}
      w={{ base: "full", md: "auto" }}
      _hover={{
        bg: "#08236b",
      }}
    >
      {heading} {/* tampilkan heading */}
      <Icon ml={2} as={FaPlusCircle} w={4} h={4} />
    </Button>

  );
}
