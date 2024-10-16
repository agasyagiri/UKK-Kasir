// import library yang dibutuhkan
import React from "react";
import { Flex } from "@chakra-ui/react";
import Delete from "./action/Delete";
import Edit from "./action/Edit";

// buat komponen ActionButton
export default function ActionButton({ payload, reload }) {
  return (
    <Flex dir="row" gap={3}>
      {/* set payload dan reload ke komponen Delete dan Edit */}
      <Edit payload={payload} reload={reload} />
      <Delete payload={payload} reload={reload} />
    </Flex>
  );
}
