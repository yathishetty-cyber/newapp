import React, { useState, useEffect, useRef } from "react";
import {
  Home as HomeIcon,
  Users,
  FileText,
  Pill,
  Mic,
  Upload,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  Sparkles,
  CalendarClock,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  BookOpen,
  Ear,
  Lightbulb,
  Tag,
  Footprints,
  Flame,
  Camera,
  Image as ImageIcon,
  FolderOpen,
  IndianRupee,
  Wallet,
  ShieldCheck,
  MapPin,
  Building2,
  Siren,
  Navigation,
  LocateFixed,
  List,
  Map as MapIcon,
  Download,
  Archive,
  Droplet,
  CreditCard,
  HeartHandshake,
  Landmark,
  Eye,
  Scissors,
  Stethoscope,
  CalendarCheck,
  MessageCircle,
  Send,
  Paperclip,
  Bell,
  Share2,
  UserPlus,
  Lock,
  Brain,
  RotateCcw,
  LayoutGrid,
  Phone,
  Star,
  ScanFace,
  Circle,
  Info,
  Salad,
  Bone,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

/* ---------------------------------------------------------------
   TOKENS
----------------------------------------------------------------*/
const C = {
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceAlt: "#F3F1EA",
  border: "#E4E1D5",
  borderSoft: "#ECEAE1",
  marigold: "#D9770A",
  marigoldDim: "#FDECD1",
  teal: "#0E9488",
  tealDim: "#D3F3EF",
  coral: "#E3492F",
  coralDim: "#FCE1DA",
  green: "#1E9E56",
  greenDim: "#DCF5E6",
  text: "#1C2333",
  textMuted: "#6B7280",
  textFaint: "#9B9689",
  bodyFill: "#F3F1EA",
  bodyStroke: "#C9C5B7",
};

const FONT_DISPLAY = "'Fraunces', ui-serif, Georgia, serif";
const FONT_BODY = "'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO = "'IBM Plex Mono', ui-monospace, monospace";

function useGoogleFonts() {
  useEffect(() => {
    const id = "aaroghyam-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Poppins:wght@800;900&display=swap";
    document.head.appendChild(link);
  }, []);
}

// Small, reusable motion system \u2014 covers screen-entrance reveals (accordions, popups,
// newly-mounted lists) and state-change feedback (checkmarks popping, buttons responding
// to a tap) so state changes are signaled instead of just appearing.
function useMotionStyles() {
  useEffect(() => {
    const id = "aaroghyam-motion";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes nhFadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes nhScalePop { 0% { transform: scale(0.6); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
      @keyframes nhModalCard { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes nhBackdropFade { from { opacity: 0; } to { opacity: 1; } }
      .nh-fade-in-up { animation: nhFadeInUp 0.32s ease-out both; }
      .nh-scale-pop { animation: nhScalePop 0.32s cubic-bezier(0.34,1.56,0.64,1) both; }
      .nh-modal-card { animation: nhModalCard 0.28s ease-out both; }
      .nh-modal-backdrop { animation: nhBackdropFade 0.22s ease-out both; }
      .nh-tap { transition: transform 0.12s ease; }
      .nh-tap:active { transform: scale(0.96); }
      .nh-bar-fill { transition: width 0.6s cubic-bezier(0.22,1,0.36,1); }
    `;
    document.head.appendChild(style);
  }, []);
}

// Shows the decorative phone-frame (border, shadow, centered on a neutral background) only on
// screens wide enough that it reads as a mockup. On an actual phone, the same link should fill
// the real screen edge-to-edge instead of showing a smaller bordered rectangle inside the
// device's own screen.
function useIsWideViewport() {
  const [isWide, setIsWide] = useState(() => (typeof window !== "undefined" ? window.innerWidth > 480 : true));
  useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth > 480);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isWide;
}

/* ---------------------------------------------------------------
   MOCK DATA
----------------------------------------------------------------*/
const MEMBERS = [
  {
    id: "appa",
    name: "Appa",
    familyRole: "father",
    relation: "68Y · B+ · 80.1 kg · 172 cm",
    risk: "risk",
    initial: "A",
    conditions: ["Type 2 Diabetes", "Hypertension"],
    vitals: [
      { m: "Mar", sys: 132, dia: 84, sugar: 142, steps: 3200, cal: 1620, hba1c: 7.2, bmi: 27.5, weight: 78.0, water: 1.6, spo2: 96, heartRate: 88 },
      { m: "Apr", sys: 134, dia: 85, sugar: 148, steps: 3450, cal: 1680, hba1c: 7.3, bmi: 27.7, weight: 78.5, water: 1.7, spo2: 96, heartRate: 90 },
      { m: "May", sys: 136, dia: 87, sugar: 151, steps: 3100, cal: 1590, hba1c: 7.4, bmi: 27.9, weight: 79.0, water: 1.7, spo2: 95, heartRate: 92 },
      { m: "Jun", sys: 135, dia: 86, sugar: 158, steps: 3600, cal: 1710, hba1c: 7.5, bmi: 28.0, weight: 79.4, water: 1.8, spo2: 95, heartRate: 96 },
      { m: "Jul", sys: 138, dia: 88, sugar: 163, steps: 3300, cal: 1640, hba1c: 7.7, bmi: 28.1, weight: 79.8, water: 1.9, spo2: 94, heartRate: 99 },
      { m: "Aug", sys: 138, dia: 89, sugar: 168, steps: 3050, cal: 1580, hba1c: 7.8, bmi: 28.2, weight: 80.1, water: 2.0, spo2: 94, heartRate: 102 },
    ],
  },
  {
    id: "amma",
    name: "Amma",
    familyRole: "mother",
    relation: "64Y · O+ · 65.0 kg · 158 cm",
    risk: "attention",
    initial: "A",
    conditions: ["Osteopenia"],
    vitals: [
      { m: "Mar", sys: 122, dia: 78, sugar: 96, steps: 4100, cal: 1750, hba1c: 5.8, bmi: 24.8, weight: 63.8, water: 1.5, spo2: 97, heartRate: 72 },
      { m: "Apr", sys: 120, dia: 77, sugar: 94, steps: 4300, cal: 1790, hba1c: 5.7, bmi: 24.9, weight: 64.0, water: 1.6, spo2: 97, heartRate: 71 },
      { m: "May", sys: 124, dia: 79, sugar: 98, steps: 4000, cal: 1730, hba1c: 5.8, bmi: 25.0, weight: 64.3, water: 1.6, spo2: 97, heartRate: 73 },
      { m: "Jun", sys: 121, dia: 78, sugar: 95, steps: 4450, cal: 1810, hba1c: 5.9, bmi: 25.1, weight: 64.6, water: 1.7, spo2: 97, heartRate: 72 },
      { m: "Jul", sys: 123, dia: 80, sugar: 97, steps: 4600, cal: 1840, hba1c: 5.8, bmi: 25.2, weight: 64.8, water: 1.7, spo2: 97, heartRate: 74 },
      { m: "Aug", sys: 122, dia: 78, sugar: 99, steps: 4700, cal: 1860, hba1c: 5.7, bmi: 25.3, weight: 65.0, water: 1.8, spo2: 97, heartRate: 73 },
    ],
  },
  {
    id: "yathi",
    name: "Yathi",
    familyRole: "self",
    relation: "34Y · A+ · 72.8 kg · 175 cm",
    risk: "attention",
    initial: "Y",
    conditions: [],
    vitals: [
      { m: "Mar", sys: 116, dia: 74, sugar: 88, steps: 6200, cal: 2100, hba1c: 5.4, bmi: 23.5, weight: 71.8, water: 1.9, spo2: 98, heartRate: 70 },
      { m: "Apr", sys: 118, dia: 75, sugar: 89, steps: 6800, cal: 2180, hba1c: 5.3, bmi: 23.6, weight: 72.0, water: 2.0, spo2: 98, heartRate: 69 },
      { m: "May", sys: 117, dia: 74, sugar: 87, steps: 7100, cal: 2220, hba1c: 5.4, bmi: 23.6, weight: 72.2, water: 2.0, spo2: 98, heartRate: 71 },
      { m: "Jun", sys: 119, dia: 76, sugar: 90, steps: 6500, cal: 2140, hba1c: 5.3, bmi: 23.7, weight: 72.4, water: 2.1, spo2: 98, heartRate: 70 },
      { m: "Jul", sys: 118, dia: 75, sugar: 88, steps: 7400, cal: 2260, hba1c: 5.2, bmi: 23.7, weight: 72.6, water: 2.1, spo2: 98, heartRate: 72 },
      { m: "Aug", sys: 117, dia: 74, sugar: 89, steps: 7800, cal: 2310, hba1c: 5.3, bmi: 23.8, weight: 72.8, water: 2.2, spo2: 98, heartRate: 71 },
    ],
  },
  {
    id: "neema",
    name: "Neema",
    familyRole: "spouse",
    relation: "33Y · O+ · 58.4 kg · 162 cm",
    risk: "good",
    initial: "N",
    conditions: [],
    vitals: [
      { m: "Mar", sys: 112, dia: 72, sugar: 84, steps: 6600, cal: 1980, hba1c: 5.2, bmi: 22.0, weight: 57.6, water: 1.8, spo2: 98, heartRate: 66 },
      { m: "Apr", sys: 113, dia: 73, sugar: 85, steps: 6900, cal: 2010, hba1c: 5.1, bmi: 22.0, weight: 57.7, water: 1.9, spo2: 98, heartRate: 67 },
      { m: "May", sys: 111, dia: 71, sugar: 83, steps: 7200, cal: 2040, hba1c: 5.2, bmi: 22.1, weight: 57.9, water: 1.9, spo2: 98, heartRate: 65 },
      { m: "Jun", sys: 112, dia: 72, sugar: 84, steps: 6800, cal: 2000, hba1c: 5.1, bmi: 22.1, weight: 58.0, water: 2.0, spo2: 99, heartRate: 68 },
      { m: "Jul", sys: 110, dia: 71, sugar: 82, steps: 7500, cal: 2070, hba1c: 5.2, bmi: 22.2, weight: 58.2, water: 2.0, spo2: 98, heartRate: 66 },
      { m: "Aug", sys: 111, dia: 72, sugar: 83, steps: 7300, cal: 2050, hba1c: 5.1, bmi: 22.3, weight: 58.4, water: 2.1, spo2: 98, heartRate: 67 },
    ],
  },
  {
    id: "aadyaa",
    name: "Aadyaa",
    familyRole: "daughter",
    relation: "6Y · B+ · 20.8 kg · 115 cm",
    risk: "good",
    initial: "A",
    conditions: [],
    vitals: [
      { m: "Mar", sys: 98, dia: 62, sugar: 82, steps: 5200, cal: 1420, hba1c: 5.0, bmi: 15.5, weight: 19.8, water: 1.0, spo2: 98, heartRate: 88, height: 113.5 },
      { m: "Apr", sys: 99, dia: 63, sugar: 83, steps: 5600, cal: 1460, hba1c: 5.0, bmi: 15.5, weight: 20.0, water: 1.0, spo2: 99, heartRate: 90, height: 114.0 },
      { m: "May", sys: 98, dia: 62, sugar: 82, steps: 5900, cal: 1490, hba1c: 5.1, bmi: 15.6, weight: 20.2, water: 1.0, spo2: 98, heartRate: 87, height: 114.4 },
      { m: "Jun", sys: 100, dia: 63, sugar: 84, steps: 6100, cal: 1510, hba1c: 5.0, bmi: 15.6, weight: 20.4, water: 1.1, spo2: 99, heartRate: 91, height: 114.8 },
      { m: "Jul", sys: 99, dia: 63, sugar: 83, steps: 5800, cal: 1480, hba1c: 5.0, bmi: 15.7, weight: 20.6, water: 1.1, spo2: 99, heartRate: 89, height: 115.2 },
      { m: "Aug", sys: 99, dia: 62, sugar: 83, steps: 6300, cal: 1530, hba1c: 5.1, bmi: 15.8, weight: 20.8, water: 1.1, spo2: 99, heartRate: 92, height: 115.6 },
    ],
  },
  {
    id: "niyathi",
    name: "Niyathi",
    familyRole: "daughter",
    relation: "3Y · O+ · 13.5 kg · 95 cm",
    risk: "good",
    initial: "N",
    conditions: [],
    vitals: [
      { m: "Mar", sys: 92, dia: 58, sugar: 80, steps: 3100, cal: 980, hba1c: 4.9, bmi: 15.0, weight: 13.0, water: 0.7, spo2: 98, heartRate: 98, height: 93.0 },
      { m: "Apr", sys: 93, dia: 59, sugar: 81, steps: 3300, cal: 1000, hba1c: 5.0, bmi: 15.0, weight: 13.1, water: 0.7, spo2: 99, heartRate: 100, height: 93.5 },
      { m: "May", sys: 92, dia: 58, sugar: 80, steps: 3400, cal: 1010, hba1c: 4.9, bmi: 15.1, weight: 13.2, water: 0.7, spo2: 99, heartRate: 97, height: 94.0 },
      { m: "Jun", sys: 94, dia: 59, sugar: 82, steps: 3200, cal: 990, hba1c: 5.0, bmi: 15.1, weight: 13.3, water: 0.8, spo2: 99, heartRate: 101, height: 94.4 },
      { m: "Jul", sys: 93, dia: 58, sugar: 81, steps: 3500, cal: 1020, hba1c: 4.9, bmi: 15.2, weight: 13.4, water: 0.8, spo2: 99, heartRate: 99, height: 94.8 },
      { m: "Aug", sys: 93, dia: 59, sugar: 81, steps: 3600, cal: 1030, hba1c: 5.0, bmi: 15.2, weight: 13.5, water: 0.8, spo2: 99, heartRate: 100, height: 95.2 },
    ],
  },
  {
    id: "maama",
    name: "Maama",
    familyRole: "father-in-law",
    relation: "70Y · B+ · 75.0 kg · 170 cm",
    risk: "attention",
    initial: "M",
    parentOf: "neema",
    conditions: ["Hypertension"],
    vitals: [
      { m: "Mar", sys: 132, dia: 84, sugar: 92, steps: 4600, cal: 1780, hba1c: 6.0, bmi: 26.5, weight: 73.5, water: 1.6, spo2: 96, heartRate: 86 },
      { m: "Apr", sys: 134, dia: 85, sugar: 93, steps: 4800, cal: 1800, hba1c: 6.1, bmi: 26.6, weight: 73.8, water: 1.7, spo2: 95, heartRate: 87 },
      { m: "May", sys: 131, dia: 83, sugar: 91, steps: 4900, cal: 1790, hba1c: 6.0, bmi: 26.7, weight: 74.1, water: 1.7, spo2: 95, heartRate: 89 },
      { m: "Jun", sys: 135, dia: 86, sugar: 94, steps: 4500, cal: 1770, hba1c: 6.2, bmi: 26.8, weight: 74.4, water: 1.8, spo2: 95, heartRate: 88 },
      { m: "Jul", sys: 133, dia: 84, sugar: 92, steps: 5000, cal: 1810, hba1c: 6.1, bmi: 26.9, weight: 74.7, water: 1.8, spo2: 94, heartRate: 90 },
      { m: "Aug", sys: 132, dia: 84, sugar: 92, steps: 5100, cal: 1820, hba1c: 6.0, bmi: 27.0, weight: 75.0, water: 1.9, spo2: 94, heartRate: 91 },
    ],
  },
  {
    id: "maami",
    name: "Maami",
    familyRole: "mother-in-law",
    relation: "66Y · O+ · 60.5 kg · 160 cm",
    risk: "good",
    initial: "M",
    parentOf: "neema",
    conditions: [],
    vitals: [
      { m: "Mar", sys: 116, dia: 74, sugar: 86, steps: 5200, cal: 1620, hba1c: 5.5, bmi: 23.0, weight: 59.8, water: 1.5, spo2: 97, heartRate: 74 },
      { m: "Apr", sys: 117, dia: 75, sugar: 87, steps: 5400, cal: 1640, hba1c: 5.4, bmi: 23.1, weight: 60.0, water: 1.6, spo2: 97, heartRate: 73 },
      { m: "May", sys: 115, dia: 73, sugar: 85, steps: 5500, cal: 1630, hba1c: 5.5, bmi: 23.1, weight: 60.1, water: 1.6, spo2: 97, heartRate: 75 },
      { m: "Jun", sys: 118, dia: 75, sugar: 88, steps: 5300, cal: 1610, hba1c: 5.4, bmi: 23.2, weight: 60.3, water: 1.6, spo2: 97, heartRate: 74 },
      { m: "Jul", sys: 116, dia: 74, sugar: 86, steps: 5600, cal: 1650, hba1c: 5.5, bmi: 23.3, weight: 60.4, water: 1.7, spo2: 97, heartRate: 76 },
      { m: "Aug", sys: 116, dia: 74, sugar: 86, steps: 5700, cal: 1660, hba1c: 5.4, bmi: 23.4, weight: 60.5, water: 1.7, spo2: 97, heartRate: 75 },
    ],
  },
];

const RISK_PARAMS = [
  { label: "HbA1c", member: "Appa", status: "risk", value: "7.8%", note: "Rising 3 months running", dir: "up" },
  { label: "Blood Pressure", member: "Appa", status: "risk", value: "138/89", note: "Above target range", dir: "up" },
  { label: "Vitamin D", member: "Yathi", status: "attention", value: "18 ng/mL", note: "Below normal", dir: "down" },
  { label: "LDL Cholesterol", member: "Amma", status: "attention", value: "142 mg/dL", note: "Borderline high", dir: "up" },
  { label: "Bone Density", member: "Amma", status: "attention", value: "T-score -1.6", note: "Osteopenia range", dir: "down" },
];

// CBC (Complete Blood Count) report \u2014 same convention as RISK_PARAMS: only the parameters
// outside normal range are listed, so the section stays focused on what actually needs attention.
const CBC_REPORTS = {
  appa: [
    { param: "Hemoglobin", value: "11.8 g/dL", range: "13.5\u201317.5 g/dL", status: "attention", note: "Mildly low \u2014 worth monitoring alongside his diabetes management", date: "Aug 15" },
    { param: "Hematocrit (PCV)", value: "38%", range: "40\u201354%", status: "attention", note: "Slightly below normal range", date: "Aug 15" },
  ],
  maama: [
    { param: "Hemoglobin", value: "12.6 g/dL", range: "13\u201317 g/dL", status: "attention", note: "Mildly low, consistent with his age and recent bloodwork", date: "Jul 28" },
  ],
};

const PENDING_TESTS = [
  { label: "Lipid Profile", member: "Appa", due: "Overdue · 12 days", urgent: true },
  { label: "Diabetic Retinopathy Screening", member: "Appa", due: "Due in 5 days", urgent: true },
  { label: "DEXA Bone Density", member: "Amma", due: "Recommended · last done 14 mo ago", urgent: false },
  { label: "Thyroid Panel (TSH)", member: "Yathi", due: "Due in 3 weeks", urgent: false },
  { label: "Annual Vision Check", member: "Aadyaa", due: "Due in 2 months", urgent: false },
];

const TEST_INFO = {
  "Lipid Profile": "A blood test measuring cholesterol and triglycerides. It helps assess heart disease risk \u2014 especially important alongside existing hypertension or diabetes.",
  "Diabetic Retinopathy Screening": "An eye exam that checks for damage to the retina's blood vessels, a common complication of long-term diabetes. Usually recommended annually for diabetics.",
  "DEXA Bone Density": "A low-dose X-ray scan that measures bone mineral density, used to detect osteopenia or osteoporosis before a fracture occurs.",
  "Thyroid Panel (TSH)": "A blood test measuring thyroid-stimulating hormone, used to check whether the thyroid gland is under- or overactive.",
  "Annual Vision Check": "A routine eye exam to check visual acuity and catch any developing vision issues early, especially important during a child's growth years.",
};

const MEDICATIONS = [
  { name: "Metformin 500mg", member: "Appa", schedule: "Twice daily, after meals", daysLeft: 6, prescription: "Prescribed by Dr. Rao \u2014 Diabetes Management, Mar 2024", summary: "First-line medication for Type 2 Diabetes, taken twice daily with meals. Prescribed to help lower blood sugar as part of his ongoing diabetes management plan." },
  { name: "Telmisartan 40mg", member: "Appa", schedule: "Once daily, morning", daysLeft: 3, prescription: "Prescribed by Dr. Mishra \u2014 Cardiology Follow-up, Aug 2026", summary: "Blood pressure medication, dose reduced to 20mg-equivalent guidance at his last cardiology visit after a reading of 138/89 \u2014 taken once daily each morning." },
  { name: "Atorvastatin 10mg", member: "Amma", schedule: "Once daily, night", daysLeft: 18, prescription: "Prescribed by Dr. Rao \u2014 Annual Checkup, Jan 2026", summary: "Statin prescribed after her lipid profile showed borderline-high LDL cholesterol. Taken once nightly to help lower cholesterol and reduce long-term heart disease risk." },
  { name: "Calcium + D3", member: "Amma", schedule: "Once daily, morning", daysLeft: 24, prescription: "Prescribed by Dr. Rao \u2014 following DEXA scan, Mar 2026", summary: "Started after her DEXA scan showed early bone density loss (osteopenia). Taken once daily in the morning to support bone strength." },
  { name: "Levothyroxine 50mcg", member: "Yathi", schedule: "Once daily, empty stomach", daysLeft: 9, prescription: "Prescribed by Dr. Rao \u2014 Annual Checkup, Jan 2026", summary: "Thyroid hormone replacement, taken once daily on an empty stomach for best absorption. Prescribed based on his annual checkup bloodwork." },
];

const MEDICATION_INFO = {
  "Metformin 500mg": "A first-line medication for Type 2 Diabetes. It helps lower blood sugar by improving how the body responds to insulin and reducing sugar production in the liver.",
  "Telmisartan 40mg": "A blood pressure medication (an ARB) that relaxes blood vessels, making it easier for the heart to pump blood and lowering overall blood pressure.",
  "Atorvastatin 10mg": "A statin used to lower LDL (\"bad\") cholesterol, reducing the risk of heart disease and stroke over time.",
  "Calcium + D3": "A supplement combining calcium and Vitamin D, which helps the body absorb calcium \u2014 commonly used to support bone density, especially with osteopenia.",
  "Levothyroxine 50mcg": "A thyroid hormone replacement, used when the thyroid isn't producing enough hormone on its own (hypothyroidism) to keep metabolism functioning normally.",
};

const EXPENSE_CATEGORIES = [
  { label: "Insurance Premiums", amount: 24000, color: "green" },
  { label: "Medicines", amount: 18400, color: "coral" },
  { label: "Diagnostics & Tests", amount: 12600, color: "teal" },
  { label: "Doctor Consultations", amount: 8200, color: "marigold" },
  { label: "Hospitalization", amount: 6000, color: "textFaint" },
];

const MEMBER_EXPENSES = {
  appa: 27500,
  amma: 17000,
  yathi: 15200,
  neema: 11800,
  aadyaa: 9500,
  niyathi: 6200,
  maama: 14200,
  maami: 8900,
};

const UPCOMING_COSTS = [
  { label: "Medication refills", period: "Next 12 months", amount: 42000, member: "Appa & Amma" },
  { label: "Appa's cardiology follow-ups", period: "Next 6 months", amount: 15000, member: "Appa" },
  { label: "Pending tests & checkups", period: "Next 6 months", amount: 18500, member: "Whole family" },
  { label: "Insurance premium renewal", period: "Due in 42 days", amount: 28000, member: "Family policy", isPremium: true },
];

const COST_FORECAST_SUMMARY = {
  premium: 28000,
  medicalSpend: 75500,
  estCoveredPct: 0.7,
};

const NEARBY_PLACES = [
  {
    name: "Apollo Hospital",
    type: "Hospital · Cardiology",
    distance: "1.2 km",
    insured: true,
    recommend: "Recommended for Appa's cardio care",
    x: 68, y: 34,
  },
  {
    name: "Fortis Emergency",
    type: "Hospital · 24x7 Emergency",
    distance: "2.1 km",
    insured: true,
    emergency: true,
    x: 82, y: 62,
  },
  {
    name: "Cloudnine Clinic",
    type: "General Clinic",
    distance: "0.8 km",
    insured: true,
    x: 34, y: 40,
  },
  {
    name: "MedPlus Pharmacy",
    type: "Pharmacy",
    distance: "0.4 km",
    insured: false,
    x: 44, y: 62,
  },
  {
    name: "Manipal Hospital",
    type: "Hospital · Multi-specialty",
    distance: "3.0 km",
    insured: true,
    x: 22, y: 74,
  },
];

const EMERGENCY_CONTACTS = [
  { label: "Ambulance", value: "108" },
  { label: "Family Doctor \u2014 Dr. Rao", value: "+91 98450 12233" },
];

const FAMILY_DOCTORS = {
  appa: [
    { name: "Dr. Mishra", specialty: "Cardiologist" },
    { name: "Dr. Rao", specialty: "Family Physician" },
  ],
  amma: [
    { name: "Dr. Reddy", specialty: "Ophthalmologist" },
    { name: "Dr. Rao", specialty: "Family Physician" },
  ],
  yathi: [
    { name: "Dr. Rao", specialty: "Family Physician" },
  ],
  neema: [
    { name: "Dr. Rao", specialty: "Family Physician" },
  ],
  aadyaa: [
    { name: "Dr. Sharma", specialty: "Pediatrician" },
  ],
  niyathi: [
    { name: "Dr. Sharma", specialty: "Pediatrician" },
  ],
};

const DOCTOR_CHATS = [
  {
    doctor: "Dr. Mishra",
    specialty: "Cardiologist",
    member: "Appa",
    lastPreview: "Let's reduce Telmisartan to 20mg for now...",
    lastTime: "10:20 AM",
    unread: true,
    messages: [
      { from: "user", text: "Hi Dr. Mishra, should Appa continue the Telmisartan 40mg, or has anything changed since his last visit?", time: "10:12 AM" },
      { from: "doctor", text: "Good question. Given his last BP readings, let's reduce Telmisartan to 20mg for now.", time: "10:19 AM" },
      { from: "doctor", text: "Also, please get a fresh kidney function and lipid panel done this week before we adjust further.", time: "10:20 AM" },
      { from: "user", text: "Understood, I'll get the tests booked through the app and share the reports here.", time: "10:22 AM" },
    ],
  },
  {
    doctor: "Dr. Rao",
    specialty: "Family Physician",
    member: "Family",
    lastPreview: "Thanks, reviewed it. HbA1c is trending up slightly...",
    lastTime: "Yesterday",
    unread: false,
    messages: [
      { from: "user", text: "Sharing Appa's latest blood test report for your review.", time: "Yesterday, 4:02 PM", attachment: "HbA1c & Lipid Panel \u2014 Aug 12" },
      { from: "doctor", text: "Thanks, reviewed it. HbA1c is trending up slightly \u2014 let's discuss adjusting his diet plan at the next visit.", time: "Yesterday, 5:40 PM" },
      { from: "user", text: "Sure, I'll schedule a follow-up for next week.", time: "Yesterday, 5:42 PM" },
    ],
  },
  {
    doctor: "Dr. Reddy",
    specialty: "Ophthalmologist",
    member: "Amma",
    lastPreview: "Vision looks stable. Continue the same drops.",
    lastTime: "2 days ago",
    unread: false,
    messages: [
      { from: "user", text: "Amma's follow-up eye check is done. Any changes needed to her drops?", time: "2 days ago" },
      { from: "doctor", text: "Vision looks stable. Continue the same drops, and see me again in 6 months.", time: "2 days ago" },
    ],
  },
];

const DIET_PLANS = {
  appa: {
    dietType: "Diabetic & Low-Sodium Diet",
    calorieTarget: 1800,
    caloriesToday: 1420,
    recommended: ["Whole grains (brown rice, oats)", "Leafy greens", "Grilled fish or chicken", "Bitter gourd, methi", "Nuts (unsalted, small portions)"],
    avoid: ["Added sugar & sweets", "Fried & salty snacks", "White rice/refined carbs", "Processed/packaged food"],
    tip: "Splitting meals into smaller, more frequent portions can help keep blood sugar steadier through the day.",
  },
  amma: {
    dietType: "Calcium & Vitamin D Rich Diet",
    calorieTarget: 1600,
    caloriesToday: 1180,
    recommended: ["Milk, curd, paneer", "Ragi & sesame (til)", "Leafy greens", "Eggs", "Almonds"],
    avoid: ["Excess caffeine", "High-sodium pickles/papad", "Carbonated drinks"],
    tip: "Getting some morning sunlight alongside calcium-rich foods helps the body absorb vitamin D better.",
  },
  yathi: {
    dietType: "Balanced Adult Diet",
    calorieTarget: 2200,
    caloriesToday: 1950,
    recommended: ["Lean protein", "Whole grains", "Seasonal fruits & vegetables", "Healthy fats (nuts, olive oil)"],
    avoid: ["Excess processed sugar", "Late-night heavy meals"],
    tip: "Given the low Vitamin D flagged in Trends, a bit more sun exposure and fortified foods could help.",
  },
  neema: {
    dietType: "Balanced Adult Diet",
    calorieTarget: 2000,
    caloriesToday: 1780,
    recommended: ["Lean protein", "Whole grains", "Colorful vegetables", "Fruits"],
    avoid: ["Sugary beverages", "Fried snacks"],
    tip: "Staying consistent with meal timing supports steady energy through the day.",
  },
  aadyaa: {
    dietType: "Balanced Growth Diet (peanut-free)",
    calorieTarget: 1400,
    caloriesToday: 1210,
    recommended: ["Milk & dairy", "Eggs", "Fruits", "Whole grains", "Vegetables, finely cut"],
    avoid: ["Peanuts & peanut-containing snacks", "Sugary drinks & candy"],
    tip: "Always double-check packaged snacks for peanut traces before giving them to Aadyaa.",
  },
  niyathi: {
    dietType: "Toddler Nutrition Plan",
    calorieTarget: 1100,
    caloriesToday: 980,
    recommended: ["Milk & dairy", "Soft-cooked vegetables", "Mashed fruits", "Rice & dal", "Eggs"],
    avoid: ["Whole nuts (choking risk)", "Added sugar & salt", "Honey (under age 1 rule, if relevant)"],
    tip: "At this age, small frequent meals usually work better than 3 large ones.",
  },
  maama: {
    dietType: "Low-Sodium, Heart-Healthy Diet",
    calorieTarget: 1900,
    caloriesToday: 1640,
    recommended: ["Fruits & vegetables", "Whole grains", "Fish", "Low-fat dairy", "Nuts (unsalted)"],
    avoid: ["Added salt & salty snacks", "Pickles & papad", "Red meat (limit)"],
    tip: "Cooking with herbs and spices instead of extra salt can make low-sodium meals taste just as good.",
  },
  maami: {
    dietType: "Balanced Senior Diet",
    calorieTarget: 1700,
    caloriesToday: 1520,
    recommended: ["Dairy & calcium-rich foods", "Fruits & vegetables", "Whole grains", "Lean protein"],
    avoid: ["Excess sugar", "Overly processed foods"],
    tip: "Staying well-hydrated matters more with age, even when thirst cues feel less obvious.",
  },
};

const CARE_PLANS = {
  appa: {
    title: "Diabetes & Hypertension Care Plan",
    items: [
      { task: "HbA1c test", freq: "Every 3 months", status: "done", note: "Done Aug 12" },
      { task: "Lipid profile", freq: "Every 6 months", status: "done", note: "Done Jul 02" },
      { task: "Blood pressure check", freq: "Monthly", status: "done", note: "Done Aug 20" },
      { task: "Diabetic eye exam (retinopathy)", freq: "Annually", status: "overdue", note: "Overdue by 5 days" },
      { task: "Foot examination", freq: "Every 6 months", status: "pending", note: "Due in 3 weeks" },
    ],
  },
  amma: {
    title: "Bone Health Care Plan",
    items: [
      { task: "Calcium & Vitamin D levels", freq: "Annually", status: "done", note: "Done Mar 10" },
      { task: "DEXA bone density scan", freq: "Annually", status: "overdue", note: "Last done 14 months ago" },
      { task: "Physiotherapy check-in", freq: "Quarterly", status: "pending", note: "Due in 2 weeks" },
    ],
  },
  yathi: {
    title: "General Wellness Plan",
    items: [
      { task: "Annual full body checkup", freq: "Annually", status: "done", note: "Done Jan 15" },
      { task: "Vitamin D levels", freq: "Annually", status: "overdue", note: "Below normal range" },
      { task: "Thyroid panel (TSH)", freq: "Annually", status: "pending", note: "Due in 3 weeks" },
    ],
  },
  aadyaa: {
    title: "Child Vaccination Schedule",
    items: [
      { task: "MMR \u2014 2nd dose", freq: "Age 4\u20136", status: "done", note: "Given at age 5" },
      { task: "Vision screening", freq: "Annually", status: "done", note: "Done May 30" },
      { task: "DTaP booster", freq: "Age 4\u20136", status: "overdue", note: "Not yet given, now age 6" },
      { task: "Annual flu shot", freq: "Yearly", status: "pending", note: "Due in 2 months" },
    ],
  },
  niyathi: {
    title: "Child Vaccination Schedule",
    items: [
      { task: "MMR \u2014 1st dose", freq: "Age 1", status: "done", note: "Given at age 1" },
      { task: "DTaP \u2014 3rd dose", freq: "Age 2\u20133", status: "done", note: "Given at age 2" },
      { task: "Annual flu shot", freq: "Yearly", status: "pending", note: "Due in 1 month" },
    ],
  },
};

// Pending actions across the family, hand-classified by urgency for the Home dashboard.
// Deliberately sourced from CARE_PLANS + POST_OP_CARE + MEDICATIONS only (not RISK_PARAMS),
// since RISK_PARAMS often describes the same underlying issue as a care-plan item and would
// otherwise show up twice with two different severities.
const SERVICE_CATEGORIES = ["All", "Physiotherapy", "Yoga", "Health Checkup"];

const SERVICE_PROVIDERS = [
  {
    category: "Physiotherapy",
    name: "Dr. Sanjana Rao",
    subtitle: "Certified Physiotherapist \u2014 home visits",
    phone: "+91 98450 11223",
    price: "\u20B9800 / session",
    rating: 4.8,
  },
  {
    category: "Physiotherapy",
    name: "HomeCare Physio Services",
    subtitle: "Post-surgery & elderly mobility care",
    phone: "+91 98450 33445",
    price: "\u20B9700 / session",
    rating: 4.6,
  },
  {
    category: "Yoga",
    name: "Ananya Krishnan",
    subtitle: "Certified Yoga Instructor \u2014 home sessions",
    phone: "+91 98450 55667",
    price: "\u20B9600 / session",
    rating: 4.9,
  },
  {
    category: "Yoga",
    name: "Prana Yoga Home Studio",
    subtitle: "Gentle yoga for seniors & beginners",
    phone: "+91 98450 77889",
    price: "\u20B9500 / session",
    rating: 4.7,
  },
  {
    category: "Health Checkup",
    name: "Apollo HomeCare",
    subtitle: "Full body checkup, blood tests at home",
    phone: "+91 1860 500 1066",
    price: "From \u20B91,200",
    rating: 4.5,
  },
  {
    category: "Health Checkup",
    name: "Metropolis Home Collection",
    subtitle: "Lab sample collection at home",
    phone: "+91 1800 419 1414",
    price: "From \u20B9400",
    rating: 4.4,
  },
];

// Yathi's own Task Manager \u2014 things to physically do (call, order, book), each with a real date,
// distinct from PENDING_ACTIONS which is the family-wide clinical priority view.
function dateStr(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
function todayStr() {
  return dateStr(0);
}
function formatTaskDate(iso) {
  const today = todayStr();
  const tomorrow = dateStr(1);
  const yesterday = dateStr(-1);
  if (iso === today) return "Today";
  if (iso === tomorrow) return "Tomorrow";
  if (iso === yesterday) return "Yesterday";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function buildInitialTasks() {
  return [
    { id: 1, task: "Refill Metformin for Appa", date: dateStr(0), done: true },
    { id: 2, task: "Buy Levothyroxine for Yathi", date: dateStr(0), done: true },
    { id: 3, task: "Schedule Amma's DEXA scan", date: dateStr(-1), done: true },
    { id: 4, task: "Book cardiology follow-up for Appa", date: dateStr(0), done: false },
    { id: 5, task: "Order Telmisartan refill for Appa", date: dateStr(1), done: false },
    { id: 6, task: "Pay family insurance premium", date: dateStr(3), done: false },
    { id: 7, task: "Pick up Niyathi's vaccination record", date: dateStr(5), done: false },
  ];
}

const PENDING_ACTIONS = {
  high: [
    { label: "Diabetic eye exam (retinopathy)", member: "Appa", note: "Overdue by 5 days" },
    { label: "DEXA bone density scan", member: "Amma", note: "Last done 14 months ago" },
    { label: "Vitamin D levels", member: "Yathi", note: "Below normal range" },
    { label: "DTaP booster", member: "Aadyaa", note: "Not yet given, now age 6" },
    { label: "6-month follow-up angiogram", member: "Appa", note: "Due 2 weeks ago" },
    { label: "Reorder Telmisartan 40mg", member: "Appa", note: "3 days left" },
  ],
  medium: [
    { label: "Foot examination", member: "Appa", note: "Due in 3 weeks" },
    { label: "Physiotherapy check-in", member: "Amma", note: "Due in 2 weeks" },
    { label: "Thyroid panel (TSH)", member: "Yathi", note: "Due in 3 weeks" },
    { label: "Annual flu shot", member: "Niyathi", note: "Due in 1 month" },
    { label: "Cardiac rehab sessions", member: "Appa", note: "6 of 12 completed" },
    { label: "Reorder Metformin 500mg", member: "Appa", note: "6 days left" },
    { label: "Reorder Levothyroxine 50mcg", member: "Yathi", note: "9 days left" },
    { label: "Insurance premium renewal", member: "Family", note: "Renews in 42 days" },
  ],
  low: [
    { label: "Annual flu shot", member: "Aadyaa", note: "Due in 2 months" },
    { label: "Reorder Atorvastatin 10mg", member: "Amma", note: "18 days left" },
  ],
};

const HEALTH_TIPS = [
  "Drink a glass of water first thing in the morning \u2014 it's an easy way to start rehydrating after a night's sleep.",
  "Aim for at least 20\u201330 minutes of walking today. Even a short walk after meals can help steady blood sugar levels.",
  "Take medications at the same time each day \u2014 consistency matters more than the exact hour for most prescriptions.",
  "Sitting for long stretches? Stand up and stretch for a minute every hour \u2014 it helps circulation and posture.",
  "A handful of nuts or fruit makes a better snack than packaged chips \u2014 small swaps add up over a week.",
  "Getting 7\u20138 hours of sleep supports everything from mood to blood pressure \u2014 try to protect your bedtime tonight.",
  "Check in on an elderly family member today \u2014 a quick call can catch small issues before they become big ones.",
  "Wash your hands before meals and after being out \u2014 still one of the simplest ways to avoid getting sick.",
  "If you haven't had your annual checkup this year, today's a good day to book one.",
  "Reduce added salt where you can \u2014 it's one of the easiest changes for long-term blood pressure health.",
  "Screen time before bed can affect sleep quality \u2014 try winding down without a phone for the last 30 minutes.",
  "Stretch your neck and shoulders for a minute if you've been on a screen for a while \u2014 tension builds up quietly.",
  "Fresh air and a short walk outside can lift mood as much as it helps the body \u2014 even 10 minutes counts.",
  "If someone in the family has an upcoming test or appointment, a gentle reminder today can help them prepare.",
  "Eating slowly and without distraction can improve digestion and help you notice when you're actually full.",
  "A few deep breaths before a stressful moment can lower heart rate and help you think more clearly.",
];

function getTodaysTip() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return HEALTH_TIPS[dayOfYear % HEALTH_TIPS.length];
}

const GAME_CATEGORIES = [
  { key: "memory", label: "Memory", icon: Brain, color: "teal" },
  { key: "reading", label: "Reading", icon: BookOpen, color: "marigold" },
  { key: "thinking", label: "Thinking", icon: Lightbulb, color: "coral" },
  { key: "hearing", label: "Hearing", icon: Ear, color: "green" },
];

// Each category's history is a 0-100 "performance score" per day, Mon-Sun, so categories
// can be fairly compared against each other to surface what's strong vs. what needs practice.
const COGNITIVE_HISTORY = {
  appa: {
    totalMinutes: 38,
    memory:   [62, 68, 64, 72, 70, 75, 78],
    reading:  [55, 58, 56, 60, 58, 62, 64],
    thinking: [40, 42, 45, 43, 46, 48, 50],
    hearing:  [58, 60, 62, 64, 63, 66, 68],
  },
  amma: {
    totalMinutes: 29,
    memory:   [50, 52, 55, 53, 56, 58, 60],
    reading:  [68, 70, 72, 74, 73, 76, 78],
    thinking: [52, 54, 53, 56, 58, 57, 60],
    hearing:  [42, 44, 43, 46, 45, 48, 50],
  },
};
const COGNITIVE_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const RECENT_UPLOADS = [
  { t: "HbA1c Panel", who: "Appa", when: "Aug 12", lab: "SRL Diagnostics", summary: "HbA1c rose from 7.3% to 7.8%, above the 7% target for his age group. Suggests blood sugar control has weakened slightly since the last panel \u2014 worth discussing at the next visit." },
  { t: "Lipid Profile", who: "Appa", when: "Jul 02", lab: "SRL Diagnostics", summary: "LDL cholesterol is borderline high at 142 mg/dL. Triglycerides and HDL are within normal range. No immediate action needed, but worth monitoring alongside diet." },
  { t: "ECG Report", who: "Appa", when: "Jun 18", lab: "Apollo Hospital, Bengaluru", summary: "Mild strain pattern noted, consistent with his existing hypertension history. No signs of acute abnormality \u2014 reviewed as part of his routine cardiology follow-up." },
  { t: "Calcium & Vitamin D Panel", who: "Amma", when: "Mar 10", lab: "Metropolis Healthcare", summary: "Both calcium and Vitamin D came back slightly below optimal range, consistent with her osteopenia diagnosis. Supplementation already underway based on this result." },
  { t: "Annual Full Body Checkup", who: "Yathi", when: "Jan 15", lab: "Manipal Hospital", summary: "Overall results are healthy. Vitamin D came back below normal range \u2014 the only flagged item \u2014 everything else including sugar, lipids, and organ function markers is within range." },
  { t: "Vision Screening", who: "Aadyaa", when: "May 30", lab: "Narayana Nethralaya", summary: "Vision is within normal range for her age. No corrective lenses needed at this time \u2014 routine annual screening recommended to continue." },
];

const SURGICAL_HISTORY = {
  appa: [
    {
      procedure: "Coronary Angioplasty (Stent)",
      category: "Cardiac",
      date: "Mar 2024",
      detail: "Drug-eluting stent \u2014 LAD artery",
      hospital: "Apollo Hospital, Bengaluru",
      doctor: "Dr. Mishra \u2014 Cardiologist",
      outcome: "Successful, no complications. Discharged after 3 days and started on antiplatelet therapy and a cardiac rehab program.",
      report: "ECG Report",
      summary: "ECG shows a mild strain pattern consistent with his hypertension history \u2014 no acute abnormality. Reviewed as part of his cardiology follow-up after the stent procedure.",
    },
  ],
  amma: [
    {
      procedure: "Cataract Surgery",
      category: "Ophthalmic",
      date: "Jan 2023",
      detail: "Left eye \u2014 IOL implant",
      hospital: "Narayana Nethralaya",
      doctor: "Dr. Reddy \u2014 Ophthalmologist",
      outcome: "Successful IOL implant. Vision recovered to 20/20 within 6 weeks, no follow-up complications.",
      report: "Cataract Surgery Discharge Summary",
      summary: "IOL implant went smoothly with no complications noted. Vision recovered to 20/20 within six weeks, confirmed at the follow-up visit.",
    },
  ],
  yathi: [
    {
      procedure: "Appendectomy",
      category: "General Surgery",
      date: "Sep 2016",
      detail: "Laparoscopic, uncomplicated",
      hospital: "Manipal Hospital",
      doctor: "Dr. Ashok Kumar \u2014 General Surgeon",
      outcome: "Uncomplicated recovery. Discharged within 2 days and resumed normal activity in about 2 weeks.",
      report: "Appendectomy Discharge Summary",
      summary: "Laparoscopic appendectomy with an uncomplicated recovery. Discharged within two days, cleared to resume normal activity within about two weeks.",
    },
  ],
  maama: [
    {
      procedure: "Knee Arthroscopy (Right Knee)",
      category: "Orthopedic",
      date: "Nov 2019",
      detail: "Minor cartilage repair, day-care procedure",
      hospital: "Fortis Hospital, Bengaluru",
      doctor: "Dr. Prakash \u2014 Orthopedic Surgeon",
      outcome: "Successful, mild residual stiffness noted at follow-up \u2014 consistent with his current joint-mobility flag.",
      report: "Knee X-Ray Report",
      summary: "X-ray confirms the cartilage repair has healed well, with mild residual joint stiffness \u2014 consistent with the mobility flag noted on his current Body Health Map.",
    },
  ],
  maami: [
    {
      procedure: "Cataract Surgery (Right Eye)",
      category: "Ophthalmic",
      date: "Aug 2021",
      detail: "IOL implant, day-care procedure",
      hospital: "Narayana Nethralaya",
      doctor: "Dr. Reddy \u2014 Ophthalmologist",
      outcome: "Successful, vision restored with no complications. Continues routine annual eye checks.",
      report: "Cataract Surgery Discharge Summary",
      summary: "IOL implant completed without complications. Vision fully restored \u2014 continues with routine annual eye checks as a precaution, not due to any ongoing concern.",
    },
  ],
};

const POST_OP_CARE = [
  {
    procedure: "Coronary Angioplasty (Stent)",
    member: "Appa",
    items: [
      { task: "1-week post-op follow-up", status: "done", note: "Completed Mar 22" },
      { task: "Antiplatelet medication adherence", status: "done", note: "On track, no missed doses" },
      { task: "Cardiac rehab sessions", status: "pending", note: "6 of 12 sessions completed" },
      { task: "6-month follow-up angiogram", status: "overdue", note: "Due 2 weeks ago" },
    ],
  },
  {
    procedure: "Cataract Surgery (Left Eye)",
    member: "Amma",
    items: [
      { task: "1-week post-op check", status: "done", note: "Completed Jan 18, 2023" },
      { task: "Eye drop regimen", status: "done", note: "Full course completed" },
      { task: "Final vision assessment", status: "done", note: "20/20 achieved" },
    ],
  },
];

const EMERGENCY_PROFILES = {
  appa: {
    bloodType: "B+",
    allergies: ["Penicillin"],
    conditions: ["Type 2 Diabetes", "Hypertension"],
    ids: [
      { type: "Aadhaar Card", status: "verified" },
      { type: "PAN Card", status: "verified" },
      { type: "Passport", status: "verified" },
      { type: "Driving License", status: "verified" },
    ],
  },
  amma: {
    bloodType: "O+",
    allergies: ["None known"],
    conditions: ["Osteopenia"],
    ids: [
      { type: "Aadhaar Card", status: "verified" },
      { type: "PAN Card", status: "verified" },
    ],
  },
  yathi: {
    bloodType: "A+",
    allergies: ["None known"],
    conditions: [],
    ids: [
      { type: "Aadhaar Card", status: "verified" },
      { type: "PAN Card", status: "verified" },
      { type: "Passport", status: "verified" },
      { type: "Driving License", status: "verified" },
    ],
  },
  neema: {
    bloodType: "O+",
    allergies: ["None known"],
    conditions: [],
    ids: [
      { type: "Aadhaar Card", status: "verified" },
      { type: "PAN Card", status: "verified" },
      { type: "Passport", status: "verified" },
      { type: "Driving License", status: "verified" },
    ],
  },
  aadyaa: {
    bloodType: "B+",
    allergies: ["Peanuts"],
    conditions: [],
    ids: [
      { type: "Aadhaar Card", status: "verified" },
      { type: "Birth Certificate", status: "verified" },
    ],
  },
  niyathi: {
    bloodType: "O+",
    allergies: ["None known"],
    conditions: [],
    ids: [
      { type: "Birth Certificate", status: "verified" },
    ],
  },
  maama: {
    bloodType: "B+",
    allergies: ["None known"],
    conditions: ["Hypertension"],
    ids: [
      { type: "Aadhaar Card", status: "verified" },
      { type: "PAN Card", status: "verified" },
    ],
  },
  maami: {
    bloodType: "O+",
    allergies: ["None known"],
    conditions: [],
    ids: [
      { type: "Aadhaar Card", status: "verified" },
    ],
  },
};

const EMERGENCY_INSURANCE = {
  policy: "Family Floater \u2014 HDFC Ergo",
  number: "#FH-882914",
  covers: "Appa, Amma, Yathi, Neema, Aadyaa & Niyathi",
  sumInsured: "\u20B910,00,000",
};

const PARENTS_CARE_CIRCLE = [
  { name: "Yathi", relation: "You \u2014 Owner", status: "owner", initial: "Y" },
  { name: "Dr. Hemanth", relation: "Brother", status: "accepted", initial: "H" },
  { name: "Dr. Kripa", relation: "Sister", status: "invited", initial: "K" },
];

const COMMUNITY_REQUESTS = [
  {
    name: "Ramesh Gupta",
    bloodType: "O-",
    need: "Urgent blood requirement \u2014 surgery tomorrow",
    location: "Fortis Hospital, Bengaluru",
    time: "2 hours ago",
  },
];

const COMMUNITY_MEMBERS = [
  { name: "Ravi Kumar", bloodType: "O+", distance: "1.5 km", available: true },
  { name: "Priya Singh", bloodType: "B+", distance: "2.3 km", available: true },
  { name: "Arjun Mehta", bloodType: "A+", distance: "0.9 km", available: false },
  { name: "Sneha Iyer", bloodType: "AB+", distance: "3.1 km", available: true },
];

const INSURANCE_RECS = [
  {
    category: "Family Health Floater",
    iconKey: "shield",
    current: 1000000,
    recommended: 1500000,
    status: "gap",
    reason: "Two family members are 60+ with ongoing conditions (diabetes, hypertension, osteopenia) \u2014 a higher sum insured reduces out-of-pocket risk during hospitalization.",
  },
  {
    category: "Term Life Insurance \u2014 You",
    iconKey: "landmark",
    current: 0,
    recommended: 15000000,
    status: "missing",
    reason: "As the primary earner supporting two parents and a child, a term cover of 15\u201320x annual income helps replace lost income and protect dependents.",
  },
  {
    category: "Critical Illness Rider \u2014 Appa",
    iconKey: "activity",
    current: 0,
    recommended: 500000,
    status: "missing",
    reason: "Appa's cardiac risk profile (hypertension, rising HbA1c) makes a critical illness rider worth considering \u2014 it pays a lump sum on diagnosis, independent of hospitalization costs.",
  },
];

const BODY_SYSTEMS = {
  appa: {
    hearing: "good", vision: "attention", dental: "attention",
    cardio: "risk", respiration: "good", digestion: "attention", liver: "attention",
    kidney: "good", skeletal: "good",
  },
  amma: {
    hearing: "good", mental: "good", vision: "attention", dental: "good",
    cardio: "good", respiration: "good", liver: "good",
    kidney: "good", skeletal: "risk",
  },
  yathi: {
    hearing: "good", mental: "attention", vision: "good", dental: "good",
    cardio: "good", digestion: "good", liver: "good",
    kidney: "attention", skeletal: "good",
  },
  neema: {
    hearing: "good", mental: "good", vision: "good", dental: "good",
    cardio: "good", respiration: "good", digestion: "good",
    skeletal: "good",
  },
  aadyaa: {
    hearing: "good", mental: "good", vision: "good", dental: "attention",
    respiration: "good", digestion: "good",
    skeletal: "good",
  },
  niyathi: {
    hearing: "good", mental: "good", vision: "good", dental: "good",
    digestion: "good",
    skeletal: "good",
  },
  maama: {
    hearing: "attention", mental: "good", vision: "attention", dental: "good",
    cardio: "attention", respiration: "good", liver: "good",
    kidney: "good", skeletal: "attention",
  },
  maami: {
    hearing: "good", mental: "good", vision: "attention", dental: "good",
    cardio: "good", respiration: "good", digestion: "good",
    kidney: "good", skeletal: "good",
  },
};

const SYSTEM_DEFS = [
  { key: "hearing", label: "Hear", side: "left", ax: 178, ay: 45, ly: 50 },
  { key: "mental", label: "Mind", side: "left", ax: 206, ay: 22, ly: 92 },
  { key: "vision", label: "Vision", side: "right", ax: 192, ay: 38, ly: 32 },
  { key: "dental", label: "Dental", side: "right", ax: 203, ay: 58, ly: 62 },
  { key: "cardio", label: "Cardio", side: "right", ax: 188, ay: 95, ly: 94 },
  { key: "respiration", label: "Respiration", side: "right", ax: 213, ay: 95, ly: 126 },
  { key: "digestion", label: "Digestion", side: "right", ax: 190, ay: 130, ly: 158 },
  { key: "liver", label: "Liver", side: "right", ax: 208, ay: 125, ly: 190 },
  { key: "kidney", label: "Kidney", side: "right", ax: 205, ay: 150, ly: 222 },
  { key: "skeletal", label: "Skeletal", side: "right", ax: 196, ay: 300, ly: 300 },
];

// What informed each body-system status: a doctor visit and its outcome, or a report reviewed.
// Same entry shape ({ type, date, doctor, outcome, report }) is reused for dietitian visits below,
// so the same list component can render both consistently.
const SYSTEM_VISIT_LOG = {
  appa: {
    cardio: [
      { type: "doctor", date: "Aug 20", doctor: "Dr. Mishra \u2014 Cardiologist", outcome: "BP reading 138/89, above target. Reduced Telmisartan to 20mg, advised salt reduction and a follow-up kidney/lipid panel.", report: null },
      { type: "report", date: "Jun 18", doctor: null, outcome: "ECG reviewed \u2014 mild strain pattern noted, consistent with existing hypertension history.", report: "ECG Report", summary: "Mild strain pattern noted, consistent with his existing hypertension history. No signs of acute abnormality \u2014 reviewed as part of his routine cardiology follow-up." },
    ],
    vision: [
      { type: "doctor", date: "May 12", doctor: "Dr. Reddy \u2014 Ophthalmologist", outcome: "Diabetic retinopathy screening is now overdue \u2014 flagged for urgent scheduling given his diabetes history.", report: null },
    ],
    dental: [
      { type: "doctor", date: "Mar 02", doctor: "Dr. Rao \u2014 Family Physician", outcome: "Noted early gum sensitivity during a routine visit, recommended a dental checkup.", report: null },
    ],
    liver: [
      { type: "report", date: "Jul 02", doctor: null, outcome: "Lipid panel showed mildly elevated liver enzymes, likely linked to current medication \u2014 monitoring advised at next visit.", report: "Lipid Profile", summary: "LDL cholesterol is borderline high at 142 mg/dL. Triglycerides and HDL are within normal range. No immediate action needed, but worth monitoring alongside diet." },
    ],
  },
  amma: {
    skeletal: [
      { type: "report", date: "Mar 10", doctor: null, outcome: "DEXA scan showed a T-score of -1.6, in the osteopenia range. Calcium & Vitamin D supplementation started.", report: "Calcium & Vitamin D Panel", summary: "Both calcium and Vitamin D came back slightly below optimal range, consistent with her osteopenia diagnosis. Supplementation already underway based on this result." },
    ],
    vision: [
      { type: "doctor", date: "2 days ago", doctor: "Dr. Reddy \u2014 Ophthalmologist", outcome: "Follow-up eye check \u2014 vision stable, continue current drops, review again in 6 months.", report: null },
    ],
  },
  yathi: {
    mental: [
      { type: "doctor", date: "Jan 15", doctor: "Dr. Rao \u2014 Family Physician", outcome: "Discussed stress levels during the annual checkup \u2014 advised a better sleep routine, no medication needed at this stage.", report: null },
    ],
    kidney: [
      { type: "report", date: "Aug 12", doctor: null, outcome: "Vitamin D came back below normal range as part of routine annual bloodwork.", report: "Annual Full Body Checkup", summary: "Overall results are healthy. Vitamin D came back below normal range \u2014 the only flagged item \u2014 everything else including sugar, lipids, and organ function markers is within range." },
    ],
  },
  maama: {
    cardio: [
      { type: "doctor", date: "Jun 2026", doctor: "Local physician", outcome: "Mild hypertension noted on a routine visit, started on a low dose and advised lifestyle changes.", report: null },
    ],
    hearing: [
      { type: "doctor", date: "Apr 2026", doctor: "ENT specialist", outcome: "Mild age-related hearing decline noted \u2014 a hearing aid was discussed as a future option, not urgent yet.", report: null },
    ],
    skeletal: [
      { type: "doctor", date: "Feb 2026", doctor: "Orthopedic", outcome: "Mild joint stiffness reported, recommended gentle daily mobility exercises.", report: null },
    ],
  },
  maami: {
    vision: [
      { type: "doctor", date: "May 2026", doctor: "Ophthalmologist", outcome: "Early presbyopia noted (normal with age) \u2014 reading glasses prescribed.", report: null },
    ],
  },
  aadyaa: {
    dental: [
      { type: "doctor", date: "May 30", doctor: "Dr. Sharma \u2014 Pediatrician", outcome: "A minor cavity was noted during a routine check \u2014 a follow-up filling has been scheduled.", report: null },
    ],
  },
};

const DIET_VISIT_LOG = {
  appa: [
    { type: "doctor", date: "Jul 15", doctor: "Ms. Kavya \u2014 Dietitian", outcome: "Reviewed diet adherence for diabetes \u2014 recommended smaller rice portions and adding more fibre-rich vegetables at dinner.", report: null },
  ],
  amma: [
    { type: "doctor", date: "Mar 10", doctor: "Ms. Kavya \u2014 Dietitian", outcome: "Discussed calcium intake alongside the DEXA results \u2014 added fortified foods and a mid-morning snack to her daily plan.", report: "Calcium & Vitamin D Panel", summary: "Both calcium and Vitamin D came back slightly below optimal range, consistent with her osteopenia diagnosis. Supplementation already underway based on this result." },
  ],
  maama: [
    { type: "doctor", date: "Jun 2026", doctor: "Local dietitian", outcome: "Reviewed sodium intake following his hypertension diagnosis \u2014 suggested cooking with herbs/spices instead of extra salt.", report: null },
  ],
};

const STATUS_COLOR = { risk: C.coral, attention: C.marigold, good: C.green };
const STATUS_DIM = { risk: C.coralDim, attention: C.marigoldDim, good: C.greenDim };
const STATUS_LABEL = { risk: "At risk", attention: "Needs attention", good: "Good" };

const AVATAR_STYLES = {
  appa: { skin: "#F0D3B0", hair: "#2B2118", style: "short" },
  amma: { skin: "#F0D3B0", hair: "#D9D9D9", style: "bun" },
  yathi: { skin: "#F5DDBE", hair: "#4A3626", style: "long" },
  neema: { skin: "#F5DDBE", hair: "#241C14", style: "side" },
  aadyaa: { skin: "#F7E3C6", hair: "#5B4632", style: "bob" },
  niyathi: { skin: "#F7E3C6", hair: "#6B4A2E", style: "pigtails" },
  maama: { skin: "#EFCFA8", hair: "#C9C9C9", style: "short" },
  maami: { skin: "#EFCFA8", hair: "#D9D9D9", style: "bun" },
};

/* Small illustrated cartoon-face avatar, replacing plain initials everywhere a member is shown */
function MemberAvatar({ memberId, size = 32 }) {
  const s = AVATAR_STYLES[memberId] || AVATAR_STYLES.yathi;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={{ display: "block", borderRadius: "50%" }}>
      <circle cx="32" cy="32" r="32" fill={s.skin} />
      <circle cx="24" cy="34" r="2.6" fill="#1A1F2E" />
      <circle cx="40" cy="34" r="2.6" fill="#1A1F2E" />
      <path d="M 24 44 Q 32 50 40 44" stroke="#1A1F2E" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {s.style === "short" && (
        <path d="M 4 26 C 4 8 60 8 60 26 L 60 16 C 54 4 10 4 4 16 Z" fill={s.hair} />
      )}
      {s.style === "bun" && (
        <>
          <path d="M 4 26 C 4 8 60 8 60 26 L 60 16 C 52 4 12 4 4 16 Z" fill={s.hair} />
          <circle cx="32" cy="5" r="7" fill={s.hair} />
        </>
      )}
      {s.style === "long" && (
        <path d="M 2 62 L 2 26 C 2 6 62 6 62 26 L 62 62 L 51 62 L 51 30 L 13 30 L 13 62 Z" fill={s.hair} />
      )}
      {s.style === "side" && (
        <path d="M 6 24 C 6 6 58 6 58 24 L 58 18 C 50 6 32 3 28 3 C 14 3 6 14 6 18 Z" fill={s.hair} />
      )}
      {s.style === "bob" && (
        <path d="M 6 40 L 6 22 C 6 4 58 4 58 22 L 58 40 L 49 40 L 49 24 L 15 24 L 15 40 Z" fill={s.hair} />
      )}
      {s.style === "pigtails" && (
        <>
          <path d="M 8 26 C 8 8 56 8 56 26 L 56 16 C 48 4 16 4 8 16 Z" fill={s.hair} />
          <circle cx="6" cy="32" r="6" fill={s.hair} />
          <circle cx="58" cy="32" r="6" fill={s.hair} />
        </>
      )}
    </svg>
  );
}

/* ---------------------------------------------------------------
   SMALL PRIMITIVES
----------------------------------------------------------------*/
function Pill_({ status, children }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: STATUS_DIM[status], color: STATUS_COLOR[status], fontFamily: FONT_BODY }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_COLOR[status] }} />
      {children}
    </span>
  );
}

function SectionLabel({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-3 mt-6 first:mt-0">
      <h3
        className="text-[11px] tracking-[0.14em] uppercase font-semibold"
        style={{ color: C.textFaint, fontFamily: FONT_BODY }}
      >
        {children}
      </h3>
      {action}
    </div>
  );
}

/* ---------------------------------------------------------------
   FAMILY TREE (signature element)
----------------------------------------------------------------*/
function FamilyTree({ onSelect }) {
  const width = 340;
  const height = 380;
  const nodeR = 24;

  const genOf = (m) => {
    if (["father","mother","father-in-law","mother-in-law"].includes(m.familyRole)) return 0;
    if (m.familyRole === "self" || m.familyRole === "spouse") return 1;
    return 2;
  };
  const gens = { 0: [], 1: [], 2: [] };
  MEMBERS.forEach((m) => gens[genOf(m)].push(m));

  const rowY = { 0: 55, 1: 190, 2: 320 };

  const self = gens[1].find((m) => m.familyRole === "self");
  const spouse = gens[1].find((m) => m.familyRole === "spouse");
  const selfX = 110;
  const spouseX = 230;

  // gen0 splits into two pairs: self's parents (left, above self) and spouse's parents (right, above spouse)
  const selfParents = gens[0].filter((m) => (m.parentOf || "yathi") === "yathi");
  const spouseParents = gens[0].filter((m) => m.parentOf === "neema");

  const positions = {};
  if (self) positions[self.id] = { x: selfX, y: rowY[1] };
  if (spouse) positions[spouse.id] = { x: spouseX, y: rowY[1] };

  const placePair = (pair, centerX) => {
    const spread = 60;
    pair.forEach((m, i) => {
      const x = pair.length === 1 ? centerX : centerX - spread / 2 + (spread / (pair.length - 1)) * i;
      positions[m.id] = { x, y: rowY[0] };
    });
  };
  placePair(selfParents, selfX);
  placePair(spouseParents, spouseX);

  const childSpread = 110;
  const childCenter = self && spouse ? (selfX + spouseX) / 2 : selfX;
  gens[2].forEach((m, i) => {
    const x = gens[2].length === 1 ? childCenter : childCenter - childSpread / 2 + (childSpread / (gens[2].length - 1)) * i;
    positions[m.id] = { x, y: rowY[2] };
  });

  const junctionY = rowY[0] + nodeR + 30;

  const renderParentPair = (pair, childX) => {
    if (pair.length === 0) return null;
    const xs = pair.map((m) => positions[m.id].x);
    const mid = (Math.min(...xs) + Math.max(...xs)) / 2;
    return (
      <>
        {pair.map((m) => (
          <line key={m.id} x1={positions[m.id].x} y1={rowY[0] + nodeR} x2={positions[m.id].x} y2={junctionY} stroke={C.border} strokeWidth="1.5" />
        ))}
        {pair.length > 1 && (
          <line x1={Math.min(...xs)} y1={junctionY} x2={Math.max(...xs)} y2={junctionY} stroke={C.border} strokeWidth="1.5" />
        )}
        <line x1={mid} y1={junctionY} x2={childX} y2={rowY[1] - nodeR} stroke={C.border} strokeWidth="1.5" />
      </>
    );
  };

  return (
    <div className="relative mx-auto" style={{ width, height }}>
      <svg width={width} height={height} className="absolute inset-0">
        {self && renderParentPair(selfParents, positions[self.id].x)}
        {spouse && renderParentPair(spouseParents, positions[spouse.id].x)}
        {/* marriage bar between self and spouse */}
        {self && spouse && (
          <line x1={positions[self.id].x} y1={rowY[1]} x2={positions[spouse.id].x} y2={rowY[1]} stroke={C.border} strokeWidth="1.5" />
        )}
        {/* stems down to children, from the couple's midpoint */}
        {self &&
          gens[2].map((m) => (
            <line
              key={m.id}
              x1={childCenter}
              y1={rowY[1] + nodeR}
              x2={positions[m.id].x}
              y2={rowY[2] - nodeR}
              stroke={C.border}
              strokeWidth="1.5"
            />
          ))}
      </svg>

      {MEMBERS.map((m) => {
        const pos = positions[m.id];
        if (!pos) return null;
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m)}
            className="absolute flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            style={{ left: pos.x - 32, top: pos.y - nodeR, width: 64 }}
          >
            <div
              className="rounded-full flex items-center justify-center relative overflow-hidden"
              style={{
                width: nodeR * 2,
                height: nodeR * 2,
                background: C.surfaceAlt,
                border: `2.5px solid ${STATUS_COLOR[m.risk]}`,
                boxShadow: "0 3px 10px rgba(28,35,51,0.07)",
              }}
            >
              <MemberAvatar memberId={m.id} size={nodeR * 2 - 5} />
            </div>
            <span
              className="text-[11px] font-semibold truncate w-full text-center"
              style={{ color: C.text, fontFamily: FONT_BODY }}
            >
              {m.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------
   WELCOME SCREEN
----------------------------------------------------------------*/
function WelcomeScreen({ onGetStarted }) {
  const [faceId, setFaceId] = useState(null); // null | "scanning" | "success"

  const startFaceId = () => {
    setFaceId("scanning");
    setTimeout(() => setFaceId("success"), 1600);
  };

  useEffect(() => {
    if (faceId === "success") {
      const t = setTimeout(() => onGetStarted(), 900);
      return () => clearTimeout(t);
    }
  }, [faceId]);

  return (
    <div
      className="relative h-full flex flex-col"
      style={{ background: `radial-gradient(120% 60% at 50% 0%, ${C.tealDim} 0%, ${C.bg} 60%)` }}
    >
      {/* small top wordmark */}
      <div className="flex flex-col items-center pt-9 pb-1">
        <div className="flex items-baseline">
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 38, color: C.text }}>n</span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 38, color: C.green }}>ai</span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 38, color: C.text }}>ru</span>
        </div>
        <span style={{ fontFamily: FONT_BODY, fontSize: 14, letterSpacing: "0.24em", color: C.textFaint, marginTop: -3 }}>
          HEALTH
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-4">
        <p
          className="text-center mb-4"
          style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 25, color: C.text }}
        >
          Welcome to
        </p>

        {/* family illustration: nairu spelled across the family, tagline built in */}
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAFoCAYAAADHMkpRAAEAAElEQVR42uy9d4BdV3Uu/q19zrn3Th9JVrFluVfJvXdbYDo2pkhAKCFA4L0EQih5SV5+MDMh4YWQ5CVAivNIAiE0ixKag2m2wdgxNq6yLPduq/eZO/ees9f6/XHObueODQbbzNj7S4Sl0ejOzD3n7L32t771fUBERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERExK8Eim9BRERExJNeE/3Pkyf4PIlvaURERCwAIyIiImbfGkhesSZz7PUjIiIiYgEYERER8SSKsqAgIyJ86EMfSq+99tpk8+bNyT7pyBC39MJcZOF0tzvYnZ5elKaNpQLVIBKlRLRm3tnIGjv7hvq3JsCjqtN5ZMfWrduxcGFxxRVXdEkphsjP/doRERERsQCMiIiIeHrXO1t4vemiixY88uiWxZNTe5Zm/clRWmN5Z3J6ad7tjrLwEISbLNIEkAFoEqkWCIoEREQiwgWIulCUs+YuEU0qop1KqW19fX0PUZrcmuf5Ha2k79H9Vyx69POf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"
          alt="The nairuHealth family — Family Health, Together"
          style={{ width: "92%", maxWidth: 300, height: "auto" }}
        />
        <div className="w-full mt-3" style={{ maxWidth: 230, borderTop: `1px solid ${C.borderSoft}` }} />
      </div>

      {/* bottom CTA block */}
      <div className="px-6 pb-9 pt-2">
        <button
          onClick={startFaceId}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 mb-2.5"
          style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
        >
          <ScanFace size={17} color={C.teal} />
          <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13.5, fontWeight: 600 }}>Log in with Face ID</span>
        </button>

        <button
          onClick={onGetStarted}
          className="w-full rounded-2xl py-3.5 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          style={{ background: `linear-gradient(135deg, ${C.marigold}, #E3492F)`, boxShadow: "0 10px 24px rgba(217,119,10,0.28)" }}
        >
          <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14.5, fontWeight: 600 }}>Get Started</span>
          <ChevronRight size={16} color="#FFFFFF" />
        </button>
      </div>

      {faceId && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5" style={{ background: "rgba(10,14,24,0.94)" }}>
          <div className="relative w-24 h-24 flex items-center justify-center">
            {faceId === "scanning" && (
              <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(23,195,178,0.35)" }} />
            )}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center relative"
              style={{ background: faceId === "success" ? C.green : C.teal }}
            >
              {faceId === "success" ? <CheckCircle2 size={34} color="#FFFFFF" /> : <ScanFace size={34} color="#FFFFFF" />}
            </div>
          </div>
          <p style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14, fontWeight: 500 }}>
            {faceId === "success" ? "Face ID recognized" : "Scanning\u2026"}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   HOME SCREEN
----------------------------------------------------------------*/
/* ---------------------------------------------------------------
   HIGH ALERTS POPUP
----------------------------------------------------------------*/
/* ---------------------------------------------------------------
   UPLOAD SOURCE SHEET (Camera / Photos / Pick a File)
----------------------------------------------------------------*/
function UploadSourceSheet({ onClose, onSelect }) {
  const options = [
    { key: "camera", label: "Use Camera", subtitle: "Snap a report right now", icon: Camera, color: "teal" },
    { key: "photos", label: "Use Photos", subtitle: "Choose from your photo library", icon: ImageIcon, color: "marigold" },
    { key: "files", label: "Pick a File", subtitle: "PDF or scan from your device", icon: FolderOpen, color: "coral" },
  ];
  return (
    <div className="nh-modal-backdrop absolute inset-0 z-40 flex items-end" style={{ background: "rgba(6,9,20,0.72)" }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="nh-modal-card w-full rounded-t-3xl px-5 pt-4 pb-9"
        style={{ background: C.surfaceAlt, borderTop: `1px solid ${C.border}` }}
      >
        <div className="w-9 h-1 rounded-full mx-auto mb-4" style={{ background: C.borderSoft }} />
        <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Add a medical report</p>
        <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12, marginBottom: 16 }}>Choose how you'd like to add it</p>

        <div className="flex flex-col gap-2.5">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left"
              style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: C[opt.color + "Dim"] }}>
                <opt.icon size={19} color={C[opt.color]} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13.5, fontWeight: 600 }}>{opt.label}</p>
                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11 }}>{opt.subtitle}</p>
              </div>
              <ChevronRight size={16} color={C.textFaint} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   DAILY HEALTH TIP POPUP
