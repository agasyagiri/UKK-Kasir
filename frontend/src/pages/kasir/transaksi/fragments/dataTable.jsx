import React from "react";
import ActionButton from "./ActionButton";
import { Text, Box } from "@chakra-ui/react";

const columns = [
  {
    title: "Nama Pelanggan",
    dataIndex: "nama_pelanggan",
    key: "nama_pelanggan",
    width: "15%",
    align: "center", // Menambahkan text alignment di tengah
    render: (text) => (
      <Text textAlign="center">
        {text}
      </Text>
    ),
  },
  {
    title: "Nomor Meja",
    dataIndex: "meja",
    key: "nomor_meja",
    width: "15%",
    align: "center",
    render: (data) => (
      <Text textAlign="center">
        {data?.nomor_meja}
      </Text>
    ),
  },
  {
    title: "Tanggal Transaksi",
    dataIndex: "tgl_transaksi",
    key: "tgl_transaksi",
    width: "15%",
    align: "center",
    render: (data) => (
      <Text textAlign="center">
        {new Date(data).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "15%",
    align: "center",
    sorter: (a, b) => {
      const statusOrder = {
        Lunas: 1,
        belum_bayar: 2,
      };
      return statusOrder[a.status] - statusOrder[b.status];
    },
    render: (status) => (
      <Box
        bg={status === "Lunas" ? "green.200" : "red.200"}
        borderRadius="lg"
        p="7px"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="lg"
        mx="auto"
      >
        {/* Menambahkan ikon sesuai status */}
        {status === "Lunas" ? (
          <Box
            color="green.600"
            mr={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
          </Box>
        ) : (
          <Box
            color="red.600"
            mr={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
          </Box>
        )}

        {/* Teks status pembayaran */}
        <Text
          color={status === "Lunas" ? "green.800" : "red.800"}
          fontWeight="bold"
          fontSize="sm"
          fontFamily="Poppins"
        >
          {status === "Lunas" ? "Lunas" : "Belum Bayar"}
        </Text>
      </Box>
    ),
  },
  {
    title: "",
    key: "aksi",
    width: "15%",
    align: "center",
    render: (data) => (
      <Box display="flex" justifyContent="center">
        <ActionButton payload={data} reload={data?.reload} />
      </Box>
    ),
  },
];


export { columns };
