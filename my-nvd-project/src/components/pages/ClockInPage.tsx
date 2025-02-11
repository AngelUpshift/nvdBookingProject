import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { ClockInForm } from "../components/ClockIn/ClockInForm";
import MediaQuery from "react-responsive";
import { NavigationBarDesktopNoLogout } from "../components/NavigationBar/NavigationBarDesktopNoLogout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";

export const ClockInPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("clockInStatus");
    const clockInData = storedData ? JSON.parse(storedData) : null;

    const today = dayjs().format("YYYY-MM-DD");

    if (
      clockInData &&
      clockInData.date === today &&
      clockInData.status === "clockedIn"
    ) {
      navigate("/clock-out");
    }
  }, [navigate]);

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
        <ClockInForm />
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