----------------------------------------------------------------*/
function DailyTipModal({ tip, onClose }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className="absolute inset-0 z-30 flex items-end"
      style={{ background: "rgba(6,9,20,0.6)", opacity: entered ? 1 : 0, transition: "opacity 0.4s ease" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-3xl px-5 pt-4 pb-8"
        style={{
          background: C.surfaceAlt,
          borderTop: `1px solid ${C.border}`,
          transform: entered ? "translateY(0)" : "translateY(24px)",
          opacity: entered ? 1 : 0,
          transition: "transform 0.4s ease, opacity 0.4s ease",
        }}
      >
        <div className="w-9 h-1 rounded-full mx-auto mb-4" style={{ background: C.borderSoft }} />

        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
            <Lightbulb size={20} color={C.teal} />
          </div>
          <div>
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 15, fontWeight: 700 }}>Today's Health Tip</p>
            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        <div className="rounded-2xl px-4 py-3" style={{ background: C.tealDim }}>
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, lineHeight: 1.55 }}>{tip}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-2xl py-3.5 mt-4"
          style={{ background: C.teal }}
        >
          <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14, fontWeight: 600 }}>Got it</span>
        </button>
      </div>
    </div>
  );
}

function HighAlertsModal({ onClose }) {
  const items = PENDING_ACTIONS.high;
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className="absolute inset-0 z-30 flex items-end"
      style={{ background: "rgba(6,9,20,0.72)", opacity: entered ? 1 : 0, transition: "opacity 0.4s ease" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-3xl px-5 pt-4 pb-8"
        style={{
          background: C.surfaceAlt,
          borderTop: `1px solid ${C.border}`,
          transform: entered ? "translateY(0)" : "translateY(24px)",
          opacity: entered ? 1 : 0,
          transition: "transform 0.4s ease, opacity 0.4s ease",
        }}
      >
        <div className="w-9 h-1 rounded-full mx-auto mb-4" style={{ background: C.borderSoft }} />

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: C.coralDim }}>
            <AlertTriangle size={20} color={C.coral} />
          </div>
          <div>
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 15, fontWeight: 700 }}>
              {items.length} thing{items.length === 1 ? "" : "s"} need{items.length === 1 ? "s" : ""} attention
            </p>
            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>Highest priority, across the family</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4" style={{ maxHeight: 320, overflowY: "auto" }}>
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl px-4 py-3" style={{ background: C.coralDim }}>
              <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{item.label}</span>
              <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5, marginTop: 1 }}>
                {item.member} · {item.note}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-2xl py-3.5 mt-4"
          style={{ background: C.marigold }}
        >
          <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14, fontWeight: 600 }}>Got it</span>
        </button>
      </div>
    </div>
  );
}

