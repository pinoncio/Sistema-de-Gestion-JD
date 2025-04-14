import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import Header from "../Components/Layout/Header";
import { styled } from "@mui/system";
import ContactForm from "../Components/ContactForm";
import Footer from "../Components/Layout/Footer";

const ImageContainer = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  height: "550px",
  margin: "0 auto",
  overflow: "hidden",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const HeroImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Box id="portada" sx={{ textAlign: "center", padding: 5, backgroundColor: "#ffffff" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Logo antes del título */}
          <img
            src={require("../assets/images/logo.jpg")}
            alt="Logo JDService"
            style={{ width: "150px", marginBottom: "20px" }}
          />

          {/* Card para el título */}
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Mantención y Reparación de Maquinaria Agrícola
            </Typography>
          </CardContent>

          <Typography variant="body1" sx={{ maxWidth: 800, margin: "0 auto" }}>
            En JDService, proporcionamos soluciones confiables y eficientes en la reparación y mantención de maquinaria agrícola, asegurando que nuestros clientes puedan operar con la máxima productividad y seguridad en sus actividades agrícolas. Nos comprometemos a ofrecer un servicio de calidad, basado en la experiencia, la innovación y la atención personalizada, con el objetivo de extender la vida útil de la maquinaria y contribuir al desarrollo sostenible del sector agrícola.
          </Typography>

          {/* Contenedor cuadrado para la imagen */}
          <ImageContainer>
            <HeroImage
              src={require("../assets/images/portada.png")}
              alt="Portada JDService"
            />
          </ImageContainer>
        </motion.div>
      </Box>

      <hr
        style={{
          width: "50%", // Ancho de la línea
          margin: "20px auto", // Centrado de la línea
          border: "1px solid #ccc", // Color y grosor de la línea
        }}
      />

      {/* Sección "Sobre Nosotros" */}
      <Box id="nosotros" sx={{ textAlign: "center", padding: 5, backgroundColor: "#ffffff" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Card para el título de la sección */}
          <Card
            sx={{
              maxWidth: 900,
              margin: "0 auto",
              boxShadow: 3,
              marginBottom: 3,
              backgroundColor: "#000000",
            }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ color: "#ffffff" }}>
                Sobre Nosotros
              </Typography>
            </CardContent>
          </Card>

          <Typography variant="body1" sx={{ maxWidth: 800, margin: "0 auto" }}>
            En JDService, nos especializamos en ofrecer soluciones integrales y de alta calidad en la reparación y mantenimiento de maquinaria agrícola. Con más de 15 años de experiencia en el sector, nos comprometemos a proporcionar un servicio confiable y personalizado para cada uno de nuestros clientes. Sabemos que la maquinaria agrícola es esencial para el funcionamiento eficiente de cualquier empresa del sector, por lo que nos aseguramos de que nuestros servicios no solo prolonguen la vida útil de sus equipos, sino que también optimicen su rendimiento. Nuestra misión es contribuir al crecimiento sostenible de la agricultura, ofreciendo un soporte técnico profesional que garantice la productividad y seguridad de las operaciones agrícolas. Contamos con un equipo altamente capacitado y en constante formación, siempre al día con las últimas innovaciones tecnológicas en el campo.
          </Typography>
        </motion.div>
      </Box>

      <hr
        style={{
          width: "50%", // Ancho de la línea
          margin: "20px auto", // Centrado de la línea
          border: "1px solid #ccc", // Color y grosor de la línea
        }}
      />

      {/* Sección de contacto */}
      <Box id="contacto" sx={{ marginTop: 6, textAlign: "center" }}>
        <Card
          sx={{
            maxWidth: 900,
            margin: "0 auto",
            boxShadow: 3,
            marginBottom: 3,
            backgroundColor: "#000000",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ color: "#ffffff" }}>
              Contáctanos
            </Typography>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ display: "inline-block", textAlign: "left" }}
        >
          <ContactForm />
        </motion.div>
      </Box>

      {/* Footer solo en Home */}
      <Footer />
    </div>
  );
};

export default Home;
