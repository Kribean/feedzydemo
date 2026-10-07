"use client";

import { useEffect, useState } from "react";
import { BUSINESS, REVIEW_LINK, WHATSAPP_MESSAGE } from "@/lib/content";
import { BackIcon, DotsIcon, MicIcon } from "./icons";

function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function WhatsAppScreen({ onOpenLink }: { onOpenLink: () => void }) {
  const [phase, setPhase] = useState<"typing" | "sent">("typing");
  const [time, setTime] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setTime(nowHHMM());
      setPhase("sent");
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col font-google">
      {/* En-tête */}
      <header className="shrink-0 bg-[#008069] text-white pt-[max(env(safe-area-inset-top),10px)]">
        <div className="flex items-center gap-2 px-2 pb-2.5">
          <BackIcon className="w-6 h-6 shrink-0" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#1565c0] grid place-items-center text-[13px] font-bold shrink-0">
            CE
          </div>
          <div className="flex-1 min-w-0 leading-tight pl-1">
            <div className="flex items-center gap-1 text-[17px] font-medium">
              <span className="truncate">{BUSINESS.name}</span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden>
                <path fill="#25d366" d="M12 1l2.6 2.2 3.4-.4.9 3.3 3 1.6-1.2 3.2 1.2 3.2-3 1.6-.9 3.3-3.4-.4L12 23l-2.6-2.2-3.4.4-.9-3.3-3-1.6 1.2-3.2-1.2-3.2 3-1.6.9-3.3 3.4.4z" />
                <path d="M7.5 12.3l3 3 6-6" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-[12.5px] text-white/80 truncate">
              {phase === "typing" ? "écrit…" : "Compte professionnel"}
            </div>
          </div>
          <svg viewBox="0 0 24 24" className="w-6 h-6 mx-2" fill="currentColor" aria-hidden>
            <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z" />
          </svg>
          <svg viewBox="0 0 24 24" className="w-5 h-5 mx-2" fill="currentColor" aria-hidden>
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" />
          </svg>
          <DotsIcon className="w-5 h-5" />
        </div>
      </header>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto wa-bg px-3 py-3 flex flex-col gap-2 no-scrollbar">
        <div className="self-center bg-white/90 text-[#54656f] text-[12px] px-3 py-1 rounded-lg shadow-sm">Aujourd&apos;hui</div>
        <div className="self-center max-w-[88%] bg-[#ffeecd] text-[#54656f] text-[11.5px] text-center px-3 py-1.5 rounded-lg shadow-sm leading-snug">
          🔒 Les messages et les appels sont chiffrés de bout en bout. Cette entreprise utilise un service sécurisé de Meta pour gérer cette discussion.
        </div>

        {phase === "typing" ? (
          <div className="self-start fade-up bg-white rounded-lg rounded-tl-none shadow-sm px-4 py-3 flex gap-1 mt-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="typing-dot w-2 h-2 rounded-full bg-[#8696a0]" style={{ animationDelay: `${i * 0.18}s` }} />
            ))}
          </div>
        ) : (
          <div className="self-start fade-up max-w-[85%] bg-white rounded-lg rounded-tl-none shadow-sm p-1 mt-1">
            {/* Aperçu du lien */}
            <button
              onClick={onOpenLink}
              className="w-full text-left rounded-md overflow-hidden bg-[#f5f6f6] active:opacity-80"
            >
              <div className="h-32 bg-gradient-to-br from-[#0b0b2e] via-[#3b2fa8] to-[#6a4cf0] grid place-items-center relative">
                <div className="absolute w-24 h-24 rounded-full bg-white/10" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9d8cff] to-[#3b5bdb] grid place-items-center shadow-lg">
                  <MicIcon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="px-2.5 py-2">
                <div className="text-[14px] font-medium text-[#111b21] leading-snug">
                  {BUSINESS.name} — Donnez votre avis en 30 secondes
                </div>
                <div className="text-[12.5px] text-[#667781] leading-snug mt-0.5">
                  Parlez, notre IA rédige votre avis pour vous.
                </div>
                <div className="text-[12px] text-[#8696a0] mt-1">feedzy-hub.com</div>
              </div>
            </button>

            <div className="px-1.5 pt-1.5 pb-0.5 text-[15px] text-[#111b21] leading-[1.35] whitespace-pre-line">
              {WHATSAPP_MESSAGE}{" "}
              <button onClick={onOpenLink} className="text-[#027eb5] underline underline-offset-2 break-all text-left">
                {REVIEW_LINK}
              </button>
            </div>
            <div className="text-right text-[11px] text-[#667781] px-1.5 -mt-0.5">{time}</div>
          </div>
        )}
      </div>

      {/* Barre de saisie */}
      <div className="shrink-0 wa-bg px-1.5 pt-1 pb-[max(env(safe-area-inset-bottom),8px)] flex items-end gap-1.5">
        <div className="flex-1 bg-white rounded-3xl flex items-center gap-3 px-3.5 py-2.5 shadow-sm text-[#8696a0]">
          <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0" strokeLinecap="round" />
            <circle cx="9" cy="10" r=".6" fill="currentColor" />
            <circle cx="15" cy="10" r=".6" fill="currentColor" />
          </svg>
          <span className="flex-1 text-[16px]">Message</span>
          <svg viewBox="0 0 24 24" className="w-6 h-6 -rotate-45 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
            <path d="M16 7l-7.5 7.5a2.1 2.1 0 0 0 3 3L19 10a4.2 4.2 0 0 0-6-6l-7.5 7.5a6.4 6.4 0 0 0 9 9L20 15" />
          </svg>
          <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
            <path d="M4 8h3l2-3h6l2 3h3v11H4z" strokeLinejoin="round" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#00a884] grid place-items-center text-white shadow-sm shrink-0">
          <MicIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
