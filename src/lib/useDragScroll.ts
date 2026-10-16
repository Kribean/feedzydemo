"use client";

import { useEffect } from "react";

// Sur PC : permet de faire défiler les zones `.drag-scroll` en cliquant-glissant avec la souris,
// comme au doigt sur mobile, avec un élan au relâchement. Le tactile garde le défilement natif.

const DRAG_THRESHOLD = 5; // px parcourus avant de considérer que c'est un glissé et non un clic
const VELOCITY_WINDOW = 80; // ms de mouvement pris en compte pour calculer l'élan
const FRICTION = 0.95; // ralentissement de l'élan par image (~16 ms)
const MIN_VELOCITY = 0.02; // px/ms en dessous duquel l'élan s'arrête

// Remonte jusqu'à la première zone `.drag-scroll` qui a réellement du contenu à faire défiler.
function findScroller(target: Element | null): HTMLElement | null {
  let el = target?.closest<HTMLElement>(".drag-scroll") ?? null;
  while (el && el.scrollHeight <= el.clientHeight) {
    el = el.parentElement?.closest<HTMLElement>(".drag-scroll") ?? null;
  }
  return el;
}

export function useDragScroll() {
  useEffect(() => {
    let scroller: HTMLElement | null = null;
    let startY = 0;
    let startScroll = 0;
    let dragging = false;
    let samples: { y: number; t: number }[] = [];
    let inertiaFrame = 0;

    const stopInertia = () => cancelAnimationFrame(inertiaFrame);

    const startInertia = (el: HTMLElement, velocity: number) => {
      let v = velocity;
      let last = performance.now();
      const step = (now: number) => {
        const dt = now - last;
        last = now;
        const before = el.scrollTop;
        el.scrollTop = before + v * dt;
        v *= Math.pow(FRICTION, dt / 16);
        // On s'arrête quand l'élan est épuisé ou qu'on bute en haut / en bas.
        if (Math.abs(v) > MIN_VELOCITY && el.scrollTop !== before) inertiaFrame = requestAnimationFrame(step);
      };
      inertiaFrame = requestAnimationFrame(step);
    };

    // Après un glissé, le relâchement ne doit pas déclencher le bouton situé sous la souris.
    const swallowNextClick = () => {
      const stop = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };
      window.addEventListener("click", stop, { capture: true, once: true });
      setTimeout(() => window.removeEventListener("click", stop, { capture: true }), 0);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      stopInertia();
      const target = e.target as Element;
      // Dans les zones de saisie, le clic sert à placer le curseur et sélectionner du texte.
      if (target.closest("textarea, input, [contenteditable='true']")) return;
      scroller = findScroller(target);
      if (!scroller) return;
      startY = e.clientY;
      startScroll = scroller.scrollTop;
      dragging = false;
      samples = [{ y: e.clientY, t: e.timeStamp }];
    };

    const onMove = (e: PointerEvent) => {
      if (!scroller) return;
      const dy = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(dy) < DRAG_THRESHOLD) return;
        dragging = true;
        document.documentElement.classList.add("drag-scrolling");
        window.getSelection()?.removeAllRanges();
      }
      scroller.scrollTop = startScroll - dy;
      samples.push({ y: e.clientY, t: e.timeStamp });
      samples = samples.filter((s) => e.timeStamp - s.t <= VELOCITY_WINDOW);
    };

    const onUp = (e: PointerEvent) => {
      if (!scroller) return;
      if (dragging) {
        document.documentElement.classList.remove("drag-scrolling");
        swallowNextClick();
        const recent = samples.filter((s) => e.timeStamp - s.t <= VELOCITY_WINDOW);
        if (recent.length >= 2) {
          const first = recent[0];
          const last = recent[recent.length - 1];
          const dt = last.t - first.t;
          if (dt > 0) startInertia(scroller, -(last.y - first.y) / dt);
        }
      }
      scroller = null;
      dragging = false;
    };

    // Empêche le glisser-déposer natif (texte, images) de prendre le dessus sur le défilement.
    const onDragStart = (e: DragEvent) => {
      if (findScroller(e.target as Element)) e.preventDefault();
    };

    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("dragstart", onDragStart);
    return () => {
      stopInertia();
      document.documentElement.classList.remove("drag-scrolling");
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("dragstart", onDragStart);
    };
  }, []);
}
