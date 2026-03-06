import axios from "axios";

const BASE_URL = "https://front-school-strapi.ktsdev.ru/api";

type CallParams = {
  endpoint: string;
  method?: string;
  data?: any;
  params?: Record<string, any>;
  withAuth?: boolean;
  token?: string;
  headers?: Record<string, string>;
};

type CallResponse<T> = {
  isError: boolean;
  data: T | null;
  error: string | null;
  status: number | null;
};

export async function call<T = any>({
  endpoint,
  method = "GET",
  data,
  params,
  withAuth = false,
  token,
  headers = {},
}: CallParams): Promise<CallResponse<T>> {
  try {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${BASE_URL}${endpoint}`;

    const authToken = token || (withAuth ? localStorage.getItem("jwt") : null);

    const response = await axios({
      method,
      url,
      data,
      params,
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      },
    });

    return {
      isError: false,
      data: response.data,
      error: null,
      status: response.status,
    };
  } catch (error: any) {
    return {
      isError: true,
      data: null,
      error:
        error.response?.data?.error?.message ||
        error.message ||
        "Unknown error",
      status: error.response?.status || null,
    };
  }
}
