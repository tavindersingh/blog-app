import { AppConstants } from "@/helpers/app_constants";
import axios from "axios";

const client = axios.create({
  baseURL: AppConstants.baseUrl,
});

export default client;
