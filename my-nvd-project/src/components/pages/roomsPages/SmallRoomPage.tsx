import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";
import { ButtonBack } from "../../components/ButtonBack/ButtonBack";
import { SmallRoomForm } from "../../components/Rooms/SmallRoomForm";
import MediaQuery from "react-responsive";
import { NavigationBarDesktopNoLogout } from "../../components/NavigationBar/NavigationBarDesktopNoLogout";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { getRoomThunk } from "../../redux/slices/roomSlice";
import { Link } from "react-router-dom";

export const SmallRoomPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.room);

  useEffect(() => {
    const defaultQueryParams = {
      search: "",
      sortBy: "createdAt",
      page: 1,
      order: "asc",
    };

    dispatch(getRoomThunk(room.queryParameters || defaultQueryParams));
  }, [dispatch, room.queryParameters]);

  return (
    <Container
      maxWidth="xs"
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
          padding: theme.spacing(2),
          borderRadius: 2,
          backgroundColor: "white",
          overflow: "hidden", // Prevent overflow
        }}
      >
        <MediaQuery maxWidth={1025}>
          <ButtonBack />
        </MediaQuery>
        {room.roomList.length > 0 && (
          <>
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                display: isMobile ? "none" : "flex",
                flexDirection: "row",
                position: "absolute",
                left: "100px",
                top: "130px",
                gap: "5px",
              }}
            >
              <Link to="/room" style={{ textDecoration: "none" }}>
                <Typography color="#686868">Home / </Typography>
              </Link>
              <Typography color=" #039ADE">
                {" "}
                {room.roomList[1]?.name} 🏣
              </Typography>
            </Box>
            <Typography
              sx={{
                width: "100%",
                maxWidth: 361,
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                left: isMobile ? 16 : "",
                top: isMobile ? 112 : 185,
              }}
              textAlign={isMobile || isTablet ? "left" : "center"}
              fontStyle="Roboto"
              fontSize="24px"
              fontWeight="700"
              lineHeight="33.6px"
            >
              {room.roomList[1]?.name} 🏣
              <Typography
                sx={{
                  width: "100%",
                  maxWidth: 361,
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  left: isMobile ? 0 : "",
                  top: isMobile ? 25 : 30,
                }}
                textAlign={isMobile || isTablet ? "left" : "center"}
                fontStyle="Roboto"
                fontSize="18px"
                fontWeight="400"
                lineHeight="25.6px"
                color="#686868"
              >
                {" "}
                {room.roomList[1]?.desks.length} seats / 0 seats available
              </Typography>
            </Typography>
            <SmallRoomForm />
          </>
        )}
        <MediaQuery maxWidth={1025}>
          {" "}
          <NavigationBar />
        </MediaQuery>
        <MediaQuery minWidth={1026}>
          {" "}
          <NavigationBarDesktopNoLogout />
        </MediaQuery>
      </Box>
    </Container>
  );
};
