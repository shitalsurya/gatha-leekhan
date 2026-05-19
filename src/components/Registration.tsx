import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { FloatingParticles } from "@/components/FloatingParticles";

type FormData = {
  fullName: string;
  age: string;
  gender: string;
  whatsapp: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
};

const steps = [
  { id: 1, label: "मूलभूत माहिती" },
  { id: 2, label: "संपर्क माहिती" },
  { id: 3, label: "स्थान माहिती" },
  { id: 4, label: "पडताळणी" },
];

const initial: FormData = {
  fullName: "",
  age: "",
  gender: "",
  whatsapp: "",
  address: "",
  district: "",
  state: "महाराष्ट्र",
  pincode: "",
};

export const Registration = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof FormData, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (s: number) => {
    const err: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!data.fullName.trim()) err.fullName = "कृपया आपले नाव लिहा";
      if (!data.age.trim() || Number(data.age) < 5 || Number(data.age) > 110)
        err.age = "कृपया वैध वय लिहा";
      if (!data.gender) err.gender = "कृपया लिंग निवडा";
    }
    if (s === 2) {
      if (!/^[0-9]{10}$/.test(data.whatsapp.trim()))
        err.whatsapp = "१० अंकी WhatsApp नंबर लिहा";
    }
    if (s === 3) {
      if (!data.address.trim()) err.address = "कृपया पत्ता लिहा";
      if (!data.district.trim()) err.district = "कृपया जिल्हा लिहा";
      if (!data.state.trim()) err.state = "कृपया राज्य निवडा";
      if (!/^[0-9]{6}$/.test(data.pincode.trim()))
        err.pincode = "६ अंकी पिनकोड लिहा";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(4, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    if (validate(3)) {
      setSubmitted(true);
    }
  };

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <section
      id="register"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Seamless saffron transition from hero */}
      <div className="absolute inset-x-0 -top-px h-40 bg-gradient-to-b from-cream via-saffron/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-deep/40 to-cream pointer-events-none" />

      {/* Manuscript divider */}
      <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none">
        <div className="h-px w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-saffron-deep/40 to-transparent" />
      </div>

      <FloatingParticles />

      <div className="relative max-w-4xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/30 text-saffron-deep text-xs tracking-[0.3em] uppercase mb-5">
            <Sparkles className="w-3 h-3" /> सेवा नोंदणी
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-maroon leading-tight">
            ✽ गाथा लिखाण नोंदणी अर्ज ✽
          </h2>
          <p className="font-serif-dev text-lg md:text-xl text-foreground/70 mt-5 max-w-2xl mx-auto">
            गाथालिखाण सेवेत सहभागी होण्यासाठी आपली माहिती भरा
          </p>
        </motion.div>

        {/* Glass form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-saffron rounded-3xl blur-2xl opacity-20" />
          <div className="relative rounded-3xl border border-saffron/30 bg-cream/70 backdrop-blur-xl shadow-sacred p-7 md:p-12">
            {/* Progress */}
            {!submitted && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  {steps.map((s, i) => {
                    const active = step === s.id;
                    const done = step > s.id;
                    return (
                      <div key={s.id} className="flex-1 flex flex-col items-center relative">
                        <motion.div
                          animate={{ scale: active ? 1.1 : 1 }}
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-display text-sm border-2 transition-colors ${
                            done
                              ? "bg-gradient-saffron text-primary-foreground border-saffron-deep"
                              : active
                              ? "bg-cream border-saffron-deep text-saffron-deep shadow-sacred"
                              : "bg-cream border-border text-muted-foreground"
                          }`}
                        >
                          {done ? <Check className="w-4 h-4" /> : s.id}
                        </motion.div>
                        <div
                          className={`mt-2 text-[11px] md:text-xs font-serif-dev text-center hidden sm:block ${
                            active ? "text-maroon" : "text-muted-foreground"
                          }`}
                        >
                          {s.label}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="absolute top-5 left-1/2 w-full h-0.5 bg-border -z-0">
                            <motion.div
                              initial={false}
                              animate={{ width: step > s.id ? "100%" : "0%" }}
                              transition={{ duration: 0.5 }}
                              className="h-full bg-gradient-saffron"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="h-1 w-full rounded-full bg-border/60 overflow-hidden mt-2">
                  <motion.div
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-saffron"
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 14 }}
                    className="relative inline-flex w-24 h-24 items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-gradient-saffron rounded-full blur-2xl opacity-60 animate-pulse" />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-saffron flex items-center justify-center shadow-sacred">
                      <Check className="w-12 h-12 text-primary-foreground" strokeWidth={3} />
                    </div>
                  </motion.div>
                  <h3 className="font-display text-3xl md:text-4xl text-maroon mt-8">
                    आपली नोंदणी यशस्वीरित्या पूर्ण झाली 🙏
                  </h3>
                  <p className="font-serif-dev text-lg text-foreground/70 mt-4 max-w-lg mx-auto">
                    लवकरच पुढील माहिती WhatsApp द्वारे मिळेल.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                      setData(initial);
                    }}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-saffron/40 text-saffron-deep font-serif-dev hover:bg-saffron/10 transition"
                  >
                    नवीन नोंदणी
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  {step === 1 && (
                    <>
                      <Field
                        label="संपूर्ण नाव"
                        value={data.fullName}
                        onChange={(v) => update("fullName", v)}
                        error={errors.fullName}
                        required
                      />
                      <Field
                        label="वय"
                        type="number"
                        value={data.age}
                        onChange={(v) => update("age", v)}
                        error={errors.age}
                        required
                      />
                      <div>
                        <label className="block font-serif-dev text-sm text-maroon mb-3">
                          लिंग <span className="text-saffron-deep">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {["पुरुष", "स्त्री", "इतर"].map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => update("gender", g)}
                              className={`py-3 rounded-xl border-2 font-serif-dev transition-all ${
                                data.gender === g
                                  ? "border-saffron-deep bg-saffron/15 text-maroon shadow-sacred"
                                  : "border-border bg-cream/50 text-foreground/70 hover:border-saffron/40"
                              }`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                        {errors.gender && (
                          <p className="text-destructive text-xs mt-2 font-serif-dev">{errors.gender}</p>
                        )}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <Field
                      label="WhatsApp नंबर"
                      type="tel"
                      value={data.whatsapp}
                      onChange={(v) => update("whatsapp", v.replace(/\D/g, "").slice(0, 10))}
                      error={errors.whatsapp}
                      required
                    />
                  )}

                  {step === 3 && (
                    <>
                      <Field
                        label="संपूर्ण पत्ता (गाव, तालुका)"
                        value={data.address}
                        onChange={(v) => update("address", v)}
                        error={errors.address}
                        required
                        textarea
                      />
                      <div className="grid md:grid-cols-2 gap-5">
                        <Field
                          label="जिल्हा"
                          value={data.district}
                          onChange={(v) => update("district", v)}
                          error={errors.district}
                          required
                        />
                        <div>
                          <label className="block font-serif-dev text-sm text-maroon mb-2">
                            राज्य <span className="text-saffron-deep">*</span>
                          </label>
                          <select
                            value={data.state}
                            onChange={(e) => update("state", e.target.value)}
                            className="w-full h-12 px-4 rounded-xl border-2 border-border bg-cream/60 backdrop-blur font-serif-dev text-foreground focus:border-saffron-deep focus:outline-none transition"
                          >
                            <option>महाराष्ट्र</option>
                            <option>इतर</option>
                          </select>
                        </div>
                      </div>
                      <Field
                        label="पिनकोड"
                        type="tel"
                        value={data.pincode}
                        onChange={(v) => update("pincode", v.replace(/\D/g, "").slice(0, 6))}
                        error={errors.pincode}
                        required
                      />
                    </>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl text-maroon text-center mb-2">
                        आपली माहिती तपासा
                      </h3>
                      <div className="rounded-2xl border border-saffron/30 bg-cream/60 p-6 space-y-3 font-serif-dev">
                        <Row label="नाव" value={data.fullName} />
                        <Row label="वय" value={data.age} />
                        <Row label="लिंग" value={data.gender} />
                        <Row label="WhatsApp" value={data.whatsapp} />
                        <Row label="पत्ता" value={data.address} />
                        <Row label="जिल्हा" value={data.district} />
                        <Row label="राज्य" value={data.state} />
                        <Row label="पिनकोड" value={data.pincode} />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!submitted && (
              <div className="flex items-center justify-between mt-10 gap-4">
                <button
                  onClick={prev}
                  disabled={step === 1}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground/70 font-serif-dev disabled:opacity-40 hover:bg-cream-deep transition"
                >
                  <ChevronLeft className="w-4 h-4" /> मागे
                </button>
                {step < 4 ? (
                  <button
                    onClick={next}
                    className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-saffron text-primary-foreground font-serif-dev shadow-sacred hover:scale-105 transition-transform"
                  >
                    पुढे <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    className="relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-saffron text-primary-foreground font-serif-dev shadow-sacred hover:scale-105 transition-transform"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-saffron blur-lg opacity-50 -z-10 animate-pulse" />
                    फॉर्म सबमिट करा 🙏
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
};

const Field = ({ label, value, onChange, error, required, type = "text", textarea }: FieldProps) => {
  const Comp: any = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <label className="block font-serif-dev text-sm text-maroon mb-2">
        {label} {required && <span className="text-saffron-deep">*</span>}
      </label>
      <Comp
        type={type}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        rows={textarea ? 3 : undefined}
        className={`w-full ${textarea ? "py-3 min-h-[96px]" : "h-12"} px-4 rounded-xl border-2 bg-cream/60 backdrop-blur font-serif-dev text-foreground placeholder:text-muted-foreground focus:outline-none transition ${
          error ? "border-destructive" : "border-border focus:border-saffron-deep"
        }`}
      />
      {error && <p className="text-destructive text-xs mt-1.5 font-serif-dev">{error}</p>}
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4 border-b border-saffron/15 pb-2 last:border-0">
    <span className="text-foreground/60">{label}</span>
    <span className="text-maroon font-medium text-right">{value || "—"}</span>
  </div>
);
