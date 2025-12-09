import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const phoneNumber = "919876543210";
  const message = "Hello! I would like to inquire about your legal services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="
    fixed z-50
    h-12 w-12 rounded-full bg-[#25D366] hover:bg-[#20BA5A]
    shadow-lg transition-all hover:scale-110 flex items-center justify-center group

    bottom-26 right-4     /* middle button position */
    sm:bottom-28 sm:right-6  /* small screens */
    md:bottom-32 md:right-8  /* tablets & desktops */
  "
  aria-label="Contact us on WhatsApp"
>
  <MessageCircle className="h-7 w-7 text-white" />

  <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
    Chat with us
  </span>
</a>

  );
};
