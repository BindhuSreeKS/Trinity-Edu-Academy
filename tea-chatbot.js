/**
 * ═══════════════════════════════════════════════════════════════
 *  TRINITY EDU ACADEMY — FLOATING AI CHATBOT  (tea-chatbot.js)
 *  ✅ Zero modifications to existing HTML / CSS / JS
 *  ✅ All styles scoped with  tea-chatbot-*  prefix
 *  ✅ Injected purely via JavaScript (IIFE)
 * ═══════════════════════════════════════════════════════════════
 */
(function () {
  "use strict";

  /* ─── 1. INJECT STYLES ─────────────────────────────────────── */
  const style = document.createElement("style");
  style.id = "tea-chatbot-styles";
  style.textContent = `

    /* ── KEYFRAMES ── */
    @keyframes tea-pulse-ring {
      0%   { transform: scale(1);    opacity: 0.7; }
      70%  { transform: scale(1.55); opacity: 0;   }
      100% { transform: scale(1.55); opacity: 0;   }
    }
    @keyframes tea-bounce-in {
      0%   { transform: scale(0.5) translateY(30px); opacity: 0; }
      60%  { transform: scale(1.07) translateY(-6px); opacity: 1; }
      100% { transform: scale(1) translateY(0);       opacity: 1; }
    }
    @keyframes tea-slide-up {
      from { transform: translateY(24px) scale(0.96); opacity: 0; }
      to   { transform: translateY(0)    scale(1);    opacity: 1; }
    }
    @keyframes tea-slide-down {
      from { transform: translateY(0)    scale(1);    opacity: 1; }
      to   { transform: translateY(24px) scale(0.96); opacity: 0; }
    }
    @keyframes tea-fade-in {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0);   }
    }
    @keyframes tea-typing-dot {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40%            { transform: scale(1);   opacity: 1;   }
    }
    @keyframes tea-glow-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,180,216,0.5), 0 8px 32px rgba(26,58,143,0.45); }
      50%       { box-shadow: 0 0 0 10px rgba(0,180,216,0), 0 8px 32px rgba(26,58,143,0.45); }
    }
    @keyframes tea-header-shimmer {
      0%   { background-position: 0%   50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0%   50%; }
    }

    /* ── LAUNCHER BUTTON ── */
    #tea-chatbot-launcher {
  position: fixed;
  bottom: 130px;
  right: 20px;
  z-index: 3000;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a3a8f 0%, #00b4d8 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 24px rgba(0,180,216,0.5);
  transition: transform 0.3s;
}
    #tea-chatbot-launcher:hover {
      transform: scale(1.1) rotate(-4deg);
      box-shadow: 0 12px 40px rgba(0,180,216,0.55);
    }
    #tea-chatbot-launcher:active { transform: scale(0.95); }

    /* pulse ring */
   #tea-chatbot-launcher::before {
  display: none;
}
    #tea-chatbot-launcher svg { transition: transform 0.3s ease; }
    #tea-chatbot-launcher.tea-open .tea-icon-chat  { display: none !important; }
    #tea-chatbot-launcher.tea-open .tea-icon-close { display: block !important; }

    /* notification dot */
    #tea-chatbot-notif {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 15px;
      height: 15px;
      background: #ff6b9d;
      border-radius: 50%;
      border: 2px solid #fff;
      animation: tea-pulse-ring 1.8s ease-out infinite;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      font-weight: 900;
      color: #fff;
      pointer-events: none;
    }

    /* ── CHAT WINDOW ── */
    #tea-chatbot-window {
      position: fixed;
      bottom: 160px;
      right: 20px;
      z-index: 2147483639;
      width: 370px;
      max-height: 580px;
      min-height: 420px;
      border-radius: 20px;
      background: rgba(10, 18, 42, 0.88);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid rgba(0,180,216,0.22);
      box-shadow:
        0 32px 80px rgba(13,27,62,0.7),
        0 0 0 1px rgba(255,255,255,0.04),
        inset 0 1px 0 rgba(255,255,255,0.06);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform-origin: bottom right;
      animation: tea-slide-up 0.35s cubic-bezier(.22,1,.36,1) both;
      font-family: "DM Sans", "Segoe UI", Arial, sans-serif;
      user-select: none;
    }
    #tea-chatbot-window.tea-closing {
      animation: tea-slide-down 0.28s cubic-bezier(.22,1,.36,1) both;
    }
    #tea-chatbot-window.tea-minimized #tea-chatbot-messages,
    #tea-chatbot-window.tea-minimized #tea-chatbot-typing,
    #tea-chatbot-window.tea-minimized #tea-chatbot-quick-actions,
    #tea-chatbot-window.tea-minimized #tea-chatbot-input-area,
    #tea-chatbot-window.tea-minimized .tea-chatbot-powered {
      display: none !important;
    }
    #tea-chatbot-window.tea-minimized {
      min-height: 0;
      max-height: 64px;
    }

    /* ── HEADER ── */
    #tea-chatbot-header {
      background: linear-gradient(135deg, #0d1b3e 0%, #1a3a8f 50%, #005f8a 100%);
      background-size: 200% 200%;
      animation: tea-header-shimmer 6s ease infinite;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: grab;
      border-radius: 20px 20px 0 0;
      flex-shrink: 0;
      position: relative;
    }
    #tea-chatbot-header:active { cursor: grabbing; }

    .tea-chatbot-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00b4d8, #1a3a8f);
      border: 2px solid rgba(0,180,216,0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 1.3rem;
      box-shadow: 0 0 14px rgba(0,180,216,0.4);
    }
    .tea-chatbot-header-info { flex: 1; min-width: 0; }
    .tea-chatbot-header-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tea-chatbot-header-status {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.71rem;
      color: rgba(255,255,255,0.65);
      margin-top: 2px;
    }
    .tea-chatbot-status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2ecc71;
      box-shadow: 0 0 6px #2ecc71;
      flex-shrink: 0;
    }
    .tea-chatbot-header-actions {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .tea-chatbot-hbtn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.8);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, transform 0.2s;
      font-size: 0.75rem;
      outline: none;
      flex-shrink: 0;
    }
    .tea-chatbot-hbtn:hover {
      background: rgba(0,180,216,0.35);
      color: #fff;
      transform: scale(1.12);
    }

    /* ── MESSAGES AREA ── */
    #tea-chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 14px 14px 8px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: rgba(0,180,216,0.3) transparent;
    }
    #tea-chatbot-messages::-webkit-scrollbar { width: 4px; }
    #tea-chatbot-messages::-webkit-scrollbar-track { background: transparent; }
    #tea-chatbot-messages::-webkit-scrollbar-thumb {
      background: rgba(0,180,216,0.3);
      border-radius: 4px;
    }

    /* ── MESSAGE BUBBLES ── */
    .tea-msg {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      animation: tea-fade-in 0.3s ease both;
      max-width: 100%;
    }
    .tea-msg-bot  { flex-direction: row; }
    .tea-msg-user { flex-direction: row-reverse; }

    .tea-msg-avatar-sm {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00b4d8, #1a3a8f);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      flex-shrink: 0;
      border: 1.5px solid rgba(0,180,216,0.4);
    }
    .tea-msg-content { max-width: 78%; }
    .tea-msg-bubble {
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 0.835rem;
      line-height: 1.55;
      word-break: break-word;
    }
    .tea-msg-bot .tea-msg-bubble {
      background: rgba(26,58,143,0.38);
      border: 1px solid rgba(0,180,216,0.2);
      color: rgba(255,255,255,0.92);
      border-bottom-left-radius: 4px;
    }
    .tea-msg-user .tea-msg-bubble {
      background: linear-gradient(135deg, #1a3a8f, #00b4d8);
      color: #fff;
      border-bottom-right-radius: 4px;
      box-shadow: 0 4px 14px rgba(0,180,216,0.25);
    }
    .tea-msg-time {
      font-size: 0.65rem;
      color: rgba(255,255,255,0.32);
      margin-top: 3px;
      padding: 0 2px;
    }
    .tea-msg-bot  .tea-msg-time { text-align: left; }
    .tea-msg-user .tea-msg-time { text-align: right; }
    .tea-msg-bubble a { color: #00b4d8; text-decoration: underline; }

    /* ── TYPING INDICATOR ── */
    #tea-chatbot-typing {
      display: none;
      align-items: flex-end;
      gap: 8px;
      padding: 0 14px 4px;
      animation: tea-fade-in 0.3s ease both;
    }
    #tea-chatbot-typing.tea-visible { display: flex; }
    .tea-typing-bubble {
      background: rgba(26,58,143,0.38);
      border: 1px solid rgba(0,180,216,0.2);
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      padding: 10px 16px;
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .tea-typing-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #00b4d8;
      animation: tea-typing-dot 1.2s ease infinite;
    }
    .tea-typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .tea-typing-dot:nth-child(3) { animation-delay: 0.4s; }

    /* ── QUICK ACTIONS ── */
    #tea-chatbot-quick-actions {
      padding: 6px 14px 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      flex-shrink: 0;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .tea-qa-btn {
      background: rgba(26,58,143,0.3);
      border: 1px solid rgba(0,180,216,0.28);
      color: rgba(255,255,255,0.82);
      font-family: inherit;
      font-size: 0.72rem;
      font-weight: 500;
      padding: 5px 11px;
      border-radius: 50px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
      white-space: nowrap;
      outline: none;
    }
    .tea-qa-btn:hover {
      background: rgba(0,180,216,0.28);
      border-color: #00b4d8;
      color: #fff;
      transform: translateY(-1px);
    }
    .tea-qa-btn:active { transform: scale(0.96); }

    /* ── INPUT AREA ── */
    #tea-chatbot-input-area {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px 14px;
      border-top: 1px solid rgba(255,255,255,0.06);
      flex-shrink: 0;
    }
    #tea-chatbot-input {
      flex: 1;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(0,180,216,0.22);
      border-radius: 50px;
      padding: 9px 16px;
      color: #fff;
      font-family: inherit;
      font-size: 0.82rem;
      outline: none;
      transition: border-color 0.2s, background 0.2s;
      caret-color: #00b4d8;
    }
    #tea-chatbot-input::placeholder { color: rgba(255,255,255,0.35); }
    #tea-chatbot-input:focus {
      border-color: rgba(0,180,216,0.6);
      background: rgba(255,255,255,0.1);
    }
    #tea-chatbot-send {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a3a8f, #00b4d8);
      border: none;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
      flex-shrink: 0;
      outline: none;
      box-shadow: 0 4px 14px rgba(0,180,216,0.3);
    }
    #tea-chatbot-send:hover {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 6px 20px rgba(0,180,216,0.5);
    }
    #tea-chatbot-send:active { transform: scale(0.93); }
    #tea-chatbot-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    /* ── POWERED BY ── */
    .tea-chatbot-powered {
      text-align: center;
      font-size: 0.62rem;
      color: rgba(255,255,255,0.22);
      padding: 0 12px 10px;
      letter-spacing: 0.5px;
    }

    /* ── DATE LINE ── */
    .tea-dateline {
      text-align: center;
      font-size: 0.65rem;
      color: rgba(255,255,255,0.3);
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
    }
    .tea-dateline::before,
    .tea-dateline::after {
      content: "";
      flex: 1;
      height: 1px;
      background: rgba(255,255,255,0.08);
    }

    /* ── MOBILE ── */
    @media (max-width: 480px) {
      #tea-chatbot-window {
        width: calc(100vw - 20px);
        right: 15px;
        bottom: 80px;
        max-height: calc(100svh - 108px);
        border-radius: 16px;
      }
     #tea-chatbot-launcher {
  position: fixed;
  bottom: 80px;
  right: 15px;
  z-index: 2147483640;
  width: 62px;
  height: 62px;
}
    }
  `;
  document.head.appendChild(style);

  /* ─── 2. BUILD DOM ──────────────────────────────────────────── */

  // ── Launcher
  const launcher = document.createElement("button");
  launcher.id = "tea-chatbot-launcher";
  launcher.setAttribute(
    "aria-label",
    "Open Trinity Edu Academy chat assistant",
  );
  launcher.setAttribute("title", "Chat with Trinity Edu Academy AI!");
  launcher.innerHTML = `
    <svg class="tea-icon-chat" xmlns="http://www.w3.org/2000/svg" width="26" height="26"
         viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <svg class="tea-icon-close" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
         viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"
         stroke-linecap="round" style="display:none" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
    <span id="tea-chatbot-notif" aria-hidden="true" title="New message">1</span>
  `;
  document.body.appendChild(launcher);

  // ── Chat Window
  const win = document.createElement("div");
  win.id = "tea-chatbot-window";
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-modal", "false");
  win.setAttribute("aria-label", "Trinity Edu Academy Chat Assistant");
  win.style.display = "none";
  win.innerHTML = `
    <div id="tea-chatbot-header">
      <div class="tea-chatbot-avatar" aria-hidden="true">🎓</div>
      <div class="tea-chatbot-header-info">
        <div class="tea-chatbot-header-name">Trinity Edu Academy AI</div>
        <div class="tea-chatbot-header-status">
          <span class="tea-chatbot-status-dot" aria-hidden="true"></span>
          Online &bull; Ready to help
        </div>
      </div>
      <div class="tea-chatbot-header-actions">
        <button class="tea-chatbot-hbtn" id="tea-chatbot-minimize-btn"
                title="Minimize" aria-label="Minimize chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
        <button class="tea-chatbot-hbtn" id="tea-chatbot-close-btn"
                title="Close" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <div id="tea-chatbot-messages" role="log" aria-live="polite"
         aria-label="Chat messages"></div>

    <div id="tea-chatbot-typing" role="status" aria-label="Bot is typing">
      <div class="tea-msg-avatar-sm" aria-hidden="true">🎓</div>
      <div class="tea-typing-bubble">
        <div class="tea-typing-dot"></div>
        <div class="tea-typing-dot"></div>
        <div class="tea-typing-dot"></div>
      </div>
    </div>

    <div id="tea-chatbot-quick-actions" aria-label="Quick action suggestions">
      <button class="tea-qa-btn" data-query="Admission Details">📋 Admissions</button>
      <button class="tea-qa-btn" data-query="Available Courses">📚 Courses</button>
      <button class="tea-qa-btn" data-query="Fee Structure">💰 Fees</button>
      <button class="tea-qa-btn" data-query="Contact Us">📞 Contact</button>
      <button class="tea-qa-btn" data-query="Location">📍 Location</button>
      <button class="tea-qa-btn" data-query="Registration Process">✍️ Register</button>
    </div>

    <div id="tea-chatbot-input-area">
      <input id="tea-chatbot-input" type="text" maxlength="300"
             placeholder="Ask me anything…" autocomplete="off"
             aria-label="Type your message" />
      <button id="tea-chatbot-send" title="Send message" aria-label="Send message">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>

    <div class="tea-chatbot-powered">Powered by Trinity Edu Academy AI ✦</div>
  `;
  document.body.appendChild(win);

  /* ─── 3. ELEMENT REFS ───────────────────────────────────────── */
  const msgBox = document.getElementById("tea-chatbot-messages");
  const inputEl = document.getElementById("tea-chatbot-input");
  const sendBtn = document.getElementById("tea-chatbot-send");
  const typingEl = document.getElementById("tea-chatbot-typing");
  const minBtn = document.getElementById("tea-chatbot-minimize-btn");
  const closeBtn = document.getElementById("tea-chatbot-close-btn");
  const notifBadge = document.getElementById("tea-chatbot-notif");
  const qaButtons = document.querySelectorAll(".tea-qa-btn");

  /* ─── 4. KNOWLEDGE BASE ─────────────────────────────────────── */
  const KB = [
    {
      keys: [
        "admission",
        "admit",
        "enroll",
        "join",
        "apply",
        "application",
        "how to get in",
      ],
      answer: `🎓 <b>Admissions at Trinity Edu Academy</b><br><br>
We welcome students from all boards and backgrounds!<br><br>
<b>Eligibility:</b><br>
• Class 6–12 students for school coaching<br>
• Graduates / aspirants for competitive exams<br><br>
<b>How to Apply:</b><br>
1️⃣ Fill the online registration form<br>
2️⃣ Attend a free demo class<br>
3️⃣ Submit required documents<br>
4️⃣ Complete fee payment<br><br>
📌 Registrations are currently <b>OPEN</b> for 2025–26! Seats are limited.`,
    },
    {
      keys: ["register", "registration", "sign up", "signup", "enrolment form"],
      answer: `✍️ <b>Registration Process</b><br><br>
Registering at Trinity Edu Academy is quick and simple!<br><br>
1️⃣ Visit our admission desk or fill the online form<br>
2️⃣ Provide your name, class, school & contact details<br>
3️⃣ Choose your preferred batch timing<br>
4️⃣ Pay registration fee (₹500 — adjustable vs. tuition)<br>
5️⃣ Receive welcome kit & schedule<br><br>
📞 Need help? Call: <b>+91 7972416313</b>`,
    },
    {
      keys: [
        "course",
        "subject",
        "programme",
        "program",
        "syllabus",
        "cbse",
        "icse",
        "ssc",
        "jee",
        "neet",
        "scholarship",
        "available",
      ],
      answer: `📚 <b>Courses Offered</b><br><br>
<b>School Coaching (Classes 6–12):</b><br>
• Mathematics, Science, English, Hindi<br>
• CBSE / ICSE / SSC boards<br>
• Exam-focused revision & practice<br><br>
<b>Competitive Exams:</b><br>
• JEE Mains & Advanced<br>
• NEET (Medical Entrance)<br>
• MHT-CET / State CET<br>
• NMMS, NTSE Scholarship Exams<br><br>
<b>Special Programs:</b><br>
• Doubt-clearing sessions<br>
• Weekly tests & detailed analysis<br>
• Crash courses & summer batches`,
    },
    {
      keys: [
        "fee",
        "fees",
        "cost",
        "charge",
        "price",
        "pricing",
        "affordable",
        "discount",
        "payment",
        "structure",
      ],
      answer: `💰 <b>Fee Structure</b><br><br>
Trinity Edu Academy offers competitive and affordable fees!<br><br>
• Monthly tuition varies by class & subject combination<br>
• Sibling discount & early-registration discount available<br>
• Scholarship for meritorious students<br>
• No hidden charges<br><br>
<b>Payment Options:</b><br>
• Monthly / Quarterly / Annual plans<br>
• Online & offline payment accepted<br><br>
📞 For exact fees: <b>+91 7972416313</b>`,
    },
    {
      keys: [
        "contact",
        "reach",
        "call",
        "phone",
        "number",
        "mobile",
        "email",
        "whatsapp",
      ],
      answer: `📞 <b>Contact Us</b><br><br>
📱 <b>Phone / WhatsApp:</b> +91 7972416313<br>
✉️ <b>Email:</b> trinityeduacademy@gmail.com<br><br>
🕐 <b>Office Hours:</b><br>
Mon – Sat: 8:00 AM – 8:00 PM<br>
Sunday: 9:00 AM – 2:00 PM<br><br>
Feel free to reach out for admissions, enquiries, or support!`,
    },
    {
      keys: [
        "location",
        "address",
        "where",
        "directions",
        "find",
        "near",
        "area",
        "map",
      ],
      answer: `📍 <b>Our Location</b><br><br>
<b>Trinity Edu Academy</b><br>
#3469, 1st Floor, 2nd Cross, 80 Feet Road, 4th Phase, Hosakerehalli Cross, Banashankari 3rd Stage, Bengaluru 560085<br><br>
🗺️ Conveniently located with easy access by public transport.<br><br>
📞 Call <b>+91 76760 59211
+91 91876 72797
+91 84315 29782</b> for exact directions & landmark map.<br><br>
We also offer <b>online classes</b> for outstation students!`,
    },
    {
      keys: [
        "timing",
        "time",
        "schedule",
        "batch",
        "hours",
        "when",
        "morning",
        "evening",
        "slot",
        "weekend",
      ],
      answer: `🕐 <b>Batch Timings</b><br><br>
<b>Available Batches:</b><br>
• Morning: 7:00 AM – 9:00 AM<br>
• Afternoon: 1:00 PM – 3:00 PM<br>
• Evening: 5:00 PM – 8:00 PM<br>
• Weekend Special: Sat & Sun<br><br>
<b>Online Classes:</b><br>
• Flexible timings<br>
• Recorded sessions for revision<br><br>
📌 Contact us to reserve your preferred slot!`,
    },
    {
      keys: [
        "support",
        "help",
        "doubt",
        "problem",
        "issue",
        "mentor",
        "teacher",
        "guidance",
        "counseling",
      ],
      answer: `🤝 <b>Student Support</b><br><br>
We go beyond teaching — we mentor!<br><br>
• One-on-one doubt sessions (weekdays)<br>
• Parent-teacher meetings (monthly)<br>
• Progress report cards<br>
• Motivational sessions & career guidance<br>
• Dedicated WhatsApp support groups<br>
• Online resources & study material<br><br>
Our faculty is available 6 days a week. Your success is our mission! 🌟`,
    },
    {
      keys: [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good evening",
        "namaste",
        "greet",
        "howdy",
      ],
      answer: `👋 Hello! Welcome to <b>Trinity Edu Academy</b>!<br><br>
I'm your AI assistant — here to help with:<br>
• 📋 Admissions & Registration<br>
• 📚 Courses & Programs<br>
• 💰 Fee Structure<br>
• 📞 Contact & Timings<br>
• 🤝 Student Support<br><br>
How can I assist you today? 😊`,
    },
    {
      keys: [
        "thank",
        "thanks",
        "thank you",
        "great",
        "awesome",
        "helpful",
        "perfect",
        "nice",
      ],
      answer: `😊 You're most welcome! It's our pleasure to help.<br><br>
If you have any more questions about Trinity Edu Academy, feel free to ask anytime!<br><br>
🎓 <b>We look forward to welcoming you at our academy!</b>`,
    },
  ];

  function getBotReply(text) {
    const lower = text.toLowerCase().trim();
    for (const entry of KB) {
      if (entry.keys.some((k) => lower.includes(k))) return entry.answer;
    }
    return `🤔 I'm not sure about that specific query yet, but our team can help directly!<br><br>
📞 <b>Call / WhatsApp:</b> +91 7972416313<br>
✉️ <b>Email:</b> trinityeduacademy@gmail.com<br><br>
Or tap one of the quick action buttons below 👇`;
  }

  /* ─── 5. HELPERS ────────────────────────────────────────────── */
  const fmtTime = (d) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const fmtDate = (d) =>
    d.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  function escapeHtml(t) {
    return t
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function appendDateLine() {
    const dl = document.createElement("div");
    dl.className = "tea-dateline";
    dl.textContent = fmtDate(new Date());
    msgBox.appendChild(dl);
  }

  function appendMessage(html, sender) {
    const now = new Date();
    const isBot = sender === "bot";
    const row = document.createElement("div");
    row.className = `tea-msg tea-msg-${sender}`;

    if (isBot) {
      row.innerHTML = `
        <div class="tea-msg-avatar-sm" aria-hidden="true">🎓</div>
        <div class="tea-msg-content">
          <div class="tea-msg-bubble">${html}</div>
          <div class="tea-msg-time">${fmtTime(now)}</div>
        </div>`;
    } else {
      row.innerHTML = `
        <div class="tea-msg-content">
          <div class="tea-msg-bubble">${html}</div>
          <div class="tea-msg-time">${fmtTime(now)}</div>
        </div>
        <div class="tea-msg-avatar-sm"
             style="background:linear-gradient(135deg,#ff6b9d,#9b59b6)"
             aria-hidden="true">👤</div>`;
    }

    msgBox.appendChild(row);
    scrollToBottom();
  }

  function scrollToBottom() {
    msgBox.scrollTo({ top: msgBox.scrollHeight, behavior: "smooth" });
  }

  function showTyping() {
    msgBox.after(typingEl); // keep below messages, above quick actions
    typingEl.classList.add("tea-visible");
    scrollToBottom();
  }
  function hideTyping() {
    typingEl.classList.remove("tea-visible");
  }

  let isBusy = false;

  function sendBotReply(userText) {
    if (isBusy) return;
    isBusy = true;
    sendBtn.disabled = true;
    const reply = getBotReply(userText);
    const delay = 850 + Math.min(reply.length * 0.65, 1600);
    showTyping();
    setTimeout(() => {
      hideTyping();
      appendMessage(reply, "bot");
      isBusy = false;
      sendBtn.disabled = false;
    }, delay);
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text || isBusy) return;
    inputEl.value = "";
    appendMessage(escapeHtml(text), "user");
    sendBotReply(text);
  }

  /* ─── 6. OPEN / CLOSE / MINIMIZE ───────────────────────────── */
  let isOpen = false;
  let isMinimized = false;

  function openChat() {
    isOpen = true;
    win.style.display = "flex";
    win.classList.remove("tea-closing");
    launcher.classList.add("tea-open");
    if (notifBadge) notifBadge.style.display = "none";
    setTimeout(() => inputEl.focus(), 350);
    scrollToBottom();
  }

  function closeChat() {
    win.classList.add("tea-closing");
    launcher.classList.remove("tea-open");
    setTimeout(() => {
      win.style.display = "none";
      win.classList.remove("tea-closing", "tea-minimized");
      isOpen = false;
      isMinimized = false;
    }, 290);
  }

  function toggleMinimize() {
    isMinimized = !isMinimized;
    win.classList.toggle("tea-minimized", isMinimized);
  }

  launcher.addEventListener("click", () => {
    if (isOpen && !isMinimized) {
      closeChat();
    } else {
      openChat();
      win.classList.remove("tea-minimized");
      isMinimized = false;
    }
  });
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeChat();
  });
  minBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMinimize();
  });

  /* ─── 7. INPUT EVENTS ───────────────────────────────────────── */
  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
  qaButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const q = btn.getAttribute("data-query");
      if (!q || isBusy) return;
      appendMessage(escapeHtml(q), "user");
      sendBotReply(q);
    });
  });

  /* ─── 8. DRAGGABLE WINDOW ───────────────────────────────────── */
  (function makeDraggable() {
    const header = document.getElementById("tea-chatbot-header");
    let drag = false,
      sx,
      sy,
      sr,
      sb;

    const getEdges = () => {
      const r = win.getBoundingClientRect();
      return {
        right: window.innerWidth - r.right,
        bottom: window.innerHeight - r.bottom,
      };
    };

    const px = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
    const py = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

    header.addEventListener("mousedown", (e) => {
      if (e.target.closest(".tea-chatbot-hbtn")) return;
      drag = true;
      sx = px(e);
      sy = py(e);
      const pos = getEdges();
      sr = pos.right;
      sb = pos.bottom;
      win.style.transition = "none";
      document.body.style.userSelect = "none";
    });
    header.addEventListener(
      "touchstart",
      (e) => {
        if (e.target.closest(".tea-chatbot-hbtn")) return;
        drag = true;
        sx = px(e);
        sy = py(e);
        const pos = getEdges();
        sr = pos.right;
        sb = pos.bottom;
        win.style.transition = "none";
      },
      { passive: true },
    );

    const onMove = (e) => {
      if (!drag) return;
      const dx = px(e) - sx,
        dy = py(e) - sy;
      const rect = win.getBoundingClientRect();
      const nr = Math.max(
        8,
        Math.min(sr - dx, window.innerWidth - rect.width - 8),
      );
      const nb = Math.max(
        8,
        Math.min(sb - dy, window.innerHeight - rect.height - 8),
      );
      win.style.right = nr + "px";
      win.style.bottom = nb + "px";
    };
    const onUp = () => {
      if (!drag) return;
      drag = false;
      win.style.transition = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
  })();

  /* ─── 9. INITIAL GREETING ───────────────────────────────────── */
  appendDateLine();
  setTimeout(() => {
    appendMessage(
      "Hello 👋 Welcome to <b>Trinity Edu Academy</b>!<br>" +
        "I'm your AI assistant. How can I help you today?<br><br>" +
        "Use the quick buttons below or type your question! 😊",
      "bot",
    );
  }, 350);
})(); // END IIFE