function HomeScreen({ goMember, goActivity, goCarePlans, goCommunity, goSurgical, goChat, goShareParents, showHighAlerts, setShowHighAlerts, showDailyTip, setShowDailyTip, setDailyTipSeen, todaysTip }) {
  const [tasks, setTasks] = useState(buildInitialTasks);
  const [taskViewOpen, setTaskViewOpen] = useState({ today: true, pending: false });
  const [attentionOpen, setAttentionOpen] = useState({ high: true, medium: false, low: false });
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(todayStr());
  const [voicePhase, setVoicePhase] = useState("idle"); // idle | listening
  const startVoiceFill = () => {
    setVoicePhase("listening");
    setTimeout(() => {
      const examples = [
        { name: "Buy medicines for Appa", offset: 2 },
        { name: "Call Dr. Rao's clinic", offset: 1 },
        { name: "Pick up lab reports", offset: 4 },
        { name: "Refill Amma's Calcium tablets", offset: 3 },
      ];
      const pick = examples[Math.floor(Math.random() * examples.length)];
      setNewTaskName(pick.name);
      setNewTaskDate(dateStr(pick.offset));
      setVoicePhase("idle");
    }, 1600);
  };
  const toggleTask = (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const addTask = () => {
    if (!newTaskName.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), task: newTaskName.trim(), date: newTaskDate || todayStr(), done: false }]);
    setNewTaskName("");
    setNewTaskDate(todayStr());
    setShowAddTask(false);
  };
  const todaysTasks = tasks.filter((t) => t.date === todayStr());
  const pendingTasks = [...tasks].sort((a, b) => a.date.localeCompare(b.date));
  const todayRemaining = todaysTasks.filter((t) => !t.done).length;
  const totalDone = tasks.filter((t) => t.done).length;
  const avgSteps = Math.round(
    MEMBERS.reduce((s, m) => s + m.vitals[m.vitals.length - 1].steps, 0) / MEMBERS.length
  );

  return (
    <div className="px-5 pb-6">
      <div className="pt-6 pb-2">
        <div className="flex items-center justify-between">
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12.5 }}>Good evening, Yathi</p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11 }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 24, fontWeight: 500 }}>
            My Family
          </h1>
          <div className="flex items-center gap-1">
            <button onClick={() => setShowHighAlerts(true)} className="relative p-2">
              <Bell size={20} color={C.textMuted} />
              {PENDING_ACTIONS.high.length > 0 && (
                <span
                  className="absolute top-1 right-1 rounded-full flex items-center justify-center"
                  style={{ width: 16, height: 16, background: C.coral, fontFamily: FONT_BODY, fontSize: 9, fontWeight: 700, color: "#FFFFFF" }}
                >
                  {PENDING_ACTIONS.high.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <FamilyTree onSelect={(m) => goMember(m)} />

      <div className="w-full mt-4" style={{ borderTop: `1px solid ${C.borderSoft}` }} />

      <SectionLabel
        action={
          <button
            onClick={() => setShowAddTask((v) => !v)}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: C.tealDim }}
          >
            <Plus size={15} color={C.teal} />
          </button>
        }
      >
        Task Manager
      </SectionLabel>

      {showAddTask && (
        <div className="rounded-2xl p-3.5 mb-3 flex flex-col gap-2.5" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
          <button
            onClick={startVoiceFill}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5"
            style={{ background: voicePhase === "listening" ? C.marigold : C.marigoldDim }}
          >
            {voicePhase === "listening" ? (
              <>
                <span className="relative flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,255,255,0.5)" }} />
                  <Mic size={15} color="#FFFFFF" className="relative" />
                </span>
                <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 12.5, fontWeight: 600 }}>Listening…</span>
              </>
            ) : (
              <>
                <Mic size={15} color={C.marigold} />
                <span style={{ fontFamily: FONT_BODY, color: C.marigold, fontSize: 12.5, fontWeight: 600 }}>Fill task by voice</span>
              </>
            )}
          </button>

          <input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Task name (e.g. Refill Metformin)"
            className="w-full rounded-xl px-3 py-2.5"
            style={{ background: C.surfaceAlt, border: `1px solid ${C.borderSoft}`, fontFamily: FONT_BODY, fontSize: 13, color: C.text, outline: "none" }}
          />
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            className="w-full rounded-xl px-3 py-2.5"
            style={{ background: C.surfaceAlt, border: `1px solid ${C.borderSoft}`, fontFamily: FONT_BODY, fontSize: 13, color: C.text, outline: "none" }}
          />
          <button
            onClick={addTask}
            className="w-full rounded-xl py-2.5"
            style={{ background: C.marigold, fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}
          >
            Add Task
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <SnapshotChip
          icon={<CalendarClock size={14} />}
          n={todayRemaining}
          label="To do today"
          color={C.marigold}
          bg={C.marigoldDim}
          active={taskViewOpen.today}
          onClick={() => setTaskViewOpen((prev) => ({ ...prev, today: !prev.today }))}
        />
        <SnapshotChip
          icon={<CheckCircle2 size={14} />}
          n={`${totalDone}/${tasks.length}`}
          label="Pending tasks"
          color={C.teal}
          bg={C.tealDim}
          active={taskViewOpen.pending}
          onClick={() => setTaskViewOpen((prev) => ({ ...prev, pending: !prev.pending }))}
        />
      </div>

      {taskViewOpen.today && (
        <div className="nh-fade-in-up rounded-2xl overflow-hidden mt-3" style={{ border: `1px solid ${C.borderSoft}` }}>
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: C.surface }}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: C.marigold }} />
            <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12, fontWeight: 700 }}>Today's list</span>
          </div>
          <div className="flex flex-col gap-2 p-2.5" style={{ background: C.marigoldDim }}>
            {todaysTasks.length === 0 ? (
              <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12, textAlign: "center", padding: "12px 0" }}>
                Nothing due today — add a task with the + button above.
              </p>
            ) : (
              todaysTasks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className="nh-tap w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left"
                  style={{ background: C.surface }}
                >
                  {t.done ? (
                    <CheckCircle2 key="done" size={19} color={C.green} className="shrink-0 nh-scale-pop" />
                  ) : (
                    <Circle key="undone" size={19} color={C.borderSoft} className="shrink-0" />
                  )}
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 13,
                      fontWeight: 500,
                      color: t.done ? C.textFaint : C.text,
                      textDecoration: t.done ? "line-through" : "none",
                      flex: 1,
                      transition: "color 0.25s ease",
                    }}
                  >
                    {t.task}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {taskViewOpen.pending && (
        <div className="nh-fade-in-up rounded-2xl overflow-hidden mt-3" style={{ border: `1px solid ${C.borderSoft}` }}>
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: C.surface }}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: C.teal }} />
            <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12, fontWeight: 700 }}>All tasks</span>
          </div>
          <div className="flex flex-col gap-2 p-2.5" style={{ background: C.tealDim }}>
            {pendingTasks.map((t) => {
              const overdue = !t.done && t.date < todayStr();
              return (
                <button
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className="nh-tap w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left"
                  style={{ background: C.surface, border: overdue ? `1px solid ${C.coral}` : "none" }}
                >
                  {t.done ? (
                    <CheckCircle2 key="done" size={19} color={C.green} className="shrink-0 nh-scale-pop" />
                  ) : (
                    <Circle key="undone" size={19} color={overdue ? C.coral : C.borderSoft} className="shrink-0" />
                  )}
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 13,
                      fontWeight: 500,
                      color: t.done ? C.textFaint : C.text,
                      textDecoration: t.done ? "line-through" : "none",
                      flex: 1,
                      transition: "color 0.25s ease",
                    }}
                  >
                    {t.task}
                  </span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 10.5, fontWeight: 600, color: overdue ? C.coral : C.textFaint }}>
                    {formatTaskDate(t.date)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="w-full my-4" style={{ borderTop: `1px solid ${C.borderSoft}` }} />

      <SectionLabel>What needs attention</SectionLabel>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <SnapshotChip
          icon={<AlertTriangle size={14} />}
          n={PENDING_ACTIONS.high.length}
          label="High"
          color={C.coral}
          bg={C.coralDim}
          active={attentionOpen.high}
          onClick={() => setAttentionOpen((prev) => ({ ...prev, high: !prev.high }))}
        />
        <SnapshotChip
          icon={<Clock size={14} />}
          n={PENDING_ACTIONS.medium.length}
          label="Medium"
          color={C.marigold}
          bg={C.marigoldDim}
          active={attentionOpen.medium}
          onClick={() => setAttentionOpen((prev) => ({ ...prev, medium: !prev.medium }))}
        />
        <SnapshotChip
          icon={<CheckCircle2 size={14} />}
          n={PENDING_ACTIONS.low.length}
          label="Low"
          color={C.teal}
          bg={C.tealDim}
          active={attentionOpen.low}
          onClick={() => setAttentionOpen((prev) => ({ ...prev, low: !prev.low }))}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        {[
          { key: "high", title: "High attention", color: C.coral, dim: C.coralDim },
          { key: "medium", title: "Medium", color: C.marigold, dim: C.marigoldDim },
          { key: "low", title: "Low", color: C.teal, dim: C.tealDim },
        ].map((group) => {
          const isOpen = attentionOpen[group.key];
          if (!isOpen) return null;
          return (
            <div key={group.key} className="nh-fade-in-up rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.borderSoft}` }}>
              <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: C.surface }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: group.color }} />
                <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12, fontWeight: 700 }}>{group.title}</span>
              </div>
              <div className="flex flex-col gap-2 p-2.5" style={{ background: group.dim }}>
                {PENDING_ACTIONS[group.key].map((item, i) => (
                  <div key={i} className="rounded-xl px-3.5 py-2.5" style={{ background: C.surface }}>
                    <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 600 }}>{item.label}</span>
                    <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11, marginTop: 1 }}>
                      {item.member} · {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full my-4" style={{ borderTop: `1px solid ${C.borderSoft}` }} />

      <SectionLabel
        action={
          <button onClick={goActivity} className="text-xs" style={{ color: C.marigold, fontFamily: FONT_BODY }}>
            View all
          </button>
        }
      >
        Family activity
      </SectionLabel>
      <button
        onClick={goActivity}
        className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
        style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.greenDim }}>
          <Footprints size={16} color={C.green} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>
            {avgSteps.toLocaleString()} steps · avg today
          </p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>Steps &amp; calories burned across the family</p>
        </div>
        <ChevronRight size={14} color={C.textFaint} />
      </button>

      <SectionLabel
        action={
          <button onClick={goCarePlans} className="text-xs" style={{ color: C.marigold, fontFamily: FONT_BODY }}>
            View all
          </button>
        }
      >
        Wellness plans
      </SectionLabel>
      <button
        onClick={goCarePlans}
        className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
        style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.greenDim }}>
          <CheckCircle2 size={16} color={C.green} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>
            {(() => {
              let pending = 0;
              MEMBERS.forEach((m) => {
                const plan = CARE_PLANS[m.id];
                if (plan) pending += plan.items.filter((it) => it.status !== "done").length;
              });
              return `${pending} items need attention`;
            })()}
          </p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>Standard checklists, tracked for the whole family</p>
        </div>
        <ChevronRight size={14} color={C.textFaint} />
      </button>

      <SectionLabel
        action={
          <button onClick={goCommunity} className="text-xs" style={{ color: C.marigold, fontFamily: FONT_BODY }}>
            View all
          </button>
        }
      >
        nairu community
      </SectionLabel>
      <button
        onClick={goCommunity}
        className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
        style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
          <HeartHandshake size={16} color={C.teal} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>
            {COMMUNITY_REQUESTS.length} active request{COMMUNITY_REQUESTS.length === 1 ? "" : "s"} nearby
          </p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>Blood donors &amp; medical help, nearby</p>
        </div>
        <ChevronRight size={14} color={C.textFaint} />
      </button>

      <SectionLabel
        action={
          <button onClick={goSurgical} className="text-xs" style={{ color: C.marigold, fontFamily: FONT_BODY }}>
            View all
          </button>
        }
      >
        Surgical history
      </SectionLabel>
      <button
        onClick={goSurgical}
        className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
        style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.coralDim }}>
          <Scissors size={16} color={C.coral} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>
            Surgery &amp; Post Operative Care
          </p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>Every surgery, tracked through recovery</p>
        </div>
        <ChevronRight size={14} color={C.textFaint} />
      </button>

      <SectionLabel
        action={
          <button onClick={goChat} className="text-xs" style={{ color: C.marigold, fontFamily: FONT_BODY }}>
            View all
          </button>
        }
      >
        Family doctors
      </SectionLabel>
      <button
        onClick={goChat}
        className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
        style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
          <MessageCircle size={16} color={C.teal} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>
            {DOCTOR_CHATS.filter((c) => c.unread).length} new repl{DOCTOR_CHATS.filter((c) => c.unread).length === 1 ? "y" : "ies"}
          </p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>Ask, share reports, get guidance</p>
        </div>
        <ChevronRight size={14} color={C.textFaint} />
      </button>

      <SectionLabel
        action={
          <button onClick={goShareParents} className="text-xs" style={{ color: C.marigold, fontFamily: FONT_BODY }}>
            View all
          </button>
        }
      >
        Share data
      </SectionLabel>
      <button
        onClick={goShareParents}
        className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
        style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.marigoldDim }}>
          <Share2 size={16} color={C.marigold} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>
            {PARENTS_CARE_CIRCLE.length} people in Appa &amp; Amma's circle
          </p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>Invite siblings — nothing else is shared</p>
        </div>
        <ChevronRight size={14} color={C.textFaint} />
      </button>

      {showDailyTip && (
        <DailyTipModal
          tip={todaysTip}
          onClose={() => {
            setShowDailyTip(false);
            setDailyTipSeen(true);
          }}
        />
      )}
      {showHighAlerts && <HighAlertsModal onClose={() => setShowHighAlerts(false)} />}
    </div>
  );
}

