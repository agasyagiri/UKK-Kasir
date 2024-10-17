// import library yang dibutuhkan
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Input,
  Flex,
  Grid,
  GridItem,
  Select,
  Button,
  Box,
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
import { getTransaksiById, getDetailTransaksiByIdTransaksi, } from "./fragments/ApiHandler";
import { updateTransaksi, updateStatusMeja, } from "../transaksi/fragments/ApiHandler";
import AlertNotification from "../../../components/alert";
import { convertToRupiah } from "../../../utils/routes/FormatRupiahs";

// buat komponen index
export default function index() {
  // deklarasi variabel
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [kolomMenu, setKolomMenu] = useState([]);
  const [isLunas, setIsLunas] = useState(false); // state untuk mengetahui apakah transaksi sudah lunas

  // fungsi untuk mengambil data transaksi berdasarkan id
  const getTransaksi = async () => {
    const res = await getTransaksiById(id);
    const resDetailTransaksi = await getDetailTransaksiByIdTransaksi(id);
    setTransaksi(res.data);
    setKolomMenu(resDetailTransaksi.data);

    // Jika status transaksi adalah "lunas", set state isLunas menjadi true
    if (res.data.status === "Lunas") {
      setIsLunas(true);
    } else {
      setIsLunas(false);
    }
  };

  // fungsi untuk handle submit transaksi
  const submitHandlerTransaksi = async (values) => {
    // set loading menjadi true
    setLoading(true);

    // Set status pembayaran langsung menjadi "Lunas"
    const value = {
      nama_pelanggan: values.nama_pelanggan,
      status: "Lunas",
      id_meja: transaksi.meja.id_meja,
    };

    // panggil fungsi updateTransaksi
    const res = await updateTransaksi(id, value);

    // Ubah status meja menjadi kosong
    const statusMeja = "Kosong";

    // Panggil updateStatusMeja dengan status baru
    const resUpdateMeja = await updateStatusMeja(transaksi.meja.id_meja, {
      status: statusMeja,
    });

    // set message dan status dari respon
    setMessage(res.message);
    setStatus(res.status);

    // Jika transaksi dan meja berhasil diupdate
    if (res.status === "success" && resUpdateMeja.status === "success") {
      setTimeout(() => {
        reset(),
          setStatus(""),
          setMessage(""),
          getTransaksi(),
          setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
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

  // ambil data transaksi saat komponen di-render
  useEffect(() => {
    getTransaksi();
  }, []);

  return (
    <Container>
      <Box
        textAlign={{ md: "left" }} // Pusatkan teks pada layar kecil dan sedang
        pt={{ base: "100", md: "1" }} // Padding top lebih besar di layar sedang
      >
        <Text
          cursor={"pointer"}
          onClick={() => navigate("/dashboard/kasir/transaksi")}
          mb={4}
        >{`<-- Kembali Ke Transaksi`}</Text>
        <Heading text="Detail Transaksi" /> {/* memanggil komponen heading */}
        <Flex gap={4}>
          <Button
            colorScheme={isLunas ? "gray" : "green"} // Ubah warna tombol jika status sudah lunas
            size={"md"}
            w={{ md: "40%", lg: "30%", xl: "15%" }}
            mt={2}
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
              <Button
                colorScheme={"blue"}
                size={"md"}
                w={"full"}
                mt={2}
                isLoading={loading}
              >
                Cetak
              </Button>
            </Link>
          </Box>
        </Flex>
        {/* menampilkan alert notifikasi */}
        <AlertNotification status={status} message={message} />
        <Box px={{ base: 2, md: 6 }} py={4}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={{ base: 5, md: 10 }}
            my={6}
          >
            {/* Input fields yang sudah ada */}
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
                  {...register("status", {
                    required: true,
                  })}
                />
                {errors.status?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Masukkan Status
                  </FormHelperText>
                )}
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
                  {...register("status_meja", {
                    required: true,
                  })}
                  isReadOnly
                />
                {errors.status_meja?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Masukkan Status Meja
                  </FormHelperText>
                )}
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
                  {...register("nama_pelanggan", {
                    required: true,
                  })}
                  isReadOnly
                />
                {errors.nama_pelanggan?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Masukkan Nama Pelanggan
                  </FormHelperText>
                )}
              </Flex>
            </GridItem>
          </Grid>

          <Heading text="Detail Pemesanan" my={4} fontSize={{ base: "md", md: "lg" }} />

          {/* Table detail pemesanan */}
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

          <Divider borderColor="black" my={2} h="1px" mr={{ base: 0, md: 500 }} />

          {kolomMenu.length > 0 && (
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontFamily="Poppins"
                fontWeight="bold"
                ml={{ base: 0, md: 5 }}
              >
                Total Harga
              </Text>

              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontFamily="Poppins"
                fontWeight="bold"
                mr={{ base: 0, md: "125px" }}
              >
                {convertToRupiah(kolomMenu.reduce((total, item) => total + item.harga, 0))}
              </Text>
            </Flex>
          )}
        </Box>
      </Box>
    </Container>
  );
}