import { ILogin, ISignup } from "@/app/types";
import { fetchApi } from "../fetchApi";

export const login = async (
  email: string,
  password: string
): Promise<ILogin> => {
  const data = await fetchApi(
    "/auth/signin",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    true
  );
  return data;
};

export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<ISignup> => {
  const data = await fetchApi(
    "/auth/signup",
    {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    },
    true
  );
  return data;
};
