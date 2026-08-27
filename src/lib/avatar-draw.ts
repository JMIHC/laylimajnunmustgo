import type { AvatarSpec, HairStyle } from "../data/types";

export const INK = "#1D2631";
export const WOOD = "#8A5E38";
export const WOOD2 = "#5C3D22";
export const SCREEN = "#E9F0F5";
export const PAPER = "#FCFCFA";
export const GRAY = "#8A96A3";
export const MONO = "Courier Prime, monospace";

export const S = (c: string, w = 2.2): string =>
  `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

export const lines = (x: number, y: number, ws: number[], c = GRAY, gap = 7, h = 2.6): string =>
  ws.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${h}" rx="1.3" fill="${c}"/>`).join("");

export const monitor = (x: number, y: number, w: number, h: number, inner = "", screen = SCREEN): string =>
  `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="4" fill="${INK}"/><rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="2" fill="${screen}"/>${inner}<rect x="${w / 2 - 4}" y="${h}" width="8" height="9" fill="${INK}"/><rect x="${w / 2 - 16}" y="${h + 9}" width="32" height="4" rx="2" fill="${INK}"/></g>`;

export const laptop = (x: number, y: number, inner = ""): string =>
  `<g transform="translate(${x} ${y})"><rect width="60" height="40" rx="3" fill="${INK}"/><rect x="3" y="3" width="54" height="34" rx="2" fill="${SCREEN}"/>${inner}<path d="M-6 40 H66 L62 47 H-2Z" fill="#2B3440"/></g>`;

export const desk = (c = "#3A4756"): string =>
  `<rect x="0" y="152" width="200" height="48" fill="${c}"/><rect x="0" y="150" width="200" height="4" fill="rgba(255,255,255,.25)"/>`;

export const keyboard = (): string =>
  `<rect x="52" y="160" width="96" height="16" rx="3" fill="#2B3440"/>${lines(58, 164, [84], "#C9D0D8", 0, 2)}${lines(58, 169, [70], "#C9D0D8", 0, 2)}`;

export const wave = (c: string): string =>
  `<path d="M8 22 l4 -6 l4 10 l4 -14 l4 16 l4 -10 l4 6 l4 -12 l4 14 l4 -8 l4 4 l4 -10 l4 12 l4 -6 l4 2" ${S(c, 2)}/>`;

export function steno(x: number, y: number, tripod = true): string {
  let k = "";
  for (let i = 0; i < 8; i++) {
    k += `<rect x="${-25 + i * 6.2}" y="-4" width="5" height="5" rx="1" fill="#C9D0D8"/><rect x="${-25 + i * 6.2}" y="3" width="5" height="5" rx="1" fill="#C9D0D8"/>`;
  }
  for (let i = 0; i < 4; i++) {
    k += `<rect x="${-12 + i * 6.2}" y="11" width="5" height="4" rx="1" fill="#C9D0D8"/>`;
  }
  return `<g transform="translate(${x} ${y})">${tripod ? `<g ${S(INK, 3)}><line x1="0" y1="18" x2="-20" y2="54"/><line x1="0" y1="18" x2="20" y2="54"/><line x1="0" y1="18" x2="0" y2="56"/></g>` : ""}<rect x="-30" y="-8" width="60" height="26" rx="4" fill="#2B3440"/>${k}</g>`;
}

export const headset = (boom = true): string =>
  `<path d="M70 92 A30 34 0 0 1 130 92" ${S(INK, 3.5)}/><rect x="64" y="86" width="9" height="18" rx="4" fill="${INK}"/><rect x="127" y="86" width="9" height="18" rx="4" fill="${INK}"/>${boom ? `<path d="M131 104 Q131 124 114 126" ${S(INK, 2.5)}/><circle cx="112" cy="126" r="3.5" fill="${INK}"/>` : ""}`;

export const student = (x: number): string =>
  `<g transform="translate(${x} 200)"><path d="M-22 0 Q-20 -22 0 -22 Q20 -22 22 0Z" fill="${INK}"/><circle cy="-32" r="12" fill="${INK}"/></g>`;

