import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
export const ButtonBack = () => {
  return (
    <Box
      sx={{
        width: "89px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "38px",
        position: "absolute",
        top: 62,
        backgroundColor: "white",
        left: 16,
      }}
    >
      <Button
        sx={{
          borderRadius: "100px",
          backgroundColor: "#DBDBDD",
          color: "#686868",
          width: "89px",
          height: "38px",
        }}
        href="/room"
      >
        <Box
          sx={{
            width: "57px",
            height: "20px",
            display: "flex",
            flexDirection: "row",
            gap: "4px",
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              width: "20px",
              height: "20px",
            }}
          />
          <Typography
            sx={{
              width: "33px",
              height: "17px",
              paddingTop: "1px",
            }}
            fontSize="14px"
            fontWeight="700"
            lineHeight="16.8px"
            textAlign="center"
            textTransform="none" // Ensure text is not capitalized
          >
            Back
          </Typography>{" "}
        </Box>
      </Button>
    </Box>
  );
};
