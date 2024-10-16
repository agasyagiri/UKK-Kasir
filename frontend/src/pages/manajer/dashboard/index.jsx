// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import { Text, Box, SimpleGrid, Heading, useColorModeValue } from "@chakra-ui/react";
import HeadingDashboard from "../../../components/text/HeadingDashboard";
import Container from "../../../components/container/Container";
import { getLocalStorage } from "../../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { FaMoneyCheck, FaMoneyCheckAlt } from "react-icons/fa";
import { getAllDetailTransaksiByMonth } from "./fragments/ApiHandler";
import { convertToRupiah } from "../../../utils/routes/FormatRupiahs";

// fungsi untuk mendapatkan nama bulan
const getNamaBulan = (bulan) => {
  const bulanArray = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return bulanArray[bulan - 1];
};

// buat komponen index
export default function Index() {
  // buat state user
  const [user, setUser] = useState(null);
  const [transaksi, setTransaksi] = useState(0);
  const [pemasukan, setPemasukan] = useState(0);

  // jalankan useEffect
  useEffect(() => {
    // ambil data user dari local storage
    const user = getLocalStorage(LOCAL_STORAGE_USER);
    setUser(user);

    // ambil data transaksi dan pemasukan bulan ini
    const bulan = new Date().getMonth() + 1; // Mendapatkan bulan saat ini (1-12)

    const fetchData = async () => {
      const transaksiData = await getAllDetailTransaksiByMonth(bulan);
      if (transaksiData.status === "success") {
        setTransaksi(transaksiData.data.length); // atau sesuaikan dengan data yang didapat
        setPemasukan(transaksiData.total_keseluruhan); // total pemasukan
      } else {
        console.error(transaksiData.message); // handle error
      }
    };

    fetchData();
  }, []);

  const bulanIni = getNamaBulan(new Date().getMonth() + 1); // Mendapatkan nama bulan saat ini

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
        mt={{md: "12" }} // Margin top lebih besar di layar sedang
      >
        {/* Heading Dashboard */}
         <HeadingDashboard text="Selamat Datang di Dashboard Manajer" />
         <Text fontWeight={500} fontSize={"xl"}>
           Saat ini anda login sebagai : {user?.nama_user}
          </Text>

        {/* SimpleGrid untuk menampilkan data summary */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, }} // Kolom responsif: 1 di layar kecil, 2 di layar sedang, 3 di layar besar
          spacing={6} // jarak antar grid items
          mt={10}
          w={"full"}
          px={{ base: 4, md: 8 }} // Padding horizontal yang berbeda untuk layar kecil dan sedang
        >
          {/* Box untuk menampung card */}
          <Box
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue("gray.50", "gray.800")}
            boxShadow="md"
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
                <Box as={FaMoneyCheck} size="30px" color="white" _hover={{ transition: "0.5s" }} />
                <Heading size="md" mt="5px" color="white" ml={3}>
                  Transaksi Bulan {bulanIni}
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="30px" fontWeight="bold" color="white">
                  {transaksi}
                </Text>
              </CardBody>
            </Card>
          </Box>

          {/* Box untuk card jumlah meja */}
          <Box
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue("gray.50", "gray.800")}
            boxShadow="md"
          >
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
                <Box as={FaMoneyCheckAlt} size="30px" color="white" _hover={{ transition: "0.5s" }} />
                <Heading size="md" mt="5px" color="white" ml={3}>
                  Pemasukan Bulan {bulanIni}
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="30px" fontWeight="bold" color="white">
                  {convertToRupiah(pemasukan)}
                </Text>
              </CardBody>
            </Card>
          </Box>
        </SimpleGrid>
      </Box>
    </Container>
  );
}
