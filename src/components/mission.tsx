"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    tag: "тренерский состав",
    title: "Тренеры, которым можно доверить результат",
    text: "Специалисты выстраивают тренировочный процесс под ваши цели, физическую форму и индивидуальные особенности.",
    image: "/images/mission-trainers.png",
    start: 0,
  },
  {
    tag: "восстановление",
    title: "Профессиональные массажисты в студии",
    text: "Массаж дополняет тренировочный процесс, помогает телу восстановиться после нагрузки.",
    image: "/images/mission-recovery.png",
    start: 0.46,
  },
  {
    tag: "подход",
    title: "Условия подбираются под вас индивидуально",
    text: "В студии одновременно находятся до двух гостей, чтобы вы могли сосредоточиться на вашей тренировке, технике и прогрессе.",
    image: "/images/mission-approach.png",
    start: 0.24,
  },
];

export function Mission() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const items = [...stage.querySelectorAll<HTMLElement>("[data-card]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileMedia = window.matchMedia("(max-width: 1279px)");

    const place = (progress: number) => {
      const list = stage.querySelector("ul");
      const origin = list
        ? list.getBoundingClientRect().top - stage.getBoundingClientRect().top
        : 0;

      items.forEach((item, index) => {
        const start = cards[index].start;
        const t =
          reduce || progress >= 1
            ? 1
            : Math.min(1, Math.max(0, (progress - start) / (1 - start)));
        const travel = origin + item.offsetHeight;
        const y = travel * (1 - t);
        item.style.transform = y === 0 ? "none" : `translate3d(0, ${-y}px, 0)`;
      });
    };

    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce || mobileMedia.matches) {
        stage.style.position = "";
        stage.style.top = "";
        stage.style.left = "";
        stage.style.right = "";
        stage.style.clipPath = "";
        track.style.height = "";
        place(1);
        return;
      }
      const header = [...document.querySelectorAll("header")].find(
        (node) => getComputedStyle(node).display !== "none",
      );
      const headerBottom = header ? header.getBoundingClientRect().height : 72;
      const padTop = Number.parseFloat(getComputedStyle(stage).paddingTop) || 0;
      const fixedTop = headerBottom - padTop;
      const range = window.innerHeight * 1.7;
      track.style.height = `${stage.offsetHeight + range}px`;

      const scrolled = fixedTop - track.getBoundingClientRect().top;

      if (scrolled <= 0) {
        stage.style.position = "relative";
        stage.style.top = "0px";
        stage.style.left = "";
        stage.style.right = "";
        stage.style.clipPath = "";
        place(0);
        return;
      }

      if (scrolled >= range) {
        stage.style.position = "absolute";
        stage.style.top = `${range}px`;
        stage.style.left = "0px";
        stage.style.right = "0px";
        stage.style.clipPath = "";
        place(1);
        return;
      }

      stage.style.position = "fixed";
      stage.style.top = `${fixedTop}px`;
      stage.style.left = "0px";
      stage.style.right = "0px";
      stage.style.zIndex = "30";
      stage.style.clipPath = `inset(${Math.max(0, headerBottom - fixedTop)}px 0 0 0)`;
      place(scrolled / range);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mobileMedia.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mobileMedia.removeEventListener("change", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const card = cards[cardIndex];

  return (
    <>
    <section className="flex flex-col items-center gap-10 bg-ink px-4 py-10 min-[768px]:hidden">
      <h2 className="w-full max-w-[520px] text-2xl leading-[normal] font-normal text-white uppercase">
        Наша миссия – создать <em className="font-thin text-gold italic">условия</em>, где забота о
        теле становится <em className="font-thin text-gold italic">естественной</em> частью рутины
      </h2>
      <article className="relative flex w-full flex-col items-end gap-[60px] overflow-hidden border border-muted px-4 pt-6 pb-10">
        <Image
          src={card.image}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-20"
        />
        <span className="relative z-10 bg-ivory px-4 py-2 text-xs font-semibold text-ink uppercase">
          {card.tag}
        </span>
        <div className="relative z-10 grid w-full gap-4">
          <h3 className="text-lg leading-[normal] font-normal text-white">{card.title}</h3>
          <p className="text-sm leading-[normal] text-white">{card.text}</p>
        </div>
      </article>
      <div className="flex w-20 justify-between" role="tablist" aria-label="Миссия">
        {cards.map((item, index) => (
          <button
            key={item.tag}
            type="button"
            role="tab"
            aria-selected={index === cardIndex}
            aria-label={item.tag}
            onClick={() => setCardIndex(index)}
            className={`size-4 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
              index === cardIndex ? "bg-[#cc9340]" : "bg-white"
            }`}
          />
        ))}
      </div>
    </section>
    <section className="hidden flex-col items-center gap-10 bg-ink p-10 min-[768px]:flex md:hidden">
      <h2 className="w-full max-w-[820px] text-2xl leading-[normal] font-normal text-white uppercase">
        Наша миссия – создать <em className="font-thin text-gold italic">условия</em>, где забота о
        теле становится <em className="font-thin text-gold italic">естественной</em> частью рутины
      </h2>
      <ul className="flex w-full max-w-[820px] items-stretch">
        {cards.map((item) => (
          <li
            key={item.tag}
            className="flex min-h-[319px] min-w-0 flex-1 flex-col items-end justify-between border border-muted px-4 py-6"
          >
            <span className="bg-ivory px-4 py-2 text-xs leading-[normal] font-semibold text-ink uppercase">
              {item.tag}
            </span>
            <div className="grid w-full gap-4">
              <h3 className="text-lg leading-[normal] font-normal text-white">{item.title}</h3>
              <p className="text-sm leading-[normal] text-stone">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
    <section ref={trackRef} className="relative hidden bg-ink md:block">
      <div
        ref={stageRef}
        className="overflow-hidden bg-ink px-[60px] pt-[60px] pb-[60px]"
      >
        <div className="mx-auto flex max-w-[1320px] flex-col gap-[120px]">
          <h2 className="relative z-0 text-[clamp(2rem,4.6vw,4.5rem)] leading-none font-normal text-white uppercase">
            Наша миссия – создать <em className="font-thin text-gold italic">условия</em>, где забота
            о теле становится <em className="font-thin text-gold italic">естественной</em> частью
            рутины
          </h2>
          <ul className="relative z-10 grid min-[600px]:grid-cols-3">
            {cards.map((card) => (
              <li
                key={card.tag}
                data-card
                className="group relative flex min-h-[392px] flex-col items-end justify-between overflow-hidden border-2 border-muted bg-ink px-6 py-10 -ml-0.5 first:ml-0"
                style={{ transform: "translate3d(0, -240%, 0)" }}
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 440px, 100vw"
                  className="pointer-events-none object-cover opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-30 motion-reduce:transition-none"
                />
                <span className="relative z-10 bg-ivory px-4 py-2 text-xs font-semibold text-ink uppercase">
                  {card.tag}
                </span>
                <div className="relative z-10 mt-10 grid gap-6">
                  <h3 className="text-2xl leading-normal font-normal text-white">
                    {card.title}
                  </h3>
                  <p className="text-lg leading-[30px] text-stone transition-colors duration-200 ease-out group-hover:text-white motion-reduce:transition-none">
                    {card.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </>
  );
}
