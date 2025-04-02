"use client";

import { useState, useEffect } from "react";
import "./styles.css";

interface ScheduleCalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
}

export default function ScheduleCalendar({
  selectedDate,
  setSelectedDate,
  showCalendar,
  setShowCalendar,
}: ScheduleCalendarProps) {
  // Estado para controlar o mês e ano visualizados no calendário
  const [viewDate, setViewDate] = useState<Date>(new Date(selectedDate));

  // Atualizar a data de visualização quando a data selecionada mudar
  useEffect(() => {
    setViewDate(new Date(selectedDate));
  }, [selectedDate]);

  // Funções para navegação no calendário
  const handlePrevDay = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setSelectedDate(prevDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate);
  };

  // Funções para navegação entre meses no calendário
  const handlePrevMonth = () => {
    const newViewDate = new Date(viewDate);
    newViewDate.setMonth(newViewDate.getMonth() - 1);
    setViewDate(newViewDate);
  };

  const handleNextMonth = () => {
    const newViewDate = new Date(viewDate);
    newViewDate.setMonth(newViewDate.getMonth() + 1);
    setViewDate(newViewDate);
  };

  // Função para selecionar um dia no calendário
  const handleSelectDate = (day: number) => {
    const newDate = new Date(viewDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  // Função para formatar data para exibição
  function formatDateDisplay(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("pt-BR", options);
  }

  // Função para gerar os dias do mês atual para o calendário
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    // Primeiro dia do mês
    const firstDayOfMonth = new Date(year, month, 1);
    // Último dia do mês
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Dia da semana do primeiro dia (0 = Domingo, 1 = Segunda, etc.)
    const firstDayWeekday = firstDayOfMonth.getDay();

    // Total de dias no mês
    const daysInMonth = lastDayOfMonth.getDate();

    // Array para armazenar os dias do calendário
    const calendarDays = [];

    // Adicionar espaços vazios para os dias antes do início do mês
    for (let i = 0; i < firstDayWeekday; i++) {
      calendarDays.push(null);
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return calendarDays;
  };

  // Função para verificar se um dia é o dia atual
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  };

  // Função para verificar se um dia é o dia selecionado
  const isSelectedDay = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      viewDate.getMonth() === selectedDate.getMonth() &&
      viewDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Obter nome do mês e ano para exibição
  const getMonthYearDisplay = () => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${months[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="calendar-title">Agenda</h2>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="calendar-toggle-button"
        >
          {showCalendar ? "Fechar Calendário" : "Abrir Calendário"}
        </button>
      </div>

      <div className="calendar-navigation">
        <button onClick={handlePrevDay} className="calendar-nav-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h3 className="calendar-date">{formatDateDisplay(selectedDate)}</h3>

        <button onClick={handleNextDay} className="calendar-nav-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showCalendar && (
        <div className="calendar-body">
          <div className="calendar-month-navigation">
            <button onClick={handlePrevMonth} className="calendar-month-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="calendar-month-year">{getMonthYearDisplay()}</div>

            <button onClick={handleNextMonth} className="calendar-month-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="calendar-weekdays">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
              <div key={index} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-days">
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${!day ? "calendar-day-empty" : ""} ${
                  day && isToday(day) ? "calendar-day-today" : ""
                } ${day && isSelectedDay(day) ? "calendar-day-selected" : ""}`}
                onClick={() => day && handleSelectDate(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
