"use client";

import { useEffect, useState } from "react";
import { BUSINESS, CUSTOMER, GOOGLE_REVIEWS, type ExistingReview } from "@/lib/content";
import { BrowserBar } from "./BrowserBar";
import { AfterPublishBar } from "./AfterPublishBar";
import { CloseIcon, PencilIcon, Star, TrustpilotStar } from "./icons";

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

const BASE_COUNT = 128;
const BASE_DIST = [96, 22, 6, 2, 2]; // 5★ → 1★

export function GoogleScreen({ review, alreadyPublished, otherPublished, onPublished, onClose, onOther, onRestart }: Props) {
  const [phase, setPhase] = useState<Phase>(alreadyPublished ? "done" : "page");
  const [stars, setStars] = useState(0);
  const [pasted, setPasted] = useState(false);
  const [toast, setToast] = useState(false);

  // Ouverture automatique du formulaire, puis note et collage automatiques.
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
  const dist = done ? [BASE_DIST[0] + 1, ...BASE_DIST.slice(1)] : BASE_DIST;

  return (
    <div className="absolute inset-0 flex flex-col bg-white font-google screen-in">
      <BrowserBar title={`${BUSINESS.name} – Google Maps`} domain="google.com/maps" onClose={onClose} />

      <div className={`flex-1 overflow-y-auto no-scrollbar ${done ? "pb-28" : ""}`}>
        {/* Photos */}
        <div className="grid grid-cols-[2fr_1fr] gap-0.5 h-44">
          <div className="bg-gradient-to-br from-[#4fc3f7] via-[#29b6f6] to-[#0277bd] grid place-items-center text-6xl">🧽</div>
          <div className="grid grid-rows-2 gap-0.5">
            <div className="bg-gradient-to-br from-[#aed581] to-[#558b2f] grid place-items-center text-3xl">✨</div>
            <div className="bg-gradient-to-br from-[#ffcc80] to-[#ef6c00] grid place-items-center text-3xl">🏠</div>
          </div>
        </div>

        <div className="px-4 pt-3">
          <h1 className="text-[22px] text-[#1f1f1f] leading-tight">{BUSINESS.name}</h1>
          <div className="flex items-center gap-1.5 mt-1 text-[14px] text-[#474747]">
            <span>{done ? "4,8" : "4,7"}</span>
            <Stars value={5} />
            <span>({count})</span>
          </div>
          <div className="text-[14px] text-[#474747] mt-0.5">
            {BUSINESS.category} · {BUSINESS.address}
          </div>
          <div className="text-[14px] mt-0.5">
            <span className="text-[#188038] font-medium">Ouvert</span>
            <span className="text-[#474747]"> · Ferme à 19:00</span>
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar -mx-4 px-4">
            {["Itinéraire", "Appeler", "Enregistrer", "Partager"].map((label, i) => (
              <span
                key={label}
                className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-medium ${
                  i === 0 ? "bg-[#0b57d0] text-white" : "border border-[#c4c7c5] text-[#0b57d0]"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex mt-3 border-b border-[#e3e3e3] text-[14px] font-medium">
          {["Présentation", "Avis", "À propos"].map((tab) => (
            <div
              key={tab}
              className={`flex-1 text-center py-3 ${tab === "Avis" ? "text-[#0b57d0] border-b-[3px] border-[#0b57d0]" : "text-[#474747]"}`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Résumé des notes */}
        <div className="px-4 py-4 flex gap-5 items-center">
          <div className="flex-1 space-y-1">
            {dist.map((n, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-[#474747]">
                <span className="w-2">{5 - i}</span>
                <div className="flex-1 h-2.5 rounded-full bg-[#e8eaed] overflow-hidden">
                  <div className="h-full bg-[#fbbc04] rounded-full transition-all duration-700" style={{ width: `${(n / count) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-[44px] leading-none text-[#1f1f1f]">{done ? "4,8" : "4,7"}</div>
            <Stars value={5} className="mt-1" />
            <div className="text-[12px] text-[#474747] mt-1">{count} avis</div>
          </div>
        </div>

        {!done && (
          <div className="px-4">
            <button
              onClick={() => setPhase("form")}
              className="w-full flex items-center justify-center gap-2 rounded-full border border-[#c4c7c5] py-2.5 text-[14px] font-medium text-[#0b57d0]"
            >
              <PencilIcon className="w-4 h-4" /> Rédiger un avis
            </button>
          </div>
        )}

        <div className="mt-2">
          {done && (
            <ReviewItem
              highlight
              r={{ name: CUSTOMER.fullName, initials: CUSTOMER.initials[0], color: "#1a73e8", rating: 5, when: "À l'instant", text: review }}
            />
          )}
          {GOOGLE_REVIEWS.map((r) => (
            <ReviewItem key={r.name} r={r} />
          ))}
        </div>
      </div>

      {/* Formulaire d'avis */}
      {(phase === "form" || phase === "posting") && (
        <div className="absolute inset-0 z-30 bg-black/40 flex flex-col justify-end">
          <div className="sheet-up bg-white rounded-t-3xl max-h-[92%] flex flex-col">
            <div className="flex items-center gap-3 px-4 pt-4 pb-2">
              <button onClick={() => setPhase("page")} className="p-1 -ml-1" aria-label="Fermer">
                <CloseIcon className="w-6 h-6 text-[#474747]" />
              </button>
              <div className="flex-1 text-[18px] text-[#1f1f1f]">{BUSINESS.name}</div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4">
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white grid place-items-center text-[16px] font-medium">
                  {CUSTOMER.initials[0]}
                </div>
                <div className="leading-tight">
                  <div className="text-[15px] text-[#1f1f1f] font-medium">{CUSTOMER.fullName}</div>
                  <div className="text-[12.5px] text-[#474747]">Publication publique sur Google ⓘ</div>
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    filled={i <= stars}
                    className={`w-10 h-10 transition-all duration-200 ${i <= stars ? "text-[#fbbc04] scale-110" : "text-[#747775]"}`}
                  />
                ))}
              </div>

              <div className={`mt-6 rounded-xl border-2 ${pasted ? "border-[#0b57d0] paste-flash" : "border-[#c4c7c5]"} p-3 min-h-40`}>
                {pasted ? (
                  <div className="text-[15px] leading-relaxed text-[#1f1f1f] whitespace-pre-line">{review}</div>
                ) : (
                  <div className="text-[15px] text-[#747775]">Partagez des détails sur votre expérience dans cet établissement</div>
                )}
              </div>
              {pasted && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#e8f0fe] text-[#0b57d0] text-[12.5px] font-medium px-3 py-1 fade-up">
                  📋 Collé automatiquement par Feedzy
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 rounded-full border border-[#c4c7c5] w-fit px-4 py-2 text-[14px] text-[#0b57d0] font-medium">
                📷 Ajouter des photos
              </div>
            </div>

            <div className="px-5 pt-2 pb-[max(env(safe-area-inset-bottom),16px)] border-t border-[#e3e3e3]">
              <button
                disabled={!pasted || phase === "posting"}
                onClick={submit}
                className="w-full rounded-full bg-[#0b57d0] disabled:bg-[#e3e3e3] disabled:text-[#9aa0a6] text-white text-[15px] font-medium py-3 flex items-center justify-center gap-2 transition-colors"
              >
                {phase === "posting" ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white spin" /> Publication…
                  </>
                ) : (
                  "Publier"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast absolute left-1/2 bottom-28 z-30 bg-[#303030] text-white text-[14px] rounded-lg px-4 py-3 shadow-lg whitespace-nowrap">
          Merci ! Votre avis a été publié.
        </div>
      )}

      {done && (
        <AfterPublishBar
          otherLabel="Publier sur Trustpilot"
          otherIcon={<TrustpilotStar className="w-4 h-4" />}
          otherPublished={otherPublished}
          onOther={onOther}
          onRestart={onRestart}
        />
      )}
    </div>
  );
}

function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex text-[#fbbc04] ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled className={`w-3.5 h-3.5 ${i <= value ? "" : "text-[#dadce0]"}`} />
      ))}
    </span>
  );
}

function ReviewItem({ r, highlight = false }: { r: ExistingReview; highlight?: boolean }) {
  return (
    <div className={`px-4 py-4 border-b border-[#eeeeee] ${highlight ? "highlight fade-up" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full grid place-items-center text-white text-[15px]" style={{ background: r.color }}>
          {r.initials}
        </div>
        <div className="flex-1 leading-tight">
          <div className="text-[14px] text-[#1f1f1f] font-medium">{r.name}</div>
          <div className="text-[12px] text-[#474747]">{highlight ? "1 avis" : "Local Guide · 24 avis"}</div>
        </div>
        {highlight && <span className="text-[11px] font-medium text-[#188038] bg-[#e6f4ea] rounded-full px-2 py-0.5">Nouveau</span>}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Stars value={r.rating} />
        <span className="text-[12px] text-[#474747]">{r.when}</span>
      </div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-[#1f1f1f] whitespace-pre-line">{r.text}</p>
    </div>
  );
}
