// import library yang dibutuhkan
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";

// buat komponen Layout
export default function Layout() {
  return (
    <Box
      w={"100vw"}
      maxW="100%"
      bgColor={"white"}
      backgroundImage="url('/src/assets/bg-layout1.png')" // Path ke gambar background
      backgroundSize="cover" // Gambar akan menutupi seluruh layar
      backgroundPosition="center" // Gambar akan di posisi tengah
      backgroundRepeat="no-repeat" // Gambar tidak diulang
    >
      <Grid
        templateColumns={{ md: "15rem auto" }}
        minH={"100vh"}
        bgColor={"rgba(255, 255, 250, 0.)"} // Transparansi latar belakang di atas gambar
      >
        <GridItem position={"relative"}>
          <Sidebar />
        </GridItem>
        <GridItem bgColor={"transparent"}>
          <Outlet /> {/* tampilkan outlet */}
        </GridItem>
      </Grid>
    </Box>
  );
}
