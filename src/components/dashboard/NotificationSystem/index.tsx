"use client";

import { useRef, useEffect } from "react";
import "./styles.css";

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationSystemProps {
  notifications: Notification[];
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  markNotificationAsRead: (id: number) => void;
  clearAllNotifications: () => void;
}

export default function NotificationSystem({
  notifications,
  showNotifications,
  setShowNotifications,
  markNotificationAsRead,
  clearAllNotifications,
}: NotificationSystemProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar notificações ao clicar fora do dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    // Desabilitar scroll do body quando as notificações estão abertas em telas pequenas
    if (showNotifications && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [showNotifications, setShowNotifications]);

  // Contador de notificações não lidas
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="notification-system-container" ref={dropdownRef}>
      <button
        onClick={toggleNotifications}
        className="notification-bell-button"
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
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {showNotifications && (
        <>
          {/* Overlay para dispositivos móveis */}
          <div
            className="notification-overlay"
            onClick={() => setShowNotifications(false)}
          ></div>

          <div className="notification-dropdown">
            <div className="notification-header">
              <h3 className="notification-title">Notificações</h3>
              <div className="notification-header-actions">
                <button
                  onClick={clearAllNotifications}
                  disabled={notifications.length === 0}
                  className={`notification-action-button ${
                    notifications.length === 0
                      ? "notification-action-button-disabled"
                      : ""
                  }`}
                >
                  Limpar todas
                </button>
                <button
                  className="notification-close-button"
                  onClick={() => setShowNotifications(false)}
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="notification-empty">
                  Não há notificações no momento.
                </div>
              ) : (
                <div className="notification-items">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${
                        !notification.read ? "notification-item-unread" : ""
                      }`}
                    >
                      <div className="notification-content">
                        <p className="notification-message">
                          {notification.message}
                        </p>
                        <span className="notification-time">
                          {notification.time}
                        </span>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() =>
                            markNotificationAsRead(notification.id)
                          }
                          className="notification-read-button"
                        >
                          Marcar como lida
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
