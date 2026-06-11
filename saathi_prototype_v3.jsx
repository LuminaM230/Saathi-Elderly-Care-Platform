import { useState, useEffect, useRef } from "react";

const theme = {
  primary: "#4A90D9",
  primaryLight: "#EBF4FF",
  primaryDark: "#2C5F8A",
  secondary: "#6CC48A",
  secondaryLight: "#E8F8EE",
  accent: "#FF8C42",
  accentLight: "#FFF3EB",
  danger: "#E05555",
  dangerLight: "#FDEAEA",
  warning: "#F5A623",
  warningLight: "#FEF6E7",
  purple: "#9B6DD6",
  purpleLight: "#F3EEFF",
  bg: "#F7F9FC",
  card: "#FFFFFF",
  text: "#1A2340",
  textMuted: "#6B7A99",
  textLight: "#9BA8BF",
  border: "#E5EAF3",
  shadow: "0 4px 20px rgba(74,144,217,0.10)",
  shadowMd: "0 8px 32px rgba(74,144,217,0.13)",
};

const LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "od", label: "Odia", nativeLabel: "ଓଡ଼ିଆ" },
];

const STRINGS = {
  en: {
    tagline: "Helping Seniors Live Safely & Independently",
    welcomeTitle: "Your trusted companion\nfor healthy and\nindependent living.",
    welcomeSub: "Smart reminders, home safety, and real-time health monitoring — all in one place.",
    getStarted: "Get Started",
    signIn: "Sign In",
    signUp: "Sign Up",
    alreadyHaveAccount: "Already have an account?",
    phoneEmail: "Phone / Email",
    password: "Password",
    fullName: "Full Name",
    dob: "Date of Birth",
    signInBtn: "Sign In →",
    createAccount: "Create Account →",
    forgotPass: "Forgot Password?",
    orContinueWith: "or continue with",
    chooseProfile: "Who is signing in?",
    seniorCitizen: "Senior Citizen",
    familyMember: "Family Member",
    chooseLanguage: "Choose your language",
    voiceHint: "Tap mic to hear instructions",
    dailyHealth: "Daily Health Summary",
    quickActions: "Quick Actions",
    connectWatch: "Connect Smart Watch",
    watchConnected: "Watch Connected",
    watchNotConnected: "Not Connected",
    scanMed: "Scan Med",
    homeSafety: "Home Safety",
    checkIn: "Check-In",
    reports: "Reports",
    emergency: "Emergency",
    saathiAI: "Saathi AI",
    bloodPressure: "Blood Pressure",
    heartRate: "Heart Rate",
    steps: "Steps",
    sleep: "Sleep",
    medications: "Today's Medications",
    taken: "taken",
    seeAll: "See All",
    back: "Back",
  },
  hi: {
    tagline: "बुज़ुर्गों की सुरक्षित और स्वतंत्र जीवन में मदद",
    welcomeTitle: "स्वस्थ और\nस्वतंत्र जीवन के लिए\nआपका विश्वसनीय साथी।",
    welcomeSub: "स्मार्ट रिमाइंडर, घर की सुरक्षा और रियल-टाइम स्वास्थ्य निगरानी।",
    getStarted: "शुरू करें",
    signIn: "साइन इन",
    signUp: "साइन अप",
    alreadyHaveAccount: "पहले से खाता है?",
    phoneEmail: "फ़ोन / ईमेल",
    password: "पासवर्ड",
    fullName: "पूरा नाम",
    dob: "जन्म तिथि",
    signInBtn: "साइन इन करें →",
    createAccount: "खाता बनाएं →",
    forgotPass: "पासवर्ड भूल गए?",
    orContinueWith: "या जारी रखें",
    chooseProfile: "कौन साइन इन कर रहा है?",
    seniorCitizen: "वरिष्ठ नागरिक",
    familyMember: "परिवार का सदस्य",
    chooseLanguage: "अपनी भाषा चुनें",
    voiceHint: "निर्देश सुनने के लिए माइक दबाएं",
    dailyHealth: "दैनिक स्वास्थ्य सारांश",
    quickActions: "त्वरित क्रियाएं",
    connectWatch: "स्मार्ट वॉच कनेक्ट करें",
    watchConnected: "वॉच कनेक्टेड",
    watchNotConnected: "कनेक्ट नहीं",
    scanMed: "दवा स्कैन",
    homeSafety: "घर सुरक्षा",
    checkIn: "चेक-इन",
    reports: "रिपोर्ट",
    emergency: "आपातकाल",
    saathiAI: "साथी AI",
    bloodPressure: "रक्तचाप",
    heartRate: "हृदय गति",
    steps: "कदम",
    sleep: "नींद",
    medications: "आज की दवाएं",
    taken: "ली गई",
    seeAll: "सभी देखें",
    back: "वापस",
  },
  od: {
    tagline: "ବୟସ୍କ ବ୍ୟକ୍ତিଙ୍କ ସୁରକ୍ଷିତ ଜୀବନ ପାଇଁ ସାହାଯ୍ୟ",
    welcomeTitle: "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ଓ\nସ୍ୱାଧୀନ ଜୀବନ ପାଇଁ\nବିଶ୍ୱସ୍ତ ସାଥୀ।",
    welcomeSub: "ଦୈନନ୍ଦିନ ଅନୁସ୍ମାରକ, ଗୃହ ସୁରକ୍ଷା ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ନିରୀକ୍ଷଣ।",
    getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
    signIn: "ସାଇନ ଇନ",
    signUp: "ସାଇନ ଅପ",
    alreadyHaveAccount: "ଆଗରୁ ଖାତା ଅଛି?",
    phoneEmail: "ଫୋନ / ଇମେଲ",
    password: "ପାସୱାର୍ଡ",
    fullName: "ପୂରା ନାମ",
    dob: "ଜନ୍ମ ତାରିଖ",
    signInBtn: "ସାଇନ ଇନ →",
    createAccount: "ଖାତା ତିଆରି →",
    forgotPass: "ପାସୱାର୍ଡ ଭୁଲିଗଲେ?",
    orContinueWith: "କିମ୍ବା ଜାରି ରଖନ୍ତୁ",
    chooseProfile: "କିଏ ସାଇନ ଇନ କରୁଛନ୍ତି?",
    seniorCitizen: "ବରିଷ୍ଠ ନାଗରିକ",
    familyMember: "ପରିବାର ସଦସ୍ୟ",
    chooseLanguage: "ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ",
    voiceHint: "ନିର୍ଦ୍ଦେଶ ଶୁଣିବା ପାଇଁ ମାଇକ୍ ଦବାନ୍ତୁ",
    dailyHealth: "ଦୈନନ୍ଦିନ ସ୍ୱାସ୍ଥ୍ୟ ସାରାଂଶ",
    quickActions: "ତ୍ୱରିତ କ୍ରିୟା",
    connectWatch: "ସ୍ମାର୍ଟ ୱଚ୍ ସଂଯୋଗ",
    watchConnected: "ୱଚ୍ ସଂଯୁକ୍ତ",
    watchNotConnected: "ସଂଯୁକ୍ତ ନୁହଁ",
    scanMed: "ଔଷଧ ସ୍କ୍ୟାନ",
    homeSafety: "ଗୃହ ସୁରକ୍ଷା",
    checkIn: "ଚେକ-ଇନ",
    reports: "ରିପୋର୍ଟ",
    emergency: "ଜରୁରୀକାଳୀନ",
    saathiAI: "ସାଥୀ AI",
    bloodPressure: "ରକ୍ତଚାପ",
    heartRate: "ହୃଦ ସ୍ପନ୍ଦନ",
    steps: "ପାଦ",
    sleep: "ଶୟନ",
    medications: "ଆଜିର ଔଷଧ",
    taken: "ନିଆ ହୋଇଛି",
    seeAll: "ସବୁ ଦେଖନ୍ତୁ",
    back: "ଫେରନ୍ତୁ",
  },
};

const medications = [
  { id: 1, name: "Metformin 500mg", time: "8:00 AM", taken: true, color: theme.secondary },
  { id: 2, name: "Lisinopril 10mg", time: "12:00 PM", taken: false, color: theme.primary },
  { id: 3, name: "Atorvastatin 20mg", time: "8:00 PM", taken: false, color: theme.purple },
  { id: 4, name: "Aspirin 75mg", time: "8:00 AM", taken: true, color: theme.accent },
];

const vitals = [
  { label: "Blood Pressure", value: "128/82", unit: "mmHg", icon: "🫀", status: "normal", color: theme.secondary },
  { label: "Heart Rate", value: "74", unit: "bpm", icon: "💓", status: "normal", color: theme.primary },
  { label: "Blood Sugar", value: "118", unit: "mg/dL", icon: "🩸", status: "watch", color: theme.warning },
  { label: "SpO₂", value: "97", unit: "%", icon: "🌬️", status: "normal", color: theme.secondary },
];

const reminders = [
  { id: 1, title: "Metformin 500mg", time: "8:00 AM", type: "med", done: true },
  { id: 2, title: "Morning Walk", time: "7:00 AM", type: "activity", done: true },
  { id: 3, title: "Lisinopril 10mg", time: "12:00 PM", type: "med", done: false },
  { id: 4, title: "Dr. Sharma Appointment", time: "3:00 PM", type: "doctor", done: false },
  { id: 5, title: "Call Daughter Priya", time: "5:00 PM", type: "call", done: false },
  { id: 6, title: "Atorvastatin 20mg", time: "8:00 PM", type: "med", done: false },
];

const hazards = [
  { id: 1, label: "Wet Floor", icon: "💧", location: "Kitchen", severity: "high" },
  { id: 2, label: "Loose Rug", icon: "⚠️", location: "Living Room", severity: "medium" },
  { id: 3, label: "Low Lighting", icon: "💡", location: "Hallway", severity: "low" },
  { id: 4, label: "Clutter on Steps", icon: "🚧", location: "Staircase", severity: "high" },
];

const weeklyData = [
  { day: "Mon", bp: 126, hr: 72, sugar: 112, steps: 4200 },
  { day: "Tue", bp: 130, hr: 76, sugar: 118, steps: 3800 },
  { day: "Wed", bp: 124, hr: 70, sugar: 108, steps: 5100 },
  { day: "Thu", bp: 132, hr: 78, sugar: 122, steps: 3500 },
  { day: "Fri", bp: 128, hr: 74, sugar: 116, steps: 4600 },
  { day: "Sat", bp: 125, hr: 71, sugar: 110, steps: 5300 },
  { day: "Sun", bp: 128, hr: 74, sugar: 118, steps: 4100 },
];

const safeSpeak = (text) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.85;
    utt.pitch = 1.05;
    window.speechSynthesis.speak(utt);
  }
};

const useVoiceAssistant = () => {
  const [speaking, setSpeaking] = useState(false);
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = 0.85;
      utt.pitch = 1.05;
      utt.onstart = () => setSpeaking(true);
      utt.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utt);
    }
  };
  const stop = () => { window.speechSynthesis && window.speechSynthesis.cancel(); setSpeaking(false); };
  return { speak, stop, speaking };
};

