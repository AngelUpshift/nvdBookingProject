import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoginForm } from "../components/Login/LoginForm";
import { LoginImages } from "../components/Login/LoginImages";
// import { LoginImages } from "../components/Login/LoginImages";
// import { LoginForm } from "../components/Login/LoginForm";

export const HomePage = () => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
        <LoginImages />
        <LoginForm />
      </Box>
    </Container>
  );
};
