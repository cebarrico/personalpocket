"use client";

import { useState } from "react";
import Head from "next/head";
import LoginForm from "@/components/login";
import RegisterForm from "@/components/register";
import "./styles.css";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="home-container">
      <Head>
        <title>FitTrainer Pro | {showLogin ? "Login" : "Cadastro"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home-tab-container">
        <div className="home-tab-buttons">
          <button
            type="button"
            onClick={() => setShowLogin(true)}
            className={`home-tab-button home-tab-button-left ${
              showLogin ? "home-tab-active" : "home-tab-inactive"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className={`home-tab-button home-tab-button-right ${
              !showLogin ? "home-tab-active" : "home-tab-inactive"
            }`}
          >
            Cadastro
          </button>
        </div>
      </div>

      <div className="home-form-container">
        {showLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
