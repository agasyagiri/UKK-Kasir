// import library yang dibutuhkan
import React from "react";
import { Center, Container, Grid, GridItem, Image } from "@chakra-ui/react";
import LoginForm from "./fragments/LoginForm";
import ImageLogin from "../../assets/image-login.png";

// buat komponen index
export default function index() {
  return (
    <Container 
    maxW="80%" gridTemplateRows="repeat(2, 1fr)" py={14} p={0}
    >
      <Center>
        <Grid>
          <GridItem margin={{ base: "auto", lg: "auto" }}>
            <Center>
            </Center>
          </GridItem>
          <GridItem>
            <center>
              {/* tampilkan komponen LoginForm */}
              <LoginForm />
            </center>
          </GridItem>
        </Grid>
      </Center>
    </Container>
  );
}
