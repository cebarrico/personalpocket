"use client";

import { useState, useEffect } from "react";

interface StudentWorkout {
  id: string;
  date: string;
  type: string;
  description: string;
  completed: boolean;
}

interface WeightRecord {
  date: string;
  weight: number;
}

interface StudentData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  workouts?: StudentWorkout[];
  weightHistory?: WeightRecord[];
}

interface StudentWorkoutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentData | null;
}

export default function StudentWorkoutsModal({
  isOpen,
  onClose,
  student,
}: StudentWorkoutsModalProps) {
  const [weekWorkouts, setWeekWorkouts] = useState<StudentWorkout[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<StudentWorkout[]>(
    []
  );
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>([]);
  const [activeTab, setActiveTab] = useState<"current" | "history" | "weight">(
    "current"
  );

  // Carregar dados simulados do aluno
  useEffect(() => {
    if (student && isOpen) {
      // Dados simulados para demonstração
      const mockWeekWorkouts = [
        {
          id: "1",
          date: "2023-04-17",
          type: "Peito",
          description: "Supino, crucifixo e flexões",
          completed: false,
        },
        {
          id: "2",
          date: "2023-04-18",
          type: "Costas",
          description: "Puxadas, remadas e pull-downs",
          completed: false,
        },
        {
          id: "3",
          date: "2023-04-19",
          type: "Pernas",
          description: "Agachamento, leg press e extensora",
          completed: false,
        },
      ];

      const mockCompletedWorkouts = [
        {
          id: "101",
          date: "2023-04-10",
          type: "Peito",
          description: "Supino, crucifixo e flexões",
          completed: true,
        },
        {
          id: "102",
          date: "2023-04-12",
          type: "Costas",
          description: "Puxadas, remadas e pull-downs",
          completed: true,
        },
        {
          id: "103",
          date: "2023-04-14",
          type: "Pernas",
          description: "Agachamento, leg press e extensora",
          completed: true,
        },
      ];

      const mockWeightHistory = [
        { date: "2023-03-01", weight: 78.5 },
        { date: "2023-03-15", weight: 77.8 },
        { date: "2023-04-01", weight: 76.2 },
        { date: "2023-04-15", weight: 75.5 },
      ];

      setWeekWorkouts(mockWeekWorkouts);
      setCompletedWorkouts(mockCompletedWorkouts);
      setWeightHistory(mockWeightHistory);
    }
  }, [student, isOpen]);

  // Formatação de data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Obter o último registro de peso
  const getLastWeight = () => {
    return weightHistory.length > 0 ? weightHistory[0].weight : null;
  };

  // Calcular diferença de peso
  const getWeightDifference = () => {
    if (weightHistory.length < 2) return null;

    const currentWeight = weightHistory[0].weight;
    const previousWeight = weightHistory[1].weight;

    return currentWeight - previousWeight;
  };

  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-large">
        <div className="modal-header">
          <h3 className="modal-title">
            <span className="student-modal-avatar">{student.avatar}</span>
            Histórico de {student.name}
          </h3>
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
        </div>

        <div className="modal-student-tabs">
          <button
            className={`modal-student-tab ${
              activeTab === "current" ? "active" : ""
            }`}
            onClick={() => setActiveTab("current")}
          >
            Treinos Atuais
          </button>
          <button
            className={`modal-student-tab ${
              activeTab === "history" ? "active" : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            Histórico
          </button>
          <button
            className={`modal-student-tab ${
              activeTab === "weight" ? "active" : ""
            }`}
            onClick={() => setActiveTab("weight")}
          >
            Evolução de Peso
          </button>
        </div>

        <div className="modal-body">
          {activeTab === "current" && (
            <div className="student-workouts-section">
              <h4 className="student-section-title">Treinos da Semana</h4>
              <div className="workouts-list">
                {weekWorkouts.length === 0 ? (
                  <p className="workouts-empty">
                    Nenhum treino programado para esta semana.
                  </p>
                ) : (
                  weekWorkouts.map((workout) => (
                    <div
                      key={workout.id}
                      className={`workout-card ${
                        workout.completed ? "workout-completed" : ""
                      }`}
                    >
                      <div className="workout-date">
                        {formatDate(workout.date)}
                      </div>
                      <div className="workout-content">
                        <div className="workout-type">{workout.type}</div>
                        <div className="workout-description">
                          {workout.description}
                        </div>
                      </div>
                      {workout.completed && (
                        <div className="workout-completed-badge">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="student-workouts-section">
              <h4 className="student-section-title">Histórico de Treinos</h4>
              <div className="workouts-list">
                {completedWorkouts.length === 0 ? (
                  <p className="workouts-empty">
                    Nenhum treino concluído ainda.
                  </p>
                ) : (
                  completedWorkouts.map((workout) => (
                    <div key={workout.id} className="workout-history-card">
                      <div className="workout-date">
                        {formatDate(workout.date)}
                      </div>
                      <div className="workout-content">
                        <div className="workout-type">{workout.type}</div>
                        <div className="workout-description">
                          {workout.description}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "weight" && (
            <div className="student-workouts-section">
              <h4 className="student-section-title">Controle de Peso</h4>

              <div className="weight-summary">
                {getLastWeight() && (
                  <div className="weight-last-record">
                    <div className="weight-current">
                      <span className="weight-label">Peso Atual:</span>
                      <span className="weight-value">{getLastWeight()} kg</span>
                    </div>

                    {getWeightDifference() !== null && (
                      <div className="weight-difference">
                        <span className="weight-label">Última Variação:</span>
                        <span
                          className={`weight-change ${
                            getWeightDifference()! < 0
                              ? "weight-loss"
                              : "weight-gain"
                          }`}
                        >
                          {getWeightDifference()! < 0 ? "" : "+"}
                          {getWeightDifference()!.toFixed(1)} kg
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="weight-history">
                <h4 className="weight-history-title">Histórico de Peso</h4>
                <div className="weight-chart">
                  {weightHistory.length > 0 ? (
                    <div className="weight-entries">
                      {weightHistory.map((record, index) => (
                        <div key={index} className="weight-entry">
                          <div className="weight-entry-date">
                            {formatDate(record.date)}
                          </div>
                          <div className="weight-entry-value">
                            {record.weight} kg
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="weight-empty">
                      Nenhum registro de peso ainda.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-button-cancel">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
