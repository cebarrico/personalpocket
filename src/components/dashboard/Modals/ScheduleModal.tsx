"use client";

import { useState, useEffect } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedDate: Date;
  myStudents: Student[];
  selectedStudentToAdd: Student | null;
  setSelectedStudentToAdd: (student: Student | null) => void;
  confirmAddStudent: (workouts: string[]) => void;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  selectedTime,
  selectedDate,
  myStudents,
  selectedStudentToAdd,
  setSelectedStudentToAdd,
  confirmAddStudent,
}: ScheduleModalProps) {
  // Estado para os treinos selecionados
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);

  // Lista de tipos de treino disponíveis
  const workoutTypes = [
    "Peito",
    "Costa",
    "Bíceps",
    "Tríceps",
    "Ombro",
    "Perna",
  ];

  // Limpar seleções ao fechar modal
  useEffect(() => {
    if (!isOpen) {
      setSelectedWorkouts([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Gerenciar seleção de treinos
  const toggleWorkout = (workout: string) => {
    if (selectedWorkouts.includes(workout)) {
      setSelectedWorkouts(selectedWorkouts.filter((w) => w !== workout));
    } else {
      setSelectedWorkouts([...selectedWorkouts, workout]);
    }
  };

  // Função para confirmar e fechar
  const handleConfirm = () => {
    confirmAddStudent(selectedWorkouts);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">
            Agendar Horário para Aluno - {selectedTime}
          </h3>
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-info-section">
            <p className="modal-info-label">Data e Horário:</p>
            <p className="modal-info-value">
              {selectedDate.toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              às {selectedTime}
            </p>
          </div>

          <div className="modal-form-group">
            <label className="modal-label">Selecione o Aluno</label>
            <div className="modal-scroll-container">
              {myStudents.length === 0 ? (
                <div className="modal-empty-message">
                  Você não tem alunos cadastrados.
                </div>
              ) : (
                <div className="modal-grid">
                  {myStudents.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => setSelectedStudentToAdd(student)}
                      className={`modal-grid-item ${
                        selectedStudentToAdd?.id === student.id
                          ? "modal-grid-item-selected"
                          : ""
                      }`}
                    >
                      <div className="modal-student-avatar">
                        {student.avatar}
                      </div>
                      <div className="modal-student-info">
                        <h4 className="modal-student-name">{student.name}</h4>
                        <p className="modal-student-email">{student.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedStudentToAdd && (
            <div className="modal-workout-section">
              <h4 className="modal-section-title">
                Selecione o tipo de treino:
              </h4>
              <div className="modal-workout-options">
                {workoutTypes.map((workout) => (
                  <label key={workout} className="modal-workout-option">
                    <input
                      type="checkbox"
                      checked={selectedWorkouts.includes(workout)}
                      onChange={() => toggleWorkout(workout)}
                      className="modal-workout-checkbox"
                    />
                    <span className="modal-workout-label">{workout}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-button-cancel">
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedStudentToAdd || selectedWorkouts.length === 0}
            className={`modal-button-save ${
              !selectedStudentToAdd || selectedWorkouts.length === 0
                ? "modal-button-disabled"
                : ""
            }`}
          >
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
}
