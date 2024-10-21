// import library yang dibutuhkan
import React, { useEffect, useState } from "react";
import {
  Text,
  Input,
  Flex,
  Grid,
  GridItem,
  Button,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import { getTransaksiById, getDetailTransaksiByIdTransaksi } from "./fragments/ApiHandler";
import { updateTransaksi, updateStatusMeja } from "../transaksi/fragments/ApiHandler";
import AlertNotification from "../../../components/alert";
import { convertToRupiah } from "../../../utils/routes/FormatRupiahs";

// buat komponen index
export default function index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [kolomMenu, setKolomMenu] = useState([]);
  const [isLunas, setIsLunas] = useState(false);
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const getTransaksi = async () => {
    const res = await getTransaksiById(id);
    const resDetailTransaksi = await getDetailTransaksiByIdTransaksi(id);
    setTransaksi(res.data);
    setKolomMenu(resDetailTransaksi.data);

    if (res.data.status === "Lunas") {
      setIsLunas(true);
    } else {
      setIsLunas(false);
    }
  };

  const submitHandlerTransaksi = async (values) => {
    setLoading(true);

    const value = {
      nama_pelanggan: values.nama_pelanggan,
      status: "Lunas",
      id_meja: transaksi.meja.id_meja,
    };

    const res = await updateTransaksi(id, value);
    const statusMeja = "Kosong";
    const resUpdateMeja = await updateStatusMeja(transaksi.meja.id_meja, { status: statusMeja });

    setMessage(res.message);
    setStatus(res.status);

    if (res.status === "success" && resUpdateMeja.status === "success") {
      setTimeout(() => {
        reset();
        setStatus("");
        setMessage("");
        getTransaksi();
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transaksi) {
      const tgl_transaksi = new Date(transaksi?.tgl_transaksi).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      reset({
        tgl_transaksi: tgl_transaksi,
        id_meja: transaksi?.meja?.nomor_meja,
        nama_pelanggan: transaksi?.nama_pelanggan,
        status: transaksi?.status,
        status_meja: transaksi?.meja?.status,
      });
    }
  }, [transaksi, reset]);

  useEffect(() => {
    getTransaksi();
  }, []);

  return (
    <Container>
      <Box textAlign={{ md: "left" }} pt={{ base: "100", md: "1" }}>
        <Text cursor={"pointer"} onClick={() => navigate("/dashboard/kasir/transaksi")} mb={4}>
          {`<-- Kembali Ke Transaksi`}
        </Text>
        <Heading text="Detail Transaksi" />

        {/* Tombol Simpan Transaksi dan Cetak */}
        <Flex gap={4} mb={6} mt={3}>
          <Button
            colorScheme={isLunas ? "gray" : "green"}
            size={"md"}
            w={{ md: "40%", lg: "30%", xl: "15%" }}
            onClick={handleSubmit(async (values) => {
              await submitHandlerTransaksi(values);
            })}
            isLoading={loading}
            isDisabled={isLunas} // Nonaktifkan tombol jika status sudah lunas
          >
            Simpan Transaksi
          </Button>

          <Box w={{ md: "40%", lg: "30%", xl: "10%" }}>
            <Link to={`/dashboard/kasir/transaksi/${id}/cetak`}>
              <Button colorScheme={"blue"} size={"md"} w={"full"} isLoading={loading}>
                Cetak
              </Button>
            </Link>
          </Box>
        </Flex>
        
        {/* Box untuk Detail Transaksi */}
        <Box
          bg="white"
          p={4}
          rounded="lg"
          shadow="md"
          border="1px"
          borderColor={borderColor}
          mb={6}
        >
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
            <GridItem>
              <Flex direction="column">
                <Text fontSize={{ base: "xs", md: "sm" }} fontFamily="Poppins">
                  Tanggal Transaksi
                </Text>
                <Input
                  name="tgl_transaksi"
                  id="tgl_transaksi"
                  borderRadius="lg"
                  focusBorderColor="blue.600"
                  placeholder="Tanggal Transaksi"
                  {...register("tgl_transaksi")}
                  isReadOnly
                />
              </Flex>

              <Flex direction="column" my={4}>
                <Text fontSize={{ base: "xs", md: "sm" }} fontFamily="Poppins">
                  Status Pembayaran
                </Text>
                <Input
                  name="status"
                  id="status"
                  borderRadius="lg"
                  focusBorderColor="blue.700"
                  isReadOnly
                  {...register("status", { required: true })}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column">
                <Text fontSize={{ base: "xs", md: "sm" }} fontFamily="Poppins">
                  Nomor Meja
                </Text>
                <Input
                  name="id_meja"
                  id="id_meja"
                  borderRadius="lg"
                  focusBorderColor="blue.600"
                  placeholder="Nomor Meja"
                  {...register("id_meja")}
                  isReadOnly
                />
              </Flex>

              <Flex direction="column" my={4}>
                <Text fontSize={{ base: "xs", md: "sm" }} fontFamily="Poppins">
                  Status Meja
                </Text>
                <Input
                  name="status_meja"
                  id="status_meja"
                  borderRadius="lg"
                  focusBorderColor="blue.600"
                  placeholder="Status Meja"
                  {...register("status_meja", { required: true })}
                  isReadOnly
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column">
                <Text fontSize={{ base: "xs", md: "sm" }} fontFamily="Poppins">
                  Nama Pelanggan
                </Text>
                <Input
                  name="nama_pelanggan"
                  id="nama_pelanggan"
                  borderRadius="lg"
                  focusBorderColor="blue.600"
                  placeholder="Nama Pelanggan"
                  {...register("nama_pelanggan", { required: true })}
                  isReadOnly
                />
              </Flex>
            </GridItem>
          </Grid>
        </Box>

        {/* Box untuk Detail Pemesanan */}
        <Box
          bg="white"
          p={4}
          rounded="lg"
          shadow="md"
          border="1px"
          borderColor={borderColor}
        >
          <Heading text="Detail Pesanan" my={4} fontSize={{ base: "md", md: "lg" }} />
          <Table variant="simple" size={{ base: "sm", md: "lg" }} my={4}>
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
                  <Td>{convertToRupiah(row.menu.harga)}</Td>
                  <Td>x{row.jumlah}</Td>
                  <Td>{convertToRupiah(row.harga)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Divider borderColor="black" my={2} h="1px" />

          {kolomMenu.length > 0 && (
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <Text fontSize={{ base: "sm", md: "md" }} ml="29px" fontFamily="Poppins" fontWeight="bold">
                Total Harga
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }}  mr="110px" fontFamily="Poppins" fontWeight="bold">
                {convertToRupiah(kolomMenu.reduce((total, item) => total + item.harga, 0))}
              </Text>
            </Flex>
          )}
        </Box>

        <AlertNotification status={status} message={message} />
      </Box>
    </Container>
  );
}
