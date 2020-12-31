import axios from "axios";

export default axios.create({
  baseURL: "https://jotdown777.herokuapp.com/add/api",
  headers: {
    "Content-type": "application/json"
  }
});