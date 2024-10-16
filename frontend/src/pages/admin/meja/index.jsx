import React, { useState, useEffect } from "react";
import { Box, Flex, Progress, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { Input } from "antd";
const { Search } = Input;
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import Table from "../../../components/table";
import { columns } from "./fragments/dataTable";
import ButtonAdd from "../../../components/button/ButtonAdd";
import ModalAdd from "./fragments/ModalAdd";
import { getAllMeja, searchMeja } from "./fragments/ApiHandler";

// buat komponen index
export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // state untuk data meja
  const { isOpen, onOpen, onClose } = useDisclosure(); // buat state untuk modal
  // Warna tema untuk latar belakang tabel dan border
  const tableBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // fungsi untuk mencari meja
  const handleSearch = async (value) => {
    setLoading(true);
    const res = await searchMeja(value);
    // jika status respon adalah error, maka set data menjadi array kosong
    if (res.status === "error") {
      setData([]);
    }
    // jika status respon bukan error, maka set data menjadi data respon
    else {
      setData([res.data]);
    }
    setLoading(false);
  };

  // fungsi untuk mengambil data meja
  const getData = async () => {
    setLoading(true);
    const res = await getAllMeja();
    setData(res.data);
    setLoading(false);
  };

  // ambil data meja ketika komponen pertama kali di render
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Box
        textAlign={{ base: "center", md: "left" }} // Pusatkan teks pada layar kecil dan sedang
        pt={{ base: "100", md: "12" }} // Padding top lebih besar di layar sedang
      >
        <Heading text="Kelola Meja" /> {/* memanggil komponen heading */}
        <ModalAdd isOpen={isOpen} onClose={onClose} reload={getData} /> {/* modal tambah meja */}
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          my={5}
          gap={5}
          flexDir={{ base: "column", md: "row" }}
        >
          {/* memanggil komponen button add */}
          <Box w={{ base: "full", md: "auto" }}>
            <Search
              placeholder="Cari Nomor Meja"
              // jika ada perubahan pada input, maka panggil fungsi handleSearch
              onChange={(e) => {
                // jika input kosong, maka panggil fungsi getData
                if (e.target.value === "") {
                  getData();
                }
                // jika input tidak kosong, maka panggil fungsi handleSearch
                else {
                  handleSearch(e.target.value);
                }
              }}
              style={{ width: "100%" }}
              allowClear={true}
            />
          </Box>
          <ButtonAdd heading={"Tambah Meja"} onclick={onOpen} />
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