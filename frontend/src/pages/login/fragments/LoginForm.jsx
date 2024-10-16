// import library yang dibutuhkan
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import {
  Button,
  Box,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormHelperText,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import loginHandler from "./LoginHandler";
import AlertNotification from "../../../components/alert";

// buat komponen LoginForm
export default function LoginForm() {
  // buat state
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  // buat fungsi untuk menampilkan password
  const handleClick = () => setShow(!show);

  // buat fungsi untuk navigasi
  const navigate = useNavigate();

  // buat fungsi untuk validasi form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // buat fungsi untuk submit form
  const submitHandler = async (values) => {
    // set state loading menjadi true
    setIsLoading(true);

    // jalankan fungsi loginHandler
    const res = await loginHandler(values);

    // set state message dan status
    setMessage(res.message);
    setStatus(res.status);

    // set timeout untuk menampilkan pesan
    setTimeout(() => {
      if (res.status === "success") {
        if (res.data.role === "admin") {
          navigate("/dashboard/admin/");
        } else if (res.data.role === "manajer") {
          navigate("/dashboard/manajer/");
        } else {
          navigate("/dashboard/kasir/");
        }
      }
      setMessage("");
      setStatus("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // Tinggi layar penuh
      minWidth="100vw" // Lebar layar penuh
      backgroundImage="url('../../src/assets/bg-login.png')"
      backgroundSize="cover" // Agar gambar menutupi seluruh area
      backgroundPosition="center" // Posisikan gambar di tengah
      px={4}
    >
      <Box
        bg="white" // Form di dalam box putih
        p={8}
        maxWidth="400px"
        width="90%" // Responsif
        borderRadius="2xl"
        boxShadow="lg" // Tambahkan bayangan
      >
        {/* Notifikasi alert */}
        <AlertNotification status={status} message={message} />

        <VStack spacing={4} align="center" mb={6}>
          {/* Menambahkan logo di atas form */}
          <Image
            src="../../src/assets/image-login.png"
            alt="Logo"
            boxSize={{ base: "150px", md: "200px" }} // Ukuran logo responsif
            mb={-8}
          />
          <Heading fontWeight={600} color="gray.700" fontSize={{ base: "lg", md: "xl" }}>
            Selamat Datang Di Wikusama Caffe
          </Heading>
          <Text fontSize="md" color="gray.500">
            Silakan login untuk melanjutkan
          </Text>
        </VStack>

        <form onSubmit={handleSubmit(submitHandler)}>
          <FormControl mb={4}>
            <Input
              type="text"
              name="username"
              id="username"
              borderRadius="full"
              focusBorderColor="#092e78"
              placeholder="Username"
              borderWidth="2px"
              borderColor="gray.300"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <FormHelperText textColor="red.500">Masukkan username</FormHelperText>
            )}
          </FormControl>

          <FormControl mb={6}>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                name="password"
                id="password"
                borderRadius="full"
                focusBorderColor="#092e78"
                placeholder="Password"
                borderWidth="2px"
                borderColor="gray.300"
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
              />
              <InputRightElement>
                <IconButton
                  borderRadius="full"
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={handleClick}
                  aria-label={show ? "Hide password" : "Show password"}
                  icon={show ? <EyeOff /> : <Eye />}
                  color="#092e78" // Mengubah warna ikon
                />
              </InputRightElement>
            </InputGroup>
            {errors.password?.type === "required" && (
              <FormHelperText textColor="red.500">Masukkan password</FormHelperText>
            )}
            {errors.password?.type === "minLength" && (
              <FormHelperText textColor="red.500">
                Password minimal 8 karakter
              </FormHelperText>
            )}
          </FormControl>

          <Button
            mt={4}
            bg="#092e78"
            color="white"
            isLoading={isLoading}
            type="submit"
            w="full"
            borderRadius="full"
            border="2px" // Menentukan ketebalan border
            borderColor="#092e78" // Warna border
            _hover={{ bg: "white", color: "#092e78", borderColor: "#092e78" }} // Mengatur border saat hover
          >
            Masuk
          </Button>
        </form>
      </Box>
    </Box>
  );
}
