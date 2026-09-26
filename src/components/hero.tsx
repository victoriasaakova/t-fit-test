"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

const gold = "font-light text-gold italic";
const goldThin = "font-thin text-gold italic";
const plain = "font-normal text-white not-italic";

const slides: Array<{
  id: string;
  src: string;
  alt: string;
  label: string;
  title: ReactNode;
  body: string;
}> = [
  {
    id: "studio",
    src: "/images/hero.png",
    alt: "Вечерняя улица в центре Москвы",
    label: "Персональная студия в самом центре Москвы",
    title: (
      <>
        <span className="block">
          <span className={gold}>Персональная</span>
          <span className={plain}> студия</span>
        </span>
        <span className="block text-right">
          <span className={plain}>в самом центре </span>
          <span className={goldThin}>Москвы</span>
        </span>
      </>
    ),
    body: "Тренировки в центре вашего маршрута, чтобы время для себя стало естественной и комфортной частью дня.",
  },
  {
    id: "comfort",
    src: "/images/comfort.png",
    alt: "Зал студии с зеркалами и тренажёрами",
    label: "Индивидуальный подход для вашего комфорта",
    title: (
      <>
        <span className={`block ${plain}`}>Индивидуальный подход</span>
        <span className="block text-right">
          <span className={plain}>для вашего </span>
          <span className={goldThin}>комфорта</span>
        </span>
      </>
    ),
    body: "Не более двух человек в зале одновременно. Занимайтесь самостоятельно или с тренером в спокойной обстановке",
  },
  {
    id: "rhythm",
    src: "/images/recovery.png",
    alt: "Кабинет восстановления после тренировки",
    label: "Пространство и сервис вокруг вашего ритма",
    title: (
      <>
        <span className="block">
          <span className={gold}>Пространство </span>
          <span className={plain}>и сервис</span>
        </span>
        <span className="block text-right">
          <span className={plain}>вокруг вашего</span>
          <span className={gold}> ритма</span>
        </span>
      </>
    ),
    body: "Подберём удобное время для занятия, учтём пожелания и поможем расслабиться после тренировки",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, index]);

  const slide = slides[index];
  const compactTitle = (lines: boolean) =>
    slide.id === "comfort" ? (
      <>
        Индивидуальный подход для вашего <span className="text-gold italic">комфорта</span>
      </>
    ) : slide.id === "rhythm" ? (
      <>
        <span className="font-light text-gold italic">Пространство </span>
        и сервис вокруг вашего <span className="font-light text-gold italic">ритма</span>
      </>
    ) : lines ? (
      <>
        <span className="block font-light text-gold italic">Персональная</span>
        <span className="block">фитнесс студия</span>
        <span className="block">в самом центре</span>
        <span className="block text-gold italic">Москвы</span>
      </>
    ) : (
      <>
        <span className="font-light text-gold italic">Персональная</span>
        <span> фитнесс студия в самом центре </span>
        <span className="text-gold italic">Москвы</span>
      </>
    );
  const swipeX = useRef<number | null>(null);

  function onSwipeStart(event: PointerEvent<HTMLElement>) {
    swipeX.current = event.clientX;
  }

  function onSwipeEnd(event: PointerEvent<HTMLElement>) {
    if (swipeX.current == null) return;
    const delta = event.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(delta) < 48) return;
    go(index + (delta < 0 ? 1 : -1));
  }

  const dots = (
    <div className="flex w-20 justify-between" role="tablist" aria-label="Слайды">
      {slides.map((item, itemIndex) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={itemIndex === index}
          aria-label={item.label}
          onClick={() => go(itemIndex)}
          className={`size-4 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
            itemIndex === index ? "bg-[#cc9340]" : "bg-white"
          }`}
        />
      ))}
    </div>
  );

  return (
    <>
    <div id="top">
    <section
      className="relative flex touch-pan-y flex-col items-center gap-[60px] overflow-hidden bg-graphite px-4 pt-[120px] pb-[60px] text-white min-[768px]:hidden"
      onPointerDown={onSwipeStart}
      onPointerUp={onSwipeEnd}
      onPointerCancel={() => {
        swipeX.current = null;
      }}
      aria-roledescription="карусель"
      aria-label="Студия"
    >
      {slides.map((item, itemIndex) => (
        <Image
          key={item.id}
          src={item.src}
          alt={itemIndex === index ? item.alt : ""}
          fill
          priority={itemIndex === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            itemIndex === index
              ? "opacity-60 motion-safe:animate-[camera-drift_28s_linear_both]"
              : "opacity-0"
          }`}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.6) 25.222%, rgba(0, 0, 0, 0) 57.175%), linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 30.325%, rgba(0, 0, 0, 0) 53.328%)",
        }}
      />
      <div className="relative z-10 flex w-full flex-col items-start gap-10">
        <div className="flex w-full flex-col gap-4">
          <h1
            key={slide.id}
            className="w-full text-left text-[32px] leading-[normal] font-normal text-white uppercase motion-safe:animate-[hero-in_700ms_ease]"
          >
            {compactTitle(true)}
          </h1>
          <p
            key={`${slide.id}-body-mobile`}
            className="w-full text-base leading-[normal] text-white motion-safe:animate-[hero-in_700ms_ease]"
          >
            {slide.body}
          </p>
        </div>
        <a
          href="#about"
          className="inline-flex h-12 items-center bg-white px-9 font-nav text-lg leading-[18px] text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Познакомиться со студией
        </a>
      </div>
      <div className="relative z-10">{dots}</div>
    </section>
    <section
      className="relative hidden touch-pan-y flex-col items-center gap-[60px] overflow-hidden bg-graphite px-4 pt-[120px] pb-[60px] text-white min-[768px]:flex md:hidden"
      onPointerDown={onSwipeStart}
      onPointerUp={onSwipeEnd}
      onPointerCancel={() => {
        swipeX.current = null;
      }}
      aria-roledescription="карусель"
      aria-label="Студия"
    >
      {slides.map((item, itemIndex) => (
        <Image
          key={item.id}
          src={item.src}
          alt={itemIndex === index ? item.alt : ""}
          fill
          priority={itemIndex === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            itemIndex === index
              ? "opacity-60 motion-safe:animate-[camera-drift_28s_linear_both]"
              : "opacity-0"
          }`}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.6) 25.222%, rgba(0, 0, 0, 0) 57.175%), linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 30.325%, rgba(0, 0, 0, 0) 53.328%)",
        }}
      />
      <div className="relative z-10 flex w-full max-w-[520px] flex-col items-start gap-10">
        <div className="flex w-full flex-col gap-4">
          <h1
            key={`${slide.id}-tablet`}
            className="w-full text-[32px] leading-[normal] font-normal text-white uppercase motion-safe:animate-[hero-in_700ms_ease]"
          >
            {compactTitle(false)}
          </h1>
          <p
            key={`${slide.id}-body-tablet`}
            className="w-full text-base leading-[normal] text-white motion-safe:animate-[hero-in_700ms_ease]"
          >
            {slide.body}
          </p>
        </div>
        <a
          href="#about"
          className="inline-flex h-12 items-center bg-white px-9 font-nav text-lg leading-[18px] text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Познакомиться со студией
        </a>
      </div>
      <div className="relative z-10">{dots}</div>
    </section>
    <section
      className="relative hidden min-h-[100dvh] overflow-hidden bg-graphite text-white md:block"
      aria-roledescription="карусель"
      aria-label="Студия"
    >
      {slides.map((item, itemIndex) => (
        <Image
          key={item.id}
          src={item.src}
          alt={itemIndex === index ? item.alt : ""}
          fill
          priority={itemIndex === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            itemIndex === index
              ? "opacity-60 motion-safe:animate-[camera-drift_28s_linear_both]"
              : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 from-[1%] to-transparent to-[42%]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col justify-end gap-12 px-5 pt-36 pb-10 md:gap-20 md:px-[60px] md:pt-60 md:pb-[60px]">
        <div className="w-full">
          <h1
            key={slide.id}
            className="flex flex-col gap-4 text-[clamp(2rem,5.6vw,72px)] leading-none font-light uppercase italic motion-safe:animate-[hero-in_700ms_ease]"
          >
            {slide.title}
          </h1>

          <div className="mt-12 flex flex-col items-start gap-8 md:mt-20 md:flex-row md:items-center md:justify-between">
            <p
              key={`${slide.id}-body`}
              className="max-w-[720px] text-lg leading-normal text-white motion-safe:animate-[hero-in_700ms_ease] md:text-2xl"
            >
              {slide.body}
            </p>
            <a
              href="#about"
              className="inline-flex h-12 shrink-0 items-center bg-white px-9 font-nav text-lg leading-none text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Познакомиться со студией
            </a>
          </div>
        </div>

        <div className="flex justify-center gap-4" role="tablist" aria-label="Слайды">
          {slides.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={item.label}
              onClick={() => go(itemIndex)}
              className={`size-4 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                itemIndex === index ? "bg-[#cc9340]" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
    </div>
    </>
  );
}
