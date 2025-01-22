import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "10px 0",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography variant="body2">
        &copy; 2025 JDService. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
