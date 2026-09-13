/** Шкала уровня игрока академии: курс ведёт с 1.0 до 5.0. */
export function LevelScale() {
  const ticks = [10, 108, 206, 304, 402, 500, 598, 696, 794, 892, 990];
  const labels = [
    { x: 10, t: "0.0" },
    { x: 98, t: "1.0" },
    { x: 196, t: "2.0" },
    { x: 294, t: "3.0" },
    { x: 392, t: "4.0" },
    { x: 490, t: "5.0" },
    { x: 588, t: "6.0" },
    { x: 686, t: "7.0" },
    { x: 784, t: "8.0" },
    { x: 878, t: "9.0" },
    { x: 965, t: "10.0" },
  ];

  return (
    <div className="eco-block eco-scale">
      <h3>С единицы до пятёрки по шкале академии</h3>
      <svg
        viewBox="0 0 1000 90"
        role="img"
        aria-label="Шкала уровня игрока Hello Padel Academy от 0.0 до 10.0. Курс ведёт с уровня 1.0 до уровня 5.0"
      >
        <rect x="10" y="28" width="980" height="14" rx="7" fill="rgba(255,255,255,.14)" />
        <rect x="108" y="24" width="392" height="22" rx="11" fill="var(--brand)" />
        <g fontFamily="Unbounded,system-ui,sans-serif" fontSize="17" fontWeight="800" fill="var(--brand)">
          <text x="108" y="16" textAnchor="middle">
            1.0
          </text>
          <text x="500" y="16" textAnchor="middle">
            5.0
          </text>
        </g>
        <g stroke="rgba(255,255,255,.4)" strokeWidth="2">
          {ticks.map((x) => (
            <line key={x} x1={x} y1="20" x2={x} y2="50" />
          ))}
        </g>
        <g fontFamily="Manrope,system-ui,sans-serif" fontSize="15" fontWeight="600" fill="rgba(255,255,255,.7)">
          {labels.map((l) => (
            <text key={l.t} x={l.x} y="75">
              {l.t}
            </text>
          ))}
        </g>
      </svg>
      <p className="eco-scale-cap">
        <b>Курс ведёт отсюда сюда — с единицы до пятёрки.</b> В программе разобраны все удары, которые бьют и
        новички, и профессионалы: хват, подача и приём, бандеха, вибора, смэш, игра от стен, чикита, свеча.
        Плюс тактика — позиция у сетки, работа в паре, выбор решения в розыгрыше. Именно тактика и
        вытаскивает на высокий уровень. Шкала 0.0–10.0 — собственная шкала академии, та же, по которой
        оценивают игроков в приложении.
      </p>
    </div>
  );
}
