/**
 * app.js — Substitution Desk Application Logic
 */

// ─── Password Gate ────────────────────────────────────
const PORTAL_PASSWORD = "1974";

function checkPassword() {
  const input = document.getElementById("gateInput");
  const error = document.getElementById("gateError");
  const gate  = document.getElementById("passwordGate");

  if (input.value === PORTAL_PASSWORD) {
    gate.classList.add("gate-unlocked");
    // Remove from DOM after fade-out so it can't be inspected easily
    setTimeout(() => gate.remove(), 500);
  } else {
    error.classList.remove("hidden");
    input.value = "";
    input.classList.add("gate-input-shake");
    setTimeout(() => input.classList.remove("gate-input-shake"), 500);
    input.focus();
  }
}

function toggleGateEye() {
  const input = document.getElementById("gateInput");
  const icon  = document.getElementById("eyeIcon");
  if (input.type === "password") {
    input.type = "text";
    icon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`;
  } else {
    input.type = "password";
    icon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
  }
}

// Auto-focus the password field on load
document.addEventListener("DOMContentLoaded", () => {
  const gateInput = document.getElementById("gateInput");
  if (gateInput) gateInput.focus();
});

// ─── State ────────────────────────────────────────────
let selectedTeacher = null;
let pendingAssignment = null;
const assignmentLog = [];

// ─── Day label map ────────────────────────────────────
const DAY_LABELS = {
  Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday",
  Thu: "Thursday", Fri: "Friday"
};

// ─── Init ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderTeacherGrid();
  document.getElementById("daySelect").addEventListener("change", () => {
    document.getElementById("periodSelect").value = "";
    updatePeriodOptions();
  });
});

// ─── Render teacher selection grid ────────────────────
function renderTeacherGrid() {
  const grid = document.getElementById("teacherGrid");
  grid.innerHTML = "";
  TEACHERS.forEach((t, idx) => {
    const chip = document.createElement("div");
    chip.className = "teacher-chip";
    chip.id = `teacher-chip-${idx}`;
    chip.innerHTML = `
      <span class="teacher-name">${t.name}</span>
      <span class="teacher-subject">${t.subject}</span>
    `;
    chip.onclick = () => selectTeacher(idx);
    grid.appendChild(chip);
  });
}

// ─── Select teacher ───────────────────────────────────
function selectTeacher(idx) {
  // Clear previous
  document.querySelectorAll(".teacher-chip").forEach(c => c.classList.remove("active"));
  document.getElementById(`teacher-chip-${idx}`).classList.add("active");
  selectedTeacher = idx;

  // Reveal "View Timetable" bar for the absent teacher
  const t = TEACHERS[idx];
  document.getElementById("absentTTHint").innerHTML =
    `<strong style="color:var(--text-primary)">${t.name}</strong>&nbsp;<span style="color:var(--text-dim)">·</span>&nbsp;${t.subject}`;
  document.getElementById("absentTTBar").classList.remove("hidden");

  // Show step 2
  const step2 = document.getElementById("step2");
  step2.classList.remove("hidden");
  step2.scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Hide results
  document.getElementById("resultsSection").classList.add("hidden");
  document.getElementById("absentInfo").innerHTML = "";

  // Reset selects and reset period options to full list
  document.getElementById("daySelect").value = "";
  resetPeriodOptions();
}

// ─── Reset period dropdown to default (all 8 periods) ─
function resetPeriodOptions() {
  const sel = document.getElementById("periodSelect");
  sel.innerHTML = `<option value="">Choose period…</option>`;
  for (let p = 1; p <= 8; p++) {
    sel.innerHTML += `<option value="${p}">Period ${p}</option>`;
  }
}

// ─── Update period dropdown based on teacher + day ────
function updatePeriodOptions() {
  const sel = document.getElementById("periodSelect");
  const day = document.getElementById("daySelect").value;

  if (!day || selectedTeacher === null) {
    resetPeriodOptions();
    return;
  }

  const schedule = TEACHERS[selectedTeacher].schedule[day] || [];
  sel.innerHTML = `<option value="">Choose period…</option>`;

  let hasAny = false;
  schedule.forEach((slot, idx) => {
    if (slot) {  // only periods with an actual class
      hasAny = true;
      sel.innerHTML += `<option value="${idx + 1}">Period ${idx + 1} — ${slot.class} (${slot.subject})</option>`;
    }
  });

  if (!hasAny) {
    sel.innerHTML = `<option value="">No classes on this day</option>`;
  }
}

// ─── View absent teacher's full timetable ─────────────
function viewAbsentTimetable() {
  if (selectedTeacher === null) return;
  viewTimetable(selectedTeacher, null, null);
}

// ─── Find substitutes ─────────────────────────────────
function findSubstitutes() {
  if (selectedTeacher === null) {
    alert("Please select an absent teacher first.");
    return;
  }
  const day = document.getElementById("daySelect").value;
  const period = document.getElementById("periodSelect").value;
  if (!day || !period) {
    alert("Please select both day and period.");
    return;
  }

  const absentT = TEACHERS[selectedTeacher];
  const periodIdx = parseInt(period) - 1;
  const absentSlot = absentT.schedule[day]?.[periodIdx];

  // Show absent teacher info
  const absentInfo = document.getElementById("absentInfo");
  const classText = absentSlot
    ? `<strong>${absentSlot.class}</strong> (${absentSlot.subject})`
    : `<em>Free period / No class assigned</em>`;
  absentInfo.innerHTML = `
    <div class="absent-dot"></div>
    <div class="absent-text">
      <strong>${absentT.name}</strong> is absent on <strong>${DAY_LABELS[day]}</strong>,
      Period <strong>${period}</strong>. Class to cover: ${classText}
    </div>
  `;

  // Compute substitutes: other teachers who are FREE that period
  const results = TEACHERS
    .map((t, idx) => ({ t, idx }))
    .filter(({ t, idx }) => {
      if (idx === selectedTeacher) return false;          // skip absent teacher
      return isFree(t, day, periodIdx);                   // must be free
    })
    .map(({ t, idx }) => {
      const periodsToday = countPeriodsOnDay(t, day);
      return { t, idx, periodsToday };
    })
    .sort((a, b) => a.periodsToday - b.periodsToday);    // fewest periods = highest priority

  // Render results
  const resultsSection = document.getElementById("resultsSection");
  const container = document.getElementById("resultsContainer");
  const subtitle = document.getElementById("resultsSubtitle");
  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });

  const maxPeriods = 8;

  if (results.length === 0) {
    subtitle.textContent = "";
    container.innerHTML = `
      <div class="no-substitutes">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div class="no-sub-title">No Available Substitutes</div>
        <p>All teachers are occupied during Period ${period} on ${DAY_LABELS[day]}.</p>
      </div>`;
    return;
  }

  subtitle.textContent = `${results.length} teacher${results.length > 1 ? "s are" : " is"} free on Period ${period} (${DAY_LABELS[day]}), sorted by lowest workload.`;

  const list = document.createElement("div");
  list.className = "substitute-list";

  results.forEach(({ t, idx, periodsToday }, rank) => {
    const loadPct = Math.round((periodsToday / maxPeriods) * 100);
    let loadClass = "low";
    if (periodsToday >= 5) loadClass = "high";
    else if (periodsToday >= 3) loadClass = "medium";

    const rankClass = rank === 0 ? "rank-1" : rank === 1 ? "rank-2" : rank === 2 ? "rank-3" : "rank-other";
    const rankLabel = rank === 0 ? "1st" : rank === 1 ? "2nd" : rank === 2 ? "3rd" : `${rank + 1}th`;

    const card = document.createElement("div");
    card.className = "sub-card";
    card.style.animationDelay = `${rank * 40}ms`;
    card.innerHTML = `
      <div class="sub-rank ${rankClass}">${rank + 1}</div>
      <div class="sub-info">
        <div class="sub-name">${t.name}</div>
        <div class="sub-meta">
          <span class="meta-chip">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
            ${t.subject}
          </span>
          <span class="meta-chip">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${periodsToday} period${periodsToday !== 1 ? "s" : ""} today
          </span>
          <span class="meta-chip" style="color: ${loadClass === 'low' ? 'var(--success)' : loadClass === 'medium' ? 'var(--warning)' : 'var(--danger)'};">
            ● ${loadClass === 'low' ? 'Light load' : loadClass === 'medium' ? 'Moderate load' : 'Heavy load'}
          </span>
        </div>
      </div>
      <div class="sub-load-bar">
        <div class="load-label">${periodsToday}/${maxPeriods} periods</div>
        <div class="load-track">
          <div class="load-fill ${loadClass}" style="width: ${loadPct}%"></div>
        </div>
      </div>
      <div class="sub-actions">
        <button class="btn-assign" onclick="promptAssign(${idx}, '${day}', ${periodIdx + 1}, ${selectedTeacher})">
          Assign
        </button>
        <button class="btn-view-tt" onclick="viewTimetable(${idx}, '${day}', ${periodIdx})">
          View TT
        </button>
      </div>
    `;
    list.appendChild(card);
  });

  container.innerHTML = "";
  container.appendChild(list);
}

// ─── View timetable modal ─────────────────────────────
function viewTimetable(teacherIdx, highlightDay, highlightPeriodIdx) {
  const t = TEACHERS[teacherIdx];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let html = `<table class="tt-table">
    <thead>
      <tr>
        <th>Day</th>
        ${[1,2,3,4,5,6,7,8].map(p => `<th>P${p}</th>`).join("")}
      </tr>
    </thead>
    <tbody>`;

  days.forEach((day, di) => {
    const rowClass = day === highlightDay ? ' class="tt-highlight"' : '';
    html += `<tr${rowClass}>
      <td style="font-weight:600; color: var(--text-primary); white-space:nowrap;">${DAY_LABELS[day].slice(0,3)}</td>`;
    const slots = t.schedule[day] || [];
    for (let p = 0; p < 8; p++) {
      const slot = slots[p];
      const isHighlight = day === highlightDay && p === highlightPeriodIdx;
      const cellStyle = isHighlight
        ? 'style="background:rgba(52,211,153,0.1); border:1px solid rgba(52,211,153,0.35);"'
        : '';
      if (slot) {
        html += `<td ${cellStyle}>
          <div class="tt-cell">
            <span class="tt-class">${slot.class}</span>
            <span class="tt-subj">${slot.subject}</span>
          </div>
        </td>`;
      } else {
        const freeStyle = isHighlight
          ? `${cellStyle}`
          : 'style="color: var(--text-dim);"';
        html += `<td ${freeStyle}>${isHighlight ? '✓ Free' : '—'}</td>`;
      }
    }
    html += `</tr>`;
  });

  html += `</tbody></table>`;

  document.getElementById("modalTitle").textContent = `${t.name}'s Timetable (${t.subject})`;
  document.getElementById("modalContent").innerHTML = html;
  document.getElementById("modalOverlay").classList.remove("hidden");
}

function closeModal(e) {
  if (e.target === document.getElementById("modalOverlay")) {
    document.getElementById("modalOverlay").classList.add("hidden");
  }
}
function closeModalDirect() {
  document.getElementById("modalOverlay").classList.add("hidden");
}

// ─── Assignment flow ──────────────────────────────────
function promptAssign(subIdx, day, period, absentIdx) {
  const sub = TEACHERS[subIdx];
  const absent = TEACHERS[absentIdx];
  const absentSlot = absent.schedule[day]?.[period - 1];
  const classStr = absentSlot
    ? `${absentSlot.class} (${absentSlot.subject})`
    : "the free period slot";

  pendingAssignment = { subIdx, day, period, absentIdx };

  document.getElementById("confirmTitle").textContent = "Confirm Substitution";
  document.getElementById("confirmBody").innerHTML =
    `Assign <strong>${sub.name}</strong> to cover <strong>${absent.name}</strong>'s class:<br/>
     <br/>📅 <strong>${DAY_LABELS[day]}</strong>, Period <strong>${period}</strong><br/>
     🏫 Class: <strong>${classStr}</strong><br/>
     <br/>${sub.name} currently has <strong>${countPeriodsOnDay(sub, day)} period(s)</strong> today.`;

  document.getElementById("confirmOverlay").classList.remove("hidden");
}

function cancelAssign() {
  pendingAssignment = null;
  document.getElementById("confirmOverlay").classList.add("hidden");
}

function confirmAssign() {
  if (!pendingAssignment) return;
  const { subIdx, day, period, absentIdx } = pendingAssignment;
  const sub = TEACHERS[subIdx];
  const absent = TEACHERS[absentIdx];
  const absentSlot = absent.schedule[day]?.[period - 1];

  // Log it
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  assignmentLog.push({ sub, absent, day, period, absentSlot, timeStr });

  // Close confirm modal
  document.getElementById("confirmOverlay").classList.add("hidden");
  pendingAssignment = null;

  // Update log section
  renderLog();

  // Show success flash on the assigned card (optional: remove the sub from list)
  showToast(`✅ ${sub.name} assigned to cover ${absent.name}'s class (P${period}, ${DAY_LABELS[day]})`);
}

// ─── Render log ───────────────────────────────────────
function renderLog() {
  const logSection = document.getElementById("logSection");
  const logContainer = document.getElementById("logContainer");
  logSection.classList.remove("hidden");
  logSection.scrollIntoView({ behavior: "smooth", block: "nearest" });

  logContainer.innerHTML = "";
  assignmentLog.slice().reverse().forEach(entry => {
    const classStr = entry.absentSlot
      ? `${entry.absentSlot.class} (${entry.absentSlot.subject})`
      : "unassigned slot";
    const div = document.createElement("div");
    div.className = "log-entry";
    div.innerHTML = `
      <div class="log-dot"></div>
      <div class="log-content">
        <strong>${entry.sub.name}</strong> will substitute for
        <strong>${entry.absent.name}</strong> —
        ${DAY_LABELS[entry.day]}, Period ${entry.period},
        Class: <strong>${classStr}</strong>
      </div>
      <div class="log-time">${entry.timeStr}</div>
    `;
    logContainer.appendChild(div);
  });
}

function clearLog() {
  assignmentLog.length = 0;
  document.getElementById("logSection").classList.add("hidden");
}

// ─── Build plain-text share message from log ──────────
function buildShareText() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
  let msg = `📋 *Substitution Assignment Log*\n`;
  msg += `🏫 Govt. Ganapath UP School\n`;
  msg += `📅 ${today}\n`;
  msg += `${"─".repeat(32)}\n\n`;

  assignmentLog.forEach((entry, i) => {
    const classStr = entry.absentSlot
      ? `${entry.absentSlot.class} (${entry.absentSlot.subject})`
      : "unassigned slot";
    msg += `${i + 1}. *${entry.sub.name}* will substitute for *${entry.absent.name}*\n`;
    msg += `   📆 ${DAY_LABELS[entry.day]}, Period ${entry.period}\n`;
    msg += `   🏫 Class: ${classStr}\n`;
    msg += `   ⏰ Assigned at: ${entry.timeStr}\n\n`;
  });

  msg += `${"─".repeat(32)}\n`;
  msg += `Total assignments: ${assignmentLog.length}\n`;
  msg += `_Sent via Substitution Portal_`;
  return msg;
}

