'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // ✅ Correct usage — pass engine here
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: false }, // 🧠 key: keeps canvas inside parent div
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 100, density: { enable: true, area: 800 } },
      color: { value: '#aaa' },
      shape: { type: 'square' },
      opacity: { value: 0.3 },
      size: { value: { min: 5, max: 15 } },
      move: {
        enable: true,
        direction: 'bottom',
        speed: 1,
        outModes: { default: 'out' },
      },
    },
    detectRetina: true,
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 w-full h-full"
      canvasClassName="w-full h-full"
    />
  );
};

export default ParticlesBackground;
