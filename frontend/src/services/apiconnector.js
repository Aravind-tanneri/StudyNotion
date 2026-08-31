import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  timeout: 90000,
});

let pendingRequests = 0;
let serverAwakeToastId = null;
let serverAwakeTimer = null;

const showServerAwakeToast = () => {
  if (serverAwakeToastId === null) {
    serverAwakeToastId = toast.loading(
      "Connecting to server... Please wait, it may be waking up.",
      { id: "server-awake-toast" }
    );
  }
};

const hideServerAwakeToast = () => {
  if (serverAwakeToastId !== null) {
    toast.dismiss(serverAwakeToastId);
    serverAwakeToastId = null;
  }
};

const onRequestSettled = () => {
  pendingRequests--;
  if (pendingRequests <= 0) {
    pendingRequests = 0;
    clearTimeout(serverAwakeTimer);
    hideServerAwakeToast();
  }
};

axiosInstance.interceptors.request.use((config) => {
  pendingRequests++;
  clearTimeout(serverAwakeTimer);
  serverAwakeTimer = setTimeout(() => {
    if (pendingRequests > 0) {
      showServerAwakeToast();
    }
  }, 3000);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    onRequestSettled();
    return response;
  },
  (error) => {
    onRequestSettled();
    if (
      error.code === "ERR_NETWORK" ||
      error.code === "ECONNABORTED" ||
      error.message?.includes("timeout")
    ) {
      toast.error(
        "Could not reach the server. It may still be starting up, please try again.",
        { id: "server-unreachable-toast", duration: 6000 }
      );
    }
    return Promise.reject(error);
  }
);

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};