import React from "react";
import { Text, Flex, Tag } from "@chakra-ui/react";
import ActionButton from "./ActionButton";

const columns = [
  {
    title: <Flex justifyContent="center">Nomor Meja</Flex>,
    dataIndex: "nomor_meja",
    key: "nomor_meja",
    width: "30%",
    defaultSortOrder: "ascend",
    render: (value) => (
      <Flex justifyContent="center" alignItems="center">
        <Text fontWeight="bold">{value}</Text>
      </Flex>
    ),
  },
  {
    title: <Flex justifyContent="center">Status</Flex>,
    dataIndex: "status",
    key: "status",
    width: "30%",
    sorter: (a, b) => {
      const statusOrder = {
        Kosong: 1,
        Terisi: 2,
      };
      return statusOrder[a.status] - statusOrder[b.status];
    },
    render: (value) => {
      let colorScheme = value === "Kosong" ? "green" : "red";

      return (
        <Flex justifyContent="center" alignItems="center">
          <Tag
            justifyContent="center"
            alignItems="center"
            minWidth="150px"
            size="lg"
            colorScheme={colorScheme}
            borderRadius="lg"
            width="200px"
            textAlign="center"
            fontWeight="bold"
          >
            {value}
          </Tag>
        </Flex>
      );
    },
  },
  {
    title: <Flex justifyContent="center"></Flex>,
    key: "aksi",
    width: "35%",
    render: (data) => (
      <Flex justifyContent="center" alignItems="center">
        <ActionButton payload={data.id_meja} reload={data.reload} />
      </Flex>
    ),
  },
];

export { columns };