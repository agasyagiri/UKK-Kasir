// Desc: Halaman Kelola Menu
// import library yang dibutuhkan
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
import { getAllMenu } from "./fragments/ApiHandler";

// buat komponen index
export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false); // state untuk search
  const [data, setData] = useState([]); // state untuk data menu
  const [dataSearch, setDataSearch] = useState([]); // state untuk data menu [search
  const { isOpen, onOpen, onClose } = useDisclosure(); // buat state untuk modal
  // Warna tema untuk latar belakang tabel dan border
  const tableBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // fungsi untuk mencari menu
  const handleSearch = async (value) => {
    setLoading(true);
    // melakukan filter pada data menu
    const res = data.filter((item) =>
      // jika nama menu mengandung value, maka tampilkan
      item.nama_menu.toLowerCase().includes(value)
    );
    // menyimpan data menu yang sudah difilter ke dalam state dataSearch
    setDataSearch(res);
    setLoading(false);
  };

  // fungsi untuk mengambil data menu
  const getData = async () => {
    setLoading(true);
    const res = await getAllMenu();
    setData(res.data);
    setLoading(false);
  };

  // ambil data menu ketika komponen pertama kali di render
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Box
        textAlign={{ base: "center", md: "left" }} // Pusatkan teks pada layar kecil dan sedang
        pt={{ base: "100", md: "11" }} // Padding top lebih besar di layar sedang
      >
        <ModalAdd isOpen={isOpen} onClose={onClose} reload={getData} />
        {/* modal tambah menu */}
        <Heading text="Kelola Menu" /> {/* memanggil komponen heading */}
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
              placeholder="Cari Nama Menu"
              // jika ada perubahan pada input, maka panggil fungsi handleSearch
              onChange={(e) => {
                // jika input kosong, maka panggil fungsi getData
                if (e.target.value === "") {
                  setSearch(false);
                  getData();
                }
                // jika input tidak kosong, maka panggil fungsi handleSearch
                else {
                  setSearch(true);
                  handleSearch(e.target.value);
                }
              }}
              style={{ width: "100%" }}
              allowClear={true}
            />
          </Box>
          <ButtonAdd heading={"Tambah Menu"} onclick={onOpen} />
        </Flex>
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
                columns={columns.map((col) => ({
                  ...col,
                  align: "center",
                }))}
                data={
                  search
                    ? dataSearch?.map((item, index) => ({
                      ...item,
                      reload: getData,
                      key: index,
                    }))
                    : data?.map((item, index) => ({
                      ...item,
                      reload: getData,
                      key: index,
                    }))
                }
                pagination={{
                  position: ["bottomCenter"],
                  defaultPageSize: 2,
                  showSizeChanger: true,
                  pageSizeOptions: ["2", "5", "10"],
                  showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} items`,
                }}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-even" : "table-row-odd"
                }
                rowStyle={{
                  backgroundColor: (record, index) =>
                    index % 2 === 0 ? "gray.500" : "white", // Background berbeda
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}