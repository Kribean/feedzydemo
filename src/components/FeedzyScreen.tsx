"use client";

import { useEffect, useRef, useState } from "react";
import { BUSINESS, RAW_TRANSCRIPT } from "@/lib/content";
import type { Platform } from "./Demo";
import { BrowserBar } from "./BrowserBar";
import {
  CheckIcon,
  DocIcon,
  GoogleG,
  MicIcon,
  PencilIcon,
  RestartIcon,
  ShieldIcon,
  Star,
  TrustpilotStar,
  WandIcon,
} from "./icons";

type Phase = "idle" | "recording" | "processing" | "ready";

type Props = {
  review: string;
  onReviewChange: (text: string) => void;
  published: Platform[];
  onClose: () => void;
  onPublish: (p: Platform) => void;
  onRestart: () => void;
};

const WORDS = RAW_TRANSCRIPT.split(" ");
const PROCESS_STEPS = ["Transcription de votre message", "Correction et mise en forme", "Rédaction de votre avis"];

export function FeedzyScreen({ review, onReviewChange, published, onClose, onPublish, onRestart }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [phase]);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#eceef5] screen-in">
      <BrowserBar title={`${BUSINESS.name} — Votre avis`} domain="feedzy-hub.com" onClose={onClose} dark />

      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar">
        {phase === "idle" || phase === "recording" ? (
          <RecordView recording={phase === "recording"} onStart={() => setPhase("recording")} onStop={() => setPhase("processing")} />
        ) : phase === "processing" ? (
          <ProcessingView onDone={() => setPhase("ready")} />
        ) : (
          <ReadyView
            review={review}
            onReviewChange={onReviewChange}
            published={published}
            onPublish={onPublish}
            onRestart={onRestart}
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Brand() {
  return (
    <div className="text-center pt-6">
      <div className="text-[30px] font-semibold tracking-[0.12em] text-white leading-none">
        clean
        <span className="relative inline-block bg-gradient-to-b from-[#6fe0ff] to-[#a78bfa] bg-clip-text text-transparent">
          easy
          <span className="absolute -top-1.5 -right-3 text-[14px] text-[#6fe0ff]">✦</span>
        </span>
      </div>
      <div className="mt-2.5 text-[11px] tracking-[0.35em] text-white/80 font-medium">{BUSINESS.tagline}</div>
    </div>
  );
}

function Hero({ children, tall = false }: { children: React.ReactNode; tall?: boolean }) {
  return (
    <div
      className={`relative px-5 ${tall ? "pb-24" : "pb-20"}`}
      style={{
        background:
          "radial-gradient(120% 60% at 50% 55%, rgba(124,108,255,0.55), transparent 70%), linear-gradient(180deg, #0b0b2e 0%, #2a2386 45%, #5a44e0 100%)",
      }}
    >
      <Brand />
      {children}
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="bg-gradient-to-r from-[#5ee0ff] via-[#8fa2ff] to-[#c39bff] bg-clip-text text-transparent">{children}</span>;
}

function PoweredBy() {
  return (
    <div className="text-center text-[13px] text-neutral-400 pt-6 pb-[max(env(safe-area-inset-bottom),20px)]">
      Propulsé par <span className="font-semibold text-[#3b5bdb]">feedzy-hub.com</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function RecordView({ recording, onStart, onStop }: { recording: boolean; onStart: () => void; onStop: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    const words = setInterval(() => setWordCount((c) => Math.min(c + 1, WORDS.length)), 230);
    return () => {
      clearInterval(timer);
      clearInterval(words);
    };
  }, [recording]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [wordCount]);

  const done = wordCount >= WORDS.length;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <>
      <Hero tall>
        <h1 className="mt-7 text-center text-[32px] leading-[1.15] font-bold text-white">
          {recording ? (
            <>
              Je vous écoute…
              <br />
              <GradientText>prenez votre temps</GradientText>
            </>
          ) : (
            <>
              Parlez-nous de
              <br />
              <GradientText>votre expérience</GradientText>
            </>
          )}
        </h1>

        <div className="relative mx-auto mt-8 w-[min(64vw,250px)] aspect-square">
          {/* Halo */}
          <div className="absolute -inset-5 rounded-full border border-white/15" />
          {recording && (
            <>
              <div className="absolute inset-0 rounded-full bg-[#8b7cf6] pulse-ring" />
              <div className="absolute inset-0 rounded-full bg-[#8b7cf6] pulse-ring-delay" />
            </>
          )}
          <button
            onClick={recording ? onStop : onStart}
            className={`absolute inset-0 rounded-full text-white flex flex-col items-center justify-center shadow-[0_20px_60px_-10px_rgba(40,30,160,0.9),inset_0_2px_6px_rgba(255,255,255,0.35)] active:scale-95 transition-transform ${
              recording ? "" : "breathe"
            }`}
            style={{
              background: recording
                ? "radial-gradient(circle at 30% 25%, #ff9db0 0%, #f0476b 45%, #c2185b 100%)"
                : "radial-gradient(circle at 30% 25%, #b5a8ff 0%, #6f6af8 40%, #3b4fd8 100%)",
            }}
            aria-label={recording ? "Terminer l'enregistrement" : "Commencer l'enregistrement"}
          >
            <span className="absolute top-[14%] right-[22%] w-2.5 h-2.5 rounded-full bg-white/90" />
            {recording ? (
              <>
                <div className="flex items-center gap-[5px] h-12">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className="wave-bar w-[5px] h-full rounded-full bg-white"
                      style={{ animationDelay: `${(i * 0.13) % 0.9}s`, animationDuration: `${0.7 + (i % 3) * 0.2}s` }}
                    />
                  ))}
                </div>
                <div className="mt-3 text-[22px] font-semibold tabular-nums">
                  {mm}:{ss}
                </div>
                <div className="text-[14px] text-white/85 mt-0.5">
                  Appuyez pour <b>terminer</b>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 opacity-80">
                    <span className="w-[3px] h-4 rounded bg-white" />
                    <span className="w-[3px] h-7 rounded bg-white" />
                  </div>
                  <MicIcon className="w-16 h-16" />
                  <div className="flex items-center gap-1 opacity-80">
                    <span className="w-[3px] h-7 rounded bg-white" />
                    <span className="w-[3px] h-4 rounded bg-white" />
                  </div>
                </div>
                <div className="mt-3 text-[16px] text-white/90">Appuyez pour</div>
                <div className="text-[19px] font-semibold">enregistrer</div>
              </>
            )}
          </button>
        </div>
      </Hero>

      <div className="relative -mt-14 px-4">
        {recording ? (
          <div className="bg-white rounded-[28px] shadow-[0_10px_40px_-10px_rgba(30,30,90,0.25)] p-5 fade-up">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#e5395f]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e5395f] animate-pulse" />
              Transcription en direct
            </div>
            <div ref={transcriptRef} className="mt-3 max-h-40 overflow-y-auto no-scrollbar text-[16px] leading-relaxed text-[#1b1b3a]">
              {wordCount === 0 ? (
                <span className="text-neutral-400 caret">Parlez maintenant</span>
              ) : (
                <span className={done ? "" : "caret"}>{WORDS.slice(0, wordCount).join(" ")}</span>
              )}
            </div>
            {done && (
              <button
                onClick={onStop}
                className="mt-4 w-full rounded-2xl bg-gradient-to-r from-[#5b6cf9] to-[#8b5cf6] text-white font-semibold py-3.5 fade-up active:scale-[0.98] transition-transform"
              >
                Terminer et générer mon avis ✨
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-[28px] shadow-[0_10px_40px_-10px_rgba(30,30,90,0.25)] px-3 py-6 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start text-center">
            <StepItem icon={<MicIcon className="w-5 h-5 text-[#4f6bed]" />} bg="from-[#e3e9ff] to-[#f3f5ff]">
              1. Parlez <span className="text-[#3b6cf6]">naturellement</span>
            </StepItem>
            <Arrow />
            <StepItem icon={<WandIcon className="w-5 h-5 text-[#8b5cf6]" />} bg="from-[#efe6ff] to-[#f7f2ff]">
              2. Notre IA transforme votre vocale en avis <span className="text-[#3b6cf6]">ÉCRIT</span> et professionnel
            </StepItem>
            <Arrow />
            <StepItem icon={<Star className="w-5 h-5 text-[#f5a623]" />} bg="from-[#fff0c9] to-[#fff8e6]">
              3. Publiez votre avis en <span className="text-[#3b6cf6]">1 CLIC</span>
            </StepItem>
          </div>
        )}

        <div className="mt-4 rounded-[24px] bg-[#0d0d2b] px-5 py-4 flex items-center gap-4">
          <ShieldIcon className="w-8 h-8 text-[#6c8cff] shrink-0" />
          <div className="leading-snug">
            <div className="text-white font-semibold text-[15px]">
              Votre voix ne sera <GradientText>jamais publiée.</GradientText>
            </div>
            <div className="text-[13px] text-white/55">
              <b className="text-white/85">100% sécurisé.</b> Aucun avis publié sans votre validation.
            </div>
          </div>
        </div>

        {!recording && (
          <div className="mt-4 rounded-[24px] bg-white px-5 py-4 flex items-center gap-4 shadow-[0_6px_24px_-12px_rgba(30,30,90,0.25)]">
            <GoogleG className="w-9 h-9 shrink-0" />
            <div className="flex-1 leading-snug">
              <div className="font-semibold text-[16px] text-[#14142b]">Vous préférez écrire ?</div>
              <div className="text-[13px] text-neutral-500">Rédigez votre avis directement.</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#f2f4fb] grid place-items-center text-[#3b6cf6] text-lg">→</div>
          </div>
        )}

        <PoweredBy />
      </div>
    </>
  );
}

function StepItem({ icon, bg, children }: { icon: React.ReactNode; bg: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center px-0.5">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-b ${bg} grid place-items-center shadow-[0_6px_16px_-6px_rgba(80,80,200,0.35)]`}>
        {icon}
      </div>
      <div className="mt-3 text-[12.5px] font-semibold leading-snug text-[#14142b]">{children}</div>
    </div>
  );
}

function Arrow() {
  return <div className="pt-4 text-neutral-300 text-sm">→</div>;
}

/* ------------------------------------------------------------------ */

function ProcessingView({ onDone }: { onDone: () => void }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= PROCESS_STEPS.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), 1100);
    return () => clearTimeout(t);
  }, [current, onDone]);

  return (
    <>
      <Hero>
        <div className="relative mx-auto mt-10 w-36 h-36">
          <div className="absolute inset-0 rounded-full border-[3px] border-white/15 border-t-[#7fe3ff] spin" />
          <div
            className="absolute inset-4 rounded-full grid place-items-center shadow-[0_10px_40px_-5px_rgba(120,100,255,0.9)]"
            style={{ background: "radial-gradient(circle at 30% 25%, #c4b8ff 0%, #8b5cf6 50%, #4f46e5 100%)" }}
          >
            <WandIcon className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="mt-8 text-center text-[28px] leading-[1.2] font-bold text-white">
          Notre IA rédige
          <br />
          <GradientText>votre avis…</GradientText>
        </h1>
      </Hero>

      <div className="relative -mt-12 px-4">
        <div className="bg-white rounded-[28px] shadow-[0_10px_40px_-10px_rgba(30,30,90,0.25)] p-5 space-y-4">
          {PROCESS_STEPS.map((label, i) => {
            const state = i < current ? "done" : i === current ? "active" : "todo";
            return (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full grid place-items-center shrink-0 transition-colors ${
                    state === "done" ? "bg-[#22c08a] text-white" : state === "active" ? "bg-[#eef0ff]" : "bg-neutral-100"
                  }`}
                >
                  {state === "done" ? (
                    <CheckIcon className="w-4 h-4 pop" />
                  ) : state === "active" ? (
                    <span className="w-4 h-4 rounded-full border-2 border-[#c9cffd] border-t-[#5b6cf9] spin" />
                  ) : null}
                </div>
                <div className={`text-[15px] ${state === "todo" ? "text-neutral-400" : "text-[#14142b] font-medium"}`}>{label}</div>
              </div>
            );
          })}
        </div>
        <PoweredBy />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function ReadyView({
  review,
  onReviewChange,
  published,
  onPublish,
  onRestart,
}: {
  review: string;
  onReviewChange: (t: string) => void;
  published: Platform[];
  onPublish: (p: Platform) => void;
  onRestart: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, [review, editing]);

  const publish = (p: Platform) => {
    navigator.clipboard?.writeText(review).catch(() => {});
    onPublish(p);
  };

  return (
    <>
      <Hero>
        <div className="relative mx-auto mt-8 w-32 h-32">
          <div className="absolute -inset-4 rounded-full border border-white/20" />
          <div
            className="absolute inset-0 rounded-full grid place-items-center pop shadow-[0_0_60px_rgba(40,220,150,0.55),inset_0_3px_8px_rgba(255,255,255,0.45)]"
            style={{ background: "radial-gradient(circle at 30% 25%, #8ff0c4 0%, #22c08a 45%, #0f8f63 100%)" }}
          >
            <CheckIcon className="w-14 h-14 text-white" />
          </div>
        </div>
        <h1 className="mt-7 text-center text-[32px] leading-[1.15] font-bold text-white fade-up">
          Merci !
          <br />
          <GradientText>Votre avis compte pour nous</GradientText>
        </h1>
      </Hero>

      <div className="relative -mt-12 px-4">
        <div className="bg-white rounded-[28px] shadow-[0_10px_40px_-10px_rgba(30,30,90,0.25)] p-5 fade-up">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#6d7cff] to-[#4f5bea] grid place-items-center text-white shrink-0 shadow-md">
              <DocIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 leading-tight">
              <div className="font-bold text-[18px] text-[#14142b]">Votre avis est prêt</div>
              <div className="text-[12.5px] text-neutral-500 mt-1">Publiez-le ou modifiez-le si vous le souhaitez.</div>
            </div>
          </div>

          <div className={`mt-4 rounded-2xl bg-[#f2f3f9] p-4 ${editing ? "ring-2 ring-[#6d7cff]" : ""}`}>
            {editing ? (
              <textarea
                ref={textareaRef}
                value={review}
                onChange={(e) => onReviewChange(e.target.value)}
                className="w-full bg-transparent resize-none outline-none text-[15px] leading-relaxed text-[#1b1b3a]"
                autoFocus
              />
            ) : (
              <div className="text-[15px] leading-relaxed text-[#1b1b3a] whitespace-pre-line">{review}</div>
            )}
          </div>

          <button
            onClick={() => setEditing((e) => !e)}
            className="mt-3 flex items-center gap-1.5 text-[14px] font-medium text-[#4f5bea] active:opacity-60"
          >
            {editing ? <CheckIcon className="w-4 h-4" /> : <PencilIcon className="w-4 h-4" />}
            {editing ? "Valider mes modifications" : "Modifier mon avis"}
          </button>
        </div>

        <button
          onClick={() => publish("google")}
          className="mt-5 w-full rounded-[22px] px-3 py-3.5 flex items-center gap-3 text-white font-bold text-[16px] shadow-[0_12px_30px_-10px_rgba(20,170,110,0.8)] active:scale-[0.98] transition-transform"
          style={{ background: "linear-gradient(180deg, #34d39a 0%, #14a974 100%)" }}
        >
          <span className="w-11 h-11 rounded-full bg-white grid place-items-center shrink-0 shadow">
            <GoogleG className="w-6 h-6" />
          </span>
          <span className="flex-1 text-left">
            {published.includes("google") ? "✓ Publié sur Google" : "Cliquez ici pour publier sur Google"}
          </span>
        </button>

        <button
          onClick={() => publish("trustpilot")}
          className="mt-3 w-full rounded-[22px] px-3 py-3.5 flex items-center gap-3 text-white font-bold text-[16px] bg-[#191919] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)] active:scale-[0.98] transition-transform"
        >
          <span className="w-11 h-11 rounded-full bg-white grid place-items-center shrink-0 shadow">
            <TrustpilotStar className="w-6 h-6" />
          </span>
          <span className="flex-1 text-left">
            {published.includes("trustpilot") ? "✓ Publié sur Trustpilot" : "Publier aussi sur Trustpilot"}
          </span>
        </button>

        <p className="mt-3 text-center text-[13px] text-neutral-500 leading-snug px-2">
          En cliquant ici, votre avis sera automatiquement copié et collé sur la page choisie.
        </p>

        {published.length > 0 && (
          <button onClick={onRestart} className="mx-auto mt-5 flex items-center gap-2 text-[14px] text-neutral-500 active:opacity-60">
            <RestartIcon className="w-4 h-4" /> Recommencer la démo
          </button>
        )}

        <PoweredBy />
      </div>
    </>
  );
}