// ─── Share log ────────────────────────────────────────
async function shareLog() {
  if (assignmentLog.length === 0) {
    showToast("⚠️ No assignments to share yet.");
    return;
  }

  const text = buildShareText();

  // Use native Web Share API if available (mobile / supported browsers)
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch (err) {
      // User cancelled or share failed — fall through to modal
      if (err.name === "AbortError") return;
    }
  }

  // Fallback: show share modal with options
  showShareModal(text);
}

// ─── Share modal (desktop fallback) ───────────────────
function showShareModal(text) {
  // Remove any existing share modal
  const existing = document.getElementById("shareModal");
  if (existing) existing.remove();

  const encoded = encodeURIComponent(text);
  const waUrl   = `https://wa.me/?text=${encoded}`;
  const tgUrl   = `https://t.me/share/url?url=&text=${encoded}`;

  const overlay = document.createElement("div");
  overlay.id = "shareModal";
  overlay.className = "modal-overlay";
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  overlay.innerHTML = `
    <div class="modal-box share-modal-box">
      <div class="modal-header">
        <h3>Share Assignment Log</h3>
        <button class="modal-close" onclick="document.getElementById('shareModal').remove()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="share-options">
        <a class="share-btn share-wa" href="${waUrl}" target="_blank" rel="noopener">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.054 23.05a.75.75 0 0 0 .916.899l5.306-1.51A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.511-5.176-1.402l-.36-.214-3.762 1.072 1.032-3.658-.236-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Share on WhatsApp
        </a>
        <a class="share-btn share-tg" href="${tgUrl}" target="_blank" rel="noopener">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          Share on Telegram
        </a>
        <button class="share-btn share-copy" onclick="copyShareText()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy Text
        </button>
      </div>
      <div class="share-preview-label">Message Preview</div>
      <textarea class="share-preview" id="sharePreviewText" readonly>${text}</textarea>
    </div>
  `;

  document.body.appendChild(overlay);
}

// ─── Copy share text to clipboard ─────────────────────
async function copyShareText() {
  const text = document.getElementById("sharePreviewText")?.value;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast("✅ Copied to clipboard! Paste it in any app.");
  } catch {
    showToast("⚠️ Couldn't copy. Please select and copy manually.");
  }
}

// ─── Toast notification ───────────────────────────────
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "28px",
      right: "28px",
      background: "linear-gradient(135deg, #34d399, #059669)",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: "10px",
      fontFamily: "var(--font)",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 4px 24px rgba(52,211,153,0.4)",
      zIndex: "9999",
      opacity: "0",
      transition: "opacity 0.3s, transform 0.3s",
      transform: "translateY(10px)"
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
  }, 3500);
}