const HAIR: Record<HairStyle, (c: string) => string> = {
  crop: (c) => `<path d="M62 78 Q100 40 138 78 L138 92 Q100 74 62 92Z" fill="${c}"/>`,
  short: (c) => `<path d="M58 84 Q100 34 142 84 L142 96 Q126 74 100 74 Q74 74 58 96Z" fill="${c}"/>`,
  bob: (c) => `<path d="M56 90 Q100 30 144 90 L146 128 Q136 118 132 96 Q100 82 68 96 Q64 118 54 128Z" fill="${c}"/>`,
  wave: (c) => `<path d="M56 92 Q100 30 144 92 Q148 118 138 132 Q134 104 118 96 Q100 88 82 96 Q66 104 62 132 Q52 118 56 92Z" fill="${c}"/>`,
  bun: (c) => `<circle cx="100" cy="52" r="16" fill="${c}"/><path d="M60 86 Q100 44 140 86 L140 94 Q100 78 60 94Z" fill="${c}"/>`,
  gray: () => `<path d="M60 84 Q100 36 140 84 L140 96 Q124 76 100 76 Q76 76 60 96Z" fill="#B9BEC7"/>`,
};

const HAIRCOLOR: Record<string, string> = {
  "#8D5524": "#2A1A12",
  "#C68642": "#3B2314",
  "#E0AC69": "#5A3A1E",
  "#F1C27D": "#7A5230",
};

interface FigureOpts {
  lapel?: boolean;
  arm?: boolean;
  scrubs?: boolean;
  stetho?: boolean;
  gear?: string;
}

export function figure(a: AvatarSpec, o: FigureOpts = {}): string {
  const hairFill = HAIRCOLOR[a.skin] ?? "#2A1A12";
  const hair = HAIR[a.hair](hairFill);
  return `<g transform="translate(100 200) scale(.88) translate(-100 -200)">
    <path d="M36 200 Q40 136 100 134 Q160 136 164 200Z" fill="${a.top}"/>
    ${o.lapel ? `<path d="M88 134 L100 158 L112 134Z" fill="${PAPER}"/><path d="M76 134 L100 168 L124 134" ${S("rgba(0,0,0,.25)", 2)}/>` : ""}
    ${o.scrubs ? `<path d="M90 134 L100 148 L110 134Z" fill="${a.skin}"/>` : ""}
    ${o.arm ? `<path d="M136 144 Q150 128 147 110" ${S(a.top, 13)}/><path d="M147 112 Q149 100 148 92" ${S(a.skin, 11)}/><circle cx="148" cy="86" r="9" fill="${a.skin}"/><rect x="140" y="70" width="4.5" height="14" rx="2" fill="${a.skin}"/><rect x="145.5" y="67" width="4.5" height="16" rx="2" fill="${a.skin}"/><rect x="151" y="68" width="4.5" height="15" rx="2" fill="${a.skin}"/><rect x="156" y="72" width="4" height="12" rx="2" fill="${a.skin}"/>` : ""}
    <rect x="89" y="118" width="22" height="22" rx="6" fill="${a.skin}"/>
    <ellipse cx="100" cy="98" rx="34" ry="40" fill="${a.skin}"/>
    ${hair}
    <circle cx="88" cy="100" r="2.4" fill="#1a1a1a"/><circle cx="112" cy="100" r="2.4" fill="#1a1a1a"/>
    <path d="M92 116 Q100 122 108 116" ${S("#3a2a22", 2.5)}/>
    ${o.stetho ? `<path d="M82 136 Q80 152 96 156" ${S("#2B3440", 3)}/><path d="M118 136 Q120 152 104 156" ${S("#2B3440", 3)}/><circle cx="100" cy="160" r="6" fill="#2B3440" stroke="#C9D0D8" stroke-width="2"/>` : ""}
    ${o.gear ?? ""}
  </g>`;
}

type SceneFn = (c: string) => string;

export interface Scene {
  back: SceneFn;
  front: SceneFn;
  lapel?: boolean;
  arm?: boolean;
  scrubs?: boolean;
  stetho?: boolean;
  gear?: () => string;
}
