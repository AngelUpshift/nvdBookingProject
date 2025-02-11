import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { ForgotPasswordForm } from "../components/ForgotPassword/ForgotPasswordForm";
import { ForgotPasswordImages } from "../components/ForgotPassword/ForgotPasswordImages";

export const ForgotPasswordPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Container
      maxWidth={isMobile ? "xs" : isTablet ? "sm" : "lg"} // Adjust maxWidth based on screen size
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: isMobile ? "100%" : isTablet ? "400px" : "500px",
          padding: theme.spacing(2),
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <ForgotPasswordImages />
        <ForgotPasswordForm />
      </Box>
    </Container>
  );
};
