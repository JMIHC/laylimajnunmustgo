import type { Role } from "../data/types";
import {
  GRAY,
  INK,
  MONO,
  PAPER,
  SCREEN,
  WOOD,
  WOOD2,
  S,
  desk,
  figure,
  headset,
  keyboard,
  laptop,
  lines,
  monitor,
  steno,
  student,
  wave,
  type Scene,
} from "./avatar-draw";

const SCENES: Record<string, Scene> = {
  depo: {
    back: () =>
      `<g transform="translate(126 16)"><rect width="60" height="46" rx="4" fill="${INK}"/>${[0, 1, 2, 3]
        .map(
          (i) =>
            `<rect x="${4 + (i % 2) * 27}" y="${4 + Math.floor(i / 2) * 20}" width="25" height="18" rx="2" fill="${SCREEN}"/><circle cx="${16.5 + (i % 2) * 27}" cy="${13 + Math.floor(i / 2) * 20}" r="4" fill="${["#C68642", "#8D5524", "#E0AC69", "#F1C27D"][i]}"/>`,
        )
        .join("")}</g>`,
    front: () => steno(100, 160),
  },
  cart: {
    back: () => monitor(8, 26, 86, 60, lines(10, 12, [60, 52, 64, 44, 58], "#4A5563", 8)),
    front: () => steno(104, 160),
  },
  broadcast: {
    back: () =>
      monitor(
        108,
        18,
        84,
        58,
        `<rect x="8" y="8" width="26" height="11" rx="5.5" fill="#B23A2E"/><text x="21" y="16" text-anchor="middle" font-size="7" font-weight="700" font-family="IBM Plex Sans, sans-serif" fill="#fff">LIVE</text><rect x="4" y="34" width="76" height="16" fill="rgba(29,38,49,.85)"/>${lines(10, 38, [52, 40], "#fff", 6, 2.5)}`,
        "#8FB3D9",
      ),
    gear: () => headset(true),
    front: () => steno(96, 160),
  },
  hearing: {
    back: () =>
      `<g ${S("rgba(255,255,255,.6)", 2.5)}><path d="M64 66 A36 36 0 0 1 136 66"/><line x1="56" y1="66" x2="144" y2="66"/><rect x="94" y="30" width="12" height="12"/><line x1="100" y1="22" x2="100" y2="30"/><line x1="30" y1="42" x2="30" y2="140"/><line x1="22" y1="42" x2="38" y2="42"/><line x1="170" y1="42" x2="170" y2="140"/><line x1="162" y1="42" x2="178" y2="42"/></g>`,
    front: () =>
      `<rect x="0" y="146" width="200" height="54" fill="${WOOD}"/><rect x="0" y="144" width="200" height="5" fill="${WOOD2}"/>${steno(100, 152, false)}<rect x="60" y="172" width="80" height="16" rx="2" fill="${INK}"/><text x="100" y="183" text-anchor="middle" font-size="8" font-family="${MONO}" fill="#E8EBEE" letter-spacing="1.5">REPORTER</text>`,
  },
  agency: {
    back: (c) => {
      let g = "";
      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 7; i++) {
          g += `<rect x="${4 + i * 10}" y="${16 + j * 10}" width="9" height="9" fill="${(i * 7 + j * 3) % 5 === 0 ? c : "none"}" fill-opacity=".7" stroke="#C9D0D8" stroke-width="1"/>`;
        }
      }
      return `<g transform="translate(14 20)"><rect width="74" height="58" rx="3" fill="${PAPER}"/><rect width="74" height="12" rx="3" fill="${c}"/>${g}</g>`;
    },
    gear: () => headset(true),
    front: () =>
      desk() +
      laptop(
        118,
        105,
        `<circle cx="14" cy="16" r="6" fill="#C68642"/><circle cx="30" cy="16" r="6" fill="#8D5524"/><circle cx="46" cy="16" r="6" fill="#E0AC69"/>${lines(8, 27, [44], GRAY, 0, 2.5)}`,
      ),
  },
  scopist: {
    back: () => "",
    front: (c) => {
      let n = "";
      for (let i = 0; i < 9; i++) {
        n += `<rect x="${52 + (i * 5) % 9}" y="${112 + i * 6}" width="${8 + (i * 7) % 9}" height="2.2" fill="#4A5563"/>`;
      }
      return (
        desk() +
        `<rect x="46" y="104" width="26" height="62" fill="${PAPER}"/>${n}<rect x="118" y="112" width="60" height="44" rx="2" fill="${PAPER}"/>${lines(124, 119, [48, 44, 50, 36, 46], GRAY, 7)}<circle cx="60" cy="134" r="20" fill="rgba(255,255,255,.28)" stroke="${c}" stroke-width="4"/><line x1="75" y1="149" x2="90" y2="164" stroke="${c}" stroke-width="6" stroke-linecap="round"/><path d="M150 126 l14 14" stroke="#B23A2E" stroke-width="3" stroke-linecap="round"/>`
      );
    },
  },
  instructor: {
    back: (c) => {
      let k = "";
      for (let i = 0; i < 10; i++) {
        k += `<rect x="${48 + i * 11}" y="46" width="9" height="8" rx="1.5" fill="${INK}"/><rect x="${48 + i * 11}" y="56" width="9" height="8" rx="1.5" fill="${INK}"/>`;
      }
      for (let i = 0; i < 4; i++) {
        k += `<rect x="${81 + i * 11}" y="66" width="9" height="7" rx="1.5" fill="${c}"/>`;
      }
      return `<rect x="12" y="14" width="176" height="86" rx="3" fill="${PAPER}" stroke="#C9D0D8" stroke-width="2"/><text x="100" y="36" text-anchor="middle" font-size="10" font-weight="700" font-family="${MONO}" fill="${c}" letter-spacing="1.5">STKPWHRAO*EUFRPBLGTSDZ</text>${k}${lines(24, 84, [40], GRAY, 0, 2.4)}${lines(136, 84, [40], GRAY, 0, 2.4)}`;
    },
    front: () => student(34) + student(166),
  },
  trial: {
    back: (c) =>
      `<g transform="translate(8 14)"><rect width="106" height="72" rx="3" fill="${INK}"/><rect x="4" y="4" width="98" height="64" fill="${SCREEN}"/><text x="12" y="20" font-size="8" font-weight="700" font-family="${MONO}" fill="${INK}">EXHIBIT 14</text><rect x="12" y="26" width="52" height="34" rx="2" fill="#fff" stroke="#C9D0D8"/>${lines(16, 31, [42, 36, 44, 28], GRAY, 7)}<rect x="72" y="44" width="8" height="16" fill="${c}"/><rect x="82" y="32" width="8" height="28" fill="${c}"/><rect x="92" y="38" width="8" height="22" fill="${c}" fill-opacity=".6"/></g>`,
    front: () => desk() + laptop(114, 105, lines(8, 10, [40, 30, 42], GRAY, 7)),
  },
  courtadmin: {
    back: () => {
      let s = "";
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        s += `<circle cx="${46 + Math.cos(a) * 22}" cy="${48 + Math.sin(a) * 22}" r="1.6" fill="rgba(255,255,255,.7)"/>`;
      }
      return `<circle cx="46" cy="48" r="28" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2.5"/><circle cx="46" cy="48" r="16" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2"/>${s}`;
    },
    lapel: true,
    front: (c) =>
      desk() +
      `<rect x="12" y="150" width="46" height="7" rx="2" fill="${WOOD2}"/><g transform="translate(34 136) rotate(-28)"><rect x="-17" y="-8" width="34" height="16" rx="3" fill="${WOOD2}"/><rect x="-3" y="8" width="6" height="28" rx="2" fill="${WOOD}"/></g><g transform="translate(134 116)"><rect width="50" height="40" rx="2" fill="${PAPER}"/><rect x="17" y="-4" width="16" height="7" rx="2" fill="${INK}"/>${[0, 1, 2].map((i) => `<path d="M6 ${11 + i * 10} l3 3 l6 -6" ${S(c, 2)}/><rect x="19" y="${10 + i * 10}" width="24" height="2.4" rx="1.2" fill="${GRAY}"/>`).join("")}</g>`,
  },
  paralegal: {
    back: (c) => {
      let b = "";
      const cols = [c, "#B57B4A", "#8A96A3", c, "#B23A2E"];
      for (let i = 0; i < 12; i++) {
        const col = cols[i % 5] ?? c;
        b += `<rect x="${10 + i * 15}" y="${22 + (i % 3) * 3}" width="13" height="${68 - (i % 3) * 3}" rx="1.5" fill="${col}"/><rect x="${13 + i * 15}" y="${28 + (i % 3) * 3}" width="7" height="16" rx="1" fill="${PAPER}"/>`;
      }
      return b + `<rect x="6" y="90" width="188" height="6" fill="${WOOD2}"/>`;
    },
    front: () =>
      desk() +
      `<g transform="translate(112 118)"><rect x="6" y="-8" width="44" height="12" fill="${PAPER}"/><rect x="10" y="-14" width="36" height="8" fill="${PAPER}"/><rect width="56" height="36" rx="2" fill="#B57B4A"/><rect y="-6" width="20" height="8" rx="2" fill="#B57B4A"/><g ${S("rgba(0,0,0,.25)", 1.5)}><line x1="0" y1="10" x2="56" y2="10"/><line x1="0" y1="18" x2="56" y2="18"/><line x1="0" y1="26" x2="56" y2="26"/></g></g>`,
  },
  legaltrans: {
    back: (c) => monitor(106, 22, 86, 60, wave(c) + lines(8, 36, [62, 50, 66], "#4A5563", 6)),
    gear: () => headset(false),
    front: () => desk() + keyboard(),
  },
  expert: {
    back: () => "",
    lapel: true,
    arm: true,
    front: () =>
      `<rect x="0" y="154" width="200" height="46" fill="${WOOD}"/><rect x="0" y="150" width="200" height="6" fill="${WOOD2}"/><g ${S(WOOD2, 2)}><line x1="50" y1="164" x2="50" y2="200"/><line x1="100" y1="164" x2="100" y2="200"/><line x1="150" y1="164" x2="150" y2="200"/></g><path d="M58 152 Q58 130 74 124" ${S(INK, 3)}/><ellipse cx="78" cy="122" rx="5" ry="7" transform="rotate(30 78 122)" fill="${INK}"/>`,
  },
  cs: {
    back: (c) =>
      `<g transform="translate(12 18)"><rect width="100" height="68" rx="4" fill="${PAPER}" stroke="#C9D0D8" stroke-width="1.5"/><rect width="100" height="12" rx="4" fill="${c}"/>${[0, 1, 2].map((i) => `<circle cx="14" cy="${26 + i * 15}" r="5.5" ${S(c, 1.8)}/><path d="M11 ${26 + i * 15} l2 2 l4 -4" ${S(c, 1.8)}/><rect x="26" y="${24.5 + i * 15}" width="${56 - i * 12}" height="3" rx="1.5" fill="${GRAY}"/>`).join("")}</g><path d="M136 22 h48 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 h-28 l-10 9 v-9 h-10 a6 6 0 0 1 -6 -6 v-20 a6 6 0 0 1 6 -6z" fill="${c}"/><circle cx="150" cy="38" r="2.5" fill="#fff"/><circle cx="160" cy="38" r="2.5" fill="#fff"/><circle cx="170" cy="38" r="2.5" fill="#fff"/>`,
    gear: () => headset(true),
    front: () => desk() + laptop(118, 105, lines(8, 10, [40, 28, 42], GRAY, 7)),
  },
  asr: {
    back: (c) =>
      monitor(
        104,
        16,
        88,
        64,
        wave(c) +
          lines(8, 38, [64, 40], "#4A5563", 8) +
          `<rect x="30" y="45" width="20" height="8" fill="rgba(178,58,46,.25)"/><path d="M30 54 q3 -2.5 6 0 t6 0 t6 0" ${S("#B23A2E", 1.5)}/>`,
      ) +
      `<g transform="translate(20 30)"><rect width="30" height="30" rx="4" fill="${INK}"/><rect x="9" y="9" width="12" height="12" rx="2" fill="${c}"/><g ${S("#C9D0D8", 2)}><line x1="8" y1="-4" x2="8" y2="0"/><line x1="15" y1="-4" x2="15" y2="0"/><line x1="22" y1="-4" x2="22" y2="0"/><line x1="8" y1="30" x2="8" y2="34"/><line x1="15" y1="30" x2="15" y2="34"/><line x1="22" y1="30" x2="22" y2="34"/><line x1="-4" y1="8" x2="0" y2="8"/><line x1="-4" y1="15" x2="0" y2="15"/><line x1="-4" y1="22" x2="0" y2="22"/><line x1="30" y1="8" x2="34" y2="8"/><line x1="30" y1="15" x2="34" y2="15"/><line x1="30" y1="22" x2="34" y2="22"/></g></g>`,
    front: () => desk() + keyboard(),
  },
  access: {
    back: () =>
      `<g transform="translate(18 20)"><rect width="164" height="34" rx="4" fill="${INK}"/><rect x="8" y="8" width="26" height="18" rx="3" fill="${PAPER}"/><text x="21" y="21" text-anchor="middle" font-size="10" font-weight="700" font-family="${MONO}" fill="${INK}">CC</text>${lines(42, 10, [104, 80], "#fff", 8, 3)}</g><g transform="translate(166 92)"><circle r="19" fill="${PAPER}"/><path d="M-5 -8 a8 8 0 0 1 14 5 c0 6 -6 7 -6 12 a3.5 3.5 0 0 1 -7 0" ${S(INK, 2.4)}/><line x1="-10" y1="10" x2="10" y2="-10" ${S(INK, 2.4)}/></g>`,
    front: (c) =>
      desk() +
      `<g transform="translate(22 118)"><rect width="54" height="46" rx="3" fill="${PAPER}"/><rect x="19" y="-4" width="16" height="7" rx="2" fill="${INK}"/>${[0, 1, 2].map((i) => `<path d="M7 ${13 + i * 11} l3 3 l6 -6" ${S(c, 2)}/><rect x="21" y="${12 + i * 11}" width="26" height="2.6" rx="1.3" fill="${GRAY}"/>`).join("")}</g>`,
  },
  health: {
    back: () =>
      `<rect x="22" y="22" width="36" height="36" rx="7" fill="${PAPER}"/><rect x="36" y="28" width="8" height="24" fill="#B23A2E"/><rect x="28" y="36" width="24" height="8" fill="#B23A2E"/>`,
    scrubs: true,
    stetho: true,
    front: (c) =>
      `<g transform="translate(120 118)"><rect width="54" height="68" rx="5" fill="${INK}"/><rect x="4" y="6" width="46" height="54" rx="2" fill="${SCREEN}"/><path d="M8 34 h8 l4 -10 l5 20 l5 -24 l5 18 l4 -4 h11" ${S(c, 2)}/>${lines(9, 44, [36, 28], GRAY, 6)}<circle cx="27" cy="64" r="2.4" fill="#C9D0D8"/></g>`,
  },
  techwriter: {
    back: (c) =>
      `<g transform="translate(12 16)"><rect width="102" height="72" rx="4" fill="${PAPER}" stroke="#C9D0D8" stroke-width="1.5"/><rect x="10" y="10" width="42" height="5" rx="2" fill="${c}"/>${lines(10, 21, [80, 72, 60], GRAY, 6)}<rect x="10" y="44" width="82" height="18" rx="2" fill="${INK}"/><text x="16" y="56" font-size="9" font-family="${MONO}" fill="#8FB3D9">&lt;/&gt; </text>${lines(36, 50, [40], "#8FB3D9", 0, 2)}</g>`,
    front: () =>
      desk() +
      laptop(112, 105, lines(8, 10, [40, 30, 42, 24], GRAY, 7)) +
      `<g transform="translate(28 128)"><rect width="22" height="24" rx="3" fill="${PAPER}"/><path d="M22 6 a7 7 0 0 1 0 14" ${S(PAPER, 3)}/></g>`,
  },
  ea: {
    back: (c) =>
      `<circle cx="40" cy="46" r="21" fill="${PAPER}" stroke="${INK}" stroke-width="2.5"/><g ${S(INK, 2.2)}><line x1="40" y1="46" x2="40" y2="32"/><line x1="40" y1="46" x2="49" y2="50"/></g><g transform="translate(126 22)"><rect width="62" height="48" rx="2" fill="${PAPER}" stroke="${WOOD2}" stroke-width="2.5"/><rect x="23" y="8" width="16" height="8" rx="1.5" fill="${c}"/><rect x="7" y="30" width="14" height="8" rx="1.5" fill="${GRAY}"/><rect x="24" y="30" width="14" height="8" rx="1.5" fill="${GRAY}"/><rect x="41" y="30" width="14" height="8" rx="1.5" fill="${GRAY}"/><g ${S(GRAY, 1.5)}><line x1="31" y1="16" x2="31" y2="24"/><line x1="14" y1="24" x2="48" y2="24"/><line x1="14" y1="24" x2="14" y2="30"/><line x1="31" y1="24" x2="31" y2="30"/><line x1="48" y1="24" x2="48" y2="30"/></g></g>`,
    lapel: true,
    front: () =>
      desk() +
      `<g transform="translate(58 118)"><path d="M0 4 Q42 -4 84 4 V42 Q42 34 0 42Z" fill="${PAPER}"/><line x1="42" y1="1" x2="42" y2="38" stroke="#C9D0D8" stroke-width="1.5"/>${lines(8, 11, [26, 26, 20], GRAY, 7)}${lines(50, 11, [26, 20, 26], GRAY, 7)}</g><path d="M128 156 L154 130" ${S(INK, 4)}/><path d="M154 130 l4 -4" ${S("#B23A2E", 4)}/>`,
  },
  speaker: {
    back: (c) =>
      `<g transform="translate(14 14)"><rect width="172" height="62" rx="3" fill="${INK}"/><rect x="4" y="4" width="164" height="54" fill="${PAPER}"/><rect x="12" y="12" width="70" height="6" rx="2" fill="${c}"/>${lines(12, 26, [60, 48, 56], GRAY, 8)}<text x="120" y="46" font-size="20" font-weight="600" font-family="Newsreader, serif" fill="${c}">CEU</text></g>`,
    front: () =>
      `<path d="M58 200 L66 160 H134 L142 200Z" fill="${WOOD}"/><rect x="62" y="156" width="76" height="8" rx="2" fill="${WOOD2}"/><path d="M122 156 Q128 142 116 134" ${S(INK, 3)}/><ellipse cx="114" cy="132" rx="5" ry="7" transform="rotate(-35 114 132)" fill="${INK}"/><circle cx="22" cy="190" r="14" fill="${INK}"/><circle cx="178" cy="190" r="14" fill="${INK}"/><circle cx="48" cy="200" r="14" fill="${INK}"/><circle cx="152" cy="200" r="14" fill="${INK}"/>`,
  },
};

export function avatarSVG(role: Role, color: string): string {
  const sc = SCENES[role.scene];
  if (!sc) {
    return `<svg viewBox="0 0 200 200" role="img" aria-hidden="true"><circle cx="100" cy="112" r="78" fill="rgba(255,255,255,.14)"/></svg>`;
  }
  return `<svg viewBox="0 0 200 200" role="img" aria-hidden="true">
    <circle cx="100" cy="112" r="78" fill="rgba(255,255,255,.14)"/>
    ${sc.back(color)}
    ${figure(role.av, { lapel: sc.lapel, arm: sc.arm, scrubs: sc.scrubs, stetho: sc.stetho, gear: sc.gear ? sc.gear() : "" })}
    ${sc.front(color)}
  </svg>`;
}

export function knownScenes(): string[] {
  return Object.keys(SCENES);
}
