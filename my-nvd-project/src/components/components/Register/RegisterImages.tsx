import { Box } from "@mui/material";
import logo from "../../../img/image 1.svg";

export const RegisterImages = () => {
  return (
    <Box
      component="img"
      src={logo}
      sx={{
        width: "100%",
        maxWidth: "239px",
        mt: 5,
      }}
    />
  );
};
