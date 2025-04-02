"use client";

import React from "react";
import "./styles.css";

interface BookedSlot {
  date: string;
  time: string;
  client: string;
  duration: number;
  notes: string;
  workouts?: string[];
}

interface TimeSlotsProps {
  timeSlots: string[];
  selectedDate: Date;
  bookedSlots: BookedSlot[];
  userType: string;
  loggedUser: any;
  showEmptySlots: boolean;
  setShowEmptySlots: (show: boolean) => void;
  handleAddStudent: (time: string) => void;
  handleRemoveStudent: (time: string, client: string) => void;
  handleBookSlot: (time: string) => void;
  isUserSlot: (date: Date, time: string) => boolean;
  canBookSlot: (date: Date, time: string) => boolean;
}

export default function TimeSlots({
  timeSlots,
  selectedDate,
  bookedSlots,
  userType,
  loggedUser,
  showEmptySlots,
  setShowEmptySlots,
  handleAddStudent,
  handleRemoveStudent,
  handleBookSlot,
  isUserSlot,
  canBookSlot,
}: TimeSlotsProps) {
  // Função para formatar uma data como YYYY-MM-DD
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Verificar se um horário está ocupado
  const isSlotBooked = (date: Date, time: string) => {
    const dateString = formatDate(date);
    return bookedSlots.some(
      (slot) => slot.date === dateString && slot.time === time
    );
  };

  // Obter informações do cliente para um slot específico
  const getClientForSlot = (date: Date, time: string) => {
    const dateString = formatDate(date);
    const slot = bookedSlots.find(
      (slot) => slot.date === dateString && slot.time === time
    );
    return slot ? slot.client : null;
  };

  // Obter notas do cliente para um slot específico
  const getNotesForSlot = (date: Date, time: string) => {
    const dateString = formatDate(date);
    const slot = bookedSlots.find(
      (slot) => slot.date === dateString && slot.time === time
    );
    return slot ? slot.notes : "";
  };

  // Obter workouts para um slot específico
  const getWorkoutsForSlot = (date: Date, time: string) => {
    const dateString = formatDate(date);
    const slot = bookedSlots.find(
      (slot) => slot.date === dateString && slot.time === time
    );
    return slot?.workouts || [];
  };

  // Formatar data para exibição
  function formatDateDisplay(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("pt-BR", options);
  }

  return (
    <div className="dashboard-panel">
      <div className="agenda-title">
        <div>Dashboard</div>
        <div className="agenda-date">
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
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {formatDateDisplay(selectedDate)}
        </div>
      </div>

      <div className="agenda-hoje">
        <div>Agenda de Hoje</div>
        {userType === "professor" && (
          <button
            className="agenda-hide-toggle"
            onClick={() => setShowEmptySlots(!showEmptySlots)}
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
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
            {showEmptySlots
              ? "Ocultar horários vazios"
              : "Mostrar horários vazios"}
          </button>
        )}
      </div>

      {timeSlots.map((time) => {
        const booked = isSlotBooked(selectedDate, time);
        const client = getClientForSlot(selectedDate, time);
        const notes = getNotesForSlot(selectedDate, time);
        const isUserBooking = isUserSlot(selectedDate, time);
        const canBook = canBookSlot(selectedDate, time);

        // Se não estiver para mostrar slots vazios e o slot não estiver ocupado, pule
        if (!showEmptySlots && !booked && userType === "professor") {
          return null;
        }

        return (
          <div key={time} className="agenda-slot">
            <div className="agenda-time">{time}</div>

            {booked ? (
              <div className="agenda-booked-slot">
                <div className="agenda-student-info">
                  <div className="agenda-student-avatar">
                    {client?.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="agenda-student-name">{client}</div>
                    <div className="agenda-student-time">{time} • 60 min</div>
                    {notes && (
                      <div className="agenda-student-notes">{notes}</div>
                    )}
                    {/* Mostrar workouts selecionados, se existirem */}
                    {getWorkoutsForSlot(selectedDate, time).length > 0 && (
                      <div className="agenda-student-workouts">
                        <span className="workout-label">Treinos:</span>
                        {getWorkoutsForSlot(selectedDate, time).map(
                          (workout, index) => (
                            <span key={index} className="workout-tag">
                              {workout}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {userType === "professor" && (
                  <button
                    onClick={() => handleRemoveStudent(time, client!)}
                    className="agenda-action-button"
                  >
                    Forca
                  </button>
                )}
              </div>
            ) : (
              <div
                className="agenda-empty-slot"
                onClick={() =>
                  userType === "professor"
                    ? handleAddStudent(time)
                    : canBook
                    ? handleBookSlot(time)
                    : null
                }
              >
                <div className="agenda-add-button">
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
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Adicionar aluno para {time}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
