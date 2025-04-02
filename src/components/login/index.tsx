"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./styles.css";
import logo from "../../../public/logo.png";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("aluno");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aqui você implementaria a lógica real de autenticação
    const userData = {
      email,
      password,
      userType,
    };

    console.log("Dados do usuário:", userData);

    // Redirecionar para o dashboard com o userType
    router.push(`/dashboard?userType=${userType}`);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login com ${provider}`);
    // Implementar lógica de autenticação social
    // Por enquanto, apenas para demonstração:
    router.push(`/dashboard?userType=${userType}`);
  };

  return (
    <div className="login-container">
      <div className="login-logo-container">
        <Image
          src={logo}
          alt="Personal Pocket Logo"
          className="login-logo"
          priority
        />
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>

        <div className="login-form-group">
          <label htmlFor="password" className="login-label">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>

        <div className="login-flex-row">
          <div className="login-checkbox-container">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="login-checkbox"
            />
            <label htmlFor="remember_me" className="login-checkbox-label">
              Lembrar-me
            </label>
          </div>
          <div>
            <a href="#" className="login-forgot-link">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <div className="login-form-group">
          <label className="login-label">Tipo de Usuário</label>
          <div className="login-radio-container">
            <div className="login-radio-item">
              <input
                id="aluno"
                name="userType"
                type="radio"
                value="aluno"
                checked={userType === "aluno"}
                onChange={() => setUserType("aluno")}
                className="login-radio"
              />
              <label htmlFor="aluno" className="login-radio-label">
                Aluno
              </label>
            </div>
            <div className="login-radio-item">
              <input
                id="professor"
                name="userType"
                type="radio"
                value="professor"
                checked={userType === "professor"}
                onChange={() => setUserType("professor")}
                className="login-radio"
              />
              <label htmlFor="professor" className="login-radio-label">
                Professor
              </label>
            </div>
          </div>
        </div>

        <div className="login-button-container">
          <button type="submit" className="login-button">
            Entrar
          </button>
        </div>

        <div className="login-divider">
          <span>ou entre com</span>
        </div>

        <div className="login-social-buttons">
          <button
            type="button"
            className="login-social-button login-google"
            onClick={() => handleSocialLogin("Google")}
            aria-label="Entrar com Google"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="login-social-button login-apple"
            onClick={() => handleSocialLogin("Apple")}
            aria-label="Entrar com Apple"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M17.05,20.28c-.98.95-2.05,1.44-3.19,1.44a4.41,4.41,0,0,1-2.07-.5,4.5,4.5,0,0,0-2.07-.5,4.54,4.54,0,0,0-2.15.54,4.2,4.2,0,0,1-2,.48c-1.25,0-2.47-.62-3.65-1.85C.26,18.19,0,16.19,0,14.38c0-3.09,1.73-5.41,4.3-5.41a5.36,5.36,0,0,1,2,.5,5.85,5.85,0,0,0,2.14.5,5.63,5.63,0,0,0,2-.47,5.19,5.19,0,0,1,2.06-.47,4.56,4.56,0,0,1,3.73,1.94,3.83,3.83,0,0,0-2.25,3.51,3.83,3.83,0,0,0,3.06,3.85ZM14.7,2.4a4.18,4.18,0,0,1-1,2.71,4.2,4.2,0,0,1-3.09,1.66,3.25,3.25,0,0,1,0-.5c0-.95.39-2.03,1.1-2.72A5.06,5.06,0,0,1,14.7,2.4Z" />
            </svg>
            Apple
          </button>
          <button
            type="button"
            className="login-social-button login-facebook"
            onClick={() => handleSocialLogin("Facebook")}
            aria-label="Entrar com Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M9.03048 23L9 13H5V9h4V6.5C9 2.7886 11.1521 1 14.0288 1c1.4082 0 2.6088 0.1036 2.9712 0.15v4.2h-2.0797c-1.6321 0-1.9203 0.7744-1.9203 1.9084V9h4.1333l-1 4h-3.1333v10H9.03048z" />
            </svg>
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
