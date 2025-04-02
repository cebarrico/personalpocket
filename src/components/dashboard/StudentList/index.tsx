"use client";

import { useState } from "react";
import "./styles.css";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  cpf: string;
}

interface StudentListProps {
  myStudents: Student[];
  availableStudents: Student[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedStudentToAdd: Student | null;
  setSelectedStudentToAdd: (student: Student | null) => void;
  setShowAddStudentModal: (show: boolean) => void;
  userType: string;
  addStudentToMyList: (student: Student) => void;
  onViewWorkouts: (student: Student) => void;
}

export default function StudentList({
  myStudents,
  availableStudents,
  searchTerm,
  setSearchTerm,
  selectedStudentToAdd,
  setSelectedStudentToAdd,
  setShowAddStudentModal,
  userType,
  addStudentToMyList,
  onViewWorkouts,
}: StudentListProps) {
  // Filtrar alunos com base no termo de busca
  const filteredStudents = myStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-list-container">
      <div className="student-list-header">
        <h3 className="student-list-title">Meus Alunos</h3>
        <button
          onClick={() => setShowAddStudentModal(true)}
          className="student-list-add-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="student-list-add-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Adicionar Aluno
        </button>
      </div>

      <div className="student-list-search">
        <div className="student-list-search-container">
          <input
            type="text"
            placeholder="Buscar aluno..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="student-list-search-input"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="student-list-search-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="student-list-empty">Nenhum aluno encontrado.</div>
      ) : (
        <div className="student-list-grid">
          {filteredStudents.map((student) => (
            <div key={student.id} className="student-card">
              <div className="student-avatar">{student.avatar}</div>
              <div className="student-info">
                <h4 className="student-name">{student.name}</h4>
                <p className="student-email">{student.email}</p>
                <div className="student-actions">
                  <button
                    className="student-view-button"
                    onClick={() => onViewWorkouts(student)}
                    title="Ver treinos"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Ver treinos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