function SnapshotChip({ icon, n, label, color, bg, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className="nh-tap rounded-xl py-2 px-2.5 flex items-center gap-2 w-full"
      style={{ background: bg, border: active ? `1.5px solid ${color}` : "1.5px solid transparent" }}
    >
      <div style={{ color }} className="shrink-0">{icon}</div>
      <div className="flex flex-col items-start leading-tight flex-1">
        <span style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 14, fontWeight: 700 }}>{n}</span>
        <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 8.5, letterSpacing: "0.02em" }}>{label}</span>
      </div>
      <ChevronDown
        size={13}
        color={color}
        className="shrink-0 transition-transform"
        style={{ transform: active ? "rotate(180deg)" : "rotate(0deg)" }}
      />
    </button>
  );
}

/* ---------------------------------------------------------------
   FAMILY SCREEN
----------------------------------------------------------------*/
function FamilyScreen({ goMember }) {
  const [view, setView] = useState("list");

  return (
    <div className="px-5 pb-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 22, fontWeight: 500 }}>Family profiles</h1>
          <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
            Every member's records, in one place.
          </p>
        </div>
        <div className="flex rounded-full p-0.5 shrink-0" style={{ background: C.surfaceAlt }}>
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full"
            style={{ background: view === "list" ? C.surface : "transparent", boxShadow: view === "list" ? "0 1px 4px rgba(28,35,51,0.08)" : "none" }}
          >
            <List size={13} color={view === "list" ? C.marigold : C.textFaint} />
          </button>
          <button
            onClick={() => setView("tree")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full"
            style={{ background: view === "tree" ? C.surface : "transparent", boxShadow: view === "tree" ? "0 1px 4px rgba(28,35,51,0.08)" : "none" }}
          >
            <Stethoscope size={13} color={view === "tree" ? C.marigold : C.textFaint} />
          </button>
          <button
            onClick={() => setView("docs")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full"
            style={{ background: view === "docs" ? C.surface : "transparent", boxShadow: view === "docs" ? "0 1px 4px rgba(28,35,51,0.08)" : "none" }}
          >
            <CreditCard size={13} color={view === "docs" ? C.marigold : C.textFaint} />
          </button>
        </div>
      </div>

      {view === "tree" ? (
        <FamilyDoctorTree onSelect={goMember} />
      ) : view === "docs" ? (
        <FamilyDocumentsView goMember={goMember} />
      ) : (
      <div className="flex flex-col gap-2.5 mt-5">
        {MEMBERS.map((m) => (
          <button
            key={m.id}
            onClick={() => goMember(m)}
            className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left active:scale-[0.98] transition-transform"
            style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
              style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[m.risk]}` }}
            >
              <MemberAvatar memberId={m.id} size={44} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14.5, fontWeight: 600 }}>{m.name}</p>
              <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>{m.relation}</p>
              {m.conditions.length > 0 && (
                <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11, marginTop: 1 }}>
                  {m.conditions.join(" · ")}
                </p>
              )}
            </div>
            <Pill_ status={m.risk}>{STATUS_LABEL[m.risk]}</Pill_>
            <ChevronRight size={16} color={C.textFaint} />
          </button>
        ))}
        <button
          className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3.5 mt-1"
          style={{ border: `1.5px dashed ${C.border}`, color: C.textMuted, fontFamily: FONT_BODY, fontSize: 13 }}
        >
          + Add family member
        </button>
      </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   FAMILY DOCTOR TREE (family tree with each member's care team branching off)
----------------------------------------------------------------*/
function FamilyDoctorTree({ onSelect }) {
  const width = 340;
  const height = 600;
  const nodeR = 26;

  const genOf = (m) => {
    if (["father","mother","father-in-law","mother-in-law"].includes(m.familyRole)) return 0;
    if (m.familyRole === "self" || m.familyRole === "spouse") return 1;
    return 2;
  };
  const gens = { 0: [], 1: [], 2: [] };
  MEMBERS.forEach((m) => gens[genOf(m)].push(m));

  const rowY = { 0: 150, 1: 340, 2: 480 };

  const self = gens[1].find((m) => m.familyRole === "self");
  const spouse = gens[1].find((m) => m.familyRole === "spouse");
  const selfX = 110;
  const spouseX = 230;

  const selfParents = gens[0].filter((m) => (m.parentOf || "yathi") === "yathi");
  const spouseParents = gens[0].filter((m) => m.parentOf === "neema");

  const positions = {};
  if (self) positions[self.id] = { x: selfX, y: rowY[1] };
  if (spouse) positions[spouse.id] = { x: spouseX, y: rowY[1] };

  const placePair = (pair, centerX) => {
    const spread = 60;
    pair.forEach((m, i) => {
      const x = pair.length === 1 ? centerX : centerX - spread / 2 + (spread / (pair.length - 1)) * i;
      positions[m.id] = { x, y: rowY[0] };
    });
  };
  placePair(selfParents, selfX);
  placePair(spouseParents, spouseX);

  const childSpread = 110;
  const childCenter = self && spouse ? (selfX + spouseX) / 2 : selfX;
  gens[2].forEach((m, i) => {
    const x = gens[2].length === 1 ? childCenter : childCenter - childSpread / 2 + (childSpread / (gens[2].length - 1)) * i;
    positions[m.id] = { x, y: rowY[2] };
  });

  const junctionY = rowY[0] + nodeR + 30;

  const renderParentPair = (pair, childX) => {
    if (pair.length === 0) return null;
    const xs = pair.map((m) => positions[m.id].x);
    const mid = (Math.min(...xs) + Math.max(...xs)) / 2;
    return (
      <>
        {pair.map((m) => (
          <line key={m.id} x1={positions[m.id].x} y1={rowY[0] + nodeR} x2={positions[m.id].x} y2={junctionY} stroke={C.border} strokeWidth="1.5" />
        ))}
        {pair.length > 1 && (
          <line x1={Math.min(...xs)} y1={junctionY} x2={Math.max(...xs)} y2={junctionY} stroke={C.border} strokeWidth="1.5" />
        )}
        <line x1={mid} y1={junctionY} x2={childX} y2={rowY[1] - nodeR} stroke={C.border} strokeWidth="1.5" />
      </>
    );
  };

  const pillW = 100, pillH = 24, pillGap = 4;

  return (
    <div className="relative mx-auto mt-4" style={{ width, height }}>
      <svg width={width} height={height} className="absolute inset-0">
        {/* genealogy connectors: two separate grandparent pairs, each to their own child */}
        {self && renderParentPair(selfParents, positions[self.id].x)}
        {spouse && renderParentPair(spouseParents, positions[spouse.id].x)}
        {self && spouse && (
          <line x1={positions[self.id].x} y1={rowY[1]} x2={positions[spouse.id].x} y2={rowY[1]} stroke={C.border} strokeWidth="1.5" />
        )}
        {self &&
          gens[2].map((m) => (
            <line key={m.id} x1={childCenter} y1={rowY[1] + nodeR} x2={positions[m.id].x} y2={rowY[2] - nodeR} stroke={C.border} strokeWidth="1.5" />
          ))}

        {/* doctor branches: parents upward, self/spouse diagonally down, children downward */}
        {MEMBERS.map((m) => {
          const pos = positions[m.id];
          if (!pos) return null;
          const docs = FAMILY_DOCTORS[m.id] || [];
          const g = genOf(m);
          if (docs.length === 0) return null;

          if (g === 0) {
            // stack pills upward from just above the avatar
            return docs.map((d, i) => {
              const pillBottom = pos.y - nodeR - 12 - i * (pillH + pillGap);
              const pillTop = pillBottom - pillH;
              return (
                <g key={i}>
                  <line x1={pos.x} y1={i === 0 ? pos.y - nodeR : pillBottom + pillGap} x2={pos.x} y2={pillBottom} stroke={C.teal} strokeWidth="1.3" opacity="0.6" />
                  <rect x={pos.x - pillW / 2} y={pillTop} width={pillW} height={pillH} rx="12" fill={C.tealDim} />
                  <text x={pos.x} y={pillTop + 15} textAnchor="middle" fontSize="9.5" fontWeight="600" fontFamily={FONT_BODY} fill={C.teal}>
                    {d.name}
                  </text>
                </g>
              );
            });
          }
          if (g === 1) {
            // self branches diagonally down-left, spouse diagonally down-right \u2014 avoids colliding with each other or the marriage bar
            const isSelf = m.familyRole === "self";
            const d = docs[0];
            const pillCx = isSelf ? pos.x - 55 : pos.x + 55;
            const pillCy = pos.y + 50;
            return (
              <g key={m.id}>
                <line x1={pos.x} y1={pos.y + nodeR - 4} x2={pillCx} y2={pillCy - 12} stroke={C.teal} strokeWidth="1.3" opacity="0.6" />
                <rect x={pillCx - pillW / 2} y={pillCy - 12} width={pillW} height={pillH} rx="12" fill={C.tealDim} />
                <text x={pillCx} y={pillCy + 3} textAnchor="middle" fontSize="9.5" fontWeight="600" fontFamily={FONT_BODY} fill={C.teal}>
                  {d.name}
                </text>
              </g>
            );
          }
          // g === 2: pill below
          const d = docs[0];
          const pillTop = pos.y + nodeR + 12;
          return (
            <g key="child-doc">
              <line x1={pos.x} y1={pos.y + nodeR} x2={pos.x} y2={pillTop} stroke={C.teal} strokeWidth="1.3" opacity="0.6" />
              <rect x={pos.x - pillW / 2} y={pillTop} width={pillW} height={pillH} rx="12" fill={C.tealDim} />
              <text x={pos.x} y={pillTop + 15} textAnchor="middle" fontSize="9.5" fontWeight="600" fontFamily={FONT_BODY} fill={C.teal}>
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>

      {MEMBERS.map((m) => {
        const pos = positions[m.id];
        if (!pos) return null;
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m)}
            className="absolute flex flex-col items-center gap-1 active:scale-95 transition-transform"
            style={{ left: pos.x - 32, top: pos.y - nodeR, width: 64 }}
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: nodeR * 2,
                height: nodeR * 2,
                background: C.surfaceAlt,
                border: `2.5px solid ${STATUS_COLOR[m.risk]}`,
                boxShadow: "0 3px 10px rgba(28,35,51,0.07)",
              }}
            >
              <MemberAvatar memberId={m.id} size={43} />
            </div>
            <span className="text-[10.5px] font-semibold" style={{ color: C.text, fontFamily: FONT_BODY }}>
              {m.name}
            </span>
          </button>
        );
      })}

      <div className="absolute flex items-center gap-1.5" style={{ left: 0, top: height - 18 }}>
        <Stethoscope size={11} color={C.teal} />
        <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10 }}>Care team shown in teal</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   FAMILY DOCUMENTS (IDs & insurance, all in one place)
----------------------------------------------------------------*/
function FamilyDocumentsView({ goMember }) {
  return (
    <div className="mt-5">
      {/* insurance, shared across the family */}
      <div className="rounded-2xl p-4 flex items-center gap-3 mb-4" style={{ background: C.tealDim }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.surface }}>
          <ShieldCheck size={18} color={C.teal} />
        </div>
        <div>
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{EMERGENCY_INSURANCE.policy}</p>
          <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11, marginTop: 1 }}>
            {EMERGENCY_INSURANCE.number} · Sum insured {EMERGENCY_INSURANCE.sumInsured}
          </p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, marginTop: 1 }}>Covers {EMERGENCY_INSURANCE.covers}</p>
        </div>
      </div>

      <SectionLabel>Identification, per person</SectionLabel>
      <div className="flex flex-col gap-2.5">
        {MEMBERS.map((m) => {
          const profile = EMERGENCY_PROFILES[m.id];
          if (!profile) return null;
          return (
            <button
              key={m.id}
              onClick={() => goMember(m)}
              className="rounded-2xl p-4 text-left w-full"
              style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[m.risk]}` }}
                >
                  <MemberAvatar memberId={m.id} size={30} />
                </div>
                <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{m.name}</span>
                <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, marginLeft: "auto" }}>
                  {profile.ids.length} document{profile.ids.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {profile.ids.map((id, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{ background: C.surfaceAlt, fontFamily: FONT_BODY, fontSize: 10, color: C.textMuted }}
                  >
                    <CreditCard size={10} color={C.green} /> {id.type}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SHARE PARENTS' CARE (scoped sharing \u2014 only Appa & Amma, with siblings)
----------------------------------------------------------------*/
function ShareParentsCareScreen({ onBack }) {
  const [inviting, setInviting] = useState(false);

  const width = 320, height = 300;
  const circleCx = 160, circleCy = 175, circleR = 88;
  const appaX = circleCx - 32, ammaX = circleCx + 32, parentY = circleCy;

  const outerR = 148;
  const outerNodes = [
    { ...PARENTS_CARE_CIRCLE[0], angle: -90 },
    { ...PARENTS_CARE_CIRCLE[1], angle: 30 },
    { ...PARENTS_CARE_CIRCLE[2], angle: 150 },
  ].map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    const x = circleCx + outerR * Math.cos(rad);
    const y = circleCy + outerR * Math.sin(rad) * 0.72; // flatten vertically to fit narrow screen
    const dx = x - circleCx, dy = y - circleCy;
    const len = Math.hypot(dx, dy) || 1;
    const edgeX = circleCx + (dx / len) * circleR;
    const edgeY = circleCy + (dy / len) * circleR * 0.9;
    return { ...n, x, y, edgeX, edgeY };
  });

  const statusColor = { owner: "marigold", accepted: "green", invited: "teal" };
  const statusLabel = { owner: "Owner", accepted: "Accepted", invited: "Invited" };

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Share Data</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          Let Appa's other children see his and Amma's records too — without sharing anything else.
        </p>

        <div className="relative mx-auto mt-4" style={{ width, height }}>
          <svg width={width} height={height} className="absolute inset-0">
            <circle cx={circleCx} cy={circleCy} r={circleR} fill={C.tealDim} opacity="0.5" />
            <circle cx={circleCx} cy={circleCy} r={circleR} fill="none" stroke={C.teal} strokeWidth="1.5" strokeDasharray="4 5" />
            {outerNodes.map((n, i) => (
              <line key={i} x1={n.x} y1={n.y} x2={n.edgeX} y2={n.edgeY} stroke={C[statusColor[n.status]]} strokeWidth="1.4" opacity="0.6" />
            ))}
          </svg>

          {/* parents, inside the shared circle */}
          {[
            { x: appaX, initial: "A", risk: "risk", name: "Appa" },
            { x: ammaX, initial: "A", risk: "attention", name: "Amma" },
          ].map((p, i) => (
            <div key={i} className="absolute flex flex-col items-center gap-1" style={{ left: p.x - 26, top: parentY - 26, width: 52 }}>
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: C.surface, border: `2.5px solid ${STATUS_COLOR[p.risk]}`, boxShadow: "0 3px 8px rgba(28,35,51,0.1)" }}
              >
                <MemberAvatar memberId={p.id} size={40} />
              </div>
              <span className="text-[9.5px] font-semibold" style={{ color: C.text, fontFamily: FONT_BODY }}>{p.name}</span>
            </div>
          ))}

          {/* people with access, outside the circle */}
          {outerNodes.map((n, i) => (
            <div key={i} className="absolute flex flex-col items-center gap-0.5" style={{ left: n.x - 28, top: n.y - 24, width: 56 }}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: C.surface, border: `2px solid ${C[statusColor[n.status]]}` }}
              >
                <MemberAvatar memberId={n.id} size={32} />
              </div>
              <span className="text-[9.5px] font-semibold" style={{ color: C.text, fontFamily: FONT_BODY }}>{n.name}</span>
              <span
                className="px-1.5 rounded-full"
                style={{ background: C[statusColor[n.status] + "Dim"], color: C[statusColor[n.status]], fontFamily: FONT_BODY, fontSize: 8.5, fontWeight: 600 }}
              >
                {statusLabel[n.status]}
              </span>
            </div>
          ))}

          <span
            className="absolute px-2 py-0.5 rounded-full"
            style={{ left: circleCx - 46, top: circleCy + circleR * 0.9 + 8, background: C.tealDim, color: C.teal, fontFamily: FONT_BODY, fontSize: 9.5, fontWeight: 600 }}
          >
            Shared: Appa &amp; Amma only
          </span>
        </div>

        <div
          className="flex items-center gap-2.5 rounded-2xl px-4 py-3 mt-6"
          style={{ background: C.surfaceAlt }}
        >
          <Lock size={15} color={C.textMuted} />
          <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11, lineHeight: 1.4 }}>
            Neema, Aadyaa &amp; Niyathi's records stay private \u2014 this only shares Appa &amp; Amma's data.
          </p>
        </div>

        <SectionLabel>People with access</SectionLabel>
        <div className="flex flex-col gap-2">
          {PARENTS_CARE_CIRCLE.map((p, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: C.surfaceAlt, border: `2px solid ${C[statusColor[p.status]]}` }}
              >
                <MemberAvatar memberId={p.id} size={30} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{p.name}</p>
                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{p.relation}</p>
              </div>
              <span
                className="px-2 py-0.5 rounded-full"
                style={{ background: C[statusColor[p.status] + "Dim"], color: C[statusColor[p.status]], fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600 }}
              >
                {statusLabel[p.status]}
              </span>
            </div>
          ))}
        </div>

        {inviting ? (
          <div className="rounded-2xl p-4 mt-3" style={{ background: C.marigoldDim }}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={15} color={C.marigold} />
              <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 600 }}>Invite link ready</span>
            </div>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11, lineHeight: 1.4 }}>
              Share this link with a sibling. It only grants access to Appa &amp; Amma's records — nothing else in the app.
            </p>
            <div className="rounded-xl px-3 py-2 mt-2" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
              <span style={{ fontFamily: FONT_MONO, color: C.textMuted, fontSize: 11 }}>nairuhealth.app/join/parents-x7k2</span>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setInviting(true)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 mt-3"
            style={{ border: `1.5px dashed ${C.border}`, color: C.textMuted, fontFamily: FONT_BODY, fontSize: 13 }}
          >
            <UserPlus size={15} color={C.marigold} />
            Invite a sibling
          </button>
        )}
      </div>
    </div>
  );
}

function BodySystemMap({ memberId, onSystemClick }) {
  const statuses = BODY_SYSTEMS[memberId] || {};
  // scoped to this component only \u2014 doesn't touch the global STATUS_* maps used for risk badges elsewhere
  const BODY_STATUS_COLOR = { ...STATUS_COLOR, "no-data": C.textMuted };
  const BODY_STATUS_DIM = { ...STATUS_DIM, "no-data": "#E2E4E8" };
  const BODY_STATUS_LABEL = { ...STATUS_LABEL, "no-data": "No data" };
  const W = 400;
  const H = 340;
  const rightBoxX = 300;
  const rightBoxW = 96;
  const leftBoxX = 6;
  const leftBoxW = 90;
  const boxH = 24;

  return (
    <div className="rounded-2xl p-3 pt-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* silhouette \u2014 rounded, brand-style figure with clearly separated limbs */}
        <g fill={C.bodyFill} stroke={C.bodyStroke} strokeWidth="1.6">
          <circle cx="200" cy="45" r="26" />
          <rect x="164" y="76" width="72" height="130" rx="32" />
          <rect x="132" y="90" width="22" height="110" rx="11" transform="rotate(-9 143 90)" />
          <rect x="246" y="90" width="22" height="110" rx="11" transform="rotate(9 257 90)" />
          <rect x="168" y="200" width="26" height="140" rx="13" />
          <rect x="206" y="200" width="26" height="140" rx="13" />
        </g>

        {/* connectors + labels */}
        {SYSTEM_DEFS.map((s) => {
          const status = statuses[s.key] || "no-data";
          const color = BODY_STATUS_COLOR[status];
          const boxX = s.side === "right" ? rightBoxX : leftBoxX;
          const boxW = s.side === "right" ? rightBoxW : leftBoxW;
          const lineEndX = s.side === "right" ? boxX : boxX + boxW;
          return (
            <g key={s.key} onClick={() => onSystemClick && onSystemClick(s.key)} style={{ cursor: onSystemClick ? "pointer" : "default" }}>
              <line
                x1={s.ax}
                y1={s.ay}
                x2={lineEndX}
                y2={s.ly + boxH / 2}
                stroke={color}
                strokeWidth="1.3"
                strokeDasharray="3 3"
                opacity="0.85"
              />
              <circle cx={s.ax} cy={s.ay} r="2.6" fill={color} />
              <rect x={boxX} y={s.ly} width={boxW} height={boxH} rx="8" fill={BODY_STATUS_DIM[status]} stroke={color} strokeWidth="1" strokeOpacity="0.3" />
              <text
                x={boxX + boxW / 2}
                y={s.ly + boxH / 2 + 4}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="600"
                fontFamily={FONT_BODY}
                fill={color}
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10, textAlign: "center", marginTop: -2, marginBottom: 6, fontStyle: "italic" }}>
        Tap any body system to see what's behind its status
      </p>
      <div className="flex items-center justify-center gap-3 mt-1 pt-2 flex-wrap" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
        {["good", "attention", "risk", "no-data"].map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: BODY_STATUS_COLOR[s] }} />
            <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10 }}>{BODY_STATUS_LABEL[s]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   VISIT LOG (shared list format \u2014 doctor visits or reports reviewed,
   reused for both body-system detail and dietitian visits)
----------------------------------------------------------------*/
/* ---------------------------------------------------------------
   DOCUMENT CHIP (self-contained: shows the chip AND its own viewer
   popup, so it can be dropped in anywhere a report/prescription is
   referenced without threading state through parent components)
----------------------------------------------------------------*/
function DocumentViewerModal({ label, meta, onClose }) {
  return (
    <div
      className="nh-modal-backdrop absolute inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "rgba(6,9,20,0.65)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="nh-modal-card w-full rounded-2xl overflow-hidden"
        style={{ background: C.surfaceAlt, maxWidth: 320 }}
      >
        <div className="flex items-center gap-2 p-4" style={{ borderBottom: `1px solid ${C.borderSoft}` }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
            <FileText size={15} color={C.teal} />
          </div>
          <div className="flex-1 min-w-0">
            <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 700 }}>{label}</span>
            {meta && <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, marginTop: 1 }}>{meta}</p>}
          </div>
        </div>
        <div className="p-4" style={{ background: C.surface }}>
          <div className="rounded-xl p-4" style={{ background: C.surfaceAlt }}>
            {[92, 78, 85, 60, 88, 70, 82].map((w, i) => (
              <div key={i} className="rounded-full mb-2" style={{ height: 7, width: `${w}%`, background: C.borderSoft }} />
            ))}
          </div>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, textAlign: "center", marginTop: 12 }}>
            Document preview — illustrative only
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3"
          style={{ background: C.teal, fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function SummaryModal({ label, summary, onClose }) {
  return (
    <div
      className="nh-modal-backdrop absolute inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "rgba(6,9,20,0.65)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="nh-modal-card w-full rounded-2xl overflow-hidden"
        style={{ background: C.surfaceAlt, maxWidth: 320 }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} color={C.marigold} />
            <span style={{ fontFamily: FONT_BODY, color: C.marigold, fontSize: 11, fontWeight: 700, letterSpacing: "0.03em" }}>
              AI SUMMARY
            </span>
          </div>
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{label}</p>
          <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, lineHeight: 1.6 }}>{summary}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3"
          style={{ background: C.marigold, fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function DocumentChip({ label, summary }) {
  const [modal, setModal] = useState(null); // null | "view" | "summary"
  return (
    <>
      <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 flex-wrap" style={{ background: C.surfaceAlt, width: "fit-content" }}>
        <FileText size={11} color={C.textMuted} className="shrink-0" />
        <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 10.5 }}>{label}</span>
        {summary && (
          <button
            onClick={() => setModal("summary")}
            className="rounded-full px-2.5 py-1"
            style={{ background: C.marigoldDim, color: C.marigold, fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700 }}
          >
            Read Summary
          </button>
        )}
        <button
          onClick={() => setModal("view")}
          className="rounded-full px-2.5 py-1 ml-auto"
          style={{ background: C.tealDim, color: C.teal, fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700 }}
        >
          View
        </button>
      </div>
      {modal === "view" && <DocumentViewerModal label={label} onClose={() => setModal(null)} />}
      {modal === "summary" && <SummaryModal label={label} summary={summary} onClose={() => setModal(null)} />}
    </>
  );
}

// A full clickable row (icon/avatar + title + subtitle + chevron) that opens the same
// document viewer \u2014 used for report list rows, as opposed to DocumentChip's compact pill form.
function ReportRow({ leading, title, subtitle, summary }) {
  const [modal, setModal] = useState(null); // null | "view" | "summary"
  return (
    <>
      <div className="w-full flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
        {leading}
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 500 }}>{title}</p>
          {subtitle && <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, marginBottom: 6 }}>{subtitle}</p>}
          {summary && (
            <button
              onClick={() => setModal("summary")}
              className="rounded-full px-3 py-1.5"
              style={{ background: C.marigoldDim, color: C.marigold, fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700 }}
            >
              Read Summary
            </button>
          )}
        </div>
        <button
          onClick={() => setModal("view")}
          className="rounded-full px-3 py-1.5 shrink-0"
          style={{ background: C.tealDim, color: C.teal, fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700 }}
        >
          View
        </button>
      </div>
      {modal === "view" && <DocumentViewerModal label={title} meta={subtitle} onClose={() => setModal(null)} />}
      {modal === "summary" && <SummaryModal label={title} summary={summary} onClose={() => setModal(null)} />}
    </>
  );
}

