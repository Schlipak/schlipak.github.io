import {
  Flowmap,
  Geometry,
  Mesh,
  Program,
  Renderer,
  Texture,
  Vec2,
  Vec4
} from 'ogl';

import { init, vert, frag } from './utils';

(() => {
  const vertexShader = vert`
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

  const fragmentShader = frag`
      precision highp float;
      precision highp int;

      varying vec2 vUv;

      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uUseMouse;
      uniform float uNoiseMultiplier;
      uniform sampler2D uWater;
      uniform sampler2D uFlow;
      uniform vec4 res;

      const float PI  = 3.141592653;
      const float PHI = 1.618033988;

      float gold_noise(in vec2 xy, in float seed) {
        return fract(tan(distance(xy * PHI, xy) * seed) * xy.x);
      }

      float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
      }

      void main() {
        vec3 flow = texture2D(uFlow, vUv).rgb;
        vec2 uv = 0.5 * gl_FragCoord.xy / res.xy ;

        vec3 noise = vec3(gold_noise(uv.xy * res.xy + vec2(0.9, 0.0), mod(uTime, 1000.0)));
        float progress = clamp(((uTime * 0.5) - 10.0) / 30.0, 0.0, 1.0);

        vec2 offset = (uMouse - vec2(0.5)) * (0.1 * 0.05) * uUseMouse;
        vec2 myUV = (uv - vec2(0.5)) * res.zw + vec2(0.5) + offset;

        myUV -= flow.xy * (0.015 * 0.2) * (noise.xy * uNoiseMultiplier);

        vec3 tex = texture2D(uWater, myUV).rgb;
        vec3 flowTex = (vec3(0.02) + (tex.rgb * (0.75 + (3.0 * progress))) + (noise * 0.2)) *
                       (vec3(0.2, 0.2, 0.4) + ((vec3(0.3) + tex.rgb) * flow * noise * 2.0));

        gl_FragColor = vec4(clamp(flowTex, vec3(0.0), vec3(1.0)), tex.r);
      }
    `;

  const I = {
    default: document.querySelector('meta[name="app:svg:default"]').getAttribute('content'),
    touch: document.querySelector('meta[name="app:svg:touch"]').getAttribute('content')
  };

  const S = {
    isTouchCapable: 'ontouchstart' in window,
    mouse: new Vec2(0.5),
    velocity: new Vec2(),

    previousTime: null,
    previousMouse: new Vec2(),

    aspect: 1,
    image: {
      url: '',
      size: { x: 1600, y: 1200 }
    },

    renderer: null,
    gl: null,
    canvas: null,

    flowmap: null,
    geometry: null,
    texture: null,
    program: null,
    mesh: null
  };

  const computeAspect = () => {
    const imageAspect = S.image.size.y / S.image.size.x;
    const windowAspect = {
      h: window.innerHeight / window.innerWidth,
      v: window.innerWidth / window.innerHeight
    };

    if (windowAspect.h < imageAspect) {
      return { ah: 1, av: windowAspect.h / imageAspect };
    }

    return { ah: windowAspect.v * imageAspect, av: 1 };
  };

  const resize = () => {
    const { ah, av } = computeAspect();

    S.mesh.program.uniforms.res.value = new Vec4(
      window.innerWidth,
      window.innerHeight,
      ah,
      av
    );

    S.renderer.setSize(window.innerWidth, window.innerHeight);
    S.aspect = window.innerWidth / window.innerHeight;
  };

  const updateMouse = event => {
    const { changedTouches, pageX, pageY } = event;

    // Do not prevent default as this blocks clicks on links on touch devices
    // event.preventDefault();

    const P = { x: event.x, y: event.y };

    if (changedTouches && changedTouches.length) {
      P.x = changedTouches[0].pageX;
      P.y = changedTouches[0].pageY;
    } else if (event.x === undefined) {
      P.x = pageX;
      P.y = pageY;
    }

    // Get mouse value in 0 to 1 range, with y flipped
    S.mouse.set(P.x / S.gl.renderer.width, 1.0 - P.y / S.gl.renderer.height);

    // Calculate velocity
    if (!S.previousTime) {
      // First frame
      S.previousTime = window.performance.now();
      S.previousMouse.set(P.x, P.y);
    }

    const deltaX = P.x - S.previousMouse.x;
    const deltaY = P.y - S.previousMouse.y;

    S.previousMouse.set(P.x, P.y);

    const time = window.performance.now();

    // Avoid dividing by 0
    const delta = Math.max(10.4, time - S.previousTime);

    S.previousTime = time;
    S.velocity.x = deltaX / delta;
    S.velocity.y = deltaY / delta;

    // Flag update to prevent hanging velocity values when not moving
    S.velocity.needsUpdate = true;
  };

  init(() => {
    S.renderer = new Renderer({
      dpr: 2,
      alpha: true,
      premultipliedAlpha: true
    });

    S.gl = S.renderer.gl;
    S.canvas = S.gl.canvas;

    S.canvas.setAttribute('id', 'scene');
    document.body.appendChild(S.canvas);

    S.flowmap = new Flowmap(S.gl, {
      size: 512,
      falloff: S.isTouchCapable ? 0.3 : 0.4,
      dissipation: 0.95
    });

    S.geometry = new Geometry(S.gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3])
      },
      uv: {
        size: 2,
        data: new Float32Array([0, 0, 2, 0, 0, 2])
      }
    });

    S.texture = new Texture(S.gl, {
      minFilter: S.gl.LINEAR,
      magFilter: S.gl.LINEAR,
      premultiplyAlpha: true
    });

    const img = new Image();

    img.addEventListener('load', () => (S.texture.image = img));

    if (S.isTouchCapable) {
      img.src = I.touch;
    } else {
      img.src = I.default;
    }

    const { ah, av } = computeAspect();

    S.program = new Program(S.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: S.mouse },
        uUseMouse: { value: S.isTouchCapable ? 0.0 : 1.0 },
        uNoiseMultiplier: { value: S.isTouchCapable ? 16.0 : 3.0 },
        uWater: { value: S.texture },
        uFlow: S.flowmap.uniform,
        img: { value: new Vec2(S.image.size.x, S.image.size.y) },
        res: {
          value: new Vec4(window.innerWidth, window.innerHeight, ah, av)
        }
      }
    });

    S.mesh = new Mesh(S.gl, { geometry: S.geometry, program: S.program });

    window.addEventListener('resize', resize, false);
    resize();

    if (S.isTouchCapable) {
      window.addEventListener('touchstart', updateMouse, { passive: false });
      window.addEventListener('touchmove', updateMouse, { passive: false });
    } else {
      window.addEventListener('mousemove', updateMouse, false);
    }

    const update = elapsed => {
      requestAnimationFrame(update);

      if (!S.velocity.needsUpdate) {
        S.velocity.set(0);
      }

      S.velocity.needsUpdate = false;

      S.flowmap.aspect = S.aspect;
      S.flowmap.mouse.copy(S.mouse);
      S.flowmap.velocity.lerp(S.velocity, S.velocity.len ? 0.15 : 0.1);
      S.flowmap.update();

      S.program.uniforms.uTime.value = elapsed * 0.01;

      S.renderer.render({ scene: S.mesh });
    };

    requestAnimationFrame(update);
  });
})();
