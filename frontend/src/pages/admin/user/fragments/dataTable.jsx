import React from "react";
import { Text, Flex, Tag } from "@chakra-ui/react"; // Menggunakan Tag dari Chakra UI untuk styling
import ActionButton from "./ActionButton";

const columns = [
  {
    title: <Flex justifyContent="center">Nama</Flex>,
    dataIndex: "nama_user",
    key: "nama_user",
    width: "15%",
    render: (value) => (
      <Flex justifyContent="center" alignItems="center">
        <Text>{value}</Text>
      </Flex>
    ),
  },
  {
    title: <Flex justifyContent="center">Username</Flex>,
    dataIndex: "username",
    key: "username",
    width: "15%",
    render: (value) => (
      <Flex justifyContent="center" alignItems="center">
        <Text>{value}</Text>
      </Flex>
    ),
  },
  {
    title: <Flex justifyContent="center">Role</Flex>,
    dataIndex: "role",
    key: "role",
    width: "15%",
    render: (role) => {
      let colorScheme = ""; // Warna berdasarkan role
      if (role === "admin") {
        colorScheme = "green"; // Ijo
      } else if (role === "manajer") {
        colorScheme = "blue"; // Biru
      } else if (role === "kasir") {
        colorScheme = "yellow"; // Kuning/Oren
      }

      return (
        <Tag
          display="flex"
          justifyContent="center"
          alignItems="center"
          size="lg"
          colorScheme={colorScheme}
          borderRadius="lg"
        >
          {role}
        </Tag>
      );
    },
  },
  {
    title: "",
    key: "aksi",
    width: "15%",
    render: (data) => (
      <Flex justifyContent="center" alignItems="center">
      <ActionButton payload={data.id_user} reload={data.reload} />
      </Flex>
    ),
  },
];

export { columns };
