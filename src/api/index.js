import axios from "axios";
import { toast } from "react-toastify";

export const getCart = async () =>
  await axios.get("/api/cart").then((resp) => resp.data);

export const checkCartQty = async (body) =>
  await axios
    .post("api/product/check", body)
    .then((resp) => {
      toast.success(resp.data.message);
      return resp.data;
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      return err.response.data;
    });
