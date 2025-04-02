"use client";

interface RemoveStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedStudent: string | null;
  selectedDate: Date;
  confirmRemoveStudent: () => void;
}

export default function RemoveStudentModal({
  isOpen,
  onClose,
  selectedTime,
  selectedStudent,
  selectedDate,
  confirmRemoveStudent,
}: RemoveStudentModalProps) {
  if (!isOpen) return null;

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
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Remover aluno do horário</h3>
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-info-section">
            <p className="modal-info-label">Tem certeza que deseja remover</p>
            <p className="modal-info-value">{selectedStudent}</p>
            <p className="modal-info-label">do horário {selectedTime}?</p>
          </div>

          <div className="modal-warning">
            <p className="modal-warning-text">
              Esta ação não pode ser desfeita.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-button-cancel">
            Cancelar
          </button>
          <button
            onClick={confirmRemoveStudent}
            className="modal-button-danger"
          >
            Sim, remover
          </button>
        </div>
      </div>
    </div>
  );
}
