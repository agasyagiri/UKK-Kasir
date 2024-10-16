import React, { useState, useEffect } from "react";
import { Box, Progress, Text, Flex, Select, Input, useColorModeValue } from "@chakra-ui/react";
import Table from "../../../components/table";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import {
  getAllDetailTransaksiByDate,
  getAllDetailTransaksiByMonth,
} from "./fragments/ApiHandler";
import { columns } from "./fragments/dataTable";
import { convertToRupiah } from "../../../utils/routes/FormatRupiahs";

export default function index() {
  const [loading, setLoading] = useState(false);
  const [dataMenu, setDataMenu] = useState([]);
  const [totalPendapatan, setTotalPendapatan] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("");
  // Warna tema untuk latar belakang tabel dan border
  const tableBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const getDataByMonth = async (month) => {
    setLoading(true);
    const res = await getAllDetailTransaksiByMonth(month);
    setDataMenu(res.data);
    setTotalPendapatan(res.total_keseluruhan);
    setLoading(false);
  };

  const getDataByDate = async (date) => {
    setLoading(true);
    const res = await getAllDetailTransaksiByDate(date);
    setDataMenu(res.data);
    setTotalPendapatan(res.total_keseluruhan);
    setLoading(false);
  };

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    setCurrentMonth(month.toString());
    getDataByMonth(month);
  }, []);

  return (
    <Container>
      <Box
        textAlign={{ base: "center", md: "left" }} // Pusatkan teks pada layar kecil dan sedang
        pt={{ base: "100", md: "12" }} // Padding top lebih besar di layar sedang
      >
        <Heading text="Kelola Laporan Transaksi" />
        {/* Box untuk filter */}
        <Box
          mt={5}
          p={3}
          borderWidth="1px"
          borderRadius="lg"
          bg={useColorModeValue("gray.50", "gray.800")}
          boxShadow="md"
        >
          <Flex
            gap={{ base: 2, md: 5 }}
            w={{ base: "full", md: "85%" }}
            flexDir={{ base: "column", md: "row" }}
            mt={{ base: 2, md: 0 }}
            alignItems="center" // Untuk menyeimbangkan semua elemen pada satu garis
          >
            <Flex direction="column" w={{ base: "full", md: "30%" }}>
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Filter Bulan
              </Text>
              <Select
                placeholder="Pilih Bulan"
                size="sm"
                borderRadius="lg"
                focusBorderColor="#08236b"
                value={currentMonth}
                onChange={(e) => {
                  setCurrentMonth(e.target.value);
                  getDataByMonth(e.target.value);
                }}
              >
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </Select>
            </Flex>

            <Flex direction="column" w={{ base: "full", md: "30%" }}>
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Filter Tanggal
              </Text>
              <Input
                placeholder="Cari Transaksi"
                borderRadius="lg"
                focusBorderColor="#08236b"
                size="sm"
                type={"date"}
                onChange={(e) => {
                  getDataByDate(e.target.value);
                }}
              />
            </Flex>

            {/* Total Pendapatan */}
            {totalPendapatan && (
              <Flex
                w={{ base: "full", md: "auto" }}
                justifyContent={{ base: "center", md: "flex-end" }} // Center di layar kecil, kanan di layar besar
                mt={{ base: 4, md: 0 }}
                flex="1"
              >
                <Text
                  fontFamily={"Poppins"}
                  fontWeight={"bold"}
                  fontSize={{ base: "md", md: "16px" }} // Ukuran teks berbeda untuk layar kecil dan besar
                  textAlign={{ base: "center", md: "right" }} // Teks di tengah untuk layar kecil, kanan untuk besar
                >
                  Total Pendapatan: {convertToRupiah(totalPendapatan)}
                </Text>
              </Flex>
            )}
          </Flex>
        </Box>
        <Box my={10} maxW={"100%"}>
          {loading ? (
            <Progress size="xs" isIndeterminate />
          ) : (
            <Box
              w={"100%"}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg={tableBg}
              borderColor={borderColor}
              boxShadow="md"
            >
              <Table
                columns={columns}
                data={dataMenu?.map((item, index) => {
                  return {
                    ...item,
                    key: index,
                  };
                })}
                pagination={{
                  position: ["bottomCenter"],
                  defaultPageSize: 3,
                  showSizeChanger: true,
                  pageSizeOptions: ["3", "5", "10"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} dari ${total} items`,
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}