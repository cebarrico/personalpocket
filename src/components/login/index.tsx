"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("aluno");
  const [isRegister, setIsRegister] = useState(false);
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

    // Por enquanto, vamos apenas redirecionar para o dashboard
    router.push(`/dashboard?userType=${userType}`);
  };

  // Texto e título dinâmicos baseados no estado (login ou cadastro)
  const formTitle = isRegister ? "Cadastrar" : "Login";
  const buttonText = isRegister ? "Cadastrar" : "Entrar";
  const switchText = isRegister ? "Já tem uma conta?" : "Não tem uma conta?";
  const switchAction = isRegister ? "Faça Login" : "Cadastre-se";

  return (
    <div className="login-container">
      <div className="login-logo-container">
        <svg className="login-logo" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h2 className="login-title">FitTrainer Pro - {formTitle}</h2>

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

        {!isRegister && (
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
        )}

        <div className="login-form-group">
          <label htmlFor="userType" className="login-label">
            Tipo de Usuário
          </label>
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
            {buttonText}
          </button>
        </div>

        <div className="login-switch-container">
          <span className="login-switch-text">{switchText}</span>
          <button
            type="button"
            className="login-switch-button"
            onClick={() => setIsRegister(!isRegister)}
          >
            {switchAction}
          </button>
        </div>
      </form>
    </div>
  );
}
