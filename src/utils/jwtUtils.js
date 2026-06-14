import { jwtDecode } from "jwt-decode";

export class JwtUtils {
  /**
   * Checks if a JWT token is expired
   * @param {string} token - The JWT token to check
   * @returns {boolean} - True if the token is expired, false otherwise
   */
  static isTokenExpired(token) {
    if (!token) {
      return true;
    }

    try {
      // Decode the token to get the expiration time
      const decodedToken = jwtDecode(token);

      // Get the current time in seconds
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if the expiration time is less than the current time
      return decodedToken.exp < currentTime;
    } catch (error) {
      // If there's an error decoding the token (invalid format, etc.)
      return true;
    }
  }

  /**
   * Gets the time remaining for a token before expiration
   * @param {string} token - The JWT token to check
   * @returns {number} - Seconds remaining before token expiration, or 0 if expired/invalid
   */
  static getTokenRemainingTime(token) {
    if (!token) {
      return 0;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = decodedToken.exp - currentTime;

      return remainingTime > 0 ? remainingTime : 0;
    } catch (error) {
      console.error("Error decoding token:", error);
      return 0;
    }
  }
}

export default JwtUtils;
