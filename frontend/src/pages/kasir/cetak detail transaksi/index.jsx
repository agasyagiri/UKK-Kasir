import React, { useEffect, useState, useRef } from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import Container from "../../../components/container/Container";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getLocalStorage } from "../../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { getTransaksiById, getDetailTransaksiByIdTransaksi } from "./fragments/ApiHandler";
import { jsPDF } from "jspdf";

// buat komponen index
export default function index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, reset } = useForm();
  const [transaksi, setTransaksi] = useState([]);
  const [kolomMenu, setKolomMenu] = useState([]);
  const pdfRef = useRef(); // ref untuk komponen pdf
  const [user, setUser] = useState(null); // State untuk user login

  // jalankan useEffect untuk ambil data user dari localStorage
  useEffect(() => {
    const user = getLocalStorage(LOCAL_STORAGE_USER); // Ambil data user dari localStorage
    setUser(user); // Set state user
  }, []);

  const getTransaksi = async () => {
    const res = await getTransaksiById(id);
    const resDetailTransaksi = await getDetailTransaksiByIdTransaksi(id);
    setTransaksi(res.data);
    setKolomMenu(resDetailTransaksi.data);
  };

  const handleDownload = () => {
    const content = pdfRef.current;

    // Cek apakah transaksi tersedia
    console.log("Transaksi data:", transaksi);

    // Format tanggal transaksi untuk digunakan sebagai nama file
    let tgl_transaksi; // Fallback
    if (transaksi?.tgl_transaksi) {
      const date = new Date(transaksi.tgl_transaksi);
      const formattedDate = date
        .toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");

      const formattedTime = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      tgl_transaksi = `${formattedDate} ${formattedTime}`;
    } else {
      const date = new Date();
      const formattedDate = date
        .toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");

      const formattedTime = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Format 24 jam
      });

      tgl_transaksi = `${formattedDate} ${formattedTime}`;
    }

    console.log("Nama file:", `laporanTransaksi_${tgl_transaksi}.pdf`);

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [210, 600], // Format seperti struk kecil
    });

    doc.html(content, {
      callback: function (doc) {
        doc.save(`laporanTransaksi_${tgl_transaksi}.pdf`); // Nama file berdasarkan tanggal transaksi
      },
      html2canvas: {
        scale: 0.7,
      },
    });
  };

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
  }, [transaksi]);

  useEffect(() => {
    getTransaksi();
  }, []);

  useEffect(() => {
    if (kolomMenu.length > 0) {
      setTimeout(() => {
        handleDownload();
        navigate(`/dashboard/kasir/transaksi/${id}`);
      }, 1500);
    }
  }, [kolomMenu]);

  return (
    <Container>
      <Box ref={pdfRef} fontFamily="monospace" fontSize="12px" p={4} w="300px">
        {/* Header Struk */}
        <Text fontWeight="bold" textAlign="center">
          WIKUSAMA CAFE
        </Text>
        <Text textAlign="center">
          ================================
        </Text>
        <Text>Tanggal : {transaksi?.tgl_transaksi}</Text>
        <Text>Nomor Meja : {transaksi?.meja?.nomor_meja}</Text>
        <Text>Nama Pelanggan : {transaksi?.nama_pelanggan}</Text>
        <Text>Kasir : {user?.nama_user}</Text>
        <Text textAlign="center">
          ================================
        </Text>

        {/* Detail Pemesanan */}
        {kolomMenu.map((row, indexRow) => (
          <Flex justifyContent="space-between" key={indexRow} py={1}>
            <Box>
              <Text>{row.menu.nama_menu}</Text>
              <Text>x{row.jumlah}</Text>
            </Box>
            <Text>Rp {row.menu.harga}</Text>
          </Flex>
        ))}
        <Text textAlign="center">
          ================================
        </Text>

        {/* Total */}
        {kolomMenu.length > 0 && (
          <Flex justifyContent="space-between" fontWeight="bold">
            <Text>Total Harga :</Text>
            <Text>
              Rp.{" "}
              {kolomMenu.reduce((total, item) => total + item.harga, 0)}
            </Text>
          </Flex>
        )}
        <Text textAlign="center">
          ================================
        </Text>
        <Text textAlign="center" mt={4}>
          Terima Kasih
        </Text>
      </Box>
    </Container>
  );
}
