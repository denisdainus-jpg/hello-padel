"use client";

import { useState } from "react";
import { SEGMENTS } from "@/lib/content";

export function SegmentTabs() {
  const [active, setActive] = useState(0);
  const s = SEGMENTS[active];

  return (
    <>
      <div className="tabs" role="tablist">
        {SEGMENTS.map((seg, i) => (
          <button
            key={seg.tab}
            className="tab"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            type="button"
          >
            {seg.tab}
          </button>
        ))}
      </div>

      {/* шкала академии: маркер едет к уровню выбранного сегмента */}
      <div className="lvl">
        <div className="lvl-head">
          <span className="lvl-range">{s.range}</span>
          <span className="lvl-mods">{s.mods}</span>
        </div>
        <div className="lvl-track">
          <i className="lvl-fill" style={{ width: `${s.fill}%` }} />
        </div>
        <div className="lvl-ticks" aria-hidden="true">
          <span>1.0</span>
          <span>2.0</span>
          <span>3.0</span>
          <span>4.0</span>
          <span>5.0</span>
        </div>
      </div>

      <div className="tabpanel">
        <p className="lead">{s.text}</p>
      </div>
    </>
  );
}
