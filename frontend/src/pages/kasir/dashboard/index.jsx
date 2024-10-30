// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import { Text, Box, Button, Icon } from "@chakra-ui/react";
import HeadingDashboard from "../../../components/text/HeadingDashboard";
import Container from "../../../components/container/Container";
import { getLocalStorage } from "../../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

// buat komponen index
export default function Index() {
  // buat state user
  const [user, setUser] = useState(null);

  // jalankan useEffect
  useEffect(() => {
    // ambil data user dari local storage
    const user = getLocalStorage(LOCAL_STORAGE_USER);
    // set state user
    setUser(user);
  }, []);

  // gunakan useNavigate untuk navigasi
  const navigate = useNavigate();

  // tampilkan komponen
  return (
    // tampilkan container
    <Container>
      {/*  tampilkan heading, text, dan user dari komponen yang sudah diimport */}
      <Box
        textAlign={"center"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        gap={5}
        w={"full"}
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
      >
        {/* tampilkan heading dan text dari komponen yang sudah diimport dengan membawa props */}
        <HeadingDashboard text="Selamat Datang di Dashboard Kasir" />
        <Text fontWeight={500} fontSize={"xl"}>
          {/* tampilkan user dari state user */}
          Saat ini anda login sebagai : {user?.nama_user}
        </Text>

        {/* Tambahkan tombol buat pesanan */}
        <Button
          mt={10}
          bg="#0C359E"
          color="white"
          size="lg"
          borderRadius="xl" // Membuat ujung tombol melengkung penuh
          boxShadow="lg" // Tambahkan shadow untuk memberikan efek kedalaman
          _hover={{ bg: "#08236b" }} // Efek hover untuk memperbesar sedikit tombol
          _active={{ bg: "#0e41c4" }} // Warna saat ditekan
          _focus={{ boxShadow: "outline" }} // Fokus outline saat tombol diakses via keyboard
          onClick={() => navigate("/dashboard/kasir/tambah-transaksi")}
        >
          <Icon as={FaPlusCircle} w={4} h={4} mr={2} /> {/* Tambahkan margin kanan pada ikon */}
          Buat Pesanan
        </Button>
      </Box>
    </Container>
  );
}
