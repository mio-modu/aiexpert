/**
 * The drawn objects.
 *
 * T13's rule is 반짝임 금지 · 표면은 보송하게, so each object is built from flat
 * tonal faces — a lit face, a side face, a shade face — plus one soft contact
 * shadow. No specular highlight, no glossy gradient. The light sits upper-left
 * for everything on the site, which is why every shade face is on the same side.
 *
 * Nothing here depicts a person. That is the point: it keeps the site clear of
 * portrait and copyright claims, and it means a flow can be redrawn the day a
 * platform changes it.
 */

type MarkName = "ticket" | "id" | "card" | "star" | "parcel";

/** Small object marks used on guide cards. 52×40 box. */
export function ObjectMark({ name }: { name: MarkName }) {
  const common = {
    width: 52,
    height: 40,
    viewBox: "0 0 52 40",
    "aria-hidden": true as const,
    style: { flex: "none" as const },
  };

  if (name === "ticket") {
    return (
      <svg {...common}>
        <ellipse cx="26" cy="36" rx="19" ry="3.4" fill="var(--cast-soft)" />
        <rect x="5" y="10" width="42" height="23" rx="5" fill="var(--o-ju-s)" />
        <rect x="5" y="7" width="42" height="23" rx="5" fill="var(--o-ju)" />
        <path d="M34 7v23" stroke="var(--o-bone)" strokeWidth="1.8" strokeDasharray="3 4" opacity=".85" />
        <rect x="11" y="13" width="17" height="3" rx="1.5" fill="var(--o-bone)" opacity=".9" />
        <rect x="11" y="20" width="12" height="3" rx="1.5" fill="var(--o-bone)" opacity=".55" />
      </svg>
    );
  }

  if (name === "id") {
    return (
      <svg {...common}>
        <ellipse cx="26" cy="36" rx="17" ry="3.4" fill="var(--cast-soft)" />
        <rect x="10" y="9" width="32" height="25" rx="4" fill="var(--o-vi-s)" />
        <rect x="10" y="6" width="32" height="25" rx="4" fill="var(--o-vi)" />
        <circle cx="20" cy="16" r="4" fill="var(--o-bone)" opacity=".92" />
        <path
          d="M15 26c1.4-2.8 3-4.2 5-4.2s3.6 1.4 5 4.2"
          fill="none"
          stroke="var(--o-bone)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity=".92"
        />
        <rect x="29" y="14" width="9" height="2.4" rx="1.2" fill="var(--o-cy)" opacity=".8" />
        <rect x="29" y="20" width="9" height="2.4" rx="1.2" fill="var(--o-cy)" opacity=".5" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg {...common}>
        <ellipse cx="26" cy="36" rx="17" ry="3.4" fill="var(--cast-soft)" />
        <rect x="9" y="11" width="34" height="22" rx="4" fill="var(--o-bone-s)" />
        <rect x="9" y="8" width="34" height="22" rx="4" fill="var(--o-bone)" />
        <path
          d="M26 11.5l3.2 6.6 7.3 1-5.3 5.2 1.3 7.2-6.5-3.5-6.5 3.5 1.3-7.2-5.3-5.2 7.3-1z"
          fill="var(--o-ju)"
        />
      </svg>
    );
  }

  if (name === "card") {
    return (
      <svg {...common}>
        <ellipse cx="26" cy="36" rx="18" ry="3.4" fill="var(--cast-soft)" />
        <rect x="7" y="12" width="38" height="22" rx="4" fill="var(--o-bone-s)" />
        <rect x="7" y="9" width="38" height="22" rx="4" fill="var(--o-bone)" />
        <rect x="7" y="15" width="38" height="4" fill="var(--o-vi)" opacity=".85" />
        <circle cx="38" cy="29" r="7.5" fill="var(--o-ju)" />
        <path d="M35 26l6 6M41 26l-6 6" stroke="var(--o-bone)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <ellipse cx="26" cy="36" rx="18" ry="3.4" fill="var(--cast-soft)" />
      <path d="M8 15l18-8 18 8v14l-18 8-18-8z" fill="var(--o-vi-s)" />
      <path d="M8 13l18-8 18 8-18 8z" fill="var(--o-vi)" />
      <path d="M26 21v14l18-8V13z" fill="var(--o-vi-d)" />
      <rect x="20" y="16" width="12" height="3" rx="1.5" fill="var(--o-ju)" />
    </svg>
  );
}

/**
 * The hero still life: passport, ticket, bank card, phone, and the 인장 seal
 * stamped over the group.
 */
export function HeroScene() {
  return (
    <svg
      className="svg-w"
      viewBox="0 0 520 480"
      role="img"
      aria-label="A passport, a concert ticket, a bank card and a phone showing an identity-verification screen, drawn as matte objects, with a Korean seal stamped over them."
    >
      <defs>
        <filter id="h-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
      </defs>

      {/* contact shadows, softest first */}
      <ellipse cx="206" cy="416" rx="152" ry="26" fill="var(--cast-soft)" filter="url(#h-soft)" />
      <ellipse cx="388" cy="438" rx="86" ry="18" fill="var(--cast)" filter="url(#h-soft)" />

      {/* 여권 — 보라 violet, back of the group */}
      <g transform="rotate(-9 150 210)">
        <rect x="58" y="112" width="186" height="248" rx="14" fill="var(--o-vi-d)" />
        <rect x="58" y="106" width="186" height="248" rx="14" fill="var(--o-vi-s)" />
        <rect x="58" y="100" width="186" height="248" rx="14" fill="var(--o-vi)" />
        <rect x="84" y="128" width="134" height="1.6" rx="0.8" fill="var(--o-cy)" opacity=".62" />
        <circle cx="151" cy="208" r="36" fill="none" stroke="var(--o-cy)" strokeWidth="1.6" opacity=".6" />
        <circle cx="151" cy="208" r="25" fill="none" stroke="var(--o-cy)" strokeWidth="1.2" opacity=".42" />
        <path d="M151 183v50M126 208h50" stroke="var(--o-cy)" strokeWidth="1.1" opacity=".38" />
        <rect x="96" y="286" width="110" height="7" rx="3.5" fill="var(--o-cy)" opacity=".5" />
        <rect x="112" y="304" width="78" height="5" rx="2.5" fill="var(--o-cy)" opacity=".32" />
      </g>

      {/* 티켓 — 주朱 vermilion, the hero object */}
      <g className="float" transform="rotate(7 250 250)">
        <rect x="126" y="186" width="252" height="118" rx="13" fill="var(--o-ju-s)" />
        <rect x="126" y="178" width="252" height="118" rx="13" fill="var(--o-ju)" />
        <path d="M310 178v118" stroke="var(--o-bone)" strokeWidth="2.4" strokeDasharray="5 7" opacity=".82" />
        <circle cx="310" cy="178" r="7" fill="var(--paper)" />
        <circle cx="310" cy="296" r="7" fill="var(--paper)" />
        <rect x="148" y="202" width="64" height="7" rx="3.5" fill="var(--o-bone)" opacity=".92" />
        <rect x="148" y="221" width="130" height="13" rx="4" fill="var(--o-bone)" opacity=".95" />
        <rect x="148" y="244" width="96" height="6" rx="3" fill="var(--o-bone)" opacity=".6" />
        <rect x="148" y="258" width="112" height="6" rx="3" fill="var(--o-bone)" opacity=".45" />
        <rect x="148" y="275" width="46" height="6" rx="3" fill="var(--o-bone)" opacity=".38" />
        <g fill="var(--o-bone)" opacity=".88">
          <rect x="326" y="206" width="3" height="62" />
          <rect x="333" y="206" width="2" height="62" />
          <rect x="339" y="206" width="4" height="62" />
          <rect x="347" y="206" width="2" height="62" />
          <rect x="353" y="206" width="3" height="62" />
          <rect x="360" y="206" width="2" height="62" />
          <rect x="366" y="206" width="4" height="62" />
        </g>
        <rect x="326" y="278" width="44" height="5" rx="2.5" fill="var(--o-bone)" opacity=".5" />
      </g>

      {/* 카드 — 백 bone, front left, carrying the declined mark */}
      <g className="float-b" transform="rotate(-14 150 352)">
        <rect x="44" y="306" width="196" height="124" rx="14" fill="var(--o-bone-s)" />
        <rect x="44" y="298" width="196" height="124" rx="14" fill="var(--o-bone)" />
        <rect x="66" y="326" width="34" height="26" rx="5" fill="var(--o-cy)" opacity=".9" />
        <path d="M66 339h34M83 326v26" stroke="var(--o-bone-s)" strokeWidth="1.4" opacity=".8" />
        <g fill="var(--o-ink)" opacity=".72">
          <rect x="66" y="372" width="28" height="7" rx="3.5" />
          <rect x="100" y="372" width="28" height="7" rx="3.5" />
          <rect x="134" y="372" width="28" height="7" rx="3.5" />
          <rect x="168" y="372" width="28" height="7" rx="3.5" />
        </g>
        <rect x="66" y="394" width="62" height="5" rx="2.5" fill="var(--o-ink)" opacity=".38" />
        <g transform="translate(196 390)">
          <circle r="19" fill="var(--o-ju)" />
          <path d="M-7-7 7 7M7-7-7 7" stroke="var(--o-bone)" strokeWidth="3.4" strokeLinecap="round" />
        </g>
      </g>

      {/* 폰 — 흑 ink, right, showing 본인인증 */}
      <g transform="rotate(5 388 312)">
        <rect x="310" y="196" width="156" height="248" rx="23" fill="var(--o-ink-s)" />
        <rect x="310" y="188" width="156" height="248" rx="23" fill="var(--o-ink)" />
        <rect x="318" y="196" width="140" height="232" rx="15" fill="var(--o-bone)" />
        <g clipPath="url(#h-screen)">
          <rect x="318" y="196" width="140" height="34" fill="var(--o-vi)" />
          <rect x="330" y="208" width="54" height="8" rx="4" fill="var(--o-bone)" opacity=".92" />
          <rect x="330" y="246" width="44" height="6" rx="3" fill="var(--o-ink)" opacity=".4" />
          <rect x="330" y="258" width="116" height="22" rx="6" fill="var(--o-bone-s)" opacity=".7" />
          <rect x="330" y="292" width="58" height="6" rx="3" fill="var(--o-ink)" opacity=".4" />
          <rect x="330" y="304" width="116" height="22" rx="6" fill="var(--o-bone-s)" opacity=".7" />
          <rect x="330" y="338" width="36" height="6" rx="3" fill="var(--o-ink)" opacity=".4" />
          <rect x="330" y="350" width="116" height="22" rx="6" fill="var(--o-bone-s)" opacity=".7" />
          <rect x="330" y="386" width="116" height="26" rx="13" fill="var(--o-ju)" />
          <rect x="366" y="396" width="44" height="7" rx="3.5" fill="var(--o-bone)" opacity=".95" />
        </g>
        <rect x="372" y="200" width="32" height="5" rx="2.5" fill="var(--o-ink)" opacity=".55" />
      </g>

      <clipPath id="h-screen">
        <rect x="318" y="196" width="140" height="232" rx="15" />
      </clipPath>

      {/* 인장 — stamped over the scene */}
      <g transform="rotate(-11 452 136)">
        <rect x="406" y="90" width="92" height="92" rx="10" fill="none" stroke="var(--o-ju)" strokeWidth="5" />
        <rect x="416" y="100" width="72" height="72" rx="4" fill="none" stroke="var(--o-ju)" strokeWidth="2" opacity=".55" />
        <text
          x="452"
          y="151"
          textAnchor="middle"
          fill="var(--o-ju)"
          style={{ fontFamily: "var(--font-han)", fontWeight: 900, fontSize: "46px" }}
        >
          검
        </text>
      </g>
    </svg>
  );
}

/**
 * T21 — three booking screens in a staircase. The front one casts the hardest
 * shadow, the ones behind cast progressively lighter, which is the rule.
 * T21 also says 진짜 데이터만, so the values are real-looking and the warning on
 * the front screen is the exact failure these guides exist to prevent.
 */
export function StackedScreens() {
  return (
    <svg
      className="svg-w"
      viewBox="0 0 760 340"
      style={{ maxWidth: "720px" }}
      role="img"
      aria-label="Three Korean booking screens stacked in a staircase: identity verification showing a name mismatch warning, seat selection, and payment."
    >
      <defs>
        <filter id="k1" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="k2" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="k3" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <clipPath id="kc3">
          <rect x="430" y="52" width="286" height="202" rx="11" />
        </clipPath>
        <clipPath id="kc2">
          <rect x="232" y="88" width="286" height="202" rx="11" />
        </clipPath>
        <clipPath id="kc1">
          <rect x="34" y="124" width="286" height="202" rx="11" />
        </clipPath>
      </defs>

      {/* back: 결제 */}
      <ellipse cx="578" cy="266" rx="130" ry="13" fill="var(--cast-soft)" filter="url(#k3)" />
      <rect x="424" y="46" width="298" height="214" rx="14" fill="var(--o-ink)" />
      <rect x="430" y="52" width="286" height="202" rx="11" fill="var(--o-bone)" />
      <g clipPath="url(#kc3)">
        <rect x="430" y="52" width="286" height="30" fill="var(--o-vi)" />
        <text x="444" y="72" fill="var(--o-bone)" style={{ fontFamily: "var(--font-han)", fontWeight: 700, fontSize: "13px" }}>
          결제
        </text>
        <text x="444" y="108" fill="var(--o-ink)" opacity=".55" style={{ fontFamily: "var(--font-data)", fontSize: "9px" }}>
          TOTAL
        </text>
        <text x="444" y="132" fill="var(--o-ink)" style={{ fontFamily: "var(--font-latin)", fontWeight: 900, fontSize: "22px" }}>
          ₩ 198,000
        </text>
        <rect x="444" y="148" width="258" height="1" fill="var(--o-ink)" opacity=".12" />
        <text x="444" y="170" fill="var(--o-ink)" opacity=".6" style={{ fontFamily: "var(--font-han)", fontWeight: 700, fontSize: "11px" }}>
          해외 발행 카드
        </text>
        <rect x="444" y="180" width="258" height="26" rx="6" fill="var(--o-bone-s)" opacity=".65" />
        <rect x="444" y="216" width="258" height="28" rx="14" fill="var(--o-ju)" />
        <text
          x="573"
          y="235"
          textAnchor="middle"
          fill="var(--o-bone)"
          style={{ fontFamily: "var(--font-han)", fontWeight: 700, fontSize: "12px" }}
        >
          결제하기
        </text>
      </g>

      {/* middle: 좌석 선택 */}
      <ellipse cx="380" cy="302" rx="134" ry="14" fill="var(--cast-soft)" filter="url(#k2)" />
      <rect x="226" y="82" width="298" height="214" rx="14" fill="var(--o-ink)" />
      <rect x="232" y="88" width="286" height="202" rx="11" fill="var(--o-bone)" />
      <g clipPath="url(#kc2)">
        <rect x="232" y="88" width="286" height="30" fill="var(--o-vi)" />
        <text x="246" y="108" fill="var(--o-bone)" style={{ fontFamily: "var(--font-han)", fontWeight: 700, fontSize: "13px" }}>
          좌석 선택
        </text>
        <rect x="286" y="130" width="178" height="12" rx="6" fill="var(--o-ink)" opacity=".22" />
        <text
          x="375"
          y="139"
          textAnchor="middle"
          fill="var(--o-bone)"
          style={{ fontFamily: "var(--font-han)", fontWeight: 700, fontSize: "8px" }}
        >
          STAGE
        </text>
        <rect x="258" y="156" width="234" height="34" rx="4" fill="var(--o-ju)" opacity=".2" />
        <rect x="258" y="196" width="234" height="34" rx="4" fill="var(--o-vi)" opacity=".18" />
        <rect x="258" y="236" width="234" height="34" rx="4" fill="var(--o-ink)" opacity=".1" />
        <g fill="var(--o-ju)">
          <rect x="336" y="166" width="13" height="13" rx="3" />
          <rect x="354" y="166" width="13" height="13" rx="3" />
          <rect x="372" y="166" width="13" height="13" rx="3" />
        </g>
        <text x="266" y="176" fill="var(--o-ink)" opacity=".6" style={{ fontFamily: "var(--font-data)", fontSize: "8px" }}>
          VIP
        </text>
        <text x="266" y="216" fill="var(--o-ink)" opacity=".6" style={{ fontFamily: "var(--font-data)", fontSize: "8px" }}>
          R
        </text>
        <text x="266" y="256" fill="var(--o-ink)" opacity=".6" style={{ fontFamily: "var(--font-data)", fontSize: "8px" }}>
          S
        </text>
      </g>

      {/* front: 본인인증 — hardest shadow, and the real failure */}
      <ellipse cx="182" cy="338" rx="138" ry="15" fill="var(--cast)" filter="url(#k1)" />
      <rect x="28" y="118" width="298" height="214" rx="14" fill="var(--o-ink)" />
      <rect x="34" y="124" width="286" height="202" rx="11" fill="var(--o-bone)" />
      <g clipPath="url(#kc1)">
        <rect x="34" y="124" width="286" height="30" fill="var(--o-vi)" />
        <text x="48" y="144" fill="var(--o-bone)" style={{ fontFamily: "var(--font-han)", fontWeight: 700, fontSize: "13px" }}>
          본인인증
        </text>
        <text x="48" y="176" fill="var(--o-ink)" opacity=".55" style={{ fontFamily: "var(--font-data)", fontSize: "9px" }}>
          PASSPORT NAME
        </text>
        <rect x="48" y="184" width="258" height="24" rx="6" fill="var(--o-bone-s)" opacity=".62" />
        <text x="58" y="200" fill="var(--o-ink)" opacity=".8" style={{ fontFamily: "var(--font-latin)", fontWeight: 600, fontSize: "11px" }}>
          MARIA ELENA SANTOS CRUZ
        </text>
        <text x="48" y="226" fill="var(--o-ink)" opacity=".55" style={{ fontFamily: "var(--font-data)", fontSize: "9px" }}>
          DATE OF BIRTH
        </text>
        <rect x="48" y="234" width="124" height="24" rx="6" fill="var(--o-bone-s)" opacity=".62" />
        <text x="58" y="250" fill="var(--o-ink)" opacity=".8" style={{ fontFamily: "var(--font-data)", fontSize: "11px" }}>
          2004-07-19
        </text>
        <rect x="48" y="268" width="258" height="30" rx="6" fill="var(--o-ju)" opacity=".14" />
        <circle cx="62" cy="283" r="6.5" fill="var(--o-ju)" />
        <path d="M62 280v3M62 286h.01" stroke="var(--o-bone)" strokeWidth="1.8" strokeLinecap="round" />
        <text x="76" y="287" fill="var(--o-ju)" style={{ fontFamily: "var(--font-han)", fontWeight: 700, fontSize: "10px" }}>
          팬클럽 정보와 일치하지 않습니다
        </text>
      </g>
      <rect x="152" y="128" width="50" height="5" rx="2.5" fill="var(--o-ink)" opacity=".5" />
    </svg>
  );
}

/** Larger object for a flow row. Cycles by index so no two neighbours match. */
export function StepObject({ index }: { index: number }) {
  const common = {
    width: 112,
    height: 84,
    viewBox: "0 0 112 84",
    style: { maxWidth: "100%" },
    "aria-hidden": true as const,
  };

  switch (index % 5) {
    case 0:
      // two sites, one of them wrong
      return (
        <svg {...common}>
          <ellipse cx="56" cy="76" rx="38" ry="6" fill="var(--cast-soft)" />
          <rect x="12" y="20" width="44" height="50" rx="6" fill="var(--o-ink)" opacity=".16" />
          <rect x="34" y="12" width="56" height="56" rx="8" fill="var(--o-vi-s)" />
          <rect x="34" y="8" width="56" height="56" rx="8" fill="var(--o-vi)" />
          <rect x="42" y="16" width="40" height="11" rx="3" fill="var(--o-bone)" opacity=".92" />
          <rect x="42" y="34" width="26" height="5" rx="2.5" fill="var(--o-bone)" opacity=".5" />
          <rect x="42" y="45" width="34" height="5" rx="2.5" fill="var(--o-bone)" opacity=".35" />
          <circle cx="96" cy="54" r="11" fill="var(--o-ju)" />
          <path d="M91 54l3.6 3.6L101 50" stroke="var(--o-bone)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 1:
      // passport
      return (
        <svg {...common}>
          <ellipse cx="56" cy="76" rx="36" ry="6" fill="var(--cast-soft)" />
          <rect x="24" y="14" width="64" height="56" rx="7" fill="var(--o-vi-d)" />
          <rect x="24" y="10" width="64" height="56" rx="7" fill="var(--o-vi)" />
          <circle cx="46" cy="30" r="10" fill="var(--o-bone)" opacity=".92" />
          <path
            d="M34 50c3-6.4 7-9.6 12-9.6s9 3.2 12 9.6"
            fill="none"
            stroke="var(--o-bone)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity=".92"
          />
          <rect x="62" y="26" width="18" height="4" rx="2" fill="var(--o-cy)" opacity=".85" />
          <rect x="62" y="36" width="18" height="4" rx="2" fill="var(--o-cy)" opacity=".55" />
          <rect x="62" y="46" width="12" height="4" rx="2" fill="var(--o-cy)" opacity=".35" />
        </svg>
      );
    case 2:
      // clock, with the lead time on it
      return (
        <svg {...common}>
          <ellipse cx="56" cy="76" rx="34" ry="6" fill="var(--cast-soft)" />
          <circle cx="52" cy="40" r="28" fill="var(--o-vi-d)" />
          <circle cx="52" cy="36" r="28" fill="var(--o-vi)" />
          <circle cx="52" cy="36" r="20" fill="var(--o-bone)" />
          <path d="M52 36V22M52 36l10 7" stroke="var(--o-ju)" strokeWidth="3.4" strokeLinecap="round" />
          <rect x="80" y="14" width="24" height="24" rx="5" fill="var(--o-ju)" />
          <text
            x="92"
            y="32"
            textAnchor="middle"
            fill="var(--o-bone)"
            style={{ fontFamily: "var(--font-data)", fontWeight: 700, fontSize: "12px" }}
          >
            3d
          </text>
        </svg>
      );
    case 3:
      // a document with a stamped seal
      return (
        <svg {...common}>
          <ellipse cx="56" cy="76" rx="34" ry="6" fill="var(--cast-soft)" />
          <rect x="26" y="12" width="56" height="58" rx="6" fill="var(--o-bone-s)" />
          <rect x="26" y="8" width="56" height="58" rx="6" fill="var(--o-bone)" />
          <rect x="36" y="20" width="30" height="5" rx="2.5" fill="var(--o-ink)" opacity=".55" />
          <rect x="36" y="32" width="38" height="4" rx="2" fill="var(--o-ink)" opacity=".3" />
          <rect x="36" y="41" width="30" height="4" rx="2" fill="var(--o-ink)" opacity=".3" />
          <g transform="rotate(-10 64 54)">
            <rect x="52" y="42" width="26" height="26" rx="4" fill="none" stroke="var(--o-ju)" strokeWidth="3" />
            <text
              x="65"
              y="61"
              textAnchor="middle"
              fill="var(--o-ju)"
              style={{ fontFamily: "var(--font-han)", fontWeight: 900, fontSize: "14px" }}
            >
              검
            </text>
          </g>
        </svg>
      );
    default:
      // card and a declined mark
      return (
        <svg {...common}>
          <ellipse cx="56" cy="76" rx="36" ry="6" fill="var(--cast-soft)" />
          <rect x="18" y="24" width="72" height="44" rx="7" fill="var(--o-bone-s)" />
          <rect x="18" y="20" width="72" height="44" rx="7" fill="var(--o-bone)" />
          <rect x="18" y="28" width="72" height="8" fill="var(--o-vi)" opacity=".85" />
          <rect x="28" y="46" width="16" height="5" rx="2.5" fill="var(--o-ink)" opacity=".5" />
          <rect x="48" y="46" width="16" height="5" rx="2.5" fill="var(--o-ink)" opacity=".5" />
          <circle cx="86" cy="58" r="13" fill="var(--o-ju)" />
          <path d="M81 53l10 10M91 53l-10 10" stroke="var(--o-bone)" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
  }
}

/**
 * T09 영화 같은 한 장면 — the backlit stage.
 *
 * Drawn so the hero has its cinematic frame before any photograph exists; the
 * rendered image replaces it through <Artwork name="hero-stage">.
 *
 * T09's rules run opposite to T13's on purpose: the light comes from behind the
 * subjects, the image fills the frame instead of floating on it, and gradients
 * are part of the look rather than banned. Its documented failure is type
 * sinking into the picture, so the lower-left stays deep and uncluttered.
 *
 * Every figure is an anonymous silhouette. No faces, no identifiable features,
 * nothing traced from a photograph, and the handheld lights are plain points
 * rather than any group's lightstick design.
 */
export function StageScene() {
  // Crowd heads and raised arms, scattered deterministically so the render is
  // stable between builds.
  const crowd = Array.from({ length: 46 }, (_, i) => {
    const x = (i * 137.5) % 1600;
    const y = 742 + ((i * 53) % 46);
    return { x, y, r: 13 + ((i * 7) % 9) };
  });

  const lights = Array.from({ length: 30 }, (_, i) => ({
    x: (i * 211.3) % 1600,
    y: 660 + ((i * 97) % 110),
    r: 2.6 + ((i * 3) % 4),
  }));

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A backlit concert stage seen from the crowd, with performers in silhouette against warm light beams."
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="46%" r="54%">
          <stop offset="0%" stopColor="#ffb26b" stopOpacity="0.95" />
          <stop offset="38%" stopColor="#ff3b2e" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0e0d12" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc98a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffc98a" stopOpacity="0" />
        </linearGradient>
        {/* T09's fix for its own failure mode: darken only where type sits. */}
        <linearGradient id="scrim" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e0d12" stopOpacity="0.95" />
          <stop offset="46%" stopColor="#0e0d12" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#0e0d12" stopOpacity="0.1" />
        </linearGradient>
        <filter id="haze" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill="#0e0d12" />
      <ellipse cx="800" cy="430" rx="760" ry="420" fill="url(#glow)" filter="url(#haze)" />

      {/* beams cutting down through the haze */}
      <g>
        <polygon points="760,120 820,120 560,700 420,700" fill="url(#beam)" />
        <polygon points="880,120 940,120 1180,700 1040,700" fill="url(#beam)" />
        <polygon points="640,130 672,130 500,700 408,700" fill="url(#beam)" opacity=".7" />
        <polygon points="1004,130 1036,130 1210,700 1120,700" fill="url(#beam)" opacity=".7" />
      </g>

      {/* stage deck */}
      <rect x="0" y="596" width="1600" height="12" fill="#0e0d12" opacity=".85" />

      {/* performers — anonymous, fully backlit, mid-pose */}
      <g fill="#0e0d12">
        {/* centre, both arms up */}
        <g transform="translate(800 -36)">
          <circle cx="0" cy="372" r="20" />
          <path d="M-17 396h34l6 112-10 92h-14l-4-86-4 86h-14l-10-92z" />
          <path d="M13 404l40-76 14 8-36 86z" />
          <path d="M-13 404l-40-76-14 8 36 86z" />
        </g>
        {/* left, one arm out */}
        <g transform="translate(618 -14)">
          <circle cx="0" cy="378" r="18" />
          <path d="M-16 400h32l6 106-10 88h-13l-4-82-4 82h-13l-10-88z" />
          <path d="M12 408l44 26-7 14-42-22z" />
          <path d="M-12 408l-30 54 12 8 27-48z" />
        </g>
        {/* right, mirrored */}
        <g transform="translate(982 -20)">
          <circle cx="0" cy="376" r="18" />
          <path d="M-16 398h32l6 108-10 90h-13l-4-84-4 84h-13l-10-90z" />
          <path d="M-12 406l-44 26 7 14 42-22z" />
          <path d="M12 406l30 54-12 8-27-48z" />
        </g>
        {/* outer pair, smaller and further back */}
        <g transform="translate(452 14) scale(0.84)">
          <circle cx="0" cy="384" r="18" />
          <path d="M-15 406h30l6 102-9 86h-12l-4-80-4 80h-12l-9-86z" />
          <path d="M11 414l36-58 12 8-32 68z" />
        </g>
        <g transform="translate(1150 10) scale(0.84)">
          <circle cx="0" cy="384" r="18" />
          <path d="M-15 406h30l6 102-9 86h-12l-4-80-4 80h-12l-9-86z" />
          <path d="M-11 414l-36-58-12 8 32 68z" />
        </g>
      </g>

      {/* handheld lights in the crowd — plain points, no group's design */}
      <g>
        {lights.map((l, i) => (
          <circle key={i} cx={l.x} cy={l.y} r={l.r} fill="#ffd9a8" opacity=".85" />
        ))}
      </g>

      {/* crowd, nearest and darkest */}
      <g fill="#0b0a0f">
        <rect x="0" y="790" width="1600" height="110" />
        {crowd.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.r} />
        ))}
        {/* raised arms */}
        {crowd
          .filter((_, i) => i % 3 === 0)
          .map((c, i) => (
            <rect key={i} x={c.x - 5} y={c.y - 74} width="10" height="76" rx="5" />
          ))}
      </g>

      <rect width="1600" height="900" fill="url(#scrim)" />
    </svg>
  );
}

