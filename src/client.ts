import axios from "axios";
import { API_URL } from "constants";

export const client = axios.create({
  baseURL: API_URL,
});
