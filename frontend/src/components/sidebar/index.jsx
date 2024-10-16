import React from "react";
import {
  Box,
  Flex,
  VStack,
  Divider,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Spacer,
  Heading,
  Center,
} from "@chakra-ui/react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaUserAlt, FaNewspaper } from "react-icons/fa";
import { MdDining, MdDinnerDining } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { X, AlignCenter } from "react-feather";
import NavItem from "./fragments/NavItem";
import Logout from "./fragments/Logout";
import { getLocalStorage } from "../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../utils/constants";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dataUser = getLocalStorage(LOCAL_STORAGE_USER);

  return (
    <Box
      w={{ base: "full", md: "17rem" }}
      h={{ base: "auto", md: "full" }}
      bgColor={"rgba(0, 0, 0, 0.2)"}
      px={{ base: 4, md: 0 }}
      py={5}
      zIndex={10}
      boxShadow={"2px 0px 20px 2px rgba(0, 0, 0, 0.1)"}
      position={"fixed"} borderRadius="lg"
    >
      <Flex h={10} alignItems={"center"} flexDir={"column"}>
        <Flex
          justifyContent={{
            base: "flex-end",
            md: "space-between",
          }}
          w={"full"}
          my="auto"
          justifyItems={"center"}
          alignItems={"center"}
          mt={{ base: 4, md: 4 }}
          position={"relative"}
        >
          <Box display={{ base: "none", md: "block" }}></Box>

          {/* Logo untuk Desktop */}
          <Image
            src="../../src/assets/image-login.png"
            alt="Logo WIKUSAMA Cafe"
            boxSize="150px"
            display={{ base: "none", md: "block" }} // Menyembunyikan logo mobile
            mx={"auto"}
            mb={-5}
            mt={-5}
          />
          {/* Logo untuk Mobile */}
          <Image
            src="../../src/assets/image-login.png"
            alt="Logo WIKUSAMA Cafe"
            boxSize="130px"
            display={{ base: "block", md: "none" }}
            mx={"auto"}
            mt={"-60px"}
          />
          <IconButton
            size={"sm"}
            p={1.5}
            my="auto"
            icon={isOpen ? <X size={18} /> : <AlignCenter size={18} />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            right={{ base: 6, md: 10 }}
            position={"absolute"}
            mb={"65px"}
          />
        </Flex>
        <VStack
          mt={{ base: 4, md: 4 }}
          alignItems={"center"}
          display={{ base: "none", md: "flex" }}
        >
          <Stack w={"full"}>
            <Box w={"full"}>
              {dataUser.role === "admin" && (
                <VStack spacing={2} align="start" w="full">
                  <NavItem
                    link={"/dashboard/admin/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/admin/menu"}
                    label={"Menu"}
                    icon={MdDinnerDining}
                  />
                  <NavItem
                    link={"/dashboard/admin/meja"}
                    label={"Meja"}
                    icon={MdDining}
                  />
                  <NavItem
                    link={"/dashboard/admin/user"}
                    label={"Pengguna"}
                    icon={FaUserAlt}
                  />
                  <Divider borderColor="gray.300" my={4} h="43vh" />
                  <Logout />
                </VStack>
              )}

              {dataUser.role === "manajer" && (
                <VStack spacing={2} align="start" w="full">
                  <NavItem
                    link={"/dashboard/manajer/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/manajer/transaksi"}
                    label={"Transaksi"}
                    icon={FaNewspaper}
                  />
                  <NavItem
                    link={"/dashboard/manajer/menu"}
                    label={"Menu"}
                    icon={MdDinnerDining}
                  />
                  <NavItem
                    link={"/dashboard/manajer/laporan"}
                    label={"Laporan"}
                    icon={HiOutlineDocumentReport}
                  />
                  <Divider borderColor="gray.300" my={4} h="43vh" />
                  <Logout />
                </VStack>
              )}
              {dataUser.role === "kasir" && (
                <VStack spacing={2} align="start" w="full">
                  <NavItem
                    link={"/dashboard/kasir/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/kasir/transaksi"}
                    label={"Transaksi"}
                    icon={FaNewspaper}
                  />
                  <Divider borderColor="gray.300" my={4} h="57vh" />
                  <Logout />
                </VStack>
              )}
            </Box>
          </Stack>
        </VStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={[4]}>
            {dataUser.role === "admin" && (
              <>
                <NavItem
                  link={"/dashboard/admin/"}
                  label={"Dashboard"}
                  icon={BsFillGrid1X2Fill}
                />
                <NavItem
                  link={"/dashboard/admin/menu"}
                  label={"Menu"}
                  icon={MdDinnerDining}
                />
                <NavItem
                  link={"/dashboard/admin/meja"}
                  label={"Meja"}
                  icon={MdDining}
                />
                <NavItem
                  link={"/dashboard/admin/user"}
                  label={"Pengguna"}
                  icon={FaUserAlt}
                />
              </>
            )}
            {dataUser.role === "manajer" && (
              <>
                <NavItem
                  link={"/dashboard/manajer/"}
                  label={"Dashboard"}
                  icon={BsFillGrid1X2Fill}
                />
                <NavItem
                  link={"/dashboard/manajer/transaksi"}
                  label={"Transaksi"}
                  icon={FaNewspaper}
                />
                <NavItem
                  link={"/dashboard/manajer/menu"}
                  label={"Menu"}
                  icon={MdDinnerDining}
                />
                <NavItem
                  link={"/dashboard/manajer/laporan"}
                  label={"Laporan"}
                  icon={HiOutlineDocumentReport}
                />
              </>
            )}
            {dataUser.role === "kasir" && (
              <>
                <NavItem
                  link={"/dashboard/kasir/"}
                  label={"Dashboard"}
                  icon={BsFillGrid1X2Fill}
                />
                <NavItem
                  link={"/dashboard/kasir/transaksi"}
                  label={"Transaksi"}
                  icon={FaNewspaper}
                />
              </>
            )}
            <Logout />
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
