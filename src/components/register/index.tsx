"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [userType, setUserType] = useState("aluno");
  const [loading, setLoading] = useState(false);
  const [cepError, setCepError] = useState("");
  const router = useRouter();

  // Função para formatar o CPF enquanto o usuário digita
  const formatCPF = (value: string): string => {
    const cpfNumbers = value.replace(/\D/g, "");
    if (cpfNumbers.length <= 3) {
      return cpfNumbers;
    } else if (cpfNumbers.length <= 6) {
      return `${cpfNumbers.slice(0, 3)}.${cpfNumbers.slice(3)}`;
    } else if (cpfNumbers.length <= 9) {
      return `${cpfNumbers.slice(0, 3)}.${cpfNumbers.slice(
        3,
        6
      )}.${cpfNumbers.slice(6)}`;
    } else {
      return `${cpfNumbers.slice(0, 3)}.${cpfNumbers.slice(
        3,
        6
      )}.${cpfNumbers.slice(6, 9)}-${cpfNumbers.slice(9, 11)}`;
    }
  };

  // Função para formatar o telefone enquanto o usuário digita
  const formatPhone = (value: string): string => {
    const phoneNumbers = value.replace(/\D/g, "");
    if (phoneNumbers.length <= 2) {
      return `(${phoneNumbers}`;
    } else if (phoneNumbers.length <= 6) {
      return `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2)}`;
    } else {
      return `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(
        2,
        7
      )}-${phoneNumbers.slice(7, 11)}`;
    }
  };

  // Função para buscar endereço pelo CEP
  const fetchAddressByCep = async (cep: string): Promise<void> => {
    if (cep.length !== 8) {
      return;
    }

    setLoading(true);
    setCepError("");

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado");
        return;
      }

      setStreet(data.logradouro);
      setNeighborhood(data.bairro);
      setCity(data.localidade);
    } catch (error) {
      setCepError("Erro ao buscar CEP");
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect para buscar endereço quando o CEP for digitado
  useEffect(() => {
    const cepNumbers = cep.replace(/\D/g, "");
    if (cepNumbers.length === 8) {
      fetchAddressByCep(cepNumbers);
    }
  }, [cep]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    // Limita o CEP para apenas números e no máximo 8 dígitos
    const cepNumbers = value.replace(/\D/g, "").slice(0, 8);
    // Formata o CEP (xxxxx-xxx)
    if (cepNumbers.length <= 5) {
      setCep(cepNumbers);
    } else {
      setCep(`${cepNumbers.slice(0, 5)}-${cepNumbers.slice(5)}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Aqui você implementaria a lógica real de autenticação
    const userData = {
      name,
      lastName,
      cpf,
      email,
      phone,
      cep,
      street,
      neighborhood,
      number,
      city,
      userType,
    };

    console.log("Dados do usuário:", userData);

    // Por enquanto, vamos apenas redirecionar para o dashboard
    router.push(`/dashboard?userType=${userType}`);
  };

  return (
    <div className="register-container">
      <div className="register-logo-container">
        <svg className="register-logo" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h2 className="register-title">FitTrainer Pro - Cadastro</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-form-grid">
          <div className="register-form-group">
            <label htmlFor="name" className="register-label">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="register-input"
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="lastName" className="register-label">
              Sobrenome
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="register-input"
            />
          </div>
        </div>

        <div className="register-form-grid">
          <div className="register-form-group">
            <label htmlFor="cpf" className="register-label">
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              required
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              placeholder="123.456.789-00"
              maxLength={14}
              className="register-input"
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="phone" className="register-label">
              Telefone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(11) 98765-4321"
              maxLength={15}
              className="register-input"
            />
          </div>
        </div>

        <div className="register-form-group">
          <label htmlFor="email" className="register-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="password" className="register-label">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="cep" className="register-label">
            CEP
          </label>
          <div>
            <input
              id="cep"
              name="cep"
              type="text"
              value={cep}
              onChange={handleCepChange}
              placeholder="12345-678"
              maxLength={9}
              className="register-input"
            />
            {loading && (
              <span className="register-loading">Buscando endereço...</span>
            )}
            {cepError && <span className="register-error">{cepError}</span>}
          </div>
        </div>

        <div className="register-form-grid">
          <div className="register-form-group">
            <label htmlFor="street" className="register-label">
              Rua
            </label>
            <input
              id="street"
              name="street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="register-input"
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="number" className="register-label">
              Número
            </label>
            <input
              id="number"
              name="number"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="register-input"
            />
          </div>
        </div>

        <div className="register-form-grid">
          <div className="register-form-group">
            <label htmlFor="neighborhood" className="register-label">
              Bairro
            </label>
            <input
              id="neighborhood"
              name="neighborhood"
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="register-input"
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="city" className="register-label">
              Cidade
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="register-input"
            />
          </div>
        </div>

        <div className="register-form-group">
          <label htmlFor="userType" className="register-label">
            Tipo de Usuário
          </label>
          <div className="register-radio-container">
            <div className="register-radio-item">
              <input
                id="aluno"
                name="userType"
                type="radio"
                value="aluno"
                checked={userType === "aluno"}
                onChange={() => setUserType("aluno")}
                className="register-radio"
              />
              <label htmlFor="aluno" className="register-radio-label">
                Aluno
              </label>
            </div>
            <div className="register-radio-item">
              <input
                id="professor"
                name="userType"
                type="radio"
                value="professor"
                checked={userType === "professor"}
                onChange={() => setUserType("professor")}
                className="register-radio"
              />
              <label htmlFor="professor" className="register-radio-label">
                Professor
              </label>
            </div>
          </div>
        </div>

        <div className="register-button-container">
          <button type="submit" className="register-button">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
