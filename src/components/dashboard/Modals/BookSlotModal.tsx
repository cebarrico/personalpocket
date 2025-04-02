"use client";

interface BookSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  selectedDate: Date;
  notesForBooking: string;
  setNotesForBooking: (notes: string) => void;
  confirmBookSlot: () => void;
}

export default function BookSlotModal({
  isOpen,
  onClose,
  selectedTime,
  selectedDate,
  notesForBooking,
  setNotesForBooking,
  confirmBookSlot,
}: BookSlotModalProps) {
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
          <h3 className="modal-title">Reservar Horário</h3>
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-info-section">
            <p className="modal-info-label">
              Você está reservando um horário para:
            </p>
            <p className="modal-info-value">
              {formatDateDisplay(selectedDate)} às {selectedTime}
            </p>
          </div>

          <div className="modal-form-group">
            <label htmlFor="notes" className="modal-label">
              Observações (opcional)
            </label>
            <textarea
              id="notes"
              rows={4}
              value={notesForBooking}
              onChange={(e) => setNotesForBooking(e.target.value)}
              placeholder="Ex: Preciso focar em exercícios para costas..."
              className="modal-textarea"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-button-cancel">
            Cancelar
          </button>
          <button onClick={confirmBookSlot} className="modal-button-save">
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  );
}
