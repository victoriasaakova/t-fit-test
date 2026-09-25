"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type BookingContextValue = {
  openBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const value = useContext(BookingContext);
  if (!value) {
    throw new Error("Кнопка записи должна быть внутри BookingProvider");
  }
  return value;
}

export const goldButtonLook =
  "min-h-12 items-center justify-center rounded-full bg-gold px-6 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#b89555] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export const goldButtonClass = `inline-flex ${goldButtonLook}`;

export function BookButton({
  children,
  className = goldButtonClass,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { openBooking } = useBooking();

  return (
    <button type="button" onClick={openBooking} className={className}>
      {children}
    </button>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  function openBooking() {
    setSent(false);
    setError("");
    setIsOpen(true);
  }

  function closeBooking() {
    setIsOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      nameRef.current?.focus();
    }
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    if (!name || !contact) {
      setError("Укажите имя и удобный способ связи.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <dialog
        ref={dialogRef}
        className="booking"
        aria-labelledby={titleId}
        onClose={closeBooking}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeBooking();
        }}
      >
        <div className="bg-graphite px-6 py-7 text-ivory shadow-[0_24px_60px_rgb(0_0_0/0.45)] sm:px-8 sm:py-8">
          <div className="flex items-start justify-between gap-6">
            <h2
              id={titleId}
              className="text-2xl font-medium leading-tight tracking-[-0.03em]"
            >
              {sent ? "Заявка принята" : "Записаться на пробное"}
            </h2>
            <button
              type="button"
              onClick={closeBooking}
              className="text-sm text-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Закрыть
            </button>
          </div>

          {sent ? (
            <p className="mt-5 max-w-[36ch] text-base leading-7 text-stone">
              Менеджер свяжется с вами, чтобы согласовать удобное время.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid gap-4" noValidate>
              <label className="grid gap-2 text-sm text-stone">
                Имя
                <input
                  ref={nameRef}
                  name="name"
                  autoComplete="name"
                  className="min-h-12 border-2 border-muted bg-ink px-4 text-base text-ivory outline-none focus:border-gold"
                />
              </label>
              <label className="grid gap-2 text-sm text-stone">
                Телефон или Telegram
                <input
                  name="contact"
                  autoComplete="tel"
                  className="min-h-12 border-2 border-muted bg-ink px-4 text-base text-ivory outline-none focus:border-gold"
                />
              </label>
              {error ? (
                <p className="text-sm text-gold" role="alert">
                  {error}
                </p>
              ) : (
                <p className="text-sm leading-6 text-stone">
                  Менеджер свяжется с вами, чтобы согласовать удобное время.
                </p>
              )}
              <button type="submit" className={`${goldButtonClass} mt-2`}>
                Отправить заявку
              </button>
            </form>
          )}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}
