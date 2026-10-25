/**
 * app.js — Substitution Desk Application Logic
 */

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

  // Reset selects
  document.getElementById("daySelect").value = "";
  document.getElementById("periodSelect").value = "";
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
