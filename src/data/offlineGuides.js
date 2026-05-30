const offlineGuides = [
  {
    id: "cpr",
    title: "CPR (Adult)",
    severity: "Critical",
    symptoms: [
      "Unconscious",
      "Not breathing",
      "No pulse",
    ],
    actions: [
      "Check for danger, response, and breathing",
      "Call emergency services IMMEDIATELY",
      "Place heel of hand on center of chest",
      "Push hard and fast (100-120 per min, 2 inches deep)",
      "Continue without stopping until help arrives"
    ],
    avoid: [
      "Do not interrupt compressions for more than 10 seconds",
      "Do not give rescue breaths if untrained (use Hands-Only CPR)"
    ],
  },
  {
    id: "heart-attack",
    title: "Heart Attack",
    severity: "Critical",
    symptoms: [
      "Chest pain/pressure",
      "Shortness of breath",
      "Sweating/Nausea",
    ],
    actions: [
      "Call emergency services immediately",
      "Help person sit down calmly and loosen tight clothing",
      "Give adult aspirin (325mg) to chew if appropriate and not allergic",
      "Prepare to perform CPR if they become unconscious",
    ],
    avoid: [
      "Do NOT ignore symptoms or wait to see if they go away",
      "Do NOT allow them to walk or exert themselves",
    ],
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    severity: "Critical",
    symptoms: [
      "Heavy blood loss",
      "Pulsing/spurting blood",
      "Dizziness/Confusion",
    ],
    actions: [
      "Apply DIRECT, FIRM pressure to the wound immediately",
      "Use a clean cloth, towel, or shirt",
      "If blood soaks through, add more cloth on top (do not remove original)",
      "Keep the person lying down and warm to prevent shock",
    ],
    avoid: [
      "Do NOT remove soaked dressings",
      "Do NOT apply a tourniquet unless trained and pressure fails",
    ],
  },
  {
    id: "burns",
    title: "Burns",
    severity: "Moderate",
    symptoms: [
      "Red or charred skin",
      "Blistering",
      "Severe pain",
    ],
    actions: [
      "Cool burn under gently running cool (not cold) water for 10-20 mins",
      "Remove tight jewelry or clothing near the burn before swelling",
      "Cover loosely with a clean, dry, lint-free cloth or plastic wrap",
    ],
    avoid: [
      "Do NOT apply ice, butter, or ointments to a severe burn",
      "Do NOT pop blisters or remove clothing stuck to the burn",
    ],
  },
  {
    id: "heatstroke",
    title: "Heatstroke",
    severity: "High",
    symptoms: [
      "High body temperature (103°F+)",
      "Hot, red, dry, or damp skin",
      "Confusion or passing out",
    ],
    actions: [
      "Call emergency services immediately",
      "Move person to a cooler place (shade or AC)",
      "Lower body temp with cool cloths or cool bath",
    ],
    avoid: [
      "Do NOT give them anything to drink if they are confused or unconscious",
    ],
  },
];

export default offlineGuides;