/** Crowd band fallback — the same scene as the stage, pulled back to the floor. */
export function CrowdScene() {
  const heads = Array.from({ length: 70 }, (_, i) => ({
    x: (i * 91.7) % 1600,
    y: 300 + ((i * 37) % 54),
    r: 11 + ((i * 5) % 8),
  }));
  const lights = Array.from({ length: 52 }, (_, i) => ({
    x: (i * 123.4) % 1600,
    y: 212 + ((i * 71) % 120),
    r: 2.2 + ((i * 3) % 4),
  }));

  return (
    <svg
      viewBox="0 0 1600 467"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A dense crowd seen from behind, arms raised, small lights scattered through the dark."
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id="farglow" cx="50%" cy="34%" r="62%">
          <stop offset="0%" stopColor="#ff8a4c" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#ff3b2e" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#0e0d12" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="467" fill="#0e0d12" />
      <ellipse cx="800" cy="170" rx="700" ry="150" fill="url(#farglow)" />
      <g fill="#ffd9a8" opacity=".8">
        {lights.map((l, i) => (
          <circle key={i} cx={l.x} cy={l.y} r={l.r} />
        ))}
      </g>
      <g fill="#0b0a0f">
        <rect x="0" y="348" width="1600" height="119" />
        {heads.map((h, i) => (
          <circle key={i} cx={h.x} cy={h.y} r={h.r} />
        ))}
        {heads
          .filter((_, i) => i % 4 === 0)
          .map((h, i) => (
            <rect key={i} x={h.x - 4} y={h.y - 62} width="8" height="64" rx="4" />
          ))}
      </g>
    </svg>
  );
}

