import axios from "axios";

// Check the health of the server
export const checkHealth = async () => {
  try {
    const response = await axios.get("/api/health");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect to the server.");
  }
};