const VoiceBtn = ({ text, size = 42, style = {} }) => {
  const { speak, stop, speaking } = useVoiceAssistant();
  return (
    <button
      onClick={() => speaking ? stop() : speak(text)}
      title={speaking ? "Stop" : "Listen to instructions"}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: speaking ? `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})` : theme.primaryLight,
        border: `2px solid ${speaking ? theme.primary : theme.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
        boxShadow: speaking ? `0 0 0 4px ${theme.primary}33` : "none",
        ...style,
      }}
    >
      {speaking
        ? <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="2"/><rect x="14" y="4" width="4" height="16" rx="2"/></svg>
        : <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2.2" strokeLinecap="round"><path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      }
    </button>
  );
};

const Card = ({ children, style = {}, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: theme.card,
      borderRadius: 20,
      padding: "16px 18px",
      boxShadow: theme.shadow,
      border: `1px solid ${theme.border}`,
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.15s, box-shadow 0.15s",
      ...style,
    }}
    onMouseEnter={e => onClick && (e.currentTarget.style.transform = "translateY(-2px)")}
    onMouseLeave={e => onClick && (e.currentTarget.style.transform = "translateY(0)")}
  >
    {children}
  </div>
);

const Btn = ({ children, onClick, color = theme.primary, textColor = "#fff", style = {}, size = "md", outline = false }) => {
  const sizes = { sm: { padding: "8px 16px", fontSize: 13 }, md: { padding: "13px 22px", fontSize: 16 }, lg: { padding: "17px 28px", fontSize: 18 } };
  return (
    <button onClick={onClick} style={{
      background: outline ? "transparent" : color,
      color: outline ? color : textColor,
      border: outline ? `2px solid ${color}` : "none",
      borderRadius: 16, fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
      transition: "all 0.18s", letterSpacing: 0.2,
      ...sizes[size], ...style,
    }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
    >{children}</button>
  );
};

const Badge = ({ children, color = theme.primary, bg }) => (
  <span style={{ background: bg || color + "22", color, borderRadius: 999, padding: "3px 11px", fontSize: 12, fontWeight: 700, letterSpacing: 0.3, whiteSpace: "nowrap" }}>{children}</span>
);

const Avatar = ({ size = 42, initials = "RD", bg = theme.primary }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg, ${bg}, ${bg}99)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: size * 0.38, flexShrink: 0 }}>{initials}</div>
);

const TopBar = ({ title, onBack, onNavigate, showNotif = false, voiceText = "" }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 8px", background: "#fff", borderBottom: `1px solid ${theme.border}`, flexShrink: 0 }}>
    {onBack
      ? <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 8px 4px 2px", color: theme.text, display: "flex", alignItems: "center", gap: 4, minWidth: 36 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      : <div style={{ width: 36 }} />}
    <span style={{ fontWeight: 800, fontSize: 17, color: theme.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "55%" }}>{title}</span>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {voiceText && <VoiceBtn text={voiceText} size={36} />}
      {showNotif
        ? <button onClick={() => onNavigate && onNavigate("emergency")} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", display: "flex" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.text} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span style={{ position: "absolute", top: -2, right: -2, width: 10, height: 10, background: theme.danger, borderRadius: "50%", border: "2px solid #fff" }} />
          </button>
        : <div style={{ width: voiceText ? 0 : 36 }} />}
    </div>
  </div>
);

const Icon = {
  Heart: ({ size = 22, color = theme.danger }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Pill: ({ size = 22, color = theme.primary }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="7" width="18" height="10" rx="5"/><line x1="12" y1="7" x2="12" y2="17"/></svg>,
  Shield: ({ size = 22, color = theme.secondary }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Watch: ({ size = 22, color = theme.primary }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="5" y="7" width="14" height="10" rx="4"/><line x1="9" y1="2" x2="15" y2="2"/><line x1="9" y1="22" x2="15" y2="22"/><line x1="12" y1="10" x2="12" y2="13"/><line x1="12" y1="13" x2="14" y2="13"/></svg>,
  Activity: ({ size = 22, color = theme.primary }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  MapPin: ({ size = 22, color = theme.danger }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: ({ size = 22, color = theme.secondary }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.92 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/></svg>,
  Edit: ({ size = 18, color = theme.primary }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: ({ size = 18, color = theme.danger }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Plus: ({ size = 22, color = "#fff" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Eye: ({ size = 20, color = theme.textMuted }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: ({ size = 20, color = theme.textMuted }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Users: ({ size = 22, color = theme.primary }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Star: ({ size = 18, color = theme.warning, filled = false }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

const EyeToggle = ({ show, onToggle }) => (
  <button onClick={onToggle} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4 }}>
    {show ? <Icon.Eye /> : <Icon.EyeOff />}
  </button>
);

const SplashScreen = ({ onNext, lang }) => {
  const t = STRINGS[lang] || STRINGS.en;
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(onNext, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `linear-gradient(160deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`, gap: 20, overflow: "hidden" }}>
      <style>{`
        @keyframes logoIn { 0%{opacity:0;transform:scale(0.6)} 100%{opacity:1;transform:scale(1)} }
        @keyframes logoFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ring1 { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
        @keyframes ring2 { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(1.8);opacity:0} }
        * { scrollbar-width: none; -ms-overflow-style: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.1)", animation: "ring1 2s ease-out infinite" }} />
        <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)", animation: "ring2 2s ease-out 0.4s infinite" }} />
        <div style={{ width: 110, height: 110, borderRadius: 32, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(0,0,0,0.22)", animation: "logoIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards, logoFloat 3s ease-in-out 0.8s infinite", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.3)" }}>
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
            <circle cx="29" cy="29" r="28" fill="rgba(255,255,255,0.15)"/>
            <path d="M29 14c-4 0-8 3-8 8s4 8 8 8 8-3 8-8-4-8-8-8z" fill="white" opacity="0.9"/>
            <path d="M16 44c0-7 6-12 13-12s13 5 13 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9"/>
            <path d="M22 30l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 46, fontWeight: 900, color: "#fff", letterSpacing: 3, textShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>Saathi</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>AI Care Companion</div>
      </div>
      <div style={{ maxWidth: 260, textAlign: "center", opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "translateY(0)" : "translateY(12px)", transition: "all 0.7s ease", padding: "10px 24px", background: "rgba(255,255,255,0.12)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
        <div style={{ color: "rgba(255,255,255,0.92)", fontSize: 14, fontWeight: 500, lineHeight: 1.7 }}>{t.tagline}</div>
      </div>
    </div>
  );
};

const LanguageScreen = ({ onSelect }) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: `linear-gradient(160deg, ${theme.primaryLight} 0%, #fff 60%)`, overflow: "hidden" }}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 28px", gap: 28 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 56 }}>🌐</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: theme.text, marginTop: 12 }}>Choose Language</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: theme.textMuted, marginTop: 4 }}>भाषा चुनें / ଭାଷା ବାଛନ୍ତୁ</div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        {LANGUAGES.map(lang => (
          <button key={lang.code} onClick={() => onSelect(lang.code)}
            style={{ width: "100%", padding: "18px 22px", borderRadius: 18, border: `2px solid ${theme.border}`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: theme.shadow, transition: "all 0.18s", fontFamily: "inherit" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.background = theme.primaryLight; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = "#fff"; }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ fontWeight: 800, fontSize: 17, color: theme.text }}>{lang.label}</span>
              <span style={{ fontSize: 15, color: theme.textMuted, marginTop: 2 }}>{lang.nativeLabel}</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ProfileSelectScreen = ({ onSelect, lang }) => {
  const t = STRINGS[lang] || STRINGS.en;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, padding: "40px 24px 36px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: 22, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.3)" }}>
          <svg width="38" height="38" viewBox="0 0 58 58" fill="none"><path d="M29 14c-4 0-8 3-8 8s4 8 8 8 8-3 8-8-4-8-8-8z" fill="white" opacity="0.9"/><path d="M16 44c0-7 6-12 13-12s13 5 13 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9"/></svg>
        </div>
        <div style={{ fontSize: 30, fontWeight: 900, color: "#fff" }}>Saathi</div>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginTop: 6 }}>{t.chooseProfile}</div>
      </div>
      <div style={{ flex: 1, padding: "28px 22px", display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
        {[
          { type: "senior", icon: "👴", label: t.seniorCitizen, desc: "Health tracking, reminders & emergency", color: theme.primary, bg: theme.primaryLight },
          { type: "family", icon: "👨‍👩‍👧", label: t.familyMember, desc: "Monitor your loved one's wellbeing", color: theme.secondary, bg: theme.secondaryLight },
        ].map(p => (
          <button key={p.type} onClick={() => onSelect(p.type)}
            style={{ width: "100%", padding: "22px 20px", borderRadius: 22, border: `2.5px solid ${p.color}33`, background: p.bg, cursor: "pointer", display: "flex", alignItems: "center", gap: 18, textAlign: "left", fontFamily: "inherit", boxShadow: theme.shadow, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = theme.shadowMd; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = theme.shadow; }}
          >
            <div style={{ width: 60, height: 60, borderRadius: 18, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>{p.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 18, color: theme.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.label}</div>
              <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 3 }}>{p.desc}</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        ))}
      </div>
    </div>
  );
};

