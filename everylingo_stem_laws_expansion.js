// EveryLingo Extended Physics Laws & Math Foundations Expansion
// Adds +7 Physics & Universal Laws nodes (153–159) + 5 Math Essentials nodes (160–164) = 12 nodes!
(function (root) {
  "use strict";

  const DATA = root.MATHLINGO_DATA;
  const LATEX = root.MATHLINGO_LATEX;
  if (!DATA) return;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr) {
    const c = arr.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = c[i];
      c[i] = c[j];
      c[j] = tmp;
    }
    return c;
  }

  function pick(arr) {
    return arr[randInt(0, arr.length - 1)];
  }

  function numOpts(ans, deltas) {
    const s = new Set([String(ans)]);
    for (const d of shuffle(deltas || [-3, -2, -1, 1, 2, 3, 4])) {
      if (s.size >= 4) break;
      if (ans + d !== ans) s.add(String(ans + d));
    }
    let k = 1;
    while (s.size < 4) {
      s.add(String(ans + k));
      k++;
    }
    return shuffle(Array.from(s));
  }

  // ==================== 12 NEW NODES (ORDER 153–164) ====================
  const STEM_LAWS_NODES = [
    // ---------- MORE PHYSICS & UNIVERSAL LAWS (+7 NODES) ----------
    {
      id: "physics-universal-gravitation-kepler",
      worldId: "physics",
      order: 153,
      title: "Newton's Universal Gravitation & Kepler's 3 Laws",
      icon: "🪐",
      tagline: "F = Gm₁m₂/r² (inverse-square!). Astronauts aren't in 'zero gravity' — they're in continuous FREE-FALL around Earth!",
      scaryVersion: "Inverse-square Newtonian central-force gravitation and Keplerian orbital mechanics.",
      easyTruth: "Newton realized the EXACT SAME gravity that drops an apple holds the Moon in orbit! Why doesn't the ISS fall down? It DOES fall constantly — it just flies sideways so fast (~7.7 km/s) that Earth curves away underneath it at the exact same rate! And Kepler's 3 laws describe EVERY planet & satellite orbit in 3 clean rules!",
      microSteps: [
        { label: "Step 1: Newton's Law of Universal Gravitation (1/r²)", text: "`F = G·m₁·m₂ / r²` (`G = 6.67×10⁻¹¹`). Because distance `r` is SQUARED in the denominator: DOUBLE the distance → gravity becomes **1/4** as strong! TRIPLE the distance → **1/9**! And gravitational acceleration on a planet surface `g = GM / R²` depends ONLY on planet mass & radius (NOT the falling rock's mass!)." },
        { label: "Step 2: Orbital Speed & Escape Velocity", text: "Setting gravity equal to centripetal force gives Circular Orbit Speed `v = √(GM / r)` — notice **satellite mass cancels out**, and CLOSER orbits fly FASTER! Escape velocity is simply `√2 × v_orbit` (`≈ 11.2 km/s` from Earth)." },
        { label: "Step 3: Kepler's 3 Laws of Planetary Motion", text: "1) **Law of Ellipses**: orbits are ellipses with the Sun at one focus. 2) **Equal Areas in Equal Times**: planets speed up when CLOSER to the Sun (perihelion) and slow down when farther (aphelion) — conservation of angular momentum! 3) **Harmonic Law**: `T² ∝ r³` (quadruple distance `r` → period `T` multiplies by `4^(3/2) = 8×`!)." }
      ],
      cheatCode: "F = Gm₁m₂/r² (2× r → 1/4 F!). Orbiting = continuous free-fall! Kepler: (1) Ellipses, (2) Faster near Sun (Equal Areas), (3) T² ∝ r³!",
      visualizerId: "physicsLawsPlayground",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Two satellites triple their separation distance (`r → 3r`) while keeping masses unchanged. What happens to the gravitational force `F = Gm₁m₂/r²`?", options: ["1/9 as strong (inverse-square: 3² = 9!)", "1/3 as strong", "3× stronger", "1/6 as strong"], answer: "1/9 as strong (inverse-square: 3² = 9!)", hint: "Distance `r` is SQUARED in the denominator (`3² = 9`)!", whyEasy: "Tripling distance divides gravity by `3² = 9`!" },
        { type: "mc", prompt: "Escape velocity from Earth's surface is `v_esc = √(2GM/R) ≈ 11.2 km/s`. Does a heavy 100-ton rocket need a HIGHER escape velocity than a 1 kg satellite (ignoring air drag)?", options: ["No — the rocket's mass cancels out! Both need the exact same 11.2 km/s", "Yes — 100× faster", "Yes — 10× faster", "Only at the Moon"], answer: "No — the rocket's mass cancels out! Both need the exact same 11.2 km/s", hint: "Look at `v_esc = √(2GM / R)`: only the PLANET's mass `M` appears!", whyEasy: "Just like Galileo's falling bodies, orbital & escape speeds depend on the planet's mass, NOT the spacecraft's mass!" },
        { type: "mc", prompt: "According to Kepler's 2nd Law (Equal Areas in Equal Times), when does Earth travel FASTEST in its elliptical orbit around the Sun?", options: ["At Perihelion (when CLOSEST to the Sun!)", "At Aphelion (when farthest from the Sun)", "Constant identical speed all year", "Only during eclipses"], answer: "At Perihelion (when CLOSEST to the Sun!)", hint: "To sweep the same pie-slice area with a shorter radius, the planet must swing a wider arc!", whyEasy: "Closer = stronger pull & smaller lever arm → faster orbital speed (conserving angular momentum)!" },
        { type: "input", prompt: "Kepler's 3rd Law (`T² = r³` in AU & years): Planet X orbits at `r = 4 AU` from the Sun. What is its orbital period `T` in Earth years?", answer: "8", hint: "Compute `r³ = 4³ = 64`, then take the square root `√64`!", whyEasy: "T² = 4³ = 64 → T = √64 = 8 Earth years!" },
        { type: "mc", prompt: "Comparing two satellites in circular orbit around Earth: Satellite A is at low altitude, Satellite B is much higher. Which orbits at a FASTER linear speed?", options: ["Satellite A (closer orbit moves faster: v = √(GM/r)!)", "Satellite B (farther orbit moves faster)", "Both travel at identical speed", "Heavier satellite always moves faster"], answer: "Satellite A (closer orbit moves faster: v = √(GM/r)!)", hint: "Look at `r` in the denominator of `v = √(GM / r)`!", whyEasy: "Stronger gravity closer to Earth demands higher sideways speed to stay in orbit!" }
      ]
    },
    {
      id: "physics-rotational-dynamics-angular",
      worldId: "physics",
      order: 154,
      title: "Rotational Dynamics, Inertia & Angular Momentum",
      icon: "🌀",
      tagline: "Exact Linear↔Spin Dictionary: `F=ma → τ=Iα`, `p=mv → L=Iω`! Pull arms IN → smaller `I` → faster spin `ω`!",
      scaryVersion: "Rigid-body rotational inertia tensors, torque dynamics, and conservation of angular momentum.",
      easyTruth: "Don't memorize a whole new set of physics formulas for spinning things — just translate straight-line physics into spin! Mass `m` becomes **Moment of Inertia `I`** (how FAR mass sits from the spin axis — mass on the outer rim is MUCH harder to spin!), Force `F` becomes **Torque `τ`**, and `L = I·ω` stays conserved so an ice skater pulling her arms in spins dramatically faster!",
      microSteps: [
        { label: "Step 1: The 1-to-1 Linear ↔ Rotational Dictionary", text: "Position `x ↔ θ` (rad) · Velocity `v ↔ ω` (rad/s) · Accel `a ↔ α` · Mass `m ↔ I` (Moment of Inertia, `Σ m r²`) · Force `F = ma ↔ τ = Iα` · Momentum `p = mv ↔ L = Iω` · Kinetic Energy `½mv² ↔ ½Iω²`!" },
        { label: "Step 2: Moment of Inertia `I` (Why Solid Spheres Beat Hollow Hoops!)", text: "`I` depends on mass × DISTANCE SQUARED (`r²`)! A hollow hoop puts 100% of its mass on the outer rim (`I = MR²`), a solid disk has `I = ½MR²`, and a solid sphere has `I = (2/5)MR²`. Race them down a ramp: **smallest `I` wins EVERY time** (Solid Sphere > Solid Disk > Hollow Hoop) because less energy gets locked into spinning!" },
        { label: "Step 3: Conservation of Angular Momentum (`I₁ω₁ = I₂ω₂`)", text: "With zero external torque, total `L = I·ω` NEVER changes! Pull arms IN → radius `r` shrinks → `I` drops to 1/3 → angular speed `ω` TRIPLES (`3×`)!" }
      ],
      cheatCode: "Linear↔Spin: m↔I, v↔ω, F=ma↔τ=Iα, p=mv↔L=Iω. Closer mass = smaller I = spins faster! Ramp race winner: Solid Sphere (2/5) > Disk (1/2) > Hoop (1)!",
      visualizerId: "physicsLawsPlayground",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "An ice skater spins at `ω₁ = 2 rev/s` with Moment of Inertia `I₁ = 6 kg·m²`. She pulls her arms tightly in, cutting `I₂` to `2 kg·m²`. Her new spin rate `ω₂` (rev/s)?", answer: "6", hint: "Conservation of angular momentum: `I₁ω₁ = I₂ω₂` → `(6)(2) = (2)(ω₂)`!", whyEasy: "Cutting `I` by 3× multiplies spin speed `ω` by 3×: `2 × 3 = 6 rev/s`!" },
        { type: "mc", prompt: "A Solid Sphere (`I = 2/5 MR²`) and a Hollow Hoop (`I = MR²`) of identical mass & radius race down a ramp from rest. Which reaches the bottom FIRST?", options: ["The Solid Sphere (less mass on the outer rim → smaller I → more forward speed!)", "The Hollow Hoop", "Exact tie because masses are equal", "Neither rolls"], answer: "The Solid Sphere (less mass on the outer rim → smaller I → more forward speed!)", hint: "Smaller Moment of Inertia `I` steals less gravitational energy into rotation!", whyEasy: "Solid Sphere (`0.4`) beats Solid Disk (`0.5`), which beats Hollow Hoop (`1.0`) — regardless of mass or radius!" },
        { type: "mc", prompt: "In rotational physics, what is the direct rotational analog of Newton's 2nd Law `F = m·a`?", options: ["`τ = I·α` (Torque = Moment of Inertia × Angular Acceleration)", "`L = m·g·h`", "`P = I·V`", "`v = f·λ`"], answer: "`τ = I·α` (Torque = Moment of Inertia × Angular Acceleration)", hint: "Swap Force→Torque (`τ`), Mass→Inertia (`I`), Accel→Angular Accel (`α`)!", whyEasy: "Every rotational equation mirrors its linear twin 1-for-1!" },
        { type: "mc", prompt: "Why is a door handle ALWAYS placed on the far edge away from the hinges?", options: ["Maximizes lever arm `r` so less force `F` creates huge Torque `τ = r·F sin θ`", "To reduce gravity", "To increase Moment of Inertia", "Purely decoration"], answer: "Maximizes lever arm `r` so less force `F` creates huge Torque `τ = r·F sin θ`", hint: "Try pushing a heavy door 2 cm from its hinge — nearly impossible!", whyEasy: "Doubling lever arm `r` doubles Torque for the exact same push!" },
        { type: "mc", prompt: "What happens to a spinning neutron star when a massive star collapses down to a tiny 10 km radius?", options: ["Its spin speed `ω` skyrockets (conserving `L = Iω` as `I` shrinks drastically!)", "It stops spinning completely", "Its mass disappears", "Gravity turns off"], answer: "Its spin speed `ω` skyrockets (conserving `L = Iω` as `I` shrinks drastically!)", hint: "The exact same ice-skater effect on a cosmic scale — creating millisecond pulsars!", whyEasy: "Shrinking `R` by 100,000× makes pulsars spin hundreds of times per SECOND!" }
      ]
    },
    {
      id: "physics-shm-pendulums-resonance",
      worldId: "physics",
      order: 155,
      title: "SHM, Hooke's Law, Pendulums & Resonance",
      icon: "⏱️",
      tagline: "Spring: `T = 2π√(m/k)`. Pendulum: `T = 2π√(L/g)` — MASS DOES NOT AFFECT PENDULUM PERIOD!",
      scaryVersion: "Simple harmonic restoring dynamics, isochronous pendulum kinematics, and driven resonance.",
      easyTruth: "Anything pulled away from balance that snaps back proportionally (`F = −kx`, Hooke's Law!) bounces in smooth sine-wave rhythm called **Simple Harmonic Motion (SHM)**. Classic exam shocker: hang a bowling ball vs a feather on identical strings — **they swing with the EXACT SAME period `T = 2π√(L/g)`** because gravity accelerates all masses equally!",
      microSteps: [
        { label: "Step 1: Hooke's Law & Spring Energy (`F = −kx`, `U = ½kx²`)", text: "The minus sign in `F = −kx` means **restoring force** (pull right → spring pulls left!). Spring potential energy is `U_s = ½kx²`. At the extreme turnaround ends: `v = 0`, `a = MAX`, `U = MAX`! At the center equilibrium: `v = MAX`, `a = 0`, `KE = MAX`!" },
        { label: "Step 2: Spring Period vs Pendulum Period (Compare Closely!)", text: "MASS ON SPRING: `T = 2π√(m / k)` — heavier mass `m` bounces SLOWER; stiffer spring `k` bounces FASTER! SIMPLE PENDULUM: `T = 2π√(L / g)` — depends ONLY on length `L` and gravity `g`! **Mass `m` cancels out completely!** Quadrupling length `L` DOUBLES period `T` (`√4 = 2`)!" },
        { label: "Step 3: Frequency & Resonance", text: "Frequency `f = 1 / T` (Hz = cycles/sec). **Resonance** happens when you push a swing (or bridge, or wine glass!) at its exact natural frequency `f₀` — tiny rhythmic nudges stack into huge amplitude!" }
      ],
      cheatCode: "Hooke: F = −kx, U = ½kx². Spring T = 2π√(m/k). Pendulum T = 2π√(L/g) (MASS cancels! 4× L → 2× T!). Center = max v, zero a; Ends = zero v, max a!",
      visualizerId: "physicsLawsPlayground",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "If you DOUBLE the mass of a pendulum bob (keeping string length `L` and Earth's `g` identical), its swing period `T = 2π√(L/g)`:", options: ["Stays the EXACT SAME (mass cancels out!)", "Doubles", "Halves", "Increases by √2"], answer: "Stays the EXACT SAME (mass cancels out!)", hint: "Check if `m` even appears anywhere inside `T = 2π√(L / g)`!", whyEasy: "Galileo discovered pendulum period depends ONLY on length `L` and gravity `g` — NOT mass!" },
        { type: "mc", prompt: "To make a grandfather clock's pendulum swing TWICE as slowly (2× period `T`), you must change its string length `L` by:", options: ["4× longer (`√4 = 2`!)", "2× longer", "1/2 as long", "4× shorter"], answer: "4× longer (`√4 = 2`!)", hint: "`L` sits inside a SQUARE ROOT in `T = 2π√(L/g)`!", whyEasy: "Square root inverse: to get `2×` out of `√L`, you need `4× L`!" },
        { type: "input", prompt: "Hooke's Law: A spring (`k = 200 N/m`) is stretched `x = 0.1 m`. Magnitude of restoring force `F = kx` (in Newtons)?", answer: "20", hint: "Multiply `200 × 0.1`!", whyEasy: "F = 200 × 0.1 = 20 N pulling back toward equilibrium!" },
        { type: "mc", prompt: "As a pendulum swings through the VERY BOTTOM center equilibrium point, its Speed and Acceleration are:", options: ["Speed = MAXIMUM, Restoring Force/Accel = ZERO", "Speed = ZERO, Accel = MAXIMUM", "Both ZERO", "Both MAXIMUM"], answer: "Speed = MAXIMUM, Restoring Force/Accel = ZERO", hint: "All potential energy has converted to kinetic energy at the bottom!", whyEasy: "Center = max `v`, 0 restoring force; Turnaround peaks = 0 `v`, max restoring force!" },
        { type: "mc", prompt: "What happens to a pendulum clock moved from Earth (`g ≈ 9.8`) to the Moon (`g ≈ 1.6`, 6× weaker gravity)?", options: ["Swings SLOWER (longer period `T` because `g` is in the denominator!)", "Swings 6× faster", "Keeps identical time", "Spins in full loops"], answer: "Swings SLOWER (longer period `T` because `g` is in the denominator!)", hint: "Dividing by a smaller `g` inside `2π√(L/g)` makes `T` larger!", whyEasy: "Weaker lunar gravity pulls the bob back more gently → slower ticks!" }
      ]
    },
    {
      id: "physics-sound-doppler-waves",
      worldId: "physics",
      order: 156,
      title: "Sound Waves, Decibels, Harmonics & Doppler Effect",
      icon: "🔊",
      tagline: "Sound = longitudinal pressure wave (needs a medium — NO sound in space!). +10 dB = 10× intensity! Approaching siren = HIGHER pitch!",
      scaryVersion: "Acoustic longitudinal wave propagation, logarithmic decibel scaling, harmonics, and Doppler shifts.",
      easyTruth: "Light can fly across empty space, but **Sound** is air molecules bumping into each other (longitudinal compression waves — zero air in space = total silence!). Remember 3 wild sound rules: (1) Sound actually travels FASTER in solids/water than in air; (2) Every **+10 dB** is **10×** more sound power (+20 dB = 100×!); (3) Approaching ambulance bunches waves up → **HIGHER frequency/pitch**!",
      microSteps: [
        { label: "Step 1: Wave Speed, Mediums & Pitch vs Loudness", text: "`v = f·λ` (`v_sound ≈ 343 m/s` in room-temp air; MUCH faster in steel/water because atoms are packed tighter!). **Frequency `f`** controls **PITCH** (high `f` = soprano); **Amplitude** controls **LOUDNESS**! Human hearing spans ~20 Hz to 20,000 Hz." },
        { label: "Step 2: Decibels (Logarithmic!) & Beats (`f_beat = |f₁ − f₂|`)", text: "Decibels are powers of 10: `+10 dB = 10× intensity`, `+20 dB = 100×`, `+30 dB = 1,000×`! Playing a 440 Hz and 444 Hz guitar string together creates a rhythmic pulsing **Beat Frequency** of `|440 − 444| = 4 Hz` (4 wobbles/sec)!" },
        { label: "Step 3: The Doppler Effect (Sirens & Redshift!)", text: "Source moving **TOWARD** you compresses wavelengths (`λ` shrinks) → you hear **HIGHER frequency/pitch**! Moving **AWAY** stretches wavelengths (`λ` grows) → **LOWER pitch**! Works for light too: galaxies moving away stretch toward red (**Redshift** — proving our universe is expanding!)!" }
      ],
      cheatCode: "Sound = longitudinal (no vacuum!). Faster in solids > liquids > gases! +10 dB = 10× (+20 dB = 100×). Beats = |f₁ − f₂|. Approaching = higher f (shorter λ)!",
      visualizerId: "physicsLawsPlayground",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "In which medium does a sound wave travel FASTEST?", options: ["Solid steel (~5,000 m/s)", "Liquid water (~1,500 m/s)", "Room-temperature air (~343 m/s)", "Outer space vacuum (0 m/s)"], answer: "Solid steel (~5,000 m/s)", hint: "Stiff, tightly-packed atoms pass vibrations fastest!", whyEasy: "Sound speed: Solids > Liquids > Gases (and 0 in vacuum — opposite of light)!" },
        { type: "input", prompt: "Two tuning forks vibrate at `256 Hz` and `261 Hz` simultaneously. What Beat Frequency (in Hz) do you hear?", answer: "5", hint: "Just take the difference `|f₁ − f₂|`!", whyEasy: "|261 − 256| = 5 beats per second!" },
        { type: "mc", prompt: "A rock concert at `100 dB` has how many times the sound intensity of a `80 dB` vacuum cleaner?", options: ["100× more intense (+20 dB = 10²!)", "20× more intense", "2× more intense", "10× more intense"], answer: "100× more intense (+20 dB = 10²!)", hint: "Every +10 dB multiplies intensity by ×10!", whyEasy: "+20 dB is two 10-dB jumps: `10 × 10 = 100×`!" },
        { type: "mc", prompt: "As a speeding ambulance siren rushes TOWARD you, the Doppler Effect causes you to hear:", options: ["Higher pitch (shorter wavelength, higher frequency)", "Lower pitch (longer wavelength)", "Identical pitch", "Zero sound until it stops"], answer: "Higher pitch (shorter wavelength, higher frequency)", hint: "Waves pile up in front of the moving source!", whyEasy: "Toward = compressed λ → HIGHER pitch; Away = stretched λ → LOWER pitch!" },
        { type: "mc", prompt: "A sound wave moves at `v = 340 m/s` with frequency `f = 170 Hz`. What is its wavelength `λ = v / f`?", options: ["2 m", "0.5 m", "170 m", "510 m"], answer: "2 m", hint: "Divide 340 ÷ 170!", whyEasy: "λ = 340 / 170 = 2 meters!" }
      ]
    },
    {
      id: "physics-thermo-four-laws-engines",
      worldId: "physics",
      order: 157,
      title: "The 4 Laws of Thermodynamics & Carnot Engines",
      icon: "🔥",
      tagline: "0th: Equilibrium. 1st: Energy conserved (`ΔU = Q − W`). 2nd: Entropy rises (`η_max = 1 − T_C/T_H` in Kelvin!). 3rd: Never 0 K!",
      scaryVersion: "Phenomenological thermodynamics, entropic irreversibility, and Carnot heat-engine efficiency limits.",
      easyTruth: "The 4 Laws of Thermodynamics have the greatest plain-English summary in physics: **0th** = thermometers work; **1st** = you can't create energy from nothing; **2nd** = you can't even break even (heat ALWAYS flows Hot → Cold & some heat MUST be wasted!); **3rd** = you can't cool anything all the way to Absolute Zero (`0 K = −273.15°C`)!",
      microSteps: [
        { label: "Step 1: All 4 Laws & Physics vs. Chemistry ΔU Sign Bridge!", text: "**0th Law**: Thermal equilibrium (why thermometers work!). **1st Law**: `ΔU = Q − W` (Physics/Engineering defines `+W` as work done **BY** the expanding engine! **EXAM BRIDGE:** Chemistry writes `ΔU = q + w` because IUPAC Chemistry defines `+w` as work done **ON** the gas — BOTH give identical physics: gas absorbs `+500 J`, expands doing `200 J` of work → `ΔU = +300 J`!). **2nd Law**: Entropy of an isolated system rises; heat flows Hot → Cold; 100% heat engine is IMPOSSIBLE! **3rd Law**: Absolute Zero (`0 K`) is unreachable." },
        { label: "Step 2: Carnot Maximum Efficiency (`η = 1 − T_C / T_H` — KELVIN ONLY!)", text: "Even an ideal frictionless Carnot engine between hot reservoir `T_H` and cold exhaust `T_C` caps at `η = 1 − (T_C / T_H)`! CRITICAL RULE: **ALWAYS convert °C → Kelvin (`+ 273`) first!** Example: `T_H = 600 K, T_C = 300 K` → `η = 1 − 300/600 = 0.50 = 50%` max!" },
        { label: "Step 3: 3 Modes of Heat Transfer", text: "**CONDUCTION** = direct contact (hot metal spoon!). **CONVECTION** = fluid circulation (boiling water, sea breezes!). **RADIATION** = electromagnetic infrared waves (how Sunlight heats Earth across empty vacuum space!)." }
      ],
      cheatCode: "0th=Temp eq; 1st=ΔU=Q−W; 2nd=Entropy rises, η_max = 1 − T_C/T_H (KELVIN!); 3rd=0 K unreachable. Heat modes: Conduction (touch), Convection (fluid), Radiation (space)!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "An ideal Carnot heat engine operates between `T_H = 500 K` and `T_C = 300 K`. What is its maximum theoretical efficiency (in %)?", answer: "40", hint: "η = 1 − (300 / 500) = 1 − 0.60 = 0.40 → multiply by 100%!", whyEasy: "1 − 3/5 = 2/5 = 40% max — even with zero friction!" },
        { type: "mc", prompt: "Which Law of Thermodynamics explains why a 100%-efficient heat engine (converting ALL heat into mechanical work with zero waste heat) is physically IMPOSSIBLE?", options: ["2nd Law of Thermodynamics (Entropy / Kelvin-Planck)", "0th Law", "Hooke's Law", "Ohm's Law"], answer: "2nd Law of Thermodynamics (Entropy / Kelvin-Planck)", hint: "You can never turn 100% of random thermal jiggling into orderly work without dumping some heat to a cold sink!", whyEasy: "The 2nd Law sets the absolute Carnot speed limit `η < 1`!" },
        { type: "input", prompt: "1st Law of Thermodynamics: A gas absorbs `Q = 500 J` of heat and expands doing `W = 200 J` of work on a piston. Change in internal energy `ΔU = Q − W` (Joules)?", answer: "300", hint: "500 J came in, 200 J left as work!", whyEasy: "500 − 200 = +300 J left inside the gas!" },
        { type: "mc", prompt: "How does thermal energy from the Sun travel 150 million km through the empty vacuum of space to warm Earth?", options: ["Radiation (electromagnetic waves — needs no medium!)", "Conduction", "Convection", "Sound waves"], answer: "Radiation (electromagnetic waves — needs no medium!)", hint: "Conduction needs touch; Convection needs air/water; what crosses empty vacuum?", whyEasy: "Radiation carries solar energy straight across vacuum space!" },
        { type: "mc", prompt: "When computing Carnot efficiency `η = 1 − T_C / T_H`, what temperature unit MUST you ALWAYS use?", options: ["Kelvin (K = °C + 273)", "Celsius (°C)", "Fahrenheit (°F)", "Joules"], answer: "Kelvin (K = °C + 273)", hint: "Dividing by `0°C` would blow up to infinity — use an absolute zero scale!", whyEasy: "Thermodynamic ratios (`PV=nRT`, Carnot `T_C/T_H`) ALWAYS require Kelvin!" }
      ]
    },
    {
      id: "physics-faraday-induction-ac-maxwell",
      worldId: "physics",
      order: 158,
      title: "Faraday's Law, Lenz's Law, Transformers & Maxwell",
      icon: "⚡",
      tagline: "CHANGING magnetic flux induces voltage (`E = −N ΔΦ/Δt`)! Lenz's Law: induced current OPPOSES the change! Light = EM wave!",
      scaryVersion: "Electromagnetic induction, Lenz conservation opposition, AC transformer coupling, and Maxwell's unification.",
      easyTruth: "Static magnets sitting still inside a coil make ZERO electricity — **CHANGE** is the magic word! Move a magnet (or spin a turbine!) through a wire coil and magnetic flux changes, generating the electricity powering your entire house! **Lenz's Law** (the minus sign) says nature is stubborn: induced current ALWAYS pushes BACK against the change (saving Conservation of Energy!).",
      microSteps: [
        { label: "Step 1: Faraday's Law (`ε = −N ΔΦ_B / Δt`) & Lenz's Law", text: "Magnetic flux `Φ_B = B·A·cos θ`. Voltage (EMF) is induced ONLY when `B`, area `A`, or angle `θ` **CHANGES**! More turns `N` or faster spin → bigger voltage! **Lenz's Law** (the minus sign): push a North pole IN → coil creates a North pole to REPEL it; pull North OUT → coil makes a South pole to PULL it back!" },
        { label: "Step 2: Transformers (`V_s / V_p = N_s / N_p`) — Why Power Grids Use AC!", text: "Transformers ONLY work on **AC** (constantly changing current/flux — DC gives zero change!). More secondary turns (`N_s > N_p`) = **Step-Up** (higher voltage, LOWER current to cut `I²R` power line heat loss!). Ideal power stays conserved: `V_p I_p = V_s I_s`!" },
        { label: "Step 3: Maxwell's 4 Equations Unified Light & Electromagnetism!", text: "James Clerk Maxwell combined Gauss's E-law, Gauss's B-law (no magnetic monopoles!), Faraday's Law (changing B makes E), and Ampère–Maxwell (changing E makes B) — discovering self-sustaining **Electromagnetic Waves** moving at `c = 1/√(μ₀ε₀) = 3×10⁸ m/s`: **LIGHT IS AN EM WAVE!**" }
      ],
      cheatCode: "Induction needs CHANGING flux (static = 0 V!). Lenz = opposes change (conserves energy!). Transformer (AC ONLY!): V_s/V_p = N_s/N_p, V_pI_p = V_sI_s. Maxwell: Light = EM wave at c!",
      visualizerId: "electroMagLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "You hold an ultra-strong neodymium magnet completely STILL inside a copper wire loop. The induced current in the loop is:", options: ["ZERO (Faraday's Law requires CHANGING magnetic flux!)", "Maximum DC current", "Infinite voltage", "Alternating 60 Hz"], answer: "ZERO (Faraday's Law requires CHANGING magnetic flux!)", hint: "Check `ΔΦ_B / Δt` when nothing is moving or changing!", whyEasy: "No change (`ΔΦ = 0`) → zero induced EMF! Move the magnet or spin the loop to generate power!" },
        { type: "input", prompt: "An ideal AC transformer has `N_p = 100` primary turns (`V_p = 120 V`) and `N_s = 25` secondary turns. Output voltage `V_s` (in Volts)?", answer: "30", hint: "Use `V_s / V_p = N_s / N_p` → `25 / 100 = 1/4` of `120 V`!", whyEasy: "Quarter the turns = quarter the voltage: `120 ÷ 4 = 30 V` (Step-Down transformer)!" },
        { type: "mc", prompt: "Why do transformers require Alternating Current (AC) and FAIL to transform steady Direct Current (DC)?", options: ["Only AC continuously changes magnetic flux `ΔΦ/Δt` to induce voltage in the secondary coil", "DC wires melt instantly", "Transformers only work at 0 V", "Copper blocks DC"], answer: "Only AC continuously changes magnetic flux `ΔΦ/Δt` to induce voltage in the secondary coil", hint: "Steady DC makes a constant magnetic field (`ΔΦ/Δt = 0`)!", whyEasy: "That's why Tesla's AC won the War of Currents for long-distance power grids!" },
        { type: "mc", prompt: "What fundamental physics law does **Lenz's Law** (induced current always opposes the change causing it) enforce?", options: ["Conservation of Energy (stops free perpetual-motion electricity!)", "Ideal Gas Law", "Gravity", "Ohm's Law"], answer: "Conservation of Energy (stops free perpetual-motion electricity!)", hint: "If induced current HELPED push the magnet in faster, you'd get infinite free energy!", whyEasy: "You must do real mechanical work pushing against Lenz opposition to generate electrical energy!" },
        { type: "mc", prompt: "What breathtaking discovery emerged when James Clerk Maxwell united electricity and magnetism in his 4 equations?", options: ["Light itself is a self-propagating Electromagnetic Wave traveling at `c = 3×10⁸ m/s`!", "Protons are heavier than suns", "Sound moves faster than light", "Magnetic monopoles are everywhere"], answer: "Light itself is a self-propagating Electromagnetic Wave traveling at `c = 3×10⁸ m/s`!", hint: "Changing E creates B, changing B creates E — zipping through vacuum at `1/√(μ₀ε₀)`!", whyEasy: "Radio, Wi-Fi, microwaves, visible light, X-rays, and gamma rays are ALL Maxwell's EM waves!" }
      ]
    },
    {
      id: "physics-quantum-photoelectric-nuclear",
      worldId: "physics",
      order: 159,
      title: "Quantum Photons, Photoelectric Effect & Nuclear Decay",
      icon: "⚛️",
      tagline: "Energy comes in packets (`E = hf`)! Ejecting electrons needs HIGH FREQUENCY (not brightness!). Half-life cuts atoms by ½ each step!",
      scaryVersion: "Quantized photon energetics, Einstein photoelectric threshold, wave-particle duality, and nuclear half-life decay.",
      easyTruth: "At atomic scales, energy isn't a smooth smoothie — it's **quantized** into discrete Lego packets called **Photons** (`E = hf`, Planck & Einstein!). Shining blindingly bright red light on zinc ejects ZERO electrons if each red photon lacks threshold energy, while a single dim ultraviolet photon knocks an electron clean out! That discovery won Einstein his Nobel Prize and powers solar panels & chips!",
      microSteps: [
        { label: "Step 1: Photon Energy (`E = hf = hc/λ`) & Photoelectric Effect", text: "Higher frequency `f` (shorter wavelength `λ`, like UV/Blue > Red) = MORE energetic photons! Einstein's Photoelectric Law: `K_max = hf − φ` (where `φ` = metal work function). Increasing light **FREQUENCY** raises ejected electron speed; increasing **INTENSITY (brightness)** sends MORE photons → ejects MORE electrons (higher current!), ONLY if `f > f_threshold`!" },
        { label: "Step 2: Wave-Particle Duality & Heisenberg Uncertainty", text: "de Broglie showed ALL matter has a wavelength `λ = h / (mv)` (electrons diffract like waves!). Heisenberg Uncertainty (`Δx · Δp ≥ ℏ/2`) says nature itself forbids knowing a particle's exact position AND exact momentum simultaneously!" },
        { label: "Step 3: Nuclear Decay (Alpha, Beta, Gamma) & Half-Life (`t_{1/2}`)", text: "**Alpha (`α` = ⁴₂He)**: drops mass −4, atomic # −2 (stopped by paper!). **Beta (`β⁻` = electron)**: neutron → proton + e⁻ (mass same, atomic # +1!). **Gamma (`γ`)**: high-energy photon (needs thick lead!). **Half-Life**: after `n` half-lives, remaining fraction is `(1/2)ⁿ` (3 half-lives → `1/8 = 12.5%` left!)." }
      ],
      cheatCode: "E = hf = hc/λ. Photoelectric: Frequency controls ejection/KE; Brightness controls count (if f > f₀). Half-life: N = N₀·(½)ⁿ! Alpha (−4, −2); Beta (0, +1); Gamma (photon)!",
      visualizerId: "chemistryAtomPhLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "In Einstein's Photoelectric Effect, dim violet light ejects electrons from a metal surface, while super-bright red light ejects ZERO. Why?", options: ["Each red photon has too low frequency (`E = hf < φ`) regardless of how many photons arrive!", "Red light moves slower than violet light", "Electrons are colorblind to brightness", "Red light has zero wavelength"], answer: "Each red photon has too low frequency (`E = hf < φ`) regardless of how many photons arrive!", hint: "1,000 ping-pong balls still can't knock over a bowling pin if each ball lacks threshold energy!", whyEasy: "1 photon interacts with 1 electron: frequency sets per-photon energy `E = hf`!" },
        { type: "input", prompt: "A radioactive isotope starts at `80 g` and has a half-life of `5 years`. How many grams remain after `15 years` (3 half-lives)?", answer: "10", hint: "Halve it 3 times: 80 → 40 → 20 → ?", whyEasy: "80 × (1/2)³ = 80 ÷ 8 = 10 grams!" },
        { type: "mc", prompt: "When an unstable Uranium-238 nucleus (Z = 92) emits an **Alpha particle (`⁴₂He`)**, its new mass number and atomic number are:", options: ["Mass 234, Atomic # 90 (Thorium)", "Mass 238, Atomic # 93", "Mass 236, Atomic # 88", "Unchanged (238, 92)"], answer: "Mass 234, Atomic # 90 (Thorium)", hint: "Subtract 4 from mass (238 − 4) and 2 from protons (92 − 2)!", whyEasy: "Alpha decay always sheds 2 protons + 2 neutrons (`−4` mass, `−2` atomic #)!" },
        { type: "mc", prompt: "If light frequency `f` is above threshold (`f > f₀`) and you DOUBLE the light's intensity (brightness), what happens to the emitted photoelectrons?", options: ["Twice as many electrons are ejected per second (same max KE per electron!)", "Each electron doubles its max speed", "Zero electrons are ejected", "Work function doubles"], answer: "Twice as many electrons are ejected per second (same max KE per electron!)", hint: "Doubling brightness = doubling the COUNT of photons per second (each still has energy `hf`)!", whyEasy: "More photons → more ejected electrons (higher photocurrent), while `K_max = hf − φ` stays unchanged!" },
        { type: "mc", prompt: "What does Heisenberg's Uncertainty Principle (`Δx · Δp ≥ ℏ/2`) state about quantum particles?", options: ["You cannot simultaneously know a particle's exact position and exact momentum beyond a fundamental quantum limit", "Measuring devices are just poorly built today", "Energy is never conserved", "Photons have infinite mass"], answer: "You cannot simultaneously know a particle's exact position and exact momentum beyond a fundamental quantum limit", hint: "It's an intrinsic property of quantum waves, not a cheap ruler problem!", whyEasy: "Squeezing a wave tightly in position (`↓Δx`) inherently spreads out its wavelength/momentum (`↑Δp`)!" }
      ]
    },

    // ---------- MORE MATH BASICS & ESSENTIALS (+5 NODES) ----------
    {
      id: "math-estimation-mental-shortcuts",
      worldId: "elementary",
      order: 160,
      title: "Mental Math Superpowers & Estimation Sanity Checks",
      icon: "⚡",
      tagline: "`×5` = half then `×10`! `×11` = split & sum middle! Squaring `n5²` = `n(n+1) | 25` (`35² = 1225`!) + Sanity Estimates!",
      scaryVersion: "Mental arithmetic factorization heuristics and order-of-magnitude numerical estimation.",
      easyTruth: "Math geniuses aren't doing ugly long multiplication in their heads — they use 4 ridiculously easy cheat shortcuts! Want `48 × 5`? Half of 48 is 24, slap on a 0 → **240**! Want `35²`? Do `3 × 4 = 12`, slap on `25` → **1,225**! Want `53 × 11`? Split `5_3`, drop `5+3=8` in the middle → **583**!",
      microSteps: [
        { label: "Step 1: Instant ×5, ×25, and ×9 Shortcuts", text: "**×5**: Divide by 2, then ×10 (`64 × 5 = 32 × 10 = 320`!). **×25**: Divide by 4, then ×100 (`24 × 25 = 6 × 100 = 600`!). **×9**: Multiply by 10, then subtract once (`17 × 9 = 170 − 17 = 153`!)." },
        { label: "Step 2: Instant ×11 & Squaring Any Number Ending in 5!", text: "**×11 (2-digit `ab`)**: Put `a + b` in the middle (`43 × 11` → `4 (4+3) 3 = 473`! If sum ≥ 10, carry the 1!). **Squaring `n5²`**: Multiply `n × (n+1)`, then attach `25` (`65²` → `6×7 = 42` → **4,225**! `85²` → `8×9 = 72` → **7,225**!)." },
        { label: "Step 3: Front-End Estimation (Never Trust a Typo!)", text: "Before accepting a calculator or exam answer for `49 × 21`, estimate `50 × 20 = 1,000`! If an option says `10,290` or `129`, you instantly spot it's off by 10× without computing a single digit!" }
      ],
      cheatCode: "×5 = ÷2 ×10 · ×25 = ÷4 ×100 · ×11 = split & sum middle · (n5)² = n(n+1) | 25! Always round & estimate to catch 10× mistakes!",
      visualizerId: "rectangleMultiplier",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "Mental Shortcut (`n5² = n(n+1) | 25`): What is `45²` instantly?", answer: "2025", hint: "4 × 5 = 20, then slap `25` onto the end!", whyEasy: "4×5 = 20 → 2,025 in 1 second flat!" },
        { type: "input", prompt: "Mental Shortcut (`×5 = ÷2 × 10`): What is `86 × 5`?", answer: "430", hint: "Half of 86 is 43, then slap on a 0!", whyEasy: "43 × 10 = 430 — zero carrying!" },
        { type: "input", prompt: "Mental Shortcut (`×11` split & add): What is `36 × 11`?", answer: "396", hint: "Split `3 _ 6` and put `3 + 6 = 9` in the middle!", whyEasy: "3 (3+6) 6 = 396!" },
        { type: "input", prompt: "Mental Shortcut (`×25 = ÷4 × 100`): What is `32 × 25`?", answer: "800", hint: "32 ÷ 4 = 8, then multiply by 100!", whyEasy: "8 × 100 = 800!" },
        { type: "mc", prompt: "Quick Estimation Check: Which answer MUST be `19.8 × 51.2` without doing full multiplication?", options: ["1,013.76 (close to 20 × 50 = 1,000!)", "101.376", "10,137.6", "71.0"], answer: "1,013.76 (close to 20 × 50 = 1,000!)", hint: "Round to clean anchor numbers: `20 × 50 = 1,000`!", whyEasy: "Order-of-magnitude estimation instantly kills decimal-point traps!" }
      ]
    },
    {
      id: "math-set-theory-venn-logic",
      worldId: "junior",
      order: 161,
      title: "Set Theory, Venn Diagrams & Inclusion–Exclusion",
      icon: "⭕",
      tagline: "`∪` (Union = ALL in A OR B), `∩` (Intersection = BOTH A AND B!). Never double-count the overlap: `|A ∪ B| = |A| + |B| − |A ∩ B|`!",
      scaryVersion: "Naive set algebra, Venn cardinality partitioning, and the Inclusion–Exclusion principle.",
      easyTruth: "Think of `∪` like a big cup scooping EVERYTHING in A or B together, and `∩` like an arch trapping ONLY the middle overlap shared by BOTH! The #1 exam trick: if 20 kids play Basketball, 15 play Chess, and 5 play BOTH, total kids isn't `20 + 15 = 35` — those 5 got counted TWICE, so subtract the overlap once (`35 − 5 = 30`)!",
      microSteps: [
        { label: "Step 1: The 4 Essential Set Symbols", text: "**Union `A ∪ B`**: in A OR B (or both — big bowl!). **Intersection `A ∩ B`**: in BOTH A AND B (overlap!). **Complement `A'`** (or `Aᶜ`): everything OUTSIDE A! **Subset `A ⊆ B`**: every element of A sits inside B (a set of `n` items has **`2ⁿ` subsets** including the empty set `∅`!)." },
        { label: "Step 2: Inclusion–Exclusion Formula (Beats Every Venn Word Problem!)", text: "`|A ∪ B| = |A| + |B| − |A ∩ B|`! Always draw the middle overlap FIRST when filling a Venn diagram: 'Only A' = `|A| − |Both|`; 'Only B' = `|B| − |Both|`; 'Neither' = `Total − |A ∪ B|`!" },
        { label: "Step 3: De Morgan's Laws (Math + Coding Twin!)", text: "`(A ∪ B)' = A' ∩ B'` and `(A ∩ B)' = A' ∪ B'` — flipping a NOT across parentheses swaps OR ↔ AND (exact same law used in Python `not (a or b) == (not a) and (not b)`!)!" }
      ],
      cheatCode: "∪ = OR (cup scoops all); ∩ = AND (overlap). |A ∪ B| = |A| + |B| − |A ∩ B|! Fill middle overlap FIRST! Set of n items has 2ⁿ subsets!",
      visualizerId: "geometryLogicLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "In a club, 18 students speak English, 14 speak Filipino, and 6 speak BOTH. How many students speak at least one (`|E ∪ F|`)?", answer: "26", hint: "Inclusion-Exclusion: `18 + 14 − 6` (subtract the double-counted overlap once)!", whyEasy: "18 + 14 − 6 = 26 unique students!" },
        { type: "mc", prompt: "Given `A = {1, 2, 3, 4}` and `B = {3, 4, 5, 6}`, what is the Intersection `A ∩ B`?", options: ["`{3, 4}`", "`{1, 2, 3, 4, 5, 6}`", "`{1, 2}`", "`∅`"], answer: "`{3, 4}`", hint: "`∩` keeps ONLY elements appearing in BOTH A and B!", whyEasy: "Only 3 and 4 live in both sets → `{3, 4}`!" },
        { type: "input", prompt: "A class of 40 students has 22 in Music, 20 in Art, and 7 in BOTH. How many students are in NEITHER Music nor Art?", answer: "5", hint: "First find `|M ∪ A| = 22 + 20 − 7 = 35`, then subtract from 40!", whyEasy: "35 are in at least one club, leaving `40 − 35 = 5` in neither!" },
        { type: "input", prompt: "How many total subsets (including `∅` and the set itself) does a 4-element set `{a, b, c, d}` have?", answer: "16", hint: "Each of the 4 items has 2 choices (in or out) → `2⁴`!", whyEasy: "2⁴ = 16 subsets!" },
        { type: "mc", prompt: "By De Morgan's Law, the complement of a Union `(A ∪ B)'` is ALWAYS identical to:", options: ["`A' ∩ B'` (NOT A and NOT B!)", "`A' ∪ B'`", "`A ∩ B`", "`∅`"], answer: "`A' ∩ B'` (NOT A and NOT B!)", hint: "Distributing NOT flips Union `∪` into Intersection `∩`!", whyEasy: "Not being in (A or B) means you're neither in A AND not in B!" }
      ]
    },
    {
      id: "math-inequalities-intervals-sign-charts",
      worldId: "senior",
      order: 162,
      title: "Inequalities, Interval Notation & Sign Charts",
      icon: "📊",
      tagline: "Bracket `[` = INCLUDED (`≤, ≥`); Paren `(` = EXCLUDED (`<, >`, and ALWAYS `∞`!). Test intervals on a Sign Chart!",
      scaryVersion: "Real-line interval topology and critical-point sign analysis for polynomial/rational inequalities.",
      easyTruth: "Interval notation is just a sleek shorthand for number-line segments: square `[` hugs the endpoint tightly (included!), round `(` leaves it open (excluded — infinity `∞` ALWAYS gets `(` because you can never stand ON infinity!). And to solve `(x − 2)(x + 3) > 0`, just mark roots `−3` and `2` on a number line and test `+ / − / +`!",
      microSteps: [
        { label: "Step 1: Interval Notation Decoded in 10 Seconds", text: "`-2 ≤ x < 5` becomes **`[-2, 5)`**! `x > 3` becomes **`(3, ∞)`**! `x ≤ 4` becomes **`(-∞, 4]`**! Notice: `∞` and `−∞` ALWAYS take round parentheses `(` or `)` — NEVER square brackets!" },
        { label: "Step 2: Solving Quadratic Inequalities With a Sign Chart", text: "Solve `x² − x − 6 < 0` → Factor: `(x − 3)(x + 2) < 0`! Roots `x = −2` and `x = 3` chop the number line into 3 zones: `(-∞, -2)` gives `(-)(-) = +`; `(-2, 3)` gives `(-)(+) = −`; `(3, ∞)` gives `(+)(+) = +`! We want `< 0` (negative), so answer = **`(-2, 3)`**!" },
        { label: "Step 3: NEVER Multiply a Rational Inequality by Variable `x`!", text: "If solving `1/x > 2`, multiplying by `x` breaks if `x` could be NEGATIVE (you wouldn't know whether to flip `>`!). Move everything to one side (`1/x − 2 > 0`), combine `(1 − 2x)/x > 0`, and put BOTH numerator & denominator zeros (`x = 0, 1/2`) on your Sign Chart!" }
      ],
      cheatCode: "[ ] = included (≤/≥); ( ) = excluded (</>, ALWAYS ±∞!). Quadratic/Rational inequalities: Factor → plot critical points → test signs (+/−/+)!",
      visualizerId: "algebraBalanceScale",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Write `-4 < x ≤ 7` cleanly in Interval Notation:", options: ["`(-4, 7]`", "`[-4, 7)`", "`[-4, 7]`", "`(-4, 7)`"], answer: "`(-4, 7]`", hint: "Strict `<` uses open `(`, while `≤` uses closed `]`!", whyEasy: "−4 excluded `(`, 7 included `]` → `(-4, 7]`!" },
        { type: "mc", prompt: "Solve `(x − 1)(x − 5) < 0` using a Sign Chart (test `x = 0, 3, 6`):", options: ["`(1, 5)`", "`(-∞, 1) ∪ (5, ∞)`", "`[1, 5]`", "`(5, ∞)`"], answer: "`(1, 5)`", hint: "At `x = 3`: `(3−1)(3−5) = (+2)(-2) = -4 < 0` ✓!", whyEasy: "Upward parabola dips below 0 strictly BETWEEN its two roots → `(1, 5)`!" },
        { type: "mc", prompt: "Why is `(-∞, 5]` written with a round parenthesis `(` next to `-∞` instead of a square bracket `[`?", options: ["Infinity is a direction, not a real number you can reach or include", "Typo in textbooks", "Brackets are only for positive numbers", "Negative numbers never use brackets"], answer: "Infinity is a direction, not a real number you can reach or include", hint: "Square bracket means 'reaches and includes this exact endpoint'!", whyEasy: "`−∞` and `+∞` ALWAYS take round parentheses!" },
        { type: "mc", prompt: "Solve the compound inequality `3 ≤ 2x − 1 < 9`:", options: ["`[2, 5)`", "`(2, 5]`", "`[1, 4)`", "`[2, 5]`"], answer: "`[2, 5)`", hint: "Add 1 to ALL three parts (`4 ≤ 2x < 10`), then divide all three by 2!", whyEasy: "2 ≤ x < 5 → `[2, 5)`!" },
        { type: "mc", prompt: "In `(x + 2) / (x − 4) ≥ 0`, which critical point MUST NEVER get a closed bracket `[` even though the inequality has `≥`?", options: ["`x = 4` (makes denominator 0 → undefined!)", "`x = −2`", "Both get closed brackets", "`x = 0`"], answer: "`x = 4` (makes denominator 0 → undefined!)", hint: "Never divide by zero!", whyEasy: "Numerator root `−2` is included (`-2]` ok), but denominator root `4` is ALWAYS excluded (`(4, ∞)`)!" }
      ]
    },
    {
      id: "math-stats-correlation-regression-zscore",
      worldId: "senior",
      order: 163,
      title: "Z-Scores, Correlation vs Causation & Regression",
      icon: "📈",
      tagline: "`z = (x − μ) / σ` measures standard deviations from average! `r ∈ [-1, 1]` shows linear link — NEVER proves Causation!",
      scaryVersion: "Standardized normal z-scores, Pearson linear correlation, confounding bias, and OLS regression.",
      easyTruth: "Statistics is your ultimate BS detector! A **Z-score** tells you how impressive a score really is (`z = +2` beats 97.5% of the crowd!). **Correlation `r`** measures how tightly two variables move together (`+1` = lockstep up, `−1` = opposite, `0` = no linear trend) — BUT remember: **Ice cream sales & shark attacks correlate strongly (`r = +0.85`) only because SUMMER HEAT (a confounding variable!) causes BOTH!**",
      microSteps: [
        { label: "Step 1: Z-Score (`z = (x − μ) / σ`) & 68–95–99.7 Rule", text: "Mean `μ = 70`, SD `σ = 10`: a score of `x = 90` has `z = (90 − 70)/10 = +2.0` (2 SDs above average!). On a bell curve: **68%** fall within `±1σ`, **95%** within `±2σ`, and **99.7%** within `±3σ`!" },
        { label: "Step 2: Correlation `r` (−1 to +1) ≠ Causation!", text: "`r = +0.95` = strong positive linear link; `r = −0.90` = strong negative link (equally strong predictability!); `r = 0` = no straight-line link. Correlation NEVER proves A causes B — watch for hidden **Confounding Variables** (like summer heat) or **Reverse Causation**! Only Randomized Controlled Experiments establish true causation!" },
        { label: "Step 3: Reading Linear Regression (`ŷ = mx + b`) & Extrapolation Trap", text: "Slope `m` = predicted change in `y` for EVERY `+1` increase in `x`. Intercept `b` = prediction at `x = 0`. Never extrapolate wildly outside your data range (a baby growing 5 cm/yr won't be 5 meters tall at age 100!)." }
      ],
      cheatCode: "z = (x − μ)/σ (68-95-99.7%). r ∈ [-1, +1] (|r| near 1 = strong!). Correlation ≠ Causation (hunt Confounders!). Regression slope m = Δŷ per +1 in x!",
      visualizerId: "unitCircleAndGraphLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Compare two different exams using Z-scores: You got `85` on Exam A (`μ = 70, σ = 10`) vs `84` on Exam B (`μ = 80, σ = 4`). On which exam did you perform BETTER relative to the class?", options: ["Exam A (`z = +1.5` beats Exam B's `z = +1.0`!)", "Exam B (higher class mean)", "Identical relative performance", "Cannot compare different exams"], answer: "Exam A (`z = +1.5` beats Exam B's `z = +1.0`!)", hint: "Compute `z = (x − μ) / σ` for both exams: `(85−70)/10` vs `(84−80)/4`!", whyEasy: "Z-scores put totally different scales on one common ruler: `z = +1.5` beats `z = +1.0`!" },
        { type: "mc", prompt: "Which Pearson correlation coefficient represents the STRONGEST linear relationship between two variables?", options: ["`r = −0.92`", "`r = +0.75`", "`r = +0.10`", "`r = 0.00`"], answer: "`r = −0.92`", hint: "Strength depends on magnitude `|r|` closest to 1 — sign ONLY tells direction (up vs down)!", whyEasy: "`|−0.92| = 0.92` is much tighter than `0.75` — strong negative correlation!" },
        { type: "mc", prompt: "Data shows cities with more firefighters at a fire suffer greater property damage (`r = +0.88`). Does sending fewer firefighters reduce fire damage?", options: ["No — fire SIZE is a confounding variable causing BOTH more firefighters and more damage!", "Yes — firefighters cause damage", "Correlation always proves causation", "The math must be wrong"], answer: "No — fire SIZE is a confounding variable causing BOTH more firefighters and more damage!", hint: "Hunt the hidden third variable driving both!", whyEasy: "Spotting confounding variables is the #1 skill in data literacy!" },
        { type: "mc", prompt: "A regression line predicting exam score `ŷ` from study hours `x` is `ŷ = 6x + 52`. What does the slope `6` mean?", options: ["Each extra +1 hour of study predicts +6 more exam points on average", "Studying 0 hours gives 6 points", "Max score is 6", "6% correlation"], answer: "Each extra +1 hour of study predicts +6 more exam points on average", hint: "Slope `m` = Δy per +1 unit of x!", whyEasy: "52 is the 0-hour baseline; +6 is the predicted gain per additional study hour!" },
        { type: "mc", prompt: "On a Normal bell curve, roughly what percentage of values lie within `±2` standard deviations (`z` between −2 and +2)?", options: ["95%", "68%", "50%", "99.7%"], answer: "95%", hint: "Recall the Empirical Rule: 68 – 95 – 99.7!", whyEasy: "±1σ = 68%, ±2σ = 95%, ±3σ = 99.7%!" }
      ]
    },
    {
      id: "math-game-theory-graph-theory",
      worldId: "college",
      order: 164,
      title: "Graph Theory, Euler Paths & Game Theory (Nash)",
      icon: "♟️",
      tagline: "Euler's Bridge Law: draw a graph in 1 stroke iff it has **0 or 2 ODD-degree nodes**! Nash Equilibrium = no player gains by switching alone!",
      scaryVersion: "Combinatorial graph Eulerian traversal criteria and strategic-form Nash equilibrium analysis.",
      easyTruth: "Two of the coolest branches of applied math power Google Maps, AI, economics, and social networks! **Graph Theory** boils maps & friendships down to dots (Vertices) and links (Edges) — Euler proved in 1736 you can trace ANY connected shape without lifting your pen **only if 0 or 2 corners have an ODD number of lines!** And **Game Theory** explains why rational rivals get stuck in the **Prisoner's Dilemma**!",
      microSteps: [
        { label: "Step 1: Graphs, Degree & The Handshaking Lemma", text: "A Graph `G = (V, E)` has Vertices (nodes) and Edges (connections). A vertex's **Degree** = number of edges touching it. **Handshaking Lemma**: every edge has 2 ends, so the sum of all degrees ALWAYS equals **`2 × |E|`** (always EVEN!)!" },
        { label: "Step 2: Euler's Königsberg Bridge Theorem (1-Stroke Drawing Rule!)", text: "Can you trace EVERY edge exactly once without lifting your pen? Count vertices with **ODD** degree! **0 odd vertices** → Euler Circuit (starts & ends at same spot!). **2 odd vertices** → Euler Path (must start at one odd vertex and end at the other!). **4+ odd vertices** → **IMPOSSIBLE** (just like the 7 Bridges of Königsberg!)!" },
        { label: "Step 3: Game Theory — Dominant Strategy & Nash Equilibrium", text: "In the **Prisoner's Dilemma**, two suspects individually do better by **Defecting** no matter what the other does (a **Dominant Strategy**!) — locking BOTH into `(Defect, Defect)`, a **Nash Equilibrium** (neither can improve by switching unilaterally), even though `(Cooperate, Cooperate)` would have made BOTH better off!" }
      ],
      cheatCode: "Sum of degrees = 2|E|. 1-stroke Euler path exists iff 0 or 2 ODD vertices! Nash Equilibrium = nobody wants to change strategy alone (Prisoner's Dilemma → Defect, Defect)!",
      visualizerId: "geometryLogicLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Euler's 1-Stroke Rule: A connected graph has 4 vertices with degrees `[3, 3, 3, 3]`. Can you trace every edge exactly once without lifting your pen?", options: ["No — it has 4 ODD-degree vertices (only 0 or 2 odd vertices allow an Euler path!)", "Yes, starting anywhere", "Yes, because 3+3+3+3 is even", "Only if drawn clockwise"], answer: "No — it has 4 ODD-degree vertices (only 0 or 2 odd vertices allow an Euler path!)", hint: "Count how many vertices have an ODD degree (allowed: 0 or 2 ONLY)!", whyEasy: "That's the exact proof Euler used to prove the 7 Bridges of Königsberg impossible in 1736!" },
        { type: "input", prompt: "Handshaking Lemma: A social network graph has `15` friendship edges. What is the SUM of all vertices' degrees (`Σ deg(v) = 2|E|`)?", answer: "30", hint: "Every edge touches 2 people (2 endpoints)!", whyEasy: "2 × 15 = 30 total degree endpoints!" },
        { type: "mc", prompt: "What defines a **Nash Equilibrium** in Game Theory?", options: ["A state where NO player can improve their payoff by changing only their own strategy", "Always the highest total group profit", "When both players flip coins randomly", "A game with zero rules"], answer: "A state where NO player can improve their payoff by changing only their own strategy", hint: "Mutual 'no-regret' stability — even if the outcome isn't socially optimal!", whyEasy: "At Nash Equilibrium, every player is playing their best response to everyone else!" },
        { type: "mc", prompt: "Why is the classic one-shot **Prisoner's Dilemma** famous across economics, biology, and AI?", options: ["Individual self-interest (Defect) leads to a worse outcome for BOTH players than mutual Cooperation", "Both players always cooperate automatically", "Mathematics cannot solve it", "There is no Nash Equilibrium"], answer: "Individual self-interest (Defect) leads to a worse outcome for BOTH players than mutual Cooperation", hint: "Each player's dominant strategy is Defect, trapping both in `(Defect, Defect)`!", whyEasy: "Explains arms races, climate free-riding, and why repeated games/trust build cooperation!" },
        { type: "mc", prompt: "If a connected graph has **exactly 2** odd-degree vertices (A and B) and all other vertices have even degree, where MUST an Euler Path start and end?", options: ["Start at one odd vertex (A) and end at the other odd vertex (B)", "Start and end at the exact same even vertex", "It is impossible", "Must skip 1 edge"], answer: "Start at one odd vertex (A) and end at the other odd vertex (B)", hint: "Every middle visit enters & leaves (+2), so only the start and finish can be odd!", whyEasy: "Classic house-with-an-X envelope puzzle: start at bottom-left odd corner, end at bottom-right odd corner!" }
      ]
    },
    {
      id: "physics-mirrors-lenses-concave-convex",
      worldId: "physics",
      order: 165,
      title: "Concave & Convex Mirrors, Lenses & Ray Diagrams",
      icon: "🔍",
      tagline: "Concave Mirror & Convex Lens CONVERGE (`f > 0`)! Convex Mirror & Concave Lens DIVERGE (`f < 0` → ALWAYS Virtual, Upright, Smaller)!",
      scaryVersion: "Paraxial geometric optics, thin-lens/spherical-mirror Gaussian imaging, and transverse magnification.",
      easyTruth: "Remember just ONE word — **CAVE**! A **CONCAVE** mirror caves IN like a spoon bowl (`f > 0`, focuses rays together!), while a **CONVEX** mirror bulges OUT (`f < 0`, spreads rays apart — just like a car side mirror!). For **LENSES**, the shape flips: a thick-middle **CONVEX** lens converges (`f > 0`, magnifying glass!), while a thin-middle **CONCAVE** lens diverges (`f < 0`, nearsighted glasses!).",
      microSteps: [
        { label: "Step 1: Converging (`f > 0`) vs Diverging (`f < 0`) Flip Rule", text: "**CONVERGING (`f > 0`)**: Concave Mirror AND Convex Lens! They can form Real Inverted images (when `d_o > f`) OR Magnified Virtual Upright images (when `d_o < f`, like a magnifying glass or makeup mirror!). **DIVERGING (`f < 0`)**: Convex Mirror AND Concave Lens — ALWAYS form **Virtual, Upright, Smaller** images no matter where you stand!" },
        { label: "Step 2: Universal Mirror & Thin-Lens Equation + Magnification", text: "`1/f = 1/d_o + 1/d_i` and `m = −d_i / d_o = h_i / h_o`! Sign Decoder: **`d_i > 0`** = REAL & Inverted (`m < 0`); **`d_i < 0`** = VIRTUAL & Upright (`m > 0`)! **`|m| > 1`** = Magnified; **`|m| < 1`** = Reduced!" },
        { label: "Step 3: 3-Zone Shortcut for Converging Optics (No Math Needed!)", text: "Object beyond `2f` (`d_o > 2f`): Real, Inverted, SMALLER. Object right AT `2f`: Real, Inverted, SAME size (`d_i = 2f`, `m = −1`)! Object between `f` and `2f`: Real, Inverted, BIGGER! Object inside `f` (`d_o < f`): VIRTUAL, UPRIGHT, BIGGER!" }
      ],
      cheatCode: "Converging (f > 0) = Concave Mirror OR Convex Lens. Diverging (f < 0) = Convex Mirror OR Concave Lens (ALWAYS Virtual, Upright, Smaller!). 1/f = 1/d_o + 1/d_i; m = −d_i/d_o!",
      visualizerId: "opticsConcaveConvexLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Why do car passenger-side **CONVEX** mirrors print 'Objects in mirror are closer than they appear'?", options: ["Convex mirrors diverge light (`f < 0`), ALWAYS producing a smaller, upright, virtual wide-angle image", "Convex mirrors invert cars upside down", "Convex mirrors magnify objects 10×", "They only reflect red light"], answer: "Convex mirrors diverge light (`f < 0`), ALWAYS producing a smaller, upright, virtual wide-angle image", hint: "Diverging optics ALWAYS make Virtual, Upright, Reduced images — showing a wider road view!", whyEasy: "Smaller image makes cars look farther away while giving a huge wide-angle field of view!" },
        { type: "input", prompt: "Thin-Lens Equation (`1/f = 1/d_o + 1/d_i`): A Converging Convex Lens (`f = +10 cm`) has an object at `d_o = 30 cm`. Find image distance `d_i` (in cm):", answer: "15", hint: "`1/d_i = 1/10 − 1/30 = 3/30 − 1/30 = 2/30 = 1/15` — flip at the end!", whyEasy: "1/15 inverted gives `d_i = +15 cm` (Real, Inverted, half-size since `m = −15/30 = −0.5`)!" },
        { type: "mc", prompt: "Which pair of optical devices are BOTH **Converging (`f > 0`)**?", options: ["Concave Mirror & Convex Lens", "Convex Mirror & Convex Lens", "Concave Mirror & Concave Lens", "Convex Mirror & Concave Lens"], answer: "Concave Mirror & Convex Lens", hint: "Mirrors reflect inward when caved in; lenses bend light inward when bulging thick in the middle!", whyEasy: "Concave Mirror (`)`) and Convex Lens (`()`) BOTH focus parallel rays to a real focal point!" },
        { type: "mc", prompt: "You hold a Convex Magnifying Lens (`f = +10 cm`) very close to a postage stamp (`d_o = 6 cm < f`). The image you see is:", options: ["Virtual, Upright, and Magnified", "Real, Inverted, and Smaller", "Real, Inverted, and Same Size", "Invisible (no image)"], answer: "Virtual, Upright, and Magnified", hint: "When an object sits INSIDE the focal length (`d_o < f`) of a converging lens, `d_i` turns negative!", whyEasy: "`1/10 − 1/6 = −1/15` → `d_i = −15 cm` (`m = +2.5` → Upright, Virtual, 2.5× Magnified)!" },
        { type: "mc", prompt: "Which lens type (`f < 0`, diverging) corrects **Myopia (Nearsightedness)** by spreading light rays slightly before they hit an eye that focuses too early?", options: ["Concave (Diverging) Lens", "Convex (Converging) Lens", "Flat window pane", "Convex Mirror"], answer: "Concave (Diverging) Lens", hint: "Nearsighted eyes converge light TOO SOON in front of the retina → need slight divergence!", whyEasy: "Concave (`−` diopters) fixes Nearsightedness; Convex (`+` diopters) fixes Farsightedness!" }
      ]
    },
    {
      id: "math-convex-concave-polygons-curves",
      worldId: "senior",
      order: 166,
      title: "Convex vs Concave: Polygons, Curves & Inflection Points",
      icon: "〰️",
      tagline: "Polygon: Convex = no inward dents (`all angles < 180°`). Curve: Concave UP (`f'' > 0` ∪) = Min; Concave DOWN (`f'' < 0` ∩) = Max!",
      scaryVersion: "Convex set geometry, second-derivative curvature classification, and inflection point analysis.",
      easyTruth: "In math, **Convex vs Concave** pops up in 3 awesome places — and they all share ONE visual intuition: **Convex** bulges cleanly outward with NO caves/dents! A stop sign is a Convex polygon; a 5-point star has inward caves (Concave polygon!). On a graph, **Concave UP (`f''(x) > 0`, holds water like a smile `∪`)** is a **Convex** bowl with a clean bottom minimum — the exact reason AI loss functions love convexity!",
      microSteps: [
        { label: "Step 1: Convex vs Concave Polygons (The Rubber-Band Test!)", text: "Wrap an imaginary rubber band around a polygon: if it hugs EVERY edge with zero gaps, it's **CONVEX** (every interior angle `< 180°`, every diagonal stays inside!). If ANY corner caves IN (`> 180°` reflex angle, like a star or arrow), it's **CONCAVE**! Sum of interior angles of ANY `n`-gon = **`(n − 2) × 180°`**!" },
        { label: "Step 2: Curve Concavity (`f''(x)`) & Inflection Points", text: "The 2nd derivative `f''(x)` measures bending! **`f''(x) > 0`** = **Concave UP / Convex** (`∪` smile → holds water → flat spot is a **Local MINIMUM**!). **`f''(x) < 0`** = **Concave DOWN** (`∩` frown/umbrella → spills water → flat spot is a **Local MAXIMUM**!). Where `f''(x)` crosses `0` and changes sign = **Inflection Point**!" },
        { label: "Step 3: Why Convexity Matters in AI & Optimization!", text: "A **Convex function** (like a bowl `y = x²`) has ONE single global minimum — Gradient Descent rolls straight to the absolute best answer from anywhere! Non-convex curves have bumpy hills & valleys (local minima)!" }
      ],
      cheatCode: "Convex polygon: all angles < 180° (sum = (n−2)·180°); Concave = has an inward >180° dent! Curve: f'' > 0 = Concave UP (∪ Min); f'' < 0 = Concave DOWN (∩ Max); sign flip = Inflection Point!",
      visualizerId: "opticsConcaveConvexLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "What single angle test immediately proves a polygon is **CONCAVE** rather than Convex?", options: ["At least one interior angle is greater than 180° (caves inward!)", "All interior angles equal 90°", "It has more than 4 sides", "Its perimeter is odd"], answer: "At least one interior angle is greater than 180° (caves inward!)", hint: "Picture a star or Pac-Man mouth bending inward!", whyEasy: "Convex = every interior angle `< 180°`; Concave = at least one reflex angle `> 180°`!" },
        { type: "input", prompt: "What is the sum of all interior angles (in degrees) of a Convex Hexagon (`n = 6` sides)?", answer: "720", hint: "Use `(n − 2) × 180°` → `(6 − 2) × 180°`!", whyEasy: "4 triangles × 180° = 720°!" },
        { type: "mc", prompt: "For `f(x) = x³ − 3x`, the 2nd derivative is `f''(x) = 6x`. Where is the curve **Concave UP (Convex)** and where is its **Inflection Point**?", options: ["Concave UP for `x > 0`; Inflection Point at `x = 0`", "Concave UP for `x < 0`; Inflection Point at `x = 3`", "Always Concave DOWN everywhere", "No inflection point exists"], answer: "Concave UP for `x > 0`; Inflection Point at `x = 0`", hint: "`6x > 0` when `x > 0`, and `6x` flips from `−` to `+` right at `x = 0`!", whyEasy: "For `x < 0` it frowns (`f'' < 0`), flips smoothly at `(0, 0)`, and smiles (`f'' > 0`) for `x > 0`!" },
        { type: "mc", prompt: "At a critical point where slope `f'(c) = 0`, you test the 2nd derivative and find `f''(c) = +8 > 0`. That point is a:", options: ["Local MINIMUM (Concave UP smile ∪!)", "Local MAXIMUM (Concave DOWN umbrella ∩)", "Vertical asymptote", "Zero slope only — always neither"], answer: "Local MINIMUM (Concave UP smile ∪!)", hint: "Positive `f''` = happy smile `∪` — flat bottom sits at the lowest point!", whyEasy: "2nd Derivative Test: `f'' > 0` = cup `∪` (Min); `f'' < 0` = cap `∩` (Max)!" },
        { type: "mc", prompt: "Why do mathematicians and AI engineers love **Convex** optimization problems (bowl-shaped loss functions)?", options: ["Every local minimum is guaranteed to be the ONE true global minimum!", "They always have infinitely many disconnected caves", "Derivatives are always zero", "They require zero inputs"], answer: "Every local minimum is guaranteed to be the ONE true global minimum!", hint: "Roll a marble anywhere inside a smooth bowl — where does it ALWAYS land?", whyEasy: "No false valleys to get trapped in — downhill gradient steps always find the global optimum!" }
      ]
    },
    {
      id: "physics-fluids-buoyancy-bernoulli",
      worldId: "physics",
      order: 167,
      title: "Fluids: Hydrostatic Pressure, Archimedes & Bernoulli",
      icon: "💧",
      tagline: "`P = P₀ + ρgh` (depth only!). Pascal: `F₁/A₁ = F₂/A₂`. Buoyancy: `F_B = ρVg`. Bernoulli: FASTER fluid = LOWER pressure!",
      scaryVersion: "Hydrostatic pressure gradients, Pascal hydraulic transmission, Archimedean buoyancy, and Bernoulli flow.",
      easyTruth: "Five clean laws explain everything that floats, sinks, sprays, or flies! Water pressure depends ONLY on **depth `h`** (a skinny tall straw and a giant lake have the exact same pressure 5 m deep!). Archimedes says buoyant lift equals the weight of displaced water! And **Bernoulli's Principle** says speeding air/water up (`A₁v₁ = A₂v₂`) **DROPS** its sideways pressure — giving airplane wings lift!",
      microSteps: [
        { label: "Step 1: Density, Depth Pressure & Pascal's Hydraulic Lift", text: "Density `ρ = m / V` (water = `1,000 kg/m³ = 1 g/cm³`). Hydrostatic Pressure: **`P = P₀ + ρgh`** (depends ONLY on depth `h` & fluid density `ρ`, NOT container width!). Pascal's Law multiplies force effortlessly in car lifts: **`F₁ / A₁ = F₂ / A₂`** (10× wider piston = 10× lifting force!)!" },
        { label: "Step 2: Archimedes' Buoyancy (`F_B = ρ_fluid · V_sub · g`)", text: "Upward buoyant force equals the **weight of the fluid pushed out of the way**! Float vs Sink shortcut: if `ρ_object < ρ_fluid` → FLOATS (fraction submerged = `ρ_object / ρ_fluid`, e.g. ice `0.9 / 1.0 = 90%` underwater!); if `ρ_object > ρ_fluid` → SINKS!" },
        { label: "Step 3: Continuity (`A₁v₁ = A₂v₂`) & Bernoulli (`P + ½ρv² + ρgh = const`)", text: "Squeeze a garden hose nozzle to half its area (`A₂ = ½A₁`) → water shoots **2× faster (`v₂ = 2v₁`)**! By **Bernoulli's Equation** (Conservation of Energy for fluids!), faster speed (`↑ ½ρv²`) MUST come from **LOWER internal pressure (`↓ P`)**!" }
      ],
      cheatCode: "P = P₀ + ρgh (depth only!). Pascal: F₁/A₁ = F₂/A₂. Archimedes: F_B = ρ_fluid·V_sub·g (% submerged = ρ_obj/ρ_fl). Continuity: A₁v₁ = A₂v₂. Bernoulli: ↑ speed → ↓ pressure!",
      visualizerId: "physicsLawsPlayground",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "Hydrostatic Gauge Pressure (`ΔP = ρgh`, freshwater `ρ = 1000 kg/m³`, `g = 10 m/s²`): How many **kPa** (kilopascals) of water pressure act on a scuba diver `10 m` underwater?", answer: "100", hint: "`1000 × 10 × 10 = 100,000 Pa` — divide by `1,000` for kPa (`≈ 1 atm` every 10 m)!", whyEasy: "Every `10 m` underwater adds `100 kPa ≈ 1 extra atmosphere` of pressure!" },
        { type: "mc", prompt: "Ice has density `0.90 g/cm³` floating in freshwater (`1.00 g/cm³`). What percentage of an iceberg sits BELOW the water surface?", options: ["90% submerged (only 10% tip sticks out!)", "10% submerged", "50% submerged", "100% sinks to the bottom"], answer: "90% submerged (only 10% tip sticks out!)", hint: "Floating fraction submerged = `ρ_object / ρ_fluid`!", whyEasy: "`0.90 / 1.00 = 90%` underwater — the exact physics behind 'tip of the iceberg'!" },
        { type: "mc", prompt: "Water flows smoothly through a horizontal pipe that narrows to HALF its cross-sectional area (`A₂ = ½A₁`). By Continuity & Bernoulli, the water's speed and pressure become:", options: ["Speed DOUBLES (`2v₁`) and Pressure DROPS!", "Speed DOUBLES and Pressure RISES", "Speed HALVES and Pressure DROPS", "Both stay unchanged"], answer: "Speed DOUBLES (`2v₁`) and Pressure DROPS!", hint: "`A₁v₁ = A₂v₂` speeds it up; Bernoulli (`P + ½ρv² = const`) trades pressure for kinetic energy!", whyEasy: "Faster moving fluid ALWAYS has LOWER static pressure — the #1 Bernoulli exam rule!" },
        { type: "mc", prompt: "Three differently shaped tanks (narrow tube, wide cylinder, slanted cone) are ALL filled with freshwater to the exact same `3 m` depth. Where is the water pressure at the bottom GREATEST?", options: ["EXACT SAME pressure in all three (`P = P₀ + ρgh` depends only on depth!)", "The widest cylinder", "The narrowest tube", "The slanted cone"], answer: "EXACT SAME pressure in all three (`P = P₀ + ρgh` depends only on depth!)", hint: "Hydrostatic Paradox: does container width or total volume appear in `ρgh`?", whyEasy: "Only fluid density `ρ`, gravity `g`, and vertical depth `h` set hydrostatic pressure!" },
        { type: "input", prompt: "Continuity (`A₁v₁ = A₂v₂`): Water flows at `v₁ = 3 m/s` in a pipe of area `A₁ = 8 cm²`, then enters a nozzle of area `A₂ = 2 cm²`. Exit speed `v₂` (m/s)?", answer: "12", hint: "Area shrunk by 4×, so speed multiplies by 4×!", whyEasy: "(8 × 3) ÷ 2 = 12 m/s!" }
      ]
    },
    {
      id: "math-binomial-pascal-series-formulas",
      worldId: "senior",
      order: 168,
      title: "Iconic Formula Toolkit: Binomial, Pascal, Heron & Euler",
      icon: "📜",
      tagline: "`(a+b)ⁿ` via Pascal's Triangle · Infinite Geometric `S_∞ = a/(1−r)` · Heron `√(s(s−a)(s−b)(s−c))` · Polyhedra `V−E+F = 2`!",
      scaryVersion: "Binomial coefficient expansions, convergent geometric series, Heron's semiperimeter area, and Euler polyhedral topology.",
      easyTruth: "Some of history's most useful formulas take 10 seconds to learn and unlock entire problem types! **Pascal's Triangle** (`1-3-3-1`, `1-4-6-4-1`) writes out `(a+b)³` or `(a+b)⁴` with zero FOIL headaches! **Infinite Geometric Series** adds infinitely many shrinking numbers in one division `a / (1 − r)`! **Heron's Formula** finds ANY triangle's area from just its 3 side lengths! And **Euler's `V − E + F = 2`** works on EVERY convex 3D solid ever built!",
      microSteps: [
        { label: "Step 1: Binomial Theorem & Pascal's Triangle", text: "Each Pascal row adds the two numbers above it: Row 2 = `1, 2, 1` → `(a+b)² = a² + 2ab + b²`. Row 3 = `1, 3, 3, 1` → `(a+b)³ = a³ + 3a²b + 3ab² + b³`! Row 4 = `1, 4, 6, 4, 1`! Notice exponents of `a` step down (`3,2,1,0`) while `b` steps up (`0,1,2,3`), and coefficients are `C(n, k)`!" },
        { label: "Step 2: Infinite Geometric Series (`|r| < 1`) & Distance/Midpoint", text: "Sum forever when `|r| < 1`: **`S_∞ = a₁ / (1 − r)`** (Example: `1 + ½ + ¼ + ⅛ + ... = 1 / (1 − ½) = 2`!). Coordinate essentials: Midpoint = average `((x₁+x₂)/2, (y₁+y₂)/2)`; Distance = Pythagoras `√((Δx)² + (Δy)²)`!" },
        { label: "Step 3: Heron's Triangle Area & Euler's Polyhedron Formula (`V − E + F = 2`)", text: "Know 3 sides `a, b, c` (no height given!)? Compute semiperimeter `s = (a+b+c)/2`, then Area = **`√(s(s−a)(s−b)(s−c))`**! And for EVERY convex 3D solid (cube: `8−12+6=2`, pyramid: `5−8+5=2`, soccer ball!), **`Vertices − Edges + Faces = 2`** ALWAYS!" }
      ],
      cheatCode: "Pascal (a+b)³: 1-3-3-1. Infinite Geom (|r|<1): S = a/(1−r). Heron: s=(a+b+c)/2, A=√(s(s−a)(s−b)(s−c)). Convex 3D solid: V − E + F = 2!",
      visualizerId: "numberPatternSieve",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Using Pascal's Triangle Row 3 (`1, 3, 3, 1`), expand `(x + 2)³`:", options: ["`x³ + 6x² + 12x + 8`", "`x³ + 8`", "`x³ + 2x² + 4x + 8`", "`x³ + 3x² + 6x + 8`"], answer: "`x³ + 6x² + 12x + 8`", hint: "Plug `a = x, b = 2` into `1·a³ + 3·a²b + 3·ab² + 1·b³`!", whyEasy: "`x³ + 3(x²)(2) + 3(x)(4) + 8 = x³ + 6x² + 12x + 8`!" },
        { type: "input", prompt: "Infinite Geometric Series (`S = a / (1 − r)`): Find the exact infinite sum of `8 + 4 + 2 + 1 + 0.5 + ...` (where `a = 8, r = 1/2`):", answer: "16", hint: "Compute `8 ÷ (1 − 1/2) = 8 ÷ 0.5`!", whyEasy: "Dividing by ½ doubles 8 → exact sum = 16!" },
        { type: "input", prompt: "Heron's Formula (`s = (a+b+c)/2`): Find the area of a triangle with sides `3, 4, 5` (first `s = 6`, then `√(6·3·2·1)`):", answer: "6", hint: "`6 × 3 × 2 × 1 = 36`, then take `√36`!", whyEasy: "√36 = 6 (matches `½ × 3 × 4 = 6` — and works even for non-right triangles!)!" },
        { type: "input", prompt: "Euler's Formula (`V − E + F = 2`): A convex polyhedron has `V = 12` vertices and `F = 8` faces. How many edges `E` MUST it have?", answer: "18", hint: "Plug into `12 − E + 8 = 2` → `20 − E = 2`!", whyEasy: "E = 20 − 2 = 18 edges — guaranteed for ANY convex polyhedron!" },
        { type: "mc", prompt: "What is the exact Midpoint of segment connecting `(2, 8)` and `(10, −2)`?", options: ["`(6, 3)`", "`(8, 10)`", "`(4, 5)`", "`(12, 6)`"], answer: "`(6, 3)`", hint: "Simply average the x's and average the y's: `(2+10)/2` and `(8+(−2))/2`!", whyEasy: "Midpoint = `(12/2, 6/2) = (6, 3)`!" }
      ]
    }
  ];

  DATA.NODES.push(...STEM_LAWS_NODES);

  // ==================== 4 NEW TRAPS (PHYSICS LAWS & MATH) ====================
  DATA.GRADE12_TRAPS.push(
    {
      id: "trap-pendulum-mass",
      title: "Pendulum Trap: Heavier Bob Does NOT Swing Faster!",
      trapExpression: "T = 2π √(L / g)   —   WHERE IS MASS m?!",
      wrongGuess: "Doubling pendulum bob mass doubles swing speed",
      rightAnswer: "Mass cancels out completely — ONLY Length L and Gravity g matter!",
      whyItHappens: "People mix up Mass-on-a-Spring `T = 2π√(m/k)` (where `m` DOES matter!) with a Pendulum `T = 2π√(L/g)` (where gravity cancels `m`)!",
      quickRule: "Spring has `m` (`√(m/k)`). Pendulum has NO `m` (`√(L/g)`)!",
      quiz: {
        prompt: "If you replace a 1 kg pendulum bob with a 4 kg bob on the exact same string, its period T:",
        options: ["Stays completely UNCHANGED!", "Doubles", "Halves", "Quadruples"],
        answer: "Stays completely UNCHANGED!",
        explanation: "Heavier bobs feel more gravity AND have equally more inertia — `m` cancels out!"
      }
    },
    {
      id: "trap-carnot-celsius",
      title: "Thermodynamics Trap: Using °C in Carnot Efficiency!",
      trapExpression: "η = 1 − T_C / T_H   (MUST BE KELVIN!)",
      wrongGuess: "T_H = 100°C, T_C = 0°C → η = 1 − 0/100 = 100%!",
      rightAnswer: "Convert to Kelvin: 1 − (273 / 373) = 26.8%!",
      whyItHappens: "Zero Celsius is NOT zero thermal energy — plugging 0°C falsely predicts an impossible 100% engine!",
      quickRule: "EVERY ratio temperature formula (`PV=nRT`, Carnot `1 − T_C/T_H`) demands KELVIN (`°C + 273`)!",
      quiz: {
        prompt: "An engine runs between `T_H = 327°C` (600 K) and `T_C = 27°C` (300 K). True max Carnot efficiency?",
        options: ["50% (`1 − 300/600`)", "91.7% (`1 − 27/327`)", "100%", "25%"],
        answer: "50% (`1 − 300/600`)",
        explanation: "Never divide Celsius directly — in Kelvin, 300/600 = 0.50 → 50% max!"
      }
    },
    {
      id: "trap-venn-double-count",
      title: "Set Theory Trap: Adding A + B Without Subtracting Overlap",
      trapExpression: "|A ∪ B| = |A| + |B| − |A ∩ B|",
      wrongGuess: "25 play Soccer + 20 play Basketball (10 both) = 45 kids",
      rightAnswer: "25 + 20 − 10 = 35 unique kids!",
      whyItHappens: "The 10 students who play BOTH got counted inside the 25 AND again inside the 20.",
      quickRule: "ALWAYS subtract the middle intersection `|A ∩ B|` once (or fill the middle Venn overlap first)!",
      quiz: {
        prompt: "In a survey, 30 like Coffee, 25 like Tea, and 12 like BOTH. How many like at least one?",
        options: ["43", "55", "31", "67"],
        answer: "43",
        explanation: "30 + 25 − 12 = 43 unique people!"
      }
    },
    {
      id: "trap-correlation-causation",
      title: "Statistics Trap: High Correlation `r` ≠ Causation!",
      trapExpression: "Ice Cream Sales & Drownings: r = +0.86",
      wrongGuess: "Banning ice cream will stop drownings",
      rightAnswer: "Confounding variable (SUMMER HEAT!) drives both!",
      whyItHappens: "Our brains love turning co-occurring patterns into instant cause-and-effect stories.",
      quickRule: "High `|r|` only measures linear co-movement — ALWAYS hunt for hidden Confounding Variables!",
      quiz: {
        prompt: "A study finds shoe size correlates strongly (`r = +0.85`) with reading speed among kids ages 5–12. Best explanation?",
        options: ["AGE is a confounding variable causing both bigger feet and better reading!", "Big shoes boost brain speed", "Reading stretches feet", "Negative correlation"],
        answer: "AGE is a confounding variable causing both bigger feet and better reading!",
        explanation: "Older children naturally have bigger feet AND more years of reading practice!"
      }
    },
    {
      id: "trap-concave-mirror-vs-lens",
      title: "Optics Trap: Concave Mirror ≠ Concave Lens!",
      trapExpression: "Concave Mirror (CONVERGES +f)  vs  Concave Lens (DIVERGES −f)",
      wrongGuess: "Assuming BOTH Concave Mirror and Concave Lens converge light",
      rightAnswer: "Mirrors & Lenses have OPPOSITE converging shapes! Concave Mirror + Convex Lens CONVERGE!",
      whyItHappens: "Both contain the word 'Concave', so students forget reflection (mirror bowl focuses inward) works opposite to refraction (thin-center lens spreads outward)!",
      quickRule: "Converging (+f) = Concave Mirror OR Convex Lens. Diverging (−f) = Convex Mirror OR Concave Lens (ALWAYS Virtual, Upright, Smaller)!",
      quiz: {
        prompt: "Which optical device ALWAYS creates a Virtual, Upright, Smaller image regardless of object distance?",
        options: ["Convex Mirror (and Concave Lens — both diverging!)", "Concave Mirror", "Convex Lens", "Pinhole Camera"],
        answer: "Convex Mirror (and Concave Lens — both diverging!)",
        explanation: "Diverging optics (`f < 0`) NEVER cross real rays — they always produce Virtual, Upright, Reduced images!"
      }
    },
    {
      id: "trap-bernoulli-fast-pressure",
      title: "Fluid Trap: Faster Water/Air Means LOWER Pressure!",
      trapExpression: "Narrow pipe → Speed UP (v₂ > v₁)  ⇒  Pressure P₂ GOES UP??",
      wrongGuess: "Thinking fast rushing fluid in a narrow pipe has HIGHER static pressure",
      rightAnswer: "Bernoulli (`P + ½ρv² = const`): Faster speed means LOWER internal pressure!",
      whyItHappens: "People confuse the impact force of a fast jet hitting your hand with the internal static pressure pushing sideways on the pipe walls.",
      quickRule: "Narrower pipe → Faster speed (`A₁v₁ = A₂v₂`) → LOWER sideways pressure (Bernoulli lift!)!",
      quiz: {
        prompt: "Air rushes faster over the curved top of an airplane wing than underneath it. By Bernoulli's Principle, air pressure on TOP is:",
        options: ["LOWER than underneath (creating net upward lift!)", "HIGHER than underneath", "Identical to underneath", "Always zero"],
        answer: "LOWER than underneath (creating net upward lift!)",
        explanation: "Faster airflow above = lower pressure above → higher pressure underneath pushes the wing upward!"
      }
    },
    {
      id: "trap-chem-vs-phys-thermo-sign",
      title: "Thermo Sign Trap: Chemistry ΔU = q + w  vs.  Physics ΔU = Q − W!",
      trapExpression: "Chemistry: ΔU = q + w   vs.   Physics: ΔU = Q − W",
      wrongGuess: "Thinking one of the two formulas is wrong or plugging +W blindly into both",
      rightAnswer: "BOTH express the EXACT same conservation of energy — they just define +work oppositely!",
      whyItHappens: "IUPAC Chemistry defines `+w` as work done ON the gas (compressing it adds energy), while Physics/Engineering defines `+W` as work done BY the heat engine (expanding spends energy).",
      quickRule: "Ask ONE physical question: did the gas EXPAND (loses energy → subtract) or get COMPRESSED (gains energy → add)? Never rely on blind memorization!",
      quiz: {
        prompt: "A gas absorbs 400 J of heat and EXPANDS, doing 150 J of work on a piston. What is ΔU in BOTH Chemistry and Physics?",
        options: ["+250 J (expanding ALWAYS spends internal energy!)", "+550 J", "−250 J", "+550 J in Chem, +250 J in Physics"],
        answer: "+250 J (expanding ALWAYS spends internal energy!)",
        explanation: "In Chemistry w = −150 J → ΔU = 400 + (−150) = +250 J. In Physics W = +150 J → ΔU = 400 − 150 = +250 J. Exact same universe!"
      }
    }
  );

  // ==================== 1 NEW DIAGNOSTIC QUESTION (TOTAL = 28) ====================
  DATA.DIAGNOSTIC_QUESTIONS.push({
    id: "diag-physics-laws",
    topicLabel: "Universal Physics Laws (Gravity, SHM, Carnot & Faraday)",
    targetNodeId: "physics-universal-gravitation-kepler",
    prompt: "Triple Physics Law Check: Doubling distance `r` turns gravity to `1/4`, doubling pendulum mass leaves `T` unchanged, and holding a magnet STILL in a coil induces:",
    options: ["0 Volts (Faraday requires CHANGING flux!)", "Double voltage", "4× voltage", "Infinite AC"],
    answer: "0 Volts (Faraday requires CHANGING flux!)",
    whyItMatters: "Mastering Universal Gravitation, SHM, Thermodynamics, Faraday, and Quantum completes your Physics foundation!"
  });

  // ==================== 2 NEW SYNTHESIS BOSSES (TOTAL = 24) ====================
  DATA.SYNTHESIS_PROBLEMS.push(
    {
      id: "synth-physics-grand-laws",
      title: "Grand Laws of Physics Boss (Kepler + Carnot + Transformer)",
      topics: ["Kepler 3rd", "Carnot Kelvin", "Transformers"],
      prompt: "Combine 3 Physics Laws: (1) Planet orbits at `r = 4 AU` → Period `T = √(4³)` years? (2) Ideal Carnot engine `T_H = 600 K, T_C = 300 K` → Efficiency? (3) Step-up transformer `N_p = 50, N_s = 150` on `100 V AC` → `V_s`?",
      options: ["8 yrs · 50% · 300 V", "16 yrs · 50% · 300 V", "8 yrs · 200% · 33 V", "4 yrs · 50% · 150 V"],
      answer: "8 yrs · 50% · 300 V",
      stepsChain: [
        "Kepler's 3rd Law: `T² = r³ = 4³ = 64` → `T = 8 years`!",
        "Carnot Efficiency (Kelvin!): `η = 1 − 300/600 = 0.50 = 50%`!",
        "AC Transformer: `V_s = V_p · (N_s / N_p) = 100 × (150/50) = 300 V`!"
      ]
    },
    {
      id: "synth-math-venn-zscore-euler",
      title: "Applied Math Boss (Venn + Z-Score + Mental Shortcut)",
      topics: ["Set Theory", "Z-Scores", "Mental Math"],
      prompt: "Solve all 3 fast: (1) Mental shortcut `65²` = ? (2) Venn: 20 in Coding, 15 in Physics, 6 in BOTH → total `|C ∪ P|`? (3) Exam mean `μ = 80, σ = 5` → Z-score of `95`?",
      options: ["4225 · 29 · z = +3", "3625 · 35 · z = +3", "4225 · 29 · z = +2", "4225 · 41 · z = +15"],
      answer: "4225 · 29 · z = +3",
      stepsChain: [
        "`65²`: multiply `6 × 7 = 42` and attach `25` → `4,225`!",
        "Inclusion–Exclusion: `20 + 15 − 6 = 29`!",
        "Z-score: `(95 − 80) / 5 = 15 / 5 = +3`!"
      ]
    }
  );

  // ==================== 2 NEW BADGES (TOTAL = 26) ====================
  DATA.BADGES.push(
    {
      id: "physics_lawkeeper",
      emoji: "🌌",
      title: "Lawkeeper of Physics",
      description: "Conquer 4+ advanced Universal Physics Laws (Gravity, Rotation, SHM, Sound, Thermo, Faraday, Quantum)",
      check: (st) => {
        const ids = [
          "physics-universal-gravitation-kepler",
          "physics-rotational-dynamics-angular",
          "physics-shm-pendulums-resonance",
          "physics-sound-doppler-waves",
          "physics-thermo-four-laws-engines",
          "physics-faraday-induction-ac-maxwell",
          "physics-quantum-photoelectric-nuclear"
        ];
        return ids.filter((id) => (st.nodeMastery[id] || 0) >= 1).length >= 4;
      }
    },
    {
      id: "everylingo_polymath",
      emoji: "🌟",
      title: "EveryLingo Polymath",
      description: "Conquer at least 1 skill across Math, Science, AI/Coding, PH History, Filipino & Abstract Shapes!",
      check: (st) => {
        const groups = [
          (n) => ["nursery", "elementary", "junior", "senior", "college"].includes(n.worldId),
          (n) => ["physics", "chemistry", "biology"].includes(n.worldId),
          (n) => ["ai_ml", "web_coding", "python_tech"].includes(n.worldId),
          (n) => n.worldId === "ph_history",
          (n) => n.worldId === "filipino",
          (n) => n.worldId === "abstract_shapes"
        ];
        return groups.every((fn) => DATA.NODES.some((n) => fn(n) && (st.nodeMastery[n.id] || 0) >= 1));
      }
    }
  );

  // ==================== MEMORIZE VAULT PHYSICS LAWS REFERENCE ====================
  DATA.MEMORIZE_DATA.physicsLawsCards = [
    { law: "Universal Gravitation", eq: "F = G·m₁m₂ / r²", key: "Inverse-square! 2× r → 1/4 F. Orbit = continuous free-fall (v = √(GM/r))!" },
    { law: "Kepler's 3 Laws", eq: "Ellipses · Equal Areas · T² ∝ r³", key: "Faster at perihelion (near Sun); 4× radius → 8× orbital period!" },
    { law: "Rotational Laws", eq: "τ = I·α  |  L = I·ω = const", key: "Arms in → smaller I → faster spin ω! Ramp race: Solid Sphere > Disk > Hoop." },
    { law: "SHM & Pendulums", eq: "Spring: 2π√(m/k) · Pendulum: 2π√(L/g)", key: "Hooke F = −kx. Mass cancels out of Pendulum period! 4× L → 2× T." },
    { law: "Sound & Doppler", eq: "v = fλ · f_beat = |f₁ − f₂| · +10 dB = 10×", key: "Longitudinal (0 in vacuum), fastest in solids; approaching source = higher pitch!" },
    { law: "4 Laws of Thermo", eq: "ΔU = Q − W · η_max = 1 − T_C/T_H (K!)", key: "0th equilibrium, 1st energy, 2nd entropy rises (no 100% engine!), 3rd no 0 K." },
    { law: "Faraday & Lenz", eq: "ε = −N ΔΦ_B/Δt · V_s/V_p = N_s/N_p", key: "Needs CHANGING flux (AC transformers only!); induced current opposes change!" },
    { law: "Maxwell & Quantum", eq: "E = hf · K_max = hf − φ · N = N₀(½)ⁿ", key: "Light = EM wave (c = 3×10⁸); frequency ejects photoelectrons; Δx·Δp ≥ ℏ/2!" },
    { law: "Mirrors & Lenses", eq: "1/f = 1/d_o + 1/d_i · m = −d_i/d_o", key: "Converging (+f): Concave Mirror & Convex Lens. Diverging (−f): ALWAYS Virtual, Upright, Smaller!" },
    { law: "Fluids & Bernoulli", eq: "P = P₀+ρgh · F₁/A₁ = F₂/A₂ · P + ½ρv² = const", key: "Pressure depends ONLY on depth! Archimedes F_B = ρVg; Bernoulli: faster speed → LOWER pressure!" },
    { law: "Convex & Concave Math", eq: "Sum = (n−2)180° · f''>0 (∪ Min) · f''<0 (∩ Max)", key: "Convex polygon = all angles <180°; Concave has inward >180° dent. f'' sign flip = Inflection Point!" },
    { law: "Binomial, Heron & Euler", eq: "S_∞ = a/(1−r) · A = √(s(s−a)(s−b)(s−c)) · V−E+F=2", key: "Pascal 1-3-3-1 expands (a+b)³; Heron gives area from 3 sides; V−E+F=2 holds for ALL convex solids!" }
  ];

  // ==================== PROCEDURAL QUESTION GENERATORS (12 NODES) ====================
  const prevGen = DATA.generateProceduralQuestion;
  DATA.generateProceduralQuestion = function (nodeId) {
    switch (nodeId) {
      case "physics-universal-gravitation-kepler": {
        const k = pick([2, 3, 4]);
        const sq = k * k;
        return {
          type: "mc",
          prompt: `Newton's Gravitation: If you move two planets ${k}× farther apart, gravity between them becomes:`,
          options: shuffle([`1/${sq} as strong`, `1/${k} as strong`, `${k}× stronger`, `1/${k * sq} as strong`]),
          answer: `1/${sq} as strong`,
          hint: `Inverse-square law F ∝ 1/r²: square ${k}!`,
          whyEasy: `${k}² = ${sq} → gravity shrinks to 1/${sq} of its original strength!`
        };
      }

      case "physics-rotational-dynamics-angular": {
        const w1 = randInt(2, 5);
        const factor = pick([2, 3, 4]);
        const I2 = randInt(2, 4);
        const I1 = I2 * factor;
        const w2 = w1 * factor;
        return {
          type: "mc",
          prompt: `Angular Momentum (I₁ω₁ = I₂ω₂): Skater has I₁ = ${I1}, ω₁ = ${w1} rad/s, then pulls arms in to I₂ = ${I2}. New ω₂ (rad/s)?`,
          options: numOpts(w2, [-2, -1, 1, 2, -w1, factor]),
          answer: String(w2),
          hint: `I dropped by ${factor}×, so ω multiplies by ${factor}×!`,
          whyEasy: `${I1} × ${w1} = ${I2} × ${w2} → ω₂ = ${w2} rad/s!`
        };
      }

      case "physics-shm-pendulums-resonance": {
        const bank = [
          { prompt: "If you quadruple a simple pendulum's length (`4L`), its period `T = 2π√(L/g)` becomes:", options: ["2× longer", "4× longer", "Half as long", "Unchanged"], answer: "2× longer", hint: "√4 = 2!", whyEasy: "Period scales with √L → √4 = 2×!" },
          { prompt: "If you TRIPLE the mass hanging on a simple pendulum (same L and g), its period `T`:", options: ["Stays UNCHANGED (mass cancels!)", "Triples", "Increases by √3", "Drops to 1/3"], answer: "Stays UNCHANGED (mass cancels!)", hint: "Check `T = 2π√(L/g)` — no `m` inside!", whyEasy: "Pendulum period is independent of bob mass!" },
          { prompt: "Hooke's Law: A spring with `k = 50 N/m` stretches `x = 0.4 m`. Restoring force `F = kx`?", options: ["20 N", "125 N", "50.4 N", "10 N"], answer: "20 N", hint: "50 × 0.4 = ?", whyEasy: "50 × 0.4 = 20 N!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "physics-sound-doppler-waves": {
        const f1 = pick([256, 300, 440, 512]);
        const diff = randInt(2, 7);
        const f2 = f1 + diff;
        return {
          type: "mc",
          prompt: `Beat Frequency: Playing ${f1} Hz and ${f2} Hz tones together produces how many beats per second?`,
          options: numOpts(diff, [-1, 1, 2, 3, -2]),
          answer: String(diff),
          hint: "f_beat = |f₁ − f₂|!",
          whyEasy: `|${f2} − ${f1}| = ${diff} Hz!`
        };
      }

      case "physics-thermo-four-laws-engines": {
        const pairs = [
          { th: 400, tc: 300, eff: 25 },
          { th: 500, tc: 300, eff: 40 },
          { th: 600, tc: 300, eff: 50 },
          { th: 800, tc: 200, eff: 75 },
          { th: 500, tc: 200, eff: 60 }
        ];
        const row = pick(pairs);
        return {
          type: "mc",
          prompt: `Carnot max efficiency: T_H = ${row.th} K and T_C = ${row.tc} K. Compute η = (1 − T_C/T_H) × 100%:`,
          options: numOpts(row.eff, [-15, -10, 10, 15, 20]).map((x) => `${x}%`),
          answer: `${row.eff}%`,
          hint: `1 − (${row.tc} / ${row.th}) = ${(1 - row.tc / row.th).toFixed(2)}!`,
          whyEasy: `1 − ${row.tc}/${row.th} = ${row.eff}% maximum theoretical efficiency!`
        };
      }

      case "physics-faraday-induction-ac-maxwell": {
        const vp = pick([100, 120, 200, 240]);
        const ratio = pick([2, 3, 4]);
        const stepUp = randInt(0, 1) === 0;
        const np = stepUp ? 100 : 100 * ratio;
        const ns = stepUp ? 100 * ratio : 100;
        const vs = stepUp ? vp * ratio : vp / ratio;
        return {
          type: "mc",
          prompt: `Ideal AC Transformer: V_p = ${vp} V, N_p = ${np} turns, N_s = ${ns} turns. Output V_s?`,
          options: numOpts(vs, [-20, -10, 10, 20, 40]).map((x) => `${x} V`),
          answer: `${vs} V`,
          hint: `V_s = V_p × (N_s / N_p) = ${vp} × (${ns}/${np})!`,
          whyEasy: `${stepUp ? "Step-Up" : "Step-Down"} ratio ${ns}/${np} transforms ${vp} V → ${vs} V!`
        };
      }

      case "physics-quantum-photoelectric-nuclear": {
        const n = pick([2, 3, 4]);
        const start = pick([32, 64, 80, 160]);
        const rem = start / Math.pow(2, n);
        return {
          type: "mc",
          prompt: `Half-Life Decay: Starting with ${start} g of an isotope, how many grams remain after ${n} half-lives?`,
          options: numOpts(rem, [-2, -1, 2, 4, rem]),
          answer: String(rem),
          hint: `Halve ${start} cleanly ${n} times: ${start} ÷ 2^${n}!`,
          whyEasy: `${start} × (1/2)^${n} = ${start} ÷ ${Math.pow(2, n)} = ${rem} g!`
        };
      }

      case "math-estimation-mental-shortcuts": {
        const n = randInt(2, 9);
        const val = n * 10 + 5;
        const ans = val * val;
        return {
          type: "mc",
          prompt: `Mental Shortcut (n5)² = n(n+1) | 25: Compute ${val}² instantly!`,
          options: numOpts(ans, [-100, 100, -10, 200, -200]),
          answer: String(ans),
          hint: `Multiply ${n} × ${n + 1} = ${n * (n + 1)}, then slap 25 on the end!`,
          whyEasy: `${n} × ${n + 1} = ${n * (n + 1)} → ${ans}!`
        };
      }

      case "math-set-theory-venn-logic": {
        const a = randInt(12, 25), b = randInt(10, 22);
        const both = randInt(3, Math.min(a, b) - 2);
        const union = a + b - both;
        return {
          type: "mc",
          prompt: `Inclusion–Exclusion: |A| = ${a}, |B| = ${b}, and |A ∩ B| = ${both}. Find |A ∪ B|:`,
          options: numOpts(union, [both, -both, 2, -2, 4]),
          answer: String(union),
          hint: `Add |A| + |B| and subtract the overlap ${both} once!`,
          whyEasy: `${a} + ${b} − ${both} = ${union}!`
        };
      }

      case "math-inequalities-intervals-sign-charts": {
        const r1 = randInt(-3, 2);
        const r2 = r1 + randInt(2, 5);
        const isLess = randInt(0, 1) === 0;
        const ans = isLess ? `(${r1}, ${r2})` : `(-∞, ${r1}) ∪ (${r2}, ∞)`;
        const opts = shuffle([
          `(${r1}, ${r2})`,
          `(-∞, ${r1}) ∪ (${r2}, ∞)`,
          `[${r1}, ${r2}]`,
          `(${r2}, ∞)`
        ]);
        return {
          type: "mc",
          prompt: `Solve (x ${r1 < 0 ? "+ " + Math.abs(r1) : "− " + r1})(x − ${r2}) ${isLess ? "< 0" : "> 0"} in Interval Notation:`,
          options: opts,
          answer: ans,
          hint: `Roots are ${r1} and ${r2}; signs go (+ | − | +) across the number line!`,
          whyEasy: isLess ? `Negative strictly BETWEEN roots → (${r1}, ${r2})!` : `Positive strictly OUTSIDE roots → (-∞, ${r1}) ∪ (${r2}, ∞)!`
        };
      }

      case "math-stats-correlation-regression-zscore": {
        const mu = pick([50, 70, 80, 100]);
        const sd = pick([5, 10]);
        const z = pick([-2, -1, 1, 2, 3]);
        const x = mu + z * sd;
        return {
          type: "mc",
          prompt: `Normal Distribution: μ = ${mu}, σ = ${sd}. What is the Z-score of x = ${x}?`,
          options: numOpts(z, [-2, -1, 1, 2, 3]),
          answer: String(z),
          hint: `Compute z = (${x} − ${mu}) ÷ ${sd}!`,
          whyEasy: `(${x} − ${mu}) / ${sd} = ${z}!`
        };
      }

      case "math-game-theory-graph-theory": {
        const edges = randInt(6, 20);
        const sumDeg = 2 * edges;
        return {
          type: "mc",
          prompt: `Graph Handshaking Lemma: A network graph has ${edges} edges. What is the SUM of all vertex degrees?`,
          options: numOpts(sumDeg, [-edges, 2, -2, 4, -4]),
          answer: String(sumDeg),
          hint: "Every edge contributes 2 endpoints (Σ deg = 2|E|)!",
          whyEasy: `2 × ${edges} = ${sumDeg}!`
        };
      }

      case "physics-mirrors-lenses-concave-convex": {
        const cases = [
          { f: 10, doVal: 30, di: 15 },
          { f: 12, doVal: 24, di: 24 },
          { f: 6, doVal: 12, di: 12 },
          { f: 10, doVal: 15, di: 30 },
          { f: 8, doVal: 24, di: 12 }
        ];
        const row = pick(cases);
        return {
          type: "mc",
          prompt: `Converging Convex Lens (f = +${row.f} cm): Object stands at d_o = ${row.doVal} cm. Compute image distance d_i from 1/f = 1/d_o + 1/d_i:`,
          options: numOpts(row.di, [-6, -3, 3, 6, 10]).map((x) => `${x} cm`),
          answer: `${row.di} cm`,
          hint: `1/d_i = 1/${row.f} − 1/${row.doVal} — remember to INVERT at the end!`,
          whyEasy: `d_i = (${row.f} × ${row.doVal}) / (${row.doVal} − ${row.f}) = +${row.di} cm (Real & Inverted)!`
        };
      }

      case "math-convex-concave-polygons-curves": {
        const n = pick([5, 6, 7, 8, 9, 10]);
        const sumDeg = (n - 2) * 180;
        return {
          type: "mc",
          prompt: `Convex Polygon Angle Sum: What is the sum of interior angles of an ${n}-sided polygon?`,
          options: numOpts(sumDeg, [-180, 180, 360, -90]).map((x) => `${x}°`),
          answer: `${sumDeg}°`,
          hint: `Use (n − 2) × 180° = (${n} − 2) × 180°!`,
          whyEasy: `${n - 2} triangles × 180° = ${sumDeg}°!`
        };
      }

      case "physics-fluids-buoyancy-bernoulli": {
        const f1 = pick([20, 40, 50, 80]);
        const mult = pick([4, 5, 8, 10]);
        const f2 = f1 * mult;
        return {
          type: "mc",
          prompt: `Pascal Hydraulic Lift (F₁/A₁ = F₂/A₂): Push F₁ = ${f1} N on small piston (A₁ = 2 cm²). Output force F₂ on piston A₂ = ${2 * mult} cm²?`,
          options: numOpts(f2, [-f1, f1, 50, -50, 100]).map((x) => `${x} N`),
          answer: `${f2} N`,
          hint: `Area scales by ${mult}×, so Force scales by ${mult}×!`,
          whyEasy: `${f1} N × ${mult} = ${f2} N!`
        };
      }

      case "math-binomial-pascal-series-formulas": {
        const rDen = pick([2, 3, 4]);
        const a = pick([6, 8, 12, 18]);
        // S = a / (1 - 1/rDen) = a * rDen / (rDen - 1) -> pick clean divisible a
        const cleanA = (rDen - 1) * randInt(2, 6);
        const sInf = (cleanA * rDen) / (rDen - 1);
        return {
          type: "mc",
          prompt: `Infinite Geometric Series: First term a = ${cleanA}, common ratio r = 1/${rDen}. Exact sum S_∞ = a / (1 − r)?`,
          options: numOpts(sInf, [-2, -1, 1, 2, 4, -4]),
          answer: String(sInf),
          hint: `1 − 1/${rDen} = ${rDen - 1}/${rDen}, so divide ${cleanA} by ${rDen - 1}/${rDen} (flip & multiply!)`,
          whyEasy: `${cleanA} × (${rDen}/${rDen - 1}) = ${sInf}!`
        };
      }

      default:
        return prevGen(nodeId);
    }
  };

  // ==================== 12 CURATED WORKED EXAMPLES ====================
  if (LATEX && typeof LATEX.registerWorkedExamples === "function") {
    LATEX.registerWorkedExamples({
      "physics-universal-gravitation-kepler": {
        heroFormula: "$$F = G\\frac{m_1 m_2}{r^2}, \\qquad v_{\\text{orbit}} = \\sqrt{\\frac{GM}{r}}, \\qquad T^2 \\propto r^3$$",
        title: "Using Kepler's 3rd Law & Inverse-Square Scaling",
        problemLatex: "$$\\text{Planet orbits at } r = 9\\text{ AU} \\implies T = \\text{? yrs}; \\quad \\text{Move } 3\\times \\text{ farther} \\implies F = \\text{?}$$",
        steps: [
          { label: "Apply Kepler's Harmonic Law `T² = r³`", mathLatex: "$T^2 = 9^3 = 729$", plainWhy: "Works directly in Astronomical Units (AU) and Earth years!" },
          { label: "Take the square root cleanly (`√(9³) = (√9)³`!)", mathLatex: "$T = (\\sqrt{9})^3 = 3^3 = \\mathbf{27\\text{ Earth years}}$", plainWhy: "Pro trick: square-root FIRST (`√9 = 3`), THEN cube (`3³ = 27`)!" },
          { label: "Apply Newton's inverse-square law for 3× distance", mathLatex: "$F_{\\text{new}} = \\frac{1}{3^2}\\,F_0 = \\mathbf{\\frac{1}{9}\\,F_0}$", plainWhy: "Tripling separation shrinks gravity to one-ninth!" }
        ],
        answerLatex: "$$T = 27\\text{ years}, \\qquad F = \\frac{1}{9}F_0$$",
        commonTrap: "Orbiting astronauts are NOT in zero gravity — they are in continuous free-fall alongside their spacecraft!"
      },
      "physics-rotational-dynamics-angular": {
        heroFormula: "$$\\tau = I\\alpha, \\qquad L = I\\omega = \\text{const}, \\qquad I_{\\text{sphere}} < I_{\\text{disk}} < I_{\\text{hoop}}$$",
        title: "Ice-Skater Spin Conservation & Ramp Race Order",
        problemLatex: "$$I_1 = 8\\text{ kg}\\cdot\\text{m}^2,\\; \\omega_1 = 1.5\\text{ rev/s} \\to \\text{pull arms in: } I_2 = 2\\text{ kg}\\cdot\\text{m}^2$$",
        steps: [
          { label: "Conserve Angular Momentum (`I₁ω₁ = I₂ω₂`)", mathLatex: "$(8)(1.5) = (2)\\,\\omega_2$", plainWhy: "Zero external torque means total spin momentum `L` stays locked." },
          { label: "Solve for final angular speed `ω₂`", mathLatex: "$12 = 2\\,\\omega_2 \\implies \\mathbf{\\omega_2 = 6.0\\text{ rev/s}}$", plainWhy: "Quartering `I` quadruples spin rate `ω`!" },
          { label: "Verify rolling ramp race order", mathLatex: "$\\text{Solid Sphere } (0.4) > \\text{Disk } (0.5) > \\text{Hoop } (1.0)$", plainWhy: "Smaller `I` wins every single ramp race!" }
        ],
        answerLatex: "$$\\omega_2 = 6.0\\text{ rev/s}$$",
        commonTrap: "Never guess heavier spheres roll faster — mass and radius BOTH cancel out; ONLY shape factor `I/(MR²)` decides!"
      },
      "physics-shm-pendulums-resonance": {
        heroFormula: "$$F = -kx, \\qquad T_{\\text{spring}} = 2\\pi\\sqrt{\\frac{m}{k}}, \\qquad T_{\\text{pendulum}} = 2\\pi\\sqrt{\\frac{L}{g}}$$",
        title: "Tuning a Pendulum's Period by Changing Length L",
        problemLatex: "$$\\text{Pendulum period } T_1 = 2.0\\text{ s}. \\text{ Lengthen string } 4\\times \\text{ AND double mass } m \\implies T_2 = \\text{?}$$",
        steps: [
          { label: "Ignore the mass change immediately!", mathLatex: "$\\text{Mass } m \\text{ does NOT appear in } T = 2\\pi\\sqrt{\\frac{L}{g}}$", plainWhy: "Doubling bob mass has ZERO effect on pendulum timing!" },
          { label: "Scale length `L → 4L` inside the square root", mathLatex: "$T_2 = 2\\pi\\sqrt{\\frac{4L}{g}} = \\sqrt{4} \\cdot T_1 = 2\\,T_1$", plainWhy: "Factor `√4 = 2` pulls cleanly out in front!" },
          { label: "Multiply by starting period", mathLatex: "$T_2 = 2 \\times 2.0\\text{ s} = \\mathbf{4.0\\text{ s}}$", plainWhy: "4× longer string = 2× slower swing!" }
        ],
        answerLatex: "$$T_2 = 4.0\\text{ s}$$",
        commonTrap: "Don't mix up Pendulum (`√(L/g)`, mass cancels) with Mass-on-Spring (`√(m/k)`, mass DOES matter)!"
      },
      "physics-sound-doppler-waves": {
        heroFormula: "$$v = f\\lambda, \\qquad f_{\\text{beat}} = |f_1 - f_2|, \\qquad +10\\text{ dB} = 10\\times\\text{ Intensity}$$",
        title: "Decibel Jump & Beat Frequency Check",
        problemLatex: "$$\\text{Compare } 90\\text{ dB vs } 60\\text{ dB, and } 440\\text{ Hz vs } 443\\text{ Hz}$$",
        steps: [
          { label: "Count how many 10-dB steps separate 90 dB and 60 dB", mathLatex: "$\\frac{90 - 60}{10} = 3\\text{ powers of 10}$", plainWhy: "Every +10 dB multiplies sound intensity by ×10!" },
          { label: "Raise 10 to that power", mathLatex: "$10^3 = \\mathbf{1{,}000\\times\\text{ more intense!}}$", plainWhy: "That's why loud 90+ dB noise damages ears so fast!" },
          { label: "Compute Beat Frequency", mathLatex: "$f_{\\text{beat}} = |443 - 440| = \\mathbf{3\\text{ Hz}}$", plainWhy: "Guitarists tune until beats slow down to 0 Hz!" }
        ],
        answerLatex: "$$1{,}000\\times\\text{ intensity}; \\quad 3\\text{ Hz beats}$$",
        commonTrap: "Never subtract dB linearly (90 dB is NOT 1.5× louder than 60 dB — it's 1,000× more intense)!"
      },
      "physics-thermo-four-laws-engines": {
        heroFormula: "$$\\Delta U = Q - W, \\qquad \\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}\\;(\\text{Kelvin ONLY!})$$",
        title: "Computing True Carnot Efficiency From Celsius Inputs",
        problemLatex: "$$T_H = 227^{\\circ}\\text{C}, \\quad T_C = 27^{\\circ}\\text{C} \\implies \\eta_{\\text{max}} = \\text{?}$$",
        steps: [
          { label: "Convert BOTH temperatures to Kelvin FIRST (`+ 273`)", mathLatex: "$T_H = 227 + 273 = 500\\text{ K}, \\qquad T_C = 27 + 273 = 300\\text{ K}$", plainWhy: "Using Celsius directly would give a completely wrong 88%!" },
          { label: "Plug into Carnot formula", mathLatex: "$\\eta_{\\text{max}} = 1 - \\frac{300}{500} = 1 - 0.60 = 0.40$", plainWhy: "At least 60% of input heat MUST be rejected as waste heat by the 2nd Law!" },
          { label: "Express as percentage", mathLatex: "$\\eta_{\\text{max}} = \\mathbf{40\\%}$", plainWhy: "Even a mythical zero-friction engine cannot beat 40% here!" }
        ],
        answerLatex: "$$\\eta_{\\text{max}} = 40\\%$$",
        commonTrap: "ALWAYS convert °C → K before dividing temperatures!"
      },
      "physics-faraday-induction-ac-maxwell": {
        heroFormula: "$$\\mathcal{E} = -N\\frac{\\Delta\\Phi_B}{\\Delta t}, \\qquad \\frac{V_s}{V_p} = \\frac{N_s}{N_p}, \\qquad V_p I_p = V_s I_s$$",
        title: "Step-Down Phone Charger Transformer Calculation",
        problemLatex: "$$V_p = 220\\text{ V AC},\\; N_p = 2200\\text{ turns},\\; N_s = 50\\text{ turns},\\; I_s = 2.2\\text{ A} \\implies V_s, I_p = \\text{?}$$",
        steps: [
          { label: "Compute secondary voltage using turns ratio", mathLatex: "$V_s = 220 \\times \\frac{50}{2200} = \\frac{220}{44} = \\mathbf{5\\text{ V}}$", plainWhy: "Steps 220 V wall power safely down to 5 V USB!" },
          { label: "Conserve ideal power (`V_p I_p = V_s I_s`)", mathLatex: "$(220)\\,I_p = (5)(2.2) = 11\\text{ W}$", plainWhy: "Transformers never create free power — voltage down means current up!" },
          { label: "Solve for primary wall current `I_p`", mathLatex: "$I_p = \\frac{11}{220} = \\mathbf{0.05\\text{ A}}$", plainWhy: "Tiny 50 mA from the wall feeds 2.2 A to your phone!" }
        ],
        answerLatex: "$$V_s = 5\\text{ V}, \\qquad I_p = 0.05\\text{ A}$$",
        commonTrap: "Remember transformers ONLY work with AC (changing magnetic flux) — steady DC induces 0 V!"
      },
      "physics-quantum-photoelectric-nuclear": {
        heroFormula: "$$E = hf = \\frac{hc}{\\lambda}, \\qquad K_{\\max} = hf - \\phi, \\qquad N = N_0\\left(\\frac{1}{2}\\right)^n$$",
        title: "Photoelectric Kinetic Energy & Radioactive Half-Life",
        problemLatex: "$$\\text{Photon } E = 5.2\\text{ eV hits metal } (\\phi = 2.2\\text{ eV}); \\quad 120\\text{ g after 4 half-lives?}$$",
        steps: [
          { label: "Apply Einstein's Photoelectric Equation", mathLatex: "$K_{\\max} = hf - \\phi = 5.2 - 2.2 = \\mathbf{3.0\\text{ eV}}$", plainWhy: "The electron pays the `2.2 eV` 'exit fee' (`φ`) and flies away with `3.0 eV` kinetic energy!" },
          { label: "Check what happens if `hf < φ` (e.g. `1.8 eV` red photon)", mathLatex: "$1.8 < 2.2 \\implies \\mathbf{\\text{0 electrons ejected (even if bright!)}}$", plainWhy: "No threshold frequency → zero emission!" },
          { label: "Compute 4 half-lives of 120 g", mathLatex: "$120 \\times \\left(\\frac{1}{2}\\right)^4 = \\frac{120}{16} = \\mathbf{7.5\\text{ g}}$", plainWhy: "120 → 60 → 30 → 15 → 7.5 g!" }
        ],
        answerLatex: "$$K_{\\max} = 3.0\\text{ eV}; \\qquad 7.5\\text{ g remaining}$$",
        commonTrap: "Higher intensity boosts ELECTRON COUNT (current), NEVER each electron's max kinetic energy!"
      },
      "math-estimation-mental-shortcuts": {
        heroFormula: "$$n5^2 = [n(n+1)]\\,|\\,25, \\qquad x\\times 5 = \\frac{x}{2}\\times 10, \\qquad x\\times 25 = \\frac{x}{4}\\times 100$$",
        title: "Computing `75²` and `44 × 25` Without Paper",
        problemLatex: "$$\\text{Compute } 75^2 \\text{ and } 44 \\times 25 \\text{ in 3 seconds!}$$",
        steps: [
          { label: "Use the `n5²` trick for `75²` (`n = 7`)", mathLatex: "$7 \\times (7 + 1) = 7 \\times 8 = 56 \\implies \\mathbf{5{,}625}$", plainWhy: "Algebraic proof: `(10n + 5)² = 100·n(n+1) + 25` — works EVERY time!" },
          { label: "Use the `×25 = ÷4 × 100` trick for `44 × 25`", mathLatex: "$\\frac{44}{4} = 11 \\implies 11 \\times 100 = \\mathbf{1{,}100}$", plainWhy: "Because `25 = 100 / 4`, dividing by 4 first kills all carrying!" },
          { label: "Sanity check with rough rounding", mathLatex: "$75^2 \\approx 70 \\times 80 = 5{,}600 \\;\\checkmark$", plainWhy: "Fast estimate confirms the exact place value!" }
        ],
        answerLatex: "$$75^2 = 5{,}625; \\qquad 44 \\times 25 = 1{,}100$$",
        commonTrap: "For `×11` when the two digits sum to 10+ (e.g. `68 × 11`: 6+8=14), remember to carry the 1 left → `748`!"
      },
      "math-set-theory-venn-logic": {
        heroFormula: "$$|A \\cup B| = |A| + |B| - |A \\cap B|, \\qquad |\\mathcal{P}(A)| = 2^n$$",
        title: "Solving a 2-Circle Venn Diagram From the Center Out",
        problemLatex: "$$\\text{Class of 50: 28 like Math, 24 like Coding, 10 like BOTH} \\implies \\text{Only Math & Neither?}$$",
        steps: [
          { label: "Fill the middle intersection FIRST", mathLatex: "$|M \\cap C| = \\mathbf{10}$", plainWhy: "Starting in the middle prevents double-counting!" },
          { label: "Find 'Only Math' and total Union `|M ∪ C|`", mathLatex: "$\\text{Only Math} = 28 - 10 = \\mathbf{18}; \\quad |M \\cup C| = 28 + 24 - 10 = 42$", plainWhy: "Check: 18 (only Math) + 10 (both) + 14 (only Coding) = 42 ✓!" },
          { label: "Subtract from class total for 'Neither'", mathLatex: "$\\text{Neither} = 50 - 42 = \\mathbf{8\\text{ students}}$", plainWhy: "All 4 regions (18 + 10 + 14 + 8) sum cleanly back to 50!" }
        ],
        answerLatex: "$$\\text{Only Math} = 18, \\qquad \\text{Neither} = 8$$",
        commonTrap: "Never add `28 + 24 = 52 > 50` and panic — subtracting the 10 in BOTH fixes it instantly!"
      },
      "math-inequalities-intervals-sign-charts": {
        heroFormula: "$$[\\,] = \\text{Included (}\\le,\\ge\\text{)} \\quad | \\quad (\\,) = \\text{Excluded (}<,>,\\pm\\infty\\text{)}$$",
        title: "Solving a Quadratic Inequality Using a 3-Zone Sign Chart",
        problemLatex: "$$\\text{Solve } x^2 - 2x - 8 \\ge 0$$",
        steps: [
          { label: "Factor cleanly to find boundary roots", mathLatex: "$(x - 4)(x + 2) \\ge 0 \\implies \\text{Roots: } x = -2,\\; 4$", plainWhy: "Roots divide the number line into `(-∞,-2)`, `(-2,4)`, and `(4,∞)`." },
          { label: "Test 1 easy number in each zone (`x = -3, 0, 5`)", mathLatex: "$x=-3: (-)(-) = +; \\quad x=0: (-)(+) = -; \\quad x=5: (+)(+) = +$", plainWhy: "The sign stays constant across each open zone!" },
          { label: "Keep `≥ 0` zones WITH closed brackets on finite roots", mathLatex: "$\\mathbf{(-\\infty, -2] \\cup [4, \\infty)}$", plainWhy: "Round `(` on `±∞`, closed `]` on `-2` and `4` because `≥` includes 0!" }
        ],
        answerLatex: "$$(-\\infty, -2] \\cup [4, \\infty)$$",
        commonTrap: "Never take square roots of `x² ≥ 9` and write only `x ≥ 3` — you'd miss `x ≤ −3`!"
      },
      "math-stats-correlation-regression-zscore": {
        heroFormula: "$$z = \\frac{x - \\mu}{\\sigma}, \\qquad r \\in [-1, 1], \\qquad \\hat{y} = mx + b$$",
        title: "Comparing Two Different Exams Fairly Using Z-Scores",
        problemLatex: "$$\\text{Math: } 82\\;(\\mu=70, \\sigma=6) \\quad \\text{vs} \\quad \\text{Physics: } 88\\;(\\mu=80, \\sigma=8)$$",
        steps: [
          { label: "Standardize the Math score into a Z-score", mathLatex: "$z_{\\text{Math}} = \\frac{82 - 70}{6} = \\frac{12}{6} = \\mathbf{+2.0}$", plainWhy: "2 full standard deviations above the Math class average!" },
          { label: "Standardize the Physics score into a Z-score", mathLatex: "$z_{\\text{Phys}} = \\frac{88 - 80}{8} = \\frac{8}{8} = \\mathbf{+1.0}$", plainWhy: "1 standard deviation above the Physics average." },
          { label: "Compare relative standing", mathLatex: "$+2.0 > +1.0 \\implies \\mathbf{\\text{82 in Math was relatively stronger!}}$", plainWhy: "Z-scores put completely different grading scales onto one fair ruler!" }
        ],
        answerLatex: "$$\\text{Math } (z = +2.0) > \\text{Physics } (z = +1.0)$$",
        commonTrap: "Raw scores on different scales can mislead — Z-scores normalize both mean AND spread!"
      },
      "math-game-theory-graph-theory": {
        heroFormula: "$$\\sum \\deg(v) = 2|E|, \\qquad \\text{Euler Path} \\iff 0\\text{ or }2\\text{ odd vertices}$$",
        title: "Finding the Nash Equilibrium in Prisoner's Dilemma",
        problemLatex: "$$\\text{Payoffs (You, Rival): Both Coop } (-1,-1);\\; \\text{Defect vs Coop } (0,-5);\\; \\text{Both Defect } (-3,-3)$$",
        steps: [
          { label: "Check your best move if Rival COOPERATES", mathLatex: "$\\text{Coop} = -1 \\text{ vs Defect} = 0 \\implies \\mathbf{\\text{Defect wins } (0 > -1)}$", plainWhy: "Zero years in jail beats 1 year." },
          { label: "Check your best move if Rival DEFECTS", mathLatex: "$\\text{Coop} = -5 \\text{ vs Defect} = -3 \\implies \\mathbf{\\text{Defect wins } (-3 > -5)}$", plainWhy: "3 years beats 5 years — Defect is a **Dominant Strategy**!" },
          { label: "Identify the Nash Equilibrium", mathLatex: "$\\mathbf{(\\text{Defect, Defect}) = (-3, -3)}$", plainWhy: "Neither player wants to switch alone — even though `(-1, -1)` was better for both!" }
        ],
        answerLatex: "$$\\text{Nash Equilibrium} = (\\text{Defect, Defect})$$",
        commonTrap: "A Nash Equilibrium does NOT mean the 'best outcome for everyone' — it only means 'stable against unilateral switching'!"
      },
      "physics-mirrors-lenses-concave-convex": {
        heroFormula: "$$\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}, \\qquad m = -\\frac{d_i}{d_o} = \\frac{h_i}{h_o}$$",
        title: "Solving a Converging Lens & Checking Real vs Virtual",
        problemLatex: "$$\\text{Convex Lens } f = +10\\text{ cm},\\; d_o = 30\\text{ cm} \\implies d_i \\text{ and magnification } m = \\text{?}$$",
        steps: [
          { label: "Isolate `1/d_i` in the Thin-Lens Equation", mathLatex: "$\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o} = \\frac{1}{10} - \\frac{1}{30} = \\frac{3 - 1}{30} = \\frac{2}{30} = \\frac{1}{15}$", plainWhy: "Converging Convex Lens takes positive `+10 cm`!" },
          { label: "INVERT to find `d_i` (check sign!)", mathLatex: "$d_i = \\mathbf{+15\\text{ cm}} \\;(+\\text{ means REAL image!})$", plainWhy: "Positive `d_i` means real rays physically converge on the far side!" },
          { label: "Compute Magnification `m = −d_i / d_o`", mathLatex: "$m = -\\frac{15}{30} = \\mathbf{-0.5} \\;(\\text{Inverted \& Half-Size!})$", plainWhy: "Negative `m` = Inverted; `|m| = 0.5 < 1` = Smaller (exactly matching `d_o > 2f`)!" }
        ],
        answerLatex: "$$d_i = +15\\text{ cm (Real)}, \\quad m = -0.5\\text{ (Inverted, Reduced)}$$",
        commonTrap: "Convex MIRROR is diverging (`f < 0`), while Convex LENS is converging (`f > 0`) — never mix them up!"
      },
      "math-convex-concave-polygons-curves": {
        heroFormula: "$$\\text{Polygon Sum} = (n - 2)\\cdot 180^{\\circ}, \\qquad f''(x) > 0 \\;(\\cup\\text{ Convex}) \\;|\\; f''(x) < 0 \\;(\\cap\\text{ Concave Down})$$",
        title: "Classifying Curve Concavity & Inflection Point on `f(x) = x³ − 6x²`",
        problemLatex: "$$f(x) = x^3 - 6x^2 \\implies \\text{Where is it Concave UP, Concave DOWN, and Inflection?}$$",
        steps: [
          { label: "Differentiate TWICE to reach concavity `f''(x)`", mathLatex: "$f'(x) = 3x^2 - 12x \\implies f''(x) = \\mathbf{6x - 12}$", plainWhy: "`f'` gives slope; `f''` measures how fast the slope bends!" },
          { label: "Solve `f''(x) = 0` for the Inflection Point", mathLatex: "$6x - 12 = 0 \\implies \\mathbf{x = 2}$", plainWhy: "Check sign flip: `x < 2` gives `f'' < 0`; `x > 2` gives `f'' > 0` ✓!" },
          { label: "Label the two intervals", mathLatex: "$x < 2: \\text{Concave DOWN } (\\cap); \\qquad x > 2: \\text{Concave UP / Convex } (\\cup)$", plainWhy: "Inflection point sits right at `(2, −16)`!" }
        ],
        answerLatex: "$$\\text{Inflection at } x = 2; \\quad \\text{Concave UP on } (2, \\infty)$$",
        commonTrap: "A point where `f''(x) = 0` is ONLY an Inflection Point if `f''` actually CHANGES SIGN across it (e.g. `y = x⁴` does NOT flip at `x = 0`!)!"
      },
      "physics-fluids-buoyancy-bernoulli": {
        heroFormula: "$$P = P_0 + \\rho g h, \\qquad F_B = \\rho_{\\text{fl}} V_{\\text{sub}} g, \\qquad A_1 v_1 = A_2 v_2, \\qquad P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{const}$$",
        title: "Linking Continuity & Bernoulli in a Narrowing Pipe",
        problemLatex: "$$\\text{Pipe area shrinks } 3\\times\\; (A_2 = A_1/3) \\text{ horizontally with } v_1 = 2\\text{ m/s}$$",
        steps: [
          { label: "Apply Continuity Equation (`A₁v₁ = A₂v₂`)", mathLatex: "$v_2 = v_1 \\frac{A_1}{A_2} = 2 \\times 3 = \\mathbf{6\\text{ m/s}}$", plainWhy: "Same volume per second squeezed through 1/3 area must move 3× faster!" },
          { label: "Compare Kinetic Energy Density `½ρv²`", mathLatex: "$v \\text{ jumped } 3\\times \\implies \\frac{1}{2}\\rho v^2 \\text{ jumped } 3^2 = \\mathbf{9\\times!}$", plainWhy: "Energy must come from somewhere in a level pipe (`h` constant)!" },
          { label: "Apply Bernoulli's Energy Conservation", mathLatex: "$P_2 = P_1 - \\frac{1}{2}\\rho(v_2^2 - v_1^2) < P_1 \\implies \\mathbf{\\text{Pressure DROPS!}}$", plainWhy: "Higher speed ALWAYS equals lower static pressure!" }
        ],
        answerLatex: "$$v_2 = 6\\text{ m/s} \\quad (\\text{and Static Pressure } P_2 \\text{ DROPS!})$$",
        commonTrap: "Never assume narrower pipe = higher pressure — pressure DROPS where speed rises!"
      },
      "math-binomial-pascal-series-formulas": {
        heroFormula: "$$(a+b)^n = \\sum_{k=0}^n \\binom{n}{k} a^{n-k} b^k, \\quad S_\\infty = \\frac{a}{1-r}, \\quad A = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad V-E+F=2$$",
        title: "Using Heron's Formula & Infinite Geometric Sum",
        problemLatex: "$$\\text{(A) Triangle sides } 5, 5, 6 \\implies \\text{Area?}; \\qquad \\text{(B) Sum } 12 + 4 + \\frac{4}{3} + \\dots$$",
        steps: [
          { label: "Compute semiperimeter `s` for Heron's Formula", mathLatex: "$s = \\frac{5 + 5 + 6}{2} = \\mathbf{8}$", plainWhy: "Half the perimeter — works on ANY triangle with zero trigonometry!" },
          { label: "Plug `s = 8` into `√(s(s−a)(s−b)(s−c))`", mathLatex: "$A = \\sqrt{8(8-5)(8-5)(8-6)} = \\sqrt{8 \\cdot 3 \\cdot 3 \\cdot 2} = \\sqrt{144} = \\mathbf{12}$", plainWhy: "Exact area = 12 square units!" },
          { label: "Sum the Infinite Geometric Series (`a = 12, r = 1/3`)", mathLatex: "$S_\\infty = \\frac{12}{1 - \\frac{1}{3}} = \\frac{12}{\\frac{2}{3}} = 12 \\times \\frac{3}{2} = \\mathbf{18}$", plainWhy: "Valid because `|r| = 1/3 < 1`!" }
        ],
        answerLatex: "$$\\text{Area} = 12; \\qquad S_\\infty = 18$$",
        commonTrap: "Never use `S_∞ = a/(1−r)` when `|r| ≥ 1` (e.g. `1 + 2 + 4 + ...` diverges to `∞`, NOT `−1`!)!"
      }
    });
  }
})(typeof window !== "undefined" ? window : globalThis);
