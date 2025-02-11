import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { RoomsForm } from "../components/Rooms/RoomsForm";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import MediaQuery from "react-responsive";
import { NavigationBarDesktopNoLogout } from "../components/NavigationBar/NavigationBarDesktopNoLogout";

export const RoomsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <>
      <MediaQuery minHeight={781}>
        <Container
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
              padding: theme.spacing(2),
              borderRadius: 2,
              backgroundColor: "white",
              overflow: "hidden", // Prevent overflow
            }}
          >
            <RoomsForm />
            <MediaQuery maxWidth={1023}>
              {" "}
              <NavigationBar />
            </MediaQuery>
            <MediaQuery minWidth={1024}>
              {" "}
              <NavigationBarDesktopNoLogout />
            </MediaQuery>
          </Box>
        </Container>
      </MediaQuery>

      <MediaQuery maxHeight={780}>
        <Container
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
              padding: theme.spacing(2),
            }}
          >
            <RoomsForm />
            <MediaQuery maxWidth={1023}>
              {" "}
              <NavigationBar />
            </MediaQuery>
            <MediaQuery minWidth={1024}>
              {" "}
              <NavigationBarDesktopNoLogout />
            </MediaQuery>
          </Box>
        </Container>
      </MediaQuery>
    </>
  );
};
