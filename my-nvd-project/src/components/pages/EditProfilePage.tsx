import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { ButtonBack } from "../components/ButtonBack/ButtonBack";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { EditProfileForm } from "../components/User/EditProfileForm";
import MediaQuery from "react-responsive";
import { NavigationBarDesktopNoLogout } from "../components/NavigationBar/NavigationBarDesktopNoLogout";

export const EditProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery("(max-width: 1024px) and (min-width: 768px)"); // Adjusted to target 1024px specifically

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
        width: "100%",
        height: isMobile ? "90vh" : isTablet ? "100vh" : "90vh", // Adjust height based on screen size
        maxHeight: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            height: "34px",
            display: "flex",
            flexDirection: "column",
            marginBottom: theme.spacing(2),
            marginTop: isMobile ? "112px" : isTablet ? "200px" : "150px",
          }}
          fontStyle="Roboto"
          fontWeight="700"
          fontSize={isMobile ? "20px" : "24px"}
          lineHeight="33.6px"
        >
          Edit Profile
        </Typography>
        <MediaQuery maxWidth={1024}>
          {" "}
          <ButtonBack />
        </MediaQuery>

        <EditProfileForm />

        <MediaQuery maxWidth={1024}>
          {" "}
          <NavigationBar />
        </MediaQuery>
        <MediaQuery minWidth={1025}>
          {" "}
          <NavigationBarDesktopNoLogout />
        </MediaQuery>
      </Box>
    </Container>
  );
};
