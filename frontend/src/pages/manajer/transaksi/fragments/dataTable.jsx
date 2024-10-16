import React from "react";
import ActionButton from "./ActionButton";
import { Flex } from "@chakra-ui/react";

const columns = [
  {
    title: (
      <span style={{ textAlign: "center", display: "block" }}>
        Nama Kasir
      </span>
    ),
    dataIndex: "user",
    key: "user",
    width: "15%",
    render: (data) => (
      <span style={{ textAlign: "center", display: "block" }}>
        {data?.nama_user}
      </span>
    ),
  },
  {
    title: (
      <span style={{ textAlign: "center", display: "block" }}>
        Nama Pelanggan
      </span>
    ),
    dataIndex: "nama_pelanggan",
    key: "nama_pelanggan",
    width: "15%",
    render: (data) => (
      <span style={{ textAlign: "center", display: "block" }}>
        {data}
      </span>
    ),
  },
  {
    title: (
      <span style={{ textAlign: "center", display: "block" }}>
        Nomor Meja
      </span>
    ),
    dataIndex: "meja",
    key: "nomor_meja",
    width: "15%",
    render: (data) => (
      <span style={{ textAlign: "center", display: "block" }}>
        {data?.nomor_meja}
      </span>
    ),
  },
  {
    title: (
      <span style={{ textAlign: "center", display: "block" }}>
        Tanggal Transaksi
      </span>
    ),
    dataIndex: "tgl_transaksi",
    key: "tgl_transaksi",
    width: "15%",
    render: (data) => (
      <span style={{ textAlign: "center", display: "block" }}>
        {new Date(data).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    title: (
      <span style={{ textAlign: "center", display: "block" }}>
        Status
      </span>
    ),
    dataIndex: "status",
    key: "status",
    width: "15%",
    render: (data) => (
      <span style={{ textAlign: "center", display: "block" }}>
        {data}
      </span>
    ),
  },
  {
    key: "aksi",
    width: "15%",
    render: (data) => (
      <Flex justifyContent="center" alignItems="center">
        <ActionButton payload={data} reload={data?.reload} />
      </Flex>
    ),
  },
];

export { columns };
