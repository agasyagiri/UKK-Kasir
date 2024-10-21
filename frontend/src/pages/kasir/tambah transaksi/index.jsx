// Desc: Halaman Tambah Transaksi
// import library yang dibutuhkan
import React, { useEffect, useState } from "react";
import {
  Text,
  Input,
  Flex,
  Grid,
  GridItem,
  Select,
  Button,
  Stack,
  Box,
  useColorModeValue,
  SimpleGrid,
  FormHelperText,
  Image,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import { getAllMenu, addDetailTransaksi } from "./fragments/ApiHandler";
import { MdPayment } from "react-icons/md";
import { FaTrashAlt, FaGlassCheers } from "react-icons/fa";
import { MdDining, MdDinnerDining } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { addTransaksi, updateStatusMeja, getMejaByStatus } from "../transaksi/fragments/ApiHandler";
import AlertNotification from "../../../components/alert";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { getLocalStorage, clearLocalStorage } from "../../../utils/helper/localStorage";
import { convertToRupiah } from "../../../utils/routes/FormatRupiahs";
import { BASE_API_IMAGE } from "../../../../src/utils/constants";

// buat komponen index
export default function index() {
  // deklarasi variabel
  const navigate = useNavigate(); // untuk navigasi halaman
  const { isOpen, onOpen, onClose } = useDisclosure(); // for modal handling
  const user = getLocalStorage(LOCAL_STORAGE_USER); // ambil data user dari local storage
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // untuk form
  const [menu, setMenu] = useState([]);
  const [kolomMenu, setKolomMenu] = useState([]);
  const [dataMeja, setDataMeja] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // fungsi untuk mengambil data meja
  const getDataMeja = async () => {
    const res = await getMejaByStatus("kosong");
    setDataMeja(res.data);
  };

  // fungsi untuk mengambil data menu
  const getDataMenu = async () => {
    setLoading(true);
    const res = await getAllMenu();
    setMenu(res.data);
    setLoading(false);
  };

  // fungsi untuk handle submit transaksi
  const submitHandlerTransaksi = async (values) => {
    if (!values.id_meja || !values.nama_pelanggan) {
      setMessage("Nomor Meja dan Nama Pelanggan harus diisi");
      setStatus("error");
      return;
    }

    setLoading(true);
    const value = {
      ...values,
      id_user: user.id_user,
    };

    const res = await addTransaksi(value);
    await updateStatusMeja(values.id_meja, { status: "terisi" });

    await Promise.all(kolomMenu.map(async (item) => {
      const value = {
        id_transaksi: res.data.id_transaksi,
        id_menu: item.id_menu,
        jumlah: item.jumlah,
        harga: item.total_harga,
      };
      await addDetailTransaksi(value);
    }));

    setMessage(res.message);
    setStatus(res.status);

    if (res.status === "success") {
      setTimeout(() => {
        reset();
        setStatus("");
        setMessage("");
        setLoading(false);
        navigate("/dashboard/kasir/transaksi");
      }, 500);
    } else {
      setTimeout(() => {
        setLoading(false);
        setMessage("");
        setStatus("");
      }, 1000);
    }
  };


  // fungsi untuk mengubah data pada state kolomMenu
  const handleChange = (e, indexRow, type) => {
    const value = e?.target?.value;
    setKolomMenu((prev) =>
      prev.map((item, idx) => {
        if (idx === indexRow) {
          if (type === "jumlah") {
            if (item.jumlah < 0) {
              item.jumlah = 0;
              item.total_harga = 0;
            } else {
              item.jumlah = value;
              item.total_harga = item.harga * item.jumlah;
            }
          } else {
            item.nama_menu = value;
            const menuNew = menu.find((item) => item.nama_menu === value);
            item.id_menu = menuNew.id_menu;
            item.harga = menuNew.harga;
          }
        }
        return item;
      })
    );
  };

  // fungsi untuk menambahkan baris pada tabel menu
  const handleAddRow = (newMenu) => {
    setKolomMenu((prev) => [
      ...prev,
      {
        id_menu: newMenu.id_menu,
        nama_menu: newMenu.nama_menu,
        harga: newMenu.harga,
        jumlah: 1,
        total_harga: newMenu.harga,
      },
    ]);
  };

  // fungsi untuk menghapus baris pada tabel menu
  const handleDeleteRow = (index) => {
    setKolomMenu((prev) => prev.filter((_, idx) => idx !== index));
  };

  // ambil data menu ketika komponen pertama kali di render
  useEffect(() => {
    if (user) {
      if (user.role !== "kasir") {
        navigate("/login");
        clearLocalStorage();
      }
    }
    getDataMeja(); // memanggil fungsi getDataMeja
    getDataMenu(); // memanggil fungsi getDataMenu
  }, []);

  // Fungsi untuk menghitung total harga
  const getTotalHarga = () => {
    return kolomMenu.reduce((total, item) => total + item.total_harga, 0);
  };

  return (
    <Container>
      <Box
        textAlign={{ base: "center", md: "left" }}
        pt={{ base: "20", md: "1" }} // Mengurangi padding top pada layar kecil
      >
        <Stack direction='row' spacing={4}>
          <Text
            cursor={"pointer"}
            onClick={() => navigate("/dashboard/kasir/transaksi")}
            mb={4}
            fontSize={{ base: "sm", md: "md" }} // Ubah ukuran teks berdasarkan ukuran layar
          >
            {`<-- Kembali Ke Transaksi`}
          </Text>
        </Stack>

        <Heading text="Tambah Transaksi Baru" />

        <Button
          rightIcon={<MdPayment />}
          bg={"blue.600"}
          color={"white"}
          mt={3}
          mb={5}
          onClick={onOpen} // Open modal on button click
          isLoading={loading}
          size={{ base: "sm", md: "md" }}
          isDisabled={kolomMenu.length === 0} // Disable button if no menu selected
          _hover={{ bg: "blue.700" }}
        >
          Simpan Transaksi
        </Button>


        <AlertNotification status={status} message={message} />

        {/* Modal for form and detail pesanan */}
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "6xl" }}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={{ base: "lg", md: "xl" }}>Detail Pesanan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                gap={6}
                my={6}
              >
                {/* Form untuk input data transaksi */}
                <GridItem>
                  <FormControl isInvalid={errors.id_meja}>
                    <Text fontSize={{ base: "sm", md: "md" }} fontFamily={"Poppins"} ml={3} mb={1} fontWeight="bold">
                      Nomor Meja
                    </Text>
                    <Select
                      name="id_meja"
                      id="id_meja"
                      borderRadius="lg"
                      focusBorderColor="blue.700"
                      placeholder="Nomor Meja"
                      {...register("id_meja", { required: true })}
                    >
                      {dataMeja.map((item, index) => (
                        <option key={index} value={item.id_meja}>
                          {item.nomor_meja}
                        </option>
                      ))}
                    </Select>
                    {errors.id_meja && (
                      <FormHelperText textColor="red" mb={4}>
                        Masukkan Nomor Meja
                      </FormHelperText>
                    )}
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={errors.nama_pelanggan}>
                    <Text fontSize={{ base: "sm", md: "md" }} fontFamily={"Poppins"} ml={3} mb={1} fontWeight="bold">
                      Nama Pelanggan
                    </Text>
                    <Input
                      name="nama_pelanggan"
                      id="nama_pelanggan"
                      borderRadius="lg"
                      focusBorderColor="blue.700"
                      placeholder="Nama Pelanggan"
                      {...register("nama_pelanggan", { required: true })}
                    />
                    {errors.nama_pelanggan && (
                      <FormHelperText textColor="red" mb={4}>
                        Masukkan Nama Pelanggan
                      </FormHelperText>
                    )}
                  </FormControl>
                </GridItem>

                <Input
                  type="hidden"
                  name="status"
                  id="status"
                  value="Belum Bayar"
                  {...register("status", { required: true })}
                />
              </Grid>

              <Divider borderColor="black" my={4} />

              {/* Box untuk Detail Pemesanan */}
              <Box
                bg="white"
                p={{ base: 2, md: 4 }}
                rounded="lg"
                shadow="md"
                border="1px"
                borderColor={"blue.50"}
                overflowX="auto"
              >
                <Heading text="Detail Pesanan" my={4} fontSize={{ base: "md", md: "lg" }} />
                <Table variant="simple" size={{ base: "sm", md: "lg" }} my={4}>
                  <Thead>
                    <Tr>
                      <Th>Nama Menu</Th>
                      <Th>Harga</Th>
                      <Th>Jumlah</Th>
                      <Th>Total Harga</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {kolomMenu.map((row, indexRow) => (
                      <Tr key={indexRow}>
                        <Td>{row.nama_menu}</Td>
                        <Td>{convertToRupiah(row.harga)}</Td>
                        <Td>x{row.jumlah}</Td>
                        <Td>{convertToRupiah(row.total_harga)}</Td>
                        <Td>
                          <Button
                            size={{ base: "sm", md: "md" }}
                            colorScheme={"red"}
                            onClick={() => {
                              handleDeleteRow(indexRow);
                            }}
                          >
                            <FaTrashAlt />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Flex justifyContent="space-between" fontWeight="bold" my={5} flexDirection={{ base: "column", md: "row" }}>
                  <Text fontSize={{ base: "sm", md: "md" }} mb={{ base: 2, md: 0 }}>Total Harga :</Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>{convertToRupiah(getTotalHarga())}</Text>
                </Flex>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button size={{ base: "sm", md: "md" }} colorScheme="blue" mr={3} onClick={handleSubmit(submitHandlerTransaksi)}>
                Simpan
              </Button>
              <Button size={{ base: "sm", md: "md" }} colorScheme={"red"} variant="ghost" onClick={onClose}>
                Batal
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        <Box
          bg="transparent"
          p={{ base: 3, md: 4 }} // Kurangi padding di layar kecil
          rounded="lg"
          shadow="md"
          border="1px"
          borderColor={borderColor}
          mb={6}
        >
        </Box>

        {/* Bagian Minuman */}
        <Box
          bg="white"
          p={6}
          rounded="lg"
          shadow="md"
          display="inline-block"
        >
          <Heading text="Minuman" />
        </Box>
        <SimpleGrid columns={{ base: 2, sm: 2, md: 5 }} spacing={5} my={6}>
          {menu
            .filter((item) => item.jenis === "minuman") // Filter untuk minuman
            .map((item) => {
              const existingItemIndex = kolomMenu.findIndex(
                (menuItem) => menuItem.id_menu === item.id_menu
              );
              const existingItem = kolomMenu[existingItemIndex];
              return (
                <Box
                  key={item.id_menu}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={4}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  bgColor={"white"}
                >
                  <Image
                    src={`${BASE_API_IMAGE}/${item.gambar}`}
                    alt="foto minuman"
                    h={{ base: 24, md: 32 }}
                    w={{ base: "full", md: 52 }}
                    objectFit="cover"
                    objectPosition="center"
                    borderRadius={10}
                    mb={2}
                  />
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{item.nama_menu}</Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>{item.deskripsi}</Text>
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>Harga: {convertToRupiah(item.harga)}</Text>

                  {existingItem ? (
                    <Flex alignItems="center" gap={3} mt={4}>
                      <Button
                        bg={"red.600"}
                        color={"white"}
                        size={"md"}
                        onClick={() => {
                          handleChange(
                            { target: { value: existingItem.jumlah - 1 } },
                            existingItemIndex,
                            "jumlah"
                          );
                        }}
                        isDisabled={existingItem.jumlah === 1}
                      >
                        -
                      </Button>
                      <Text fontSize={"xl"} fontWeight={"semibold"}>
                        {existingItem.jumlah}
                      </Text>
                      <Button
                        bg={"green.600"}
                        color={"white"}
                        size={"md"}
                        onClick={() => {
                          handleChange(
                            { target: { value: existingItem.jumlah + 1 } },
                            existingItemIndex,
                            "jumlah"
                          );
                        }}
                      >
                        +
                      </Button>
                    </Flex>
                  ) : (
                    <Button
                      mt={4}
                      bg="#536493"
                      color="white"
                      onClick={() => handleAddRow(item)}
                      alignSelf="center"
                      size={{ base: "sm", md: "md" }}
                      _hover={{ bg: "#3f4e73" }}
                    >
                      Tambah Menu
                    </Button>
                  )}
                </Box>
              );
            })}
        </SimpleGrid>

        {/* Bagian Makanan */}
        <Box
          bg="white"
          p={6}
          rounded="lg"
          shadow="md"
          display="inline-block"
        >
          <Heading text="Makanan" />
        </Box>
        <SimpleGrid columns={{ base: 2, sm: 2, md: 5 }} spacing={5} my={6}>
          {menu
            .filter((item) => item.jenis === "makanan") // Filter untuk makanan
            .map((item) => {
              const existingItemIndex = kolomMenu.findIndex(
                (menuItem) => menuItem.id_menu === item.id_menu
              );
              const existingItem = kolomMenu[existingItemIndex];
              return (
                <Box
                  key={item.id_menu}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={4}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  bgColor={"white"}
                >
                  <Image
                    src={`${BASE_API_IMAGE}/${item.gambar}`}
                    alt="foto makanan"
                    h={{ base: 24, md: 32 }}
                    w={{ base: "full", md: 52 }}
                    objectFit="cover"
                    objectPosition="center"
                    borderRadius={10}
                    mb={2}
                  />
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{item.nama_menu}</Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>{item.deskripsi}</Text>
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>Harga: {convertToRupiah(item.harga)}</Text>

                  {existingItem ? (
                    <Flex alignItems="center" gap={3} mt={4}>
                      <Button
                        bg={"red.600"}
                        color={"white"}
                        size={"md"}
                        onClick={() => {
                          handleChange(
                            { target: { value: existingItem.jumlah - 1 } },
                            existingItemIndex,
                            "jumlah"
                          );
                        }}
                        isDisabled={existingItem.jumlah === 1}
                      >
                        -
                      </Button>
                      <Text fontSize={"xl"} fontWeight={"semibold"}>
                        {existingItem.jumlah}
                      </Text>
                      <Button
                        bg={"green.600"}
                        color={"white"}
                        size={"md"}
                        onClick={() => {
                          handleChange(
                            { target: { value: existingItem.jumlah + 1 } },
                            existingItemIndex,
                            "jumlah"
                          );
                        }}
                      >
                        +
                      </Button>
                    </Flex>
                  ) : (
                    <Button
                      mt={4}
                      bg="#536493"
                      color="white"
                      onClick={() => handleAddRow(item)}
                      alignSelf="center"
                      size={{ base: "sm", md: "md" }}
                      _hover={{ bg: "#3f4e73" }}
                    >
                      Tambah Menu
                    </Button>
                  )}
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </Container>
  );
}