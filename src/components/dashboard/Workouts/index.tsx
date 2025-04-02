"use client";

import { useState, useEffect } from "react";
import "./styles.css";

interface Workout {
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

interface WorkoutsProps {
  userType: string;
  userId: string;
}

export default function Workouts({ userType, userId }: WorkoutsProps) {
  const [weekWorkouts, setWeekWorkouts] = useState<Workout[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<Workout[]>([]);
  const [currentWeight, setCurrentWeight] = useState<string>("");
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>([]);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("current");

  // Carregar dados simulados para demonstração
  useEffect(() => {
    // Dados simulados de treinos da semana atual
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
      {
        id: "4",
        date: "2023-04-20",
        type: "Ombros",
        description: "Desenvolvimento, elevação lateral e frontal",
        completed: false,
      },
      {
        id: "5",
        date: "2023-04-21",
        type: "Braços",
        description: "Rosca direta, tríceps testa e concentrado",
        completed: false,
      },
    ];

    // Dados simulados de treinos já realizados
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

    // Dados simulados de histórico de peso
    const mockWeightHistory = [
      { date: "2023-03-01", weight: 78.5 },
      { date: "2023-03-15", weight: 77.8 },
      { date: "2023-04-01", weight: 76.2 },
      { date: "2023-04-15", weight: 75.5 },
    ];

    setWeekWorkouts(mockWeekWorkouts);
    setCompletedWorkouts(mockCompletedWorkouts);
    setWeightHistory(mockWeightHistory);
  }, []);

  // Marcar treino como concluído
  const markWorkoutAsCompleted = (id: string) => {
    const updatedWorkouts = weekWorkouts.map((workout) => {
      if (workout.id === id) {
        return { ...workout, completed: true };
      }
      return workout;
    });

    // Atualizar treinos da semana
    setWeekWorkouts(updatedWorkouts);

    // Adicionar aos treinos concluídos
    const completedWorkout = weekWorkouts.find((workout) => workout.id === id);
    if (completedWorkout) {
      setCompletedWorkouts([
        { ...completedWorkout, completed: true },
        ...completedWorkouts,
      ]);
    }
  };

  // Registrar peso atual
  const saveCurrentWeight = () => {
    if (!currentWeight) return;

    const weight = parseFloat(currentWeight);
    if (isNaN(weight)) return;

    const today = new Date().toISOString().split("T")[0];
    const newWeightRecord = { date: today, weight };

    setWeightHistory([newWeightRecord, ...weightHistory]);
    setShowWeightInput(false);
  };

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

  return (
    <div className="workouts-container">
      {userType === "aluno" && (
        <div className="workouts-tabs">
          <button
            className={`workouts-tab-button ${
              activeTab === "current" ? "workouts-tab-active" : ""
            }`}
            onClick={() => setActiveTab("current")}
          >
            Treinos Atuais
          </button>
          <button
            className={`workouts-tab-button ${
              activeTab === "history" ? "workouts-tab-active" : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            Histórico
          </button>
          <button
            className={`workouts-tab-button ${
              activeTab === "weight" ? "workouts-tab-active" : ""
            }`}
            onClick={() => setActiveTab("weight")}
          >
            Evolução de Peso
          </button>
        </div>
      )}

      {(activeTab === "current" || userType !== "aluno") && (
        <div className="workouts-section">
          <div className="workouts-header">
            <h3 className="workouts-title">Treinos da Semana</h3>
          </div>
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
                  <div className="workout-date">{formatDate(workout.date)}</div>
                  <div className="workout-content">
                    <div className="workout-type">{workout.type}</div>
                    <div className="workout-description">
                      {workout.description}
                    </div>
                  </div>
                  {!workout.completed && (
                    <button
                      className="workout-complete-button"
                      onClick={() => markWorkoutAsCompleted(workout.id)}
                    >
                      Concluir
                    </button>
                  )}
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

      {activeTab === "history" && userType === "aluno" && (
        <div className="workouts-section">
          <div className="workouts-header">
            <h3 className="workouts-title">Histórico de Treinos</h3>
          </div>
          <div className="workouts-list">
            {completedWorkouts.length === 0 ? (
              <p className="workouts-empty">Nenhum treino concluído ainda.</p>
            ) : (
              completedWorkouts.map((workout) => (
                <div key={workout.id} className="workout-history-card">
                  <div className="workout-date">{formatDate(workout.date)}</div>
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

      {activeTab === "weight" && userType === "aluno" && (
        <div className="workouts-section">
          <div className="workouts-header">
            <h3 className="workouts-title">Evolução de Peso</h3>
            {!showWeightInput && (
              <button
                className="workout-weight-button"
                onClick={() => setShowWeightInput(true)}
              >
                Registrar Peso
              </button>
            )}
          </div>

          {showWeightInput && (
            <div className="weight-input-container">
              <input
                type="number"
                step="0.1"
                className="weight-input"
                placeholder="Seu peso atual (kg)"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
              />
              <div className="weight-input-buttons">
                <button
                  className="weight-save-button"
                  onClick={saveCurrentWeight}
                >
                  Salvar
                </button>
                <button
                  className="weight-cancel-button"
                  onClick={() => setShowWeightInput(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {getLastWeight() !== null && (
            <div className="weight-summary">
              <div className="weight-last-record">
                <div className="weight-current">
                  <span className="weight-label">Peso Atual</span>
                  <span className="weight-value">{getLastWeight()} kg</span>
                </div>

                {getWeightDifference() !== null && (
                  <div className="weight-difference">
                    <span className="weight-label">Diferença</span>
                    <span
                      className={`weight-change ${
                        getWeightDifference()! < 0
                          ? "weight-loss"
                          : "weight-gain"
                      }`}
                    >
                      {getWeightDifference()! > 0 ? "+" : ""}
                      {getWeightDifference()?.toFixed(1)} kg
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="weight-history">
            <h4 className="weight-history-title">Histórico de Registros</h4>
            {weightHistory.length > 0 ? (
              <div className="weight-entries">
                {weightHistory.map((record, index) => (
                  <div key={index} className="weight-entry">
                    <span className="weight-entry-date">
                      {formatDate(record.date)}
                    </span>
                    <span className="weight-entry-value">
                      {record.weight} kg
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="weight-empty">
                Nenhum registro de peso encontrado. Registre seu peso atual para
                começar a acompanhar sua evolução.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
