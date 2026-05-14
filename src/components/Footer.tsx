import { Phone, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="relative bg-maroon text-cream pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.6_0.22_38/0.3),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid md:grid-cols-4 gap-12 pb-14 border-b border-cream/15">
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" loading="lazy" width={48} height={48} className="w-12 h-12 object-contain" />
              <div>
                <div className="font-display text-2xl text-cream">गाथालिखाण</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Sacred Seva Movement</div>
              </div>
            </div>
            <p className="font-serif-dev text-cream/75 max-w-md leading-relaxed">
              संत तुकाराम महाराजांच्या गाथेच्या हस्तलिखाणाद्वारे भक्ती, सेवा व
              संस्कृतीच्या संवर्धनासाठी सुरू झालेला सामूहिक आध्यात्मिक उपक्रम.
            </p>
            <a href="tel:+919999999999" className="inline-flex items-center gap-2 text-gold hover:text-cream transition">
              <Phone className="w-4 h-4" /> +91 99999 99999
            </a>
            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Youtube].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-saffron-deep hover:border-saffron-deep transition"
                >
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg text-gold mb-4">मार्गदर्शन</h4>
            <ul className="space-y-2.5 font-serif-dev text-cream/75 text-sm">
              {["उपक्रम", "सहभाग", "स्वयंसेवा", "संपर्क"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-gold transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg text-gold mb-4">अभियान</h4>
            <ul className="space-y-2.5 font-serif-dev text-cream/75 text-sm">
              {["गाथा वही", "नोंदणी", "स्वयंसेवक नोंदणी", "गोपनीयता"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-gold transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center pt-10">
          <p className="font-display text-xl lg:text-2xl text-shimmer">
            ॥ राम कृष्ण हरी ॥ श्री तुकोबाराय ॥
          </p>
          <p className="text-xs text-cream/50 mt-6 tracking-wider">
            © {new Date().getFullYear()} गाथालिखाण अभियान — सर्व हक्क राखीव.
          </p>
        </div>
      </div>
    </footer>
  );
};
