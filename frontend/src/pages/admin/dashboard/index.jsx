// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import { Text, Box, SimpleGrid, Heading, useColorModeValue } from "@chakra-ui/react";
import HeadingDashboard from "../../../components/text/HeadingDashboard";
import Container from "../../../components/container/Container";
import { getLocalStorage } from "../../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { MdDining, MdDinnerDining } from "react-icons/md";
import { getAllPengguna, getAllMeja, getAllMenu } from "./fragments/ApiHandler"; // import API handler

// buat komponen index
export default function Index() {
  // buat state untuk user dan total data
  const [user, setUser] = useState(null);
  const [jumlahUser, setJumlahUser] = useState(0); // state untuk total pengguna
  const [jumlahMeja, setJumlahMeja] = useState(0); // state untuk total meja
  const [jumlahMenu, setJumlahMenu] = useState(0); // state untuk total menu

  // jalankan useEffect untuk mengambil data
  useEffect(() => {
    // ambil data user dari local storage
    const user = getLocalStorage(LOCAL_STORAGE_USER);
    setUser(user);

    // Fetch jumlah user, meja, dan menu
    const fetchData = async () => {
      try {
        // Ambil total pengguna
        const resUser = await getAllPengguna();
        if (resUser.status === "success") {
          setJumlahUser(resUser.data.length);
        }

        // Ambil total meja
        const resMeja = await getAllMeja();
        if (resMeja.status === "success") {
          setJumlahMeja(resMeja.data.length);
        }

        // Ambil total menu
        const resMenu = await getAllMenu();
        if (resMenu.status === "success") {
          setJumlahMenu(resMenu.data.length);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // tampilkan komponen
  return (
    <Container>
      {/* Box utama */}
      <Box
        textAlign={{ base: "center", md: "center" }} // Pusatkan teks pada layar kecil dan sedang
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        gap={5}
        w={"full"}
        pt={{ base: "100", md: "12" }} // Padding top lebih besar di layar sedang
        mt={{ md: "12" }} // Margin top lebih besar di layar sedang
      >
        {/* Heading Dashboard */}
        <HeadingDashboard text="Selamat Datang di Dashboard Admin" />
        <Text fontWeight={500} fontSize={"xl"}>
          Saat ini anda login sebagai : {user?.nama_user}
        </Text>

        {/* SimpleGrid untuk menampilkan data summary */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3 }} // Kolom responsif: 1 di layar kecil, 2 di layar sedang, 3 di layar besar
          spacing={6} // jarak antar grid items
          mt={"50px"}
          w={"full"}
          px={{ base: 4, md: 8 }} // Padding horizontal yang berbeda untuk layar kecil dan sedang
        >
          {/* Card untuk jumlah user */}
          <Card
            bg={"#0C359E"}
            borderRadius="xl" // custom border radius
            boxShadow="2xl" // lebih besar shadow
            _hover={{ transform: "scale(1.08)", transition: "0.4s", boxShadow: "3xl" }} // hover effect lebih halus
            transition="0.4s"
            aspectRatio={1} // membuat card berbentuk persegi
          >
            <CardHeader display="flex" alignItems="center" justifyContent="center">
              <Box as={FaUser} size="28px" color="white" _hover={{ transition: "0.5s" }} />
              <Heading size="md" mt="5px" color="white" ml={3}>
                Jumlah User
              </Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="3xl" fontWeight="bold" color="white">
                {jumlahUser}
              </Text>
            </CardBody>
          </Card>

          {/* Card untuk jumlah meja */}
          <Card
            bg={"#0C359E"}
            borderRadius="xl"
            boxShadow="2xl"
            _hover={{ transform: "scale(1.08)", transition: "0.4s", boxShadow: "3xl" }} // hover effect lebih halus
            transition="0.4s"
            aspectRatio={1}
          >
            <CardHeader display="flex" alignItems="center" justifyContent="center">
              <Box as={MdDining} size="35px" color="white" _hover={{ transition: "0.5s" }} /> {/* Icon Meja */}
              <Heading size="md" mt="5px" color="white" ml={3}>
                Jumlah Meja
              </Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="3xl" fontWeight="bold" color="white">
                {jumlahMeja}
              </Text>
            </CardBody>
          </Card>

          {/* Card untuk jumlah menu */}
          <Card
            bg={"#0C359E"}
            borderRadius="xl"
            boxShadow="2xl"
            _hover={{ transform: "scale(1.08)", transition: "0.4s", boxShadow: "3xl" }} // hover effect lebih halus
            transition="0.4s"
            aspectRatio={1}
          >
            <CardHeader display="flex" alignItems="center" justifyContent="center">
              <Box as={MdDinnerDining} size="35px" color="white" _hover={{ transition: "0.5s" }} /> {/* Icon Menu */}
              <Heading size="md" mt="5px" color="white" ml={3}>
                Jumlah Menu
              </Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="3xl" fontWeight="bold" color="white">
                {jumlahMenu}
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </Container>
  );
}
