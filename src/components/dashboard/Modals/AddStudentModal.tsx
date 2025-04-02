"use client";

import { useState, useEffect } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  cpf: string;
}

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableStudents: Student[];
  selectedStudentToAdd: Student | null;
  setSelectedStudentToAdd: (student: Student | null) => void;
  confirmAddStudent: (workouts: string[]) => void;
  myStudents: Student[];
  searchStudentTerm: string;
  setSearchStudentTerm: (term: string) => void;
  selectedTime?: string; // Hora selecionada opcional
}

export default function AddStudentModal({
  isOpen,
  onClose,
  availableStudents,
  selectedStudentToAdd,
  setSelectedStudentToAdd,
  confirmAddStudent,
  myStudents,
  searchStudentTerm,
  setSearchStudentTerm,
  selectedTime = "",
}: AddStudentModalProps) {
  // Estado para controlar quais resultados mostrar
  const [showResults, setShowResults] = useState(false);

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

  // Gerenciar seleção de treinos
  const toggleWorkout = (workout: string) => {
    if (selectedWorkouts.includes(workout)) {
      setSelectedWorkouts(selectedWorkouts.filter((w) => w !== workout));
    } else {
      setSelectedWorkouts([...selectedWorkouts, workout]);
    }
  };

  // Limpar seleções ao fechar modal
  useEffect(() => {
    if (!isOpen) {
      setSelectedWorkouts([]);
      setShowResults(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Função para realizar a busca
  const handleSearch = () => {
    if (searchStudentTerm.length < 3) {
      return; // Não busca com menos de 3 caracteres
    }
    setShowResults(true);
  };

  // Pressionar Enter também executa a busca
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Filtrar alunos disponíveis com base na busca e que não estão na lista do professor
  const filteredStudents = availableStudents.filter(
    (student) =>
      (student.name.toLowerCase().includes(searchStudentTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchStudentTerm.toLowerCase()) ||
        student.cpf.includes(searchStudentTerm)) &&
      !myStudents.some((myStudent) => myStudent.id === student.id)
  );

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">
            {selectedTime
              ? `Adicionar aluno - ${selectedTime}`
              : "Adicionar Aluno"}
          </h3>
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-search-container">
            <svg
              className="modal-search-icon"
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
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={searchStudentTerm}
              onChange={(e) => {
                setSearchStudentTerm(e.target.value);
                setShowResults(false); // Limpa os resultados ao modificar a busca
              }}
              onKeyPress={handleKeyPress}
              placeholder="Buscar por nome, email ou CPF..."
              className="modal-search-input"
            />
            <button
              onClick={handleSearch}
              className="modal-search-button"
              disabled={searchStudentTerm.length < 3}
            >
              Buscar
            </button>
          </div>

          {showResults && (
            <div className="modal-scroll-container">
              {filteredStudents.length === 0 ? (
                <div className="modal-empty-message">
                  Nenhum aluno encontrado. Tente outro termo de busca.
                </div>
              ) : (
                <div className="modal-grid">
                  {filteredStudents.map((student) => (
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
                        <p className="modal-student-cpf">{student.cpf}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

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
            onClick={() => confirmAddStudent(selectedWorkouts)}
            disabled={!selectedStudentToAdd || selectedWorkouts.length === 0}
            className={`modal-button-save ${
              !selectedStudentToAdd || selectedWorkouts.length === 0
                ? "modal-button-disabled"
                : ""
            }`}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
