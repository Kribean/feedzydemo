import { RestartIcon } from "./icons";

type Props = {
  otherLabel: string;
  otherIcon: React.ReactNode;
  otherPublished: boolean;
  onOther: () => void;
  onRestart: () => void;
};

// Barre affichée après publication : enchaîner sur l'autre plateforme ou relancer la démo.
export function AfterPublishBar({ otherLabel, otherIcon, otherPublished, onOther, onRestart }: Props) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 px-3 pt-3 pb-[max(env(safe-area-inset-bottom),12px)] bg-gradient-to-t from-white via-white to-white/0 sheet-up font-sans">
      <div className="flex gap-2">
        {!otherPublished && (
          <button
            onClick={onOther}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#14142b] text-white text-[14px] font-semibold py-3.5 shadow-lg active:scale-[0.98] transition-transform"
          >
            <span className="w-6 h-6 rounded-full bg-white grid place-items-center">{otherIcon}</span>
            {otherLabel}
          </button>
        )}
        <button
          onClick={onRestart}
          className={`${otherPublished ? "flex-1" : ""} flex items-center justify-center gap-2 rounded-2xl bg-[#eef0f6] text-[#14142b] text-[14px] font-semibold px-4 py-3.5 active:scale-[0.98] transition-transform`}
        >
          <RestartIcon className="w-4 h-4" />
          {otherPublished ? "Recommencer la démo" : "Rejouer"}
        </button>
      </div>
    </div>
  );
}
