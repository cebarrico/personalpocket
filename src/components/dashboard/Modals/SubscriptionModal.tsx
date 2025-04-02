"use client";

import { useState } from "react";
import Modal from "../Modal";
import "../Subscription/styles.css";

interface Plan {
  id: string;
  name: string;
  price: number;
  maxStudents: number;
  features: string[];
}

export interface SubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  currentPlan: string;
  totalStudents: number;
  expirationDate: string;
}

export default function SubscriptionModal({
  visible,
  onClose,
  currentPlan,
  totalStudents,
  expirationDate,
}: SubscriptionModalProps) {
  // Format expiration date for display
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
    <Modal isOpen={visible} onClose={onClose} className="subscription-modal">
      <div className="subscription-modal-header">
        <h2 className="subscription-modal-title">Planos Disponíveis</h2>
        <button onClick={onClose} className="modal-close-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="subscription-modal-body">
        <div className="subscription-summary">
          <div className="subscription-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
            Seu plano atual: {activePlan?.name}
          </div>
          <span>
            {totalStudents} de {activePlan?.maxStudents} alunos
          </span>
        </div>

        <p className="subscription-description">
          Escolha um plano que atenda às suas necessidades. Ao fazer upgrade,
          você terá acesso imediato aos novos recursos e capacidade de alunos.
        </p>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${
                plan.id === currentPlan ? "current-plan" : ""
              }`}
            >
              <div className="plan-header">
                <h3 className="plan-title">{plan.name}</h3>
                <p className="plan-price">
                  R$ {plan.price.toFixed(2).replace(".", ",")} <span>/mês</span>
                </p>
              </div>
              <div className="plan-features">
                {plan.features.map((feature, index) => (
                  <div key={index} className="plan-feature-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
              <button
                className={`plan-button ${
                  plan.id === currentPlan ? "current-plan-button" : ""
                }`}
                disabled={plan.id === currentPlan}
              >
                {plan.id === currentPlan ? "Plano Atual" : "Fazer Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="subscription-modal-footer">
        <button onClick={onClose} className="subscription-modal-close-button">
          Fechar
        </button>
      </div>
    </Modal>
  );
}
