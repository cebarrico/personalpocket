"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import "./styles.css";

// Importar os componentes
import ScheduleCalendar from "@/components/dashboard/ScheduleCalendar";
import TimeSlots from "@/components/dashboard/TimeSlots";
import StudentList from "@/components/dashboard/StudentList";
import NotificationSystem from "@/components/dashboard/NotificationSystem";
import {
  AddStudentModal,
  BookSlotModal,
  RemoveStudentModal,
  ScheduleModal,
  StudentWorkoutsModal,
} from "@/components/dashboard/Modals";
import Workouts from "@/components/dashboard/Workouts";
import Subscription from "@/components/dashboard/Subscription";
import SubscriptionModal from "@/components/dashboard/Modals/SubscriptionModal";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("workouts");
  const [userType, setUserType] = useState<string>(""); // Alterar para aceitar string genérica
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showEmptySlots, setShowEmptySlots] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudentToAdd, setSelectedStudentToAdd] = useState<any>(null);
  const [showBookSlotModal, setShowBookSlotModal] = useState(false); // Modal para alunos reservarem horários
  const [notifications, setNotifications] = useState<any[]>([]); // Para notificações
  const [showNotifications, setShowNotifications] = useState(false); // Para exibir o dropdown de notificações
  const [notesForBooking, setNotesForBooking] = useState(""); // Notas para reserva de horário
  const [myStudents, setMyStudents] = useState<any[]>([]); // Lista de alunos do professor
  const [showAddStudentModal, setShowAddStudentModal] = useState(false); // Modal para adicionar alunos à lista do professor
  const [searchStudentTerm, setSearchStudentTerm] = useState(""); // Busca por alunos para adicionar
  const [showStudentWorkoutsModal, setShowStudentWorkoutsModal] =
    useState(false);
  const [selectedStudentForWorkouts, setSelectedStudentForWorkouts] =
    useState<any>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showSubscriptionTab, setShowSubscriptionTab] = useState(false);
  const router = useRouter();

  // Lista de alunos disponíveis
  const [availableStudents, setAvailableStudents] = useState([
    {
      id: "1",
      name: "João Silva",
      email: "joao.silva@example.com",
      avatar: "JO",
      cpf: "123.456.789-00",
    },
    {
      id: "2",
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      avatar: "MA",
      cpf: "234.567.890-00",
    },
    {
      id: "3",
      name: "Carlos Santos",
      email: "carlos.santos@example.com",
      avatar: "CA",
      cpf: "345.678.901-00",
    },
    {
      id: "4",
      name: "Ana Costa",
      email: "ana.costa@example.com",
      avatar: "AN",
      cpf: "456.789.012-00",
    },
    {
      id: "5",
      name: "Bruno Oliveira",
      email: "bruno.oliveira@example.com",
      avatar: "BR",
      cpf: "567.890.123-00",
    },
  ]);

  // Horários disponíveis
  const timeSlots = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // Estado para gerenciar os horários ocupados
  const [bookedSlots, setBookedSlots] = useState([
    {
      date: "2023-04-17",
      time: "09:00",
      client: "João Silva",
      duration: 60,
      notes: "",
      workouts: ["Peito", "Tríceps"],
    },
    {
      date: "2023-04-17",
      time: "15:00",
      client: "Maria Oliveira",
      duration: 60,
      notes: "",
      workouts: ["Perna", "Ombro"],
    },
    {
      date: "2023-04-18",
      time: "08:00",
      client: "Carlos Santos",
      duration: 60,
      notes: "",
      workouts: ["Costa", "Bíceps"],
    },
    {
      date: getCurrentDateString(),
      time: "10:00",
      client: "Bruno Oliveira",
      duration: 60,
      notes: "Aumentar carga no supino",
      workouts: ["Peito", "Ombro"],
    },
  ]);

  // Simulando usuário logado - em uma aplicação real viria da autenticação
  const [loggedUser, setLoggedUser] = useState<{
    id: string | null;
    name: string;
    email: string;
    professorId: string | null;
  }>({
    id: null,
    name: "",
    email: "",
    professorId: null, // ID do professor associado (para alunos)
  });

  // Simulando obtenção do tipo de usuário - em uma aplicação real viria de autenticação
  useEffect(() => {
    // Verifica se há um tipo de usuário na query da URL (apenas para demonstração)
    const { userType } = router.query;
    const type = typeof userType === "string" ? userType : "professor"; // Default para professor se não especificado
    setUserType(type);

    // Simular usuário logado
    if (type === "aluno") {
      setLoggedUser({
        id: "5",
        name: "Bruno Oliveira",
        email: "bruno.oliveira@example.com",
        professorId: "1", // Este aluno está associado ao professor com ID 1
      });
      // Adicionar exemplo de notificação para aluno
      setNotifications([
        {
          id: 1,
          message: "Seu treino foi atualizado pelo professor",
          time: "2h atrás",
          read: false,
        },
        {
          id: 2,
          message: "Lembre-se da sua sessão hoje às 15:00",
          time: "5h atrás",
          read: true,
        },
      ]);
    } else {
      // Para professor, inicializar com ID 1
      setLoggedUser({
        id: "1",
        name: "Professor Silva",
        email: "professor@example.com",
        professorId: null,
      });
      // Adicionar exemplo de notificação para professor
      setNotifications([]);
    }
  }, [router.query]);

  // Inicializar a lista de alunos do professor (em um app real, viria do backend)
  useEffect(() => {
    if (userType === "professor") {
      // Simular que o professor já tem alguns alunos
      setMyStudents([
        {
          id: 1,
          name: "João Silva",
          email: "joao.silva@example.com",
          avatar: "JO",
          cpf: "123.456.789-00",
        },
        {
          id: 5,
          name: "Bruno Oliveira",
          email: "bruno.oliveira@example.com",
          avatar: "BR",
          cpf: "567.890.123-00",
        },
      ]);
    }
  }, [userType]);

  // Função para formatar a data atual
  function getCurrentDateString() {
    const today = new Date();
    return formatDate(today);
  }

  // Função para formatar uma data como YYYY-MM-DD
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Verificar se um slot é do usuário logado (para alunos)
  const isUserSlot = (date: Date, time: string): boolean => {
    if (userType !== "aluno") return false;

    const dateString = formatDate(date);
    const slot = bookedSlots.find(
      (slot) => slot.date === dateString && slot.time === time
    );

    return slot && slot.client === loggedUser.name ? true : false;
  };

  // Funções para manipulação de horários
  const handleAddStudent = (time: string) => {
    setSelectedTime(time);
    setSelectedStudentToAdd(null);
    setShowAddScheduleModal(true);
  };

  const handleRemoveStudent = (time: string, client: string) => {
    setSelectedTime(time);
    setSelectedStudent(client);
    setShowRemoveModal(true);
  };

  const confirmRemoveStudent = () => {
    // Filtrar para remover o horário selecionado
    const updatedBookedSlots = bookedSlots.filter(
      (slot) =>
        !(
          slot.date === formatDate(selectedDate) &&
          slot.time === selectedTime &&
          slot.client === selectedStudent
        )
    );

    setBookedSlots(updatedBookedSlots);
    setShowRemoveModal(false);
    setSelectedStudent(null);
    setSelectedTime("");
  };

  const confirmAddStudent = (workouts: string[] = []) => {
    if (!selectedStudentToAdd) return;

    // Adicionar novo horário marcado
    const newBookedSlot = {
      date: formatDate(selectedDate),
      time: selectedTime,
      client: selectedStudentToAdd.name,
      duration: 60, // Duração padrão de 1 hora
      notes: "",
      workouts: workouts, // Adicionar os treinos selecionados
    };

    setBookedSlots([...bookedSlots, newBookedSlot]);
    setShowAddScheduleModal(false);
    setSelectedStudentToAdd(null);
    setSelectedTime("");
  };

  const handleSelectStudent = (studentId: string) => {
    const student = availableStudents.find((s) => s.id === studentId);
    setSelectedStudentToAdd(student);
  };

  // Função para alunos reservarem horários
  const handleBookSlot = (time: string) => {
    setSelectedTime(time);
    setNotesForBooking("");
    setShowBookSlotModal(true);
  };

  const confirmBookSlot = () => {
    if (!loggedUser.name) return;

    // Adicionar novo horário marcado
    const newBookedSlot = {
      date: formatDate(selectedDate),
      time: selectedTime,
      client: loggedUser.name,
      duration: 60, // Duração padrão de 1 hora
      notes: notesForBooking,
      workouts: [], // Alunos não selecionam treinos, professor define depois
    };

    setBookedSlots([...bookedSlots, newBookedSlot]);
    setShowBookSlotModal(false);
    setSelectedTime("");
    setNotesForBooking("");
  };

  // Funções para manipulação de notificações
  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Verificar se um aluno pode reservar um horário
  const canBookSlot = (date: Date, time: string): boolean => {
    if (userType !== "aluno") return false;

    const dateString = formatDate(date);
    // Verificar se o horário não está ocupado
    const isSlotAvailable = !bookedSlots.some(
      (slot) => slot.date === dateString && slot.time === time
    );

    return isSlotAvailable;
  };

  // Função para adicionar alunos à lista do professor
  const addStudentToMyList = (student: any) => {
    if (!myStudents.some((s) => s.id === student.id)) {
      setMyStudents([...myStudents, student]);
    }
  };

  // Função para abrir o modal de treinos do aluno
  const handleViewStudentWorkouts = (student: any) => {
    setSelectedStudentForWorkouts(student);
    setShowStudentWorkoutsModal(true);
  };

  // Adicionar uma função auxiliar para determinar o nome do papel com base no userType
  const getUserRoleName = (type: string): string => {
    if (type === "professor") return "Professor";
    if (type === "aluno") return "Aluno";
    return "Usuário";
  };

  // Função para navegar no menu e resetar a aba de assinatura
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowSubscriptionTab(false);
  };

  return (
    <div className="dashboard-container">
      <Head>
        <title>Dashboard | FitTrainer Pro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <div className="dashboard-logo">FitTrainer Pro</div>
          <nav className="dashboard-nav">
            {userType === "aluno" && (
              <button
                onClick={() => handleTabChange("workouts")}
                className={`dashboard-nav-button ${
                  activeTab === "workouts" ? "dashboard-nav-button-active" : ""
                }`}
              >
                Treinos
              </button>
            )}
            <button
              onClick={() => handleTabChange("schedule")}
              className={`dashboard-nav-button ${
                activeTab === "schedule" ? "dashboard-nav-button-active" : ""
              }`}
            >
              Agenda
            </button>
            {userType === "professor" && (
              <button
                onClick={() => handleTabChange("students")}
                className={`dashboard-nav-button ${
                  activeTab === "students" ? "dashboard-nav-button-active" : ""
                }`}
              >
                Alunos
              </button>
            )}
            <button
              onClick={() => handleTabChange("profile")}
              className={`dashboard-nav-button ${
                activeTab === "profile" ? "dashboard-nav-button-active" : ""
              }`}
            >
              Perfil
            </button>
          </nav>
        </div>

        <div className="dashboard-header-right">
          {/* Componente de notificações */}
          <NotificationSystem
            notifications={notifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            markNotificationAsRead={markNotificationAsRead}
            clearAllNotifications={clearAllNotifications}
          />

          <div className="dashboard-user">
            <div className="dashboard-avatar">
              {loggedUser.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="dashboard-user-info">
              <div className="dashboard-user-name">{loggedUser.name}</div>
              <div className="dashboard-user-role">
                {getUserRoleName(userType)}
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="dashboard-logout-button"
            title="Sair"
          >
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {activeTab === "schedule" && (
          <div className="dashboard-grid">
            <div className="dashboard-grid-main">
              {/* Componente de calendário */}
              <ScheduleCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
              />

              {/* Componente de horários */}
              <TimeSlots
                timeSlots={timeSlots}
                selectedDate={selectedDate}
                bookedSlots={bookedSlots}
                userType={userType}
                loggedUser={loggedUser}
                showEmptySlots={showEmptySlots}
                setShowEmptySlots={setShowEmptySlots}
                handleAddStudent={handleAddStudent}
                handleRemoveStudent={handleRemoveStudent}
                handleBookSlot={handleBookSlot}
                isUserSlot={isUserSlot}
                canBookSlot={canBookSlot}
              />
            </div>
          </div>
        )}

        {activeTab === "workouts" && userType === "aluno" && (
          <div className="dashboard-panel">
            <h2 className="dashboard-panel-title">Meus Treinos</h2>
            <Workouts userType={userType} userId={loggedUser.id || ""} />
          </div>
        )}

        {userType === "aluno" && activeTab === "profile" && (
          <div className="dashboard-panel">
            <h2 className="dashboard-panel-title">Meu Perfil</h2>
            <div className="profile-container">
              <div className="profile-header">
                <div className="profile-avatar-large">
                  {loggedUser.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="profile-info">
                  <h2 className="profile-name">{loggedUser.name}</h2>
                  <p className="profile-role">{getUserRoleName(userType)}</p>
                </div>
              </div>

              <div className="profile-form">
                <div className="profile-form-group">
                  <label className="profile-label">Nome Completo</label>
                  <input
                    type="text"
                    className="profile-input"
                    defaultValue={loggedUser.name}
                  />
                </div>

                <div className="profile-form-group">
                  <label className="profile-label">Email</label>
                  <input
                    type="email"
                    className="profile-input"
                    defaultValue={loggedUser.email}
                  />
                </div>

                <div className="profile-form-group">
                  <label className="profile-label">CPF</label>
                  <input
                    type="text"
                    className="profile-input"
                    value={
                      availableStudents.find((s) => s.id === loggedUser.id)
                        ?.cpf || "000.000.000-00"
                    }
                    disabled
                  />
                  <p className="profile-help-text">
                    O CPF não pode ser editado
                  </p>
                </div>

                <div className="profile-form-group">
                  <label className="profile-label">Senha</label>
                  <input
                    type="password"
                    className="profile-input"
                    defaultValue="********"
                  />
                </div>

                {userType === "aluno" && (
                  <div className="profile-form-group">
                    <label className="profile-label">Professor</label>
                    <input
                      type="text"
                      className="profile-input"
                      value="Professor Silva"
                      disabled
                    />
                  </div>
                )}

                <div className="profile-form-group">
                  <label className="profile-label">Telefone</label>
                  <input
                    type="text"
                    className="profile-input"
                    defaultValue="(00) 00000-0000"
                  />
                </div>

                <div className="profile-buttons">
                  <button className="profile-button-save">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && userType === "professor" && (
          <div className="dashboard-panel">
            <h2 className="dashboard-panel-title">Meus Alunos</h2>
            <StudentList
              myStudents={myStudents}
              availableStudents={availableStudents}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedStudentToAdd={selectedStudentToAdd}
              setSelectedStudentToAdd={setSelectedStudentToAdd}
              setShowAddStudentModal={setShowAddStudentModal}
              userType={userType}
              addStudentToMyList={addStudentToMyList}
              onViewWorkouts={handleViewStudentWorkouts}
            />
          </div>
        )}

        {userType === "professor" && activeTab === "profile" && (
          <div className="dashboard-panel">
            <div className="profile-header-section">
              <div>
                <h2 className="profile-title">
                  {showSubscriptionTab ? "Meu Plano" : "Meu Perfil"}
                </h2>
                <p className="profile-role">{getUserRoleName(userType)}</p>
              </div>
              <div className="profile-tabs">
                <button
                  className={`profile-tab-button ${
                    !showSubscriptionTab ? "profile-tab-active" : ""
                  }`}
                  onClick={() => setShowSubscriptionTab(false)}
                >
                  Meu Perfil
                </button>
                <button
                  className={`profile-tab-button ${
                    showSubscriptionTab ? "profile-tab-active" : ""
                  }`}
                  onClick={() => setShowSubscriptionTab(true)}
                >
                  Meu Plano
                </button>
              </div>
            </div>

            {!showSubscriptionTab ? (
              <div className="profile-container">
                <div className="profile-header">
                  <div className="profile-avatar-large">
                    {loggedUser.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="profile-info">
                    <h2 className="profile-name">{loggedUser.name}</h2>
                    <p className="profile-role">{getUserRoleName(userType)}</p>
                  </div>
                </div>

                <div className="profile-form">
                  <div className="profile-form-group">
                    <label className="profile-label">Nome Completo</label>
                    <input
                      type="text"
                      className="profile-input"
                      defaultValue={loggedUser.name}
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">Email</label>
                    <input
                      type="email"
                      className="profile-input"
                      defaultValue={loggedUser.email}
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">CPF</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={
                        availableStudents.find((s) => s.id === loggedUser.id)
                          ?.cpf || "000.000.000-00"
                      }
                      disabled
                    />
                    <p className="profile-help-text">
                      O CPF não pode ser editado
                    </p>
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">Senha</label>
                    <input
                      type="password"
                      className="profile-input"
                      defaultValue="********"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">Telefone</label>
                    <input
                      type="text"
                      className="profile-input"
                      defaultValue="(00) 00000-0000"
                    />
                  </div>

                  <div className="profile-buttons">
                    <button className="profile-button-save">
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Subscription
                currentPlan="basic"
                totalStudents={myStudents.length}
                expirationDate="2023-12-31"
                onViewPlans={() => setShowSubscriptionModal(true)}
              />
            )}
          </div>
        )}
      </main>

      {/* Modais */}
      <AddStudentModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        availableStudents={availableStudents}
        selectedStudentToAdd={selectedStudentToAdd}
        setSelectedStudentToAdd={setSelectedStudentToAdd}
        confirmAddStudent={confirmAddStudent}
        myStudents={myStudents}
        searchStudentTerm={searchStudentTerm}
        setSearchStudentTerm={setSearchStudentTerm}
        selectedTime={selectedTime}
      />

      <RemoveStudentModal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        selectedTime={selectedTime}
        selectedStudent={selectedStudent}
        selectedDate={selectedDate}
        confirmRemoveStudent={confirmRemoveStudent}
      />

      <BookSlotModal
        isOpen={showBookSlotModal}
        onClose={() => setShowBookSlotModal(false)}
        selectedTime={selectedTime}
        selectedDate={selectedDate}
        notesForBooking={notesForBooking}
        setNotesForBooking={setNotesForBooking}
        confirmBookSlot={confirmBookSlot}
      />

      {/* Modal de agendamento para professor */}
      <ScheduleModal
        isOpen={showAddScheduleModal}
        onClose={() => setShowAddScheduleModal(false)}
        selectedTime={selectedTime}
        selectedDate={selectedDate}
        myStudents={myStudents}
        selectedStudentToAdd={selectedStudentToAdd}
        setSelectedStudentToAdd={setSelectedStudentToAdd}
        confirmAddStudent={confirmAddStudent}
      />

      {/* Modal de treinos do aluno */}
      <StudentWorkoutsModal
        isOpen={showStudentWorkoutsModal}
        onClose={() => setShowStudentWorkoutsModal(false)}
        student={selectedStudentForWorkouts}
      />

      {showSubscriptionModal && (
        <SubscriptionModal
          visible={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          currentPlan="basic"
          totalStudents={myStudents.length}
          expirationDate="2023-12-31"
        />
      )}
    </div>
  );
}
