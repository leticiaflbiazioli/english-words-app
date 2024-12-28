"use client";

import { signup } from "@/api/services/authService";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
  }, []);

  if (token) {
    window.location.href = "/";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(name, email, password);
      sessionStorage.setItem("token", response.token);
      router.push("/");
    } catch (error) {
      console.error("Erro ao se cadastrar:", error);
      setError(true);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Cadastro</h1>
      <hr className="my-8" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center lg:w-1/2 gap-4"
      >
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          action={(e) => setName(e.target.value)}
          className="block"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          action={(e) => setEmail(e.target.value)}
          className="block"
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          action={(e) => setPassword(e.target.value)}
          className="block"
        />
        <Button text="Cadastrar" />
      </form>
      <div className="block text-sm mt-8 text-[#19c1ce] text-center hover:text-[#0e899c]">
        <Link href={"/login"}>Ir para login</Link>
      </div>
      {error && (
        <div className="mt-8 flex justify-center text-orange-600">
          Houve um erro ao realizar o cadastro. Tente novamente.
        </div>
      )}
    </div>
  );
};

export default SignUp;
