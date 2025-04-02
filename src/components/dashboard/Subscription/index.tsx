"use client";

import { useState } from "react";
import "./styles.css";

// Interface para os planos
interface Plan {
  id: string;
  name: string;
  price: number;
  maxStudents: number;
  features: string[];
}

// Interface para as props do componente
interface SubscriptionProps {
  currentPlan: string;
  totalStudents: number;
  expirationDate: string;
  onViewPlans: () => void;
}

export default function Subscription({
  currentPlan,
  totalStudents,
  expirationDate,
  onViewPlans,
}: SubscriptionProps) {
  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const plans: Plan[] = [
    {
      id: "basic",
      name: "Plano Básico",
      price: 29.99,
      maxStudents: 10,
      features: [
        "Até 10 alunos",
        "Gerenciamento de treinos",
        "Acompanhamento de progresso",
        "Suporte por email",
      ],
    },
    {
      id: "pro",
      name: "Plano Pro",
      price: 49.99,
      maxStudents: 50,
      features: [
        "Até 50 alunos",
        "Gerenciamento de treinos",
        "Acompanhamento de progresso",
        "Suporte prioritário",
        "Relatórios avançados",
        "Recursos exclusivos",
      ],
    },
  ];

  const activePlan = plans.find((plan) => plan.id === currentPlan);

  return (
    <div className="subscription-container">
      <div className="subscription-header">
        <div className="subscription-title">
          <h3>{activePlan?.name || "Plano Atual"}</h3>
          <p className="subscription-price">
            R$ {activePlan?.price.toFixed(2).replace(".", ",")}{" "}
            <span>/mês</span>
          </p>
        </div>
      </div>

      <div className="subscription-info">
        <div className="subscription-info-item">
          <span className="subscription-info-label">Alunos:</span>
          <span className="subscription-info-value">
            {totalStudents} de {activePlan?.maxStudents || 0}
          </span>
        </div>
        <div className="subscription-info-item">
          <span className="subscription-info-label">Expira em:</span>
          <span className="subscription-info-value">
            {formatDate(expirationDate)}
          </span>
        </div>
      </div>

      <button className="subscription-toggle-button" onClick={onViewPlans}>
        Ver planos disponíveis
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
          style={{ marginLeft: "6px" }}
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      </button>
    </div>
  );
}
