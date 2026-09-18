'use client';

import { createElement, useEffect, useRef, useState } from 'react';
import { preset, resolveState } from './preset.js';
import { renderParts } from './render.js';
import { mountCharacter, reactionDuration } from './motion.js';
import './ExcellenceTeam.css';

export function ExcellenceTeam({
  state = preset.defaultState,
  size = preset.size,
  playing = true,
  interactive = true,
  ...props
}) {
  const ref = useRef(null);
  const [poked, setPoked] = useState(false);
  const reaction = poked ? 'happy' : resolveState(state);

  useEffect(
    () => mountCharacter(ref.current, preset, reaction, playing, interactive),
    [reaction, playing, interactive],
  );

  useEffect(() => {
    if (!poked) return undefined;
    const timer = setTimeout(() => setPoked(false), reactionDuration('happy'));
    return () => clearTimeout(timer);
  }, [poked]);

  function react() {
    if (interactive) setPoked(true);
  }

  return (
    <svg
      ref={ref}
      className="wobbi-character"
      viewBox="-16 -16 288 288"
      width={size}
      height={size}
      role={interactive ? 'button' : 'img'}
      tabIndex={interactive ? 0 : undefined}
      aria-label={preset.accessibility.label}
      data-state={reaction}
      data-respect-motion={preset.accessibility.respectReducedMotion}
      onClick={react}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                react();
              }
            }
          : undefined
      }
      {...props}
    >
      {renderParts(createElement, preset, reaction)}
    </svg>
  );
}
