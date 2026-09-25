"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const rows = [
  {
    id: "about",
    index: "(01)",
    title: "Индивидуальный подход для вашего комфорта",
    text: "Не более двух человек в зале одновременно. Занимайтесь самостоятельно или с тренером в спокойной обстановке",
    image: "/images/approach.png",
    alt: "Персональная тренировка в зале студии",
    imageFirst: true,
  },
  {
    id: "services",
    index: "(02)",
    title: "Все необходимое для восстановления после тренировки",
    text: "Поможем расслабиться после тренировки с помощью массажных процедур, чтобы сделать тренировки частью заботы о теле",
    image: "/images/recovery.png",
    alt: "Массажный кабинет студии",
    imageFirst: false,
  },
  {
    id: "membership",
    index: "(03)",
    title: "Пространство и сервис вокруг вашего ритма",
    text: "Вы выбираете время занятий вместе со студией и выстраиваете расписание под свой привычный график.",
    image: "/images/rhythm.png",
    alt: "Зона восстановления с полотенцами и свечами",
    imageFirst: true,
  },
];

function Panel({
  row,
  className,
}: {
  row: (typeof rows)[number];
  className?: string;
}) {
  return (
    <article className={className}>
      <div
        className={`mx-auto flex w-full max-w-[1320px] flex-col gap-8 md:h-[480px] md:flex-row md:items-center md:gap-10 ${
          row.imageFirst ? "" : "md:flex-row-reverse"
        }`}
      >
        <div className="relative h-[240px] w-full bg-[#906241] md:h-full md:min-w-0 md:flex-1">
          <Image
            src={row.image}
            alt={row.alt}
            fill
            sizes="(min-width: 1280px) 640px, 100vw"
            className={`object-cover ${row.id === "membership" ? "object-[30%_center]" : ""}`}
          />
        </div>
        <div className="flex w-full flex-col justify-between gap-8 md:h-full md:min-w-0 md:flex-1 md:gap-[60px]">
          <h2 className="text-[clamp(1.75rem,3.2vw,3rem)] leading-none font-normal text-white uppercase">
            <span className="block">{row.index}</span>
            <span className="mt-8 block md:mt-16">{row.title}</span>
          </h2>
          <p className="text-lg leading-normal text-ivory md:text-2xl">
            {row.text}
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 h-0.5 w-full max-w-[1320px] bg-muted" />
    </article>
  );
}

