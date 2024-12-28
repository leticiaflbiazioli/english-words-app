"use client";

import { useApp } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import logo from "../../../public/logo.png";
import { Tooltip } from "../Tooltip";

const handleLogout = () => {
  sessionStorage.removeItem("token");
  localStorage.removeItem("word");
  localStorage.removeItem("dictionaryWord");
  window.location.href = "/login";
};

export const Navbar = () => {
  const { isAuthenticated, dictionaryWord } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-black text-white px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/" className="flex gap-4 text-[#19c1ce]">
            <Image src={logo} width={30} height={30} alt="Logo" />
            Wordland
          </Link>
        </div>

        <div className="lg:hidden relative">
          <button
            className="text-white hover:text-blue-300 focus:outline-none"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {menuOpen && (
            <div className="absolute right-full top-12 bg-black text-white w-40 shadow-lg rounded z-50">
              <ul className="flex flex-col space-y-4 p-4">
                <li>
                  <Link href="/" onClick={() => setMenuOpen(false)}>
                    <div className="hover:text-blue-300">Dashboard</div>
                  </Link>
                </li>
                <li>
                  <Link href="/list" onClick={() => setMenuOpen(false)}>
                    <div className="hover:text-blue-300">Lista de Palavras</div>
                  </Link>
                </li>
                <li>
                  <Link href="/history" onClick={() => setMenuOpen(false)}>
                    <div className="hover:text-blue-300">Histórico</div>
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" onClick={() => setMenuOpen(false)}>
                    <div className="hover:text-blue-300">Favoritos</div>
                  </Link>
                </li>
                {dictionaryWord && (
                  <li>
                    <Link
                      href={`/word/${dictionaryWord}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="hover:text-blue-300">Dicionário</div>
                    </Link>
                  </li>
                )}
                <li>
                  <Tooltip text="Logout">
                    <button
                      onClick={handleLogout}
                      className="flex align-middle"
                    >
                      <BiLogOut size={20} />
                    </button>
                  </Tooltip>
                </li>
              </ul>
            </div>
          )}
        </div>

        <ul className="hidden lg:flex lg:space-x-6 lg:items-center">
          <li>
            <Link href="/">
              <div className="hover:text-blue-300">Dashboard</div>
            </Link>
          </li>
          <li>
            <Link href="/list">
              <div className="hover:text-blue-300">Lista de Palavras</div>
            </Link>
          </li>
          <li>
            <Link href="/history">
              <div className="hover:text-blue-300">Histórico</div>
            </Link>
          </li>
          <li>
            <Link href="/favorites">
              <div className="hover:text-blue-300">Favoritos</div>
            </Link>
          </li>
          {dictionaryWord && (
            <li>
              <Link href={`/word/${dictionaryWord}`}>
                <div className="hover:text-blue-300">Dicionário</div>
              </Link>
            </li>
          )}
          <li>
            <Tooltip text="Logout">
              <button onClick={handleLogout} className="flex align-middle">
                <BiLogOut size={20} />
              </button>
            </Tooltip>
          </li>
        </ul>
      </div>
    </nav>
  );
};
