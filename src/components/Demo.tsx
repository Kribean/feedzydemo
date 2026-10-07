"use client";

import { useState } from "react";
import { GENERATED_REVIEW } from "@/lib/content";
import { WhatsAppScreen } from "./WhatsAppScreen";
import { FeedzyScreen } from "./FeedzyScreen";
import { GoogleScreen } from "./GoogleScreen";
import { TrustpilotScreen } from "./TrustpilotScreen";

export type Platform = "google" | "trustpilot";
type Step = "whatsapp" | "feedzy" | Platform;

export function Demo() {
  const [step, setStep] = useState<Step>("whatsapp");
  const [review, setReview] = useState(GENERATED_REVIEW);
  const [published, setPublished] = useState<Platform[]>([]);
  // Incrémenté à chaque redémarrage pour remettre tous les écrans à zéro.
  const [run, setRun] = useState(0);

  const restart = () => {
    setReview(GENERATED_REVIEW);
    setPublished([]);
    setRun((r) => r + 1);
    setStep("whatsapp");
  };

  const markPublished = (p: Platform) => setPublished((list) => (list.includes(p) ? list : [...list, p]));

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#0b0b2e]">
      <div className="relative h-full w-full max-w-[480px] mx-auto overflow-hidden bg-white">
        {step === "whatsapp" && <WhatsAppScreen key={`wa-${run}`} onOpenLink={() => setStep("feedzy")} />}

        {/* L'app Feedzy reste montée pour conserver son état quand on revient de Google / Trustpilot. */}
        {step !== "whatsapp" && (
          <div className={step === "feedzy" ? "contents" : "hidden"}>
            <FeedzyScreen
              key={`fz-${run}`}
              review={review}
              onReviewChange={setReview}
              published={published}
              onClose={() => setStep("whatsapp")}
              onPublish={(p) => setStep(p)}
              onRestart={restart}
            />
          </div>
        )}

        {step === "google" && (
          <GoogleScreen
            review={review}
            alreadyPublished={published.includes("google")}
            otherPublished={published.includes("trustpilot")}
            onPublished={() => markPublished("google")}
            onClose={() => setStep("feedzy")}
            onOther={() => setStep("trustpilot")}
            onRestart={restart}
          />
        )}

        {step === "trustpilot" && (
          <TrustpilotScreen
            review={review}
            alreadyPublished={published.includes("trustpilot")}
            otherPublished={published.includes("google")}
            onPublished={() => markPublished("trustpilot")}
            onClose={() => setStep("feedzy")}
            onOther={() => setStep("google")}
            onRestart={restart}
          />
      )}
      </div>
    </main>
  );
}