const LoginScreen = ({ onNavigate, lang }) => {
  const t = STRINGS[lang] || STRINGS.en;
  const [tab, setTab] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const voiceText = tab === "login"
    ? "Welcome to Saathi. Enter your phone number or email and password to sign in. You can also tap Continue with Google for a faster login."
    : "Create your Saathi account. Fill in your full name, email or phone, password, and date of birth to get started.";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, padding: "36px 24px 28px", textAlign: "center", flexShrink: 0 }}>
        <div style={{ width: 60, height: 60, borderRadius: 20, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", backdropFilter: "blur(8px)" }}>
          <svg width="32" height="32" viewBox="0 0 58 58" fill="none"><path d="M29 14c-4 0-8 3-8 8s4 8 8 8 8-3 8-8-4-8-8-8z" fill="white"/><path d="M16 44c0-7 6-12 13-12s13 5 13 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>Welcome to Saathi</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4 }}>Your health, our priority</div>
      </div>
      <div style={{ flex: 1, padding: "22px 22px 28px", overflowY: "auto" }}>
        <div style={{ display: "flex", background: "#fff", borderRadius: 14, padding: 4, marginBottom: 20, boxShadow: theme.shadow }}>
          {[["login", t.signIn], ["signup", t.signUp]].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} style={{ flex: 1, padding: "10px 0", borderRadius: 11, border: "none", cursor: "pointer", background: tab === k ? theme.primary : "transparent", color: tab === k ? "#fff" : theme.textMuted, fontWeight: 700, fontSize: 15, fontFamily: "inherit", transition: "all 0.2s" }}>{label}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tab === "signup" && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>{t.fullName}</div>
              <input defaultValue="Ramesh Desai" style={{ width: "100%", padding: "13px 14px", borderRadius: 13, border: `1.5px solid ${theme.border}`, fontSize: 16, fontFamily: "inherit", color: theme.text, boxSizing: "border-box", outline: "none" }} />
            </div>
          )}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>{t.phoneEmail}</div>
            <input defaultValue={tab === "login" ? "ramesh@email.com" : ""} style={{ width: "100%", padding: "13px 14px", borderRadius: 13, border: `1.5px solid ${theme.border}`, fontSize: 16, fontFamily: "inherit", color: theme.text, boxSizing: "border-box", outline: "none" }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>{t.password}</div>
            <div style={{ position: "relative" }}>
              <input type={showPass ? "text" : "password"} defaultValue="••••••••" style={{ width: "100%", padding: "13px 44px 13px 14px", borderRadius: 13, border: `1.5px solid ${theme.border}`, fontSize: 16, fontFamily: "inherit", color: theme.text, boxSizing: "border-box", outline: "none" }} />
              <EyeToggle show={showPass} onToggle={() => setShowPass(!showPass)} />
            </div>
          </div>
          {tab === "signup" && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>{t.dob}</div>
              <input defaultValue="1952-05-15" type="date" style={{ width: "100%", padding: "13px 14px", borderRadius: 13, border: `1.5px solid ${theme.border}`, fontSize: 16, fontFamily: "inherit", color: theme.text, boxSizing: "border-box", outline: "none" }} />
            </div>
          )}
          <Btn onClick={() => onNavigate("home")} style={{ width: "100%", marginTop: 4 }} size="lg">
            {tab === "login" ? t.signInBtn : t.createAccount}
          </Btn>
          {tab === "login" && (
            <button style={{ background: "none", border: "none", color: theme.primary, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>{t.forgotPass}</button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
            <div style={{ flex: 1, height: 1, background: theme.border }} />
            <span style={{ color: theme.textLight, fontSize: 13 }}>{t.orContinueWith}</span>
            <div style={{ flex: 1, height: 1, background: theme.border }} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => onNavigate("home")} style={{ flex: 1, padding: "12px 0", borderRadius: 14, border: `1.5px solid ${theme.border}`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit", fontWeight: 700, fontSize: 14, color: theme.text, boxShadow: theme.shadow, transition: "all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button onClick={() => onNavigate("home")} style={{ flex: 1, padding: "12px 0", borderRadius: 14, border: `1.5px solid ${theme.border}`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit", fontWeight: 700, fontSize: 14, color: theme.text, boxShadow: theme.shadow, transition: "all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#333"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.75 16.5h-1.5V15h1.5v2.5zm0-4h-1.5V6.5h1.5V13.5z"/></svg>
              OTP
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 4 }}>
            <VoiceBtn text={voiceText} size={38} />
            <span style={{ fontSize: 12, color: theme.textMuted, alignSelf: "center" }}>{t.voiceHint}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeScreen = ({ onNavigate, lang }) => {
  const t = STRINGS[lang] || STRINGS.en;
  const takenCount = medications.filter(m => m.taken).length;
  const [watchConnected, setWatchConnected] = useState(() => {
    try { return localStorage.getItem("saathi_watch") === "1"; } catch { return false; }
  });
  const voiceText = `Health summary: Blood Pressure 128 over 82, Heart Rate 74 beats per minute, Steps today 4100, and Sleep 7.2 hours. You have taken ${takenCount} out of ${medications.length} medications. Tap Quick Actions to scan medicine, check in, or get help.`;

  const toggleWatch = () => {
    const next = !watchConnected;
    setWatchConnected(next);
    try { localStorage.setItem("saathi_watch", next ? "1" : "0"); } catch {}
  };

  const statusBadge = (status) => {
    if (status === "normal") return <Badge color={theme.secondary}>Normal</Badge>;
    if (status === "watch") return <Badge color={theme.warning}>Watch</Badge>;
    return <Badge color={theme.danger}>Alert</Badge>;
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, padding: "18px 18px 22px", borderRadius: "0 0 28px 28px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Ramesh Ji 👋</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2 }}>Sunday, June 7, 2026</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <VoiceBtn text={voiceText} size={38} style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.3)" }} />
            <button onClick={() => onNavigate("emergency")} style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(229,85,85,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.92 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/></svg>
            </button>
            <Avatar size={40} initials="RD" bg="rgba(255,255,255,0.28)" />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, color: theme.text, marginBottom: 8, paddingLeft: 2 }}>{t.dailyHealth}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: t.bloodPressure, value: "128/82", unit: "mmHg", icon: <Icon.Activity color={theme.primary} />, color: theme.primary, bg: theme.primaryLight, status: "normal" },
              { label: t.heartRate, value: "74", unit: "bpm", icon: <Icon.Heart size={20} color={theme.danger} />, color: theme.danger, bg: theme.dangerLight, status: "normal" },
              { label: t.steps, value: "4,100", unit: "today", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.secondary} strokeWidth="2" strokeLinecap="round"><path d="M13 4l-3 3 2 2-3 3 2 2-4 4"/><path d="M6 18l6-6"/></svg>, color: theme.secondary, bg: theme.secondaryLight, status: "normal" },
              { label: t.sleep, value: "7.2h", unit: "last night", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.purple} strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>, color: theme.purple, bg: theme.purpleLight, status: "normal" },
            ].map((s, i) => (
              <Card key={i} style={{ background: s.bg, padding: "13px 14px", border: `1px solid ${s.color}22` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                  {s.icon}
                  <span style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{s.label}</span>
                </div>
                <div style={{ fontWeight: 900, fontSize: 20, color: theme.text }}>{s.value}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 3, flexWrap: "wrap", gap: 4 }}>
                  <span style={{ fontSize: 11, color: theme.textMuted }}>{s.unit}</span>
                  {statusBadge(s.status)}
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Card style={{ background: watchConnected ? theme.secondaryLight : `linear-gradient(135deg, #1a2340, #2c3e6b)`, border: watchConnected ? `1.5px solid ${theme.secondary}44` : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: watchConnected ? theme.secondary : "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon.Watch size={24} color={watchConnected ? "#fff" : theme.primary} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: watchConnected ? theme.text : "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.connectWatch}</div>
              <div style={{ fontSize: 12, color: watchConnected ? theme.textMuted : "rgba(255,255,255,0.6)", marginTop: 2 }}>{watchConnected ? "Synced 2 min ago · Battery 84%" : "Sync health data automatically"}</div>
            </div>
            <Btn onClick={toggleWatch} color={watchConnected ? theme.danger : theme.primary} size="sm">
              {watchConnected ? "Disconnect" : "Connect"}
            </Btn>
          </div>
          {watchConnected && (
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {[
                { label: "Heart Rate", value: "74 bpm" },
                { label: "Blood Pressure", value: "128/82" },
                { label: "SpO₂", value: "97%" },
              ].map((d, i) => (
                <div key={i} style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: theme.text }}>{d.value}</div>
                  <div style={{ fontSize: 10, color: theme.textMuted }}>{d.label}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card onClick={() => onNavigate("reminders")} style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Icon.Pill size={18} color={theme.primary} />
              <span style={{ fontWeight: 800, fontSize: 14, color: theme.text }}>{t.medications}</span>
            </div>
            <Badge color={theme.secondary}>{takenCount}/{medications.length} {t.taken}</Badge>
          </div>
          <div style={{ background: theme.border, borderRadius: 999, height: 7, overflow: "hidden" }}>
            <div style={{ width: `${(takenCount / medications.length) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary})`, borderRadius: 999, transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", gap: 7, marginTop: 10, overflowX: "auto" }}>
            {medications.map(m => (
              <div key={m.id} style={{ flexShrink: 0, background: m.taken ? theme.secondaryLight : theme.primaryLight, borderRadius: 10, padding: "7px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 66, border: `1.5px solid ${m.taken ? theme.secondary + "44" : theme.border}` }}>
                <Icon.Pill size={15} color={m.taken ? theme.secondary : theme.primary} />
                <span style={{ fontSize: 10, fontWeight: 700, color: theme.textMuted, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 60 }}>{m.name.split(" ")[0]}</span>
                <span style={{ fontSize: 10, color: theme.textLight }}>{m.time}</span>
              </div>
            ))}
          </div>
        </Card>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, color: theme.text, marginBottom: 8, paddingLeft: 2 }}>{t.quickActions}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { icon: <Icon.Pill size={24} color={theme.primary} />, label: t.scanMed, screen: "scanner", bg: theme.primaryLight },
              { icon: <Icon.Shield size={24} color={theme.secondary} />, label: t.homeSafety, screen: "hazard", bg: theme.secondaryLight },
              { icon: <Icon.Heart size={24} color={theme.danger} />, label: t.checkIn, screen: "checkin", bg: theme.dangerLight },
              { icon: <Icon.Activity size={24} color={theme.accent} />, label: t.reports, screen: "reports", bg: theme.accentLight },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.danger} strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, label: t.emergency, screen: "emergency", bg: theme.dangerLight },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.secondary} strokeWidth="2" strokeLinecap="round"><path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="19" x2="12" y2="23"/></svg>, label: t.saathiAI, screen: "voice", bg: theme.secondaryLight },
            ].map((a, i) => (
              <Card key={i} onClick={() => onNavigate(a.screen)} style={{ padding: "13px 6px", textAlign: "center", background: a.bg, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                {a.icon}
                <div style={{ fontSize: 11, fontWeight: 700, color: theme.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>{a.label}</div>
              </Card>
            ))}
          </div>
        </div>
        <Card style={{ background: theme.dangerLight, border: `1.5px solid ${theme.danger}33`, padding: "14px 16px" }} onClick={() => onNavigate("hazard")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <Icon.Shield size={16} color={theme.danger} />
                <span style={{ fontWeight: 800, fontSize: 14, color: theme.danger }}>Home Safety Alert</span>
              </div>
              <div style={{ color: theme.textMuted, fontSize: 12 }}>{hazards.filter(h => h.severity === "high").length} high-risk hazards detected</div>
            </div>
            <Btn onClick={() => onNavigate("hazard")} color={theme.danger} size="sm" style={{ flexShrink: 0, marginLeft: 8 }}>View</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ScannerScreen = ({ onNavigate, lang }) => {
  const t = STRINGS[lang] || STRINGS.en;
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const [galleryMode, setGalleryMode] = useState(false);
  const { speak } = useVoiceAssistant();
  const fileInputRef = useRef(null);
  const voiceText = "This is the Medication Scanner. Point your camera at the medicine label or pill bottle and tap Start Scan. You can also tap Gallery to upload a photo from your phone.";
  const startScan = () => {
    setScanning(true);
    setGalleryMode(false);
    setDone(false);
    setTimeout(() => {
      setScanning(false);
      setDone(true);
      setTimeout(() => speak("This is Metformin 500 milligrams. Take one tablet after dinner. Check with your doctor before taking any new medicines together."), 500);
    }, 2500);
  };
  const handleGallery = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFileSelected = () => {
    setGalleryMode(true);
    setDone(false);
    setScanning(false);
    setTimeout(() => {
      setGalleryMode(false);
      setDone(true);
      setTimeout(() => speak("This is Metformin 500 milligrams. Take one tablet after dinner."), 400);
    }, 1800);
  };
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Medication Scanner" onBack={() => onNavigate("home")} voiceText={voiceText} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ height: 210, background: (scanning || galleryMode) ? `linear-gradient(135deg, #1a1a2e, #0d0d1a)` : `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark}22)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "background 0.4s", position: "relative" }}>
            {(scanning || galleryMode) && (
              <>
                <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`, animation: "scan 1.5s linear infinite" }} />
                  {[[20,15],[70,40],[40,65],[80,25]].map(([x,y],i) => (
                    <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 6, height: 6, borderRadius: "50%", background: theme.primary, opacity: 0.6 }} />
                  ))}
                </div>
                <div style={{ color: theme.primary, fontWeight: 700, fontSize: 13, marginTop: 10 }}>{galleryMode ? "Analyzing image..." : "Scanning medication..."}</div>
              </>
            )}
            {!scanning && !done && !galleryMode && (
              <>
                <Icon.Pill size={48} color={theme.primary} />
                <div style={{ color: theme.textMuted, fontSize: 13, marginTop: 10, textAlign: "center" }}>Point camera at medicine label<br />or pill bottle</div>
              </>
            )}
            {done && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.secondary} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
                <div style={{ color: theme.secondary, fontWeight: 800, fontSize: 15 }}>Medication Detected!</div>
                <div style={{ color: theme.textMuted, fontSize: 12 }}>Metformin 500mg · Dr. Patel</div>
              </div>
            )}
          </div>
        </Card>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={startScan} style={{ flex: 1 }} size="lg" color={scanning ? theme.textLight : theme.primary}>
            {scanning ? "Scanning..." : done ? "Scan Again" : "Start Scan"}
          </Btn>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelected} style={{ display: "none" }} />
          <button onClick={handleGallery} style={{ padding: "17px 18px", borderRadius: 16, border: `2px solid ${theme.border}`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", fontWeight: 700, fontSize: 14, color: theme.textMuted, transition: "all 0.18s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.primary; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textMuted; }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Gallery
          </button>
        </div>
        {done && (
          <Card style={{ background: theme.secondaryLight, border: `1.5px solid ${theme.secondary}44` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: theme.text }}>Metformin 500mg</div>
                <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 2 }}>Take one tablet after dinner</div>
              </div>
              <VoiceBtn text="This is Metformin 500 milligrams. Take one tablet after dinner. Check with your doctor before taking any new medicines together." size={40} />
            </div>
            <Btn onClick={() => onNavigate("result")} color={theme.secondary} size="sm" style={{ marginTop: 10, width: "100%" }}>View Full Details →</Btn>
          </Card>
        )}
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, color: theme.text, marginBottom: 10 }}>Manual Entry</div>
          <input placeholder="Type medication name..." style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${theme.border}`, fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", marginBottom: 10, outline: "none" }} />
          <Btn outline color={theme.primary} style={{ width: "100%" }}>Look Up Medication</Btn>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, color: theme.text, marginBottom: 10 }}>Recent Scans</div>
          {[
            { name: "Metformin 500mg", date: "Today 8:00 AM" },
            { name: "Lisinopril 10mg", date: "Yesterday 12:00 PM" },
            { name: "Atorvastatin 20mg", date: "Jun 5, 8:00 PM" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 2 ? `1px solid ${theme.border}` : "none", cursor: "pointer" }} onClick={() => onNavigate("result")}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: theme.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon.Pill size={16} color={theme.primary} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{r.date}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          ))}
        </Card>
      </div>
      <style>{`@keyframes scan { 0%{top:10%} 100%{top:90%} }`}</style>
    </div>
  );
};

const HomeSafetyScanner = ({ onNavigate }) => {
  const [labels, setLabels] = useState([]);
  const voiceText = "This is the Home Safety Scanner. It uses your camera to detect hazards in your home such as wet floors, loose rugs, or poor lighting. Tap Scan to start.";
  useEffect(() => {
    const arLabels = [
      { id: 1, label: "⚠️ Trip Hazard", x: 18, y: 62, color: theme.danger, delay: 600 },
      { id: 2, label: "💡 Low Light", x: 55, y: 28, color: theme.warning, delay: 1100 },
      { id: 3, label: "💧 Wet Floor", x: 15, y: 38, color: theme.danger, delay: 1700 },
      { id: 4, label: "🚧 Clutter", x: 52, y: 68, color: theme.accent, delay: 2300 },
    ];
    arLabels.forEach(lbl => setTimeout(() => setLabels(prev => [...prev, lbl]), lbl.delay));
  }, []);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#000", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
        {[...Array(6)].map((_, i) => <div key={i} style={{ position: "absolute", left: `${(i+1)*14}%`, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.04)" }} />)}
        {[...Array(8)].map((_, i) => <div key={i} style={{ position: "absolute", top: `${(i+1)*11}%`, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.04)" }} />)}
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "35%", height: "30%", background: "rgba(255,255,255,0.04)", borderRadius: 8 }} />
        <div style={{ position: "absolute", bottom: "15%", right: "8%", width: "28%", height: "40%", background: "rgba(255,255,255,0.04)", borderRadius: 8 }} />
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "rgba(0,0,0,0.55)", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10, backdropFilter: "blur(8px)" }}>
        <button onClick={() => onNavigate("home")} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg> Back
        </button>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>Home Safety Scan</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <VoiceBtn text={voiceText} size={34} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#44ff88", boxShadow: "0 0 8px #44ff88", animation: "blink 1.2s infinite" }} />
        </div>
      </div>
      {labels.map(lbl => (
        <div key={lbl.id} style={{ position: "absolute", left: `${lbl.x}%`, top: `${lbl.y}%`, background: `${lbl.color}EE`, color: "#fff", padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, boxShadow: `0 4px 18px ${lbl.color}88`, backdropFilter: "blur(6px)", border: "1.5px solid rgba(255,255,255,0.35)", zIndex: 8, animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)", whiteSpace: "nowrap" }}>
          {lbl.label}
        </div>
      ))}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.7)", padding: "16px", backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <button onClick={() => onNavigate("hazard")} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 12, padding: "10px 16px", color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 700, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Icon.Shield size={22} color="#fff" />Hazards
          </button>
          <button onClick={() => onNavigate("safetyreport")} style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, border: "4px solid rgba(255,255,255,0.4)", fontSize: 22, color: "#fff", cursor: "pointer", boxShadow: "0 6px 24px rgba(74,144,217,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button onClick={() => onNavigate("hazard")} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 12, padding: "10px 16px", color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 700, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Rooms
          </button>
        </div>
      </div>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes popIn { 0%{transform:scale(0.3);opacity:0} 100%{transform:scale(1);opacity:1} }
      `}</style>
    </div>
  );
};

const ResultScreen = ({ onNavigate }) => {
  const { speak } = useVoiceAssistant();
  useEffect(() => { setTimeout(() => speak("Medicine detected: Metformin 500 milligrams. Take one tablet after dinner. Your next dose is at 12 noon today."), 400); }, []);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Detection Result" onBack={() => onNavigate("scanner")} voiceText="Medicine detected: Metformin 500 milligrams. Take one tablet after dinner. Your next dose is at 12 noon today. You can set a reminder or mark this as taken." />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ background: theme.secondaryLight, border: `1.5px solid ${theme.secondary}44` }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: theme.secondary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon.Pill size={28} color="#fff" /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 19, color: theme.text }}>Metformin 500mg</div>
              <div style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}>Tablet · Anti-diabetic</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                <Badge color={theme.secondary}>Match Found</Badge>
                <Badge color={theme.primary}>98% Confidence</Badge>
              </div>
            </div>
            <VoiceBtn text="This is Metformin 500 milligrams. Take one tablet after dinner. Your next dose is at 12 noon today." size={38} />
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, color: theme.text, marginBottom: 12 }}>Medication Details</div>
          {[
            { label: "Prescribed By", value: "Dr. Priya Sharma (Endocrinologist)" },
            { label: "Dosage", value: "500mg · Twice daily" },
            { label: "Next Dose", value: "12:00 PM Today" },
            { label: "With Food", value: "Yes – Take with meals" },
            { label: "Refill Due", value: "June 18, 2026 (11 days)" },
            { label: "Manufacturer", value: "Sun Pharma · Lot #SP2024-05" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 5 ? `1px solid ${theme.border}` : "none", gap: 8 }}>
              <span style={{ color: theme.textMuted, fontSize: 13, flexShrink: 0 }}>{d.label}</span>
              <span style={{ color: theme.text, fontWeight: 600, fontSize: 13, textAlign: "right", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{d.value}</span>
            </div>
          ))}
        </Card>
        <Card style={{ background: theme.warningLight, border: `1.5px solid ${theme.warning}44` }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: theme.text, marginBottom: 10 }}>Drug Interactions</div>
          {[
            { drug: "Alcohol", severity: "Avoid", color: theme.danger },
            { drug: "Ibuprofen", severity: "Caution", color: theme.warning },
            { drug: "Lisinopril", severity: "Monitor", color: theme.primary },
          ].map((int, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < 2 ? `1px solid ${theme.border}` : "none" }}>
              <span style={{ color: theme.text, fontSize: 13 }}>{int.drug}</span>
              <Badge color={int.color}>{int.severity}</Badge>
            </div>
          ))}
        </Card>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={() => onNavigate("reminders")} style={{ flex: 1 }} color={theme.primary}>Set Reminder</Btn>
          <Btn onClick={() => onNavigate("home")} outline color={theme.primary} style={{ flex: 1 }}>Mark Taken</Btn>
        </div>
      </div>
    </div>
  );
};

const RemindersScreen = ({ onNavigate }) => {
  const [toggled, setToggled] = useState({});
  const voiceText = "This is your Smart Reminders screen. You have 6 reminders today. 2 are done and 4 are pending. Your next reminder is Lisinopril 10 milligrams at 12 noon.";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Smart Reminders" onBack={() => onNavigate("home")} showNotif onNavigate={onNavigate} voiceText={voiceText} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { label: "Total", value: "6", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>, color: theme.primary },
            { label: "Done", value: "2", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.secondary} strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>, color: theme.secondary },
            { label: "Pending", value: "4", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, color: theme.accent },
          ].map((s, i) => (
            <Card key={i} style={{ textAlign: "center", padding: "12px 8px" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontWeight: 900, fontSize: 22, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: theme.textMuted }}>{s.label}</div>
            </Card>
          ))}
        </div>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 15, color: theme.text, marginBottom: 12 }}>Today's Schedule</div>
          {reminders.map((r, i) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < reminders.length - 1 ? `1px solid ${theme.border}` : "none" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: r.done ? theme.secondaryLight : r.type === "doctor" ? theme.dangerLight : r.type === "call" ? theme.accentLight : theme.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {r.type === "med" ? <Icon.Pill size={16} color={r.done ? theme.secondary : theme.primary} /> : r.type === "doctor" ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.danger} strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> : r.type === "call" ? <Icon.Phone size={16} color={theme.accent} /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: r.done ? theme.textLight : theme.text, textDecoration: r.done ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{r.time}</div>
              </div>
              <div onClick={() => setToggled(prev => ({ ...prev, [r.id]: !prev[r.id] }))}
                style={{ width: 42, height: 22, borderRadius: 999, background: (r.done || toggled[r.id]) ? theme.secondary : theme.border, position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: 2, left: (r.done || toggled[r.id]) ? 21 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
              </div>
            </div>
          ))}
        </Card>
        <Btn color={theme.primary} size="lg" style={{ width: "100%" }}>+ Add New Reminder</Btn>
      </div>
    </div>
  );
};

const CheckInScreen = ({ onNavigate }) => {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(null);
  const [pain, setPain] = useState(3);
  const [symptoms, setSymptoms] = useState([]);
  const steps = ["How are you feeling?", "Pain Level", "Any symptoms?", "Summary"];
  const moods = [{ emoji: "😄", label: "Great" }, { emoji: "🙂", label: "Good" }, { emoji: "😐", label: "Okay" }, { emoji: "😔", label: "Low" }, { emoji: "😣", label: "Poor" }];
  const symptomList = ["Headache", "Dizziness", "Nausea", "Fatigue", "Chest Pain", "Shortness of Breath", "Back Pain", "Swelling"];
  const toggleSym = s => setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const voiceTexts = ["How are you feeling today? Select one of the five mood options: Great, Good, Okay, Low, or Poor.", "On a scale of 0 to 10, how much pain are you in right now? 0 means no pain at all, and 10 means very severe pain.", "Are you experiencing any symptoms today? Select all that apply.", "Check-in complete. Thank you for sharing how you feel today."];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Daily Check-In" onBack={() => step > 0 ? setStep(step - 1) : onNavigate("home")} voiceText={voiceTexts[step]} />
      <div style={{ padding: "10px 14px 0", display: "flex", gap: 5, flexShrink: 0 }}>
        {steps.map((s, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 999, background: i <= step ? theme.primary : theme.border, transition: "background 0.3s" }} />)}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 19, color: theme.text }}>{steps[step]}</div>
        {step === 0 && (
          <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
            {moods.map((m, i) => (
              <button key={i} onClick={() => setMood(i)} style={{ flex: 1, padding: "12px 4px", borderRadius: 14, background: mood === i ? theme.primaryLight : "#fff", border: `2px solid ${mood === i ? theme.primary : theme.border}`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transition: "all 0.2s" }}>
                <span style={{ fontSize: 28 }}>{m.emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: mood === i ? theme.primary : theme.textMuted }}>{m.label}</span>
              </button>
            ))}
          </div>
        )}
        {step === 1 && (
          <Card>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 48 }}>{pain <= 2 ? "😊" : pain <= 5 ? "😐" : pain <= 8 ? "😣" : "😫"}</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: pain <= 2 ? theme.secondary : pain <= 5 ? theme.warning : theme.danger }}>{pain}/10</div>
              <div style={{ color: theme.textMuted, fontSize: 13 }}>{pain <= 2 ? "No pain / Very mild" : pain <= 5 ? "Moderate discomfort" : pain <= 8 ? "Significant pain" : "Severe pain"}</div>
            </div>
            <input type="range" min={0} max={10} value={pain} onChange={e => setPain(+e.target.value)} style={{ width: "100%", accentColor: theme.primary, cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: theme.textLight, fontSize: 11, marginTop: 4 }}><span>0 – None</span><span>5 – Moderate</span><span>10 – Severe</span></div>
          </Card>
        )}
        {step === 2 && (
          <Card>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {symptomList.map(s => (
                <button key={s} onClick={() => toggleSym(s)} style={{ padding: "8px 13px", borderRadius: 999, background: symptoms.includes(s) ? theme.primary : "#fff", color: symptoms.includes(s) ? "#fff" : theme.textMuted, border: `1.5px solid ${symptoms.includes(s) ? theme.primary : theme.border}`, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 12, transition: "all 0.18s" }}>
                  {symptoms.includes(s) ? "✓ " : ""}{s}
                </button>
              ))}
            </div>
          </Card>
        )}
        {step === 3 && (
          <Card style={{ background: theme.secondaryLight }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 10 }}>Check-In Complete!</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: theme.textMuted }}>Mood</span><span style={{ fontWeight: 700 }}>{mood !== null ? moods[mood].emoji + " " + moods[mood].label : "Not recorded"}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: theme.textMuted }}>Pain Level</span><span style={{ fontWeight: 700 }}>{pain}/10</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span style={{ color: theme.textMuted, flexShrink: 0 }}>Symptoms</span><span style={{ fontWeight: 700, textAlign: "right", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{symptoms.length > 0 ? symptoms.join(", ") : "None"}</span></div>
            </div>
          </Card>
        )}
        {step === 3
          ? <Btn onClick={() => onNavigate("wellness")} color={theme.primary} size="lg" style={{ width: "100%" }}>View Wellness Summary →</Btn>
          : <Btn onClick={() => setStep(step + 1)} color={theme.primary} size="lg" style={{ width: "100%" }}>{step === 2 ? "Complete ✓" : "Continue →"}</Btn>}
      </div>
    </div>
  );
};

const WellnessScreen = ({ onNavigate }) => {
  const maxSteps = Math.max(...weeklyData.map(d => d.steps));
  const voiceText = "Your wellness score today is 82 out of 100, which is excellent. Blood pressure is normal. Steps today are 4100. Sleep was 7.2 hours last night.";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Wellness Summary" onBack={() => onNavigate("home")} voiceText={voiceText} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, padding: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Today's Wellness Score</div>
              <div style={{ fontSize: 50, fontWeight: 900, color: "#fff" }}>82</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>↑ +5 from yesterday</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "4px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>😊</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 5 }}>Excellent</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {[
              { label: "Meds Taken", value: "2/4", icon: "💊" },
              { label: "Steps", value: "4,100", icon: "👟" },
              { label: "Sleep", value: "7.2h", icon: "😴" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 16 }}>{s.icon}</div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Daily Steps This Week</div>
          <div style={{ display: "flex", gap: 5, alignItems: "flex-end", height: 90 }}>
            {weeklyData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", background: i === 6 ? theme.primary : theme.primaryLight, borderRadius: "5px 5px 0 0", height: `${(d.steps / maxSteps) * 82}px`, transition: "height 0.4s" }} />
                <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: i === 6 ? 800 : 500 }}>{d.day}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Vital Signs</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {vitals.map((v, i) => (
              <div key={i} style={{ background: v.status === "normal" ? theme.secondaryLight : theme.warningLight, borderRadius: 12, padding: "11px", border: `1px solid ${v.status === "normal" ? theme.secondary + "33" : theme.warning + "44"}` }}>
                <div style={{ fontSize: 18 }}>{v.icon}</div>
                <div style={{ fontWeight: 900, fontSize: 18, color: theme.text, marginTop: 3 }}>{v.value}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{v.unit}</div>
                <div style={{ fontSize: 11, color: v.label === "Blood Sugar" ? theme.warning : theme.secondary, fontWeight: 700, marginTop: 1 }}>{v.label}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>Saathi's Insights</div>
          {[
            { icon: "✅", text: "Blood pressure is within normal range. Keep up the low-sodium diet!", color: theme.secondary },
            { icon: "⚠️", text: "Blood sugar slightly elevated. Consider reducing carbs today.", color: theme.warning },
            { icon: "💤", text: "Sleep improved by 45 mins from last week. Great progress!", color: theme.primary },
            { icon: "🏃", text: "Step count dropped slightly today. A 10-minute walk would help!", color: theme.accent },
          ].map((ins, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < 3 ? `1px solid ${theme.border}` : "none" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{ins.icon}</span>
              <span style={{ fontSize: 12, color: theme.text, lineHeight: 1.5 }}>{ins.text}</span>
            </div>
          ))}
        </Card>
        <Btn onClick={() => onNavigate("reports")} color={theme.primary} size="lg" style={{ width: "100%" }}>View Full Reports →</Btn>
      </div>
    </div>
  );
};

const DeviationScreen = ({ onNavigate }) => {
  const voiceText = "Alert: Routine deviation detected. Unusual inactivity has been noticed. You can notify your family, share your live location, or call an emergency contact.";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Routine Alert" onBack={() => onNavigate("home")} voiceText={voiceText} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ background: theme.dangerLight, border: `2px solid ${theme.danger}44` }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: theme.danger, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 17, color: theme.danger }}>Routine Deviation Detected</div>
              <div style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}>Unusual inactivity — 3:45 PM today</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>What Was Detected</div>
          {[
            { icon: "🚶", title: "No movement detected", desc: "Usually active between 2–4 PM · 2hr 15min of inactivity", severity: "high" },
            { icon: "💊", title: "Medication not taken", desc: "Lisinopril 10mg scheduled at 12:00 PM · Not confirmed", severity: "high" },
            { icon: "📱", title: "Phone untouched for 4hrs", desc: "Unusual for time of day", severity: "medium" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < 2 ? `1px solid ${theme.border}` : "none" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: d.severity === "high" ? theme.dangerLight : theme.warningLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{d.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{d.title}</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{d.desc}</div>
              </div>
              <Badge color={d.severity === "high" ? theme.danger : theme.warning}>{d.severity}</Badge>
            </div>
          ))}
        </Card>
        <Card style={{ background: theme.primaryLight, border: `1.5px solid ${theme.primary}33` }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <Icon.MapPin size={18} color={theme.primary} />
            <span style={{ fontWeight: 800, fontSize: 14, color: theme.text }}>Send Current Location</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Btn color={theme.primary} style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Icon.Users size={16} color="#fff" />Notify Family
              </div>
            </Btn>
            <Btn color={theme.secondary} style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Icon.MapPin size={16} color="#fff" />Share Live Location
              </div>
            </Btn>
            <Btn color={theme.danger} style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Icon.Phone size={16} color="#fff" />Call Emergency Contact
              </div>
            </Btn>
          </div>
        </Card>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={() => onNavigate("home")} style={{ flex: 1 }} color={theme.secondary}>I'm Fine 👍</Btn>
          <Btn onClick={() => onNavigate("emergency")} style={{ flex: 1 }} color={theme.danger}>Need Help</Btn>
        </div>
      </div>
    </div>
  );
};

const HazardScreen = ({ onNavigate }) => {
  const voiceText = "This is the Home Safety screen. 4 hazards were detected in your home. 2 are high risk: a wet floor in the kitchen and clutter on the staircase. Please take care.";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Home Safety" onBack={() => onNavigate("home")} voiceText={voiceText} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ background: `linear-gradient(135deg, #1A2340, #2C3E6B)`, padding: "16px" }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", marginBottom: 3 }}>Home Safety Scan</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginBottom: 12 }}>Last scan: Today 9:00 AM</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Total", value: hazards.length, color: "#fff" },
              { label: "High Risk", value: hazards.filter(h => h.severity === "high").length, color: theme.danger },
              { label: "Medium", value: hazards.filter(h => h.severity === "medium").length, color: theme.warning },
              { label: "Low", value: hazards.filter(h => h.severity === "low").length, color: theme.secondary },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "9px 5px", textAlign: "center" }}>
                <div style={{ fontWeight: 900, fontSize: 20, color: s.color }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>Home Map</div>
          <div style={{ background: theme.bg, borderRadius: 12, padding: 10, position: "relative", height: 145, border: `1px solid ${theme.border}` }}>
            {[
              { label: "Kitchen", x: 5, y: 5, w: 38, h: 42, hasHazard: true },
              { label: "Living Room", x: 47, y: 5, w: 48, h: 55, hasHazard: true },
              { label: "Bedroom", x: 5, y: 52, w: 38, h: 42, hasHazard: false },
              { label: "Hallway", x: 47, y: 65, w: 20, h: 30, hasHazard: false },
              { label: "Staircase", x: 71, y: 65, w: 24, h: 30, hasHazard: true },
            ].map((r, i) => (
              <div key={i} style={{ position: "absolute", left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%`, border: `2px solid ${r.hasHazard ? theme.danger : theme.border}`, borderRadius: 7, background: r.hasHazard ? `${theme.danger}18` : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: r.hasHazard ? theme.danger : theme.textMuted, textAlign: "center" }}>
                {r.hasHazard && <span style={{ position: "absolute", top: -8, right: -8, fontSize: 13 }}>⚠️</span>}
                {r.label}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Detected Hazards</div>
          {hazards.map((h, i) => (
            <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < hazards.length - 1 ? `1px solid ${theme.border}` : "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: h.severity === "high" ? theme.dangerLight : h.severity === "medium" ? theme.warningLight : theme.secondaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{h.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{h.label}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{h.location}</div>
              </div>
              <Badge color={h.severity === "high" ? theme.danger : h.severity === "medium" ? theme.warning : theme.secondary}>{h.severity.charAt(0).toUpperCase() + h.severity.slice(1)}</Badge>
            </div>
          ))}
        </Card>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={() => onNavigate("homesafetyscanner")} style={{ flex: 1 }} color={theme.primary}>Re-Scan Room</Btn>
          <Btn onClick={() => onNavigate("safetyreport")} style={{ flex: 1 }} color={theme.secondary}>View Report</Btn>
        </div>
      </div>
    </div>
  );
};

const SafetyReportScreen = ({ onNavigate }) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
    <TopBar title="Safety Report" onBack={() => onNavigate("hazard")} voiceText="This is the weekly safety report for your home. Your safety grade is B+. The staircase needs the most attention with a score of 55 percent." />
    <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
      <Card style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})` }}>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Weekly Safety Assessment</div>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, marginTop: 3 }}>Ramesh Desai's Home</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>June 1–7, 2026 · 12 Rajpath Colony, Bhubaneswar</div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {[{ v: "7", l: "Total Scans" }, { v: "4", l: "Hazards Fixed" }, { v: "B+", l: "Safety Grade" }].map((d, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 9, padding: "9px 7px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: i === 2 ? "#ffd700" : "#fff" }}>{d.v}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{d.l}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Room-by-Room Status</div>
        {[
          { room: "Kitchen", score: 68, hazards: 2, icon: "🍳" },
          { room: "Living Room", score: 72, hazards: 1, icon: "🛋️" },
          { room: "Bedroom", score: 91, hazards: 0, icon: "🛏️" },
          { room: "Bathroom", score: 85, hazards: 0, icon: "🚿" },
          { room: "Staircase", score: 55, hazards: 1, icon: "🪜" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < 4 ? `1px solid ${theme.border}` : "none" }}>
            <div style={{ fontSize: 18, width: 26, textAlign: "center", flexShrink: 0 }}>{r.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{r.room}</div>
              <div style={{ height: 5, background: theme.border, borderRadius: 999, marginTop: 5, overflow: "hidden" }}>
                <div style={{ width: `${r.score}%`, height: "100%", borderRadius: 999, background: r.score >= 85 ? theme.secondary : r.score >= 70 ? theme.warning : theme.danger, transition: "width 0.5s" }} />
              </div>
            </div>
            <div style={{ textAlign: "right", minWidth: 40, flexShrink: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: r.score >= 85 ? theme.secondary : r.score >= 70 ? theme.warning : theme.danger }}>{r.score}%</div>
              {r.hazards > 0 && <div style={{ fontSize: 10, color: theme.danger }}>{r.hazards} hazard{r.hazards > 1 ? "s" : ""}</div>}
            </div>
          </div>
        ))}
      </Card>
      <Card>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>Recommendations</div>
        {[
          { text: "Install non-slip mats in kitchen and near staircase entrance", priority: "High" },
          { text: "Remove loose rug in living room or secure with double-sided tape", priority: "High" },
          { text: "Install night-light in hallway leading to bathroom", priority: "Medium" },
          { text: "Clear items from bottom step of staircase", priority: "Medium" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${theme.border}` : "none" }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{r.priority === "High" ? "🔴" : "🟡"}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: theme.text, lineHeight: 1.5 }}>{r.text}</div>
              <Badge color={r.priority === "High" ? theme.danger : theme.warning} style={{ marginTop: 4 }}>{r.priority}</Badge>
            </div>
          </div>
        ))}
      </Card>
      <Btn onClick={() => onNavigate("family")} color={theme.primary} size="lg" style={{ width: "100%" }}>Share with Family →</Btn>
    </div>
  </div>
);

const BloodPressureScreen = ({ onNavigate }) => {
  const [mode, setMode] = useState("manual");
  const [sys, setSys] = useState("");
  const [dia, setDia] = useState("");
  const [saved, setSaved] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle");
  const voiceText = "This is the Blood Pressure screen. You can enter your reading manually by typing the systolic and diastolic numbers. Or connect your smart watch to sync the reading automatically.";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Blood Pressure" onBack={() => onNavigate("home")} voiceText={voiceText} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", background: "#fff", borderRadius: 14, padding: 4, boxShadow: theme.shadow }}>
          {[["manual", "Manual Entry"], ["watch", "Smart Watch"]].map(([k, label]) => (
            <button key={k} onClick={() => setMode(k)} style={{ flex: 1, padding: "10px 0", borderRadius: 11, border: "none", cursor: "pointer", background: mode === k ? theme.primary : "transparent", color: mode === k ? "#fff" : theme.textMuted, fontWeight: 700, fontSize: 14, fontFamily: "inherit", transition: "all 0.2s" }}>{label}</button>
          ))}
        </div>
        {mode === "manual" && (
          <Card>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
              <Icon.Activity size={18} color={theme.primary} />Manual BP Entry
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>Systolic (mmHg)</div>
                <input value={sys} onChange={e => setSys(e.target.value)} placeholder="e.g. 128" type="number" style={{ width: "100%", padding: "14px", borderRadius: 13, border: `1.5px solid ${theme.border}`, fontSize: 20, fontFamily: "inherit", color: theme.text, boxSizing: "border-box", outline: "none", textAlign: "center", fontWeight: 800 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", paddingTop: 22 }}><span style={{ fontSize: 24, fontWeight: 900, color: theme.textMuted }}>/</span></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>Diastolic (mmHg)</div>
                <input value={dia} onChange={e => setDia(e.target.value)} placeholder="e.g. 82" type="number" style={{ width: "100%", padding: "14px", borderRadius: 13, border: `1.5px solid ${theme.border}`, fontSize: 20, fontFamily: "inherit", color: theme.text, boxSizing: "border-box", outline: "none", textAlign: "center", fontWeight: 800 }} />
              </div>
            </div>
            {sys && dia && (
              <div style={{ background: +sys < 130 ? theme.secondaryLight : theme.warningLight, borderRadius: 12, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{+sys < 130 ? "✅" : "⚠️"}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: theme.text }}>{sys}/{dia} mmHg</div>
                  <div style={{ fontSize: 12, color: +sys < 130 ? theme.secondary : theme.warning }}>{+sys < 120 ? "Normal" : +sys < 130 ? "Elevated" : "High – Consult doctor"}</div>
                </div>
              </div>
            )}
            {saved && <div style={{ textAlign: "center", color: theme.secondary, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>✓ Saved successfully!</div>}
            <Btn onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} color={theme.primary} size="lg" style={{ width: "100%" }}>Save Reading</Btn>
          </Card>
        )}
        {mode === "watch" && (
          <Card>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
              <Icon.Watch size={18} color={theme.primary} />Smart Watch Measurement
            </div>
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ width: 80, height: 80, borderRadius: 22, background: syncStatus === "synced" ? theme.secondaryLight : theme.primaryLight, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${syncStatus === "synced" ? theme.secondary : theme.primary}` }}>
                <Icon.Watch size={36} color={syncStatus === "synced" ? theme.secondary : theme.primary} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: theme.text }}>{syncStatus === "idle" ? "Watch Not Connected" : syncStatus === "connecting" ? "Connecting..." : syncStatus === "syncing" ? "Syncing..." : "Synced"}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>
                {syncStatus === "synced" ? "Last reading: Just now" : "Connect your watch to measure BP automatically"}
              </div>
            </div>
            {syncStatus === "synced" && (
              <div style={{ background: theme.secondaryLight, borderRadius: 12, padding: "12px", textAlign: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: theme.text }}>128 / 82</div>
                <div style={{ fontSize: 12, color: theme.secondary, fontWeight: 700, marginTop: 4 }}>mmHg · Normal Range ✅</div>
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <Btn color={theme.primary} style={{ flex: 1 }} onClick={() => { setSyncStatus("connecting"); setTimeout(() => setSyncStatus("syncing"), 1200); setTimeout(() => setSyncStatus("synced"), 2400); }}>
                {syncStatus === "idle" ? "Connect Watch" : syncStatus === "synced" ? "Re-Sync" : "Connecting..."}
              </Btn>
              {syncStatus === "synced" && <Btn color={theme.secondary} style={{ flex: 1 }}>Save Reading</Btn>}
            </div>
          </Card>
        )}
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>Recent Readings</div>
          {[
            { date: "Today 9:00 AM", value: "128/82", status: "normal" },
            { date: "Yesterday 8:30 AM", value: "131/84", status: "watch" },
            { date: "Jun 5, 9:00 AM", value: "124/80", status: "normal" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? `1px solid ${theme.border}` : "none" }}>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{r.date}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontWeight: 800, fontSize: 14, color: theme.text }}>{r.value}</span>
                <Badge color={r.status === "normal" ? theme.secondary : theme.warning}>{r.status === "normal" ? "Normal" : "Watch"}</Badge>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

const EmergencyScreen = ({ onNavigate }) => {
  const [calling, setCalling] = useState(false);
  const [contacts, setContacts] = useState(() => {
    try {
      const stored = localStorage.getItem("saathi_emergency_contacts");
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: 1, name: "Priya (Daughter)", phone: "+91 98765 43210", relation: "Family", color: theme.primary },
      { id: 2, name: "Dr. Sharma", phone: "+91 87654 32109", relation: "Doctor", color: theme.purple },
      { id: 3, name: "Ambulance", phone: "108", relation: "Emergency", color: theme.danger },
      { id: 4, name: "Police", phone: "100", relation: "Emergency", color: theme.primaryDark },
      { id: 5, name: "Neighbor – Rajan", phone: "+91 76543 21098", relation: "Neighbor", color: theme.secondary },
    ];
  });
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", relation: "", phone: "" });
  const [formError, setFormError] = useState("");
  const voiceText = "This is the Emergency screen. Press the big red SOS button for 3 seconds to call for help. You can also call family, your doctor, or emergency services directly.";

  const persistContacts = (updated) => {
    try { localStorage.setItem("saathi_emergency_contacts", JSON.stringify(updated)); } catch {}
    setContacts(updated);
  };

  const saveContact = () => {
    if (!form.name.trim()) { setFormError("Please enter a name."); return; }
    if (!form.phone.trim() || !/^[\d\s+\-()]{6,}$/.test(form.phone.trim())) { setFormError("Please enter a valid phone number."); return; }
    setFormError("");
    if (editId) {
      persistContacts(contacts.map(x => x.id === editId ? { ...x, ...form } : x));
      setEditId(null);
    } else {
      persistContacts([...contacts, { id: Date.now(), ...form, color: theme.primary }]);
    }
    setForm({ name: "", relation: "", phone: "" });
    setShowAdd(false);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", overflow: "hidden" }}>
      <div style={{ background: theme.danger, padding: "18px 18px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <button onClick={() => onNavigate("home")} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, padding: "8px 14px", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontFamily: "inherit" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg> Back
        </button>
        <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>Emergency Help</div>
        <VoiceBtn text={voiceText} size={36} style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }} />
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "18px 14px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ textAlign: "center", padding: "4px 0 14px" }}>
          <div style={{ marginBottom: 10, color: theme.textMuted, fontSize: 13 }}>Press and hold for 3 seconds</div>
          <button onClick={() => { setCalling(true); setTimeout(() => setCalling(false), 3000); }}
            style={{ width: 150, height: 150, borderRadius: "50%", background: calling ? `linear-gradient(135deg, #cc0000, #ff0000)` : `linear-gradient(135deg, ${theme.danger}, #c0392b)`, border: `8px solid ${theme.dangerLight}`, fontSize: 38, color: "#fff", cursor: "pointer", boxShadow: `0 0 0 ${calling ? "16px" : "0px"} ${theme.danger}44`, fontFamily: "inherit", fontWeight: 900, transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span style={{ fontSize: 16 }}>SOS</span>
          </button>
          {calling && <div style={{ color: theme.danger, fontWeight: 700, fontSize: 14, marginTop: 12, animation: "blink 0.6s infinite" }}>📞 Calling Emergency Services...</div>}
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: theme.text }}>Emergency Contacts</div>
            <button onClick={() => { setShowAdd(true); setEditId(null); setForm({ name: "", relation: "", phone: "" }); setFormError(""); }}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", borderRadius: 10, border: `1.5px solid ${theme.primary}`, background: theme.primaryLight, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13, color: theme.primary }}>
              <Icon.Plus size={14} color={theme.primary} /> Add
            </button>
          </div>
          {showAdd && (
            <Card style={{ marginBottom: 10, background: theme.primaryLight, border: `1.5px solid ${theme.primary}33` }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{editId ? "Edit Contact" : "Add Emergency Contact"}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Name *", "name", "e.g. Priya (Daughter)"], ["Relationship", "relation", "e.g. Daughter"], ["Phone Number *", "phone", "e.g. +91 98765 43210"]].map(([label, key, ph]) => (
                  <div key={key}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 4 }}>{label}</div>
                    <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph}
                      style={{ width: "100%", padding: "12px 12px", borderRadius: 11, border: `1.5px solid ${theme.border}`, fontSize: 14, fontFamily: "inherit", color: theme.text, boxSizing: "border-box", outline: "none", background: "#fff" }} />
                  </div>
                ))}
                {formError && <div style={{ color: theme.danger, fontSize: 12, fontWeight: 600 }}>{formError}</div>}
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn color={theme.primary} style={{ flex: 1 }} onClick={saveContact}>Save Contact</Btn>
                  <Btn outline color={theme.textMuted} textColor={theme.textMuted} style={{ flex: 1 }} onClick={() => { setShowAdd(false); setFormError(""); }}>Cancel</Btn>
                </div>
              </div>
            </Card>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {contacts.map((c) => (
              <Card key={c.id} style={{ padding: "12px 14px", border: `1.5px solid ${c.color}22` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: c.color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon.Phone size={18} color={c.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: theme.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.phone} · {c.relation}</div>
                  </div>
                  <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                    <button onClick={() => { setEditId(c.id); setForm({ name: c.name, relation: c.relation, phone: c.phone }); setShowAdd(true); setFormError(""); }}
                      style={{ width: 34, height: 34, borderRadius: 9, background: theme.primaryLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon.Edit size={15} color={theme.primary} />
                    </button>
                    <button onClick={() => persistContacts(contacts.filter(x => x.id !== c.id))}
                      style={{ width: 34, height: 34, borderRadius: 9, background: theme.dangerLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon.Trash size={15} color={theme.danger} />
                    </button>
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} style={{ textDecoration: "none" }}>
                      <Btn color={c.color} size="sm">
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Icon.Phone size={13} color="#fff" />Call
                        </div>
                      </Btn>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Card style={{ background: theme.primaryLight }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
            <Icon.MapPin size={16} color={theme.primary} />
            <span style={{ fontWeight: 700, fontSize: 13 }}>Your Location (Shared)</span>
          </div>
          <div style={{ color: theme.textMuted, fontSize: 12 }}>12 Rajpath Colony, Near City Mall, Bhubaneswar, Odisha 751001</div>
          <div style={{ color: theme.secondary, fontWeight: 600, fontSize: 11, marginTop: 5 }}>✅ Location shared with all emergency contacts</div>
        </Card>
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
};

const VoiceScreen = ({ onNavigate, lang }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const sampleQs = ["What medications do I take today?", "How are my vitals today?", "Remind me to call Priya at 5 PM", "Any hazards in my home?"];
  const responses = {
    "What medications do I take today?": "You have 4 medications today. Metformin 500mg and Aspirin 75mg are already taken ✅. You still need to take Lisinopril 10mg at 12 PM and Atorvastatin 20mg at 8 PM.",
    "How are my vitals today?": "Your vitals look mostly good! Blood pressure is 128/82 mmHg (normal), heart rate is 74 bpm (normal), and SpO₂ is 97% (excellent). Blood sugar is 118 mg/dL – slightly elevated.",
    "Remind me to call Priya at 5 PM": "Done! I've set a reminder for you to call Priya at 5:00 PM today 📞",
    "Any hazards in my home?": "I detected 4 hazards: a wet floor in the kitchen, a loose rug in the living room, low lighting in the hallway, and clutter on the staircase. 2 are high-risk.",
  };
  const simulateQuery = q => {
    setTranscript(q); setListening(false);
    setTimeout(() => {
      const ans = responses[q] || "I'm here to help! Could you please repeat that?";
      setResponse(ans);
      safeSpeak(ans);
    }, 1200);
  };
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: `linear-gradient(180deg, ${theme.primaryDark} 0%, #0d1b35 100%)`, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={() => onNavigate("home")} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "8px 14px", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontFamily: "inherit" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg> Back
        </button>
        <div style={{ fontWeight: 900, fontSize: 17, color: "#fff" }}>Saathi Voice Assistant</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 20px 14px", overflow: "hidden" }}>
        <div style={{ position: "relative", marginBottom: 20, flexShrink: 0 }}>
          {listening && [1, 2, 3].map(r => (
            <div key={r} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 80 + r * 40, height: 80 + r * 40, borderRadius: "50%", border: `2px solid rgba(74,144,217,${0.4 / r})`, animation: `ripple${r} ${1 + r * 0.3}s ease-out infinite` }} />
          ))}
          <div onClick={() => { setListening(!listening); setTranscript(""); setResponse(""); }}
            style={{ width: 94, height: 94, borderRadius: "50%", background: listening ? `radial-gradient(circle, ${theme.primary}, ${theme.primaryDark})` : "rgba(255,255,255,0.1)", border: `3px solid ${listening ? theme.primary : "rgba(255,255,255,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: listening ? `0 0 40px ${theme.primary}88` : "none", transition: "all 0.3s" }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          </div>
        </div>
        <div style={{ color: listening ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: 15, marginBottom: 8, flexShrink: 0 }}>
          {listening ? "Listening..." : transcript ? "Tap to speak again" : "Tap to speak to Saathi"}
        </div>
        {listening && (
          <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 36, marginBottom: 14, flexShrink: 0 }}>
            {[4, 8, 14, 20, 14, 24, 10, 16, 8, 20, 14, 8, 18, 12, 6].map((h, i) => (
              <div key={i} style={{ width: 3, borderRadius: 999, background: theme.primary, height: h }} />
            ))}
          </div>
        )}
        {transcript && (
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: "10px 14px", marginBottom: 10, width: "100%", backdropFilter: "blur(10px)", flexShrink: 0 }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginBottom: 3 }}>You said:</div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>"{transcript}"</div>
          </div>
        )}
        {response && (
          <div style={{ background: `rgba(74,144,217,0.25)`, borderRadius: 14, padding: "12px 14px", marginBottom: 14, width: "100%", border: "1px solid rgba(74,144,217,0.4)", flexShrink: 0 }}>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginBottom: 5 }}>Saathi says:</div>
            <div style={{ color: "#fff", fontSize: 13, lineHeight: 1.6 }}>{response}</div>
          </div>
        )}
        <div style={{ width: "100%", marginTop: "auto" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 8, textAlign: "center" }}>Try asking:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {sampleQs.map((q, i) => (
              <button key={i} onClick={() => simulateQuery(q)} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 11, padding: "10px 13px", color: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 12, textAlign: "left", transition: "background 0.2s", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>💬 {q}</button>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes ripple1 { 0%{opacity:0.6;transform:translate(-50%,-50%) scale(0.8)} 100%{opacity:0;transform:translate(-50%,-50%) scale(1.5)} }
        @keyframes ripple2 { 0%{opacity:0.4;transform:translate(-50%,-50%) scale(0.7)} 100%{opacity:0;transform:translate(-50%,-50%) scale(1.3)} }
        @keyframes ripple3 { 0%{opacity:0.2;transform:translate(-50%,-50%) scale(0.6)} 100%{opacity:0;transform:translate(-50%,-50%) scale(1.2)} }
      `}</style>
    </div>
  );
};

const FamilyScreen = ({ onNavigate }) => {
  const [search, setSearch] = useState("");
  const [filterExp, setFilterExp] = useState("all");
  const voiceText = "This is the Family dashboard. You can monitor Ramesh's health, view alerts, and browse caretakers to hire for additional support.";
  const caretakers = [
    { id: 1, name: "Sunita Patel", exp: 8, rating: 4.9, reviews: 124, langs: ["Hindi", "English", "Gujarati"], rate: 400, speciality: "Elderly Care, Dementia", available: true, initials: "SP", color: theme.primary },
    { id: 2, name: "Anita Nayak", exp: 5, rating: 4.7, reviews: 89, langs: ["Odia", "Hindi"], rate: 320, speciality: "Post-Surgery Care, Physio", available: true, initials: "AN", color: theme.secondary },
    { id: 3, name: "Ravi Kumar", exp: 12, rating: 4.8, reviews: 201, langs: ["Hindi", "English", "Telugu"], rate: 500, speciality: "Cardiac, Diabetic Care", available: false, initials: "RK", color: theme.purple },
    { id: 4, name: "Meena Sharma", exp: 3, rating: 4.5, reviews: 54, langs: ["Hindi"], rate: 280, speciality: "General Elderly Care", available: true, initials: "MS", color: theme.accent },
  ];
  const filtered = caretakers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.speciality.toLowerCase().includes(search.toLowerCase());
    const matchExp = filterExp === "all" || (filterExp === "5+" && c.exp >= 5) || (filterExp === "10+" && c.exp >= 10);
    return matchSearch && matchExp;
  });
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.secondary}, #3a9e6a)`, padding: "18px 18px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <button onClick={() => onNavigate("home")} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, padding: "8px 14px", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontFamily: "inherit" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg> Back
        </button>
        <div>
          <div style={{ fontWeight: 900, fontSize: 17, color: "#fff", textAlign: "center" }}>Family Dashboard</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, textAlign: "center" }}>Priya Desai — Family Member</div>
        </div>
        <VoiceBtn text={voiceText} size={36} style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }} />
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})` }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Avatar size={50} initials="RD" bg="rgba(255,255,255,0.3)" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>Ramesh Desai</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Age 73 · Male · Type 2 Diabetes, Hypertension</div>
              <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                <Badge color={theme.secondary} bg="rgba(255,255,255,0.2)">Stable</Badge>
                <Badge color="#fff" bg="rgba(255,255,255,0.15)">2 Alerts</Badge>
              </div>
            </div>
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { icon: <Icon.Pill size={20} color={theme.primary} />, label: "Meds Today", value: "2/4 taken", color: theme.primary, bg: theme.primaryLight },
            { icon: <Icon.Activity size={20} color={theme.warning} />, label: "Activity", value: "Low today", color: theme.warning, bg: theme.warningLight },
            { icon: <Icon.Heart size={20} color={theme.secondary} />, label: "Last Check-In", value: "9:00 AM", color: theme.secondary, bg: theme.secondaryLight },
            { icon: <Icon.Shield size={20} color={theme.danger} />, label: "Open Hazards", value: "4 found", color: theme.danger, bg: theme.dangerLight },
          ].map((s, i) => (
            <Card key={i} style={{ background: s.bg, padding: "12px 12px" }}>
              {s.icon}
              <div style={{ fontWeight: 900, fontSize: 15, color: s.color, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: theme.textMuted }}>{s.label}</div>
            </Card>
          ))}
        </div>
        <div style={{ fontWeight: 900, fontSize: 16, color: theme.text, marginTop: 4 }}>Caretaker Marketplace</div>
        <div style={{ position: "relative" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="2" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search caretakers..." style={{ width: "100%", padding: "11px 12px 11px 36px", borderRadius: 13, border: `1.5px solid ${theme.border}`, fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none", background: "#fff" }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["all", "All"], ["5+", "5+ yrs"], ["10+", "10+ yrs"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilterExp(v)} style={{ padding: "7px 14px", borderRadius: 999, border: "none", cursor: "pointer", background: filterExp === v ? theme.primary : "#fff", color: filterExp === v ? "#fff" : theme.textMuted, fontWeight: 700, fontSize: 12, fontFamily: "inherit", boxShadow: theme.shadow, transition: "all 0.18s" }}>{l}</button>
          ))}
        </div>
        {filtered.map((ct) => (
          <Card key={ct.id} style={{ padding: "14px 14px", border: `1.5px solid ${ct.color}22` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Avatar size={48} initials={ct.initials} bg={ct.color} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: theme.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ct.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                    <Icon.Star size={13} color={theme.warning} filled />
                    <span style={{ fontWeight: 800, fontSize: 13, color: theme.text }}>{ct.rating}</span>
                    <span style={{ fontSize: 11, color: theme.textMuted }}>({ct.reviews})</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ct.speciality}</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 3 }}>
                  {ct.exp} yrs exp · {ct.langs.join(", ")}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <span style={{ fontWeight: 900, fontSize: 16, color: theme.text }}>₹{ct.rate}</span>
                    <span style={{ fontSize: 11, color: theme.textMuted }}>/hour</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Badge color={ct.available ? theme.secondary : theme.textLight}>{ct.available ? "Available" : "Busy"}</Badge>
                    {ct.available && <Btn color={ct.color} size="sm">Hire</Btn>}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: "center", color: theme.textMuted, padding: "24px 0" }}>No caretakers found.</div>}
      </div>
    </div>
  );
};

const ReportsScreen = ({ onNavigate }) => {
  const maxBP = Math.max(...weeklyData.map(d => d.bp));
  const voiceText = "This is your health reports screen. Your blood pressure has been slightly elevated this week. Medication adherence for Lisinopril is 78 percent, which needs improvement.";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Reports & Analytics" onBack={() => onNavigate("home")} voiceText={voiceText} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["Daily", "Weekly", "Monthly"].map((p, i) => (
            <button key={p} style={{ flex: 1, padding: "9px 0", borderRadius: 11, border: "none", cursor: "pointer", background: i === 1 ? theme.primary : "#fff", color: i === 1 ? "#fff" : theme.textMuted, fontWeight: 700, fontSize: 13, fontFamily: "inherit", boxShadow: theme.shadow }}>{p}</button>
          ))}
        </div>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 3 }}>Blood Pressure</div>
          <div style={{ color: theme.textMuted, fontSize: 11, marginBottom: 12 }}>Systolic readings this week</div>
          <div style={{ display: "flex", gap: 5, alignItems: "flex-end", height: 90 }}>
            {weeklyData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: i === 6 ? theme.primary : theme.textLight }}>{d.bp}</div>
                <div style={{ width: "100%", background: i === 6 ? theme.primary : theme.primaryLight, borderRadius: "5px 5px 0 0", height: `${(d.bp / maxBP) * 74}px`, transition: "height 0.4s" }} />
                <div style={{ fontSize: 10, color: theme.textMuted }}>{d.day}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Medication Adherence</div>
          {[
            { name: "Metformin 500mg", adherence: 95, color: theme.secondary },
            { name: "Lisinopril 10mg", adherence: 78, color: theme.warning },
            { name: "Atorvastatin 20mg", adherence: 88, color: theme.primary },
            { name: "Aspirin 75mg", adherence: 100, color: theme.secondary },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 11 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, marginRight: 8 }}>{m.name}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: m.adherence >= 90 ? theme.secondary : theme.warning, flexShrink: 0 }}>{m.adherence}%</div>
              </div>
              <div style={{ height: 7, background: theme.border, borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${m.adherence}%`, height: "100%", background: `linear-gradient(90deg, ${m.color}, ${m.color}99)`, borderRadius: 999, transition: "width 0.5s" }} />
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Health Trend Summary</div>
          {[
            { metric: "Blood Pressure", trend: "↑ Slight increase", status: "Watch", color: theme.warning },
            { metric: "Blood Sugar", trend: "→ Stable", status: "Normal", color: theme.secondary },
            { metric: "Heart Rate", trend: "↓ Improving", status: "Good", color: theme.secondary },
            { metric: "Sleep Quality", trend: "↑ Improving", status: "Good", color: theme.secondary },
            { metric: "Activity Level", trend: "↓ Decreased", status: "Attention", color: theme.danger },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${theme.border}` : "none", gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{t.metric}</div>
              <div style={{ display: "flex", gap: 7, alignItems: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: theme.textMuted }}>{t.trend}</span>
                <Badge color={t.color}>{t.status}</Badge>
              </div>
            </div>
          ))}
        </Card>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn outline color={theme.primary} style={{ flex: 1 }}>Export PDF</Btn>
          <Btn outline color={theme.secondary} style={{ flex: 1 }}>Share Doctor</Btn>
        </div>
      </div>
    </div>
  );
};

const ProfileScreen = ({ onNavigate, lang, setLang }) => {
  const voiceText = "This is your Profile and Settings screen. You can update your health information, change notification preferences, or switch language.";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: theme.bg, overflow: "hidden" }}>
      <TopBar title="Profile & Settings" onBack={() => onNavigate("home")} voiceText={voiceText} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, textAlign: "center", padding: "24px 18px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <Avatar size={68} initials="RD" bg="rgba(255,255,255,0.3)" />
          </div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>Ramesh Desai</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 3 }}>Age: 73 · Male · Blood Type: B+</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8, flexWrap: "wrap" }}>
            <Badge color="#fff" bg="rgba(255,255,255,0.2)">Type 2 Diabetes</Badge>
            <Badge color="#fff" bg="rgba(255,255,255,0.2)">Hypertension</Badge>
          </div>
          <Btn outline color="rgba(255,255,255,0.6)" textColor="#fff" size="sm" style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon.Edit size={14} color="#fff" />Edit Profile</div>
          </Btn>
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>Health Information</div>
          {[
            { label: "Height", value: "168 cm" },
            { label: "Weight", value: "74 kg" },
            { label: "BMI", value: "26.2 (Overweight)" },
            { label: "Allergies", value: "Penicillin, Sulfa drugs" },
            { label: "Primary Doctor", value: "Dr. Priya Sharma" },
            { label: "Hospital", value: "AIIMS Bhubaneswar" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 5 ? `1px solid ${theme.border}` : "none", gap: 8 }}>
              <span style={{ color: theme.textMuted, fontSize: 13, flexShrink: 0 }}>{d.label}</span>
              <span style={{ color: theme.text, fontWeight: 600, fontSize: 13, textAlign: "right", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{d.value}</span>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>Settings</div>
          {[
            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>, label: "Reminder Notifications", value: true },
            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.secondary} strokeWidth="2" strokeLinecap="round"><path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z"/><path d="M19 10a7 7 0 0 1-14 0"/></svg>, label: "Voice Assistant", value: true },
            { icon: <Icon.MapPin size={18} color={theme.accent} />, label: "Location Sharing", value: true },
            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.purple} strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>, label: "Night Mode", value: false },
            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>, label: "Large Text Mode", value: true },
            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.danger} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, label: "Auto Emergency Call", value: false },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < 5 ? `1px solid ${theme.border}` : "none" }}>
              <span style={{ width: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</span>
              <div style={{ flex: 1, fontWeight: 600, fontSize: 13, color: theme.text, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</div>
              <div style={{ width: 42, height: 22, borderRadius: 999, background: s.value ? theme.secondary : theme.border, position: "relative", cursor: "pointer", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: 2, left: s.value ? 21 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>Language</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 12px", borderRadius: 12, border: `1.5px solid ${lang === l.code ? theme.primary : theme.border}`, background: lang === l.code ? theme.primaryLight : "#fff", cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s" }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: theme.text }}>{l.label}</span>
                  <span style={{ fontSize: 13, color: theme.textMuted, marginLeft: 8 }}>{l.nativeLabel}</span>
                </div>
                {lang === l.code && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </button>
            ))}
          </div>
        </Card>
        <Btn onClick={() => onNavigate("welcome")} outline color={theme.danger} style={{ width: "100%" }}>Sign Out</Btn>
      </div>
    </div>
  );
};

const WelcomeScreen = ({ onNavigate, lang }) => {
  const t = STRINGS[lang] || STRINGS.en;
  const voiceText = "Welcome to Saathi, your trusted companion for healthy and independent living. Tap Get Started to begin.";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", overflow: "hidden" }}>
      <div style={{ flex: 1.3, background: `linear-gradient(160deg, ${theme.primaryLight}, #fff)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "36px 24px 16px" }}>
        <div style={{ width: 100, height: 100, borderRadius: 28, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, boxShadow: "0 12px 32px rgba(74,144,217,0.3)" }}>
          <svg width="52" height="52" viewBox="0 0 58 58" fill="none">
            <path d="M29 14c-4 0-8 3-8 8s4 8 8 8 8-3 8-8-4-8-8-8z" fill="white"/>
            <path d="M16 44c0-7 6-12 13-12s13 5 13 12" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M22 30l4 4 8-8" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, color: theme.text, textAlign: "center", lineHeight: 1.2 }}>
          {t.welcomeTitle.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
        </div>
        <p style={{ color: theme.textMuted, textAlign: "center", marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>{t.welcomeSub}</p>
      </div>
      <div style={{ flex: 1, padding: "22px 26px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { icon: <Icon.Pill size={18} color={theme.primary} />, text: "Medication scanning & smart reminders", bg: theme.primaryLight },
          { icon: <Icon.Shield size={18} color={theme.secondary} />, text: "Home hazard detection & safety reports", bg: theme.secondaryLight },
          { icon: <Icon.Heart size={18} color={theme.danger} />, text: "Daily health check-ins & wellness insights", bg: theme.dangerLight },
          { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, text: "One-tap emergency assistance", bg: theme.accentLight },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{f.icon}</div>
            <span style={{ color: theme.text, fontSize: 13, fontWeight: 500 }}>{f.text}</span>
          </div>
        ))}
        <Btn onClick={() => onNavigate("login")} style={{ marginTop: 6, width: "100%" }} size="lg">{t.getStarted} →</Btn>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <button onClick={() => onNavigate("login")} style={{ background: "none", border: "none", color: theme.textMuted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            {t.alreadyHaveAccount} <span style={{ color: theme.primary, fontWeight: 700 }}>{t.signIn}</span>
          </button>
          <VoiceBtn text={voiceText} size={34} />
        </div>
      </div>
    </div>
  );
};

const SCREENS = {
  splash: SplashScreen,
  language: LanguageScreen,
  profileselect: ProfileSelectScreen,
  welcome: WelcomeScreen,
  login: LoginScreen,
  home: HomeScreen,
  scanner: ScannerScreen,
  homesafetyscanner: HomeSafetyScanner,
  result: ResultScreen,
  reminders: RemindersScreen,
  checkin: CheckInScreen,
  wellness: WellnessScreen,
  deviation: DeviationScreen,
  hazard: HazardScreen,
  safetyreport: SafetyReportScreen,
  bloodpressure: BloodPressureScreen,
  emergency: EmergencyScreen,
  voice: VoiceScreen,
  family: FamilyScreen,
  reports: ReportsScreen,
  profile: ProfileScreen,
};

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [history, setHistory] = useState([]);
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("saathi_lang") || "en"; } catch { return "en"; }
  });
  const [userType, setUserType] = useState(() => {
    try { return localStorage.getItem("saathi_user_type") || "senior"; } catch { return "senior"; }
  });

  const navigate = (next) => { setHistory(h => [...h, screen]); setScreen(next); };
  const goBack = () => { const prev = history[history.length - 1] || "home"; setHistory(h => h.slice(0, -1)); setScreen(prev); };

  const handleSplashNext = () => navigate("language");
  const handleLangSelect = (code) => {
    setLang(code);
    try { localStorage.setItem("saathi_lang", code); } catch {}
    navigate("profileselect");
  };
  const handleProfileSelect = (type) => {
    setUserType(type);
    try { localStorage.setItem("saathi_user_type", type); } catch {}
    navigate(type === "family" ? "family" : "welcome");
  };

  const Screen = SCREENS[screen] || HomeScreen;
  const screenProps = { onNavigate: navigate, onBack: goBack, lang, setLang, userType };
  const specialProps = screen === "splash" ? { ...screenProps, onNext: handleSplashNext }
    : screen === "language" ? { onSelect: handleLangSelect }
    : screen === "profileselect" ? { ...screenProps, onSelect: handleProfileSelect }
    : screenProps;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#E8EDF5", padding: "16px 8px", fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 3, marginRight: 12, maxWidth: 140, width: "100%" }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5, padding: "0 8px" }}>Screens</div>
        {Object.keys(SCREENS).map(s => (
          <button key={s} onClick={() => navigate(s)} style={{ padding: "6px 10px", borderRadius: 7, border: "none", cursor: "pointer", textAlign: "left", background: screen === s ? theme.primary : "rgba(255,255,255,0.6)", color: screen === s ? "#fff" : theme.textMuted, fontWeight: screen === s ? 700 : 500, fontSize: 11, fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s}</button>
        ))}
      </div>
      <div style={{ width: 390, height: 780, borderRadius: 44, background: "#1A1A2E", padding: "10px 8px", boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 0 2px #333", flexShrink: 0, position: "relative" }}>
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 110, height: 24, background: "#1A1A2E", borderRadius: "0 0 16px 16px", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 60, height: 8, borderRadius: 4, background: "#222" }} />
        </div>
        <div style={{ width: "100%", height: "100%", borderRadius: 36, overflow: "hidden", background: theme.bg, position: "relative" }}>
          <Screen {...specialProps} />
        </div>
      </div>
    </div>
  );
}
