import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  id: string;
}

export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
      return decodedToken?.id || null;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }
  return null;
};