function VisitLogList({ entries }) {
  if (!entries || entries.length === 0) {
    return (
      <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12, textAlign: "center", padding: "16px 0" }}>
        No doctor visits or reports logged yet for this.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-2.5">
      {entries.map((e, i) => (
        <div key={i} className="rounded-2xl p-3.5" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: e.type === "doctor" ? C.tealDim : C.marigoldDim }}>
              {e.type === "doctor" ? <Stethoscope size={13} color={C.teal} /> : <FileText size={13} color={C.marigold} />}
            </div>
            <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12, fontWeight: 600, flex: 1 }}>
              {e.doctor || "Report reviewed"}
            </span>
            <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{e.date}</span>
          </div>
          <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5, lineHeight: 1.5 }}>{e.outcome}</p>
          {e.report && (
            <div className="mt-2">
              <DocumentChip label={e.report} summary={e.summary} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function BodySystemDetail({ member, systemKey, onClose }) {
  const def = SYSTEM_DEFS.find((s) => s.key === systemKey);
  const status = (BODY_SYSTEMS[member.id] || {})[systemKey] || "no-data";
  const label = { good: "Good", attention: "Needs attention", risk: "At risk", "no-data": "No data" }[status];
  const color = { good: C.green, attention: C.marigold, risk: C.coral, "no-data": C.textMuted }[status];
  const entries = (SYSTEM_VISIT_LOG[member.id] || {})[systemKey];

  return (
    <div
      className="nh-modal-backdrop absolute inset-0 z-40 flex items-end"
      style={{ background: "rgba(6,9,20,0.6)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="nh-modal-card w-full rounded-t-3xl px-5 pt-4 pb-8"
        style={{ background: C.surfaceAlt, maxHeight: "80%", overflowY: "auto" }}
      >
        <div className="w-9 h-1 rounded-full mx-auto mb-4" style={{ background: C.borderSoft }} />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
            <span className="w-3 h-3 rounded-full" style={{ background: color }} />
          </div>
          <div>
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 15, fontWeight: 700 }}>{def?.label} — {member.name}</p>
            <span
              className="px-2 py-0.5 rounded-full inline-block mt-1"
              style={{ background: `${color}22`, color, fontFamily: FONT_BODY, fontSize: 10.5, fontWeight: 700 }}
            >
              {label}
            </span>
          </div>
        </div>

        <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, letterSpacing: "0.03em", marginBottom: 8 }}>
          BASED ON
        </p>
        <VisitLogList entries={entries} />

        <button
          onClick={onClose}
          className="w-full rounded-2xl py-3.5 mt-5"
          style={{ background: C.teal }}
        >
          <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14, fontWeight: 600 }}>Close</span>
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MEMBER DETAIL
----------------------------------------------------------------*/
const READING_PASSAGES = [
  { text: "Meera walked her dog every morning at 7 AM near the lake, then bought fresh bread from the bakery on her way home.", question: "What time did Meera walk her dog?", options: ["6 AM", "7 AM", "8 AM"], answer: "7 AM" },
  { text: "The library on Elm Street closes at 6 PM on weekdays but stays open until 8 PM on Fridays for study groups.", question: "Until when is the library open on Fridays?", options: ["6 PM", "7 PM", "8 PM"], answer: "8 PM" },
  { text: "Rohan planted three tomato saplings and two chili plants in his backyard garden last spring.", question: "How many tomato saplings did Rohan plant?", options: ["Two", "Three", "Five"], answer: "Three" },
];

const THINKING_QUESTIONS = [
  { q: "What comes next: 2, 4, 6, 8, ?", options: ["9", "10", "12"], answer: "10" },
  { q: "If today is Tuesday, what day is it in 3 days?", options: ["Thursday", "Friday", "Saturday"], answer: "Friday" },
  { q: "Which number doesn't belong: 3, 6, 9, 10, 12", options: ["9", "10", "12"], answer: "10" },
];

/* ---------------------------------------------------------------
   PLAY GAME HUB (Memory / Reading / Thinking / Hearing)
----------------------------------------------------------------*/
function PlayGameHub({ member, history, onBack, onOpenGame }) {
  const averages = {};
  GAME_CATEGORIES.forEach((c) => {
    const arr = history[c.key] || [];
    averages[c.key] = arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : 0;
  });
  const sorted = [...GAME_CATEGORIES].sort((a, b) => averages[b.key] - averages[a.key]);
  const strongest = sorted[0]?.key;
  const weakest = sorted[sorted.length - 1]?.key;

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
          <Brain size={16} color={C.teal} />
        </div>
        <div>
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontWeight: 600 }}>Play Games</p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{member.name} · 4 quick daily checks</p>
        </div>
      </div>

      <div className="px-5">
        <div className="rounded-2xl p-4 mt-2 flex items-center gap-3" style={{ background: C.tealDim }}>
          <Clock size={18} color={C.teal} />
          <div>
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 700 }}>{history.totalMinutes} minutes played</p>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11 }}>Total time across all games</p>
          </div>
        </div>

        <SectionLabel>Choose a game</SectionLabel>
        <div className="flex flex-col gap-2.5">
          {GAME_CATEGORIES.map((cat) => {
            const arr = history[cat.key] || [];
            const latest = arr.length ? arr[arr.length - 1] : null;
            const isStrongest = cat.key === strongest && latest !== null;
            const isWeakest = cat.key === weakest && latest !== null && strongest !== weakest;
            return (
              <button
                key={cat.key}
                onClick={() => onOpenGame(cat.key)}
                className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
                style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C[cat.color + "Dim"] }}>
                  <cat.icon size={18} color={C[cat.color]} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13.5, fontWeight: 600 }}>{cat.label}</span>
                    {isStrongest && (
                      <span className="px-1.5 py-0.5 rounded-full" style={{ background: C.greenDim, color: C.green, fontFamily: FONT_BODY, fontSize: 8.5, fontWeight: 700 }}>
                        STRONGEST
                      </span>
                    )}
                    {isWeakest && (
                      <span className="px-1.5 py-0.5 rounded-full" style={{ background: C.coralDim, color: C.coral, fontFamily: FONT_BODY, fontSize: 8.5, fontWeight: 700 }}>
                        NEEDS PRACTICE
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11 }}>
                    {latest !== null ? `Latest score: ${latest}/100` : "Not played yet"}
                  </p>
                </div>
                <ChevronRight size={16} color={C.textFaint} />
              </button>
            );
          })}
        </div>

        <SectionLabel>7-day trend</SectionLabel>
        <div className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart margin={{ left: -25, right: 5, top: 5 }}>
              <CartesianGrid stroke={C.borderSoft} vertical={false} />
              <XAxis dataKey="day" allowDuplicatedCategory={false} tick={{ fill: C.textFaint, fontSize: 9.5, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} />
              {GAME_CATEGORIES.map((cat) => (
                <Line
                  key={cat.key}
                  data={(history[cat.key] || []).map((v, i) => ({ day: COGNITIVE_DAYS[i], [cat.key]: v }))}
                  type="monotone"
                  dataKey={cat.key}
                  stroke={C[cat.color]}
                  strokeWidth={2}
                  dot={{ r: 2.5 }}
                  name={cat.label}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-3 mt-1 pt-2 flex-wrap" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
            {GAME_CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: C[cat.color] }} />
                <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10 }}>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const GAME_TILES = [
  { key: "coral", bg: "#E3492F", dim: "#FCE1DA" },
  { key: "amber", bg: "#D9770A", dim: "#FDECD1" },
  { key: "teal", bg: "#0E9488", dim: "#D3F3EF" },
  { key: "green", bg: "#1E9E56", dim: "#DCF5E6" },
];

function GameHeader({ title, subtitle, onBack, color }) {
  return (
    <div className="px-5 pt-6 flex items-center gap-3">
      <button onClick={onBack} className="p-1 -ml-1">
        <ChevronLeft size={20} color={C.textMuted} />
      </button>
      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C[color + "Dim"] }}>
        <Brain size={16} color={C[color]} />
      </div>
      <div>
        <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontWeight: 600 }}>{title}</p>
        <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{subtitle}</p>
      </div>
    </div>
  );
}

