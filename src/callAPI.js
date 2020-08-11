import Axios from "axios";
import { URL_API } from "./constants/config";

const callAPI = (uri, method, data = null) => {
  return Axios({
    url: `${URL_API}${uri}`,
    method,
    data,
  });
};

export { callAPI };
