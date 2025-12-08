import { Phone } from "lucide-react";

export const PhoneButton = () => {
  const handleCall = () => {
    window.location.href = "tel:+917203881108";
  };

  return (
    <button
      onClick={handleCall}
      className="fixed bottom-48 right-8 z-50 h-14 w-14 rounded-full bg-[#b8912e] hover:bg-[#a07d26] shadow-lg transition-all hover:scale-110 flex items-center justify-center group cursor-pointer"
      aria-label="Call us"
    >
      <Phone className="h-7 w-7 text-white" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Call us now
      </span>
    </button>
  );
};
