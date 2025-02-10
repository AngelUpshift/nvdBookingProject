import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Cloud, WbSunny } from "@mui/icons-material";

// Define the types for the weather data
interface WeatherData {
  temperature: number;
  weathercode: number;
  wind_speed: number;
  humidity: number; // Add humidity field
  feels_like: number; // Add feels_like field
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: 41.9981, // Latitude for Skopje
              longitude: 21.4254,
              current_weather: true,
              // Assuming the API supports these additional parameters for humidity and feels like temperature
            },
          }
        );

        const currentWeather = response.data.current_weather;
        setWeather({
          temperature: currentWeather.temperature,
          weathercode: currentWeather.weathercode,
          wind_speed: response.data.current_weather.windspeed || 0,
          humidity: currentWeather.humidity, // Use default if not available
          feels_like: currentWeather.feels_like || currentWeather.temperature, // Use temperature if feels like is not available
        });

        setLoading(false);
      } catch (error) {
        setError("Error fetching weather data");
        setLoading(false);
        console.log(error);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!weather) {
    return <Typography color="error">Weather data is not available</Typography>;
  }

  const getWeatherIcon = () => {
    switch (weather.weathercode) {
      case 0:
        return (
          <WbSunny
            sx={{
              fontSize: 80,
              color: "#FFD700",
              maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
              width: "100%",
            }}
          />
        );
      case 1:
      case 2:
      case 3:
        return (
          <Cloud
            sx={{
              fontSize: 80,
              color: "#90A4AE",
              maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
              width: "100%",
            }}
          />
        );
      case 4:
        return (
          <Cloud
            sx={{
              fontSize: 80,
              color: "#9E9E9E",
              maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
              width: "100%",
            }}
          />
        );
      default:
        return (
          <Cloud
            sx={{
              fontSize: 80,
              color: "#90A4AE",
              maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
              width: "100%",
            }}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
        width: "100%",
        padding: 2,
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        background: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)",
        textAlign: "center",
        color: "#FFFFFF",
        height: "196px",
        display: "flex",
        flexDirection: "row",
        gap: "50px",
      }}
    >
      <Box
        sx={{
          maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
            width: "100%",
            fontWeight: "bold",
            marginBottom: 1,
            fontSize: "30px",
            display: "flex",
            fontStyle: "Roboto",
          }}
        >
          Skopje
        </Typography>
        <Typography
          sx={{
            maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
            width: "100%",
            fontWeight: "bold",
            marginBottom: 1,
            fontSize: "40px",
            lineHeight: "1",
            fontStyle: "Roboto",
          }}
        >
          {weather.temperature}°C
        </Typography>

        <Box
          sx={{
            maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            color: "#FFFFFF",
            gap: "3px",
            paddingTop: "20px",
          }}
        >
          <Box>
            <Typography
              sx={{
                maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
                width: "100%",
                fontSize: "16px",
                marginBottom: 0.5,
                display: "flex",
                paddingRight: 5,
                fontStyle: "Roboto",
              }}
            >
              Wind
            </Typography>
            <Typography
              sx={{
                maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
                width: "100%",
                fontSize: "16px",
                display: "flex",
                fontStyle: "Roboto",
              }}
            >
              {weather.wind_speed} km/h
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
                width: "100%",
                fontSize: "16px",
                marginBottom: 0.5,
                fontStyle: "Roboto",
              }}
            >
              Feels
            </Typography>
            <Typography
              sx={{
                maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
                width: "100%",
                fontSize: "16px",
                fontStyle: "Roboto",
              }}
            >
              {weather.feels_like}°C
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 5,
          maxWidth: isMobile || isTablet ? "342px" : "342px", // Adjust maxWidth based on screen size
          width: "100%",
        }}
      >
        {getWeatherIcon()}
      </Box>
    </Box>
  );
};

export default WeatherWidget;
