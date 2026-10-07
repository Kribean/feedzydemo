"use client";

import { useEffect, useState } from "react";
import { BUSINESS, CUSTOMER, TRUSTPILOT_REVIEWS, TRUSTPILOT_TITLE, type ExistingReview } from "@/lib/content";
import { BrowserBar } from "./BrowserBar";
import { AfterPublishBar } from "./AfterPublishBar";
import { CloseIcon, GoogleG, TrustpilotStar } from "./icons";

type Props = {
  review: string;
  alreadyPublished: boolean;
  otherPublished: boolean;
  onPublished: () => void;
  onClose: () => void;
  onOther: () => void;
  onRestart: () => void;
};

type Phase = "page" | "form" | "posting" | "done";

const BASE_COUNT = 87;
const TP_GREEN = "#00b67a";
const TP_EMPTY = "#dcdce6";

function todayFr() {
  return new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function TrustpilotScreen({ review, alreadyPublished, otherPublished, onPublished, onClose, onOther, onRestart }: Props) {
  const [phase, setPhase] = useState<Phase>(alreadyPublished ? "done" : "page");
  const [stars, setStars] = useState(0);
  const [pasted, setPasted] = useState(false);
  const [toast, setToast] = useState(false);
  const [today] = useState(todayFr);

  useEffect(() => {
    if (phase !== "page") return;
    const t = setTimeout(() => setPhase("form"), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "form") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= 5; i++) timers.push(setTimeout(() => setStars(i), 450 + i * 140));
    timers.push(setTimeout(() => setPasted(true), 1500));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const submit = () => {
    setPhase("posting");
    setTimeout(() => {
      setPhase("done");
      setToast(true);
      onPublished();
    }, 1000);
  };

  const done = phase === "done";
  const count = BASE_COUNT + (done ? 1 : 0);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#fcfbf3] font-tp screen-in">
      <BrowserBar title={`Avis sur ${BUSINESS.name} | Trustpilot`} domain="fr.trustpilot.com" onClose={onClose} />

      <div className={`flex-1 overflow-y-auto no-scrollbar ${done ? "pb-28" : ""}`}>
        {/* Bandeau Trustpilot */}
        <div className="bg-[#191919] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white text-[20px] font-bold tracking-tight">
            <TrustpilotStar className="w-6 h-6" /> Trustpilot
          </div>
          <div className="text-white/80 text-[13px]">Pour les entreprises</div>
        </div>

        {/* Fiche entreprise */}
        <div className="bg-white px-4 pt-5 pb-5 border-b border-[#e5e5dd]">
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-lg border border-[#e5e5dd] bg-gradient-to-br from-[#4fc3f7] to-[#1565c0] grid place-items-center text-white text-[22px] font-bold shrink-0">
              CE
            </div>
            <div className="min-w-0">
              <h1 className="text-[22px] font-bold text-[#191919] leading-tight">{BUSINESS.name}</h1>
              <div className="text-[14px] text-[#191919] mt-0.5">
                Avis {count} <span className="text-[#6f6f6f]">•</span> <b>Excellent</b>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <TpStars value={5} size="w-5 h-5" />
                <span className="text-[14px] text-[#191919]">{done ? "4,7" : "4,6"}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-[#e5e5dd] px-3 py-2.5 text-[14px]">
            <span className="text-[#1c58e5] font-medium">{BUSINESS.website}</span>
            <span className="text-[#6f6f6f]">Visiter le site ↗</span>
          </div>
          {!done && (
            <button
              onClick={() => setPhase("form")}
              className="mt-3 w-full rounded-full bg-[#1c58e5] text-white text-[15px] font-semibold py-3"
            >
              Écrire un avis
            </button>
          )}
        </div>

        <div className="px-4 pt-5 pb-2 text-[18px] font-bold text-[#191919]">Avis</div>
        <div className="px-3 space-y-3 pb-4">
          {done && (
            <ReviewCard
              highlight
              title={TRUSTPILOT_TITLE}
              date={today}
              r={{ name: CUSTOMER.fullName, initials: CUSTOMER.initials, color: "#c5e8d8", rating: 5, when: "À l'instant", text: review }}
            />
          )}
          {TRUSTPILOT_REVIEWS.map((r) => (
            <ReviewCard key={r.name} r={r} />
          ))}
        </div>
      </div>

      {/* Formulaire */}
      {(phase === "form" || phase === "posting") && (
        <div className="absolute inset-0 z-30 bg-black/40 flex flex-col justify-end">
          <div className="sheet-up bg-white rounded-t-2xl max-h-[92%] flex flex-col">
            <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-[#e5e5dd]">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#4fc3f7] to-[#1565c0] grid place-items-center text-white text-[12px] font-bold">
                CE
              </div>
              <div className="flex-1 leading-tight">
                <div className="text-[15px] font-bold text-[#191919]">{BUSINESS.name}</div>
                <div className="text-[12px] text-[#6f6f6f]">{BUSINESS.website}</div>
              </div>
              <button onClick={() => setPhase("page")} className="p-1" aria-label="Fermer">
                <CloseIcon className="w-6 h-6 text-[#6f6f6f]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4">
              <div className="text-[16px] font-bold text-[#191919]">Notez votre expérience récente</div>
              <div className="mt-3">
                <TpStars value={stars} size="w-11 h-11" animated />
              </div>

              <div className="mt-6 text-[16px] font-bold text-[#191919]">Racontez-nous votre expérience</div>
              <div className={`mt-2 rounded-lg border ${pasted ? "border-[#1c58e5] paste-flash" : "border-[#c8c8c0]"} p-3 min-h-36`}>
                {pasted ? (
                  <div className="text-[15px] leading-relaxed text-[#191919] whitespace-pre-line">{review}</div>
                ) : (
                  <div className="text-[15px] text-[#8c8c8c]">Que s&apos;est-il passé ? Qu&apos;avez-vous apprécié ?</div>
                )}
              </div>
              {pasted && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#e7f7ef] text-[#04784f] text-[12.5px] font-semibold px-3 py-1 fade-up">
                  📋 Collé automatiquement par Feedzy
                </div>
              )}

              <div className="mt-5 text-[16px] font-bold text-[#191919]">Donnez un titre à votre avis</div>
              <div className={`mt-2 rounded-lg border ${pasted ? "border-[#1c58e5] paste-flash" : "border-[#c8c8c0]"} px-3 py-2.5 text-[15px]`}>
                {pasted ? <span className="text-[#191919]">{TRUSTPILOT_TITLE}</span> : <span className="text-[#8c8c8c]">Résumez votre expérience</span>}
              </div>

              <div className="mt-5 text-[16px] font-bold text-[#191919]">Date de l&apos;expérience</div>
              <div className="mt-2 rounded-lg border border-[#c8c8c0] px-3 py-2.5 text-[15px] text-[#191919]">{today}</div>
            </div>

            <div className="px-4 pt-2 pb-[max(env(safe-area-inset-bottom),16px)] border-t border-[#e5e5dd]">
              <button
                disabled={!pasted || phase === "posting"}
                onClick={submit}
                className="w-full rounded-full bg-[#1c58e5] disabled:bg-[#e5e5dd] disabled:text-[#9a9a9a] text-white text-[15px] font-semibold py-3 flex items-center justify-center gap-2 transition-colors"
              >
                {phase === "posting" ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white spin" /> Publication…
                  </>
                ) : (
                  "Publier l'avis"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast absolute left-1/2 bottom-28 z-30 bg-[#191919] text-white text-[14px] rounded-lg px-4 py-3 shadow-lg whitespace-nowrap">
          ✓ Merci ! Votre avis est en ligne.
        </div>
      )}

      {done && (
        <AfterPublishBar
          otherLabel="Publier sur Google"
          otherIcon={<GoogleG className="w-4 h-4" />}
          otherPublished={otherPublished}
          onOther={onOther}
          onRestart={onRestart}
        />
      )}
    </div>
  );
}

function TpStars({ value, size, animated = false }: { value: number; size: string; animated?: boolean }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`${size} grid place-items-center rounded-[3px] ${animated ? "transition-colors duration-200" : ""}`}
          style={{ background: i <= value ? TP_GREEN : TP_EMPTY }}
        >
          <svg viewBox="0 0 24 24" className="w-[70%] h-[70%]" aria-hidden>
            <path fill="#fff" d="M12 2.5l2.6 7.2H22l-6 4.4 2.3 7.3L12 16.9l-6.3 4.5L8 14.1 2 9.7h7.4z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ r, title, date, highlight = false }: { r: ExistingReview; title?: string; date?: string; highlight?: boolean }) {
  return (
    <div className={`bg-white rounded-xl border border-[#e5e5dd] p-4 ${highlight ? "highlight fade-up border-[#00b67a]" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full grid place-items-center text-[#191919] text-[13px] font-bold" style={{ background: r.color }}>
          {r.initials}
        </div>
        <div className="flex-1 leading-tight">
          <div className="text-[14px] font-bold text-[#191919]">{r.name}</div>
          <div className="text-[12px] text-[#6f6f6f]">FR · {highlight ? "1 avis" : "3 avis"}</div>
        </div>
        {highlight && <span className="text-[11px] font-semibold text-[#04784f] bg-[#e7f7ef] rounded-full px-2 py-0.5">Nouveau</span>}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <TpStars value={r.rating} size="w-[18px] h-[18px]" />
        <span className="text-[12px] text-[#6f6f6f]">{r.when}</span>
      </div>
      {title && <div className="mt-2 text-[15px] font-bold text-[#191919]">{title}</div>}
      <p className="mt-1.5 text-[14px] leading-relaxed text-[#191919] whitespace-pre-line">{r.text}</p>
      {date && (
        <div className="mt-2 text-[12px] text-[#6f6f6f]">
          <b className="text-[#191919]">Date de l&apos;expérience :</b> {date}
        </div>
      )}
    </div>
  );
}
