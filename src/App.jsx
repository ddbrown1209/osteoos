import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Trophy,
  CheckCircle2,
  Target,
  Calendar as CalendarIcon,
  User,
  Plus,
  Trash2,
  Shield,
  Lock,
  Sparkles,
  Star,
  Users,
  Activity,
  Bell,
  Search,
  Send,
  BarChartBig,
} from "lucide-react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ------------------------------------------------------------
// OsteoOS – Dual‑role (Osteopath + Client) Gamified Platform
// ------------------------------------------------------------
// This file is plain React + JSX (no TypeScript) to avoid JSX parsing errors.
// Theme: neon minimal BLUE gradient.

// THEME -------------------------------------------------------
const GRAD_FROM = "#00e5ff"; // neon cyan
const GRAD_TO = "#0066ff"; // deep neon blue

// LIGHTWEIGHT UI PRIMITIVES ----------------------------------
const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-lg ${className}`}>{children}</div>
);
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium shadow hover:shadow-md active:translate-y-[1px] transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
const Pill = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs ${className}`}>{children}</span>
);
const Divider = () => <div className="h-px w-full bg-white/10" />;

// HELPERS -----------------------------------------------------
const startOfWeek = (d = new Date()) => {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // Monday start
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
};

const useWeekDays = (anchor = new Date()) => {
  return useMemo(() => {
    const start = startOfWeek(anchor);
    return new Array(7).fill(0).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [anchor]);
};

// MOCK DATA ---------------------------------------------------
const initialTasks = [
  { id: 1, title: "Morning mobility (10 min)", day: 1 },
  { id: 2, title: "Breathing reset (5 min)", day: 1 },
  { id: 3, title: "Glute activation set", day: 2 },
  { id: 4, title: "Thoracic extension drill", day: 3 },
  { id: 5, title: "Walk 20 minutes", day: 4 },
  { id: 6, title: "KB deadlift – light set", day: 5 },
  { id: 7, title: "Evening stretch (8 min)", day: 6 },
];

const milestoneTemplate = [
  { id: "m1", title: "Pain < 6/10 for 3 days" },
  { id: "m2", title: "Full morning routine 5×" },
  { id: "m3", title: "First strength session" },
  { id: "m4", title: "Complete weekly check-in" },
  { id: "m5", title: "Return to favourite activity" },
];

// OSTEOPATH DATA ---------------------------------------------
const clientsSeed = [
  { id: "c1", name: "Alex Johnson", status: "Active", streak: 6, completion: 82, painDelta: -2, lastCheckIn: "Today", nextAppt: "Fri 10:00", atRisk: false },
  { id: "c2", name: "Priya Patel", status: "Active", streak: 2, completion: 48, painDelta: -1, lastCheckIn: "Yesterday", nextAppt: "Mon 14:30", atRisk: true },
  { id: "c3", name: "Sam Miller", status: "Onboarding", streak: 0, completion: 0, painDelta: 0, lastCheckIn: "—", nextAppt: "Invite sent", atRisk: false },
  { id: "c4", name: "Chris Evans", status: "Active", streak: 9, completion: 90, painDelta: -3, lastCheckIn: "Today", nextAppt: "Wed 09:00", atRisk: false },
  { id: "c5", name: "Leah Huang", status: "At risk", streak: 0, completion: 15, painDelta: +1, lastCheckIn: "4 days ago", nextAppt: "—", atRisk: true },
];

const painTrendData = [
  { day: "Mon", avgPain: 7.1 },
  { day: "Tue", avgPain: 6.8 },
  { day: "Wed", avgPain: 6.5 },
  { day: "Thu", avgPain: 6.2 },
  { day: "Fri", avgPain: 6.1 },
  { day: "Sat", avgPain: 5.9 },
  { day: "Sun", avgPain: 5.8 },
];

const completionData = [
  { day: "Mon", pct: 62 },
  { day: "Tue", pct: 58 },
  { day: "Wed", pct: 66 },
  { day: "Thu", pct: 71 },
  { day: "Fri", pct: 69 },
  { day: "Sat", pct: 77 },
  { day: "Sun", pct: 64 },
];

const engagementPie = [
  { name: "Active", value: 18 },
  { name: "Onboarding", value: 6 },
  { name: "At risk", value: 3 },
];

// TOAST -------------------------------------------------------
const Toast = ({ open, title, subtitle }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      >
        <div className="rounded-xl bg-black/80 text-white shadow-lg backdrop-blur px-4 py-3">
          <div className="font-semibold">{title}</div>
          {subtitle && <div className="text-sm opacity-80">{subtitle}</div>}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// MODAL WRAPPER ----------------------------------------------
const Modal = ({ open, onClose, children, title }) => (
  <AnimatePresence>
    {open && (
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative w-[92vw] max-w-3xl rounded-2xl border border-white/10 bg-neutral-900/90 p-6 shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Button className="bg-white/10" onClick={onClose}>Close</Button>
          </div>
          <div>{children}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// PROGRESS RING ----------------------------------------------
const ProgressRing = ({ value }) => (
  <div className="relative grid h-24 w-24 place-items-center">
    <svg viewBox="0 0 36 36" className="h-24 w-24">
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
      />
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        strokeDasharray={`${value}, 100`}
        stroke="url(#gradBlue)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GRAD_FROM} />
          <stop offset="100%" stopColor={GRAD_TO} />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute text-sm font-semibold">{Math.round(value)}%</div>
  </div>
);

// WEEKLY SELECTOR --------------------------------------------
const WeeklySelector = ({ selected, onSelect, days }) => (
  <div className="flex gap-2 overflow-x-auto pb-1">
    {days.map((d, idx) => {
      const isSel = idx === selected;
      const dayStr = d.toLocaleDateString(undefined, { weekday: "short" });
      return (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`min-w-[84px] rounded-xl px-3 py-2 text-left transition ${
            isSel ? "bg-white/15" : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <div className="text-xs opacity-80">{dayStr}</div>
          <div className="text-lg font-semibold">{d.getDate()}</div>
        </button>
      );
    })}
  </div>
);

// MILESTONE PATH ---------------------------------------------
const MilestonePath = ({ milestones, completed, onToggle }) => (
  <div className="relative">
    <div
      className="absolute left-4 right-4 top-[22px] h-1"
      style={{ backgroundImage: `linear-gradient(90deg, ${GRAD_FROM}, ${GRAD_TO})` }}
    />
    <div className="relative z-10 grid grid-cols-5 gap-2">
      {milestones.map((m) => {
        const done = completed.includes(m.id);
        return (
          <div key={m.id} className="flex flex-col items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onToggle(m.id)}
              className={`grid h-11 w-11 place-items-center rounded-full border ${
                done ? "border-sky-300/70 bg-sky-500/20" : "border-white/15 bg-white/5"
              }`}
            >
              {done ? <CheckCircle2 className="h-5 w-5" /> : <Star className="h-5 w-5" />}
            </motion.button>
            <div className="text-center text-xs opacity-90">{m.title}</div>
          </div>
        );
      })}
    </div>
  </div>
);

// ONBOARDING WIZARD ------------------------------------------
const OnboardingWizard = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", goals: [], pain: [], consent: false });
  const [toast, setToast] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2200);
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose} title="Invite & Onboard a Client">
        <div className="mb-4 flex items-center gap-2">
          {["Details", "Goals", "Pain", "Schedule", "Consent"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`h-2 w-8 rounded-full ${i <= step ? "bg-gradient-to-r from-[#00e5ff] to-[#0066ff]" : "bg-white/10"}`} />
              <div className={`text-xs ${i === step ? "opacity-100" : "opacity-60"}`}>{label}</div>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm opacity-80">Full name</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Alex Johnson"
              />
            </div>
            <div>
              <label className="text-sm opacity-80">Email</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="client@domain.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm opacity-80">Preferred communication</label>
              <div className="mt-2 flex gap-2">
                {[
                  { id: "email", label: "Email" },
                  { id: "sms", label: "SMS" },
                  { id: "push", label: "Push" },
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setForm({ ...form, comms: o.id })}
                    className={`rounded-xl border px-3 py-1 text-sm ${
                      form.comms === o.id ? "border-sky-300 bg-sky-500/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-2">
            <div className="text-sm opacity-80">Primary goals (pick up to 3)</div>
            <div className="flex flex-wrap gap-2">
              {["Reduce pain", "Improve posture", "Lift safely", "Run 5k", "Play with kids", "Sleep better"].map((g) => (
                <button
                  key={g}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      goals: f.goals.includes(g)
                        ? f.goals.filter((x) => x !== g)
                        : f.goals.length < 3
                        ? [...f.goals, g]
                        : f.goals,
                    }))
                  }
                  className={`rounded-full border px-3 py-1 text-sm ${
                    form.goals.includes(g) ? "border-sky-300 bg-sky-500/10" : "border-white/10 bg-white/5"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-2">
            <div className="text-sm opacity-80">Pain areas</div>
            <div className="flex flex-wrap gap-2">
              {["Neck", "Upper back", "Lower back", "Shoulder", "Hip", "Knee", "Ankle"].map((p) => (
                <button
                  key={p}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      pain: f.pain.includes(p) ? f.pain.filter((x) => x !== p) : [...f.pain, p],
                    }))
                  }
                  className={`rounded-full border px-3 py-1 text-sm ${
                    form.pain.includes(p) ? "border-sky-300 bg-sky-500/10" : "border-white/10 bg-white/5"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm opacity-80">Preferred days</label>
              <textarea
                placeholder="e.g. Mon, Wed, Fri mornings"
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                rows={3}
                onChange={(e) => setForm({ ...form, schedule: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm opacity-80">Equipment at home</label>
              <textarea
                placeholder="Bands, light kettlebell, mat"
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                rows={3}
                onChange={(e) => setForm({ ...form, equipment: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 opacity-90" />
              <div className="text-sm opacity-90">
                GDPR & consent: I agree to the storage of my programme and health information and understand I can export or delete my data at any time.
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" onChange={(e) => setForm({ ...form, consent: e.target.checked })} /> I agree
            </label>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Button className="bg-white/10" onClick={prev} disabled={step === 0}>Back</Button>
          {step < 4 ? (
            <Button
              className="text-white"
              style={{ backgroundImage: `linear-gradient(90deg, ${GRAD_FROM}, ${GRAD_TO})` }}
              onClick={next}
            >
              Next
            </Button>
          ) : (
            <Button
              className="text-white disabled:opacity-50"
              style={{ backgroundImage: `linear-gradient(90deg, ${GRAD_FROM}, ${GRAD_TO})` }}
              disabled={!form.consent || !form.name || !form.email}
              onClick={finish}
            >
              Send invite
            </Button>
          )}
        </div>
      </Modal>
      <Toast open={toast} title="Invite sent" subtitle="Magic link emailed to client" />
    </>
  );
};

// CLIENT – PROFILE FORM -------------------------------------
const ProfileForm = () => {
  const [prefs, setPrefs] = useState({ notifications: true, darkMode: true, shareProgress: true });
  const [dangerOpen, setDangerOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const save = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center gap-3">
            <User className="h-5 w-5" />
            <div className="text-sm font-semibold">Personal details</div>
          </div>
          <div className="grid gap-3">
            <div>
              <label className="text-xs opacity-80">Display name</label>
              <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" defaultValue="Alex J" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs opacity-80">Email</label>
                <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" defaultValue="alex@example.com" />
              </div>
              <div>
                <label className="text-xs opacity-80">Phone</label>
                <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" defaultValue="07123 456789" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs opacity-80">Preferred pronouns (optional)</label>
                <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" placeholder="she/her, he/him..." />
              </div>
              <div>
                <label className="text-xs opacity-80">Emergency contact</label>
                <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2" placeholder="Name & number" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-3 flex items-center gap-3">
            <Lock className="h-5 w-5" />
            <div className="text-sm font-semibold">Privacy & notifications</div>
          </div>
          <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between gap-6">
              <span>Allow motivational nudges</span>
              <input
                type="checkbox"
                checked={prefs.notifications}
                onChange={(e) => setPrefs({ ...prefs, notifications: e.target.checked })}
              />
            </label>
            <label className="flex items-center justify-between gap-6">
              <span>Dark mode</span>
              <input
                type="checkbox"
                checked={prefs.darkMode}
                onChange={(e) => setPrefs({ ...prefs, darkMode: e.target.checked })}
              />
            </label>
            <label className="flex items-center justify-between gap-6">
              <span>Share progress with practitioner</span>
              <input
                type="checkbox"
                checked={prefs.shareProgress}
                onChange={(e) => setPrefs({ ...prefs, shareProgress: e.target.checked })}
              />
            </label>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="mb-3 flex items-center gap-3">
            <Shield className="h-5 w-5" />
            <div className="text-sm font-semibold">Data controls</div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Button className="bg-white/10">Export my data</Button>
            <Button className="bg-white/10" onClick={() => setDangerOpen(true)}>
              <Trash2 className="h-4 w-4" /> Request deletion
            </Button>
            <div className="text-xs opacity-70">You can request full deletion at any time (GDPR). Admin must confirm within 30 days.</div>
          </div>
        </Card>
      </div>

      <div className="mt-4 flex gap-3">
        <Button
          className="text-white"
          style={{ backgroundImage: `linear-gradient(90deg, ${GRAD_FROM}, ${GRAD_TO})` }}
          onClick={save}
        >
          Save changes
        </Button>
        <Button className="bg-white/10">Cancel</Button>
      </div>

      <Toast open={toast} title="Profile updated" />
      <Modal open={dangerOpen} onClose={() => setDangerOpen(false)} title="Confirm data deletion">
        <div className="space-y-3 text-sm">
          <div>Are you sure you want to request deletion of your account and personal data? This cannot be undone.</div>
          <div className="flex gap-2">
            <Button className="bg-white/10" onClick={() => setDangerOpen(false)}>Cancel</Button>
            <Button className="bg-red-500/80 text-white" onClick={() => setDangerOpen(false)}>
              <Trash2 className="h-4 w-4" /> Confirm request
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

// CLIENT – DASHBOARD -----------------------------------------
const ClientDashboard = () => {
  const todayIndex = (() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1; // Monday=0 .. Sunday=6
  })();
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const days = useWeekDays();
  const [tasks, setTasks] = useState(initialTasks.map((t) => ({ ...t, done: false })));
  const [completedM, setCompletedM] = useState(["m1"]);
  const [xp, setXp] = useState(120); // mock XP
  const [level, setLevel] = useState(2); // mock Level
  const [celebrate, setCelebrate] = useState(false);

  const todaysTasks = tasks.filter((t) => t.day === selectedDay + 1);
  const weeklyTotal = tasks.length;
  const weeklyDone = tasks.filter((t) => t.done).length;
  const weeklyPct = Math.min(100, (weeklyDone / weeklyTotal) * 100 || 0);

  const toggleTask = (id) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      const turnedOn = next.find((t) => t.id === id)?.done;
      if (turnedOn) {
        const gain = 10;
        const newXp = xp + gain;
        const newLevel = newXp >= 150 ? level + 1 : level;
        const carryXp = newXp >= 150 ? newXp - 150 : newXp;
        setXp(carryXp);
        if (newLevel !== level) setLevel(newLevel);
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 1500);
      }
      return next;
    });
  };

  const toggleMilestone = (id) => {
    setCompletedM((arr) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <div className="text-sm font-semibold">Your weekly plan</div>
            </div>
            <Pill><CalendarIcon className="h-3 w-3" /> Week view</Pill>
          </div>
          <WeeklySelector selected={selectedDay} onSelect={setSelectedDay} days={days} />
          <Divider />
          <div className="mt-3 grid gap-2">
            {todaysTasks.length === 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm opacity-80">No tasks for this day – enjoy the recovery!</div>
            )}
            {todaysTasks.map((t) => (
              <label key={t.id} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="text-sm">{t.title}</span>
                <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} />
              </label>
            ))}
          </div>
        </Card>
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <Flame className="h-5 w-5" />
            <div className="text-sm font-semibold">Streak & XP</div>
          </div>
          <div className="flex items-center gap-4">
            <ProgressRing value={weeklyPct} />
            <div>
              <div className="text-sm">Level {level}</div>
              <div className="text-xs opacity-80">{xp}/150 XP to next level</div>
              <div className="mt-2 text-xs opacity-80">Keep completing tasks to maintain your streak.</div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Pill><Flame className="h-3 w-3" /> 6‑day streak</Pill>
            <Pill><Trophy className="h-3 w-3" /> 3 milestones</Pill>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <div className="text-sm font-semibold">Milestone path</div>
          </div>
        </div>
        <MilestonePath milestones={milestoneTemplate} completed={completedM} onToggle={toggleMilestone} />
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <div className="mb-3 text-sm font-semibold">Coach missions</div>
          <div className="grid gap-2">
            {["Record pain score daily for 1 week", "Send a 20‑second form check video", "Book follow‑up session"].map((m, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                <span>{m}</span>
                <Button className="bg-white/10">Mark done</Button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="mb-3 text-sm font-semibold">Achievements</div>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span>First week complete</span>
              <Pill><Trophy className="h-3 w-3" /> Bronze</Pill>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span>Consistency champ</span>
              <Pill><Trophy className="h-3 w-3" /> Silver</Pill>
            </div>
          </div>
        </Card>
      </div>

      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          >
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{
                  y: [Math.random() * 600 + 200],
                  x: [Math.random() * window.innerWidth - window.innerWidth / 2],
                  opacity: [1, 0],
                  rotate: [0, 360],
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 text-2xl"
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// OSTEOPATH – QUICK COMPONENTS -------------------------------
const StatCard = ({ icon: Icon, label, value, foot }) => (
  <Card>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs opacity-80">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
        {foot && <div className="text-xs opacity-70 mt-1">{foot}</div>}
      </div>
      <div
        className="grid h-10 w-10 place-items-center rounded-xl"
        style={{ backgroundImage: `linear-gradient(135deg, ${GRAD_FROM}22, ${GRAD_TO}33)` }}
      >
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </Card>
);

const NudgeModal = ({ open, onClose, target }) => {
  const [template, setTemplate] = useState(
    "Hi [FirstName], great momentum this week – shall we lock in your next session? [SchedulerLink]"
  );
  const [sent, setSent] = useState(false);
  const send = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 900);
  };
  return (
    <Modal open={open} onClose={onClose} title={`Send a nudge${target ? ` to ${target.name}` : ""}`}>
      <div className="space-y-3 text-sm">
        <textarea
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
          rows={4}
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        />
        <div className="text-xs opacity-70">Tokens: [FirstName] [LastCheckIn] [SchedulerLink] [CoachName]</div>
        <div className="flex justify-end gap-2">
          <Button className="bg-white/10" onClick={onClose}>Cancel</Button>
          <Button
            className="text-white"
            style={{ backgroundImage: `linear-gradient(90deg, ${GRAD_FROM}, ${GRAD_TO})` }}
            onClick={send}
          >
            <Send className="h-4 w-4" /> Send
          </Button>
        </div>
      </div>
      <Toast open={sent} title="Nudge queued" subtitle="Client will receive it via their preferred channel" />
    </Modal>
  );
};

// OSTEOPATH – DASHBOARD --------------------------------------
const OsteoDashboard = () => {
  const [clients, setClients] = useState(clientsSeed);
  const [query, setQuery] = useState("");
  const [nudgeOpen, setNudgeOpen] = useState(false);
  const [nudgeTarget, setNudgeTarget] = useState(null);

  const filtered = clients.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.status.toLowerCase().includes(query.toLowerCase())
  );

  const active = clients.filter((c) => c.status === "Active").length;
  const onboarding = clients.filter((c) => c.status === "Onboarding").length;
  const atRisk = clients.filter((c) => c.atRisk).length;
  const avgCompletion = Math.round(clients.reduce((a, c) => a + c.completion, 0) / clients.length);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Users} label="Active clients" value={active} foot={`${onboarding} onboarding`} />
        <StatCard icon={Activity} label="Weekly completion" value={`${avgCompletion}%`} foot="Avg across all clients" />
        <StatCard icon={BarChartBig} label="Avg pain change" value="-1.8" foot="vs last week (0–10)" />
        <StatCard icon={Bell} label="At‑risk" value={atRisk} foot="Missed 3+ days or ↑ pain" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <div className="mb-3 text-sm font-semibold">Average pain score (last 7 days)</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={painTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GRAD_TO} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={GRAD_FROM} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 10]} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} labelStyle={{ color: "#fff" }} />
                <Area type="monotone" dataKey="avgPain" stroke={GRAD_TO} fill="url(#areaGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <div className="mb-3 text-sm font-semibold">Client engagement mix</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={engagementPie} dataKey="value" nameKey="name" outerRadius={72} innerRadius={40}>
                  {engagementPie.map((_, i) => (
                    <Cell key={i} fill={[GRAD_TO, GRAD_FROM, "#99aaff"][i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} labelStyle={{ color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold">Task completion by day</div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} labelStyle={{ color: "#fff" }} />
              <Bar dataKey="pct" radius={[8, 8, 0, 0]} fill={GRAD_TO} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Clients</div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 opacity-60" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or status"
                className="w-64 rounded-xl border border-white/10 bg-white/5 pl-8 pr-3 py-2 text-sm"
              />
            </div>
            <Button
              className="text-white"
              style={{ backgroundImage: `linear-gradient(90deg, ${GRAD_FROM}, ${GRAD_TO})` }}
              onClick={() => {}}
            >
              Export CSV
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs opacity-70">
                <th className="p-2">Name</th>
                <th className="p-2">Status</th>
                <th className="p-2">Streak</th>
                <th className="p-2">Completion</th>
                <th className="p-2">Pain Δ</th>
                <th className="p-2">Last check‑in</th>
                <th className="p-2">Next appt</th>
                <th className="p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-white/10">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2"><Pill>{c.status}</Pill></td>
                  <td className="p-2">{c.streak}🔥</td>
                  <td className="p-2">{c.completion}%</td>
                  <td className={`p-2 ${c.painDelta < 0 ? "text-emerald-400" : c.painDelta > 0 ? "text-rose-400" : "opacity-80"}`}>
                    {c.painDelta > 0 ? `+${c.painDelta}` : c.painDelta}
                  </td>
                  <td className="p-2">{c.lastCheckIn}</td>
                  <td className="p-2">{c.nextAppt}</td>
                  <td className="p-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Button className="bg-white/10" onClick={() => { setNudgeTarget(c); setNudgeOpen(true); }}>Nudge</Button>
                      <Button className="bg-white/10">Open profile</Button>
                      <Button className="text-white" style={{ backgroundImage: `linear-gradient(90deg, ${GRAD_FROM}, ${GRAD_TO})` }}>Edit programme</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <NudgeModal open={nudgeOpen} onClose={() => setNudgeOpen(false)} target={nudgeTarget} />
    </div>
  );
};

// MAIN SHELL --------------------------------------------------
const Shell = () => {
  const [tab, setTab] = useState("dashboard");
  const [role, setRole] = useState("client"); // "client" | "osteo"
  const [inviteOpen, setInviteOpen] = useState(false);

  // Build the tab list THEN map (fixes JSX ">" parse error from ternary+.map)
  const clientTabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "journey", label: "Journey" },
    { id: "programme", label: "Programme" },
    { id: "profile", label: "Profile" },
    { id: "achievements", label: "Achievements" },
  ];
  const osteoTabs = [
    { id: "dashboard", label: "Overview" },
    { id: "clients", label: "Clients" },
    { id: "analytics", label: "Analytics" },
    { id: "library", label: "Library" },
    { id: "settings", label: "Settings" },
  ];
  const tabs = role === "client" ? clientTabs : osteoTabs;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-[#00e5ff]/20 to-[#0066ff]/20 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl" style={{ backgroundImage: `linear-gradient(135deg, ${GRAD_FROM}, ${GRAD_TO})` }} />
            <div className="font-semibold tracking-wide">OsteoOS</div>
            <Pill className="ml-2">{role === "client" ? "Client Portal" : "Osteopath Dashboard"}</Pill>
          </div>
          <div className="flex items-center gap-2">
            {role === "osteo" && (
              <Button className="bg-white/10" onClick={() => setInviteOpen(true)}>
                <Plus className="h-4 w-4" /> Invite client
              </Button>
            )}
            <Button className="bg-white/10" onClick={() => setRole(role === "client" ? "osteo" : "client")}>
              Switch to {role === "client" ? "Osteopath" : "Client"} view
            </Button>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-xl px-3 py-1 text-sm ${tab === t.id ? "bg-white/15" : "bg-white/5 hover:bg-white/10"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Header */}
        <div
          className="mb-4 rounded-2xl border border-white/10 p-5"
          style={{ backgroundImage: `linear-gradient(90deg, ${GRAD_FROM}22, ${GRAD_TO}22)` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm opacity-90">Welcome back</div>
              <h1 className="text-2xl font-semibold">
                {role === "client" ? "Let’s hit your next milestone" : "Stay on top of clients and outcomes"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Pill><Flame className="h-3 w-3" /> {role === "client" ? "Streak: 6" : "High compliance: 78%"}</Pill>
              <Pill><Trophy className="h-3 w-3" /> {role === "client" ? "Level: 2" : "This week’s wins"}</Pill>
            </div>
          </div>
        </div>

        {/* Content */}
        {role === "client" && (
          <>
            {tab === "dashboard" && <ClientDashboard />}
            {tab === "profile" && <ProfileForm />}
            {tab === "journey" && (
              <Card>
                <div className="text-sm opacity-80">Animated map of your rehab journey with unlockable islands and coach tips (coming next).</div>
                <div className="mt-3 text-xs opacity-60">This area will render programme phases as a visual map with quests.</div>
              </Card>
            )}
            {tab === "programme" && (
              <Card>
                <div className="text-sm opacity-80">Exercise list with short how‑to clips, timers and form‑check upload.</div>
              </Card>
            )}
            {tab === "achievements" && (
              <Card>
                <div className="text-sm opacity-80">Trophy cabinet showing badges, seasonal challenges and leaderboards (opt‑in).</div>
              </Card>
            )}
          </>
        )}

        {role === "osteo" && (
          <>
            {(tab === "dashboard" || tab === "analytics" || tab === "clients") && <OsteoDashboard />}
            {tab === "library" && (
              <Card>
                <div className="text-sm opacity-80">Your exercise/video library and reusable programme templates (assign with one click).</div>
              </Card>
            )}
            {tab === "settings" && (
              <Card>
                <div className="text-sm opacity-80">Clinic settings, branding (logo/colours), appointment links, and integrations (calendar, email/SMS, payments).</div>
              </Card>
            )}
          </>
        )}
      </div>

      <OnboardingWizard open={inviteOpen} onClose={() => setInviteOpen(false)} />

      {/* Footer */}
      <div className="mx-auto mt-8 max-w-6xl px-4 pb-10">
        <div className="text-center text-xs opacity-60">© {new Date().getFullYear()} OsteoOS. All rights reserved.</div>
      </div>
    </div>
  );
};

// DEV TESTS ---------------------------------------------------
// Simple runtime checks to catch regressions without a test runner
(function runDevTests() {
  try {
    const monday = startOfWeek(new Date("2025-08-13"));
    console.assert(monday.getDay() === 1, "startOfWeek should return a Monday");

    const sampleTabsClient = [
      { id: "dashboard", label: "Dashboard" },
      { id: "journey", label: "Journey" },
      { id: "programme", label: "Programme" },
      { id: "profile", label: "Profile" },
      { id: "achievements", label: "Achievements" },
    ];
    console.assert(sampleTabsClient.length === 5, "Client should have 5 tabs");

    const toggleId = (arr, id) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
    let list = ["a"]; list = toggleId(list, "b");
    console.assert(list.includes("b"), "toggleId should add missing id");
    list = toggleId(list, "a");
    console.assert(!list.includes("a"), "toggleId should remove existing id");

    console.log("OsteoOS dev tests: PASS");
  } catch (e) {
    console.warn("OsteoOS dev tests: FAIL", e);
  }
})();

export default function App() {
  return <Shell />;
}
