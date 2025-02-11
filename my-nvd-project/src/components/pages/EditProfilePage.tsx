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

  return (
    <Container
      maxWidth="xl"
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
        }}
      >
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: theme.spacing(3),
            width: "100%",
            textAlign: "center",
          }}
          fontFamily="Roboto" // Fixed fontStyle to fontFamily
          fontWeight="700"
          fontSize={isMobile ? "20px" : "24px"}
          lineHeight="33.6px"
        >
          Edit Profile
        </Typography>

        <MediaQuery maxWidth={1024}>
          <ButtonBack />
        </MediaQuery>

        <Box sx={{ width: "100%" }}>
          {" "}
          <EditProfileForm />
        </Box>

        <MediaQuery maxWidth={1024}>
          <NavigationBar />
        </MediaQuery>

        <MediaQuery minWidth={1025}>
          <NavigationBarDesktopNoLogout />
        </MediaQuery>
      </Box>
    </Container>
  );
};