/**
 * The booking screen, alone and large, for phone width.
 *
 * The three-screen staircase is the right drawing on a desktop and the wrong
 * one on a phone: scaled to 390px the Korean labels land around five pixels
 * tall and the name-mismatch warning — the entire reason the graphic exists —
 * becomes unreadable. Most of this site's traffic will be on a phone, so the
 * narrow layout gets a single screen at a size where the warning can be read.
 */
export function SingleScreen() {
  return (
    <svg
      className="svg-w"
      viewBox="0 0 360 300"
      role="img"
      aria-label="A Korean identity-verification screen showing a passport name and date of birth, with a warning that they do not match the fan club record."
    >
      <defs>
        <filter id="m1" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <clipPath id="mc1">
          <rect x="22" y="18" width="316" height="238" rx="13" />
        </clipPath>
      </defs>

      <ellipse cx="180" cy="278" rx="150" ry="13" fill="var(--cast)" filter="url(#m1)" />
      <rect x="14" y="10" width="332" height="254" rx="17" fill="var(--o-ink)" />
      <rect x="22" y="18" width="316" height="238" rx="13" fill="var(--o-bone)" />

      <g clipPath="url(#mc1)">
        <rect x="22" y="18" width="316" height="38" fill="var(--o-vi)" />
        <text x="40" y="44" fill="var(--o-bone)" style={{ fontFamily: "var(--font-han)", fontWeight: 700, fontSize: "17px" }}>
          본인인증
        </text>

        <text x="40" y="84" fill="var(--o-ink)" opacity=".55" style={{ fontFamily: "var(--font-data)", fontSize: "11px" }}>
          PASSPORT NAME
        </text>
        <rect x="40" y="92" width="280" height="30" rx="7" fill="var(--o-bone-s)" opacity=".62" />
        <text x="52" y="112" fill="var(--o-ink)" opacity=".85" style={{ fontFamily: "var(--font-latin)", fontWeight: 600, fontSize: "14px" }}>
          MARIA ELENA SANTOS CRUZ
        </text>

        <text x="40" y="146" fill="var(--o-ink)" opacity=".55" style={{ fontFamily: "var(--font-data)", fontSize: "11px" }}>
          DATE OF BIRTH
        </text>
        <rect x="40" y="154" width="150" height="30" rx="7" fill="var(--o-bone-s)" opacity=".62" />
        <text x="52" y="174" fill="var(--o-ink)" opacity=".85" style={{ fontFamily: "var(--font-data)", fontSize: "14px" }}>
          2004-07-19
        </text>

        {/* The failure this guide exists to prevent, at a size you can read. */}
        <rect x="40" y="200" width="280" height="40" rx="8" fill="var(--o-ju)" opacity=".15" />
        <circle cx="60" cy="220" r="9" fill="var(--o-ju)" />
        <path d="M60 216v4M60 224.5h.01" stroke="var(--o-bone)" strokeWidth="2.4" strokeLinecap="round" />
        <text x="78" y="225" fill="var(--o-ju)" style={{ fontFamily: "var(--font-han)", fontWeight: 700, fontSize: "13px" }}>
          팬클럽 정보와 일치하지 않습니다
        </text>
      </g>
      <rect x="152" y="24" width="56" height="6" rx="3" fill="var(--o-ink)" opacity=".5" />
    </svg>
  );
}
