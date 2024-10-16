// Desc: Halaman Kelola Menu
// import library yang dibutuhkan
import React, { useState, useEffect, useColorModeValue } from "react";
import { Box, Progress, Text, Grid, GridItem } from "@chakra-ui/react";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import { getAllDetailTransaksi } from "./fragments/ApiHandler";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

// buat komponen index
export default function Index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [dataMenu, setDataMenu] = useState([]); // state untuk data menu

  // fungsi untuk mengambil data menu
  const getData = async () => {
    const res = await getAllDetailTransaksi();
    setDataMenu(res.data);
  };

  // ambil data menu ketika komponen pertama kali di render
  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  // opsi untuk chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          color: "#000",
          font: {
            size: 10, // Mengubah ukuran font legend menjadi lebih kecil
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  // data untuk diagram lingkaran semua menu
  const allMenuData = {
    labels: dataMenu.map((item) => item.menu.nama_menu), // semua nama menu
    datasets: [
      {
        data: dataMenu.map((item) => item.jumlah), // jumlah pesanan per menu
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#FFD700",
          "#7469B6",
          "#4BC0C0",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // data untuk diagram lingkaran paling banyak dan paling sedikit dipesan
  const topBottomMenuData = {
    labels: [
      `Paling Banyak Dipesan (${dataMenu[0]?.menu?.nama_menu})`,
      `Paling Sedikit Dipesan (${dataMenu[dataMenu.length - 1]?.menu?.nama_menu})`,
    ],
    datasets: [
      {
        data: [
          dataMenu[0]?.jumlah || 0,
          dataMenu[dataMenu.length - 1]?.jumlah || 0,
        ],
        backgroundColor: ["#EF5DA8", "#219ebc"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Container>
      <Box
        textAlign={{ base: "center", md: "left" }} // Pusatkan teks pada layar kecil dan sedang
        pt={{ base: "100", md: "12" }} // Padding top lebih besar di layar sedang
      >
      {/* Heading Halaman */}
      <Heading text="Statistik Menu" /> 

      {/* Bagian Statistik dan Chart */}
      <Box my={10} maxW="100%">
        {/* Jika sedang loading, tampilkan progress bar */}
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Grid 
            templateColumns={{ base: "1fr", md: "1fr 1fr" }} 
            gap={6} 
            mt={8}
          >
            {/* GridItem 1: Semua Menu */}
            <GridItem w="100%" h="auto">
              <Box
                border="1px solid #E2E8F0"
                borderRadius="md"
                p={4}
                shadow="md"
                bg="white"
              >
                <Text textAlign="center" fontWeight="bold" fontSize="sm" mb={3}>
                  Semua Menu
                </Text>
                <Box w={{ base: "full", md: "75%" }} m="auto">
                  <Pie data={allMenuData} options={options} />
                </Box>
              </Box>
            </GridItem>

            {/* GridItem 2: Paling Banyak dan Paling Sedikit Dipesan */}
            <GridItem w="100%" h="auto">
              <Box
                border="1px solid #E2E8F0"
                borderRadius="md"
                p={4}
                shadow="md"
                bg="white"
              >
                <Text textAlign="center" fontWeight="bold" fontSize="sm" mb={3}>
                  Paling Banyak dan Paling Sedikit Dipesan
                </Text>
                <Box w={{ base: "full", md: "75%" }} m="auto">
                  <Pie data={topBottomMenuData} options={options} />
                </Box>
              </Box>
            </GridItem>
          </Grid>
        )}
        </Box>
      </Box>
    </Container>
  );
}
