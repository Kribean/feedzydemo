"use client";

import { useState } from "react";
import { GENERATED_REVIEW } from "@/lib/content";
import { useDragScroll } from "@/lib/useDragScroll";
import { WhatsAppScreen } from "./WhatsAppScreen";
import { FeedzyScreen } from "./FeedzyScreen";

type Step = "whatsapp" | "feedzy";

export function Demo() {
  const [step, setStep] = useState<Step>("whatsapp");
  const [review, setReview] = useState(GENERATED_REVIEW);
  // Incrémenté à chaque redémarrage pour remettre tous les écrans à zéro.
  const [run, setRun] = useState(0);
  useDragScroll();

  const restart = () => {
    setReview(GENERATED_REVIEW);
    setRun((r) => r + 1);
    setStep("whatsapp");
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#0b0b2e]">
      <div className="relative h-full w-full max-w-[480px] mx-auto overflow-hidden bg-white">
        {step === "whatsapp" && <WhatsAppScreen key={`wa-${run}`} onOpenLink={() => setStep("feedzy")} />}

        {step === "feedzy" && (
          <FeedzyScreen
            key={`fz-${run}`}
            review={review}
            onReviewChange={setReview}
            onClose={() => setStep("whatsapp")}
            onRestart={restart}
          />
        )}
      </div>
    </main>
  );
}
