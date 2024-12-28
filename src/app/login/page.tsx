"use client";

import { login } from "@/api/services/authService";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");
  const { setIsAuthenticated } = useContext(AppContext);

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
  }, []);

  if (token) {
    window.location.href = "/";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      sessionStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError(true);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <hr className="my-8" />
      </div>
      <form onSubmit={handleSubmit} className="flex justify-around">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          action={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          action={(e) => setPassword(e.target.value)}
        />
        <Button text="Entrar" />
      </form>
      <div className="block text-sm mt-8 text-[#19c1ce] text-center hover:text-[#0e899c]">
        <Link href={"/signup"}>Criar conta</Link>
      </div>
      {error && (
        <div className="mt-8 flex justify-center text-orange-600">
          Houve um erro ao realizar o login. Tente novamente.
        </div>
      )}
    </div>
  );
};

export default Login;
