"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

const slots = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const times = slots.slice(0, -1).map((from, index) => `с ${from} / до ${slots[index + 1]}`);

export function FirstVisit() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [time, setTime] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const time = String(data.get("time") ?? "").trim();
    if (!name || !phone || !time) {
      setError("Укажите имя, телефон и удобное время.");
      return;
    }
    setError("");
    setSent(true);
  }

  const fields = (
    <>
      <div className="grid gap-3">
        <label className="grid gap-2 text-sm font-semibold text-muted">
          Имя
          <input
            name="name"
            autoComplete="name"
            placeholder="Ваше имя"
            className="h-[60px] border border-white/20 bg-white px-4 text-base font-normal text-graphite outline-none placeholder:text-muted focus:border-bronze"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-muted">
          Телефон
          <input
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7 (___) ___-__-__"
            className="h-[60px] border border-white/20 bg-white px-4 text-base font-normal text-graphite outline-none placeholder:text-muted focus:border-bronze"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-muted">
          Удобное время
          <span className="relative block">
            <select
              name="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className={`h-[60px] w-full appearance-none border border-white/20 bg-white px-4 pr-10 text-base font-normal outline-none focus:border-bronze ${
                time ? "text-graphite" : "text-muted"
              }`}
            >
              <option value="" disabled>
                Выбрать время
              </option>
              {times.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <img
              src="/icons/chevron-down.svg"
              alt=""
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
            />
          </span>
        </label>
      </div>
      <div className="grid justify-items-start gap-3">
        {error ? (
          <p className="text-xs leading-[1.5] text-graphite" role="alert">
            {error}
          </p>
        ) : (
          <p className="text-xs leading-[1.5] text-graphite">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
          </p>
        )}
        <button
          type="submit"
          className="inline-flex h-12 items-center bg-bronze px-6 font-sans text-base leading-[18px] font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
        >
          Оставить заявку
        </button>
      </div>
    </>
  );

  return (
    <div id="request">
    <section className="flex flex-col items-center gap-8 bg-stone px-4 py-10 min-[768px]:hidden">
      <h2 className="w-full max-w-[520px] text-2xl leading-[normal] font-normal text-graphite uppercase">
        Подберем для вас удобное время для знакомства
      </h2>
      {sent ? (
        <p className="w-full max-w-[520px] text-base leading-normal text-graphite">
          Заявка принята. Менеджер свяжется с вами, чтобы согласовать время.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="grid w-full max-w-[520px] gap-6" noValidate>
          {fields}
        </form>
      )}
      <div className="relative aspect-square w-full min-[600px]:aspect-auto min-[600px]:size-[520px] min-[600px]:max-w-full">
        <Image
          src="/images/visit.png"
          alt="Гантели, коврик и бутылка воды в студии"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
    <section className="hidden flex-col items-center gap-8 bg-stone px-4 py-10 min-[768px]:flex md:hidden">
      <h2 className="w-full max-w-[520px] text-2xl leading-[normal] font-normal text-graphite uppercase">
        Подберем для вас удобное время для знакомства
      </h2>
      {sent ? (
        <p className="w-full max-w-[520px] text-base leading-[normal] text-graphite">
          Заявка принята. Менеджер свяжется с вами, чтобы согласовать время.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="grid w-full max-w-[520px] gap-6" noValidate>
          {fields}
        </form>
      )}
      <div className="relative size-[520px] max-w-full">
        <Image
          src="/images/visit.png"
          alt="Гантели, коврик и бутылка воды в студии"
          fill
          sizes="520px"
          className="object-cover"
        />
      </div>
    </section>
    <section className="hidden bg-ink px-5 py-10 md:block md:p-[60px]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 border-2 border-muted">
        <div className="bg-stone p-10 text-graphite">
          <h2 className="text-[clamp(1.75rem,3vw,2.625rem)] leading-normal font-normal uppercase">
            Подберем удобное время для знакомства
          </h2>

          {sent ? (
            <p className="mt-10 max-w-[36ch] text-lg leading-7">
              Заявка принята. Менеджер свяжется с вами, чтобы согласовать время.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-8 grid max-w-[475px] gap-10"
              noValidate
            >
              <div className="grid gap-3">
                <label className="grid gap-2 text-sm font-semibold text-muted">
                  Имя
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Ваше имя"
                    className="h-[60px] border border-white/20 bg-white px-4 text-base font-normal text-graphite outline-none placeholder:text-muted focus:border-bronze"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-muted">
                  Телефон
                  <input
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="h-[60px] border border-white/20 bg-white px-4 text-base font-normal text-graphite outline-none placeholder:text-muted focus:border-bronze"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-muted">
                  Удобное время
                  <span className="relative block">
                    <select
                      name="time"
                      value={time}
                      onChange={(event) => setTime(event.target.value)}
                      className={`h-[60px] w-full appearance-none border border-white/20 bg-white px-4 text-base font-normal outline-none focus:border-bronze ${
                        time ? "text-graphite" : "text-muted"
                      }`}
                    >
                      <option value="" disabled>
                        Выбрать время
                      </option>
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 right-4 size-2 -translate-y-1/2 rotate-45 border-r border-b border-muted"
                    />
                  </span>
                </label>
              </div>

              <div className="grid justify-items-start gap-3">
                {error ? (
                  <p className="text-xs leading-normal text-graphite" role="alert">
                    {error}
                  </p>
                ) : (
                  <p className="text-xs leading-normal text-graphite">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  </p>
                )}
                <button
                  type="submit"
                  className="inline-flex h-12 items-center bg-bronze px-6 text-base font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
                >
                  Оставить заявку
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="relative min-h-[280px]">
          <Image
            src="/images/visit.png"
            alt="Гантели, коврик и бутылка воды в студии"
            fill
            sizes="(min-width: 1280px) 660px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
    </div>
  );
}
