import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { ClockOutForm } from "../components/ClockOut/ClockOutForm";
import MediaQuery from "react-responsive";
import { NavigationBarDesktopNoLogout } from "../components/NavigationBar/NavigationBarDesktopNoLogout";

export const ClockOutPage = () => {
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
          overflow: "hidden",
        }}
      >
        <ClockOutForm />
        <MediaQuery maxWidth={1023}>
          {" "}
          <NavigationBar />
        </MediaQuery>
        <MediaQuery minWidth={1024}>
          {" "}
          <NavigationBarDesktopNoLogout />
        </MediaQuery>{" "}
      </Box>
    </Container>
  );
};
