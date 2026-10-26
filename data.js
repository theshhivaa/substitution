/**
 * data.js — Teacher timetable data extracted accurately from PDF
 * Each slot: { class, subject } or null (free period)
 * Periods: index 0–7 = Period 1–8
 */

const TEACHERS = [

  // ══════════════════════════════════════════════════
  // PAGE 1 — TABLE 1: SINI (English)
  // ══════════════════════════════════════════════════
  {
    name: "Sini",
    subject: "English",
    schedule: {
      Mon: [
        { class: "5A", subject: "English" },
        null,
        { class: "5E", subject: "English" },
        { class: "6E", subject: "English" },
        null,
        { class: "6B", subject: "English" },
        { class: "6A", subject: "English" },
        null
      ],
      Tue: [
        { class: "5A", subject: "English" },
        { class: "5E", subject: "English" },
        { class: "6B", subject: "English" },
        null,
        { class: "6A", subject: "English" },
        { class: "6E", subject: "English" },
        null,
        null
      ],
      Wed: [
        { class: "5A", subject: "English" },
        { class: "6A", subject: "English" },
        null,
        { class: "5E", subject: "English" },
        { class: "6E", subject: "English" },
        { class: "6B", subject: "English" },
        null,
        null
      ],
      Thu: [
        { class: "5A", subject: "English" },
        { class: "5E", subject: "English" },
        { class: "6E", subject: "English" },
        { class: "6B", subject: "English" },
        null,
        { class: "6A", subject: "English" },
        { class: "5E", subject: "English" },
        null
      ],
      Fri: [
        { class: "5A", subject: "English" },
        { class: "6A", subject: "English" },
        { class: "6B", subject: "English" },
        { class: "5E", subject: "English" },
        null,
        { class: "6E", subject: "English" },
        { class: "5A", subject: "English" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 1 — TABLE 2: PRIYA (English)
  // ══════════════════════════════════════════════════
  {
    name: "Priya",
    subject: "English",
    schedule: {
      Mon: [
        { class: "5B", subject: "English" },
        null,
        { class: "7E", subject: "English" },
        { class: "7D", subject: "English" },
        null,
        { class: "5D", subject: "English" },
        { class: "5C", subject: "English" },
        null
      ],
      Tue: [
        { class: "5B", subject: "English" },
        null,
        { class: "7E", subject: "English" },
        { class: "7D", subject: "English" },
        { class: "5C", subject: "English" },
        { class: "5D", subject: "English" },
        null,
        null
      ],
      Wed: [
        { class: "5B", subject: "English" },
        { class: "7D", subject: "English" },
        null,
        { class: "5D", subject: "English" },
        { class: "5C", subject: "English" },
        { class: "5D", subject: "English" },
        { class: "7E", subject: "English" },
        null
      ],
      Thu: [
        { class: "5B", subject: "English" },
        { class: "7E", subject: "English" },
        { class: "5C", subject: "English" },
        { class: "5D", subject: "English" },
        { class: "7D", subject: "English" },
        null,
        { class: "5C", subject: "English" },
        null
      ],
      Fri: [
        { class: "5B", subject: "English" },
        { class: "5D", subject: "English" },
        { class: "5C", subject: "English" },
        { class: "7D", subject: "English" },
        { class: "7E", subject: "English" },
        null,
        { class: "5B", subject: "English" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 1 — TABLE 3: NIGILA (SS / BT)
  // ══════════════════════════════════════════════════
  {
    name: "Nigila",
    subject: "SS/BT",
    schedule: {
      Mon: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        // Mon row empty in table; classes are in sub-row:
        // 55CC 77CC 77AA  77BB 77EE 55BB
      ],
      Tue: [
        { class: "5C", subject: "SS" },
        { class: "5B", subject: "SS" },
        { class: "5C", subject: "E-Vidya" },
        { class: "7A", subject: "AT" },
        null,
        null,
        { class: "7E", subject: "BT" },
        null
      ],
      Wed: [
        { class: "5C", subject: "SS" },
        { class: "5B", subject: "SS" },
        { class: "7A", subject: "AT" },
        null,
        null,
        { class: "7D", subject: "BT" },
        { class: "5C", subject: "WRK" },
        null
      ],
      Thu: [
        { class: "5C", subject: "SS" },
        { class: "7D", subject: "BT" },
        null,
        { class: "7A", subject: "AT" },
        { class: "5B", subject: "SS" },
        { class: "7A", subject: "BT" },
        { class: "7B", subject: "AT" },
        null
      ],
      Fri: [
        { class: "5C", subject: "SS" },
        null,
        { class: "5E", subject: "ART" },
        { class: "7C", subject: "BT" },
        { class: "7A", subject: "AT" },
        { class: "5B", subject: "SS" },
        null,
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 1 — TABLE 4: JAYA (Malayalam / AT)
  // ══════════════════════════════════════════════════
  {
    name: "Jaya",
    subject: "Malayalam/AT",
    schedule: {
      Mon: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
        // Mon: 55DD 77DDEE  77CC 55AA,CC,EE  55EE
        // MAL  AT           AT   AT            BT
      ],
      Tue: [
        { class: "5D", subject: "MAL" },
        { class: "7C", subject: "AT" },
        null,
        { class: "5ACE", subject: "AT" },
        { class: "7B", subject: "AT" },
        null,
        { class: "5D", subject: "LIB" },
        null
      ],
      Wed: [
        { class: "5D", subject: "MAL" },
        { class: "5ACE", subject: "AT" },
        null,
        { class: "7DE", subject: "AT" },
        { class: "7C", subject: "AT" },
        { class: "7B", subject: "AT" },
        null,
        null
      ],
      Thu: [
        { class: "5D", subject: "MAL" },
        null,
        { class: "5D", subject: "BT" },
        { class: "5E", subject: "BT" },
        { class: "7B", subject: "AT" },
        { class: "7DE", subject: "AT" },
        { class: "7C", subject: "AT" },
        null
      ],
      Fri: [
        { class: "5D", subject: "MAL" },
        null,
        { class: "7B", subject: "AT" },
        { class: "5D", subject: "E-Vidya" },
        { class: "5ACE", subject: "AT" },
        { class: "5D", subject: "WORK" },
        { class: "7DE", subject: "AT" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 1 — TABLE 5: SNEHA (Science)
  // ══════════════════════════════════════════════════
  {
    name: "Sneha",
    subject: "Science",
    schedule: {
      Mon: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
        // 55EE 55DD  55AA  77DD 77EE
        // SCI  SCI   SCI   SCI  SCI
      ],
      Tue: [
        { class: "5E", subject: "Sci" },
        { class: "5A", subject: "Sci" },
        null,
        { class: "5D", subject: "Sci" },
        { class: "7D", subject: "Sci" },
        { class: "7E", subject: "Sci" },
        { class: "5E", subject: "LIB" },
        null
      ],
      Wed: [
        { class: "5E", subject: "Sci" },
        null,
        { class: "5D", subject: "Sci" },
        { class: "5A", subject: "Sci" },
        { class: "7D", subject: "Sci" },
        { class: "7E", subject: "Sci" },
        null,
        null
      ],
      Thu: [
        { class: "5E", subject: "Sci" },
        null,
        { class: "7E", subject: "Sci" },
        { class: "7D", subject: "Sci" },
        { class: "5E", subject: "E-Vidya" },
        { class: "5D", subject: "Sci" },
        { class: "5A", subject: "Sci" },
        null
      ],
      Fri: [
        { class: "5E", subject: "Sci" },
        null,
        { class: "5D", subject: "Sci" },
        { class: "5A", subject: "Sci" },
        { class: "7D", subject: "Sci" },
        { class: "7E", subject: "Sci" },
        null,
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 1 — TABLE 6: SHEEBA (Maths)
  // ══════════════════════════════════════════════════
  {
    name: "Sheeba",
    subject: "Maths",
    schedule: {
      Mon: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
        // 66AA 55EE  55DD  55BB 55AA
        // MATHS MATHS MATHS MATHS MATHS
      ],
      Tue: [
        { class: "6A", subject: "Maths" },
        null,
        { class: "5A", subject: "Maths" },
        { class: "5B", subject: "Maths" },
        { class: "5D", subject: "Maths" },
        { class: "5E", subject: "Maths" },
        { class: "6A", subject: "LIB" },
        null
      ],
      Wed: [
        { class: "6A", subject: "Maths" },
        { class: "5D", subject: "Maths" },
        { class: "6A", subject: "E-Vidya" },
        null,
        { class: "5A", subject: "Maths" },
        { class: "5B", subject: "Maths" },
        { class: "5E", subject: "Maths" },
        null
      ],
      Thu: [
        { class: "6A", subject: "Maths" },
        { class: "5B", subject: "Maths" },
        null,
        { class: "5A", subject: "Maths" },
        { class: "5D", subject: "Maths" },
        { class: "5E", subject: "Maths" },
        null,
        null
      ],
      Fri: [
        { class: "6A", subject: "Maths" },
        null,
        { class: "5A", subject: "Maths" },
        { class: "5B", subject: "Maths" },
        { class: "5D", subject: "Maths" },
        null,
        { class: "5E", subject: "Maths" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 2 — TABLE 1: ASHITHA (Science)
  // ══════════════════════════════════════════════════
  {
    name: "Ashitha",
    subject: "Science",
    schedule: {
      Mon: [
        { class: "6B", subject: "Sci" },
        { class: "5C", subject: "Sci" },
        null,
        { class: "6A", subject: "Sci" },
        { class: "5B", subject: "Sci" },
        null,
        { class: "6E", subject: "Sci" },
        null
      ],
      Tue: [
        { class: "6B", subject: "Sci" },
        { class: "5C", subject: "Sci" },
        null,
        { class: "6E", subject: "Sci" },
        { class: "5B", subject: "Sci" },
        { class: "6A", subject: "Sci" },
        null,
        null
      ],
      Wed: [
        { class: "6B", subject: "Sci" },
        { class: "6E", subject: "Sci" },
        { class: "5C", subject: "Sci" },
        { class: "5B", subject: "Sci" },
        { class: "6B", subject: "E-Vidya" },
        { class: "6A", subject: "Sci" },
        null,
        null
      ],
      Thu: [
        { class: "6B", subject: "Sci" },
        { class: "6E", subject: "Sci" },
        { class: "5B", subject: "Sci" },
        { class: "5C", subject: "Sci" },
        { class: "6A", subject: "Sci" },
        null,
        null,
        null
      ],
      Fri: [
        { class: "6B", subject: "Sci" },
        { class: "5B", subject: "Sci" },
        null,
        { class: "6E", subject: "Sci" },
        { class: "6E", subject: "Sci" },
        { class: "5C", subject: "Sci" },
        { class: "6C", subject: "LIB" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 2 — TABLE 2: REMITHA (English)
  // ══════════════════════════════════════════════════
  {
    name: "Remitha",
    subject: "English",
    schedule: {
      Mon: [
        { class: "6C", subject: "Eng" },
        { class: "6D", subject: "Eng" },
        { class: "7B", subject: "Eng" },
        null,
        { class: "7A", subject: "Eng" },
        { class: "7C", subject: "Eng" },
        { class: "6B", subject: "LIB" },
        null
      ],
      Tue: [
        { class: "6C", subject: "Eng" },
        null,
        { class: "7A", subject: "Eng" },
        { class: "6D", subject: "Eng" },
        null,
        { class: "7B", subject: "Eng" },
        { class: "7C", subject: "Eng" },
        null
      ],
      Wed: [
        { class: "6C", subject: "Eng" },
        null,
        { class: "6D", subject: "Eng" },
        { class: "7C", subject: "Eng" },
        { class: "7B", subject: "Eng" },
        null,
        { class: "7A", subject: "Eng" },
        null
      ],
      Thu: [
        { class: "6C", subject: "Eng" },
        { class: "7A", subject: "Eng" },
        { class: "6C", subject: "E-Vidya" },
        { class: "6D", subject: "Eng" },
        null,
        { class: "7C", subject: "Eng" },
        { class: "7A", subject: "Eng" },
        null
      ],
      Fri: [
        { class: "6C", subject: "Eng" },
        { class: "7A", subject: "Eng" },
        null,
        { class: "7B", subject: "Eng" },
        { class: "7C", subject: "Eng" },
        null,
        { class: "6D", subject: "Eng" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 2 — TABLE 3: SAJILA (SS)
  // ══════════════════════════════════════════════════
  {
    name: "Sajila",
    subject: "SS",
    schedule: {
      Mon: [
        { class: "6D", subject: "SS" },
        { class: "6B", subject: "SS" },
        { class: "6A", subject: "SS" },
        null,
        { class: "6C", subject: "SS" },
        { class: "5A", subject: "SS" },
        null,
        null
      ],
      Tue: [
        { class: "6D", subject: "SS" },
        { class: "6A", subject: "SS" },
        null,
        { class: "6B", subject: "SS" },
        { class: "5A", subject: "SS" },
        { class: "6C", subject: "SS" },
        { class: "6D", subject: "LIB" },
        null
      ],
      Wed: [
        { class: "6D", subject: "SS" },
        { class: "6B", subject: "SS" },
        null,
        { class: "6C", subject: "SS" },
        { class: "6A", subject: "SS" },
        { class: "5A", subject: "SS" },
        null,
        null
      ],
      Thu: [
        { class: "6D", subject: "SS" },
        null,
        { class: "5A", subject: "SS" },
        { class: "6C", subject: "SS" },
        null,
        { class: "6B", subject: "SS" },
        { class: "6A", subject: "SS" },
        null
      ],
      Fri: [
        { class: "6D", subject: "SS" },
        { class: "5A", subject: "SS" },
        { class: "6C", subject: "SS" },
        null,
        { class: "6D", subject: "E-Vidya" },
        { class: "6B", subject: "SS" },
        { class: "6A", subject: "SS" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 2 — TABLE 4: NIVYA (Malayalam / BT)
  // ══════════════════════════════════════════════════
  {
    name: "Nivya",
    subject: "Mal/BT",
    schedule: {
      Mon: [
        { class: "6E", subject: "MAL" },
        { class: "6C", subject: "BT" },
        { class: "6D", subject: "ART" },
        { class: "5C", subject: "BT" },
        null,
        { class: "6ACD", subject: "AT" },
        null,
        null
      ],
      Tue: [
        { class: "6E", subject: "MAL" },
        { class: "6E", subject: "E-Vidya" },
        { class: "6ACD", subject: "AT" },
        { class: "6A", subject: "BT" },
        { class: "6D", subject: "BT" },
        { class: "5A", subject: "BT" },
        null,
        null
      ],
      Wed: [
        { class: "6E", subject: "MAL" },
        { class: "6C", subject: "BT" },
        null,
        null,
        { class: "5B", subject: "BT" },
        { class: "6E", subject: "BT" },
        { class: "6ACD", subject: "AT" },
        null
      ],
      Thu: [
        { class: "6E", subject: "MAL" },
        null,
        { class: "6D", subject: "BT" },
        null,
        { class: "6B", subject: "BT" },
        { class: "5A", subject: "BT" },
        { class: "6E", subject: "WORK" },
        null
      ],
      Fri: [
        { class: "6E", subject: "MAL" },
        null,
        { class: "6A", subject: "BT" },
        { class: "5C", subject: "BT" },
        { class: "5B", subject: "BT" },
        { class: "6ACD", subject: "AT" },
        { class: "6B", subject: "BT" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 2 — TABLE 5: RINSIJA (Maths)
  // ══════════════════════════════════════════════════
  {
    name: "Rinsija",
    subject: "Maths",
    schedule: {
      Mon: [
        { class: "7A", subject: "Maths" },
        null,
        { class: "6C", subject: "Maths" },
        { class: "6D", subject: "Maths" },
        { class: "6B", subject: "Maths" },
        { class: "6E", subject: "Maths" },
        { class: "7A", subject: "LIB" },
        null
      ],
      Tue: [
        { class: "7A", subject: "Maths" },
        { class: "6D", subject: "Maths" },
        { class: "6E", subject: "Maths" },
        { class: "6C", subject: "Maths" },
        { class: "6B", subject: "Maths" },
        null,
        { class: "5C", subject: "LIB" },
        null
      ],
      Wed: [
        { class: "7A", subject: "Maths" },
        null,
        { class: "6E", subject: "Maths" },
        { class: "6D", subject: "Maths" },
        null,
        { class: "6C", subject: "Maths" },
        { class: "6B", subject: "Maths" },
        null
      ],
      Thu: [
        { class: "7A", subject: "Maths" },
        { class: "6D", subject: "Maths" },
        null,
        null,
        { class: "6C", subject: "Maths" },
        { class: "6E", subject: "Maths" },
        { class: "6B", subject: "Maths" },
        null
      ],
      Fri: [
        { class: "7A", subject: "Maths" },
        { class: "6D", subject: "Maths" },
        null,
        { class: "6B", subject: "Maths" },
        { class: "6C", subject: "Maths" },
        null,
        { class: "6E", subject: "Maths" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 2 — TABLE 6: BINISHA (Science)
  // ══════════════════════════════════════════════════
  {
    name: "Binisha",
    subject: "Science",
    schedule: {
      Mon: [
        { class: "7B", subject: "Sci" },
        { class: "7A", subject: "Sci" },
        null,
        { class: "6C", subject: "Sci" },
        { class: "7C", subject: "Sci" },
        null,
        { class: "6D", subject: "Sci" },
        null
      ],
      Tue: [
        { class: "7B", subject: "Sci" },
        null,
        null,
        { class: "7C", subject: "Sci" },
        { class: "6C", subject: "Sci" },
        { class: "6D", subject: "Sci" },
        { class: "7A", subject: "Sci" },
        null
      ],
      Wed: [
        { class: "7B", subject: "Sci" },
        { class: "6D", subject: "Sci" },
        { class: "6C", subject: "Sci" },
        null,
        { class: "7A", subject: "Sci" },
        { class: "7C", subject: "Sci" },
        { class: "7B", subject: "LIB" },
        null
      ],
      Thu: [
        { class: "7B", subject: "Sci" },
        null,
        { class: "7A", subject: "Sci" },
        { class: "7C", subject: "Sci" },
        null,
        { class: "6D", subject: "Sci" },
        { class: "6C", subject: "Sci" },
        null
      ],
      Fri: [
        { class: "7B", subject: "Sci" },
        { class: "7B", subject: "E-Vidya" },
        { class: "6D", subject: "Sci" },
        { class: "6C", subject: "Sci" },
        null,
        { class: "7A", subject: "Sci" },
        { class: "7C", subject: "Sci" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 3 — TABLE 1: SOJI (Maths)
  // ══════════════════════════════════════════════════
  {
    name: "Soji",
    subject: "Maths",
    schedule: {
      Mon: [
        { class: "7C", subject: "Maths" },
        { class: "7B", subject: "Maths" },
        null,
        { class: "7E", subject: "Maths" },
        { class: "7D", subject: "Maths" },
        { class: "5C", subject: "Maths" },
        { class: "7C", subject: "LIB" },
        null
      ],
      Tue: [
        { class: "7C", subject: "Maths" },
        { class: "7B", subject: "Maths" },
        { class: "7D", subject: "Maths" },
        { class: "7E", subject: "Maths" },
        null,
        { class: "5C", subject: "Maths" },
        null,
        null
      ],
      Wed: [
        { class: "7C", subject: "Maths" },
        { class: "7C", subject: "E-Vidya" },
        { class: "7D", subject: "Maths" },
        { class: "7B", subject: "Maths" },
        { class: "7E", subject: "Maths" },
        { class: "5C", subject: "Maths" },
        null,
        null
      ],
      Thu: [
        { class: "7C", subject: "Maths" },
        { class: "5C", subject: "Maths" },
        null,
        { class: "7B", subject: "Maths" },
        { class: "7E", subject: "Maths" },
        null,
        { class: "7D", subject: "Maths" },
        null
      ],
      Fri: [
        { class: "7C", subject: "Maths" },
        { class: "5C", subject: "Maths" },
        { class: "7B", subject: "Maths" },
        { class: "7E", subject: "Maths" },
        null,
        { class: "7B", subject: "Maths" },
        null,
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 3 — TABLE 2: MUFEEDA (SS / SOC)
  // ══════════════════════════════════════════════════
  {
    name: "Mufeeda",
    subject: "SS",
    schedule: {
      Mon: [
        { class: "7D", subject: "SOC" },
        null,
        { class: "7C", subject: "SS" },
        { class: "7A", subject: "SS" },
        { class: "5D", subject: "SS" },
        { class: "5E", subject: "SS" },
        null,
        null
      ],
      Tue: [
        { class: "7D", subject: "SOC" },
        { class: "5D", subject: "SS" },
        { class: "5E", subject: "SS" },
        null,
        { class: "7C", subject: "SS" },
        { class: "7A", subject: "SS" },
        { class: "7D", subject: "LIB" },
        null
      ],
      Wed: [
        { class: "7D", subject: "SOC" },
        null,
        { class: "7C", subject: "SS" },
        { class: "7A", subject: "SS" },
        { class: "5D", subject: "SS" },
        { class: "5E", subject: "SS" },
        null,
        null
      ],
      Thu: [
        { class: "7D", subject: "SOC" },
        { class: "5D", subject: "SS" },
        { class: "5E", subject: "SS" },
        null,
        { class: "7C", subject: "SS" },
        { class: "7A", subject: "SS" },
        null,
        null
      ],
      Fri: [
        { class: "7D", subject: "SOC" },
        { class: "5E", subject: "SS" },
        { class: "7C", subject: "SS" },
        { class: "7A", subject: "SS" },
        null,
        { class: "7D", subject: "E-Vidya" },
        { class: "5D", subject: "SS" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 3 — TABLE 3: SINDHU (SS / SOC)
  // ══════════════════════════════════════════════════
  {
    name: "Sindhu",
    subject: "SS",
    schedule: {
      Mon: [
        { class: "7E", subject: "SOC" },
        null,
        { class: "6E", subject: "ART" },
        { class: "7B", subject: "S.S" },
        { class: "6E", subject: "S.S" },
        null,
        { class: "7D", subject: "ART" },
        null
      ],
      Tue: [
        { class: "7E", subject: "SOC" },
        { class: "7E", subject: "WORK" },
        { class: "7B", subject: "S.S" },
        null,
        { class: "6E", subject: "S.S" },
        null,
        null,
        null
      ],
      Wed: [
        { class: "7E", subject: "SOC" },
        { class: "7A", subject: "WORK" },
        { class: "7B", subject: "S.S" },
        { class: "6E", subject: "S.S" },
        null,
        null,
        { class: "6E", subject: "LIB" },
        null
      ],
      Thu: [
        { class: "7E", subject: "SOC" },
        null,
        { class: "7B", subject: "S.S" },
        null,
        { class: "6E", subject: "S.S" },
        { class: "7E", subject: "LIB" },
        null,
        null
      ],
      Fri: [
        { class: "7E", subject: "SOC" },
        { class: "6E", subject: "S.S" },
        { class: "7E", subject: "E-Vidya" },
        null,
        { class: "7B", subject: "S.S" },
        null,
        null,
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 3 — TABLE 4: SHINY (Hindi)
  // ══════════════════════════════════════════════════
  {
    name: "Shiny",
    subject: "Hindi",
    schedule: {
      Mon: [
        null,
        { class: "5A", subject: "Hindi" },
        { class: "5C", subject: "Hindi" },
        { class: "6B", subject: "ART" },
        { class: "7E", subject: "Hindi" },
        { class: "7A", subject: "Hindi" },
        { class: "7B", subject: "Hindi" },
        null
      ],
      Tue: [
        null,
        { class: "7D", subject: "Hindi" },
        { class: "7C", subject: "Hindi" },
        { class: "7B", subject: "Hindi" },
        { class: "7A", subject: "Hindi" },
        null,
        { class: "7B", subject: "ART" },
        null
      ],
      Wed: [
        null,
        { class: "7E", subject: "Hindi" },
        { class: "5A", subject: "Hindi" },
        null,
        null,
        { class: "7A", subject: "E-Vidya" },
        { class: "7D", subject: "Hindi" },
        null
      ],
      Thu: [
        null,
        { class: "5A", subject: "ART" },
        { class: "7C", subject: "Hindi" },
        { class: "7E", subject: "Hindi" },
        { class: "5C", subject: "Hindi" },
        { class: "7B", subject: "Hindi" },
        null,
        null
      ],
      Fri: [
        null,
        { class: "7D", subject: "Hindi" },
        { class: "7A", subject: "Hindi" },
        null,
        null,
        { class: "7C", subject: "Hindi" },
        { class: "5C", subject: "ART" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 3 — TABLE 5: SHIMNA (Art)
  // ══════════════════════════════════════════════════
  {
    name: "Shimna",
    subject: "Art",
    schedule: {
      Mon: [
        null,
        { class: "5B", subject: "ART" },
        { class: "5D", subject: "ART" },
        { class: "5B", subject: "ART" },
        { class: "6D", subject: "ART" },
        null,
        { class: "6C", subject: "ART" },
        null
      ],
      Tue: [
        null,
        { class: "6C", subject: "ART" },
        { class: "5D", subject: "ART" },
        null,
        { class: "5E", subject: "ART" },
        { class: "6B", subject: "ART" },
        { class: "6E", subject: "ART" },
        null
      ],
      Wed: [
        null,
        null,
        { class: "6B", subject: "ART" },
        { class: "6A", subject: "ART" },
        { class: "5E", subject: "ART" },
        { class: "6D", subject: "ART" },
        null,
        null
      ],
      Thu: [
        null,
        null,
        { class: "6A", subject: "ART" },
        { class: "6E", subject: "ART" },
        { class: "6D", subject: "ART" },
        { class: "5B", subject: "ART" },
        { class: "5D", subject: "ART" },
        null
      ],
      Fri: [
        null,
        { class: "6C", subject: "ART" },
        { class: "6E", subject: "ART" },
        { class: "6A", subject: "ART" },
        { class: "6B", subject: "ART" },
        null,
        null,
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 3 — TABLE 6: SURYA (Art / PE)
  // ══════════════════════════════════════════════════
  {
    name: "Surya",
    subject: "Art/PE",
    schedule: {
      Mon: [
        null,
        null,
        null,
        null,
        { class: "5ACE", subject: "ART" },
        null,
        null,
        null
      ],
      Tue: [
        null,
        null,
        null,
        { class: "5ACE", subject: "ART" },
        null,
        { class: "5B", subject: "ART" },
        null,
        null
      ],
      Wed: [
        null,
        { class: "5ACE", subject: "ART" },
        { class: "5B", subject: "ART" },
        null,
        null,
        null,
        { class: "7C", subject: "ART" },
        null
      ],
      Thu: [
        null,
        null,
        null,
        { class: "5B", subject: "ART" },
        null,
        null,
        null,
        null
      ],
      Fri: [
        null,
        null,
        { class: "5B", subject: "ART" },
        null,
        { class: "5ACE", subject: "ART" },
        null,
        null,
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 4 — TABLE 1: UNNI (PE / Art)
  // ══════════════════════════════════════════════════
  {
    name: "Unni",
    subject: "PE/Art",
    schedule: {
      Mon: [
        { class: "6E", subject: "PE" },
        { class: "7DE", subject: "PE" },
        { class: "6B", subject: "PE" },
        null,
        { class: "6A", subject: "ART" },
        { class: "6ACD", subject: "PE" },
        null,
        null
      ],
      Tue: [
        { class: "6E", subject: "PE" },
        { class: "6B", subject: "PE" },
        { class: "6ACD", subject: "PE" },
        { class: "7A", subject: "PE" },
        { class: "7B", subject: "PE" },
        null,
        { class: "5A", subject: "LIB" },
        null
      ],
      Wed: [
        { class: "6E", subject: "PE" },
        null,
        { class: "7A", subject: "PE" },
        { class: "7DE", subject: "PE" },
        null,
        { class: "7B", subject: "PE" },
        { class: "6ACD", subject: "PE" },
        null
      ],
      Thu: [
        { class: "6E", subject: "PE" },
        null,
        { class: "6B", subject: "PE" },
        { class: "7A", subject: "PE" },
        { class: "7B", subject: "PE" },
        { class: "7DE", subject: "PE" },
        null,
        null
      ],
      Fri: [
        null,
        { class: "6B", subject: "PE" },
        { class: "7B", subject: "PE" },
        null,
        { class: "7A", subject: "PE" },
        { class: "6ACD", subject: "PE" },
        { class: "7DE", subject: "PE" },
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 4 — TABLE 2: KCM (PE)
  // ══════════════════════════════════════════════════
  {
    name: "KCM",
    subject: "PE",
    schedule: {
      Mon: [
        { class: "6E", subject: "PE" },
        null,
        null,
        { class: "7C", subject: "PE" },
        { class: "5ACE", subject: "PE" },
        { class: "6ACD", subject: "PE" },
        null,
        null
      ],
      Tue: [
        { class: "6E", subject: "PE" },
        { class: "7C", subject: "PE" },
        { class: "6ACD", subject: "PE" },
        { class: "5ACE", subject: "PE" },
        null,
        null,
        null,
        null
      ],
      Wed: [
        { class: "6E", subject: "PE" },
        { class: "5ACE", subject: "PE" },
        null,
        null,
        { class: "7C", subject: "PE" },
        null,
        { class: "6ACD", subject: "PE" },
        null
      ],
      Thu: [
        { class: "6E", subject: "PE" },
        null,
        null,
        null,
        null,
        null,
        { class: "7C", subject: "PE" },
        null
      ],
      Fri: [
        null,
        null,
        null,
        null,
        { class: "5ACE", subject: "PE" },
        { class: "6ACD", subject: "PE" },
        null,
        null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 4 — TABLE 3: NAJMU (E-Vidya / Art)
  // ══════════════════════════════════════════════════
  {
    name: "Najmu",
    subject: "E-Vidya",
    schedule: {
      Mon: [
        null,
        { class: "5B", subject: "E-Vidya" },
        { class: "5A", subject: "E-Vidya" },
        null,
        { class: "5ACE", subject: "PE" },
        { class: "6ACD", subject: "PE" },
        null,
        null
      ],
      Tue: [
        null,
        null,
        { class: "6ACD", subject: "PE" },
        { class: "5ACE", subject: "PE" },
        null,
        null,
        { class: "5B", subject: "ART" },
        null
      ],
      Wed: [
        null,
        { class: "5ACE", subject: "ART" },
        { class: "7E", subject: "ART" },
        null,
        null,
        null,
        { class: "6ACD", subject: "PE" },
        null
      ],
      Thu: [
        null, null, null, null, null, null, null, null
      ],
      Fri: [
        null, null, null, null, null, null, null, null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 4 — TABLE 4: SEENA (BT / Art)
  // ══════════════════════════════════════════════════
  {
    name: "Seena",
    subject: "BT/Art",
    schedule: {
      Mon: [
        null, null, null, null, null, null, null, null
      ],
      Tue: [
        null, null, null, null, null, null, null, null
      ],
      Wed: [
        null,
        { class: "7B", subject: "BT" },
        { class: "5E", subject: "BT" },
        { class: "6B", subject: "BT" },
        { class: "6D", subject: "BT" },
        null,
        { class: "5A", subject: "BT" },
        null
      ],
      Thu: [
        null,
        { class: "7C", subject: "BT" },
        { class: "7D", subject: "BT" },
        { class: "6A", subject: "BT" },
        { class: "7A", subject: "BT" },
        { class: "6C", subject: "BT" },
        { class: "5B", subject: "BT" },
        null
      ],
      Fri: [
        null, null, null, null, null, null, null, null
      ]
    }
  },

  // ══════════════════════════════════════════════════
  // PAGE 4 — TABLE 5: TOBY (PE)
  // ══════════════════════════════════════════════════
  {
    name: "Toby",
    subject: "PE",
    schedule: {
      Mon: [
        null,
        { class: "6A/6E", subject: "PE" },
        { class: "7D",    subject: "PE" },
        { class: "5E",    subject: "PE" },
        null,
        { class: "7B",    subject: "PE" },
        { class: "5D",    subject: "PE" },
        null
      ],
      Tue: [
        null,
        { class: "7A",    subject: "PE" },
        { class: "5B",    subject: "PE" },
        { class: "7E",    subject: "PE" },
        null,
        { class: "7C/7D", subject: "PE" },
        { class: "6B/C",  subject: "PE" },
        null
      ],
      Wed: [
        null,
        null,
        null,
        { class: "5C",    subject: "PE" },
        { class: "6C",    subject: "PE" },
        null,
        { class: "5B/5D", subject: "PE" },
        null
      ],
      Thu: [
        null,
        { class: "6A/B",  subject: "PE" },
        null,
        null,
        { class: "5A/5C", subject: "PE" },
        null,
        { class: "6D",    subject: "PE" },
        null
      ],
      Fri: [
        null,
        { class: "7C/7E", subject: "PE" },
        null,
        { class: "6D",    subject: "PE" },
        { class: "6E",    subject: "PE" },
        { class: "5A/E",  subject: "PE" },
        { class: "7B/7A", subject: "PE" },
        null
      ]
    }
  }

];

// ── Fix: Nigila Mon from PDF (Page 1, Table 3)
// PDF: P1=5C/SS, P2=7C/BT, P3=7A/BT, P4=null, P5=7B/BT, P6=7E/BT, P7=5B/SS
TEACHERS.find(t => t.name === "Nigila").schedule.Mon = [
  { class: "5C", subject: "SS" },
  { class: "7C", subject: "BT" },
  { class: "7A", subject: "BT" },
  null,
  { class: "7B", subject: "BT" },
  { class: "7E", subject: "BT" },
  { class: "5B", subject: "SS" },
  null
];

// Fix: Jaya Mon from PDF (Page 1, Table 4)
// PDF: P1=5D/MAL, P2=7DE/AT, P3=null, P4=7C/AT, P5=5ACE/AT, P6=null, P7=5E/BT
TEACHERS.find(t => t.name === "Jaya").schedule.Mon = [
  { class: "5D", subject: "MAL" },
  { class: "7DE", subject: "AT" },
  null,
  { class: "7C", subject: "AT" },
  { class: "5ACE", subject: "AT" },
  null,
  { class: "5E", subject: "BT" },
  null
];

// Fix: Sneha Mon from PDF text
// PDF: 55EE 55DD 55AA 77DD 77EE → SCI SCI SCI SCI SCI → P1=5E,P2=5D,P3=5A,P4=7D,P5=7E
TEACHERS.find(t => t.name === "Sneha").schedule.Mon = [
  { class: "5E", subject: "Sci" },
  { class: "5D", subject: "Sci" },
  null,
  { class: "5A", subject: "Sci" },
  null,
  { class: "7D", subject: "Sci" },
  { class: "7E", subject: "Sci" },
  null
];

// Fix: Sheeba Mon from PDF text
// PDF: 66AA 55EE 55DD 55BB 55AA → MATHS MATHS MATHS MATHS MATHS → P1=6A,P2=5E,P4=5D,P6=5B,P7=5A
TEACHERS.find(t => t.name === "Sheeba").schedule.Mon = [
  { class: "6A", subject: "Maths" },
  { class: "5E", subject: "Maths" },
  null,
  { class: "5D", subject: "Maths" },
  null,
  { class: "5B", subject: "Maths" },
  { class: "5A", subject: "Maths" },
  null
];

// Helper: count non-null, non-LIB periods for a teacher on a given day
function countPeriodsOnDay(teacher, day) {
  const slots = teacher.schedule[day] || [];
  return slots.filter(s => s !== null && s.subject !== "LIB").length;
}

// Helper: check if teacher is free at a given period on a day
function isFree(teacher, day, periodIndex) {
  const slots = teacher.schedule[day] || [];
  return slots[periodIndex] === null;
}
