// Desc: Halaman Detail Transaksi
// import library yang dibutuhkan
import React, { useEffect, useState } from "react";
import {
  Text,
  Input,
  Flex,
  Grid,
  GridItem,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Divider,
} from "@chakra-ui/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import {
  getTransaksiById,
  getDetailTransaksiByIdTransaksi,
} from "./fragments/ApiHandler";

// buat komponen index
export default function index() {
  // deklarasi variabel
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [transaksi, setTransaksi] = useState([]);
  const [kolomMenu, setKolomMenu] = useState([]);

  // fungsi untuk mengambil data transaksi berdasarkan id
  const getTransaksi = async () => {
    const res = await getTransaksiById(id);
    const resDetailTransaksi = await getDetailTransaksiByIdTransaksi(id);
    setTransaksi(res.data);
    setKolomMenu(resDetailTransaksi.data);
  };

  // fungsi untuk memasukan data ke dalam form
  useEffect(() => {
    if (transaksi) {
      const tgl_transaksi = new Date(
        transaksi?.tgl_transaksi
      ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }); // mengubah format tanggal menjadi tanggal lokal indonesia
      reset({
        tgl_transaksi: tgl_transaksi,
        id_meja: transaksi?.meja?.nomor_meja,
        nama_pelanggan: transaksi?.nama_pelanggan,
        status: transaksi?.status,
        status_meja: transaksi?.meja?.status,
      });
    }
  }, [transaksi]);

  // ambil data menu ketika komponen pertama kali di render
  useEffect(() => {
    getTransaksi();
  }, []);

  return (
    <Container>
      <Text
        cursor={"pointer"}
        onClick={() => navigate("/dashboard/manajer/transaksi")}
        mb={4}
      >{`<-- Kembali Ke Transaksi`}</Text>
      <Heading text="Detail Transaksi" /> {/* memanggil komponen heading */}
      <Grid
        templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={10}
        my={6}
      >
        <GridItem>
          <Flex direction="column">
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Tanggal Transaksi
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="blue.600"
              placeholder="Tanggal Transaksi"
              {...register("tgl_transaksi")}
              isReadOnly
            />
          </Flex>
          <Flex direction="column" my={4}>
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Status Pembayaran
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="blue.600"
              placeholder="Tanggal Transaksi"
              {...register("status")}
              isReadOnly
            />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction="column">
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Nomor Meja
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="blue.600"
              placeholder="Nomor Meja"
              {...register("id_meja")}
              isReadOnly
            />
          </Flex>
          <Flex direction="column" my={4}>
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Status Meja
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="blue.600"
              placeholder="Nomor Meja"
              {...register("status_meja")}
              isReadOnly
            />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction="column">
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Nama Pelanggan
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="blue.600"
              placeholder="Nama Pelanggan"
              {...register("nama_pelanggan", {
                required: true,
              })}
              isReadOnly
            />
          </Flex>
        </GridItem>
      </Grid>
      <Heading text="Detail Pemesanan" /> {/* memanggil komponen heading */}
      {/* Table detail pemesanan*/}
      <Table variant="simple" size="lg" my={4}>
        <Thead>
          <Tr>
            <Th>Nama Menu</Th>
            <Th>Harga</Th>
            <Th>Jumlah</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {kolomMenu.map((row, indexRow) => (
            <Tr key={indexRow}>
              <Td>{row.menu.nama_menu}</Td>
              <Td>Rp. {row.menu.harga}</Td>
              <Td>x{row.jumlah}</Td>
              <Td>Rp. {row.harga}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Divider borderColor="black" my={2} h="1px" mr={500} /> {/* Garis pembatas digeser ke kiri */}

      {kolomMenu.length > 0 && (
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          {/* Tulisan "Total Harga" di sebelah kiri */}
          <Text fontSize={"md"} fontFamily={"Poppins"} fontWeight={"bold"} ml={5}>
            Total Harga
          </Text>

          {/* Total harga di sebelah kanan */}
          <Text fontSize={"md"} fontFamily={"Poppins"} fontWeight={"bold"} mr={"125px"}>
            Rp. {kolomMenu.reduce((total, item) => total + item.harga, 0)}
          </Text>
        </Flex>
      )}
    </Container>
  );
}