function useMatch(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function FormatSection() {
  const isMobile = useMatch("(max-width: 599px)");
  const isCompact = useMatch("(min-width: 600px) and (max-width: 767px)");
  const isTablet = useMatch("(min-width: 768px) and (max-width: 1279px)");
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const reduceMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduceMedia.matches) {
        setPinned(false);
        setProgress(0);
        return;
      }

      setPinned(true);
      const track = trackRef.current;
      if (!track) return;
      const range = track.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), range);
      setProgress((scrolled / range) * (rows.length - 1));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduceMedia.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduceMedia.removeEventListener("change", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const mobile = (
    <div className="bg-ink min-[768px]:hidden">
      {rows.map((row, index) => (
        <section
          key={row.id}
          id={row.id}
          className={`flex flex-col items-center gap-6 px-4 ${
            index === 0 ? "pt-[60px] pb-6" : "py-6"
          }`}
        >
          <h2 className="w-full max-w-[520px] text-2xl leading-[normal] font-normal whitespace-pre-line text-white uppercase">
            {`${row.index}\n\n${row.title}`}
          </h2>
          <div className="relative h-[240px] w-full max-w-[520px]">
            <Image
              src={row.image}
              alt={row.alt}
              fill
              sizes="100vw"
              className={`object-cover ${row.id === "membership" ? "object-[30%_center]" : ""}`}
            />
          </div>
          <p className="w-full max-w-[520px] text-base leading-[normal] text-white">{row.text}</p>
          <div className="h-0.5 w-full max-w-[520px] bg-muted" />
        </section>
      ))}
    </div>
  );

  const tablet = (
    <div className="bg-ink">
      {rows.map((row) => (
        <section key={row.id} id={row.id} className="flex flex-col items-center gap-6 bg-ink px-10 pt-[60px] pb-6">
          <div className={`flex h-[280px] w-full max-w-[820px] items-start gap-10 ${row.imageFirst ? "" : "flex-row-reverse"}`}>
            <div className="relative h-full min-w-0 flex-1 bg-[#906241]">
              <Image
                src={row.image}
                alt={row.alt}
                fill
                sizes="50vw"
                className={`object-cover ${row.id === "membership" ? "object-[30%_center]" : ""}`}
              />
            </div>
            <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
              <h2 className="text-2xl leading-[normal] font-normal whitespace-pre-line text-white uppercase">
                {`${row.index}\n\n${row.title}`}
              </h2>
              <p className="text-base leading-[normal] text-white">{row.text}</p>
            </div>
          </div>
          <div className="h-0.5 w-full max-w-[820px] bg-muted" />
        </section>
      ))}
    </div>
  );

  const stacked = isMobile || isCompact;

  if (!pinned) {
    if (stacked) return mobile;
    if (isTablet) return tablet;
    return (
      <div className="bg-ink">
        {rows.map((row, index) => (
          <section
            key={row.id}
            id={row.id}
            className={`mx-auto max-w-[1440px] px-5 md:px-[60px] ${
              index === 0 ? "pt-16 pb-10 md:pt-[120px] md:pb-[60px]" : "py-10 md:p-[60px]"
            }`}
          >
            <Panel row={row} />
          </section>
        ))}
      </div>
    );
  }

  return (
    <div ref={trackRef} className="relative h-[300dvh] bg-ink">
      {rows.map((row, index) => (
        <div
          key={row.id}
          id={row.id}
          className="absolute h-px w-px"
          style={{ top: `${index * 100}dvh` }}
        />
      ))}
      <div className="sticky top-0 h-dvh overflow-hidden">
        {rows.map((row, index) => {
          const local = index === 0 ? 1 : Math.min(1, Math.max(0, progress - (index - 1)));
          const shift = (1 - local) * 100;
          return (
            <section
              key={row.id}
              aria-hidden={local === 0}
              className={
                stacked
                  ? "absolute inset-0 flex flex-col items-center justify-center gap-6 overflow-hidden bg-ink px-4"
                  : isTablet
                    ? "absolute inset-0 flex items-center bg-ink px-10"
                    : "absolute inset-0 flex items-center bg-ink px-5 md:px-[60px]"
              }
              style={{
                zIndex: index + 1,
                transform: `translate3d(0, ${shift}%, 0)`,
              }}
            >
              {stacked ? (
                <>
                  <h2 className="w-full max-w-[520px] text-2xl leading-[normal] font-normal whitespace-pre-line text-white uppercase">
                    {`${row.index}\n\n${row.title}`}
                  </h2>
                  <div className="relative h-[240px] w-full max-w-[520px] shrink-0">
                    <Image
                      src={row.image}
                      alt={row.alt}
                      fill
                      sizes="100vw"
                      className={`object-cover ${row.id === "membership" ? "object-[30%_center]" : ""}`}
                    />
                  </div>
                  <p className="w-full max-w-[520px] text-base leading-[normal] text-white">{row.text}</p>
                  <div className="h-0.5 w-full max-w-[520px] bg-muted" />
                </>
              ) : isTablet ? (
                <div className="flex w-full max-w-[820px] flex-col gap-6">
                  <div className={`flex h-[280px] items-start gap-10 ${row.imageFirst ? "" : "flex-row-reverse"}`}>
                    <div className="relative h-full min-w-0 flex-1 bg-[#906241]">
                      <Image
                        src={row.image}
                        alt={row.alt}
                        fill
                        sizes="50vw"
                        className={`object-cover ${row.id === "membership" ? "object-[30%_center]" : ""}`}
                      />
                    </div>
                    <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
                      <h2 className="text-2xl leading-[normal] font-normal whitespace-pre-line text-white uppercase">
                        {`${row.index}\n\n${row.title}`}
                      </h2>
                      <p className="text-base leading-[normal] text-white">{row.text}</p>
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-muted" />
                </div>
              ) : (
                <Panel row={row} className="w-full" />
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
