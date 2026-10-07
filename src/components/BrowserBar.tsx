import { CloseIcon, DotsIcon, LockIcon } from "./icons";

type Props = {
  title: string;
  domain: string;
  onClose: () => void;
  dark?: boolean;
};

// Imite le navigateur intégré qui s'ouvre quand on clique sur un lien dans WhatsApp.
export function BrowserBar({ title, domain, onClose, dark = false }: Props) {
  return (
    <div
      className={`relative shrink-0 flex items-center gap-3 px-3 pb-2 pt-[max(env(safe-area-inset-top),8px)] ${
        dark ? "bg-[#0b0b2e] text-white" : "bg-white text-neutral-900 border-b border-neutral-200"
      }`}
    >
      <button onClick={onClose} className="p-1.5 -ml-1 rounded-full active:bg-black/10" aria-label="Fermer">
        <CloseIcon className="w-5 h-5" />
      </button>
      <div className="flex-1 min-w-0 leading-tight">
        <div className="text-[13px] font-semibold truncate">{title}</div>
        <div className={`flex items-center gap-1 text-[11px] ${dark ? "text-white/60" : "text-neutral-500"}`}>
          <LockIcon className="w-2.5 h-2.5" />
          <span className="truncate">{domain}</span>
        </div>
      </div>
      <DotsIcon className={`w-5 h-5 ${dark ? "text-white/70" : "text-neutral-500"}`} />
      <div key={domain} className={`load-bar absolute left-0 bottom-0 h-[2px] ${dark ? "bg-[#7c8cff]" : "bg-[#1a73e8]"}`} />
    </div>
  );
}
