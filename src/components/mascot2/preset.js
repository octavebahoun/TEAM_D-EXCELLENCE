const VALID_STATES = new Set(["idle","happy","thinking","surprised","sad","error","success","loading","sleeping","singing"]);

export const resolveState = (state) => VALID_STATES.has(state) ? state : 'idle';

export const preset = {
  "version": 2,
  "id": "wobbi-original",
  "slug": "excellence-team-2",
  "name": "Excellence team 2",
  "componentName": "ExcellenceTeam2",
  "preset": "wobbi",
  "shape": "wobbi",
  "eyes": "glossy",
  "nose": "none",
  "brows": "none",
  "mouth": "smile",
  "depth": "deep",
  "color": "#fe4619",
  "mouthColor": "#111218",
  "noseColor": "#111218",
  "browColor": "#111218",
  "pupilColor": "#111218",
  "lashColor": "#111218",
  "eyeOutlineColor": "#111218",
  "eyeOutlineWidth": 0,
  "head": "none",
  "accessory": "monocle",
  "accessoryColor": "#262331",
  "accentColor": "#9270ff",
  "eyeColor": "#ffffff",
  "outlineColor": "#fe4619",
  "outlineWidth": 2,
  "background": {
    "type": "transparent",
    "color": "#f1edff"
  },
  "size": 256,
  "defaultState": "idle",
  "reactions": {
    "idle": {
      "duration": 2400,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "blink",
          "enabled": true
        },
        {
          "type": "eye-movement",
          "enabled": true
        }
      ]
    },
    "happy": {
      "duration": 800,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "bounce",
          "enabled": true
        },
        {
          "type": "squash",
          "enabled": true
        },
        {
          "type": "tilt",
          "enabled": true
        },
        {
          "type": "blink",
          "enabled": true
        }
      ]
    },
    "thinking": {
      "duration": 800,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "tilt",
          "enabled": true
        },
        {
          "type": "eye-movement",
          "enabled": true
        }
      ]
    },
    "surprised": {
      "duration": 800,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "squash",
          "enabled": true
        },
        {
          "type": "blink",
          "enabled": true
        }
      ]
    },
    "sad": {
      "duration": 800,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "tilt",
          "enabled": true
        }
      ]
    },
    "error": {
      "duration": 800,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "shake",
          "enabled": true
        }
      ]
    },
    "success": {
      "duration": 800,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "bounce",
          "enabled": true
        },
        {
          "type": "squash",
          "enabled": true
        }
      ]
    },
    "loading": {
      "duration": 800,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "tilt",
          "enabled": true
        },
        {
          "type": "blink",
          "enabled": true
        }
      ]
    },
    "sleeping": {
      "duration": 800,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "blink",
          "enabled": true
        }
      ]
    },
    "singing": {
      "duration": 800,
      "intensity": 60,
      "easing": "ease-out",
      "playback": "loop",
      "movements": [
        {
          "type": "bounce",
          "enabled": true
        },
        {
          "type": "mouth",
          "enabled": true
        }
      ]
    }
  },
  "export": {
    "folder": "src/components/mascot",
    "framework": "react"
  },
  "accessibility": {
    "respectReducedMotion": true,
    "pauseOffscreen": true,
    "label": "Mascotte Wobbi"
  }
};
