import { useLayoutEffect, useRef, useState } from "react";
import { Box, VStack, Image, Spinner, Circle } from "@chakra-ui/react";
import gsap from "gsap";

const WelcomeScreen = ({ onAnimationComplete }) => {
  const comp = useRef(null);
  const [showSpinner, setShowSpinner] = useState(false); // State untuk mengatur tampilan spinner

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        onComplete: () => {
          setShowSpinner(true); // Menampilkan spinner setelah animasi selesai
          setTimeout(() => {
            setShowSpinner(false); // Menghilangkan spinner setelah 0.6 detik
            onAnimationComplete(); // Callback ketika semua animasi selesai
          }, 1500); // Tampilkan spinner selama 1.5 detik
        },
      });

      // Intro slider animation
      t1.from("#intro-slider", {
        xPercent: "-100", // Animasi masuk dari kiri
        duration: 1.5,
        delay: 0.3,
        ease: "power1.inOut", // Smooth easing
      })
        .to("#intro-slider", {
          xPercent: "-100", // Animasi keluar ke kiri
          duration: 1.5,
          ease: "power1.inOut", // Smooth easing
        })
        .from("#welcome", {
          opacity: 0, // Welcome image masuk dengan fade
          duration: 0.5,
        })
        .to("#welcome", {
          opacity: 0, // Fade out the image smoothly
          duration: 1.5,
          delay: 1.5,
          ease: "power1.inOut", // Smooth easing
        });
    }, comp);

    return () => ctx.revert();
  }, [onAnimationComplete]);

  useLayoutEffect(() => {
    if (showSpinner) {
      gsap.to(".circle-spinner", {
        rotate: 360,
        duration: 0.56,
        ease: "linear",
        repeat: -1, // Terus memutar
      });
    }
  }, [showSpinner]);

  return (
    <Box ref={comp} position="relative" h="100vh" w="100vw">
      {/* Slider Section */}
      <VStack
        id="intro-slider"
        minH="100vh"
        p={10}
        bg="gray.50"
        position="absolute"
        top={0}
        left={0}
        zIndex={10}
        w="100vw"
        spacing={10}
        fontFamily="Space Grotesk"
        justifyContent="center"
        textAlign="center"
      >
        <Image
          id="welcome"
          src="/src/assets/image-login.png"
          objectFit="contain"
          maxH={{ base: "50%", sm: "40%", md: "35%", lg: "50%" }} // Mengatur tinggi maksimum gambar (lebih besar di layar kecil)
          maxW={{ base: "50%", sm: "40%", md: "35%", lg: "50%" }} // Mengatur lebar maksimum gambar (lebih besar di layar kecil)
          boxSize={{ base: "250px", sm: "200px", md: "300px", lg: "350px" }} // Ukuran gambar yang responsif
        />
      </VStack>

      {/* Welcome Section */}
      <Box
        bg="black"
        color="white"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100vw"
      >
        <Image
          id="welcome"
          src="/src/assets/image-login1.png"
          objectFit="contain"
          maxH={{ base: "50%", sm: "40%", md: "35%", lg: "50%" }} // Mengatur tinggi maksimum gambar (lebih besar di layar kecil)
          maxW={{ base: "50%", sm: "40%", md: "35%", lg: "50%" }} // Mengatur lebar maksimum gambar (lebih besar di layar kecil)
          boxSize={{ base: "250px", sm: "200px", md: "300px", lg: "350px" }} // Ukuran gambar yang responsif
        />
      </Box>

      {/* Loading Spinner Section */}
      {showSpinner && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* Spinner */}
          <Spinner
            size="lg"
            thickness="4px"
            color="white"
            speed="0.6s"
            emptyColor="transparent"
            position="absolute"
          />
        </Box>
      )}
    </Box>
  );
};

export default WelcomeScreen;
