import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, X, Phone, MapPin, Calendar, User, BookOpen,
  CheckCircle2, Clock, Edit3, MessageSquare, Printer, Download,
  ArrowUpDown, Users, Sparkles, History,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingParticles } from "@/components/FloatingParticles";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "सदस्य व्यवस्थापन — गाथालिखाण" },
      { name: "description", content: "गाथालिखाण अभियान सदस्य शोध आणि व्यवस्थापन डॅशबोर्ड" },
    ],
  }),
});

type Status = "registered" | "book_sent" | "completed" | "pending" | "verified";
type Member = {
  id: string;
  name: string;
  whatsapp: string;
  gender: "पुरुष" | "स्त्री" | "इतर";
  age: number;
  district: string;
  taluka: string;
  state: string;
  pincode: string;
  registeredAt: string;
  bookSentAt?: string;
  submittedAt?: string;
  status: Status;
  remarks?: string;
};

const SEED: Member[] = [
  { id: "GL001", name: "रामकृष्ण देशमुख", whatsapp: "9822012345", gender: "पुरुष", age: 54, district: "पुणे", taluka: "हवेली", state: "महाराष्ट्र", pincode: "411001", registeredAt: "2026-04-12", bookSentAt: "2026-04-18", submittedAt: "2026-05-10", status: "completed", remarks: "अत्यंत सुंदर हस्ताक्षर. गाथा पूर्ण." },
  { id: "GL002", name: "सुनिता पाटील", whatsapp: "9923456710", gender: "स्त्री", age: 42, district: "नाशिक", taluka: "निफाड", state: "महाराष्ट्र", pincode: "422303", registeredAt: "2026-04-20", bookSentAt: "2026-04-25", status: "book_sent", remarks: "वही प्राप्त झाली, लिखाण सुरू." },
  { id: "GL003", name: "विठ्ठल जाधव", whatsapp: "9011223344", gender: "पुरुष", age: 67, district: "सोलापूर", taluka: "पंढरपूर", state: "महाराष्ट्र", pincode: "413304", registeredAt: "2026-05-01", status: "registered", remarks: "नवीन नोंदणी." },
  { id: "GL004", name: "गौरी कुलकर्णी", whatsapp: "9765432109", gender: "स्त्री", age: 38, district: "औरंगाबाद", taluka: "पैठण", state: "महाराष्ट्र", pincode: "431107", registeredAt: "2026-03-28", bookSentAt: "2026-04-02", submittedAt: "2026-05-15", status: "verified", remarks: "पडताळणी पूर्ण. सेवा स्वीकारली." },
  { id: "GL005", name: "अनिल शिंदे", whatsapp: "9888776655", gender: "पुरुष", age: 49, district: "कोल्हापूर", taluka: "करवीर", state: "महाराष्ट्र", pincode: "416003", registeredAt: "2026-05-05", status: "pending", remarks: "वही पाठवायची आहे." },
  { id: "GL006", name: "मीना भोसले", whatsapp: "9700112233", gender: "स्त्री", age: 51, district: "सातारा", taluka: "कराड", state: "महाराष्ट्र", pincode: "415110", registeredAt: "2026-04-30", bookSentAt: "2026-05-04", status: "book_sent" },
  { id: "GL007", name: "हरी पवार", whatsapp: "9555443322", gender: "पुरुष", age: 60, district: "इंदूर", taluka: "इंदूर", state: "मध्य प्रदेश", pincode: "452001", registeredAt: "2026-05-12", status: "registered", remarks: "महाराष्ट्राबाहेरील भक्त." },
  { id: "GL008", name: "स्वाती गायकवाड", whatsapp: "9612345678", gender: "स्त्री", age: 33, district: "नागपूर", taluka: "हिंगणा", state: "महाराष्ट्र", pincode: "440016", registeredAt: "2026-05-15", status: "registered" },
];

