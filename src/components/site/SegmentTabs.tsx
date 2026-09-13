"use client";

import { useState } from "react";
import { SEGMENTS } from "@/lib/content";

export function SegmentTabs() {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="tabs" role="tablist">
        {SEGMENTS.map((s, i) => (
          <button
            key={s.tab}
            className="tab"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            type="button"
          >
            {s.tab}
          </button>
        ))}
      </div>
      <div className="tabpanel">
        <p className="lead">{SEGMENTS[active].text}</p>
      </div>
    </>
  );
}
