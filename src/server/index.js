import axios from "axios";

const request = axios.create({
  baseURL: "https://65282013931d71583df1ea48.mockapi.io/",
  timeout: 10000,
});

export default request;
