import axios from "axios";

const requestLogin = axios.create({
  baseURL: "",
  timeout: 10000,
});

export default requestLogin;
