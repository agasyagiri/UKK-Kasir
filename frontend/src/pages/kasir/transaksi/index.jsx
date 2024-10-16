// Desc: Halaman Kelola Transaksi
// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import { Box, Flex, Progress, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import Table from "../../../components/table";
import { columns } from "./fragments/dataTable";
import ButtonAdd from "../../../components/button/ButtonAdd";
import { getTransaksiByIdUser } from "./fragments/ApiHandler";
import { getLocalStorage } from "../../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { Link } from "react-router-dom";

// buat komponen index
export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // state untuk data transaksi
  const user = getLocalStorage(LOCAL_STORAGE_USER); // ambil data user dari local storage
  // Warna tema untuk latar belakang tabel dan border
  const tableBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // fungsi untuk mengambil data transaksi
  const getData = async () => {
    setLoading(true);
    const res = await getTransaksiByIdUser(user.id_user);
    setData(res.data);
    setLoading(false);
  };

  // ambil data pengguna ketika komponen pertama kali di render
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Box
        textAlign={{ base: "center", md: "left" }} // Pusatkan teks pada layar kecil dan sedang
        pt={{ base: "100", md: "12" }} // Padding top lebih besar di layar sedang
      >
        {/* modal tambah pengguna */}
        <Heading text="Kelola Transaksi" /> {/* memanggil komponen heading */}
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          my={5}
          gap={5}
          flexDir={{ base: "column", md: "row" }}
        >
          {/* membuat rute agar saat tombol ditekan mengarah ke halaman tambah transaksi */}
          <Link to={"/dashboard/kasir/tambah-transaksi"}>
            {/* memanggil komponen button add */}
            <ButtonAdd heading={"Tambah Transaksi"} />
          </Link>
        </Flex>
        <Box my={10} maxW={"100%"}>
          {/*  jika loading true, maka tampilkan progress bar, jika loading false maka tampilkan table */}
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
                data={data?.map((item, index) => {
                  return {
                    ...item,
                    reload: getData,
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
