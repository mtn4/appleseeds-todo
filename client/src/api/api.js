import axios from "axios";

export const myApi = () => {
  let myUrl = "http://localhost:5050/api";
  if (process.env.NODE_ENV === "production") {
    myUrl = "/api";
  }
  return axios.create({
    baseURL: myUrl,
  });
};