function ColorMemoryGame({ member, onBack, onComplete }) {
  const [phase, setPhase] = useState("idle"); // idle | showing | input | success | gameover
  const [sequence, setSequence] = useState([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [litIndex, setLitIndex] = useState(-1);
  const [bestToday, setBestToday] = useState(0);

  useEffect(() => {
    if (phase !== "showing") return undefined;
    let cancelled = false;
    const timeouts = [];
    let i = 0;
    const showNext = () => {
      if (cancelled) return;
      if (i >= sequence.length) {
        setLitIndex(-1);
        setPhase("input");
        return;
      }
      setLitIndex(sequence[i]);
      timeouts.push(
        setTimeout(() => {
          if (cancelled) return;
          setLitIndex(-1);
          timeouts.push(
            setTimeout(() => {
              if (cancelled) return;
              i += 1;
              showNext();
            }, 220)
          );
        }, 550)
      );
    };
    showNext();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, sequence]);

  const startGame = () => {
    const first = [Math.floor(Math.random() * 4)];
    setSequence(first);
    setPlayerStep(0);
    setBestToday(0);
    setPhase("showing");
  };

  const nextRound = () => {
    const next = [...sequence, Math.floor(Math.random() * 4)];
    setSequence(next);
    setPlayerStep(0);
    setPhase("showing");
  };

  const finish = (rounds) => {
    const score = Math.min(100, rounds * 12);
    onComplete(score);
  };

  const handleTileTap = (idx) => {
    if (phase !== "input") return;
    if (idx === sequence[playerStep]) {
      const nextStep = playerStep + 1;
      if (nextStep === sequence.length) {
        setBestToday(sequence.length);
        setPhase("success");
      } else {
        setPlayerStep(nextStep);
      }
    } else {
      setBestToday(Math.max(bestToday, sequence.length - 1));
      setPhase("gameover");
      finish(Math.max(bestToday, sequence.length - 1));
    }
  };

  return (
    <div className="pb-6">
      <GameHeader title="Memory" subtitle={`${member.name} · Color sequence`} onBack={onBack} color="teal" />
      <div className="px-5">
        {phase === "idle" && (
          <>
            <div className="rounded-2xl p-4 mt-2" style={{ background: C.tealDim }}>
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, lineHeight: 1.5 }}>
                Watch the colors light up, then tap them back in the same order. Gets one step longer each round.
              </p>
            </div>
            <button onClick={startGame} className="w-full rounded-2xl py-3.5 mt-4 flex items-center justify-center gap-2" style={{ background: C.marigold }}>
              <Brain size={16} color="#FFFFFF" />
              <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14, fontWeight: 600 }}>Start</span>
            </button>
          </>
        )}

        {(phase === "showing" || phase === "input") && (
          <div className="flex flex-col items-center mt-6">
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginBottom: 4 }}>Round {sequence.length}</p>
            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11, marginBottom: 20 }}>
              {phase === "showing" ? "Watch closely…" : "Now repeat the pattern"}
            </p>
            <div className="grid grid-cols-2 gap-3" style={{ width: 220 }}>
              {GAME_TILES.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => handleTileTap(i)}
                  disabled={phase !== "input"}
                  className="rounded-2xl transition-transform active:scale-95"
                  style={{ height: 100, background: litIndex === i ? t.bg : t.dim, boxShadow: litIndex === i ? `0 0 0 3px ${t.bg}55` : "none" }}
                />
              ))}
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="flex flex-col items-center mt-10 gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: C.greenDim }}>
              <CheckCircle2 size={28} color={C.green} />
            </div>
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 15, fontWeight: 700 }}>Round {sequence.length} complete!</p>
            <button onClick={nextRound} className="rounded-2xl px-6 py-3" style={{ background: C.marigold }}>
              <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13.5, fontWeight: 600 }}>Next Round</span>
            </button>
            <button onClick={() => finish(sequence.length)} className="text-sm" style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12.5 }}>
              Stop and save score
            </button>
          </div>
        )}

        {phase === "gameover" && (
          <div className="flex flex-col items-center mt-10 gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: C.marigoldDim }}>
              <Brain size={26} color={C.marigold} />
            </div>
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 15, fontWeight: 700 }}>Nice try!</p>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5 }}>{member.name} reached round {bestToday}.</p>
            <button onClick={onBack} className="rounded-2xl px-6 py-3 mt-2" style={{ background: C.marigold }}>
              <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13.5, fontWeight: 600 }}>Done</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ReadingGame({ member, onBack, onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro | reading | question | result
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    if (phase !== "reading") return undefined;
    const t = setTimeout(() => setPhase("question"), 4000);
    return () => clearTimeout(t);
  }, [phase, round]);

  const start = () => {
    setRound(0);
    setCorrect(0);
    setPhase("reading");
  };

  const answer = (opt) => {
    setPicked(opt);
    const isRight = opt === READING_PASSAGES[round].answer;
    const newCorrect = correct + (isRight ? 1 : 0);
    setCorrect(newCorrect);
    setTimeout(() => {
      setPicked(null);
      if (round + 1 < READING_PASSAGES.length) {
        setRound(round + 1);
        setPhase("reading");
      } else {
        onComplete(Math.round((newCorrect / READING_PASSAGES.length) * 100));
      }
    }, 700);
  };

  const passage = READING_PASSAGES[round];

  return (
    <div className="pb-6">
      <GameHeader title="Reading" subtitle={`${member.name} · Quick comprehension`} onBack={onBack} color="marigold" />
      <div className="px-5">
        {phase === "intro" && (
          <>
            <div className="rounded-2xl p-4 mt-2" style={{ background: C.marigoldDim }}>
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, lineHeight: 1.5 }}>
                A short passage appears for a few seconds, then disappears. Answer a quick question about what you just read — 3 rounds.
              </p>
            </div>
            <button onClick={start} className="w-full rounded-2xl py-3.5 mt-4" style={{ background: C.marigold }}>
              <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14, fontWeight: 600 }}>Start</span>
            </button>
          </>
        )}

        {phase === "reading" && (
          <div className="mt-8">
            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11, textAlign: "center", marginBottom: 10 }}>Round {round + 1} of {READING_PASSAGES.length}</p>
            <div className="rounded-2xl p-5" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14.5, lineHeight: 1.6 }}>{passage.text}</p>
            </div>
          </div>
        )}

        {phase === "question" && (
          <div className="mt-8">
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontWeight: 600, marginBottom: 14, textAlign: "center" }}>{passage.question}</p>
            <div className="flex flex-col gap-2.5">
              {passage.options.map((opt) => {
                const isRight = opt === passage.answer;
                const show = picked !== null;
                return (
                  <button
                    key={opt}
                    onClick={() => picked === null && answer(opt)}
                    className="w-full rounded-2xl py-3.5 text-center"
                    style={{
                      background: show ? (isRight ? C.greenDim : picked === opt ? C.coralDim : C.surface) : C.surface,
                      border: `1.5px solid ${show && isRight ? C.green : show && picked === opt ? C.coral : C.borderSoft}`,
                      fontFamily: FONT_BODY,
                      color: C.text,
                      fontWeight: 600,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {phase === "result" && null}
      </div>
    </div>
  );
}

function ThinkingGame({ member, onBack, onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro | question
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState(null);

  const start = () => {
    setRound(0);
    setCorrect(0);
    setPhase("question");
  };

  const answer = (opt) => {
    setPicked(opt);
    const isRight = opt === THINKING_QUESTIONS[round].answer;
    const newCorrect = correct + (isRight ? 1 : 0);
    setCorrect(newCorrect);
    setTimeout(() => {
      setPicked(null);
      if (round + 1 < THINKING_QUESTIONS.length) {
        setRound(round + 1);
      } else {
        onComplete(Math.round((newCorrect / THINKING_QUESTIONS.length) * 100));
      }
    }, 700);
  };

  const question = THINKING_QUESTIONS[round];

  return (
    <div className="pb-6">
      <GameHeader title="Thinking" subtitle={`${member.name} · Quick logic`} onBack={onBack} color="coral" />
      <div className="px-5">
        {phase === "intro" && (
          <>
            <div className="rounded-2xl p-4 mt-2" style={{ background: C.coralDim }}>
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, lineHeight: 1.5 }}>
                3 quick logic and pattern questions — answer as many correctly as you can.
              </p>
            </div>
            <button onClick={start} className="w-full rounded-2xl py-3.5 mt-4" style={{ background: C.coral }}>
              <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14, fontWeight: 600 }}>Start</span>
            </button>
          </>
        )}

        {phase === "question" && (
          <div className="mt-8">
            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11, textAlign: "center", marginBottom: 14 }}>Question {round + 1} of {THINKING_QUESTIONS.length}</p>
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 15, fontWeight: 600, marginBottom: 16, textAlign: "center" }}>{question.q}</p>
            <div className="flex flex-col gap-2.5">
              {question.options.map((opt) => {
                const isRight = opt === question.answer;
                const show = picked !== null;
                return (
                  <button
                    key={opt}
                    onClick={() => picked === null && answer(opt)}
                    className="w-full rounded-2xl py-3.5 text-center"
                    style={{
                      background: show ? (isRight ? C.greenDim : picked === opt ? C.coralDim : C.surface) : C.surface,
                      border: `1.5px solid ${show && isRight ? C.green : show && picked === opt ? C.coral : C.borderSoft}`,
                      fontFamily: FONT_BODY,
                      color: C.text,
                      fontWeight: 600,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HearingGame({ member, onBack, onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro | waiting | ready | tapped
  const [trial, setTrial] = useState(0);
  const [times, setTimes] = useState([]);
  const readyAtRef = useRef(0);
  const timeoutRef = useRef(null);

  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // audio unavailable, continue silently \u2014 the visual cue still lets the test proceed
    }
  };

  const startTrial = () => {
    setPhase("waiting");
    const delay = 1200 + Math.random() * 2500;
    timeoutRef.current = setTimeout(() => {
      playBeep();
      readyAtRef.current = Date.now();
      setPhase("ready");
    }, delay);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const start = () => {
    setTrial(0);
    setTimes([]);
    startTrial();
  };

  const handleTap = () => {
    if (phase === "waiting") return; // tapped too early, ignore
    if (phase !== "ready") return;
    const reactionMs = Date.now() - readyAtRef.current;
    const newTimes = [...times, reactionMs];
    setTimes(newTimes);
    if (trial + 1 < 3) {
      setTrial(trial + 1);
      setTimeout(startTrial, 500);
    } else {
      const avg = newTimes.reduce((s, v) => s + v, 0) / newTimes.length;
      const score = Math.max(10, Math.min(100, Math.round(100 - (avg - 300) / 6)));
      onComplete(score);
    }
  };

  return (
    <div className="pb-6">
      <GameHeader title="Hearing" subtitle={`${member.name} · Reaction to sound`} onBack={onBack} color="green" />
      <div className="px-5">
        {phase === "intro" && (
          <>
            <div className="rounded-2xl p-4 mt-2" style={{ background: C.greenDim }}>
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, lineHeight: 1.5 }}>
                Turn your volume up. Tap the circle as soon as you hear the tone — 3 quick trials, measuring reaction time.
              </p>
            </div>
            <button onClick={start} className="w-full rounded-2xl py-3.5 mt-4" style={{ background: C.green }}>
              <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14, fontWeight: 600 }}>Start</span>
            </button>
          </>
        )}

        {(phase === "waiting" || phase === "ready") && (
          <div className="flex flex-col items-center mt-10 gap-4">
            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11 }}>Trial {trial + 1} of 3</p>
            <button
              onClick={handleTap}
              className="rounded-full flex items-center justify-center transition-transform active:scale-95"
              style={{ width: 160, height: 160, background: phase === "ready" ? C.green : C.greenDim }}
            >
              <Ear size={40} color={phase === "ready" ? "#FFFFFF" : C.green} />
            </button>
            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12, textAlign: "center" }}>
              {phase === "waiting" ? "Wait for the tone…" : "Tap now!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const METRICS = [
  { k: "bp", l: "BP", color: C.coral, dim: C.coralDim },
  { k: "heartRate", l: "Heart Rate", color: C.coral, dim: C.coralDim },
  { k: "hba1c", l: "HBA1c", color: C.marigold, dim: C.marigoldDim },
  { k: "sugar", l: "Fasting Sugar", color: C.teal, dim: C.tealDim },
  { k: "activity", l: "Activity", color: C.green, dim: C.greenDim },
  { k: "bmi", l: "BMI", color: C.coral, dim: C.coralDim },
  { k: "weight", l: "Weight", color: C.marigold, dim: C.marigoldDim },
  { k: "water", l: "Water", color: C.teal, dim: C.tealDim },
  { k: "spo2", l: "SpO2", color: C.green, dim: C.greenDim },
];

// Children's trends deliberately exclude BP, HbA1c, Fasting Sugar, and SpO2 \u2014 these aren't
// routinely monitored for healthy young children without a specific medical reason. Height
// (growth) takes BP's old slot instead, since growth tracking is the core of pediatric monitoring.
const CHILD_METRICS = [
  { k: "height", l: "Height", color: C.coral, dim: C.coralDim },
  { k: "heartRate", l: "Heart Rate", color: C.coral, dim: C.coralDim },
  { k: "weight", l: "Weight", color: C.marigold, dim: C.marigoldDim },
  { k: "bmi", l: "BMI", color: C.marigold, dim: C.marigoldDim },
  { k: "activity", l: "Activity", color: C.green, dim: C.greenDim },
  { k: "water", l: "Water", color: C.teal, dim: C.tealDim },
];

const METRIC_INFO = {
  bp: "Blood Pressure measures the force of blood against artery walls, shown as systolic/diastolic (e.g. 120/80). A normal resting reading is under 120/80 mmHg; consistently higher readings can strain the heart and arteries over time.",
  heartRate: "Heart Rate (pulse) is the number of times your heart beats per minute at rest. A normal adult resting rate is roughly 60\u2013100 bpm. Much lower or higher can be a sign of an underlying issue, or simply higher fitness (athletes often run lower).",
  hba1c: "HbA1c reflects average blood sugar levels over the past 2\u20133 months, not a single moment. Below 5.7% is considered normal, 5.7\u20136.4% is prediabetic range, and 6.5%+ is generally used to flag diabetes.",
  sugar: "Fasting Sugar is your blood glucose level measured after not eating for several hours (usually overnight). A normal fasting reading is under 100 mg/dL; 100\u2013125 is prediabetic range, 126+ suggests diabetes.",
  activity: "Activity tracks daily steps and estimated calories burned. Step counts are a simple proxy for overall movement \u2014 more consistent daily activity is generally linked to better cardiovascular and metabolic health.",
  bmi: "BMI (Body Mass Index) estimates body fat using height and weight. 18.5\u201324.9 is considered a normal range, 25\u201329.9 is overweight, and 30+ is considered obese \u2014 though BMI doesn't account for muscle mass or body composition.",
  weight: "Weight is tracked over time to spot meaningful trends rather than day-to-day fluctuation, which is normal and can shift due to water, food, or activity.",
  water: "Water Intake is an estimate of daily fluid consumption. General guidance suggests around 2\u20132.5 liters a day for adults, though needs vary by body size, climate, and activity level.",
  spo2: "SpO2 measures the percentage of oxygen being carried by your blood. A healthy reading is typically 95\u2013100%; readings persistently below 95% can be worth discussing with a doctor.",
  height: "Height tracks a child's growth over time \u2014 the single most important measure in pediatric checkups. Doctors compare it against age-based growth charts (percentiles) rather than a fixed number, since a healthy range varies a lot by age.",
};

function MemberDetail({ member, onBack, goRecords }) {
  const isChild = member.id === "aadyaa" || member.id === "niyathi";
  const memberMetrics = isChild ? CHILD_METRICS : METRICS;
  const [metric, setMetric] = useState(isChild ? "height" : "bp");
  const [gameView, setGameView] = useState(null); // null | "hub" | "memory" | "reading" | "thinking" | "hearing"
  const [sessionHistory, setSessionHistory] = useState(() =>
    COGNITIVE_HISTORY[member.id] ? JSON.parse(JSON.stringify(COGNITIVE_HISTORY[member.id])) : null
  );
  const [showUploadSheet, setShowUploadSheet] = useState(false);
  const [extraAllergies, setExtraAllergies] = useState([]);
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [newAllergy, setNewAllergy] = useState("");
  const [showMetricInfo, setShowMetricInfo] = useState(false);
  const [dietExpanded, setDietExpanded] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [expandedProcs, setExpandedProcs] = useState({});
  const [showTestInfo, setShowTestInfo] = useState(null);
  const [showMedInfo, setShowMedInfo] = useState(null);
  const chartData = member.vitals;

  const recordGameResult = (category, score) => {
    setSessionHistory((prev) => {
      const next = { ...prev, [category]: [...(prev[category] || []), score], totalMinutes: (prev.totalMinutes || 0) + 2 };
      return next;
    });
    setGameView("hub");
  };

  if (gameView === "hub" && sessionHistory) {
    return <PlayGameHub member={member} history={sessionHistory} onBack={() => setGameView(null)} onOpenGame={(k) => setGameView(k)} />;
  }
  if (gameView === "memory") {
    return <ColorMemoryGame member={member} onBack={() => setGameView("hub")} onComplete={(s) => recordGameResult("memory", s)} />;
  }
  if (gameView === "reading") {
    return <ReadingGame member={member} onBack={() => setGameView("hub")} onComplete={(s) => recordGameResult("reading", s)} />;
  }
  if (gameView === "thinking") {
    return <ThinkingGame member={member} onBack={() => setGameView("hub")} onComplete={(s) => recordGameResult("thinking", s)} />;
  }
  if (gameView === "hearing") {
    return <HearingGame member={member} onBack={() => setGameView("hub")} onComplete={(s) => recordGameResult("hearing", s)} />;
  }

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[member.risk]}` }}
        >
          <MemberAvatar memberId={member.id} size={43} />
        </div>
        <div>
          <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>{member.name}</h1>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>{member.relation}</p>
        </div>
        <div className="ml-auto"><Pill_ status={member.risk}>{STATUS_LABEL[member.risk]}</Pill_></div>
      </div>

      <div className="px-5">
        <SectionLabel
          action={
            <button
              onClick={() => setShowUploadSheet(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: C.marigoldDim }}
              title="Upload a medical report"
            >
              <Plus size={17} color={C.marigold} />
            </button>
          }
        >
          Body Health Map
        </SectionLabel>
        <BodySystemMap memberId={member.id} onSystemClick={(k) => setSelectedSystem(k)} />

        <SectionLabel>Trends</SectionLabel>

        <div className={`grid ${isChild ? "grid-cols-3" : "grid-cols-4"} gap-2 mb-3`}>
          {memberMetrics.map((t) => (
            <button
              key={t.k}
              onClick={() => setMetric(t.k)}
              className="px-2 py-1.5 rounded-full text-xs font-medium text-center"
              style={{
                background: t.dim,
                color: t.color,
                border: `1.5px solid ${metric === t.k ? t.color : "transparent"}`,
                fontWeight: metric === t.k ? 700 : 500,
                fontFamily: FONT_BODY,
              }}
            >
              {t.l}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-3 px-1">
          <Mic size={12} color={C.textFaint} className="shrink-0" />
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, lineHeight: 1.3, fontStyle: "italic" }}>
            You can add today's reading here with Voice Assist — e.g. "nairu, today's weight is 84 kg"
          </p>
        </div>

        <div className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
          {(() => {
            if (metric === "activity") {
              const latest = chartData[chartData.length - 1];
              return (
                <div className="flex items-center justify-between mb-3 pb-3" style={{ borderBottom: `1px solid ${C.borderSoft}` }}>
                  <div>
                    <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>Activity</span>
                    <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11, marginTop: 1 }}>{latest.steps.toLocaleString()} steps today</p>
                  </div>
                  <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                    <span
                      className="absolute inset-0 rounded-full animate-spin"
                      style={{ border: `2.5px solid ${C.greenDim}`, borderTopColor: C.green, animationDuration: "1.8s" }}
                    />
                    <Footprints size={18} color={C.green} className="animate-bounce" />
                  </div>
                </div>
              );
            }
            const latest = chartData[chartData.length - 1];
            const prev = chartData[chartData.length - 2] || latest;

            let label, note, value, dir, color;
            if (metric === "height") {
              label = "Height";
              value = `${latest.height} cm`;
              dir = latest.height === prev.height ? null : latest.height > prev.height ? "up" : "down";
              note = dir === "down" ? "Unusual \u2014 worth double-checking this measurement" : "Growing steadily";
              color = dir === "down" ? C.coral : C.green;
            } else if (metric === "bp") {
              const lab = RISK_PARAMS.find((r) => r.member === member.name && r.label === "Blood Pressure");
              label = "Blood Pressure";
              value = `${latest.sys}/${latest.dia}`;
              dir = latest.sys === prev.sys ? null : latest.sys > prev.sys ? "up" : "down";
              note = lab ? lab.note : dir === "up" ? "Rising over recent months" : dir === "down" ? "Improving over recent months" : "Steady over recent months";
              color = lab ? STATUS_COLOR[lab.status] : dir === "up" ? C.coral : C.green;
            } else if (metric === "heartRate") {
              label = "Heart Rate";
              value = `${latest.heartRate} bpm`;
              dir = latest.heartRate === prev.heartRate ? null : latest.heartRate > prev.heartRate ? "up" : "down";
              // Normal resting heart rate ranges shift a lot with age \u2014 a rate that's abnormal
              // for an adult can be completely normal for a toddler.
              const [rangeLow, rangeHigh] = member.id === "niyathi" ? [80, 130] : member.id === "aadyaa" ? [70, 120] : [60, 100];
              const isAbnormal = latest.heartRate < rangeLow || latest.heartRate > rangeHigh;
              note = isAbnormal
                ? latest.heartRate > rangeHigh
                  ? `Above normal resting range (${rangeLow}\u2013${rangeHigh} bpm)`
                  : `Below normal resting range (${rangeLow}\u2013${rangeHigh} bpm)`
                : "Within normal resting range";
              color = isAbnormal ? C.coral : C.green;
            } else if (metric === "hba1c") {
              const lab = RISK_PARAMS.find((r) => r.member === member.name && r.label === "HbA1c");
              label = "HbA1c";
              value = `${latest.hba1c}%`;
              dir = latest.hba1c === prev.hba1c ? null : latest.hba1c > prev.hba1c ? "up" : "down";
              note = lab ? lab.note : dir === "up" ? "Rising over recent months" : dir === "down" ? "Improving over recent months" : "Steady over recent months";
              color = lab ? STATUS_COLOR[lab.status] : dir === "up" ? C.coral : C.green;
            } else if (metric === "bmi") {
              label = "BMI";
              value = `${latest.bmi}`;
              dir = latest.bmi === prev.bmi ? null : latest.bmi > prev.bmi ? "up" : "down";
              note = dir === "up" ? "Rising over recent months" : dir === "down" ? "Improving over recent months" : "Steady over recent months";
              color = dir === "up" ? C.coral : C.green;
            } else if (metric === "weight") {
              label = "Weight";
              value = `${latest.weight} kg`;
              dir = latest.weight === prev.weight ? null : latest.weight > prev.weight ? "up" : "down";
              note = dir === "up" ? "Trending up over recent months" : dir === "down" ? "Trending down over recent months" : "Steady over recent months";
              color = C.marigold;
            } else if (metric === "water") {
              label = "Water Intake";
              value = `${latest.water} L`;
              dir = latest.water === prev.water ? null : latest.water > prev.water ? "up" : "down";
              note = dir === "up" ? "Improving over recent months" : dir === "down" ? "Dropping over recent months" : "Steady over recent months";
              color = dir === "up" ? C.green : C.marigold;
            } else if (metric === "spo2") {
              label = "SpO2";
              value = `${latest.spo2}%`;
              dir = latest.spo2 === prev.spo2 ? null : latest.spo2 > prev.spo2 ? "up" : "down";
              note = dir === "down" ? "Declining over recent months" : dir === "up" ? "Improving over recent months" : "Steady over recent months";
              color = dir === "down" ? C.coral : C.green;
            } else {
              label = "Blood Sugar";
              value = `${latest.sugar} mg/dL`;
              dir = latest.sugar === prev.sugar ? null : latest.sugar > prev.sugar ? "up" : "down";
              note = dir === "up" ? "Rising over recent months" : dir === "down" ? "Improving over recent months" : "Steady over recent months";
              color = dir === "up" ? C.marigold : C.green;
            }

            return (
              <div className="flex items-center justify-between mb-3 pb-3" style={{ borderBottom: `1px solid ${C.borderSoft}` }}>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{label}</span>
                    <button
                      onClick={() => setShowMetricInfo(true)}
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: C.surfaceAlt }}
                    >
                      <Info size={11} color={C.textMuted} />
                    </button>
                  </div>
                  <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11, marginTop: 1 }}>{note}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span style={{ fontFamily: FONT_MONO, color, fontSize: 15, fontWeight: 700 }}>{value}</span>
                  {dir === "up" ? (
                    <ArrowUpRight size={14} color={color} />
                  ) : dir === "down" ? (
                    <ArrowDownRight size={14} color={color} />
                  ) : null}
                </div>
              </div>
            );
          })()}
          <ResponsiveContainer width="100%" height={160}>
            {metric === "height" ? (
              <LineChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                <CartesianGrid stroke={C.borderSoft} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={34} domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                <Line type="monotone" dataKey="height" stroke={C.coral} strokeWidth={2} dot={{ r: 2.5 }} name="Height (cm)" />
              </LineChart>
            ) : metric === "bp" ? (
              <LineChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                <CartesianGrid stroke={C.borderSoft} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                <Line type="monotone" dataKey="sys" stroke={C.coral} strokeWidth={2} dot={{ r: 2.5 }} name="Systolic" />
                <Line type="monotone" dataKey="dia" stroke={C.teal} strokeWidth={2} dot={{ r: 2.5 }} name="Diastolic" />
              </LineChart>
            ) : metric === "heartRate" ? (
              (() => {
                const [hrLow, hrHigh] = member.id === "niyathi" ? [80, 130] : member.id === "aadyaa" ? [70, 120] : [60, 100];
                return (
                  <LineChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                    <CartesianGrid stroke={C.borderSoft} vertical={false} />
                    <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={30} domain={["dataMin - 10", "dataMax + 10"]} />
                    <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                    <ReferenceLine y={hrHigh} stroke={C.coral} strokeDasharray="4 4" strokeWidth={1.3} label={{ value: "High", position: "insideTopRight", fill: C.coral, fontSize: 9, fontFamily: FONT_BODY }} />
                    <ReferenceLine y={hrLow} stroke={C.coral} strokeDasharray="4 4" strokeWidth={1.3} label={{ value: "Low", position: "insideBottomRight", fill: C.coral, fontSize: 9, fontFamily: FONT_BODY }} />
                    <Line type="monotone" dataKey="heartRate" stroke={C.coral} strokeWidth={2} dot={{ r: 2.5 }} name="Heart Rate (bpm)" />
                  </LineChart>
                );
              })()
            ) : metric === "sugar" ? (
              <AreaChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                <defs>
                  <linearGradient id="sugarFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.teal} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={C.borderSoft} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                <Area type="monotone" dataKey="sugar" stroke={C.teal} fill="url(#sugarFill)" strokeWidth={2} name="Fasting sugar" />
              </AreaChart>
            ) : metric === "hba1c" ? (
              <LineChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                <CartesianGrid stroke={C.borderSoft} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={30} domain={["dataMin - 0.3", "dataMax + 0.3"]} />
                <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                <Line type="monotone" dataKey="hba1c" stroke={C.marigold} strokeWidth={2} dot={{ r: 2.5 }} name="HbA1c %" />
              </LineChart>
            ) : metric === "bmi" ? (
              <LineChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                <CartesianGrid stroke={C.borderSoft} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={30} domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                <Line type="monotone" dataKey="bmi" stroke={C.coral} strokeWidth={2} dot={{ r: 2.5 }} name="BMI" />
              </LineChart>
            ) : metric === "weight" ? (
              <LineChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                <CartesianGrid stroke={C.borderSoft} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={34} domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                <Line type="monotone" dataKey="weight" stroke={C.marigold} strokeWidth={2} dot={{ r: 2.5 }} name="Weight (kg)" />
              </LineChart>
            ) : metric === "water" ? (
              <AreaChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                <defs>
                  <linearGradient id="waterFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.teal} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={C.borderSoft} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                <Area type="monotone" dataKey="water" stroke={C.teal} fill="url(#waterFill)" strokeWidth={2} name="Water (L)" />
              </AreaChart>
            ) : metric === "spo2" ? (
              <LineChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                <CartesianGrid stroke={C.borderSoft} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={30} domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                <Line type="monotone" dataKey="spo2" stroke={C.green} strokeWidth={2} dot={{ r: 2.5 }} name="SpO2 %" />
              </LineChart>
            ) : (
              <BarChart data={chartData} margin={{ left: -20, right: 5, top: 5 }}>
                <CartesianGrid stroke={C.borderSoft} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.textFaint, fontSize: 10, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} width={34} />
                <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: FONT_BODY, fontSize: 12 }} labelStyle={{ color: C.text }} />
                <Bar dataKey="steps" fill={C.green} radius={[4, 4, 0, 0]} name="Steps" />
              </BarChart>
            )}
          </ResponsiveContainer>

          {(() => {
            const labs = RISK_PARAMS.filter((r) => r.member === member.name && r.label !== "Blood Pressure" && r.label !== "HbA1c");
            if (labs.length === 0) return null;
            return (
              <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
                {labs.map((r, i) => (
                  <div key={i} className="rounded-xl px-3 py-2 flex items-center gap-2" style={{ background: STATUS_DIM[r.status] }}>
                    <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 11, fontWeight: 600 }}>{r.label}</span>
                    <span style={{ fontFamily: FONT_MONO, color: STATUS_COLOR[r.status], fontSize: 11.5, fontWeight: 700 }}>{r.value}</span>
                    {r.dir === "up" ? <ArrowUpRight size={12} color={STATUS_COLOR[r.status]} /> : <ArrowDownRight size={12} color={STATUS_COLOR[r.status]} />}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {metric === "activity" && (
          <div className="grid grid-cols-2 gap-2 mt-2.5">
            <div className="rounded-2xl py-3 flex flex-col items-center" style={{ background: C.greenDim }}>
              <span style={{ fontFamily: FONT_MONO, color: C.green, fontSize: 16 }}>
                {chartData[chartData.length - 1].steps.toLocaleString()}
              </span>
              <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 10 }}>Avg. daily steps</span>
            </div>
            <div className="rounded-2xl py-3 flex flex-col items-center" style={{ background: C.marigoldDim }}>
              <span style={{ fontFamily: FONT_MONO, color: C.marigold, fontSize: 16 }}>
                {chartData[chartData.length - 1].cal.toLocaleString()}
              </span>
              <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 10 }}>Avg. calories burned/day</span>
            </div>
          </div>
        )}

        {(() => {
          const cbc = CBC_REPORTS[member.id] || [];
          return (
            <>
              <SectionLabel>CBC Report</SectionLabel>
              {cbc.length === 0 ? (
                <div className="rounded-2xl px-4 py-3 flex items-center gap-2.5" style={{ background: C.greenDim }}>
                  <CheckCircle2 size={15} color={C.green} className="shrink-0" />
                  <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12, lineHeight: 1.4 }}>
                    All Complete Blood Count parameters are within normal range — nothing to flag.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {cbc.map((p, i) => (
                    <div key={i} className="rounded-2xl px-4 py-3" style={{ background: STATUS_DIM[p.status] }}>
                      <div className="flex items-center justify-between">
                        <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 600 }}>{p.param}</span>
                        <span style={{ fontFamily: FONT_MONO, color: STATUS_COLOR[p.status], fontSize: 13, fontWeight: 700 }}>{p.value}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11 }}>
                          Normal range: {p.range}
                        </p>
                        <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10 }}>{p.date}</span>
                      </div>
                      <p style={{ fontFamily: FONT_BODY, color: STATUS_COLOR[p.status], fontSize: 11, marginTop: 2, fontWeight: 500 }}>
                        {p.note}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        })()}

        {DIET_PLANS[member.id] && (() => {
          const diet = DIET_PLANS[member.id];
          const pct = Math.min(100, Math.round((diet.caloriesToday / diet.calorieTarget) * 100));
          return (
            <>
              <SectionLabel>Diet</SectionLabel>
              <div className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: C.greenDim }}>
                    <Salad size={15} color={C.green} />
                  </div>
                  <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 700, flex: 1 }}>{diet.dietType}</span>
                  <button onClick={() => setDietExpanded((v) => !v)} className="p-1 -mr-1">
                    <ChevronDown
                      size={16}
                      color={C.textFaint}
                      style={{ transition: "transform 0.15s", transform: dietExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5 }}>Calories today</span>
                  <span style={{ fontFamily: FONT_MONO, color: C.text, fontSize: 12, fontWeight: 600 }}>
                    {diet.caloriesToday.toLocaleString()} / {diet.calorieTarget.toLocaleString()} kcal
                  </span>
                </div>
                <div className="w-full rounded-full overflow-hidden" style={{ height: 8, background: C.surfaceAlt }}>
                  <div className="nh-bar-fill h-full rounded-full" style={{ width: `${pct}%`, background: pct > 100 ? C.coral : C.green }} />
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Mic size={11} color={C.textFaint} className="shrink-0" />
                  <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, lineHeight: 1.3, fontStyle: "italic" }}>
                    You can enter what you ate here with Voice Assist — e.g. "nairu, I had 2 rotis and dal for lunch"
                  </p>
                </div>

                {dietExpanded && (
                  <div className="nh-fade-in-up">
                    <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, letterSpacing: "0.03em", marginTop: 16, marginBottom: 6 }}>RECOMMENDED FOODS</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {diet.recommended.map((f, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full" style={{ background: C.greenDim, color: C.green, fontFamily: FONT_BODY, fontSize: 10.5, fontWeight: 500 }}>
                          {f}
                        </span>
                      ))}
                    </div>

                    <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, letterSpacing: "0.03em", marginBottom: 6 }}>FOODS TO LIMIT OR AVOID</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {diet.avoid.map((f, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full" style={{ background: C.coralDim, color: C.coral, fontFamily: FONT_BODY, fontSize: 10.5, fontWeight: 500 }}>
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="rounded-xl px-3 py-2.5" style={{ background: C.tealDim }}>
                      <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 11.5, lineHeight: 1.5 }}>{diet.tip}</p>
                    </div>

                    <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, letterSpacing: "0.03em", marginTop: 16, marginBottom: 8 }}>
                      DIETITIAN VISITS
                    </p>
                    <VisitLogList entries={DIET_VISIT_LOG[member.id]} />
                  </div>
                )}
              </div>
            </>
          );
        })()}

        {(() => {
          const labs = RISK_PARAMS.filter((r) => r.member === member.name);
          const tests = PENDING_TESTS.filter((t) => t.member === member.name);
          if (tests.length === 0) return null;
          return (
            <>
              {tests.length > 0 && (
                <>
                  <SectionLabel>Pending &amp; recommended tests</SectionLabel>
                  <div className="flex flex-col gap-2">
                    {tests.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: t.urgent ? C.coralDim : C.surfaceAlt }}>
                          <CalendarClock size={15} color={t.urgent ? C.coral : C.textMuted} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 500 }}>{t.label}</p>
                            <button
                              onClick={() => setShowTestInfo(t.label)}
                              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: C.surfaceAlt }}
                            >
                              <Info size={10} color={C.textMuted} />
                            </button>
                          </div>
                          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>{t.due}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          );
        })()}

        {sessionHistory && (
          <>
            <SectionLabel>Play games</SectionLabel>
            <button
              onClick={() => setGameView("hub")}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
              style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
                <Brain size={16} color={C.teal} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>
                  {sessionHistory.totalMinutes} min played · 4 games
                </p>
                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>Memory, reading, thinking &amp; hearing checks</p>
              </div>
              <ChevronRight size={14} color={C.textFaint} />
            </button>
          </>
        )}


        {(() => {
          const plan = CARE_PLANS[member.id];
          const surgeries = SURGICAL_HISTORY[member.id] || [];
          const meds = MEDICATIONS.filter((m) => m.member === member.name);
          const reports = RECENT_UPLOADS.filter((r) => r.who === member.name);

          return (
            <>
              {plan && (
                <>
                  <SectionLabel>{plan.title}</SectionLabel>
                  <div className="rounded-2xl p-4 mb-1" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                    <div className="flex flex-col gap-2">
                      {plan.items.map((it, i) => {
                        const Icon = CARE_STATUS_ICON[it.status];
                        const color = C[CARE_STATUS_COLOR[it.status]];
                        return (
                          <div key={i} className="flex items-start gap-2">
                            <Icon size={14} color={color} className="mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12, fontWeight: 500 }}>{it.task}</p>
                              <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{it.freq} · {it.note}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {meds.length > 0 && (
                <>
                  <SectionLabel>Current medications</SectionLabel>
                  <div className="flex flex-col gap-2">
                    {meds.map((med, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-2xl px-4 py-3" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: C.tealDim }}>
                          <Pill size={14} color={C.teal} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 600 }}>{med.name}</p>
                            <button
                              onClick={() => setShowMedInfo(med.name)}
                              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: C.surfaceAlt }}
                            >
                              <Info size={10} color={C.textMuted} />
                            </button>
                          </div>
                          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{med.schedule}</p>
                          {med.prescription && (
                            <div className="mt-1.5">
                              <DocumentChip label={med.prescription} summary={med.summary} />
                            </div>
                          )}
                        </div>
                        <span style={{ fontFamily: FONT_BODY, color: med.daysLeft <= 5 ? C.coral : C.textFaint, fontSize: 10.5, fontWeight: 600 }}>
                          {med.daysLeft}d left
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {surgeries.length > 0 && (
                <>
                  <SectionLabel>Surgical history</SectionLabel>
                  <div className="flex flex-col gap-2">
                    {surgeries.map((proc, i) => {
                      const key = `proc-${i}`;
                      const isOpen = !!expandedProcs[key];
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                          <button
                            onClick={() => setExpandedProcs((prev) => ({ ...prev, [key]: !prev[key] }))}
                            className="w-full flex items-center justify-between p-4 text-left"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 600 }}>{proc.procedure}</span>
                                <span style={{ fontFamily: FONT_MONO, color: C.textFaint, fontSize: 10.5 }}>{proc.date}</span>
                              </div>
                              <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11, marginTop: 2 }}>{proc.detail}</p>
                            </div>
                            <ChevronRight
                              size={15}
                              color={C.textFaint}
                              className="shrink-0 ml-2 transition-transform"
                              style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                            />
                          </button>
                          {isOpen && (
                            <div className="nh-fade-in-up px-4 pb-4 flex flex-col gap-2" style={{ borderTop: `1px solid ${C.borderSoft}`, paddingTop: 12 }}>
                              <div className="flex items-center gap-2">
                                <Building2 size={13} color={C.textMuted} className="shrink-0" />
                                <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5 }}>{proc.hospital}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Stethoscope size={13} color={C.textMuted} className="shrink-0" />
                                <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5 }}>{proc.doctor}</span>
                              </div>
                              <div className="rounded-xl px-3 py-2.5 mt-1" style={{ background: C.greenDim }}>
                                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10, letterSpacing: "0.03em", marginBottom: 3 }}>OUTCOME</p>
                                <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 11.5, lineHeight: 1.5 }}>{proc.outcome}</p>
                              </div>
                              {proc.report && (
                                <div className="mt-1">
                                  <DocumentChip label={proc.report} summary={proc.summary} />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {(() => {
                const profile = EMERGENCY_PROFILES[member.id];
                const onFile = profile ? profile.allergies.filter((a) => a !== "None known") : [];
                const allAllergies = [...onFile, ...extraAllergies];
                const hasAllergy = allAllergies.length > 0;
                return (
                  <>
                    <div
                      className="rounded-2xl px-4 py-3 mt-4 flex items-center gap-3"
                      style={{ background: hasAllergy ? C.coralDim : C.surfaceAlt }}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: hasAllergy ? C.coral : C.borderSoft }}
                      >
                        <AlertTriangle size={16} color={hasAllergy ? "#FFFFFF" : C.textMuted} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, letterSpacing: "0.03em" }}>KNOWN ALLERGIES</p>
                        <p style={{ fontFamily: FONT_BODY, color: hasAllergy ? C.coral : C.textMuted, fontSize: 13.5, fontWeight: 700 }}>
                          {hasAllergy ? allAllergies.join(", ") : "None known"}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowAddAllergy((v) => !v)}
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: hasAllergy ? "rgba(255,255,255,0.6)" : C.surface }}
                      >
                        <Plus size={15} color={C.coral} />
                      </button>
                    </div>

                    {showAddAllergy && (
                      <div className="rounded-2xl p-3 mt-2 flex items-center gap-2" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                        <input
                          value={newAllergy}
                          onChange={(e) => setNewAllergy(e.target.value)}
                          placeholder="e.g. Sulfa drugs"
                          className="flex-1 rounded-xl px-3 py-2"
                          style={{ background: C.surfaceAlt, border: `1px solid ${C.borderSoft}`, fontFamily: FONT_BODY, fontSize: 13, color: C.text, outline: "none" }}
                        />
                        <button
                          onClick={() => {
                            if (!newAllergy.trim()) return;
                            setExtraAllergies((prev) => [...prev, newAllergy.trim()]);
                            setNewAllergy("");
                            setShowAddAllergy(false);
                          }}
                          className="rounded-xl px-4 py-2"
                          style={{ background: C.coral, fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 12.5, fontWeight: 600 }}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}

              <SectionLabel>Recent reports</SectionLabel>
              <div className="flex flex-col gap-2">
                {reports.length > 0 ? (
                  reports.map((r, i) => (
                    <ReportRow
                      key={i}
                      title={r.t}
                      subtitle={`${r.when} · ${r.lab}`}
                      summary={r.summary}
                      leading={<FileText size={16} color={C.textMuted} className="shrink-0" />}
                    />
                  ))
                ) : (
                  <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12, textAlign: "center", padding: "12px 0" }}>
                    No reports uploaded yet for {member.name}.
                  </p>
                )}
              </div>
            </>
          );
        })()}
      </div>

      {showUploadSheet && (
        <UploadSourceSheet
          onClose={() => setShowUploadSheet(false)}
          onSelect={() => {
            setShowUploadSheet(false);
            goRecords();
          }}
        />
      )}

      {showMetricInfo && (
        <div
          className="nh-modal-backdrop absolute inset-0 z-40 flex items-center justify-center px-6"
          style={{ background: "rgba(6,9,20,0.6)" }}
          onClick={() => setShowMetricInfo(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="nh-modal-card w-full rounded-2xl p-5"
            style={{ background: C.surfaceAlt, maxWidth: 320 }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
                <Info size={14} color={C.teal} />
              </div>
              <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontWeight: 700 }}>
                {memberMetrics.find((m) => m.k === metric)?.l}
              </span>
            </div>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, lineHeight: 1.55 }}>
              {METRIC_INFO[metric]}
            </p>
            <button
              onClick={() => setShowMetricInfo(false)}
              className="w-full rounded-xl py-2.5 mt-4"
              style={{ background: C.teal, fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {selectedSystem && (
        <BodySystemDetail member={member} systemKey={selectedSystem} onClose={() => setSelectedSystem(null)} />
      )}

      {showTestInfo && (
        <div
          className="nh-modal-backdrop absolute inset-0 z-40 flex items-center justify-center px-6"
          style={{ background: "rgba(6,9,20,0.6)" }}
          onClick={() => setShowTestInfo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="nh-modal-card w-full rounded-2xl p-5"
            style={{ background: C.surfaceAlt, maxWidth: 320 }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
                <Info size={14} color={C.teal} />
              </div>
              <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontWeight: 700 }}>{showTestInfo}</span>
            </div>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, lineHeight: 1.55 }}>
              {TEST_INFO[showTestInfo]}
            </p>
            <button
              onClick={() => setShowTestInfo(null)}
              className="w-full rounded-xl py-2.5 mt-4"
              style={{ background: C.teal, fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {showMedInfo && (
        <div
          className="nh-modal-backdrop absolute inset-0 z-40 flex items-center justify-center px-6"
          style={{ background: "rgba(6,9,20,0.6)" }}
          onClick={() => setShowMedInfo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="nh-modal-card w-full rounded-2xl p-5"
            style={{ background: C.surfaceAlt, maxWidth: 320 }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
                <Pill size={14} color={C.teal} />
              </div>
              <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontWeight: 700 }}>{showMedInfo}</span>
            </div>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, lineHeight: 1.55 }}>
              {MEDICATION_INFO[showMedInfo]}
            </p>
            <button
              onClick={() => setShowMedInfo(null)}
              className="w-full rounded-xl py-2.5 mt-4"
              style={{ background: C.teal, fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   RECORDS / UPLOAD SCREEN
----------------------------------------------------------------*/
/* ---------------------------------------------------------------
   GENERAL (hub for less-frequent, reference-style features)
----------------------------------------------------------------*/
/* ---------------------------------------------------------------
   BOOK A SERVICE (physio, yoga, health checkup at home)
----------------------------------------------------------------*/
const SERVICE_CATEGORY_ICON = { Physiotherapy: Activity, Yoga: Sparkles, "Health Checkup": Stethoscope };

function BookServiceScreen({ onBack }) {
  const [category, setCategory] = useState("All");
  const list = category === "All" ? SERVICE_PROVIDERS : SERVICE_PROVIDERS.filter((p) => p.category === category);

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="p-1 -ml-1">
            <ChevronLeft size={20} color={C.textMuted} />
          </button>
        )}
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Services</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          Physio, yoga & health checkups at home — call directly to book.
        </p>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {SERVICE_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium shrink-0"
              style={{
                background: category === c ? C.marigoldDim : "transparent",
                color: category === c ? C.marigold : C.textFaint,
                border: `1px solid ${category === c ? C.marigold : C.borderSoft}`,
                fontFamily: FONT_BODY,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {list.map((p, i) => {
            const Icon = SERVICE_CATEGORY_ICON[p.category] || Activity;
            return (
              <div key={i} className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
                    <Icon size={18} color={C.teal} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13.5, fontWeight: 600 }}>{p.name}</span>
                      <div className="flex items-center gap-1">
                        <Star size={12} color={C.marigold} fill={C.marigold} />
                        <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11 }}>{p.rating}</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11, marginTop: 1 }}>{p.subtitle}</p>
                    <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11, marginTop: 2 }}>{p.price}</p>
                  </div>
                </div>

                <a
                  href={`tel:${p.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-xl py-2.5 mt-3"
                  style={{ background: C.marigold, textDecoration: "none" }}
                >
                  <Phone size={14} color="#FFFFFF" />
                  <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 12.5, fontWeight: 600 }}>
                    Call {p.phone}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GeneralScreen({ goExpenses, goDiscover, goEmergency, goInsurance, goFamily, goDictionary }) {
  const items = [
    {
      key: "family",
      title: "Family",
      subtitle: "Profiles, family tree & documents",
      icon: Users,
      color: "teal",
      onClick: goFamily,
    },
    {
      key: "dictionary",
      title: "Glossary",
      subtitle: "Plain-language medical terms",
      icon: BookOpen,
      color: "teal",
      onClick: goDictionary,
    },
    {
      key: "expenses",
      title: "Medical Expenses",
      subtitle: "Spending by person, forecast ahead",
      icon: Wallet,
      color: "marigold",
      onClick: goExpenses,
    },
    {
      key: "discover",
      title: "Auto Discover",
      subtitle: "Nearby hospitals, clinics & pharmacies",
      icon: MapPin,
      color: "coral",
      onClick: goDiscover,
    },
    {
      key: "emergency",
      title: "Emergency Kit",
      subtitle: "IDs, insurance & contacts, ready to share",
      icon: ShieldCheck,
      color: "coral",
      onClick: goEmergency,
    },
    {
      key: "insurance",
      title: "Insurance Planner",
      subtitle: "Coverage gaps & recommendations",
      icon: Landmark,
      color: "green",
      onClick: goInsurance,
    },
  ];

  return (
    <div className="px-5 pb-6 pt-6">
      <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 22, fontWeight: 500 }}>More</h1>
      <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
        Records, finances & emergency info — the things you check occasionally, not every day.
      </p>
      <div className="flex flex-col gap-2.5 mt-5">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={it.onClick}
            className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left active:scale-[0.98] transition-transform"
            style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: C[it.color + "Dim"] }}>
              <it.icon size={18} color={C[it.color]} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13.5, fontWeight: 600 }}>{it.title}</p>
              <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11 }}>{it.subtitle}</p>
            </div>
            <ChevronRight size={16} color={C.textFaint} />
          </button>
        ))}
      </div>
    </div>
  );
}

