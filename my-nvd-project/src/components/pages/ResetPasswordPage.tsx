import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
// import { ResetPasswordImages } from "../components/ResetPassword/ResetPasswordImages";
import { ResetPasswordForm } from "../components/ResetPassword/ResetPasswordForm";
import { ResetPasswordImages } from "../components/ResetPassword/ResetPasswordImages";

export const ResetPasswordPage = () => {
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
        minHeight: "100vh",
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
          overflow: "hidden", // Prevent overflow
        }}
      >
        <ResetPasswordImages />
        <ResetPasswordForm />
      </Box>
    </Container>
  );
};
