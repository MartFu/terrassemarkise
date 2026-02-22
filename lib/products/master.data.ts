// ============================================================================
// MASTER DATA (The "dictionary" - edited by developers when adding new options)
// This is the source of truth for all product related types.
// ============================================================================

export const TYPES = {
  standard: { label: "Åpen konstruksjon", hasCassette: false },
  cassette: { label: "Kassettert", hasCassette: true },
} as const;

export const MASTER_DATA = {
  COLORS: [
    "RAL 9010",
    "RAL 1015",
    "RAL 8014",
    "FSM 71319",
    "RAL 9006",
    "RAL 9005",
  ] as const,

  FABRICS: [
    "Antracita 8488",
    "Basalt 8203",
    "Silver Melange 0028",
    "Perla 2979",
    "Sort 2170",
    "Naples Stone D113",
    "Ladakh 4655",
    "Silver 2821",
    "Marine 2145",
    "Azul 2018",
    "Granate 2101",
    "Verde Botella 2245",
    "Ash 0632",
    "Charcoal Tweed 0402",
    "Mineral 2831",
    "Integral 2838",
    "Tweed brown 0403",
    "Siroco 2226",
    "Beige 2038",
    "Marfil 2143",
    "Silver White 0364",
    "Silver Grey U190",
    "Natural 2929",
    "Blanco 2042",
    "Graphite Melange 0107",
    "Olive Green 0007",
    "Rain 1073",
    "Etain Link U786",
    "Celeste Link U795",
    "Cafe 2316",
    "Tandem Grafito 8446",
    "Ebony Tweed 7324",
  ] as const,

  PROJECTIONS: [160, 210, 260, 310, 360] as const,
  FALL_ANGLES: ["5-40", "5-50"] as const,
  TYPES,
  WIND_RATINGS: ["Opptil 12 m/s", "Opptil 15 m/s"] as const,

  MOTORS: {
    dooyaM45: {
      name: "Dooya M45",
      type: "wired" as const,
      features: ["Kablet retning/styring", "Stoppgrenser stilles på motor"],
    },
    somfyLT: {
      name: "Somfy LT",
      type: "wired" as const,
      features: ["Kablet retning/styring", "Stoppgrenser stilles på motor"],
    },
    somfyWT: {
      name: "Somfy WT",
      type: "wired" as const,
      features: [
        "Kablet retning/styring",
        "Stoppgrenser programmeres elektronisk",
      ],
    },
    somfyRTS: {
      name: "Somfy RTS",
      type: "wireless" as const,
      features: ["Integrert radiomottaker", "Styring via app mulig"],
    },
    somfyIO: {
      name: "Somfy IO",
      type: "wireless" as const,
      features: [
        "Integrert sender og radiomottaker",
        "HomeAssistant-kompatibel",
      ],
    },
  } as const,

  CONTROLS: {
    situioRTS: {
      name: "Somfy Situo 1 RTS",
      price: 789,
      requiresMotor: "Somfy RTS",
    },
    smooveRTS: {
      name: "Somfy Smoove Origin RTS",
      price: 689,
      requiresMotor: "Somfy RTS",
    },
    situioIO: {
      name: "Somfy Situo 1 IO",
      price: 789,
      requiresMotor: "Somfy IO",
    },
    amyIO: { name: "Somfy Amy 1 IO", price: 889, requiresMotor: "Somfy IO" },
    elko: { name: "Elko bryter", requiresMotor: "Somfy LT / WT / Dooya" },
    blebox: {
      name: "Blebox Shutterbox Rele",
      requiresMotor: "Somfy LT / WT / Dooya",
    },
  } as const,

  SENSORS: {
    eolis3d: {
      name: "Eolis 3D WireFree IO",
      price: 1669,
      features: ["Batteridrevet", "Bevegelsessensor"],
      requiresMotor: "Somfy IO",
    },
    eolisWire: {
      name: "Eolis WireFree IO",
      price: 2589,
      features: ["Vindsensor", "Sikkerhetsfunksjon"],
      requiresMotor: "Somfy IO",
    },
    eolisRTS: {
      name: "Somfy Eolis RTS",
      price: 1489,
      features: ["230V", "Sikkerhetsfunksjon"],
      requiresMotor: "Somfy RTS",
    },
  } as const,
} as const;
