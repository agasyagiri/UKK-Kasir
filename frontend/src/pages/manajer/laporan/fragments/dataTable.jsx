import React from "react";
import { Text, Image, Box } from "@chakra-ui/react";
import { convertToRupiah } from "../../../../utils/routes/FormatRupiahs";

const columns = [
  {
    title: "No",
    key: "no",
    width: "8%",
    render: (text, record,index) => (
      <span>
        {index + 1}
      </span>
    ),
  },
  {
    title: "Nama Pelanggan",
    width: "15%",
    dataIndex: "transaksi",
    key: "transaksi",
    render: (data) => <span>{data?.nama_pelanggan}</span>,
  },
  {
    title: "Status",
    dataIndex: "transaksi",
    key: "transaksi",
    width: "15%",
    render: (data) => <span>{data?.status}</span>,
  },
  {
    title: "Tanggal Transaksi",
    dataIndex: "transaksi",
    key: "transaksi",
    width: "15%",
    render: (data) => (
      <span>
        {new Date(data?.tgl_transaksi).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "Pendapatan",
    dataIndex: "pendapatan",
    key: "pendapatan",
    width: "15%",
    render: (pendapatan) => (
      <Box>
        <Text fontWeight="bold" color="blackAlpha.900">
        {convertToRupiah(pendapatan)}
        </Text>
      </Box>
    ),
  },
];

export { columns };