function RecordsScreen({ onBack }) {
  const [status, setStatus] = useState("idle"); // idle | processing | done
  const [showUploadSheet, setShowUploadSheet] = useState(false);

  const handleUpload = () => {
    setShowUploadSheet(false);
    setStatus("processing");
    setTimeout(() => setStatus("done"), 1600);
  };

  return (
    <div className="px-5 pb-6 pt-6">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-1 -ml-1">
              <ChevronLeft size={20} color={C.textMuted} />
            </button>
          )}
          <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 22, fontWeight: 500 }}>Reports</h1>
        </div>
        <button onClick={() => setShowUploadSheet(true)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.marigoldDim }}>
          <Plus size={17} color={C.marigold} />
        </button>
      </div>

      {status === "processing" && (
        <div
          className="w-full mt-5 rounded-2xl flex flex-col items-center justify-center gap-3 py-10"
          style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
        >
          <div className="w-8 h-8 rounded-full animate-spin" style={{ border: `3px solid ${C.borderSoft}`, borderTopColor: C.marigold }} />
          <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5 }}>Reading report and extracting values…</span>
        </div>
      )}

      {status === "done" && (
        <div className="mt-5 flex flex-col gap-3">
          <div className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={15} color={C.textMuted} />
              <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>
                HbA1c &amp; Fasting Lipid Panel
              </span>
              <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11, marginLeft: "auto" }}>
                Appa · Aug 12
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background: C.marigoldDim, color: C.marigold, fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600 }}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                  style={{ background: C.surface, border: `1px solid ${C.marigold}`, fontSize: 7, color: C.marigold }}
                >
                  A
                </span>
                Assigned to: Appa
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <Tag size={11} color={C.teal} />
              <span
                className="px-2 py-0.5 rounded-full"
                style={{ background: C.tealDim, color: C.teal, fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600 }}
              >
                Classified as: Blood Test · Diabetes Panel
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={13} color={C.marigold} />
              <span style={{ fontFamily: FONT_BODY, color: C.marigold, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em" }}>
                AI SUMMARY
              </span>
            </div>
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, lineHeight: 1.6 }}>
              Blood sugar control has weakened since the last panel — HbA1c rose from 7.3% to 7.8%,
              above the 7% target for his age group. LDL cholesterol is borderline high at 142 mg/dL.
              Everything else, including kidney and liver markers, is within normal range.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { l: "HbA1c", v: "7.8%", s: "risk" },
                { l: "LDL", v: "142", s: "attention" },
                { l: "eGFR", v: "88", s: "good" },
              ].map((x, i) => (
                <div key={i} className="rounded-xl py-2 flex flex-col items-center" style={{ background: STATUS_DIM[x.s] }}>
                  <span style={{ fontFamily: FONT_MONO, color: STATUS_COLOR[x.s], fontSize: 14 }}>{x.v}</span>
                  <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 9.5 }}>{x.l}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
              <CheckCircle2 size={14} color={C.teal} />
              <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5 }}>
                Automatically filed under Appa's records and sugar trend chart — no manual sorting needed.
              </span>
            </div>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="text-center py-2 rounded-xl text-xs font-medium"
            style={{ color: C.textMuted, fontFamily: FONT_BODY, border: `1px solid ${C.borderSoft}` }}
          >
            Upload another report
          </button>
        </div>
      )}

      <SectionLabel>Recent uploads</SectionLabel>
      <div className="flex flex-col gap-2">
        {RECENT_UPLOADS.map((r, i) => {
          const owner = MEMBERS.find((m) => m.name === r.who);
          return (
            <ReportRow
              key={i}
              title={r.t}
              subtitle={`${r.who} · ${r.when} · ${r.lab}`}
              summary={r.summary}
              leading={
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[owner?.risk || "good"]}` }}
                >
                  <MemberAvatar memberId={owner?.id} size={30} />
                </div>
              }
            />
          );
        })}
      </div>

      {showUploadSheet && (
        <UploadSourceSheet
          onClose={() => setShowUploadSheet(false)}
          onSelect={handleUpload}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   MEDICTIONARY (medical dictionary / glossary)
----------------------------------------------------------------*/
const DICTIONARY_TERMS = [
  {
    term: "HbA1c",
    full: "Glycated Hemoglobin",
    def: "A blood test that shows your average blood sugar level over the past 2\u20133 months \u2014 not just on the day of the test.",
  },
  {
    term: "LDL Cholesterol",
    full: "Low-Density Lipoprotein",
    def: "Often called \u201cbad cholesterol.\u201d High levels can build up in artery walls and raise heart disease risk.",
  },
  {
    term: "eGFR",
    full: "Estimated Glomerular Filtration Rate",
    def: "A measure of how well your kidneys are filtering waste from your blood. Lower numbers can signal reduced kidney function.",
  },
  {
    term: "T-score",
    full: "Bone Density Score",
    def: "Compares your bone density to that of a healthy young adult. Used to screen for osteopenia and osteoporosis.",
  },
  {
    term: "TSH",
    full: "Thyroid-Stimulating Hormone",
    def: "Tells you how hard your pituitary gland is working to make your thyroid produce hormone \u2014 key for diagnosing thyroid issues.",
  },
];

function DictionaryScreen() {
  const [query, setQuery] = useState("");
  const filtered = DICTIONARY_TERMS.filter((t) =>
    t.term.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="px-5 pb-6 pt-6">
      <div className="flex items-center gap-2 mb-1">
        <BookOpen size={18} color={C.marigold} />
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 22, fontWeight: 500 }}>Medictionary</h1>
      </div>
      <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
        Search any medical term to understand it in plain language.
      </p>

      <div
        className="flex items-center gap-2 rounded-2xl px-4 py-3 mt-4"
        style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
      >
        <Search size={16} color={C.textFaint} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search e.g. 'HbA1c', 'eGFR'..."
          className="flex-1 bg-transparent outline-none"
          style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13 }}
        />
      </div>

      <div className="flex flex-col gap-2.5 mt-5">
        {filtered.map((t, i) => (
          <div key={i} className="rounded-2xl px-4 py-3.5" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
            <div className="flex items-baseline gap-2">
              <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14.5, fontWeight: 700 }}>{t.term}</span>
              <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11, fontStyle: "italic" }}>{t.full}</span>
            </div>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>{t.def}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12.5, textAlign: "center", marginTop: 20 }}>
            No matching terms yet — try another search.
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ACTIVITY SCREEN (steps & calories, whole family)
----------------------------------------------------------------*/
function ActivityScreen({ onBack, goMember }) {
  const avgSteps = Math.round(
    MEMBERS.reduce((s, m) => s + m.vitals[m.vitals.length - 1].steps, 0) / MEMBERS.length
  );
  const totalCal = MEMBERS.reduce((s, m) => s + m.vitals[m.vitals.length - 1].cal, 0);

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Steps &amp; Calories</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          Daily activity across the whole family.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="rounded-2xl py-4 flex flex-col items-center" style={{ background: C.greenDim }}>
            <Footprints size={17} color={C.green} />
            <span style={{ fontFamily: FONT_MONO, color: C.green, fontSize: 18, marginTop: 4 }}>
              {avgSteps.toLocaleString()}
            </span>
            <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 10 }}>Avg. steps/day</span>
          </div>
          <div className="rounded-2xl py-4 flex flex-col items-center" style={{ background: C.marigoldDim }}>
            <Flame size={17} color={C.marigold} />
            <span style={{ fontFamily: FONT_MONO, color: C.marigold, fontSize: 18, marginTop: 4 }}>
              {totalCal.toLocaleString()}
            </span>
            <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 10 }}>Family calories/day</span>
          </div>
        </div>

        <SectionLabel>By family member</SectionLabel>
        <div className="flex flex-col gap-3">
          {MEMBERS.map((m) => {
            const latest = m.vitals[m.vitals.length - 1];
            return (
              <button
                key={m.id}
                onClick={() => goMember(m)}
                className="rounded-2xl p-4 text-left w-full"
                style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[m.risk]}` }}
                  >
                    <MemberAvatar memberId={m.id} size={32} />
                  </div>
                  <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{m.name}</span>
                  <span className="ml-auto" style={{ fontFamily: FONT_MONO, color: C.green, fontSize: 13 }}>
                    {latest.steps.toLocaleString()} steps
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={64}>
                  <BarChart data={m.vitals} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                    <Bar dataKey="steps" fill={C.green} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-between mt-1">
                  <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>Last 6 months</span>
                  <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>
                    {latest.cal.toLocaleString()} cal/day avg
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   EXPENSES SCREEN (medical cost calculator, family + individual)
----------------------------------------------------------------*/
function ExpensesScreen({ onBack, goMember }) {
  const familyTotal = EXPENSE_CATEGORIES.reduce((s, c) => s + c.amount, 0);
  const maxMemberSpend = Math.max(...Object.values(MEMBER_EXPENSES));
  const maxCategory = Math.max(...EXPENSE_CATEGORIES.map((c) => c.amount));

  const fmt = (n) => `\u20B9${n.toLocaleString("en-IN")}`;

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Medical Expenses</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          This year's spend, broken down by category and family member.
        </p>

        <div
          className="rounded-2xl p-4 mt-4 flex items-center gap-3"
          style={{ background: `linear-gradient(135deg, ${C.greenDim}, ${C.tealDim})`, border: `1px solid ${C.borderSoft}` }}
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: C.surface }}>
            <Wallet size={19} color={C.green} />
          </div>
          <div>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11 }}>Family total · this year</p>
            <p style={{ fontFamily: FONT_MONO, color: C.text, fontSize: 22, fontWeight: 700 }}>{fmt(familyTotal)}</p>
          </div>
        </div>

        <SectionLabel>By category</SectionLabel>
        <div className="flex flex-col gap-3">
          {EXPENSE_CATEGORIES.map((c, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 500 }}>{c.label}</span>
                <span style={{ fontFamily: FONT_MONO, color: C.text, fontSize: 12.5 }}>{fmt(c.amount)}</span>
              </div>
              <div className="h-2 rounded-full w-full" style={{ background: C.borderSoft }}>
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(c.amount / maxCategory) * 100}%`, background: C[c.color] }}
                />
              </div>
            </div>
          ))}
        </div>

        <SectionLabel>By family member</SectionLabel>
        <div className="flex flex-col gap-2.5">
          {MEMBERS.map((m) => {
            const spend = MEMBER_EXPENSES[m.id] || 0;
            return (
              <button
                key={m.id}
                onClick={() => goMember(m)}
                className="rounded-2xl p-3.5 text-left w-full"
                style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[m.risk]}` }}
                  >
                    <MemberAvatar memberId={m.id} size={32} />
                  </div>
                  <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{m.name}</span>
                  <span className="ml-auto" style={{ fontFamily: FONT_MONO, color: C.text, fontSize: 13, fontWeight: 600 }}>
                    {fmt(spend)}
                  </span>
                </div>
                <div className="h-1.5 rounded-full w-full" style={{ background: C.borderSoft }}>
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${(spend / maxMemberSpend) * 100}%`, background: STATUS_COLOR[m.risk] }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div
          className="flex items-center gap-2.5 rounded-2xl px-4 py-3 mt-4"
          style={{ background: C.tealDim, border: `1px solid ${C.borderSoft}` }}
        >
          <ShieldCheck size={16} color={C.teal} />
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 11.5, lineHeight: 1.4 }}>
            <span style={{ fontWeight: 600 }}>{fmt(24000)}</span> of this year's spend is covered under active insurance policies.
          </p>
        </div>

        {/* ---- Looking ahead: forecast ---- */}
        <SectionLabel>Looking ahead — next 12 months</SectionLabel>
        <div className="flex flex-col gap-2.5">
          {UPCOMING_COSTS.map((c, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: c.isPremium ? C.marigoldDim : C.tealDim }}
              >
                {c.isPremium ? <ShieldCheck size={14} color={C.marigold} /> : <CalendarClock size={14} color={C.teal} />}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 600 }}>{c.label}</p>
                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{c.member} · {c.period}</p>
              </div>
              <span style={{ fontFamily: FONT_MONO, color: C.text, fontSize: 13, fontWeight: 600 }}>{fmt(c.amount)}</span>
            </div>
          ))}
        </div>

        {/* coverage vs out-of-pocket estimate */}
        {(() => {
          const { premium, medicalSpend, estCoveredPct } = COST_FORECAST_SUMMARY;
          const covered = Math.round(medicalSpend * estCoveredPct);
          const outOfPocketMedical = medicalSpend - covered;
          const totalOutOfPocket = outOfPocketMedical + premium;
          const totalProjected = medicalSpend + premium;
          const coveredPct = (covered / totalProjected) * 100;
          const oopPct = 100 - coveredPct;
          return (
            <div className="rounded-2xl p-4 mt-4" style={{ background: C.surfaceAlt }}>
              <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, marginBottom: 8 }}>
                Projected 12-month spend: <span style={{ fontFamily: FONT_MONO, color: C.text }}>{fmt(totalProjected)}</span>
              </p>
              <div className="h-2.5 rounded-full w-full flex overflow-hidden mb-2.5" style={{ background: C.borderSoft }}>
                <div style={{ width: `${coveredPct}%`, background: C.teal }} />
                <div style={{ width: `${oopPct}%`, background: C.coral }} />
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: C.teal }} />
                  <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11 }}>Est. insurance covers</span>
                </span>
                <span style={{ fontFamily: FONT_MONO, color: C.text, fontSize: 12 }}>{fmt(covered)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: C.coral }} />
                  <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11 }}>Est. out-of-pocket</span>
                </span>
                <span style={{ fontFamily: FONT_MONO, color: C.text, fontSize: 12 }}>{fmt(totalOutOfPocket)}</span>
              </div>
              <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10, lineHeight: 1.5, marginTop: 10 }}>
                Estimate only, based on typical coverage rates — actual reimbursement depends on your policy's terms,
                deductibles, and claim approval. Premiums are never covered by the policy itself.
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   AUTO DISCOVER (location-based medical environment)
----------------------------------------------------------------*/
function AutoDiscoverScreen({ onBack }) {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);

  const filtered = NEARBY_PLACES.filter((pl) => {
    if (filter === "all") return true;
    if (filter === "emergency") return pl.emergency;
    if (filter === "insured") return pl.insured;
    return true;
  });

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Auto Discover</h1>
        <div className="ml-auto flex rounded-full p-0.5" style={{ background: C.surfaceAlt }}>
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{ background: view === "list" ? C.surface : "transparent", boxShadow: view === "list" ? "0 1px 4px rgba(28,35,51,0.08)" : "none" }}
          >
            <List size={13} color={view === "list" ? C.marigold : C.textFaint} />
          </button>
          <button
            onClick={() => setView("map")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{ background: view === "map" ? C.surface : "transparent", boxShadow: view === "map" ? "0 1px 4px rgba(28,35,51,0.08)" : "none" }}
          >
            <MapIcon size={13} color={view === "map" ? C.marigold : C.textFaint} />
          </button>
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin size={12} color={C.textFaint} />
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11.5 }}>
            Near Koramangala, Bengaluru
          </p>
        </div>
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 4 }}>
          Hospitals, clinics & pharmacies near you — automatically found and kept ready.
        </p>

        {/* emergency quick-dial strip */}
        <div className="rounded-2xl px-4 py-3 mt-4 flex items-center gap-3" style={{ background: C.coralDim }}>
          <Siren size={18} color={C.coral} />
          <div className="flex-1">
            {EMERGENCY_CONTACTS.map((c, i) => (
              <p key={i} style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 11.5, fontWeight: i === 0 ? 600 : 400 }}>
                {c.label}: <span style={{ fontFamily: FONT_MONO }}>{c.value}</span>
              </p>
            ))}
          </div>
        </div>

        {/* filter chips */}
        <div className="flex gap-2 mt-4">
          {[
            { k: "all", l: "All" },
            { k: "insured", l: "Insurance-covered" },
            { k: "emergency", l: "Emergency" },
          ].map((f) => (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: filter === f.k ? C.marigoldDim : "transparent",
                color: filter === f.k ? C.marigold : C.textFaint,
                border: `1px solid ${filter === f.k ? C.marigold : C.borderSoft}`,
                fontFamily: FONT_BODY,
              }}
            >
              {f.l}
            </button>
          ))}
        </div>

        {view === "map" ? (
          <>
            <SectionLabel>Map view</SectionLabel>
            <MapView places={filtered} selected={selected} onSelect={setSelected} />
          </>
        ) : (
          <>
            <SectionLabel>Discovered near you</SectionLabel>
            <div className="flex flex-col gap-2.5">
          {filtered.map((pl, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: pl.emergency ? C.coralDim : C.tealDim }}
                >
                  <Building2 size={16} color={pl.emergency ? C.coral : C.teal} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13.5, fontWeight: 600 }}>{pl.name}</span>
                    {pl.insured && (
                      <span className="flex items-center gap-1" style={{ color: C.green, fontSize: 10 }}>
                        <ShieldCheck size={11} /> Covered
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11 }}>{pl.type} · {pl.distance}</p>
                  {pl.recommend && (
                    <span
                      className="inline-block mt-1.5 px-2 py-0.5 rounded-full"
                      style={{ background: C.marigoldDim, color: C.marigold, fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600 }}
                    >
                      {pl.recommend}
                    </span>
                  )}
                </div>
                <Navigation size={15} color={C.textFaint} className="shrink-0 mt-1" />
              </div>
            </div>
          ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MAP VIEW (used within Auto Discover)
----------------------------------------------------------------*/
function MapView({ places, selected, onSelect }) {
  const typeColor = (pl) => (pl.emergency ? C.coral : pl.type.includes("Pharmacy") ? C.marigold : C.teal);

  return (
    <div
      className="relative rounded-2xl overflow-hidden mt-2"
      style={{ height: 300, background: C.surfaceAlt, border: `1px solid ${C.borderSoft}` }}
    >
      {/* stylized map backdrop */}
      <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none" viewBox="0 0 300 300">
        <rect width="300" height="300" fill={C.surfaceAlt} />
        <path d="M 0 60 L 300 90" stroke={C.borderSoft} strokeWidth="3" />
        <path d="M 0 160 L 300 140" stroke={C.borderSoft} strokeWidth="3" />
        <path d="M 0 230 L 300 250" stroke={C.borderSoft} strokeWidth="2" />
        <path d="M 70 0 L 50 300" stroke={C.borderSoft} strokeWidth="3" />
        <path d="M 190 0 L 210 300" stroke={C.borderSoft} strokeWidth="2" />
        <ellipse cx="235" cy="215" rx="42" ry="34" fill={C.greenDim} opacity="0.7" />
        <ellipse cx="55" cy="235" rx="30" ry="20" fill={C.tealDim} opacity="0.5" />
      </svg>

      {/* you-are-here pin */}
      <div className="absolute flex flex-col items-center" style={{ left: "50%", top: "50%", transform: "translate(-50%,-100%)" }}>
        <div className="relative w-8 h-8 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full animate-ping" style={{ background: C.marigoldDim }} />
          <div className="w-4 h-4 rounded-full relative" style={{ background: C.marigold, border: "2px solid #FFFFFF", boxShadow: "0 1px 4px rgba(0,0,0,0.25)" }} />
        </div>
        <span
          className="px-1.5 py-0.5 rounded-full mt-0.5"
          style={{ background: C.text, color: "#FFFFFF", fontFamily: FONT_BODY, fontSize: 9, fontWeight: 600 }}
        >
          You
        </span>
      </div>

      {/* place pins */}
      {places.map((pl, i) => (
        <button
          key={i}
          onClick={() => onSelect(pl)}
          className="absolute flex flex-col items-center active:scale-95 transition-transform"
          style={{ left: `${pl.x}%`, top: `${pl.y}%`, transform: "translate(-50%,-100%)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background: typeColor(pl),
              border: selected?.name === pl.name ? "2.5px solid #1A1F2E" : "2px solid #FFFFFF",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {pl.emergency ? <Siren size={12} color="#FFFFFF" /> : <Building2 size={12} color="#FFFFFF" />}
          </div>
        </button>
      ))}

      {/* recenter button */}
      <button
        className="absolute w-8 h-8 rounded-full flex items-center justify-center"
        style={{ right: 10, bottom: 10, background: C.surface, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
      >
        <LocateFixed size={15} color={C.marigold} />
      </button>

      {/* selected place info card */}
      {selected && (
        <div
          className="absolute left-2 right-2 bottom-2 rounded-2xl p-3 flex items-center gap-2.5"
          style={{ background: C.surface, boxShadow: "0 6px 18px rgba(28,35,51,0.15)" }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: typeColor(selected) + "22" }}>
            <Building2 size={14} color={typeColor(selected)} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 600 }}>{selected.name}</p>
            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{selected.type} · {selected.distance}</p>
          </div>
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full shrink-0"
            style={{ background: C.marigold }}
          >
            <Navigation size={11} color="#FFFFFF" />
            <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 10.5, fontWeight: 600 }}>Directions</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   CARE PLANS (standardized templates: done vs. pending, per person + family-wide)
----------------------------------------------------------------*/
const CARE_STATUS_COLOR = { done: "green", overdue: "coral", pending: "marigold" };
const CARE_STATUS_ICON = { done: CheckCircle2, overdue: AlertTriangle, pending: Clock };
const CARE_STATUS_LABEL = { done: "Done", overdue: "Overdue", pending: "Pending" };

function CarePlanScreen({ onBack, goMember }) {
  const [view, setView] = useState("person");

  const familyList = [];
  MEMBERS.forEach((m) => {
    const plan = CARE_PLANS[m.id];
    if (!plan) return;
    plan.items
      .filter((it) => it.status !== "done")
      .forEach((it) => familyList.push({ ...it, member: m }));
  });
  familyList.sort((a, b) => (a.status === "overdue" ? -1 : 1) - (b.status === "overdue" ? -1 : 1));

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Wellness Plans</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          Standard care templates — what's done, and what still needs attention.
        </p>

        <div className="flex gap-2 mt-4">
          {[
            { k: "person", l: "By Person" },
            { k: "family", l: "Family Overview" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setView(t.k)}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: view === t.k ? C.marigoldDim : "transparent",
                color: view === t.k ? C.marigold : C.textFaint,
                border: `1px solid ${view === t.k ? C.marigold : C.borderSoft}`,
                fontFamily: FONT_BODY,
              }}
            >
              {t.l}
            </button>
          ))}
        </div>

        {view === "person" ? (
          <div className="flex flex-col gap-3 mt-4">
            {MEMBERS.map((m) => {
              const plan = CARE_PLANS[m.id];
              if (!plan) return null;
              const doneCount = plan.items.filter((it) => it.status === "done").length;
              return (
                <div key={m.id} className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                  <button onClick={() => goMember(m)} className="flex items-center gap-2.5 mb-3 w-full text-left">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[m.risk]}` }}
                    >
                      <MemberAvatar memberId={m.id} size={32} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{plan.title}</p>
                      <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{m.name} · {doneCount}/{plan.items.length} done</p>
                    </div>
                  </button>
                  <div className="h-1.5 rounded-full w-full mb-3" style={{ background: C.borderSoft }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(doneCount / plan.items.length) * 100}%`, background: C.green }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    {plan.items.map((it, i) => {
                      const Icon = CARE_STATUS_ICON[it.status];
                      const color = C[CARE_STATUS_COLOR[it.status]];
                      return (
                        <div key={i} className="flex items-start gap-2">
                          <Icon size={14} color={color} className="mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12, fontWeight: 500 }}>{it.task}</p>
                            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{it.freq} · {it.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5 mt-4">
            {familyList.map((it, i) => {
              const Icon = CARE_STATUS_ICON[it.status];
              const color = C[CARE_STATUS_COLOR[it.status]];
              return (
                <button
                  key={i}
                  onClick={() => goMember(it.member)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 w-full text-left"
                  style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[it.member.risk]}` }}
                  >
                    <MemberAvatar memberId={it.member.id} size={30} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 600 }}>{it.task}</p>
                    <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{it.member.name} · {it.note}</p>
                  </div>
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: C[CARE_STATUS_COLOR[it.status] + "Dim"], color }}
                  >
                    <Icon size={10} />
                    <span style={{ fontFamily: FONT_BODY, fontSize: 9.5, fontWeight: 600 }}>{CARE_STATUS_LABEL[it.status]}</span>
                  </span>
                </button>
              );
            })}
            {familyList.length === 0 && (
              <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12.5, textAlign: "center", marginTop: 20 }}>
                Everyone's fully up to date. Nice.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   EMERGENCY KIT (records, IDs & insurance, ready to export)
