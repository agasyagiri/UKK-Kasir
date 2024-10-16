import React, { useState } from "react";
import {
  Button,
  Icon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Center,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ImageLogout from "../../../assets/image-logout.svg"; // Sesuaikan path image untuk logout
import { clearLocalStorage } from "../../../utils/helper/localStorage";

const LogoutButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state handling
  const navigate = useNavigate();

  const handleLogout = () => {
    clearLocalStorage();
    navigate("/login"); // Redirect ke halaman login setelah logout
  };

  return (
    <>
      {/* Tombol Logout */}
      <Button
        transition="200ms"
        my={[1, 2, 3]}
        px={[2, 3, 6]}
        fontWeight={500}
        justifyContent={"flex-start"}
        alignItems="center"
        borderRadius={"2xl"}
        w={"full"}
        colorScheme={"white"}
        color={"red"}
        position={"relative"}
        onClick={onOpen}
      >
        <Icon as={MdLogout} w={{ base: 6, lg: 5 }} h={{ base: 6, lg: 5 }} ml={8} />
        <Text fontSize={"md"} fontWeight={500}>
          Logout
        </Text>
      </Button>

      {/* Modal Konfirmasi Logout */}
      <Modal
        size={{ base: "xs", md: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="3xl" py={8}>
          <ModalBody alignItems="center" textAlign="center">
            <Center>
              <Image
                src={ImageLogout} // Gambar khusus untuk konfirmasi logout
                alt={"image logout"}
                w={["80%", "70%", "60%"]}
              />
            </Center>
            <Text fontFamily={"Poppins"} as="h3" fontSize={"lg"} fontWeight={600}>
              Logout dari Akun?
            </Text>
            <Text fontFamily={"Poppins"} as="h6" fontSize={"xs"} fontWeight={400}>
              Apakah Anda yakin ingin logout dari akun ini?
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              variant={"outline"}
              colorScheme={"grey"}
              size={"md"}
              mr={3}
              onClick={onClose}
              borderRadius="lg"
              fontWeight={500}
            >
              Batal
            </Button>
            <Button
              size={"md"}
              borderRadius="lg"
              colorScheme={"red"}
              fontWeight={500}
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutButton;
