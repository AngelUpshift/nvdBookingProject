import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ButtonSaveProps {
  onClick: (e: React.FormEvent) => void;
}

export const ButtonSave = ({ onClick }: ButtonSaveProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const handleSaveAndClose = (e: React.FormEvent) => {
    onClick(e);
    handleClickClose();
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery("(max-width: 1024px) and (min-width: 768px)");
  const isDesktop = !isMobile && !isTablet;

  return (
    <Box
      sx={{
        width: isMobile || isTablet ? 89 : "324px",
        height: isMobile || isTablet ? 38 : "50px",
        top: isMobile || isTablet ? 62 : "",
        right: isMobile || isTablet ? 16 : 0,
        bottom: isDesktop ? 16 : "",
        left: isDesktop ? 0 : "",
        margin: isDesktop ? "0 auto" : "",
        position: isMobile || isTablet ? "absolute" : "fixed",
        borderRadius: 100,
        backgroundColor: "#039ADE",
      }}
    >
      <Button
        sx={{
          width: isMobile || isTablet ? 89 : "324px",
          padding:
            isMobile || isTablet
              ? "9px 16px 9px 16px"
              : "11px, 20px, 11px, 20px",
          color: "white",
        }}
        onClick={handleClickOpen}
      >
        <Box
          sx={{
            display: "flex",
            width: 57,
            height: 20,
            flexDirection: "row",
            gap: "4px",
            paddingTop: isMobile || isTablet ? "0px" : "10px",
          }}
        >
          <CheckIcon
            sx={{
              width: 20,
              height: 20,
            }}
          />
          <Typography
            sx={{
              width: isMobile || isTablet ? 33 : "45px",
              height: isMobile || isTablet ? 17 : "20px",
            }}
            fontStyle="Roboto"
            fontWeight="700"
            fontSize="14px"
            lineHeight="18.8px"
            letterSpacing="4%"
            textTransform="none"
          >
            Save
          </Typography>
        </Box>
      </Button>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="save-dialog-title"
        aria-describedby="save-dialog-description"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            width: "369px",
            height: "173px",
          },
        }}
      >
        <CloseIcon
          sx={{
            width: 20,
            height: 20,
            display: "flex",
            position: "absolute",
            flexDirection: "column",
            top: 10,
            right: 10,
          }}
          onClick={handleClickClose}
        />
        <DialogTitle id="save-dialog-title">
          <Typography fontSize="18px" fontStyle="Roboto" fontWeight="700">
            Edit Profile
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="save-dialog-description">
            <Typography
              fontWeight="400"
              fontSize="14px"
              fontStyle="Roboto"
              lineHeight="19.6px"
            >
              Are you sure you want to save the made changes?{" "}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="medium"
            sx={{
              width: "78px",
              height: "38px",
              borderRadius: "100px",
              backgroundColor: "#DBDBDD",
              textTransform: "none",
              color: "gray",
              top: "-40%",
              fontWeight: 700,
              fontSize: "14px",
              fontStyle: "Roboto",
              right: "1%",
            }}
            onClick={handleClickClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{
              width: "78px",
              height: "38px",
              padding: "9px 16px 9px 16px",
              borderRadius: "100px",
              textTransform: "none",
              top: "-40%",
              fontWeight: 700,
              fontSize: "14px",
              fontStyle: "Roboto",
              right: "1%",
            }}
            onClick={handleSaveAndClose}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