----------------------------------------------------------------*/
function EmergencyKitScreen({ onBack }) {
  const [exportState, setExportState] = useState("idle"); // idle | preparing | ready

  const handleExport = () => {
    setExportState("preparing");
    setTimeout(() => setExportState("ready"), 1600);
  };

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Emergency Kit</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          Everything a hospital or first responder might need — ready to share in seconds.
        </p>

        {/* quick-call buttons, first thing shown in an emergency */}
        <div className="flex flex-col gap-2.5 mt-4">
          {EMERGENCY_CONTACTS.map((c, i) => (
            <a
              key={i}
              href={`tel:${c.value.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
              style={{ background: C.coral, textDecoration: "none" }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.22)" }}>
                <Phone size={19} color="#FFFFFF" />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>Call {c.label}</p>
                <p style={{ fontFamily: FONT_BODY, color: "rgba(255,255,255,0.85)", fontSize: 12 }}>{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* export button */}
        <div className="rounded-2xl p-4 mt-4" style={{ background: C.coralDim }}>
          {exportState === "ready" ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.surface }}>
                <CheckCircle2 size={18} color={C.green} />
              </div>
              <div className="flex-1">
                <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>emergency-kit.zip ready</p>
                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>Records, IDs &amp; insurance — packaged &amp; ready to share</p>
              </div>
            </div>
          ) : (
            <button onClick={handleExport} className="w-full flex items-center gap-3" disabled={exportState === "preparing"}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.surface }}>
                {exportState === "preparing" ? (
                  <div className="w-4 h-4 rounded-full animate-spin" style={{ border: `2.5px solid ${C.borderSoft}`, borderTopColor: C.coral }} />
                ) : (
                  <Archive size={18} color={C.coral} />
                )}
              </div>
              <div className="flex-1 text-left">
                <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>
                  {exportState === "preparing" ? "Preparing your kit\u2026" : "Download Emergency Kit (.zip)"}
                </p>
                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>All records, IDs &amp; insurance, in one file</p>
              </div>
              {exportState === "idle" && <Download size={16} color={C.coral} />}
            </button>
          )}
        </div>

        {/* insurance */}
        <SectionLabel>Insurance</SectionLabel>
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
            <ShieldCheck size={16} color={C.teal} />
          </div>
          <div>
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{EMERGENCY_INSURANCE.policy}</p>
            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>
              {EMERGENCY_INSURANCE.number} · Covers {EMERGENCY_INSURANCE.covers}
            </p>
          </div>
        </div>

        {/* per-member emergency profiles */}
        <SectionLabel>Medical &amp; identity, per person</SectionLabel>
        <div className="flex flex-col gap-2.5">
          {MEMBERS.map((m) => {
            const ep = EMERGENCY_PROFILES[m.id];
            if (!ep) return null;
            const hasAllergy = ep.allergies[0] !== "None known";
            return (
              <div key={m.id} className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[m.risk]}` }}
                  >
                    <MemberAvatar memberId={m.id} size={30} />
                  </div>
                  <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{m.name}</span>
                  <span
                    className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{ background: C.coralDim, color: C.coral, fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700 }}
                  >
                    <Droplet size={10} /> {ep.bloodType}
                  </span>
                </div>

                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, marginBottom: 2 }}>
                  Allergies: <span style={{ color: hasAllergy ? C.coral : C.textFaint, fontWeight: hasAllergy ? 600 : 400 }}>{ep.allergies.join(", ")}</span>
                </p>
                {ep.conditions.length > 0 && (
                  <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, marginBottom: 8 }}>
                    Conditions: {ep.conditions.join(", ")}
                  </p>
                )}

                <div className="flex gap-1.5 flex-wrap mt-1">
                  {ep.ids.map((id, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 px-2 py-1 rounded-full"
                      style={{ background: C.surfaceAlt, fontFamily: FONT_BODY, fontSize: 10, color: C.textMuted }}
                    >
                      <CreditCard size={10} color={C.green} /> {id.type}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   COMMUNITY (blood donors & mutual medical help)
----------------------------------------------------------------*/
function CommunityScreen({ onBack }) {
  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Community</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          Connect with people nearby for blood donation and medical help.
        </p>

        <button
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 mt-4"
          style={{ background: C.coral }}
        >
          <HeartHandshake size={16} color="#FFFFFF" />
          <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}>Post a Request</span>
        </button>

        {COMMUNITY_REQUESTS.length > 0 && (
          <>
            <SectionLabel>Active requests nearby</SectionLabel>
            <div className="flex flex-col gap-2.5">
              {COMMUNITY_REQUESTS.map((r, i) => (
                <div key={i} className="rounded-2xl p-4" style={{ background: C.coralDim }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{ background: C.surface, color: C.coral, fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700 }}
                    >
                      <Droplet size={10} /> {r.bloodType}
                    </span>
                    <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{r.time}</span>
                  </div>
                  <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{r.name}</p>
                  <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5, marginTop: 1 }}>{r.need}</p>
                  <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, marginTop: 2 }}>{r.location}</p>
                  <button
                    className="w-full mt-3 rounded-xl py-2"
                    style={{ background: C.surface, fontFamily: FONT_BODY, color: C.coral, fontSize: 12, fontWeight: 600 }}
                  >
                    I can help
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <SectionLabel>Community members near you</SectionLabel>
        <div className="flex flex-col gap-2.5">
          {COMMUNITY_MEMBERS.map((p, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.surfaceAlt }}>
                <span style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 12 }}>{p.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{p.name}</p>
                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{p.distance} away</p>
              </div>
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background: C.coralDim, color: C.coral, fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700 }}
              >
                <Droplet size={10} /> {p.bloodType}
              </span>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: p.available ? C.green : C.textFaint }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   INSURANCE PLANNER (coverage recommender based on age & conditions)
----------------------------------------------------------------*/
const INS_STATUS_COLOR = { adequate: "green", gap: "marigold", missing: "coral" };
const INS_STATUS_LABEL = { adequate: "Adequate", gap: "Consider increasing", missing: "Not covered" };
const INS_ICONS = { shield: ShieldCheck, landmark: Landmark, activity: Activity };

function InsurancePlannerScreen({ onBack }) {
  const fmt = (n) => (n === 0 ? "\u20B90" : `\u20B9${(n / 100000).toFixed(0)}L`);

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Insurance Planner</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          Coverage suggestions based on your family's ages and health conditions.
        </p>

        {/* family snapshot */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {MEMBERS.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shrink-0"
              style={{ background: C.surfaceAlt }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: C.surface, border: `1.5px solid ${STATUS_COLOR[m.risk]}` }}
              >
                <MemberAvatar memberId={m.id} size={22} />
              </div>
              <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 10.5 }}>{m.relation}</span>
            </div>
          ))}
        </div>

        <SectionLabel>Recommendations</SectionLabel>
        <div className="flex flex-col gap-3">
          {INSURANCE_RECS.map((rec, i) => {
            const Icon = INS_ICONS[rec.iconKey];
            const color = C[INS_STATUS_COLOR[rec.status]];
            const dim = C[INS_STATUS_COLOR[rec.status] + "Dim"];
            const pct = Math.min(100, (rec.current / rec.recommended) * 100);
            return (
              <div key={i} className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: dim }}>
                    <Icon size={16} color={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{rec.category}</p>
                    <span
                      className="inline-block mt-0.5 px-2 py-0.5 rounded-full"
                      style={{ background: dim, color, fontFamily: FONT_BODY, fontSize: 9.5, fontWeight: 600 }}
                    >
                      {INS_STATUS_LABEL[rec.status]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>
                    Current: <span style={{ fontFamily: FONT_MONO, color: C.text }}>{fmt(rec.current)}</span>
                  </span>
                  <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>
                    Suggested: <span style={{ fontFamily: FONT_MONO, color: C.text }}>{fmt(rec.recommended)}</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full w-full mb-3" style={{ background: C.borderSoft }}>
                  <div className="nh-bar-fill h-1.5 rounded-full" style={{ width: `${pct}%`, background: color }} />
                </div>

                <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5, lineHeight: 1.5 }}>{rec.reason}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl px-4 py-3 mt-4" style={{ background: C.surfaceAlt }}>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, lineHeight: 1.5 }}>
            These are illustrative estimates based on general coverage guidelines, not personalized financial advice.
            Speak with a licensed insurance advisor before making a decision.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SURGICAL HISTORY & POST-OP CARE
----------------------------------------------------------------*/
const CATEGORY_ICON = { Cardiac: Activity, Ophthalmic: Eye, "General Surgery": Scissors, Orthopedic: Bone };
const CATEGORY_COLOR = { Cardiac: "coral", Ophthalmic: "teal", "General Surgery": "marigold", Orthopedic: "green" };

function SurgicalHistoryScreen({ onBack, goMember }) {
  const [view, setView] = useState("history");
  const [expandedProcs, setExpandedProcs] = useState({});

  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Surgical History</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          Every procedure, across the family, in one place.
        </p>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {[
            { k: "history", l: "Procedures" },
            { k: "postop", l: "Surgery & Post Operative Care" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setView(t.k)}
              className="px-3 py-1.5 rounded-full text-xs font-medium shrink-0"
              style={{
                background: view === t.k ? C.marigoldDim : "transparent",
                color: view === t.k ? C.marigold : C.textFaint,
                border: `1px solid ${view === t.k ? C.marigold : C.borderSoft}`,
                fontFamily: FONT_BODY,
              }}
            >
              {t.l}
            </button>
          ))}
        </div>

        {view === "history" ? (
          <div className="flex flex-col gap-3 mt-4">
            {MEMBERS.map((m) => {
              const procedures = SURGICAL_HISTORY[m.id];
              if (!procedures || procedures.length === 0) return null;
              return (
                <div key={m.id}>
                  <button onClick={() => goMember(m)} className="flex items-center gap-2 mb-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: C.surfaceAlt, border: `2px solid ${STATUS_COLOR[m.risk]}` }}
                    >
                      <MemberAvatar memberId={m.id} size={28} />
                    </div>
                    <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{m.name}</span>
                  </button>
                  <div className="flex flex-col gap-2 mb-2">
                    {procedures.map((proc, i) => {
                      const Icon = CATEGORY_ICON[proc.category] || Activity;
                      const color = C[CATEGORY_COLOR[proc.category] || "teal"];
                      const dim = C[(CATEGORY_COLOR[proc.category] || "teal") + "Dim"];
                      const key = `${m.id}-${i}`;
                      const isOpen = !!expandedProcs[key];
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                          <button
                            onClick={() => setExpandedProcs((prev) => ({ ...prev, [key]: !prev[key] }))}
                            className="w-full flex items-start gap-3 p-4 text-left"
                          >
                            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: dim }}>
                              <Icon size={16} color={color} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13.5, fontWeight: 600 }}>{proc.procedure}</span>
                                <span style={{ fontFamily: FONT_MONO, color: C.textFaint, fontSize: 11 }}>{proc.date}</span>
                              </div>
                              <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5, marginTop: 2 }}>{proc.detail}</p>
                            </div>
                            <ChevronRight
                              size={16}
                              color={C.textFaint}
                              className="shrink-0 mt-1 transition-transform"
                              style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                            />
                          </button>

                          {isOpen && (
                            <div className="nh-fade-in-up px-4 pb-4 flex flex-col gap-2" style={{ borderTop: `1px solid ${C.borderSoft}`, paddingTop: 12 }}>
                              <div className="flex items-center gap-2">
                                <Building2 size={13} color={C.textMuted} className="shrink-0" />
                                <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5 }}>{proc.hospital}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Stethoscope size={13} color={C.textMuted} className="shrink-0" />
                                <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5 }}>{proc.doctor}</span>
                              </div>
                              <div className="rounded-xl px-3 py-2.5 mt-1" style={{ background: C.greenDim }}>
                                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10, letterSpacing: "0.03em", marginBottom: 3 }}>OUTCOME</p>
                                <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 11.5, lineHeight: 1.5 }}>{proc.outcome}</p>
                              </div>
                              {proc.report && (
                                <div className="mt-1">
                                  <DocumentChip label={proc.report} summary={proc.summary} />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-4">
            {POST_OP_CARE.map((care, ci) => {
              const doneCount = care.items.filter((it) => it.status === "done").length;
              return (
                <div key={ci} className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
                  <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{care.procedure}</p>
                  <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5, marginBottom: 8 }}>
                    {care.member} · {doneCount}/{care.items.length} on track
                  </p>
                  <div className="h-1.5 rounded-full w-full mb-3" style={{ background: C.borderSoft }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(doneCount / care.items.length) * 100}%`, background: C.green }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    {care.items.map((it, i) => {
                      const Icon = CARE_STATUS_ICON[it.status];
                      const color = C[CARE_STATUS_COLOR[it.status]];
                      return (
                        <div key={i} className="flex items-start gap-2">
                          <Icon size={14} color={color} className="mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12, fontWeight: 500 }}>{it.task}</p>
                            <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{it.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   DOCTOR CHAT (message threads + conversation view)
----------------------------------------------------------------*/
function DoctorChatScreen({ onBack, onOpenChat }) {
  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 19, fontWeight: 500 }}>Family Doctors</h1>
      </div>

      <div className="px-5">
        <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
          Ask a question, share a report, get guidance — all in one thread per doctor.
        </p>

        <div className="flex flex-col gap-2.5 mt-4">
          {DOCTOR_CHATS.map((chat, i) => (
            <button
              key={i}
              onClick={() => onOpenChat(chat)}
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left w-full"
              style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
                <Stethoscope size={18} color={C.teal} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13.5, fontWeight: 600 }}>{chat.doctor}</span>
                  <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{chat.lastTime}</span>
                </div>
                <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{chat.specialty} · {chat.member}</p>
                <p
                  className="truncate"
                  style={{ fontFamily: FONT_BODY, color: chat.unread ? C.text : C.textMuted, fontSize: 12, fontWeight: chat.unread ? 600 : 400, marginTop: 2 }}
                >
                  {chat.lastPreview}
                </p>
              </div>
              {chat.unread && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: C.marigold }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DoctorChatDetail({ chat, onBack }) {
  return (
    <div className="pb-6 flex flex-col" style={{ minHeight: "100%" }}>
      <div className="px-5 pt-6 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={20} color={C.textMuted} />
        </button>
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
          <Stethoscope size={16} color={C.teal} />
        </div>
        <div>
          <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontWeight: 600 }}>{chat.doctor}</p>
          <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 10.5 }}>{chat.specialty}</p>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-3 mt-4 flex-1">
        {chat.messages.map((msg, i) => {
          const isUser = msg.from === "user";
          return (
            <div key={i} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
              <div
                className="rounded-2xl px-3.5 py-2.5"
                style={{
                  background: isUser ? C.marigold : C.surface,
                  border: isUser ? "none" : `1px solid ${C.borderSoft}`,
                  maxWidth: "80%",
                  borderBottomRightRadius: isUser ? 4 : 16,
                  borderBottomLeftRadius: isUser ? 16 : 4,
                }}
              >
                {msg.attachment && (
                  <div
                    className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 mb-1.5"
                    style={{ background: isUser ? "rgba(255,255,255,0.25)" : C.surfaceAlt }}
                  >
                    <FileText size={13} color={isUser ? "#FFFFFF" : C.textMuted} />
                    <span style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: isUser ? "#FFFFFF" : C.textMuted }}>{msg.attachment}</span>
                  </div>
                )}
                <p style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: isUser ? "#FFFFFF" : C.text, lineHeight: 1.4 }}>{msg.text}</p>
              </div>
              <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 9.5, marginTop: 3 }}>{msg.time}</span>
            </div>
          );
        })}
      </div>

      <div className="px-5 pt-2">
        <div className="flex items-center gap-2 rounded-2xl px-3 py-2.5" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
          <Paperclip size={16} color={C.textFaint} />
          <span style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 12, flex: 1 }}>Message {chat.doctor}...</span>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: C.marigold }}>
            <Send size={13} color="#FFFFFF" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MEDS SCREEN
----------------------------------------------------------------*/
function MedsScreen() {
  const [status, setStatus] = useState("idle"); // idle | processing | done
  const [showUploadSheet, setShowUploadSheet] = useState(false);

  const handleUpload = () => {
    setShowUploadSheet(false);
    setStatus("processing");
    setTimeout(() => setStatus("done"), 1600);
  };

  return (
    <div className="px-5 pb-6 pt-6">
      <div className="flex items-center justify-between">
        <h1 style={{ fontFamily: FONT_DISPLAY, color: C.text, fontSize: 22, fontWeight: 500 }}>Medicine tracker</h1>
        <button onClick={() => setShowUploadSheet(true)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.marigoldDim }}>
          <Plus size={17} color={C.marigold} />
        </button>
      </div>
      <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5, marginTop: 2 }}>
        Refill reminders across the family.
      </p>

      {status === "processing" && (
        <div
          className="w-full mt-5 rounded-2xl flex flex-col items-center justify-center gap-3 py-10"
          style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}
        >
          <div className="w-8 h-8 rounded-full animate-spin" style={{ border: `3px solid ${C.borderSoft}`, borderTopColor: C.marigold }} />
          <span style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 12.5 }}>Reading prescription details…</span>
        </div>
      )}

      {status === "done" && (
        <div className="rounded-2xl p-4 mt-5 flex items-center gap-3" style={{ background: C.greenDim }}>
          <CheckCircle2 size={18} color={C.green} className="shrink-0" />
          <div className="flex-1">
            <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12.5, fontWeight: 600 }}>Prescription added</p>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11 }}>Schedule &amp; refill reminders will appear below once confirmed.</p>
          </div>
          <button onClick={() => setStatus("idle")} className="shrink-0">
            <X size={16} color={C.textMuted} />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2.5 mt-5">
        {[...MEDICATIONS].sort((a, b) => a.daysLeft - b.daysLeft).map((med, i) => {
          const urgent = med.daysLeft <= 5;
          const pct = Math.max(6, Math.min(100, (med.daysLeft / 30) * 100));
          return (
            <div key={i} className="rounded-2xl px-4 py-3.5" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: urgent ? C.coralDim : C.tealDim }}>
                    <Pill size={14} color={urgent ? C.coral : C.teal} />
                  </div>
                  <div>
                    <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, fontWeight: 600 }}>{med.name}</p>
                    <p style={{ fontFamily: FONT_BODY, color: C.textFaint, fontSize: 11 }}>{med.member} · {med.schedule}</p>
                  </div>
                </div>
                <span style={{ fontFamily: FONT_MONO, color: urgent ? C.coral : C.textMuted, fontSize: 12 }}>
                  {med.daysLeft}d
                </span>
              </div>
              <div className="mt-2.5 h-1.5 rounded-full w-full" style={{ background: C.borderSoft }}>
                <div className="nh-bar-fill h-1.5 rounded-full" style={{ width: `${pct}%`, background: urgent ? C.coral : C.teal }} />
              </div>
              {urgent && (
                <p style={{ fontFamily: FONT_BODY, color: C.coral, fontSize: 10.5, marginTop: 5 }}>
                  Order refill now to avoid running out
                </p>
              )}
              {med.prescription && (
                <div className="mt-2.5">
                  <DocumentChip label={med.prescription} summary={med.summary} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showUploadSheet && (
        <UploadSourceSheet
          onClose={() => setShowUploadSheet(false)}
          onSelect={handleUpload}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   VOICE MODAL
----------------------------------------------------------------*/
function VoiceModal({ onClose }) {
  const [phase, setPhase] = useState("listening"); // listening | result | popup
  const [example] = useState(() => {
    const r = Math.random();
    if (r < 0.34) return "chart";
    if (r < 0.67) return "chat";
    return "reminder";
  });

  useEffect(() => {
    const t = setTimeout(() => setPhase("result"), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "result" && example === "reminder") {
      const t = setTimeout(() => setPhase("popup"), 2200);
      return () => clearTimeout(t);
    }
  }, [phase, example]);

  return (
    <div className="absolute inset-0 z-30 flex items-end" style={{ background: "rgba(6,9,20,0.72)" }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-3xl px-5 pt-4 pb-8"
        style={{ background: C.surfaceAlt, borderTop: `1px solid ${C.border}` }}
      >
        <div className="w-9 h-1 rounded-full mx-auto mb-4" style={{ background: C.borderSoft }} />
        {phase === "listening" ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full animate-ping" style={{ background: C.marigoldDim }} />
              <div className="w-14 h-14 rounded-full flex items-center justify-center relative" style={{ background: C.marigold }}>
                <Mic size={22} color={C.bg} />
              </div>
            </div>
            <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 13 }}>Listening…</p>
          </div>
        ) : example === "chart" ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2.5">
              <Mic size={15} color={C.marigold} className="mt-0.5" />
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontStyle: "italic" }}>
                "Show me Appa's sugar levels over the last 6 months"
              </p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
              <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5, marginBottom: 8 }}>
                Fasting blood sugar · Appa · last 6 months
              </p>
              <ResponsiveContainer width="100%" height={110}>
                <AreaChart data={MEMBERS[0].vitals} margin={{ left: -25, right: 5, top: 5 }}>
                  <defs>
                    <linearGradient id="voiceFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.marigold} stopOpacity={0.5} />
                      <stop offset="100%" stopColor={C.marigold} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" tick={{ fill: C.textFaint, fontSize: 9.5, fontFamily: FONT_BODY }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                  <Area type="monotone" dataKey="sugar" stroke={C.marigold} fill="url(#voiceFill)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 12, marginTop: 6 }}>
                Trending upward — from 142 to 168 mg/dL since March.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-center py-2.5 rounded-xl text-sm font-medium"
              style={{ background: C.marigold, color: C.bg, fontFamily: FONT_BODY }}
            >
              Done
            </button>
          </div>
        ) : example === "chat" ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2.5">
              <Mic size={15} color={C.marigold} className="mt-0.5" />
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontStyle: "italic" }}>
                "What did Dr. Mishra say about Appa's blood pressure medicine?"
              </p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: C.surface, border: `1px solid ${C.borderSoft}` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tealDim }}>
                  <Stethoscope size={13} color={C.teal} />
                </div>
                <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5 }}>Dr. Mishra · 10:20 AM</p>
              </div>
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13, lineHeight: 1.5, fontStyle: "italic" }}>
                "Let's reduce Telmisartan to 20mg for now. Also, please get a fresh kidney function and lipid panel done this week."
              </p>
              <div className="flex items-center gap-1.5 mt-3 pt-3" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
                <MessageCircle size={12} color={C.marigold} />
                <span style={{ fontFamily: FONT_BODY, color: C.marigold, fontSize: 11, fontWeight: 600 }}>Pulled from your chat with Dr. Mishra</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-center py-2.5 rounded-xl text-sm font-medium"
              style={{ background: C.marigold, color: C.bg, fontFamily: FONT_BODY }}
            >
              Done
            </button>
          </div>
        ) : (
          // example === "reminder"
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2.5">
              <Mic size={15} color={C.marigold} className="mt-0.5" />
              <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 14, fontStyle: "italic" }}>
                "Remind me to get blood tests done on Oct 15"
              </p>
            </div>

            {phase === "popup" ? (
              <div className="rounded-2xl p-4 relative" style={{ background: C.text }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.marigold }}>
                    <Bell size={16} color="#FFFFFF" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 12.5, fontWeight: 700 }}>nairuHealth</span>
                      <span style={{ fontFamily: FONT_BODY, color: "#9BA0AE", fontSize: 10.5 }}>now</span>
                    </div>
                    <p style={{ fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 13, fontWeight: 600, marginTop: 2 }}>
                      Blood Test Reminder
                    </p>
                    <p style={{ fontFamily: FONT_BODY, color: "#D8DCE3", fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>
                      It's Oct 15 — time to get your blood tests done, as you asked us to remind you.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        className="flex-1 rounded-xl py-2"
                        style={{ background: "rgba(255,255,255,0.12)", fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 11.5, fontWeight: 600 }}
                      >
                        Snooze
                      </button>
                      <button
                        className="flex-1 rounded-xl py-2"
                        style={{ background: C.marigold, fontFamily: FONT_BODY, color: "#FFFFFF", fontSize: 11.5, fontWeight: 600 }}
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: C.greenDim }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.surface }}>
                  <CheckCircle2 size={18} color={C.green} />
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, color: C.text, fontSize: 13.5, fontWeight: 700 }}>Reminder set for Oct 15</p>
                  <p style={{ fontFamily: FONT_BODY, color: C.textMuted, fontSize: 11.5, marginTop: 1 }}>
                    We'll notify you on the day — no need to remember it yourself.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="text-center py-2.5 rounded-xl text-sm font-medium"
              style={{ background: C.marigold, color: C.bg, fontFamily: FONT_BODY }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   NAV
----------------------------------------------------------------*/
const TABS = [
  { key: "home", label: "Home", icon: HomeIcon },
  { key: "reports", label: "Reports", icon: FileText },
  { key: "meds", label: "Meds", icon: Pill },
  { key: "bookcare", label: "Services", icon: CalendarCheck },
  { key: "general", label: "More", icon: LayoutGrid },
];

function BottomNav({ tab, setTab }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center px-1 pb-2 pt-2"
      style={{ background: C.surface, borderTop: `1px solid ${C.borderSoft}` }}
    >
      {TABS.map((t) => (
        <NavBtn key={t.key} t={t} active={tab === t.key} onClick={() => setTab(t.key)} />
      ))}
    </div>
  );
}

function NavBtn({ t, active, onClick }) {
  const Icon = t.icon;
  return (
    <button onClick={onClick} className="nh-tap flex-1 flex flex-col items-center gap-1 py-1.5">
      <Icon size={22} color={active ? C.marigold : C.textFaint} />
      <span style={{ fontFamily: FONT_BODY, fontSize: 9, color: active ? C.marigold : C.textFaint }}>{t.label}</span>
    </button>
  );
}

/* ---------------------------------------------------------------
   ROOT APP
----------------------------------------------------------------*/
export default function App() {
  useGoogleFonts();
  useMotionStyles();
  const isWide = useIsWideViewport();
  const [showWelcome, setShowWelcome] = useState(true);
  const [tab, setTab] = useState("home");
  const [member, setMember] = useState(null);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [expensesOpen, setExpensesOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [carePlansOpen, setCarePlansOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [surgicalOpen, setSurgicalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [shareParentsOpen, setShareParentsOpen] = useState(false);
  const [recordsOpen, setRecordsOpen] = useState(false);
  const [showHighAlerts, setShowHighAlerts] = useState(false);
  const [showDailyTip, setShowDailyTip] = useState(false);
  const [dailyTipSeen, setDailyTipSeen] = useState(false);
  const todaysTip = getTodaysTip();

  useEffect(() => {
    if (!showWelcome) {
      const t = setTimeout(() => setShowDailyTip(true), 500);
      return () => clearTimeout(t);
    }
  }, [showWelcome]);

  useEffect(() => {
    if (dailyTipSeen && PENDING_ACTIONS.high.length > 0) {
      const t = setTimeout(() => setShowHighAlerts(true), 400);
      return () => clearTimeout(t);
    }
  }, [dailyTipSeen]);

  const goMember = (m) => {
    setActivityOpen(false);
    setExpensesOpen(false);
    setDiscoverOpen(false);
    setCarePlansOpen(false);
    setEmergencyOpen(false);
    setCommunityOpen(false);
    setInsuranceOpen(false);
    setSurgicalOpen(false);
    setChatOpen(false);
    setActiveChat(null);
    setShareParentsOpen(false);
    setRecordsOpen(false);
    setMember(m);
  };
  const goTab = (k) => {
    setMember(null);
    setActivityOpen(false);
    setExpensesOpen(false);
    setDiscoverOpen(false);
    setCarePlansOpen(false);
    setEmergencyOpen(false);
    setCommunityOpen(false);
    setInsuranceOpen(false);
    setSurgicalOpen(false);
    setChatOpen(false);
    setActiveChat(null);
    setShareParentsOpen(false);
    setRecordsOpen(false);
    setTab(k);
  };

  return (
    <div
      className="w-full min-h-[720px] flex items-center justify-center"
      style={{ background: isWide ? "#E9E6DC" : C.bg, padding: isWide ? 24 : 0 }}
    >
      <div
        className="relative overflow-hidden"
        style={
          isWide
            ? {
                width: 390,
                height: 780,
                background: C.bg,
                borderRadius: 40,
                border: `8px solid #05070E`,
                boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
              }
            : {
                width: "100vw",
                height: "100vh",
                background: C.bg,
              }
        }
      >
        {showWelcome ? (
          <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />
        ) : (
          <>
            {/* status bar */}
            <div className="flex items-center justify-between px-6 pt-3 pb-1" style={{ color: C.textFaint, fontFamily: FONT_BODY, fontSize: 12 }}>
              <span>9:41</span>
              <span style={{ letterSpacing: "0.02em", color: C.text, fontFamily: FONT_DISPLAY, fontWeight: 700 }}>
                n<span style={{ color: C.green }}>ai</span>ru<span style={{ color: C.textFaint, fontWeight: 500 }}>Health</span>
              </span>
              <span>●●●</span>
            </div>

            <div className="overflow-y-auto" style={{ height: 780 - 44 - 72 }}>
              {member ? (
                <MemberDetail
                  key={member.id}
                  member={member}
                  onBack={() => setMember(null)}
                  goRecords={() => {
                    setMember(null);
                    setRecordsOpen(true);
                  }}
                />
              ) : activityOpen ? (
                <ActivityScreen onBack={() => setActivityOpen(false)} goMember={goMember} />
              ) : expensesOpen ? (
                <ExpensesScreen onBack={() => setExpensesOpen(false)} goMember={goMember} />
              ) : discoverOpen ? (
                <AutoDiscoverScreen onBack={() => setDiscoverOpen(false)} />
              ) : carePlansOpen ? (
                <CarePlanScreen onBack={() => setCarePlansOpen(false)} goMember={goMember} />
              ) : emergencyOpen ? (
                <EmergencyKitScreen onBack={() => setEmergencyOpen(false)} />
              ) : communityOpen ? (
                <CommunityScreen onBack={() => setCommunityOpen(false)} />
              ) : insuranceOpen ? (
                <InsurancePlannerScreen onBack={() => setInsuranceOpen(false)} />
              ) : surgicalOpen ? (
                <SurgicalHistoryScreen onBack={() => setSurgicalOpen(false)} goMember={goMember} />
              ) : activeChat ? (
                <DoctorChatDetail chat={activeChat} onBack={() => setActiveChat(null)} />
              ) : chatOpen ? (
                <DoctorChatScreen onBack={() => setChatOpen(false)} onOpenChat={(c) => setActiveChat(c)} />
              ) : shareParentsOpen ? (
                <ShareParentsCareScreen onBack={() => setShareParentsOpen(false)} />
              ) : recordsOpen ? (
                <RecordsScreen onBack={() => setRecordsOpen(false)} />
              ) : tab === "home" ? (
                <HomeScreen
                  goMember={goMember}
                  goActivity={() => setActivityOpen(true)}
                  goCarePlans={() => setCarePlansOpen(true)}
                  goCommunity={() => setCommunityOpen(true)}
                  goSurgical={() => setSurgicalOpen(true)}
                  goChat={() => setChatOpen(true)}
                  goShareParents={() => setShareParentsOpen(true)}
                  showHighAlerts={showHighAlerts}
                  setShowHighAlerts={setShowHighAlerts}
                  showDailyTip={showDailyTip}
                  setShowDailyTip={setShowDailyTip}
                  setDailyTipSeen={setDailyTipSeen}
                  todaysTip={todaysTip}
                />
              ) : tab === "family" ? (
                <FamilyScreen goMember={goMember} />
              ) : tab === "reports" ? (
                <RecordsScreen />
              ) : tab === "bookcare" ? (
                <BookServiceScreen />
              ) : tab === "general" ? (
                <GeneralScreen
                  goExpenses={() => setExpensesOpen(true)}
                  goDiscover={() => setDiscoverOpen(true)}
                  goEmergency={() => setEmergencyOpen(true)}
                  goInsurance={() => setInsuranceOpen(true)}
                  goFamily={() => goTab("family")}
                  goDictionary={() => goTab("dictionary")}
                />
              ) : tab === "dictionary" ? (
                <DictionaryScreen />
              ) : (
                <MedsScreen />
              )}
            </div>

            {/* floating voice assistant button */}
            <button
              onClick={() => setVoiceOpen(true)}
              className="absolute flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              style={{ width: 54, height: 54, right: 16, bottom: 88, borderRadius: 27, background: C.marigold }}
            >
              <Mic size={21} color={C.bg} />
            </button>

            <BottomNav tab={tab} setTab={goTab} />
            {voiceOpen && <VoiceModal onClose={() => setVoiceOpen(false)} />}
          </>
        )}
      </div>
    </div>
  );
}
