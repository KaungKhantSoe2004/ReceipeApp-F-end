import axios from "axios";

const BASE_URL = "https://api.wavemoney.com/v1"; // Replace with actual Wave Pay API URL

const wavePayService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer YOUR_API_KEY`, // Replace with your actual API key
  },
});

export const initiatePayment = async (paymentDetails) => {
  try {
    const response = await wavePayService.post("/payments", paymentDetails);
    return response.data;
  } catch (error) {
    console.error("Error initiating payment", error);
    throw error;
  }
};

export const checkPaymentStatus = async (transactionId) => {
  try {
    const response = await wavePayService.get(`/payments/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error checking payment status", error);
    throw error;
  }
};

export default wavePayService;
