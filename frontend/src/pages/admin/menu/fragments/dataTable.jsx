import React from "react";
import ActionButton from "./ActionButton";
import { Text, Image, Box } from "@chakra-ui/react";
import { BASE_API_IMAGE } from "../../../../utils/constants";
import { convertToRupiah } from "../../../../utils/routes/FormatRupiahs";

const columns = [
  {
    title: "Gambar",
    dataIndex: "gambar",
    key: "gambar",
    width: "15%",
    render: (foto) => (
      <Box display="flex" justifyContent="center" alignItems="center" h="100%">
        <Image
          src={`${BASE_API_IMAGE}/${foto}`}
          alt="foto makanan"
          h={24}
          w={24}
          objectFit="cover"
          objectPosition="center"
          borderRadius={10}
        />
      </Box>
    ),
  },
  {
    title: "Nama Menu",
    dataIndex: "nama_menu",
    key: "nama_menu",
    width: "15%",
    render: (nama_menu) => (
      <Box display="flex" justifyContent="center" alignItems="center" h="100%" >
        <Text fontWeight="bold" color="blackAlpha.900" textAlign="center">
          {nama_menu}
        </Text>
      </Box>
    ),
  },
  {
    title: "Jenis",
    dataIndex: "jenis",
    key: "jenis",
    width: "15%",
    sorter: (a, b) => {
      if (a.jenis < b.jenis) return -1;
      if (a.jenis > b.jenis) return 1;
      return 0;
    },
    render: (jenis) => (
      <Box
        bg={jenis === "makanan" ? "orange.100" : "blue.50"}
        borderRadius="md"
        p="5px"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text color={jenis === "minuman" ? "blue.600" : "red.500"} fontWeight="bold">
          {jenis}
        </Text>
      </Box>
    ),
  }, 
  {
    title: "Harga",
    dataIndex: "harga",
    key: "harga",
    width: "15%",
    render: (harga) => (
      <Box display="flex" justifyContent="center" alignItems="center" h="100%">
        <Text fontWeight="bold" textAlign="center">
          {convertToRupiah(harga)}
        </Text>
      </Box>
    ),
  },
  {
    title: "Deskripsi",
    dataIndex: "deskripsi",
    key: "deskripsi",
    width: "15%",
    render: (data) => (
      <Box display="flex" justifyContent="center" alignItems="center" h="100%">
        <Text noOfLines={2} fontSize="sm" color="gray.600" textAlign="center">
          {data}
        </Text>
      </Box>
    ),
  },
  {
    title: "",
    key: "aksi",
    width: "15%",
    render: (data) => (
      <Box justifyContent="center" alignItems="center">
        <ActionButton payload={data.id_menu} reload={data.reload} />
      </Box>
    ),
  },
];

export { columns };