const STATUS_META: Record<Status, { label: string; cls: string }> = {
  registered: { label: "नोंदणीकृत", cls: "bg-blue-100 text-blue-800 border-blue-200" },
  book_sent:  { label: "वही पाठवली", cls: "bg-amber-100 text-amber-900 border-amber-200" },
  completed:  { label: "गाथा पूर्ण",  cls: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  pending:    { label: "प्रलंबित",    cls: "bg-rose-100 text-rose-800 border-rose-200" },
  verified:   { label: "पडताळणी झाली",cls: "bg-violet-100 text-violet-800 border-violet-200" },
};

const QUICK_FILTERS = [
  { id: "all", label: "सर्व सदस्य", icon: Users },
  { id: "pending_books", label: "प्रलंबित वही", icon: Clock },
  { id: "book_sent", label: "वही पाठवलेले", icon: BookOpen },
  { id: "completed", label: "गाथा पूर्ण", icon: CheckCircle2 },
  { id: "mh", label: "महाराष्ट्र", icon: MapPin },
  { id: "out_mh", label: "महाराष्ट्राबाहेर", icon: MapPin },
  { id: "recent", label: "अलीकडील नोंदणी", icon: Sparkles },
] as const;

function useDebounced<T>(v: T, ms = 250) {
  const [d, setD] = useState(v);
  useEffect(() => { const t = setTimeout(() => setD(v), ms); return () => clearTimeout(t); }, [v, ms]);
  return d;
}

function Dashboard() {
  const [members, setMembers] = useState<Member[]>(SEED);
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [stateFilter, setStateFilter] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [recent, setRecent] = useState<string[]>([]);
  const [editing, setEditing] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounced(query, 200);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [debounced, quick, statusFilter, stateFilter, sortDesc]);

  const filtered = useMemo(() => {
    let list = [...members];
    const q = debounced.trim().toLowerCase();
    if (q) {
      list = list.filter((m) =>
        [m.name, m.whatsapp, m.district, m.taluka, m.pincode, m.state, m.gender, m.registeredAt, STATUS_META[m.status].label]
          .join(" ").toLowerCase().includes(q),
      );
    }
    if (statusFilter) list = list.filter((m) => m.status === statusFilter);
    if (stateFilter) list = list.filter((m) => m.state === stateFilter);

    switch (quick) {
      case "pending_books": list = list.filter((m) => m.status === "pending" || m.status === "registered"); break;
      case "book_sent":     list = list.filter((m) => m.status === "book_sent"); break;
      case "completed":     list = list.filter((m) => m.status === "completed" || m.status === "verified"); break;
      case "mh":            list = list.filter((m) => m.state === "महाराष्ट्र"); break;
      case "out_mh":        list = list.filter((m) => m.state !== "महाराष्ट्र"); break;
      case "recent": {
        const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 21);
        list = list.filter((m) => new Date(m.registeredAt) >= cutoff);
        break;
      }
    }
    list.sort((a, b) => (sortDesc ? b.registeredAt.localeCompare(a.registeredAt) : a.registeredAt.localeCompare(b.registeredAt)));
    return list;
  }, [members, debounced, quick, statusFilter, stateFilter, sortDesc]);

  const stats = useMemo(() => ({
    total: members.length,
    completed: members.filter((m) => m.status === "completed" || m.status === "verified").length,
    inProgress: members.filter((m) => m.status === "book_sent").length,
    pending: members.filter((m) => m.status === "registered" || m.status === "pending").length,
  }), [members]);

  const states = useMemo(() => Array.from(new Set(members.map((m) => m.state))), [members]);

  const commitSearch = () => {
    if (!query.trim()) return;
    setRecent((r) => [query.trim(), ...r.filter((x) => x !== query.trim())].slice(0, 6));
  };

  const exportCSV = () => {
    const headers = ["ID","नाव","WhatsApp","लिंग","वय","जिल्हा","तालुका","राज्य","पिनकोड","नोंदणी","स्थिती","शेरा"];
    const rows = filtered.map((m) => [m.id,m.name,m.whatsapp,m.gender,m.age,m.district,m.taluka,m.state,m.pincode,m.registeredAt,STATUS_META[m.status].label,m.remarks ?? ""]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "gathalikhan-members.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream via-cream-deep/30 to-cream text-foreground">
      <Navbar />
      <FloatingParticles />

      <section className="pt-32 pb-12 px-5 lg:px-10 max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/30 text-saffron-deep text-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" /> सेवा व्यवस्थापन
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-maroon mb-3">सदस्य डॅशबोर्ड</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">गाथालिखाण अभियानातील भक्तांची माहिती शोधा, व्यवस्थापित करा आणि सेवेचा मागोवा घ्या.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "एकूण सदस्य", value: stats.total, icon: Users, c: "from-saffron/20 to-saffron-deep/10" },
            { label: "गाथा पूर्ण", value: stats.completed, icon: CheckCircle2, c: "from-emerald-300/30 to-emerald-500/10" },
            { label: "वही पाठवली", value: stats.inProgress, icon: BookOpen, c: "from-amber-300/30 to-amber-500/10" },
            { label: "प्रलंबित", value: stats.pending, icon: Clock, c: "from-rose-300/30 to-rose-500/10" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${s.c} backdrop-blur-xl border border-border/60 shadow-sm hover:shadow-md transition`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                  <div className="text-3xl font-bold text-maroon">{s.value}</div>
                </div>
                <s.icon className="w-8 h-8 text-saffron-deep/70" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="sticky top-24 z-30 rounded-3xl bg-white/70 backdrop-blur-2xl border border-border/70 shadow-lg p-4 md:p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-saffron-deep" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && commitSearch()}
                placeholder="नाव, WhatsApp, जिल्हा, तालुका, पिनकोड किंवा स्थिती शोधा…"
                className="w-full h-12 pl-12 pr-10 rounded-xl bg-cream/70 border border-border focus:border-saffron focus:ring-2 focus:ring-saffron/30 outline-none transition text-base"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Status | "")}
              className="h-12 px-4 rounded-xl bg-cream/70 border border-border focus:border-saffron outline-none text-sm">
              <option value="">सर्व स्थिती</option>
              {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>

            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}
              className="h-12 px-4 rounded-xl bg-cream/70 border border-border focus:border-saffron outline-none text-sm">
              <option value="">सर्व राज्ये</option>
              {states.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <button onClick={() => setSortDesc((s) => !s)}
              className="h-12 px-4 rounded-xl border border-border bg-cream/70 hover:bg-saffron/10 transition flex items-center gap-2 text-sm">
              <ArrowUpDown className="w-4 h-4" /> {sortDesc ? "नवीन प्रथम" : "जुने प्रथम"}
            </button>

            <button onClick={exportCSV}
              className="h-12 px-4 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep text-white shadow hover:shadow-lg transition flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" /> CSV
            </button>
          </div>

          {/* Quick chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_FILTERS.map((f) => {
              const active = quick === f.id;
              return (
                <button key={f.id} onClick={() => setQuick(f.id)}
                  className={`group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm border transition ${
                    active
                      ? "bg-gradient-to-r from-saffron to-saffron-deep text-white border-transparent shadow-md shadow-saffron/30"
                      : "bg-cream/60 border-border text-foreground/80 hover:border-saffron hover:text-saffron-deep"
                  }`}>
                  <f.icon className="w-3.5 h-3.5" /> {f.label}
                  {active && <motion.span layoutId="chip-glow" className="absolute inset-0 -z-10 rounded-full bg-saffron/20 blur-md" />}
                </button>
              );
            })}
          </div>

          {recent.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              <History className="w-3.5 h-3.5" /> अलीकडील:
              {recent.map((r) => (
                <button key={r} onClick={() => setQuery(r)} className="px-2 py-0.5 rounded-md bg-cream-deep/60 hover:bg-saffron/10 transition">{r}</button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Results */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="text-sm text-muted-foreground">
            <Filter className="inline w-3.5 h-3.5 mr-1" /> {filtered.length} सदस्य आढळले
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-white/40 border border-border/50 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 rounded-3xl bg-white/50 border border-border/60">
            <BookOpen className="w-12 h-12 mx-auto text-saffron-deep/60 mb-4" />
            <div className="font-display text-2xl text-maroon mb-2">कोणताही सदस्य आढळला नाही</div>
            <p className="text-muted-foreground">कृपया शोध बदला किंवा फिल्टर रिसेट करा.</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((m, i) => (
                <motion.div key={m.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: Math.min(i * 0.03, 0.2) }}
                  className="group relative rounded-2xl bg-white/75 backdrop-blur-xl border border-border/70 p-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition">
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-saffron to-saffron-deep rounded-full blur-md opacity-40" />
                      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-saffron to-saffron-deep flex items-center justify-center text-white font-display text-xl">
                        {m.name.charAt(0)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display text-lg text-maroon leading-tight">{m.name}</h3>
                          <div className="text-xs text-muted-foreground">ID: {m.id} · {m.gender} · {m.age} वर्षे</div>
                        </div>
                        <span className={`shrink-0 text-[11px] px-2.5 py-1 rounded-full border font-medium ${STATUS_META[m.status].cls}`}>
                          {STATUS_META[m.status].label}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                        <div className="flex items-center gap-1.5 text-foreground/80"><Phone className="w-3.5 h-3.5 text-saffron-deep" />{m.whatsapp}</div>
                        <div className="flex items-center gap-1.5 text-foreground/80"><MapPin className="w-3.5 h-3.5 text-saffron-deep" />{m.taluka}, {m.district}</div>
                        <div className="flex items-center gap-1.5 text-foreground/80"><User className="w-3.5 h-3.5 text-saffron-deep" />{m.state} — {m.pincode}</div>
                        <div className="flex items-center gap-1.5 text-foreground/80"><Calendar className="w-3.5 h-3.5 text-saffron-deep" />{m.registeredAt}</div>
                      </div>

                      {m.remarks && (
                        <div className="mt-3 text-xs italic text-muted-foreground border-l-2 border-saffron/60 pl-2.5">
                          ॥ {m.remarks} ॥
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap gap-1.5">
                        <ActionBtn icon={Edit3} label="संपादन" onClick={() => setEditing(m)} />
                        <ActionBtn icon={BookOpen} label="वही" onClick={() => setEditing(m)} />
                        <ActionBtn icon={MessageSquare} label="शेरा" onClick={() => setEditing(m)} />
                        <a href={`https://wa.me/91${m.whatsapp}`} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition">
                          <Phone className="w-3 h-3" /> WhatsApp
                        </a>
                        <ActionBtn icon={Printer} label="प्रिंट" onClick={() => window.print()} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <AnimatePresence>
        {editing && (
          <EditModal member={editing} onClose={() => setEditing(null)}
            onSave={(updated) => { setMembers((arr) => arr.map((x) => x.id === updated.id ? updated : x)); setEditing(null); }} />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

function ActionBtn({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs border border-border hover:border-saffron hover:bg-saffron/10 hover:text-saffron-deep transition">
      <Icon className="w-3 h-3" /> {label}
    </button>
  );
}

function EditModal({ member, onClose, onSave }: { member: Member; onClose: () => void; onSave: (m: Member) => void }) {
  const [draft, setDraft] = useState<Member>(member);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-cream border border-border shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-2xl text-maroon">सदस्य अद्यतन</h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-cream-deep"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="text-xs text-muted-foreground">{draft.name} · {draft.whatsapp}</div>

          <label className="block">
            <span className="text-xs text-muted-foreground">स्थिती</span>
            <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as Status })}
              className="w-full h-10 mt-1 px-3 rounded-lg bg-white border border-border focus:border-saffron outline-none">
              {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-muted-foreground">वही पाठवल्याची तारीख</span>
            <input type="date" value={draft.bookSentAt ?? ""} onChange={(e) => setDraft({ ...draft, bookSentAt: e.target.value })}
              className="w-full h-10 mt-1 px-3 rounded-lg bg-white border border-border focus:border-saffron outline-none" />
          </label>

          <label className="block">
            <span className="text-xs text-muted-foreground">शेरा</span>
            <textarea value={draft.remarks ?? ""} onChange={(e) => setDraft({ ...draft, remarks: e.target.value })} rows={3}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white border border-border focus:border-saffron outline-none" />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 h-10 rounded-lg border border-border hover:bg-cream-deep">रद्द करा</button>
          <button onClick={() => onSave(draft)} className="px-5 h-10 rounded-lg bg-gradient-to-r from-saffron to-saffron-deep text-white shadow hover:shadow-lg">जतन करा</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
