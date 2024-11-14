"use strict";
(() => {
  // src/vector.ts
  var Vector = class _Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    static zero() {
      return new _Vector(0, 0);
    }
    toString() {
      return `${this.x}_${this.y}`;
    }
    mul(multiplier) {
      return new _Vector(this.x * multiplier, this.y * multiplier);
    }
    add(other) {
      return new _Vector(this.x + other.x, this.y + other.y);
    }
    sub(other) {
      return new _Vector(this.x - other.x, this.y - other.y);
    }
    matmul(other) {
      return new _Vector(this.x * other.x, this.y * other.y);
    }
    round() {
      return new _Vector(Math.round(this.x), Math.round(this.y));
    }
    floor() {
      return new _Vector(Math.floor(this.x), Math.floor(this.y));
    }
    eq(other) {
      return this.x === other.x && this.y === other.y;
    }
    copy() {
      return new _Vector(this.x, this.y);
    }
    angle() {
      const a = Math.atan2(this.y, this.x) * 180 / Math.PI;
      if (a < 0) {
        return a + 360;
      }
      return a;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    gridDistance(other) {
      const v = this.sub(other);
      const x = Math.abs(v.x);
      const y = Math.abs(v.y);
      const xy = Math.abs(v.x + v.y);
      return Math.max(x, y, xy);
    }
    neighbors() {
      const neighbors = [];
      for (const nv of IDX_TO_UNIT_VECTOR.values()) {
        neighbors.push(this.add(nv));
      }
      return neighbors;
    }
    interpolate(other, t) {
      if (t <= 0) {
        return this.copy();
      }
      if (t >= 1) {
        return other.copy();
      }
      return this.add(other.sub(this).mul(t));
    }
    toPlaneCoords() {
      const y = this.y * Math.sqrt(3) / 2;
      const x = this.x + this.y * 0.5;
      return new _Vector(x, y);
    }
  };
  function interpolatePath(points, fracs, frac) {
    if (frac <= 0) {
      return points[0].copy();
    }
    if (frac >= fracs[fracs.length - 1]) {
      return points[points.length - 1];
    }
    let i = 0;
    let start = 0;
    while (i < fracs.length && frac >= fracs[i]) {
      start = fracs[i];
      i++;
    }
    const end = fracs[i];
    const segFrac = (frac - start) / (end - start);
    return points[i].interpolate(points[i + 1], segFrac);
  }
  function isNeighbor(p1, p2) {
    if (!p1.eq(p1.floor())) return false;
    if (!p2.eq(p2.floor())) return false;
    if (p1.eq(p2)) return false;
    const v = p2.sub(p1);
    if (v.x <= 1 && v.x >= -1 && v.y === 0) return true;
    if (v.y <= 1 && v.y >= -1 && v.x === 0) return true;
    if (v.x === 1 && v.y === -1 || v.x === -1 && v.y === 1) return true;
    return false;
  }
  function includesVector(arr, v) {
    for (const av of arr) {
      if (av.eq(v)) {
        return true;
      }
    }
    return false;
  }
  var IDX_TO_UNIT_VECTOR = /* @__PURE__ */ new Map([
    [0, new Vector(1, 0)],
    [1, new Vector(0, 1)],
    [2, new Vector(-1, 1)],
    [3, new Vector(-1, 0)],
    [4, new Vector(0, -1)],
    [5, new Vector(1, -1)]
  ]);
  function unitVectorToIdx(v) {
    for (const [idx, uv] of IDX_TO_UNIT_VECTOR.entries()) {
      if (v.eq(uv)) return idx;
    }
    return 0;
  }
  function idxToUnitVector(idx) {
    const v = IDX_TO_UNIT_VECTOR.get(idx);
    if (v === void 0) return null;
    return v;
  }

  // src/sprites.ts
  var SPRITES_64 = {
    hexSize: new Vector(64, 36),
    hexes: {
      light: [
        {
          start: new Vector(453, 224),
          size: new Vector(64, 42),
          offset: new Vector(-32, -18)
        },
        {
          start: new Vector(453, 308),
          size: new Vector(64, 42),
          offset: new Vector(-32, -18)
        },
        {
          start: new Vector(453, 392),
          size: new Vector(64, 42),
          offset: new Vector(-32, -18)
        }
      ],
      dark: [
        {
          start: new Vector(453, 266),
          size: new Vector(64, 42),
          offset: new Vector(-32, -18)
        },
        {
          start: new Vector(453, 350),
          size: new Vector(64, 42),
          offset: new Vector(-32, -18)
        },
        {
          start: new Vector(453, 434),
          size: new Vector(64, 42),
          offset: new Vector(-32, -18)
        }
      ]
    },
    overlays: {
      paths: [
        {
          "01": {
            start: new Vector(767, 75),
            size: new Vector(34, 18),
            offset: new Vector(-2, -3)
          },
          "02": {
            start: new Vector(578, 294),
            size: new Vector(53, 18),
            offset: new Vector(-21, -3)
          },
          "04": {
            start: new Vector(578, 348),
            size: new Vector(53, 18),
            offset: new Vector(-21, -15)
          },
          "05": {
            start: new Vector(767, 129),
            size: new Vector(34, 18),
            offset: new Vector(-2, -15)
          },
          "12": {
            start: new Vector(681, 826),
            size: new Vector(42, 16),
            offset: new Vector(-21, -1)
          },
          "13": {
            start: new Vector(578, 402),
            size: new Vector(53, 18),
            offset: new Vector(-32, -3)
          },
          "15": {
            start: new Vector(890, 63),
            size: new Vector(22, 30),
            offset: new Vector(-1, -15)
          },
          "23": {
            start: new Vector(767, 183),
            size: new Vector(34, 18),
            offset: new Vector(-32, -3)
          },
          "24": {
            start: new Vector(890, 153),
            size: new Vector(22, 30),
            offset: new Vector(-21, -15)
          },
          "34": {
            start: new Vector(767, 237),
            size: new Vector(34, 18),
            offset: new Vector(-32, -15)
          },
          "35": {
            start: new Vector(578, 240),
            size: new Vector(53, 18),
            offset: new Vector(-32, -15)
          },
          "45": {
            start: new Vector(633, 935),
            size: new Vector(42, 16),
            offset: new Vector(-21, -15)
          },
          "0": {
            start: new Vector(48, 945),
            size: new Vector(32, 6),
            offset: new Vector(0, -3)
          },
          "1": {
            start: new Vector(863, 236),
            size: new Vector(26, 17),
            offset: new Vector(-5, -2)
          },
          "2": {
            start: new Vector(863, 287),
            size: new Vector(26, 17),
            offset: new Vector(-21, -2)
          },
          "3": {
            start: new Vector(453, 949),
            size: new Vector(32, 6),
            offset: new Vector(-32, -3)
          },
          "4": {
            start: new Vector(863, 338),
            size: new Vector(26, 17),
            offset: new Vector(-21, -15)
          },
          "5": {
            start: new Vector(863, 389),
            size: new Vector(26, 17),
            offset: new Vector(-5, -15)
          },
          arrowR: {
            start: new Vector(863, 842),
            size: new Vector(24, 14),
            offset: new Vector(-8, -7)
          },
          arrowL: {
            start: new Vector(863, 884),
            size: new Vector(24, 14),
            offset: new Vector(-16, -7)
          }
        },
        {
          "01": {
            start: new Vector(767, 93),
            size: new Vector(34, 18),
            offset: new Vector(-2, -3)
          },
          "02": {
            start: new Vector(578, 312),
            size: new Vector(53, 18),
            offset: new Vector(-21, -3)
          },
          "04": {
            start: new Vector(578, 366),
            size: new Vector(53, 18),
            offset: new Vector(-21, -15)
          },
          "05": {
            start: new Vector(767, 147),
            size: new Vector(34, 18),
            offset: new Vector(-2, -15)
          },
          "12": {
            start: new Vector(681, 842),
            size: new Vector(42, 16),
            offset: new Vector(-21, -1)
          },
          "13": {
            start: new Vector(578, 420),
            size: new Vector(53, 18),
            offset: new Vector(-32, -3)
          },
          "15": {
            start: new Vector(890, 93),
            size: new Vector(22, 30),
            offset: new Vector(-1, -15)
          },
          "23": {
            start: new Vector(767, 201),
            size: new Vector(34, 18),
            offset: new Vector(-32, -3)
          },
          "24": {
            start: new Vector(890, 183),
            size: new Vector(22, 30),
            offset: new Vector(-21, -15)
          },
          "34": {
            start: new Vector(767, 255),
            size: new Vector(34, 18),
            offset: new Vector(-32, -15)
          },
          "35": {
            start: new Vector(578, 258),
            size: new Vector(53, 18),
            offset: new Vector(-32, -15)
          },
          "45": {
            start: new Vector(681, 794),
            size: new Vector(42, 16),
            offset: new Vector(-21, -15)
          },
          "0": {
            start: new Vector(197, 948),
            size: new Vector(32, 6),
            offset: new Vector(0, -3)
          },
          "1": {
            start: new Vector(863, 253),
            size: new Vector(26, 17),
            offset: new Vector(-5, -2)
          },
          "2": {
            start: new Vector(863, 304),
            size: new Vector(26, 17),
            offset: new Vector(-21, -2)
          },
          "3": {
            start: new Vector(578, 948),
            size: new Vector(32, 6),
            offset: new Vector(-32, -3)
          },
          "4": {
            start: new Vector(863, 355),
            size: new Vector(26, 17),
            offset: new Vector(-21, -15)
          },
          "5": {
            start: new Vector(863, 406),
            size: new Vector(26, 17),
            offset: new Vector(-5, -15)
          },
          arrowR: {
            start: new Vector(863, 856),
            size: new Vector(24, 14),
            offset: new Vector(-8, -7)
          },
          arrowL: {
            start: new Vector(863, 898),
            size: new Vector(24, 14),
            offset: new Vector(-16, -7)
          }
        },
        {
          "01": {
            start: new Vector(767, 111),
            size: new Vector(34, 18),
            offset: new Vector(-2, -3)
          },
          "02": {
            start: new Vector(578, 330),
            size: new Vector(53, 18),
            offset: new Vector(-21, -3)
          },
          "04": {
            start: new Vector(578, 384),
            size: new Vector(53, 18),
            offset: new Vector(-21, -15)
          },
          "05": {
            start: new Vector(767, 165),
            size: new Vector(34, 18),
            offset: new Vector(-2, -15)
          },
          "12": {
            start: new Vector(681, 858),
            size: new Vector(42, 16),
            offset: new Vector(-21, -1)
          },
          "13": {
            start: new Vector(578, 438),
            size: new Vector(53, 18),
            offset: new Vector(-32, -3)
          },
          "15": {
            start: new Vector(890, 123),
            size: new Vector(22, 30),
            offset: new Vector(-1, -15)
          },
          "23": {
            start: new Vector(767, 219),
            size: new Vector(34, 18),
            offset: new Vector(-32, -3)
          },
          "24": {
            start: new Vector(890, 213),
            size: new Vector(22, 30),
            offset: new Vector(-21, -15)
          },
          "34": {
            start: new Vector(767, 273),
            size: new Vector(34, 18),
            offset: new Vector(-32, -15)
          },
          "35": {
            start: new Vector(578, 276),
            size: new Vector(53, 18),
            offset: new Vector(-32, -15)
          },
          "45": {
            start: new Vector(681, 810),
            size: new Vector(42, 16),
            offset: new Vector(-21, -15)
          },
          "0": {
            start: new Vector(229, 948),
            size: new Vector(32, 6),
            offset: new Vector(0, -3)
          },
          "1": {
            start: new Vector(863, 270),
            size: new Vector(26, 17),
            offset: new Vector(-5, -2)
          },
          "2": {
            start: new Vector(863, 321),
            size: new Vector(26, 17),
            offset: new Vector(-21, -2)
          },
          "3": {
            start: new Vector(681, 945),
            size: new Vector(32, 6),
            offset: new Vector(-32, -3)
          },
          "4": {
            start: new Vector(863, 372),
            size: new Vector(26, 17),
            offset: new Vector(-21, -15)
          },
          "5": {
            start: new Vector(863, 423),
            size: new Vector(26, 17),
            offset: new Vector(-5, -15)
          },
          arrowR: {
            start: new Vector(863, 870),
            size: new Vector(24, 14),
            offset: new Vector(-8, -7)
          },
          arrowL: {
            start: new Vector(863, 912),
            size: new Vector(24, 14),
            offset: new Vector(-16, -7)
          }
        }
      ],
      highlights: [
        {
          start: new Vector(518, 118),
          size: new Vector(60, 32),
          offset: new Vector(-30, -16)
        },
        {
          start: new Vector(518, 150),
          size: new Vector(60, 32),
          offset: new Vector(-30, -16)
        },
        {
          start: new Vector(518, 182),
          size: new Vector(60, 32),
          offset: new Vector(-30, -16)
        }
      ],
      aim: [
        {
          start: new Vector(767, 643),
          size: new Vector(32, 16),
          offset: new Vector(0, -8)
        },
        {
          start: new Vector(833, 548),
          size: new Vector(28, 16),
          offset: new Vector(-5, -2)
        },
        {
          start: new Vector(833, 564),
          size: new Vector(28, 16),
          offset: new Vector(-23, -2)
        },
        {
          start: new Vector(767, 659),
          size: new Vector(32, 16),
          offset: new Vector(-32, -8)
        },
        {
          start: new Vector(833, 580),
          size: new Vector(28, 16),
          offset: new Vector(-23, -14)
        },
        {
          start: new Vector(833, 596),
          size: new Vector(28, 16),
          offset: new Vector(-5, -14)
        }
      ],
      markers: {
        light: [
          {
            start: new Vector(453, 816),
            size: new Vector(62, 29),
            offset: new Vector(-30, -13)
          },
          {
            start: new Vector(518, 214),
            size: new Vector(60, 32),
            offset: new Vector(-30, -16)
          }
        ],
        dark: [
          {
            start: new Vector(453, 845),
            size: new Vector(62, 29),
            offset: new Vector(-30, -13)
          },
          {
            start: new Vector(518, 246),
            size: new Vector(60, 32),
            offset: new Vector(-30, -16)
          }
        ]
      }
    },
    tanksBodies: [
      {
        start: new Vector(833, 430),
        size: new Vector(29, 15),
        offset: new Vector(-15, -10)
      },
      {
        start: new Vector(802, 536),
        size: new Vector(31, 16),
        offset: new Vector(-16, -10)
      },
      {
        start: new Vector(767, 675),
        size: new Vector(32, 16),
        offset: new Vector(-17, -10)
      },
      {
        start: new Vector(767, 507),
        size: new Vector(33, 17),
        offset: new Vector(-17, -10)
      },
      {
        start: new Vector(767, 291),
        size: new Vector(33, 18),
        offset: new Vector(-17, -11)
      },
      {
        start: new Vector(802, 312),
        size: new Vector(31, 19),
        offset: new Vector(-16, -12)
      },
      {
        start: new Vector(802, 232),
        size: new Vector(31, 20),
        offset: new Vector(-16, -12)
      },
      {
        start: new Vector(833, 274),
        size: new Vector(29, 20),
        offset: new Vector(-15, -12)
      },
      {
        start: new Vector(833, 784),
        size: new Vector(27, 21),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(863, 580),
        size: new Vector(24, 21),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(890, 371),
        size: new Vector(21, 21),
        offset: new Vector(-11, -13)
      },
      {
        start: new Vector(913, 321),
        size: new Vector(18, 20),
        offset: new Vector(-9, -13)
      },
      {
        start: new Vector(934, 323),
        size: new Vector(14, 20),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(913, 341),
        size: new Vector(18, 20),
        offset: new Vector(-9, -13)
      },
      {
        start: new Vector(890, 392),
        size: new Vector(21, 21),
        offset: new Vector(-10, -13)
      },
      {
        start: new Vector(863, 601),
        size: new Vector(24, 21),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(833, 805),
        size: new Vector(27, 21),
        offset: new Vector(-13, -13)
      },
      {
        start: new Vector(833, 294),
        size: new Vector(29, 20),
        offset: new Vector(-14, -12)
      },
      {
        start: new Vector(802, 252),
        size: new Vector(31, 20),
        offset: new Vector(-15, -12)
      },
      {
        start: new Vector(802, 331),
        size: new Vector(31, 19),
        offset: new Vector(-15, -12)
      },
      {
        start: new Vector(767, 309),
        size: new Vector(33, 18),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(767, 524),
        size: new Vector(33, 17),
        offset: new Vector(-16, -10)
      },
      {
        start: new Vector(767, 691),
        size: new Vector(32, 16),
        offset: new Vector(-15, -10)
      },
      {
        start: new Vector(802, 552),
        size: new Vector(31, 16),
        offset: new Vector(-15, -10)
      },
      {
        start: new Vector(833, 445),
        size: new Vector(29, 15),
        offset: new Vector(-14, -10)
      },
      {
        start: new Vector(802, 568),
        size: new Vector(31, 16),
        offset: new Vector(-15, -10)
      },
      {
        start: new Vector(767, 575),
        size: new Vector(32, 17),
        offset: new Vector(-15, -11)
      },
      {
        start: new Vector(767, 327),
        size: new Vector(33, 18),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(767, 345),
        size: new Vector(33, 18),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(802, 464),
        size: new Vector(31, 18),
        offset: new Vector(-15, -11)
      },
      {
        start: new Vector(802, 350),
        size: new Vector(31, 19),
        offset: new Vector(-15, -11)
      },
      {
        start: new Vector(833, 354),
        size: new Vector(29, 19),
        offset: new Vector(-14, -11)
      },
      {
        start: new Vector(833, 868),
        size: new Vector(27, 19),
        offset: new Vector(-13, -11)
      },
      {
        start: new Vector(863, 664),
        size: new Vector(24, 19),
        offset: new Vector(-12, -11)
      },
      {
        start: new Vector(890, 455),
        size: new Vector(21, 19),
        offset: new Vector(-10, -11)
      },
      {
        start: new Vector(913, 475),
        size: new Vector(18, 17),
        offset: new Vector(-9, -10)
      },
      {
        start: new Vector(934, 363),
        size: new Vector(14, 17),
        offset: new Vector(-7, -10)
      },
      {
        start: new Vector(913, 492),
        size: new Vector(18, 17),
        offset: new Vector(-9, -10)
      },
      {
        start: new Vector(890, 474),
        size: new Vector(21, 19),
        offset: new Vector(-11, -11)
      },
      {
        start: new Vector(863, 683),
        size: new Vector(24, 19),
        offset: new Vector(-12, -11)
      },
      {
        start: new Vector(833, 887),
        size: new Vector(27, 19),
        offset: new Vector(-14, -11)
      },
      {
        start: new Vector(833, 373),
        size: new Vector(29, 19),
        offset: new Vector(-15, -11)
      },
      {
        start: new Vector(802, 369),
        size: new Vector(31, 19),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(802, 482),
        size: new Vector(31, 18),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(767, 363),
        size: new Vector(33, 18),
        offset: new Vector(-17, -11)
      },
      {
        start: new Vector(767, 381),
        size: new Vector(33, 18),
        offset: new Vector(-17, -11)
      },
      {
        start: new Vector(767, 592),
        size: new Vector(32, 17),
        offset: new Vector(-17, -11)
      },
      {
        start: new Vector(802, 584),
        size: new Vector(31, 16),
        offset: new Vector(-16, -10)
      }
    ],
    tanksTurrets: [
      {
        start: new Vector(890, 868),
        size: new Vector(21, 9),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(890, 877),
        size: new Vector(21, 9),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(890, 886),
        size: new Vector(21, 9),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(890, 895),
        size: new Vector(21, 9),
        offset: new Vector(-8, -13)
      },
      {
        start: new Vector(890, 904),
        size: new Vector(21, 9),
        offset: new Vector(-8, -13)
      },
      {
        start: new Vector(913, 303),
        size: new Vector(19, 9),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(934, 10),
        size: new Vector(17, 10),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(934, 139),
        size: new Vector(16, 12),
        offset: new Vector(-7, -14)
      },
      {
        start: new Vector(934, 275),
        size: new Vector(15, 12),
        offset: new Vector(-7, -14)
      },
      {
        start: new Vector(934, 500),
        size: new Vector(12, 13),
        offset: new Vector(-6, -14)
      },
      {
        start: new Vector(934, 772),
        size: new Vector(11, 12),
        offset: new Vector(-6, -13)
      },
      {
        start: new Vector(934, 624),
        size: new Vector(12, 12),
        offset: new Vector(-6, -13)
      },
      {
        start: new Vector(934, 636),
        size: new Vector(12, 12),
        offset: new Vector(-6, -13)
      },
      {
        start: new Vector(934, 648),
        size: new Vector(12, 12),
        offset: new Vector(-6, -13)
      },
      {
        start: new Vector(934, 784),
        size: new Vector(11, 12),
        offset: new Vector(-5, -13)
      },
      {
        start: new Vector(934, 513),
        size: new Vector(12, 13),
        offset: new Vector(-6, -14)
      },
      {
        start: new Vector(934, 287),
        size: new Vector(15, 12),
        offset: new Vector(-8, -14)
      },
      {
        start: new Vector(934, 151),
        size: new Vector(16, 12),
        offset: new Vector(-9, -14)
      },
      {
        start: new Vector(934, 20),
        size: new Vector(17, 10),
        offset: new Vector(-10, -13)
      },
      {
        start: new Vector(913, 312),
        size: new Vector(19, 9),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(890, 913),
        size: new Vector(21, 9),
        offset: new Vector(-13, -13)
      },
      {
        start: new Vector(890, 922),
        size: new Vector(21, 9),
        offset: new Vector(-13, -13)
      },
      {
        start: new Vector(890, 931),
        size: new Vector(21, 9),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(890, 940),
        size: new Vector(21, 9),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(913, 0),
        size: new Vector(21, 9),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(913, 9),
        size: new Vector(21, 9),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(890, 720),
        size: new Vector(21, 10),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(890, 730),
        size: new Vector(21, 10),
        offset: new Vector(-13, -13)
      },
      {
        start: new Vector(913, 47),
        size: new Vector(20, 10),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(913, 265),
        size: new Vector(19, 10),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(913, 580),
        size: new Vector(18, 11),
        offset: new Vector(-11, -14)
      },
      {
        start: new Vector(934, 163),
        size: new Vector(16, 12),
        offset: new Vector(-9, -15)
      },
      {
        start: new Vector(934, 299),
        size: new Vector(15, 12),
        offset: new Vector(-8, -15)
      },
      {
        start: new Vector(934, 526),
        size: new Vector(12, 13),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 722),
        size: new Vector(11, 13),
        offset: new Vector(-5, -16)
      },
      {
        start: new Vector(934, 660),
        size: new Vector(12, 12),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 672),
        size: new Vector(12, 12),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 684),
        size: new Vector(12, 12),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 735),
        size: new Vector(11, 13),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 539),
        size: new Vector(12, 13),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 311),
        size: new Vector(15, 12),
        offset: new Vector(-7, -15)
      },
      {
        start: new Vector(934, 175),
        size: new Vector(16, 12),
        offset: new Vector(-7, -15)
      },
      {
        start: new Vector(913, 591),
        size: new Vector(18, 11),
        offset: new Vector(-7, -14)
      },
      {
        start: new Vector(913, 275),
        size: new Vector(19, 10),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(913, 57),
        size: new Vector(20, 10),
        offset: new Vector(-8, -13)
      },
      {
        start: new Vector(890, 740),
        size: new Vector(21, 10),
        offset: new Vector(-8, -13)
      },
      {
        start: new Vector(890, 750),
        size: new Vector(21, 10),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(913, 18),
        size: new Vector(21, 9),
        offset: new Vector(-7, -13)
      }
    ],
    enemyTanksBodies: [
      {
        start: new Vector(833, 460),
        size: new Vector(29, 15),
        offset: new Vector(-15, -10)
      },
      {
        start: new Vector(802, 600),
        size: new Vector(31, 16),
        offset: new Vector(-16, -10)
      },
      {
        start: new Vector(767, 707),
        size: new Vector(32, 16),
        offset: new Vector(-17, -10)
      },
      {
        start: new Vector(767, 541),
        size: new Vector(33, 17),
        offset: new Vector(-17, -10)
      },
      {
        start: new Vector(767, 399),
        size: new Vector(33, 18),
        offset: new Vector(-17, -11)
      },
      {
        start: new Vector(802, 388),
        size: new Vector(31, 19),
        offset: new Vector(-16, -12)
      },
      {
        start: new Vector(802, 272),
        size: new Vector(31, 20),
        offset: new Vector(-16, -12)
      },
      {
        start: new Vector(833, 314),
        size: new Vector(29, 20),
        offset: new Vector(-15, -12)
      },
      {
        start: new Vector(833, 826),
        size: new Vector(27, 21),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(863, 622),
        size: new Vector(24, 21),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(890, 413),
        size: new Vector(21, 21),
        offset: new Vector(-11, -13)
      },
      {
        start: new Vector(913, 361),
        size: new Vector(18, 20),
        offset: new Vector(-9, -13)
      },
      {
        start: new Vector(934, 343),
        size: new Vector(14, 20),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(913, 381),
        size: new Vector(18, 20),
        offset: new Vector(-9, -13)
      },
      {
        start: new Vector(890, 434),
        size: new Vector(21, 21),
        offset: new Vector(-10, -13)
      },
      {
        start: new Vector(863, 643),
        size: new Vector(24, 21),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(833, 847),
        size: new Vector(27, 21),
        offset: new Vector(-13, -13)
      },
      {
        start: new Vector(833, 334),
        size: new Vector(29, 20),
        offset: new Vector(-14, -12)
      },
      {
        start: new Vector(802, 292),
        size: new Vector(31, 20),
        offset: new Vector(-15, -12)
      },
      {
        start: new Vector(802, 407),
        size: new Vector(31, 19),
        offset: new Vector(-15, -12)
      },
      {
        start: new Vector(767, 417),
        size: new Vector(33, 18),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(767, 558),
        size: new Vector(33, 17),
        offset: new Vector(-16, -10)
      },
      {
        start: new Vector(767, 723),
        size: new Vector(32, 16),
        offset: new Vector(-15, -10)
      },
      {
        start: new Vector(802, 616),
        size: new Vector(31, 16),
        offset: new Vector(-15, -10)
      },
      {
        start: new Vector(833, 475),
        size: new Vector(29, 15),
        offset: new Vector(-14, -10)
      },
      {
        start: new Vector(802, 632),
        size: new Vector(31, 16),
        offset: new Vector(-15, -10)
      },
      {
        start: new Vector(767, 609),
        size: new Vector(32, 17),
        offset: new Vector(-15, -11)
      },
      {
        start: new Vector(767, 435),
        size: new Vector(33, 18),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(767, 453),
        size: new Vector(33, 18),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(802, 500),
        size: new Vector(31, 18),
        offset: new Vector(-15, -11)
      },
      {
        start: new Vector(802, 426),
        size: new Vector(31, 19),
        offset: new Vector(-15, -11)
      },
      {
        start: new Vector(833, 392),
        size: new Vector(29, 19),
        offset: new Vector(-14, -11)
      },
      {
        start: new Vector(833, 906),
        size: new Vector(27, 19),
        offset: new Vector(-13, -11)
      },
      {
        start: new Vector(863, 702),
        size: new Vector(24, 19),
        offset: new Vector(-12, -11)
      },
      {
        start: new Vector(890, 493),
        size: new Vector(21, 19),
        offset: new Vector(-10, -11)
      },
      {
        start: new Vector(913, 509),
        size: new Vector(18, 17),
        offset: new Vector(-9, -10)
      },
      {
        start: new Vector(934, 380),
        size: new Vector(14, 17),
        offset: new Vector(-7, -10)
      },
      {
        start: new Vector(913, 526),
        size: new Vector(18, 17),
        offset: new Vector(-9, -10)
      },
      {
        start: new Vector(890, 512),
        size: new Vector(21, 19),
        offset: new Vector(-11, -11)
      },
      {
        start: new Vector(863, 721),
        size: new Vector(24, 19),
        offset: new Vector(-12, -11)
      },
      {
        start: new Vector(833, 925),
        size: new Vector(27, 19),
        offset: new Vector(-14, -11)
      },
      {
        start: new Vector(833, 411),
        size: new Vector(29, 19),
        offset: new Vector(-15, -11)
      },
      {
        start: new Vector(802, 445),
        size: new Vector(31, 19),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(802, 518),
        size: new Vector(31, 18),
        offset: new Vector(-16, -11)
      },
      {
        start: new Vector(767, 471),
        size: new Vector(33, 18),
        offset: new Vector(-17, -11)
      },
      {
        start: new Vector(767, 489),
        size: new Vector(33, 18),
        offset: new Vector(-17, -11)
      },
      {
        start: new Vector(767, 626),
        size: new Vector(32, 17),
        offset: new Vector(-17, -11)
      },
      {
        start: new Vector(802, 648),
        size: new Vector(31, 16),
        offset: new Vector(-16, -10)
      }
    ],
    enemyTanksTurrets: [
      {
        start: new Vector(890, 760),
        size: new Vector(21, 9),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(890, 769),
        size: new Vector(21, 9),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(890, 778),
        size: new Vector(21, 9),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(890, 787),
        size: new Vector(21, 9),
        offset: new Vector(-8, -13)
      },
      {
        start: new Vector(890, 796),
        size: new Vector(21, 9),
        offset: new Vector(-8, -13)
      },
      {
        start: new Vector(913, 285),
        size: new Vector(19, 9),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(913, 940),
        size: new Vector(17, 10),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(934, 91),
        size: new Vector(16, 12),
        offset: new Vector(-7, -14)
      },
      {
        start: new Vector(934, 227),
        size: new Vector(15, 12),
        offset: new Vector(-7, -14)
      },
      {
        start: new Vector(934, 448),
        size: new Vector(12, 13),
        offset: new Vector(-6, -14)
      },
      {
        start: new Vector(934, 748),
        size: new Vector(11, 12),
        offset: new Vector(-6, -13)
      },
      {
        start: new Vector(934, 552),
        size: new Vector(12, 12),
        offset: new Vector(-6, -13)
      },
      {
        start: new Vector(934, 564),
        size: new Vector(12, 12),
        offset: new Vector(-6, -13)
      },
      {
        start: new Vector(934, 576),
        size: new Vector(12, 12),
        offset: new Vector(-6, -13)
      },
      {
        start: new Vector(934, 760),
        size: new Vector(11, 12),
        offset: new Vector(-5, -13)
      },
      {
        start: new Vector(934, 461),
        size: new Vector(12, 13),
        offset: new Vector(-6, -14)
      },
      {
        start: new Vector(934, 239),
        size: new Vector(15, 12),
        offset: new Vector(-8, -14)
      },
      {
        start: new Vector(934, 103),
        size: new Vector(16, 12),
        offset: new Vector(-9, -14)
      },
      {
        start: new Vector(934, 0),
        size: new Vector(17, 10),
        offset: new Vector(-10, -13)
      },
      {
        start: new Vector(913, 294),
        size: new Vector(19, 9),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(890, 805),
        size: new Vector(21, 9),
        offset: new Vector(-13, -13)
      },
      {
        start: new Vector(890, 814),
        size: new Vector(21, 9),
        offset: new Vector(-13, -13)
      },
      {
        start: new Vector(890, 823),
        size: new Vector(21, 9),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(890, 832),
        size: new Vector(21, 9),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(890, 841),
        size: new Vector(21, 9),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(890, 850),
        size: new Vector(21, 9),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(833, 944),
        size: new Vector(21, 10),
        offset: new Vector(-14, -13)
      },
      {
        start: new Vector(890, 690),
        size: new Vector(21, 10),
        offset: new Vector(-13, -13)
      },
      {
        start: new Vector(913, 27),
        size: new Vector(20, 10),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(913, 245),
        size: new Vector(19, 10),
        offset: new Vector(-12, -13)
      },
      {
        start: new Vector(913, 558),
        size: new Vector(18, 11),
        offset: new Vector(-11, -14)
      },
      {
        start: new Vector(934, 115),
        size: new Vector(16, 12),
        offset: new Vector(-9, -15)
      },
      {
        start: new Vector(934, 251),
        size: new Vector(15, 12),
        offset: new Vector(-8, -15)
      },
      {
        start: new Vector(934, 474),
        size: new Vector(12, 13),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 696),
        size: new Vector(11, 13),
        offset: new Vector(-5, -16)
      },
      {
        start: new Vector(934, 588),
        size: new Vector(12, 12),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 600),
        size: new Vector(12, 12),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 612),
        size: new Vector(12, 12),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 709),
        size: new Vector(11, 13),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 487),
        size: new Vector(12, 13),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(934, 263),
        size: new Vector(15, 12),
        offset: new Vector(-7, -15)
      },
      {
        start: new Vector(934, 127),
        size: new Vector(16, 12),
        offset: new Vector(-7, -15)
      },
      {
        start: new Vector(913, 569),
        size: new Vector(18, 11),
        offset: new Vector(-7, -14)
      },
      {
        start: new Vector(913, 255),
        size: new Vector(19, 10),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(913, 37),
        size: new Vector(20, 10),
        offset: new Vector(-8, -13)
      },
      {
        start: new Vector(890, 700),
        size: new Vector(21, 10),
        offset: new Vector(-8, -13)
      },
      {
        start: new Vector(890, 710),
        size: new Vector(21, 10),
        offset: new Vector(-7, -13)
      },
      {
        start: new Vector(890, 859),
        size: new Vector(21, 9),
        offset: new Vector(-7, -13)
      }
    ],
    explosion: [
      {
        start: new Vector(48, 951),
        size: new Vector(1, 1),
        offset: new Vector(0, 0)
      },
      {
        start: new Vector(934, 817),
        size: new Vector(10, 12),
        offset: new Vector(-9, 2)
      },
      {
        start: new Vector(913, 926),
        size: new Vector(17, 14),
        offset: new Vector(-12, 0)
      },
      {
        start: new Vector(863, 506),
        size: new Vector(25, 20),
        offset: new Vector(-16, -6)
      },
      {
        start: new Vector(833, 138),
        size: new Vector(30, 28),
        offset: new Vector(-18, -12)
      },
      {
        start: new Vector(727, 297),
        size: new Vector(37, 35),
        offset: new Vector(-21, -17)
      },
      {
        start: new Vector(681, 874),
        size: new Vector(41, 40),
        offset: new Vector(-23, -21)
      },
      {
        start: new Vector(633, 889),
        size: new Vector(46, 46),
        offset: new Vector(-25, -25)
      },
      {
        start: new Vector(578, 456),
        size: new Vector(50, 51),
        offset: new Vector(-27, -29)
      },
      {
        start: new Vector(578, 0),
        size: new Vector(55, 55),
        offset: new Vector(-29, -32)
      },
      {
        start: new Vector(518, 341),
        size: new Vector(58, 59),
        offset: new Vector(-30, -35)
      },
      {
        start: new Vector(518, 278),
        size: new Vector(59, 63),
        offset: new Vector(-30, -38)
      },
      {
        start: new Vector(453, 538),
        size: new Vector(62, 63),
        offset: new Vector(-31, -41)
      },
      {
        start: new Vector(453, 476),
        size: new Vector(63, 62),
        offset: new Vector(-31, -43)
      },
      {
        start: new Vector(453, 54),
        size: new Vector(64, 59),
        offset: new Vector(-31, -43)
      },
      {
        start: new Vector(453, 113),
        size: new Vector(64, 57),
        offset: new Vector(-31, -44)
      },
      {
        start: new Vector(376, 816),
        size: new Vector(65, 57),
        offset: new Vector(-32, -45)
      },
      {
        start: new Vector(376, 873),
        size: new Vector(65, 57),
        offset: new Vector(-32, -45)
      },
      {
        start: new Vector(376, 704),
        size: new Vector(66, 57),
        offset: new Vector(-33, -45)
      },
      {
        start: new Vector(376, 592),
        size: new Vector(67, 56),
        offset: new Vector(-34, -45)
      },
      {
        start: new Vector(376, 648),
        size: new Vector(67, 56),
        offset: new Vector(-34, -45)
      },
      {
        start: new Vector(376, 425),
        size: new Vector(68, 56),
        offset: new Vector(-35, -45)
      },
      {
        start: new Vector(376, 481),
        size: new Vector(68, 56),
        offset: new Vector(-35, -45)
      },
      {
        start: new Vector(376, 537),
        size: new Vector(68, 55),
        offset: new Vector(-35, -45)
      },
      {
        start: new Vector(376, 761),
        size: new Vector(66, 55),
        offset: new Vector(-34, -45)
      },
      {
        start: new Vector(453, 0),
        size: new Vector(65, 54),
        offset: new Vector(-33, -44)
      },
      {
        start: new Vector(453, 170),
        size: new Vector(64, 54),
        offset: new Vector(-32, -44)
      },
      {
        start: new Vector(453, 662),
        size: new Vector(62, 54),
        offset: new Vector(-31, -44)
      },
      {
        start: new Vector(453, 874),
        size: new Vector(61, 52),
        offset: new Vector(-30, -43)
      },
      {
        start: new Vector(518, 0),
        size: new Vector(60, 52),
        offset: new Vector(-29, -43)
      },
      {
        start: new Vector(518, 400),
        size: new Vector(58, 51),
        offset: new Vector(-28, -42)
      },
      {
        start: new Vector(518, 823),
        size: new Vector(57, 51),
        offset: new Vector(-27, -42)
      }
    ],
    smallExplosion: [
      {
        start: new Vector(269, 948),
        size: new Vector(5, 6),
        offset: new Vector(-4, -11)
      },
      {
        start: new Vector(261, 948),
        size: new Vector(8, 7),
        offset: new Vector(-5, -12)
      },
      {
        start: new Vector(934, 829),
        size: new Vector(9, 8),
        offset: new Vector(-5, -13)
      },
      {
        start: new Vector(934, 807),
        size: new Vector(11, 10),
        offset: new Vector(-6, -15)
      },
      {
        start: new Vector(934, 426),
        size: new Vector(13, 11),
        offset: new Vector(-7, -16)
      },
      {
        start: new Vector(934, 201),
        size: new Vector(15, 13),
        offset: new Vector(-8, -17)
      },
      {
        start: new Vector(934, 46),
        size: new Vector(16, 15),
        offset: new Vector(-8, -18)
      },
      {
        start: new Vector(934, 30),
        size: new Vector(16, 16),
        offset: new Vector(-8, -19)
      },
      {
        start: new Vector(934, 61),
        size: new Vector(16, 15),
        offset: new Vector(-8, -18)
      },
      {
        start: new Vector(913, 896),
        size: new Vector(17, 15),
        offset: new Vector(-8, -18)
      },
      {
        start: new Vector(913, 911),
        size: new Vector(17, 15),
        offset: new Vector(-8, -18)
      },
      {
        start: new Vector(934, 76),
        size: new Vector(16, 15),
        offset: new Vector(-8, -18)
      },
      {
        start: new Vector(934, 214),
        size: new Vector(15, 13),
        offset: new Vector(-7, -17)
      },
      {
        start: new Vector(181, 940),
        size: new Vector(14, 13),
        offset: new Vector(-7, -17)
      },
      {
        start: new Vector(934, 437),
        size: new Vector(13, 11),
        offset: new Vector(-6, -16)
      },
      {
        start: new Vector(80, 945),
        size: new Vector(12, 10),
        offset: new Vector(-6, -15)
      }
    ],
    sites: {
      light: [
        {
          start: new Vector(518, 874),
          size: new Vector(56, 34),
          offset: new Vector(-29, -20)
        },
        {
          start: new Vector(578, 190),
          size: new Vector(54, 25),
          offset: new Vector(-27, -16)
        },
        {
          start: new Vector(453, 716),
          size: new Vector(62, 50),
          offset: new Vector(-30, -43)
        },
        {
          start: new Vector(578, 507),
          size: new Vector(50, 33),
          offset: new Vector(-25, -20)
        },
        {
          start: new Vector(518, 451),
          size: new Vector(58, 49),
          offset: new Vector(-29, -38)
        },
        {
          start: new Vector(518, 549),
          size: new Vector(58, 46),
          offset: new Vector(-31, -43)
        },
        {
          start: new Vector(518, 52),
          size: new Vector(60, 33),
          offset: new Vector(-31, -19)
        },
        {
          start: new Vector(578, 55),
          size: new Vector(55, 42),
          offset: new Vector(-32, -26)
        },
        {
          start: new Vector(518, 641),
          size: new Vector(58, 45),
          offset: new Vector(-31, -32)
        }
      ],
      dark: [
        {
          start: new Vector(518, 908),
          size: new Vector(56, 34),
          offset: new Vector(-29, -20)
        },
        {
          start: new Vector(578, 215),
          size: new Vector(54, 25),
          offset: new Vector(-27, -16)
        },
        {
          start: new Vector(453, 766),
          size: new Vector(62, 50),
          offset: new Vector(-30, -43)
        },
        {
          start: new Vector(578, 540),
          size: new Vector(50, 33),
          offset: new Vector(-25, -20)
        },
        {
          start: new Vector(518, 500),
          size: new Vector(58, 49),
          offset: new Vector(-29, -38)
        },
        {
          start: new Vector(518, 595),
          size: new Vector(58, 46),
          offset: new Vector(-31, -43)
        },
        {
          start: new Vector(518, 85),
          size: new Vector(60, 33),
          offset: new Vector(-31, -19)
        },
        {
          start: new Vector(578, 97),
          size: new Vector(55, 42),
          offset: new Vector(-32, -26)
        },
        {
          start: new Vector(518, 686),
          size: new Vector(58, 45),
          offset: new Vector(-31, -32)
        }
      ]
    }
  };
  var SPRITES_96 = {
    hexSize: new Vector(96, 56),
    hexes: {
      light: [
        {
          start: new Vector(0, 836),
          size: new Vector(96, 64),
          offset: new Vector(-48, -28)
        },
        {
          start: new Vector(101, 64),
          size: new Vector(96, 64),
          offset: new Vector(-48, -28)
        },
        {
          start: new Vector(101, 192),
          size: new Vector(96, 64),
          offset: new Vector(-48, -28)
        }
      ],
      dark: [
        {
          start: new Vector(101, 0),
          size: new Vector(96, 64),
          offset: new Vector(-48, -28)
        },
        {
          start: new Vector(101, 128),
          size: new Vector(96, 64),
          offset: new Vector(-48, -28)
        },
        {
          start: new Vector(101, 256),
          size: new Vector(96, 64),
          offset: new Vector(-48, -28)
        }
      ]
    },
    overlays: {
      paths: [
        {
          "01": {
            start: new Vector(578, 573),
            size: new Vector(50, 28),
            offset: new Vector(-2, -5)
          },
          "02": {
            start: new Vector(376, 28),
            size: new Vector(77, 28),
            offset: new Vector(-29, -5)
          },
          "04": {
            start: new Vector(376, 112),
            size: new Vector(77, 28),
            offset: new Vector(-29, -23)
          },
          "05": {
            start: new Vector(578, 657),
            size: new Vector(50, 28),
            offset: new Vector(-2, -23)
          },
          "12": {
            start: new Vector(518, 754),
            size: new Vector(58, 23),
            offset: new Vector(-29, 0)
          },
          "13": {
            start: new Vector(376, 196),
            size: new Vector(77, 28),
            offset: new Vector(-48, -5)
          },
          "15": {
            start: new Vector(802, 810),
            size: new Vector(30, 46),
            offset: new Vector(-1, -23)
          },
          "23": {
            start: new Vector(578, 741),
            size: new Vector(50, 28),
            offset: new Vector(-48, -5)
          },
          "24": {
            start: new Vector(833, 0),
            size: new Vector(30, 46),
            offset: new Vector(-29, -23)
          },
          "34": {
            start: new Vector(578, 825),
            size: new Vector(50, 28),
            offset: new Vector(-48, -23)
          },
          "35": {
            start: new Vector(289, 895),
            size: new Vector(77, 28),
            offset: new Vector(-48, -23)
          },
          "45": {
            start: new Vector(376, 930),
            size: new Vector(58, 23),
            offset: new Vector(-29, -23)
          },
          "0": {
            start: new Vector(0, 945),
            size: new Vector(48, 10),
            offset: new Vector(0, -5)
          },
          "1": {
            start: new Vector(727, 730),
            size: new Vector(35, 25),
            offset: new Vector(-6, -2)
          },
          "2": {
            start: new Vector(727, 805),
            size: new Vector(35, 25),
            offset: new Vector(-29, -2)
          },
          "3": {
            start: new Vector(578, 938),
            size: new Vector(48, 10),
            offset: new Vector(-48, -5)
          },
          "4": {
            start: new Vector(727, 880),
            size: new Vector(35, 25),
            offset: new Vector(-29, -23)
          },
          "5": {
            start: new Vector(767, 0),
            size: new Vector(35, 25),
            offset: new Vector(-6, -23)
          },
          arrowR: {
            start: new Vector(727, 480),
            size: new Vector(36, 22),
            offset: new Vector(-12, -11)
          },
          arrowL: {
            start: new Vector(727, 546),
            size: new Vector(36, 22),
            offset: new Vector(-24, -11)
          }
        },
        {
          "01": {
            start: new Vector(578, 601),
            size: new Vector(50, 28),
            offset: new Vector(-2, -5)
          },
          "02": {
            start: new Vector(376, 56),
            size: new Vector(77, 28),
            offset: new Vector(-29, -5)
          },
          "04": {
            start: new Vector(376, 140),
            size: new Vector(77, 28),
            offset: new Vector(-29, -23)
          },
          "05": {
            start: new Vector(578, 685),
            size: new Vector(50, 28),
            offset: new Vector(-2, -23)
          },
          "12": {
            start: new Vector(518, 777),
            size: new Vector(58, 23),
            offset: new Vector(-29, 0)
          },
          "13": {
            start: new Vector(376, 224),
            size: new Vector(77, 28),
            offset: new Vector(-48, -5)
          },
          "15": {
            start: new Vector(802, 856),
            size: new Vector(30, 46),
            offset: new Vector(-1, -23)
          },
          "23": {
            start: new Vector(578, 769),
            size: new Vector(50, 28),
            offset: new Vector(-48, -5)
          },
          "24": {
            start: new Vector(833, 46),
            size: new Vector(30, 46),
            offset: new Vector(-29, -23)
          },
          "34": {
            start: new Vector(578, 853),
            size: new Vector(50, 28),
            offset: new Vector(-48, -23)
          },
          "35": {
            start: new Vector(289, 923),
            size: new Vector(77, 28),
            offset: new Vector(-48, -23)
          },
          "45": {
            start: new Vector(453, 926),
            size: new Vector(58, 23),
            offset: new Vector(-29, -23)
          },
          "0": {
            start: new Vector(101, 940),
            size: new Vector(48, 10),
            offset: new Vector(0, -5)
          },
          "1": {
            start: new Vector(727, 755),
            size: new Vector(35, 25),
            offset: new Vector(-6, -2)
          },
          "2": {
            start: new Vector(727, 830),
            size: new Vector(35, 25),
            offset: new Vector(-29, -2)
          },
          "3": {
            start: new Vector(633, 869),
            size: new Vector(48, 10),
            offset: new Vector(-48, -5)
          },
          "4": {
            start: new Vector(727, 905),
            size: new Vector(35, 25),
            offset: new Vector(-29, -23)
          },
          "5": {
            start: new Vector(767, 25),
            size: new Vector(35, 25),
            offset: new Vector(-6, -23)
          },
          arrowR: {
            start: new Vector(727, 502),
            size: new Vector(36, 22),
            offset: new Vector(-12, -11)
          },
          arrowL: {
            start: new Vector(727, 568),
            size: new Vector(36, 22),
            offset: new Vector(-24, -11)
          }
        },
        {
          "01": {
            start: new Vector(578, 629),
            size: new Vector(50, 28),
            offset: new Vector(-2, -5)
          },
          "02": {
            start: new Vector(376, 84),
            size: new Vector(77, 28),
            offset: new Vector(-29, -5)
          },
          "04": {
            start: new Vector(376, 168),
            size: new Vector(77, 28),
            offset: new Vector(-29, -23)
          },
          "05": {
            start: new Vector(578, 713),
            size: new Vector(50, 28),
            offset: new Vector(-2, -23)
          },
          "12": {
            start: new Vector(518, 800),
            size: new Vector(58, 23),
            offset: new Vector(-29, 0)
          },
          "13": {
            start: new Vector(376, 252),
            size: new Vector(77, 28),
            offset: new Vector(-48, -5)
          },
          "15": {
            start: new Vector(802, 902),
            size: new Vector(30, 46),
            offset: new Vector(-1, -23)
          },
          "23": {
            start: new Vector(578, 797),
            size: new Vector(50, 28),
            offset: new Vector(-48, -5)
          },
          "24": {
            start: new Vector(833, 92),
            size: new Vector(30, 46),
            offset: new Vector(-29, -23)
          },
          "34": {
            start: new Vector(578, 881),
            size: new Vector(50, 28),
            offset: new Vector(-48, -23)
          },
          "35": {
            start: new Vector(376, 0),
            size: new Vector(77, 28),
            offset: new Vector(-48, -23)
          },
          "45": {
            start: new Vector(518, 731),
            size: new Vector(58, 23),
            offset: new Vector(-29, -23)
          },
          "0": {
            start: new Vector(518, 942),
            size: new Vector(48, 10),
            offset: new Vector(0, -5)
          },
          "1": {
            start: new Vector(727, 780),
            size: new Vector(35, 25),
            offset: new Vector(-6, -2)
          },
          "2": {
            start: new Vector(727, 855),
            size: new Vector(35, 25),
            offset: new Vector(-29, -2)
          },
          "3": {
            start: new Vector(633, 879),
            size: new Vector(48, 10),
            offset: new Vector(-48, -5)
          },
          "4": {
            start: new Vector(727, 930),
            size: new Vector(35, 25),
            offset: new Vector(-29, -23)
          },
          "5": {
            start: new Vector(767, 50),
            size: new Vector(35, 25),
            offset: new Vector(-6, -23)
          },
          arrowR: {
            start: new Vector(727, 524),
            size: new Vector(36, 22),
            offset: new Vector(-12, -11)
          },
          arrowL: {
            start: new Vector(727, 590),
            size: new Vector(36, 22),
            offset: new Vector(-24, -11)
          }
        }
      ],
      highlights: [
        {
          start: new Vector(197, 94),
          size: new Vector(92, 50),
          offset: new Vector(-46, -25)
        },
        {
          start: new Vector(197, 144),
          size: new Vector(92, 50),
          offset: new Vector(-46, -25)
        },
        {
          start: new Vector(197, 194),
          size: new Vector(92, 50),
          offset: new Vector(-46, -25)
        }
      ],
      aim: [
        {
          start: new Vector(633, 825),
          size: new Vector(48, 22),
          offset: new Vector(0, -11)
        },
        {
          start: new Vector(727, 205),
          size: new Vector(39, 23),
          offset: new Vector(-6, -2)
        },
        {
          start: new Vector(727, 228),
          size: new Vector(39, 23),
          offset: new Vector(-33, -2)
        },
        {
          start: new Vector(633, 847),
          size: new Vector(48, 22),
          offset: new Vector(-48, -11)
        },
        {
          start: new Vector(727, 251),
          size: new Vector(39, 23),
          offset: new Vector(-33, -21)
        },
        {
          start: new Vector(727, 274),
          size: new Vector(39, 23),
          offset: new Vector(-6, -21)
        }
      ],
      markers: {
        light: [
          {
            start: new Vector(0, 900),
            size: new Vector(94, 45),
            offset: new Vector(-46, -21)
          },
          {
            start: new Vector(197, 244),
            size: new Vector(92, 50),
            offset: new Vector(-46, -25)
          }
        ],
        dark: [
          {
            start: new Vector(101, 895),
            size: new Vector(94, 45),
            offset: new Vector(-46, -21)
          },
          {
            start: new Vector(197, 294),
            size: new Vector(92, 50),
            offset: new Vector(-46, -25)
          }
        ]
      }
    },
    tanksBodies: [
      {
        start: new Vector(681, 466),
        size: new Vector(44, 23),
        offset: new Vector(-23, -15)
      },
      {
        start: new Vector(681, 282),
        size: new Vector(46, 24),
        offset: new Vector(-24, -15)
      },
      {
        start: new Vector(633, 729),
        size: new Vector(48, 24),
        offset: new Vector(-25, -15)
      },
      {
        start: new Vector(633, 421),
        size: new Vector(48, 26),
        offset: new Vector(-25, -16)
      },
      {
        start: new Vector(633, 29),
        size: new Vector(48, 28),
        offset: new Vector(-25, -17)
      },
      {
        start: new Vector(633, 57),
        size: new Vector(48, 28),
        offset: new Vector(-25, -17)
      },
      {
        start: new Vector(681, 0),
        size: new Vector(46, 30),
        offset: new Vector(-24, -18)
      },
      {
        start: new Vector(681, 558),
        size: new Vector(43, 31),
        offset: new Vector(-22, -19)
      },
      {
        start: new Vector(681, 914),
        size: new Vector(40, 31),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(727, 332),
        size: new Vector(37, 31),
        offset: new Vector(-19, -19)
      },
      {
        start: new Vector(802, 0),
        size: new Vector(31, 30),
        offset: new Vector(-16, -19)
      },
      {
        start: new Vector(833, 672),
        size: new Vector(27, 30),
        offset: new Vector(-14, -19)
      },
      {
        start: new Vector(890, 243),
        size: new Vector(22, 29),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(863, 124),
        size: new Vector(26, 30),
        offset: new Vector(-13, -19)
      },
      {
        start: new Vector(802, 30),
        size: new Vector(31, 30),
        offset: new Vector(-15, -19)
      },
      {
        start: new Vector(727, 612),
        size: new Vector(35, 31),
        offset: new Vector(-17, -19)
      },
      {
        start: new Vector(727, 0),
        size: new Vector(40, 31),
        offset: new Vector(-19, -19)
      },
      {
        start: new Vector(681, 589),
        size: new Vector(43, 31),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(681, 30),
        size: new Vector(46, 30),
        offset: new Vector(-22, -18)
      },
      {
        start: new Vector(578, 909),
        size: new Vector(48, 29),
        offset: new Vector(-23, -18)
      },
      {
        start: new Vector(633, 85),
        size: new Vector(48, 28),
        offset: new Vector(-23, -17)
      },
      {
        start: new Vector(633, 447),
        size: new Vector(48, 26),
        offset: new Vector(-23, -16)
      },
      {
        start: new Vector(633, 753),
        size: new Vector(48, 24),
        offset: new Vector(-23, -15)
      },
      {
        start: new Vector(681, 306),
        size: new Vector(46, 24),
        offset: new Vector(-22, -15)
      },
      {
        start: new Vector(681, 489),
        size: new Vector(44, 23),
        offset: new Vector(-21, -15)
      },
      {
        start: new Vector(681, 330),
        size: new Vector(46, 24),
        offset: new Vector(-22, -16)
      },
      {
        start: new Vector(633, 629),
        size: new Vector(48, 25),
        offset: new Vector(-23, -16)
      },
      {
        start: new Vector(633, 473),
        size: new Vector(48, 26),
        offset: new Vector(-23, -16)
      },
      {
        start: new Vector(633, 113),
        size: new Vector(48, 28),
        offset: new Vector(-23, -17)
      },
      {
        start: new Vector(633, 141),
        size: new Vector(48, 28),
        offset: new Vector(-23, -17)
      },
      {
        start: new Vector(681, 120),
        size: new Vector(46, 28),
        offset: new Vector(-22, -17)
      },
      {
        start: new Vector(681, 682),
        size: new Vector(43, 28),
        offset: new Vector(-21, -17)
      },
      {
        start: new Vector(727, 93),
        size: new Vector(40, 28),
        offset: new Vector(-19, -16)
      },
      {
        start: new Vector(727, 394),
        size: new Vector(37, 28),
        offset: new Vector(-18, -16)
      },
      {
        start: new Vector(802, 120),
        size: new Vector(31, 28),
        offset: new Vector(-15, -16)
      },
      {
        start: new Vector(833, 732),
        size: new Vector(27, 26),
        offset: new Vector(-13, -15)
      },
      {
        start: new Vector(890, 301),
        size: new Vector(22, 26),
        offset: new Vector(-11, -15)
      },
      {
        start: new Vector(863, 184),
        size: new Vector(26, 26),
        offset: new Vector(-13, -15)
      },
      {
        start: new Vector(802, 148),
        size: new Vector(31, 28),
        offset: new Vector(-16, -16)
      },
      {
        start: new Vector(727, 674),
        size: new Vector(35, 28),
        offset: new Vector(-18, -16)
      },
      {
        start: new Vector(727, 121),
        size: new Vector(40, 28),
        offset: new Vector(-21, -16)
      },
      {
        start: new Vector(681, 710),
        size: new Vector(43, 28),
        offset: new Vector(-22, -17)
      },
      {
        start: new Vector(681, 148),
        size: new Vector(46, 28),
        offset: new Vector(-24, -17)
      },
      {
        start: new Vector(633, 169),
        size: new Vector(48, 28),
        offset: new Vector(-25, -17)
      },
      {
        start: new Vector(633, 197),
        size: new Vector(48, 28),
        offset: new Vector(-25, -17)
      },
      {
        start: new Vector(633, 499),
        size: new Vector(48, 26),
        offset: new Vector(-25, -16)
      },
      {
        start: new Vector(633, 654),
        size: new Vector(48, 25),
        offset: new Vector(-25, -16)
      },
      {
        start: new Vector(681, 232),
        size: new Vector(46, 25),
        offset: new Vector(-24, -16)
      }
    ],
    tanksTurrets: [
      {
        start: new Vector(802, 758),
        size: new Vector(31, 13),
        offset: new Vector(-10, -19)
      },
      {
        start: new Vector(767, 889),
        size: new Vector(32, 13),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(767, 902),
        size: new Vector(32, 13),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(802, 771),
        size: new Vector(31, 13),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(833, 248),
        size: new Vector(30, 13),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(833, 534),
        size: new Vector(29, 14),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(863, 94),
        size: new Vector(27, 15),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(863, 542),
        size: new Vector(25, 16),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(890, 656),
        size: new Vector(21, 17),
        offset: new Vector(-10, -20)
      },
      {
        start: new Vector(913, 139),
        size: new Vector(19, 18),
        offset: new Vector(-10, -20)
      },
      {
        start: new Vector(913, 806),
        size: new Vector(17, 18),
        offset: new Vector(-9, -20)
      },
      {
        start: new Vector(913, 824),
        size: new Vector(17, 18),
        offset: new Vector(-9, -20)
      },
      {
        start: new Vector(913, 420),
        size: new Vector(18, 19),
        offset: new Vector(-9, -20)
      },
      {
        start: new Vector(913, 659),
        size: new Vector(17, 19),
        offset: new Vector(-8, -20)
      },
      {
        start: new Vector(913, 842),
        size: new Vector(17, 18),
        offset: new Vector(-8, -20)
      },
      {
        start: new Vector(913, 157),
        size: new Vector(19, 18),
        offset: new Vector(-9, -20)
      },
      {
        start: new Vector(890, 673),
        size: new Vector(21, 17),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(863, 791),
        size: new Vector(24, 17),
        offset: new Vector(-14, -20)
      },
      {
        start: new Vector(863, 109),
        size: new Vector(27, 15),
        offset: new Vector(-16, -20)
      },
      {
        start: new Vector(833, 642),
        size: new Vector(28, 15),
        offset: new Vector(-17, -20)
      },
      {
        start: new Vector(833, 261),
        size: new Vector(30, 13),
        offset: new Vector(-19, -19)
      },
      {
        start: new Vector(802, 784),
        size: new Vector(31, 13),
        offset: new Vector(-20, -19)
      },
      {
        start: new Vector(767, 915),
        size: new Vector(32, 13),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(767, 928),
        size: new Vector(32, 13),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(802, 797),
        size: new Vector(31, 13),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(767, 781),
        size: new Vector(32, 14),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(767, 795),
        size: new Vector(32, 14),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(802, 678),
        size: new Vector(31, 14),
        offset: new Vector(-20, -19)
      },
      {
        start: new Vector(833, 194),
        size: new Vector(30, 14),
        offset: new Vector(-19, -19)
      },
      {
        start: new Vector(833, 505),
        size: new Vector(29, 15),
        offset: new Vector(-18, -20)
      },
      {
        start: new Vector(863, 32),
        size: new Vector(27, 16),
        offset: new Vector(-16, -21)
      },
      {
        start: new Vector(863, 808),
        size: new Vector(24, 17),
        offset: new Vector(-14, -22)
      },
      {
        start: new Vector(890, 586),
        size: new Vector(21, 18),
        offset: new Vector(-11, -23)
      },
      {
        start: new Vector(913, 175),
        size: new Vector(19, 18),
        offset: new Vector(-9, -23)
      },
      {
        start: new Vector(913, 678),
        size: new Vector(17, 19),
        offset: new Vector(-8, -24)
      },
      {
        start: new Vector(913, 860),
        size: new Vector(17, 18),
        offset: new Vector(-8, -24)
      },
      {
        start: new Vector(913, 457),
        size: new Vector(18, 18),
        offset: new Vector(-9, -24)
      },
      {
        start: new Vector(913, 878),
        size: new Vector(17, 18),
        offset: new Vector(-9, -24)
      },
      {
        start: new Vector(913, 697),
        size: new Vector(17, 19),
        offset: new Vector(-9, -24)
      },
      {
        start: new Vector(913, 193),
        size: new Vector(19, 18),
        offset: new Vector(-10, -23)
      },
      {
        start: new Vector(890, 604),
        size: new Vector(21, 18),
        offset: new Vector(-10, -23)
      },
      {
        start: new Vector(863, 825),
        size: new Vector(24, 17),
        offset: new Vector(-10, -22)
      },
      {
        start: new Vector(863, 48),
        size: new Vector(27, 16),
        offset: new Vector(-11, -21)
      },
      {
        start: new Vector(833, 657),
        size: new Vector(28, 15),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(833, 208),
        size: new Vector(30, 14),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(802, 692),
        size: new Vector(31, 14),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(767, 809),
        size: new Vector(32, 14),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(767, 823),
        size: new Vector(32, 14),
        offset: new Vector(-11, -19)
      }
    ],
    enemyTanksBodies: [
      {
        start: new Vector(681, 512),
        size: new Vector(44, 23),
        offset: new Vector(-23, -15)
      },
      {
        start: new Vector(681, 354),
        size: new Vector(46, 24),
        offset: new Vector(-24, -15)
      },
      {
        start: new Vector(633, 777),
        size: new Vector(48, 24),
        offset: new Vector(-25, -15)
      },
      {
        start: new Vector(633, 525),
        size: new Vector(48, 26),
        offset: new Vector(-25, -16)
      },
      {
        start: new Vector(633, 225),
        size: new Vector(48, 28),
        offset: new Vector(-25, -17)
      },
      {
        start: new Vector(633, 253),
        size: new Vector(48, 28),
        offset: new Vector(-25, -17)
      },
      {
        start: new Vector(681, 60),
        size: new Vector(46, 30),
        offset: new Vector(-24, -18)
      },
      {
        start: new Vector(681, 620),
        size: new Vector(43, 31),
        offset: new Vector(-22, -19)
      },
      {
        start: new Vector(727, 31),
        size: new Vector(40, 31),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(727, 363),
        size: new Vector(37, 31),
        offset: new Vector(-19, -19)
      },
      {
        start: new Vector(802, 60),
        size: new Vector(31, 30),
        offset: new Vector(-16, -19)
      },
      {
        start: new Vector(833, 702),
        size: new Vector(27, 30),
        offset: new Vector(-14, -19)
      },
      {
        start: new Vector(890, 272),
        size: new Vector(22, 29),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(863, 154),
        size: new Vector(26, 30),
        offset: new Vector(-13, -19)
      },
      {
        start: new Vector(802, 90),
        size: new Vector(31, 30),
        offset: new Vector(-15, -19)
      },
      {
        start: new Vector(727, 643),
        size: new Vector(35, 31),
        offset: new Vector(-17, -19)
      },
      {
        start: new Vector(727, 62),
        size: new Vector(40, 31),
        offset: new Vector(-19, -19)
      },
      {
        start: new Vector(681, 651),
        size: new Vector(43, 31),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(681, 90),
        size: new Vector(46, 30),
        offset: new Vector(-22, -18)
      },
      {
        start: new Vector(633, 0),
        size: new Vector(48, 29),
        offset: new Vector(-23, -18)
      },
      {
        start: new Vector(633, 281),
        size: new Vector(48, 28),
        offset: new Vector(-23, -17)
      },
      {
        start: new Vector(633, 551),
        size: new Vector(48, 26),
        offset: new Vector(-23, -16)
      },
      {
        start: new Vector(633, 801),
        size: new Vector(48, 24),
        offset: new Vector(-23, -15)
      },
      {
        start: new Vector(681, 378),
        size: new Vector(46, 24),
        offset: new Vector(-22, -15)
      },
      {
        start: new Vector(681, 535),
        size: new Vector(44, 23),
        offset: new Vector(-21, -15)
      },
      {
        start: new Vector(681, 402),
        size: new Vector(46, 24),
        offset: new Vector(-22, -16)
      },
      {
        start: new Vector(633, 679),
        size: new Vector(48, 25),
        offset: new Vector(-23, -16)
      },
      {
        start: new Vector(633, 577),
        size: new Vector(48, 26),
        offset: new Vector(-23, -16)
      },
      {
        start: new Vector(633, 309),
        size: new Vector(48, 28),
        offset: new Vector(-23, -17)
      },
      {
        start: new Vector(633, 337),
        size: new Vector(48, 28),
        offset: new Vector(-23, -17)
      },
      {
        start: new Vector(681, 176),
        size: new Vector(46, 28),
        offset: new Vector(-22, -17)
      },
      {
        start: new Vector(681, 738),
        size: new Vector(43, 28),
        offset: new Vector(-21, -17)
      },
      {
        start: new Vector(727, 149),
        size: new Vector(40, 28),
        offset: new Vector(-19, -16)
      },
      {
        start: new Vector(727, 422),
        size: new Vector(37, 28),
        offset: new Vector(-18, -16)
      },
      {
        start: new Vector(802, 176),
        size: new Vector(31, 28),
        offset: new Vector(-15, -16)
      },
      {
        start: new Vector(833, 758),
        size: new Vector(27, 26),
        offset: new Vector(-13, -15)
      },
      {
        start: new Vector(890, 327),
        size: new Vector(22, 26),
        offset: new Vector(-11, -15)
      },
      {
        start: new Vector(863, 210),
        size: new Vector(26, 26),
        offset: new Vector(-13, -15)
      },
      {
        start: new Vector(802, 204),
        size: new Vector(31, 28),
        offset: new Vector(-16, -16)
      },
      {
        start: new Vector(727, 702),
        size: new Vector(35, 28),
        offset: new Vector(-18, -16)
      },
      {
        start: new Vector(727, 177),
        size: new Vector(40, 28),
        offset: new Vector(-21, -16)
      },
      {
        start: new Vector(681, 766),
        size: new Vector(43, 28),
        offset: new Vector(-22, -17)
      },
      {
        start: new Vector(681, 204),
        size: new Vector(46, 28),
        offset: new Vector(-24, -17)
      },
      {
        start: new Vector(633, 365),
        size: new Vector(48, 28),
        offset: new Vector(-25, -17)
      },
      {
        start: new Vector(633, 393),
        size: new Vector(48, 28),
        offset: new Vector(-25, -17)
      },
      {
        start: new Vector(633, 603),
        size: new Vector(48, 26),
        offset: new Vector(-25, -16)
      },
      {
        start: new Vector(633, 704),
        size: new Vector(48, 25),
        offset: new Vector(-25, -16)
      },
      {
        start: new Vector(681, 257),
        size: new Vector(46, 25),
        offset: new Vector(-24, -16)
      }
    ],
    enemyTanksTurrets: [
      {
        start: new Vector(802, 706),
        size: new Vector(31, 13),
        offset: new Vector(-10, -19)
      },
      {
        start: new Vector(767, 837),
        size: new Vector(32, 13),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(767, 850),
        size: new Vector(32, 13),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(802, 719),
        size: new Vector(31, 13),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(833, 222),
        size: new Vector(30, 13),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(833, 520),
        size: new Vector(29, 14),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(863, 64),
        size: new Vector(27, 15),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(863, 526),
        size: new Vector(25, 16),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(890, 622),
        size: new Vector(21, 17),
        offset: new Vector(-10, -20)
      },
      {
        start: new Vector(913, 67),
        size: new Vector(19, 18),
        offset: new Vector(-10, -20)
      },
      {
        start: new Vector(913, 716),
        size: new Vector(17, 18),
        offset: new Vector(-9, -20)
      },
      {
        start: new Vector(913, 734),
        size: new Vector(17, 18),
        offset: new Vector(-9, -20)
      },
      {
        start: new Vector(913, 401),
        size: new Vector(18, 19),
        offset: new Vector(-9, -20)
      },
      {
        start: new Vector(913, 602),
        size: new Vector(17, 19),
        offset: new Vector(-8, -20)
      },
      {
        start: new Vector(913, 752),
        size: new Vector(17, 18),
        offset: new Vector(-8, -20)
      },
      {
        start: new Vector(913, 85),
        size: new Vector(19, 18),
        offset: new Vector(-9, -20)
      },
      {
        start: new Vector(890, 639),
        size: new Vector(21, 17),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(863, 740),
        size: new Vector(24, 17),
        offset: new Vector(-14, -20)
      },
      {
        start: new Vector(863, 79),
        size: new Vector(27, 15),
        offset: new Vector(-16, -20)
      },
      {
        start: new Vector(833, 612),
        size: new Vector(28, 15),
        offset: new Vector(-17, -20)
      },
      {
        start: new Vector(833, 235),
        size: new Vector(30, 13),
        offset: new Vector(-19, -19)
      },
      {
        start: new Vector(802, 732),
        size: new Vector(31, 13),
        offset: new Vector(-20, -19)
      },
      {
        start: new Vector(767, 863),
        size: new Vector(32, 13),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(767, 876),
        size: new Vector(32, 13),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(802, 745),
        size: new Vector(31, 13),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(149, 940),
        size: new Vector(32, 14),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(767, 739),
        size: new Vector(32, 14),
        offset: new Vector(-21, -19)
      },
      {
        start: new Vector(767, 941),
        size: new Vector(31, 14),
        offset: new Vector(-20, -19)
      },
      {
        start: new Vector(833, 166),
        size: new Vector(30, 14),
        offset: new Vector(-19, -19)
      },
      {
        start: new Vector(833, 490),
        size: new Vector(29, 15),
        offset: new Vector(-18, -20)
      },
      {
        start: new Vector(863, 0),
        size: new Vector(27, 16),
        offset: new Vector(-16, -21)
      },
      {
        start: new Vector(863, 757),
        size: new Vector(24, 17),
        offset: new Vector(-14, -22)
      },
      {
        start: new Vector(890, 550),
        size: new Vector(21, 18),
        offset: new Vector(-11, -23)
      },
      {
        start: new Vector(913, 103),
        size: new Vector(19, 18),
        offset: new Vector(-9, -23)
      },
      {
        start: new Vector(913, 621),
        size: new Vector(17, 19),
        offset: new Vector(-8, -24)
      },
      {
        start: new Vector(913, 770),
        size: new Vector(17, 18),
        offset: new Vector(-8, -24)
      },
      {
        start: new Vector(913, 439),
        size: new Vector(18, 18),
        offset: new Vector(-9, -24)
      },
      {
        start: new Vector(913, 788),
        size: new Vector(17, 18),
        offset: new Vector(-9, -24)
      },
      {
        start: new Vector(913, 640),
        size: new Vector(17, 19),
        offset: new Vector(-9, -24)
      },
      {
        start: new Vector(913, 121),
        size: new Vector(19, 18),
        offset: new Vector(-10, -23)
      },
      {
        start: new Vector(890, 568),
        size: new Vector(21, 18),
        offset: new Vector(-10, -23)
      },
      {
        start: new Vector(863, 774),
        size: new Vector(24, 17),
        offset: new Vector(-10, -22)
      },
      {
        start: new Vector(863, 16),
        size: new Vector(27, 16),
        offset: new Vector(-11, -21)
      },
      {
        start: new Vector(833, 627),
        size: new Vector(28, 15),
        offset: new Vector(-11, -20)
      },
      {
        start: new Vector(833, 180),
        size: new Vector(30, 14),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(802, 664),
        size: new Vector(31, 14),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(767, 753),
        size: new Vector(32, 14),
        offset: new Vector(-11, -19)
      },
      {
        start: new Vector(767, 767),
        size: new Vector(32, 14),
        offset: new Vector(-11, -19)
      }
    ],
    explosion: [
      {
        start: new Vector(48, 952),
        size: new Vector(1, 1),
        offset: new Vector(0, 0)
      },
      {
        start: new Vector(934, 397),
        size: new Vector(14, 17),
        offset: new Vector(-13, 0)
      },
      {
        start: new Vector(863, 485),
        size: new Vector(25, 21),
        offset: new Vector(-18, -4)
      },
      {
        start: new Vector(727, 450),
        size: new Vector(36, 30),
        offset: new Vector(-23, -13)
      },
      {
        start: new Vector(681, 426),
        size: new Vector(45, 40),
        offset: new Vector(-27, -21)
      },
      {
        start: new Vector(578, 139),
        size: new Vector(54, 51),
        offset: new Vector(-31, -29)
      },
      {
        start: new Vector(453, 601),
        size: new Vector(62, 61),
        offset: new Vector(-35, -36)
      },
      {
        start: new Vector(376, 356),
        size: new Vector(69, 69),
        offset: new Vector(-38, -42)
      },
      {
        start: new Vector(376, 280),
        size: new Vector(76, 76),
        offset: new Vector(-41, -47)
      },
      {
        start: new Vector(289, 677),
        size: new Vector(81, 82),
        offset: new Vector(-43, -52)
      },
      {
        start: new Vector(289, 284),
        size: new Vector(86, 89),
        offset: new Vector(-45, -57)
      },
      {
        start: new Vector(197, 600),
        size: new Vector(89, 94),
        offset: new Vector(-45, -61)
      },
      {
        start: new Vector(197, 0),
        size: new Vector(92, 94),
        offset: new Vector(-46, -65)
      },
      {
        start: new Vector(101, 575),
        size: new Vector(94, 93),
        offset: new Vector(-46, -68)
      },
      {
        start: new Vector(101, 320),
        size: new Vector(95, 89),
        offset: new Vector(-46, -69)
      },
      {
        start: new Vector(101, 409),
        size: new Vector(95, 86),
        offset: new Vector(-46, -70)
      },
      {
        start: new Vector(0, 670),
        size: new Vector(97, 85),
        offset: new Vector(-47, -71)
      },
      {
        start: new Vector(0, 585),
        size: new Vector(98, 85),
        offset: new Vector(-48, -71)
      },
      {
        start: new Vector(0, 418),
        size: new Vector(99, 85),
        offset: new Vector(-49, -72)
      },
      {
        start: new Vector(0, 333),
        size: new Vector(100, 85),
        offset: new Vector(-50, -72)
      },
      {
        start: new Vector(0, 0),
        size: new Vector(101, 84),
        offset: new Vector(-51, -72)
      },
      {
        start: new Vector(0, 84),
        size: new Vector(101, 84),
        offset: new Vector(-52, -72)
      },
      {
        start: new Vector(0, 168),
        size: new Vector(101, 83),
        offset: new Vector(-52, -71)
      },
      {
        start: new Vector(0, 251),
        size: new Vector(101, 82),
        offset: new Vector(-52, -71)
      },
      {
        start: new Vector(0, 503),
        size: new Vector(99, 82),
        offset: new Vector(-51, -71)
      },
      {
        start: new Vector(0, 755),
        size: new Vector(97, 81),
        offset: new Vector(-49, -70)
      },
      {
        start: new Vector(101, 495),
        size: new Vector(95, 80),
        offset: new Vector(-48, -70)
      },
      {
        start: new Vector(101, 668),
        size: new Vector(94, 79),
        offset: new Vector(-47, -69)
      },
      {
        start: new Vector(197, 444),
        size: new Vector(91, 78),
        offset: new Vector(-45, -68)
      },
      {
        start: new Vector(197, 522),
        size: new Vector(90, 78),
        offset: new Vector(-44, -68)
      },
      {
        start: new Vector(197, 834),
        size: new Vector(87, 76),
        offset: new Vector(-42, -67)
      },
      {
        start: new Vector(289, 373),
        size: new Vector(86, 76),
        offset: new Vector(-41, -67)
      }
    ],
    smallExplosion: [
      {
        start: new Vector(566, 942),
        size: new Vector(8, 10),
        offset: new Vector(-6, -17)
      },
      {
        start: new Vector(934, 796),
        size: new Vector(11, 11),
        offset: new Vector(-7, -18)
      },
      {
        start: new Vector(934, 414),
        size: new Vector(13, 12),
        offset: new Vector(-8, -20)
      },
      {
        start: new Vector(934, 187),
        size: new Vector(15, 14),
        offset: new Vector(-8, -22)
      },
      {
        start: new Vector(913, 211),
        size: new Vector(19, 17),
        offset: new Vector(-10, -24)
      },
      {
        start: new Vector(890, 353),
        size: new Vector(22, 18),
        offset: new Vector(-11, -25)
      },
      {
        start: new Vector(890, 0),
        size: new Vector(23, 22),
        offset: new Vector(-12, -27)
      },
      {
        start: new Vector(863, 926),
        size: new Vector(23, 23),
        offset: new Vector(-12, -28)
      },
      {
        start: new Vector(863, 558),
        size: new Vector(24, 22),
        offset: new Vector(-12, -27)
      },
      {
        start: new Vector(863, 463),
        size: new Vector(25, 22),
        offset: new Vector(-12, -27)
      },
      {
        start: new Vector(863, 440),
        size: new Vector(25, 23),
        offset: new Vector(-12, -27)
      },
      {
        start: new Vector(890, 22),
        size: new Vector(23, 21),
        offset: new Vector(-11, -26)
      },
      {
        start: new Vector(890, 43),
        size: new Vector(23, 20),
        offset: new Vector(-11, -26)
      },
      {
        start: new Vector(890, 531),
        size: new Vector(21, 19),
        offset: new Vector(-10, -25)
      },
      {
        start: new Vector(913, 228),
        size: new Vector(19, 17),
        offset: new Vector(-9, -24)
      },
      {
        start: new Vector(913, 543),
        size: new Vector(18, 15),
        offset: new Vector(-9, -23)
      }
    ],
    sites: {
      light: [
        {
          start: new Vector(289, 449),
          size: new Vector(84, 51),
          offset: new Vector(-43, -29)
        },
        {
          start: new Vector(197, 910),
          size: new Vector(81, 38),
          offset: new Vector(-41, -23)
        },
        {
          start: new Vector(101, 747),
          size: new Vector(94, 74),
          offset: new Vector(-46, -63)
        },
        {
          start: new Vector(289, 797),
          size: new Vector(77, 49),
          offset: new Vector(-39, -28)
        },
        {
          start: new Vector(289, 0),
          size: new Vector(87, 73),
          offset: new Vector(-43, -56)
        },
        {
          start: new Vector(197, 694),
          size: new Vector(88, 70),
          offset: new Vector(-47, -64)
        },
        {
          start: new Vector(197, 344),
          size: new Vector(92, 50),
          offset: new Vector(-46, -28)
        },
        {
          start: new Vector(289, 551),
          size: new Vector(82, 63),
          offset: new Vector(-48, -38)
        },
        {
          start: new Vector(289, 146),
          size: new Vector(87, 69),
          offset: new Vector(-47, -48)
        }
      ],
      dark: [
        {
          start: new Vector(289, 500),
          size: new Vector(84, 51),
          offset: new Vector(-43, -29)
        },
        {
          start: new Vector(289, 759),
          size: new Vector(81, 38),
          offset: new Vector(-41, -23)
        },
        {
          start: new Vector(101, 821),
          size: new Vector(94, 74),
          offset: new Vector(-46, -63)
        },
        {
          start: new Vector(289, 846),
          size: new Vector(77, 49),
          offset: new Vector(-39, -28)
        },
        {
          start: new Vector(289, 73),
          size: new Vector(87, 73),
          offset: new Vector(-43, -56)
        },
        {
          start: new Vector(197, 764),
          size: new Vector(88, 70),
          offset: new Vector(-47, -64)
        },
        {
          start: new Vector(197, 394),
          size: new Vector(92, 50),
          offset: new Vector(-46, -28)
        },
        {
          start: new Vector(289, 614),
          size: new Vector(82, 63),
          offset: new Vector(-48, -38)
        },
        {
          start: new Vector(289, 215),
          size: new Vector(87, 69),
          offset: new Vector(-47, -48)
        }
      ]
    }
  };

  // src/ui.ts
  function boxCollision(area, p) {
    const end = area.start.add(area.size);
    if (p.x >= area.start.x && p.y >= area.start.y && p.x <= end.x && p.y <= end.y) {
      return true;
    }
    return false;
  }
  var Modal = class {
    constructor(fontSizeMultiplier = 1) {
      this.state = 0 /* Normal */;
      this.crossArea = newArea(0, 0, 0, 0);
      this.crossStrokeWidth = 0;
      this.area = newArea(0, 0, 0, 0);
      this.text = "";
      this.baseFontSize = 0;
      this.fontSizeMultiplier = fontSizeMultiplier;
    }
    collides(p) {
      return boxCollision(this.crossArea, p);
    }
    resize() {
      this.crossStrokeWidth = Math.floor(this.baseFontSize * 0.22);
      const length = Math.floor(
        Math.min(this.area.size.x, this.area.size.y) * 0.08
      );
      const size = new Vector(length, length);
      const startX = this.area.start.x + this.area.size.x - 2 * length;
      const startY = this.area.start.y + 1 * length;
      const start = new Vector(startX, startY);
      this.crossArea = { start, size };
    }
    getEvent() {
      return { type: 7 /* NoneEvent */ };
    }
  };
  var StandardButton = class {
    constructor(text, eventType, fontSizeMultiplier) {
      this.state = 0 /* Normal */;
      this.area = newArea(0, 0, 0, 0);
      this.text = text;
      this.baseFontSize = 0;
      if (fontSizeMultiplier !== void 0) {
        this.fontSizeMultiplier = fontSizeMultiplier;
      }
      this.event = { type: eventType };
    }
    collides(p) {
      return boxCollision(this.area, p);
    }
    getEvent() {
      return this.event;
    }
    resize() {
    }
  };
  var TextInput = class {
    constructor(element, fontSizeMultiplier) {
      this.area = newArea(0, 0, 0, 0);
      this.state = 3 /* Invisible */;
      this.baseFontSize = 0;
      if (fontSizeMultiplier !== void 0) {
        this.fontSizeMultiplier = fontSizeMultiplier;
      }
      element.maxLength = 5;
      element.style.fontFamily = "monospace";
      this.element = element;
    }
    hide() {
      this.element.style.display = "none";
      this.element.value = "";
    }
    show() {
      this.element.style.display = "";
    }
    collides(p) {
      const end = this.area.start.add(this.area.size);
      if (p.x >= this.area.start.x && p.y >= this.area.start.y && p.x <= end.x && p.y <= end.y) {
        return true;
      }
      return false;
    }
    getEvent() {
      return { type: 7 /* NoneEvent */ };
    }
    resize() {
      const mul = 1 / window.devicePixelRatio;
      const start = this.area.start.mul(mul).round();
      const size = this.area.size.mul(mul).round();
      const borderWidth = this.area.size.y * 0.08 * mul;
      this.element.style.left = `${start.x}px`;
      this.element.style.top = `${start.y}px`;
      this.element.style.width = `${size.x}px`;
      this.element.style.height = `${size.y}px`;
      this.element.style.fontSize = `${this.baseFontSize * mul}px`;
      this.element.style.borderBottom = `${borderWidth}px solid white`;
    }
  };
  function newArea(startX, startY, sizeX, sizeY) {
    return { start: new Vector(startX, startY), size: new Vector(sizeX, sizeY) };
  }
  function applyAspectRatio(aspectRatio, space, min = false) {
    if (space.y === 0) {
      return new Vector(0, 0);
    }
    const spaceAspectRatio = space.x / space.y;
    if (spaceAspectRatio <= aspectRatio) {
      const x2 = space.x;
      const y2 = space.x / aspectRatio;
      return new Vector(x2, y2);
    }
    if (min) {
      return new Vector(space.x, space.y);
    }
    const y = space.y;
    const x = y * aspectRatio;
    return new Vector(x, y);
  }
  var Panel = class {
    constructor(horizontal, vertical) {
      this.buttons = [];
      this.horizontal = { sizing: horizontal, buttonAreas: [] };
      this.vertical = { sizing: vertical, buttonAreas: [] };
      this.area = newArea(0, 0, 0, 0);
    }
    attachButton(button, horArea, verArea) {
      this.horizontal.buttonAreas.push(horArea);
      this.vertical.buttonAreas.push(verArea);
      this.buttons.push(button);
    }
    resize(available) {
      if (available.y === 0) {
        this.area = newArea(0, 0, 0, 0);
        return;
      }
      const aspectRatio = available.x / available.y;
      const panel = aspectRatio >= 1 ? this.horizontal : this.vertical;
      const afterMax = new Vector(
        available.x * panel.sizing.maxWidth,
        available.y * panel.sizing.maxHeight
      );
      let size = afterMax;
      if (panel.sizing.aspectRatio !== void 0) {
        size = applyAspectRatio(panel.sizing.aspectRatio, afterMax);
      } else if (panel.sizing.minAspectRatio) {
        size = applyAspectRatio(panel.sizing.minAspectRatio, afterMax, true);
      }
      this.area = newArea(0, 0, size.x, size.y);
      const leftover = available.sub(size);
      if (panel.sizing.align === 2 /* End */) {
        this.area.start = leftover;
      }
      if (panel.sizing.align === 1 /* Center */) {
        this.area.start = leftover.mul(0.5);
      }
      const buffer = panel.sizing.buff * Math.min(size.x, size.y);
      const cellSize = new Vector(
        (size.x - (panel.sizing.grid.x + 1) * buffer) / panel.sizing.grid.x,
        (size.y - (panel.sizing.grid.y + 1) * buffer) / panel.sizing.grid.y
      );
      const fontSize = size.x / panel.sizing.grid.x * panel.sizing.baseFontSize / 100;
      for (const [i, area] of panel.buttonAreas.entries()) {
        const buttonSize = area.size.matmul(cellSize).add(area.size.sub(new Vector(1, 1)).mul(buffer)).floor();
        const buttonStart = this.area.start.add(area.start.matmul(cellSize)).add(area.start.add(new Vector(1, 1)).mul(buffer)).round();
        const button = this.buttons[i];
        button.area = { start: buttonStart, size: buttonSize };
        button.baseFontSize = fontSize;
        if (button.fontSizeMultiplier !== void 0) {
          button.baseFontSize *= button.fontSizeMultiplier;
        }
        button.baseFontSize = Math.round(button.baseFontSize);
        button.resize();
      }
    }
  };
  var UI = class {
    constructor(notifier, inputElement) {
      this.buttons = /* @__PURE__ */ new Map();
      this.curButtons = [];
      this.modalTextQueue = [];
      this.notifier = notifier;
      const inGameMenuPanel = new Panel(
        {
          maxWidth: 0.27,
          maxHeight: 1,
          buff: 0.04,
          baseFontSize: 24,
          aspectRatio: 1 / 3,
          grid: new Vector(2, 8)
        },
        {
          maxWidth: 1,
          maxHeight: 0.25,
          buff: 0.05,
          baseFontSize: 12,
          minAspectRatio: 3,
          grid: new Vector(3, 2)
        }
      );
      const mainMenuPanel = new Panel(
        {
          maxWidth: 1,
          maxHeight: 0.88,
          buff: 0.04,
          baseFontSize: 20,
          aspectRatio: 5 / 6,
          align: 1 /* Center */,
          grid: new Vector(4, 6)
        },
        {
          maxWidth: 0.8,
          maxHeight: 0.88,
          buff: 0.05,
          baseFontSize: 20,
          aspectRatio: 5 / 6,
          align: 1 /* Center */,
          grid: new Vector(4, 6)
        }
      );
      const modalPanel = new Panel(
        {
          maxWidth: 0.8,
          maxHeight: 0.88,
          buff: 0.04,
          baseFontSize: 20,
          minAspectRatio: 1 / 3,
          align: 1 /* Center */,
          grid: new Vector(4, 8)
        },
        {
          maxWidth: 0.8,
          maxHeight: 0.88,
          buff: 0.05,
          baseFontSize: 20,
          minAspectRatio: 1 / 3,
          align: 1 /* Center */,
          grid: new Vector(4, 8)
        }
      );
      this.panels = [inGameMenuPanel, mainMenuPanel, modalPanel];
      const buttonSendTurn = new StandardButton(
        "send turn",
        11 /* ButtonSendTurn */
      );
      const buttonQuitGame = new StandardButton(
        "quit game",
        12 /* ButtonQuitGame */
      );
      const buttonZoomIn = new StandardButton(
        "+",
        8 /* ButtonZoomIn */,
        1.5
      );
      const buttonZoomOut = new StandardButton(
        "-",
        9 /* ButtonZoomOut */,
        1.5
      );
      const buttonUnmute = new StandardButton(
        "unmute",
        13 /* ButtonUnmute */
      );
      const buttonMute = new StandardButton("mute", 14 /* ButtonMute */);
      inGameMenuPanel.attachButton(
        buttonSendTurn,
        newArea(0, 0, 2, 1),
        newArea(0, 0, 1, 1)
      );
      inGameMenuPanel.attachButton(
        buttonQuitGame,
        newArea(0, 1, 2, 1),
        newArea(0, 1, 1, 1)
      );
      inGameMenuPanel.attachButton(
        buttonZoomIn,
        newArea(0, 2, 2, 1),
        newArea(1, 0, 1, 1)
      );
      inGameMenuPanel.attachButton(
        buttonZoomOut,
        newArea(0, 3, 2, 1),
        newArea(1, 1, 1, 1)
      );
      inGameMenuPanel.attachButton(
        buttonUnmute,
        newArea(0, 4, 2, 1),
        newArea(2, 0, 1, 1)
      );
      inGameMenuPanel.attachButton(
        buttonMute,
        newArea(0, 4, 2, 1),
        newArea(2, 0, 1, 1)
      );
      const inGameButtons = [
        buttonSendTurn,
        buttonQuitGame,
        buttonZoomIn,
        buttonZoomOut,
        buttonUnmute,
        buttonMute
      ];
      buttonMute.state = 3 /* Invisible */;
      buttonUnmute.state = 2 /* Inactive */;
      this.buttons.set(2 /* InGame */, inGameButtons);
      const buttonInputRoomCode = new TextInput(inputElement);
      mainMenuPanel.attachButton(
        buttonInputRoomCode,
        newArea(1, 1, 2, 1),
        newArea(1, 1, 2, 1)
      );
      const buttonJoinRoom = new StandardButton(
        "join room",
        10 /* ButtonJoinRoom */
      );
      mainMenuPanel.attachButton(
        buttonJoinRoom,
        newArea(1, 2, 2, 1),
        newArea(1, 2, 2, 1)
      );
      this.buttons.set(0 /* Main */, [buttonJoinRoom, buttonInputRoomCode]);
      const buttonQuitRoom = new StandardButton(
        "quit room",
        12 /* ButtonQuitGame */
      );
      mainMenuPanel.attachButton(
        buttonQuitRoom,
        newArea(1, 2, 2, 1),
        newArea(1, 2, 2, 1)
      );
      this.buttons.set(1 /* WaitingRoom */, [buttonQuitRoom]);
      this.curButtons = this.buttons.get(0 /* Main */) || [];
      buttonJoinRoom.state = 2 /* Inactive */;
      this.specialButtons = {
        joinRoom: buttonJoinRoom,
        textInput: buttonInputRoomCode,
        sendTurn: buttonSendTurn,
        mute: buttonMute,
        unmute: buttonUnmute
      };
      this.modal = new Modal();
      modalPanel.attachButton(
        this.modal,
        newArea(0, 0, 4, 8),
        newArea(0, 0, 4, 8)
      );
    }
    setAudioButton(mute) {
      this.specialButtons.mute.state = 3 /* Invisible */;
      this.specialButtons.unmute.state = 3 /* Invisible */;
      if (mute) {
        this.specialButtons.mute.state = 0 /* Normal */;
      } else {
        this.specialButtons.unmute.state = 0 /* Normal */;
      }
    }
    allowUnmute() {
      if (this.specialButtons.unmute.state === 2 /* Inactive */) {
        this.specialButtons.unmute.state = 0 /* Normal */;
      }
    }
    hasModal() {
      if (this.modalTextQueue.length > 0) {
        return true;
      }
      return false;
    }
    getModal() {
      if (this.hasModal()) {
        return this.modal;
      }
      return null;
    }
    addModal(text) {
      this.modalTextQueue.push(text);
      if (this.modalTextQueue.length === 1) {
        this.modal.text = text;
      }
    }
    removeModal() {
      this.modalTextQueue.shift();
      if (this.hasModal()) {
        this.modal.text = this.modalTextQueue[0];
      }
    }
    enableMode(mode) {
      this.resetCurrent();
      this.curButtons = this.buttons.get(mode) || [];
      for (const button of this.curButtons) {
        if (button === this.specialButtons.textInput) {
          this.specialButtons.textInput.show();
        }
      }
    }
    resize(space) {
      for (const panel of this.panels) {
        panel.resize(space);
      }
    }
    handlePointerStart(p) {
      if (this.hasModal()) return;
      this.mark(p, 1 /* Pressed */);
    }
    handlePointerMove(p) {
      if (this.hasModal()) return;
      this.mark(p, 1 /* Pressed */);
    }
    handlePointerEnd(p) {
      if (this.hasModal()) {
        if (this.modal.collides(p)) {
          this.removeModal();
        }
        return;
      }
      for (const button of this.curButtons) {
        if (button.collides(p) && button.state !== 2 /* Inactive */ && button.state !== 3 /* Invisible */) {
          this.notifier.notify(button.getEvent());
          break;
        }
      }
      this.mark(p, 0 /* Normal */);
    }
    collides(p) {
      if (this.hasModal()) return true;
      for (const button of this.curButtons) {
        if (button.collides(p)) {
          return true;
        }
      }
      return false;
    }
    setOnlineGameAvailability(available) {
      this.specialButtons.joinRoom.state = available ? 0 /* Normal */ : 2 /* Inactive */;
    }
    setSendTurnAvailability(available) {
      this.specialButtons.sendTurn.state = available ? 0 /* Normal */ : 2 /* Inactive */;
    }
    getRoomCode() {
      return this.specialButtons.textInput.element.value.toUpperCase();
    }
    mark(p, state) {
      for (const button of this.curButtons) {
        if (button.state === 2 /* Inactive */ || button.state === 3 /* Invisible */)
          continue;
        button.state = 0 /* Normal */;
        if (button.collides(p)) {
          button.state = state;
        }
      }
    }
    resetCurrent() {
      for (const button of this.curButtons) {
        if (button === this.specialButtons.textInput) {
          this.specialButtons.textInput.hide();
        }
        if (button.state === 2 /* Inactive */ || button.state === 3 /* Invisible */)
          continue;
        button.state = 0 /* Normal */;
      }
    }
  };

  // src/display-driver.ts
  var SPRITES_IMAGE_SRC = "./assets/sprites.png";
  var GREEN_HIGHLIGHT_IDX = 0;
  var YELLOW_HIGHLIGHT_IDX = 1;
  var DEFAULT_PRESET_IDX = 1;
  var SMOKE_MARK_IDX = 0;
  var SHRINK_MARK_IDX = 1;
  var DisplayDriver = class {
    constructor(ctx2, gameState, ui) {
      this.backgroundColor = "rgb(50, 50, 50)";
      this.cameraOffset = new Vector(0, 0);
      this.spriteConfigs = [
        { scale: 1, sprites: SPRITES_64 },
        // 64
        { scale: 1, sprites: SPRITES_96 },
        // 96
        { scale: 2, sprites: SPRITES_64 },
        // 128
        { scale: 2, sprites: SPRITES_96 },
        // 192
        { scale: 4, sprites: SPRITES_64 },
        // 256
        { scale: 3, sprites: SPRITES_96 },
        // 288
        { scale: 4, sprites: SPRITES_96 }
        // 384
      ];
      this.presetIdx = DEFAULT_PRESET_IDX;
      this.curPreset = this.spriteConfigs[this.presetIdx];
      this.ctx = ctx2;
      this.gameState = gameState;
      this.ui = ui;
      this.sprites = new Image();
      this.sprites.src = SPRITES_IMAGE_SRC;
    }
    draw(freeze) {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.drawHexes();
      this.drawOverlays();
      this.drawPaths();
      this.drawTanks();
      this.drawSites();
      this.drawExplosions();
      this.drawUI();
      if (freeze) {
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.globalAlpha = 0.6;
        const x = this.ctx.canvas.width;
        const y = this.ctx.canvas.height;
        this.ctx.fillRect(0, 0, x, y);
        this.ctx.restore();
      }
    }
    resize() {
      const rect = this.ctx.canvas.parentElement.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio;
      const screen = new Vector(rect.width, rect.height);
      this.ctx.canvas.style.width = `${screen.x}px`;
      this.ctx.canvas.style.height = `${screen.y}px`;
      const canvasSize = screen.mul(pixelRatio);
      this.ctx.canvas.width = canvasSize.x;
      this.ctx.canvas.height = canvasSize.y;
      this.ui.resize(canvasSize);
    }
    reset() {
      this.presetIdx = DEFAULT_PRESET_IDX;
      this.curPreset = this.spriteConfigs[this.presetIdx];
      this.cameraOffset = Vector.zero();
    }
    handleZoomIn() {
      this.zoom(true);
    }
    handleZoomOut() {
      this.zoom(false);
    }
    zoom(zoomIn) {
      if (zoomIn && this.presetIdx === this.spriteConfigs.length - 1) return;
      if (!zoomIn && this.presetIdx === 0) return;
      if (zoomIn) {
        this.presetIdx++;
      } else {
        this.presetIdx--;
      }
      const oldHexWidth = this.curPreset.sprites.hexSize.x * this.curPreset.scale;
      this.curPreset = this.spriteConfigs[this.presetIdx];
      const newHexWidth = this.curPreset.sprites.hexSize.x * this.curPreset.scale;
      const center = new Vector(
        this.ctx.canvas.width,
        this.ctx.canvas.height
      ).mul(0.5);
      this.cameraOffset = this.cameraOffset.sub(center).mul(newHexWidth / oldHexWidth).add(center);
    }
    addCameraOffset(v) {
      this.cameraOffset = this.cameraOffset.add(v);
    }
    screenToGridCoords(p) {
      const worldCoords = p.sub(this.cameraOffset);
      const hexSize = this.getHexSize();
      let y = worldCoords.y / hexSize.y * 4 / 3;
      let x = worldCoords.x / hexSize.x - y / 2;
      const roundX = Math.round(x);
      const roundY = Math.round(y);
      x -= roundX;
      y -= roundY;
      const dx = Math.round(x + 0.5 * y) * Number(x * x >= y * y);
      const dy = Math.round(y + 0.5 * x) * Number(x * x < y * y);
      return new Vector(roundX + dx, roundY + dy);
    }
    gridToScreenCoords(p) {
      const hexSize = this.getHexSize();
      const y = p.y * hexSize.y * 3 / 4;
      const x = p.x * hexSize.x + 0.5 * p.y * hexSize.x;
      return new Vector(x, y).add(this.cameraOffset);
    }
    drawSprite(sprite, p) {
      const screenCords = this.gridToScreenCoords(p).round();
      const scale = this.curPreset.scale;
      const shakeOffset = (this.gameState?.cameraShake || Vector.zero()).mul(
        this.curPreset.sprites.hexSize.x * scale
      );
      const start = screenCords.add(sprite.offset.mul(scale)).add(shakeOffset).floor();
      const size = sprite.size.mul(scale);
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(
        this.sprites,
        sprite.start.x,
        sprite.start.y,
        sprite.size.x,
        sprite.size.y,
        start.x,
        start.y,
        size.x,
        size.y
      );
    }
    drawOverlays() {
      if (this.gameState === null) return;
      for (const overlay of this.gameState?.overlays) {
        if (!this.gameState.hexes.has(overlay.p.toString())) {
          continue;
        }
        const isLight = this.gameState.visibleHexes.has(overlay.p.toString());
        const sprite = this.getOverlaySprite(overlay.variant, isLight);
        this.drawSprite(sprite, overlay.p);
      }
    }
    drawUI() {
      this.ctx.save();
      for (const button of this.ui.curButtons) {
        if (button.state === 3 /* Invisible */) continue;
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillStyle = "white";
        if (button.state === 1 /* Pressed */) {
          this.ctx.fillStyle = "#444444";
        }
        if (button.state === 2 /* Inactive */) {
          this.ctx.fillStyle = "white";
        }
        this.ctx.fillRect(
          button.area.start.x,
          button.area.start.y,
          button.area.size.x,
          button.area.size.y
        );
        let fontSize = button.baseFontSize;
        fontSize = Math.round(fontSize);
        this.ctx.font = `bold ${fontSize}px monospace`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "black";
        if (button.state === 2 /* Inactive */) {
          this.ctx.fillStyle = "#444444";
          this.ctx.fillRect(
            button.area.start.x + 2,
            button.area.start.y + 2,
            button.area.size.x - 4,
            button.area.size.y - 4
          );
          this.ctx.fillStyle = "white";
        }
        this.ctx.globalAlpha = 1;
        const center = button.area.start.add(button.area.size.mul(0.5)).round();
        this.ctx.fillText(button.text || "", center.x, center.y);
      }
      const modal = this.ui.getModal();
      if (modal !== null) {
        const area = modal.area;
        this.ctx.globalAlpha = 0.6;
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(area.start.x, area.start.y, area.size.x, area.size.y);
        this.ctx.font = `bold ${modal.baseFontSize}px monospace`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = "black";
        const center = area.start.add(area.size.mul(0.5)).round();
        this.ctx.fillText(modal.text || "", center.x, center.y);
        this.ctx.lineWidth = modal.crossStrokeWidth;
        this.ctx.beginPath();
        const start = modal.crossArea.start;
        const end = start.add(modal.crossArea.size);
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.moveTo(start.x, end.y);
        this.ctx.lineTo(end.x, start.y);
        this.ctx.closePath();
        this.ctx.stroke();
      }
      this.ctx.restore();
    }
    drawExplosions() {
      if (this.gameState === null) return;
      if (this.gameState.firingExplosion.frac > 0) {
        const sprites = this.curPreset.sprites.smallExplosion;
        const idx = Math.min(
          sprites.length - 1,
          Math.floor(this.gameState.firingExplosion.frac * sprites.length)
        );
        const sprite = sprites[idx];
        this.drawSprite(sprite, this.gameState.firingExplosion.p);
      }
      if (this.gameState.explosion.frac > 0) {
        const sprites = this.curPreset.sprites.explosion;
        const idx = Math.min(
          sprites.length - 1,
          Math.floor(this.gameState.explosion.frac * sprites.length)
        );
        const sprite = sprites[idx];
        this.drawSprite(sprite, this.gameState.explosion.p);
      }
    }
    drawPaths() {
      if (this.gameState === null) return;
      let moveIdx = 0;
      for (const id of this.gameState.turnOrder) {
        const tank = getTankById(this.gameState.playerTanks, id);
        if (tank === null) continue;
        if (tank.path.length < 2) continue;
        const vStart = tank.path[1].sub(tank.path[0]);
        const vEnd = tank.path[tank.path.length - 2].sub(
          tank.path[tank.path.length - 1]
        );
        const variantStart = unitVectorToIdx(vStart);
        const variantEnd = unitVectorToIdx(vEnd);
        const spriteStart = this.getPathSprite(moveIdx, variantStart.toString());
        const spriteEnd = this.getPathSprite(moveIdx, variantEnd.toString());
        const triangleVariant = [0, 2, 4].includes(variantEnd) ? "arrowL" : "arrowR";
        const spriteTriangle = this.getPathSprite(moveIdx, triangleVariant);
        this.drawSprite(spriteStart, tank.p);
        this.drawSprite(spriteEnd, tank.path[tank.path.length - 1]);
        this.drawSprite(spriteTriangle, tank.path[tank.path.length - 1]);
        for (let i = 0; i < tank.path.length - 2; i++) {
          const p1 = tank.path[i];
          const p2 = tank.path[i + 1];
          const p3 = tank.path[i + 2];
          const variants = this.getPathSegmentVariants(
            p1,
            p2,
            p3
          );
          for (const variant of variants) {
            const sprite = this.getPathSprite(moveIdx, variant);
            this.drawSprite(sprite, p2);
          }
        }
        moveIdx++;
      }
      for (const tank of this.gameState.playerTanks) {
        if (tank.shooting) {
          const sprite = this.getAimSprite(tank.shootingDir);
          this.drawSprite(sprite, tank.p);
        }
      }
    }
    getPathSegmentVariants(p1, p2, p3) {
      const v1 = p1.sub(p2);
      const v2 = p3.sub(p2);
      const idx1 = unitVectorToIdx(v1);
      const idx2 = unitVectorToIdx(v2);
      if (Math.abs(idx1 - idx2) === 3) {
        return [idx1.toString(), idx2.toString()];
      }
      return [Math.min(idx1, idx2).toString() + Math.max(idx1, idx2).toString()];
    }
    drawHexes() {
      if (this.gameState === null) return;
      this.ctx.save();
      for (const hex of this.gameState.hexes.values()) {
        const sprite = this.getHexSprite(
          hex.variant,
          this.gameState.visibleHexes.has(hex.p.toString())
        );
        this.ctx.globalAlpha = hex.opacity;
        this.drawSprite(sprite, hex.p);
        if (this.gameState.conditionallyAvailableHexes.has(hex.p.toString())) {
          const sprite2 = this.getHighlightSprite(YELLOW_HIGHLIGHT_IDX);
          this.drawSprite(sprite2, hex.p);
        }
        if (this.gameState.availableHexes.has(hex.p.toString())) {
          const sprite2 = this.getHighlightSprite(GREEN_HIGHLIGHT_IDX);
          this.drawSprite(sprite2, hex.p);
        }
      }
      this.ctx.restore();
    }
    drawSites() {
      if (this.gameState === null) return;
      for (const site of this.gameState.sites) {
        if (!this.gameState.hexes.has(site.p.toString())) {
          continue;
        }
        const sprite = this.getSiteSprite(
          site.variant,
          this.gameState.visibleHexes.has(site.p.toString())
        );
        this.drawSprite(sprite, site.p);
      }
    }
    drawTanks() {
      if (this.gameState === null) return;
      for (const tank of this.gameState.playerTanks) {
        if (!tank.visible) continue;
        const sprite = this.getTankSprites(
          true,
          tank.angleBody,
          tank.angleTurret
        );
        this.drawSprite(sprite.body, tank.pF);
        this.drawSprite(sprite.turret, tank.pF);
      }
      for (const tank of this.gameState.enemyTanks) {
        if (!tank.visible) continue;
        const sprite = this.getTankSprites(
          false,
          tank.angleBody,
          tank.angleTurret
        );
        this.drawSprite(sprite.body, tank.pF);
        this.drawSprite(sprite.turret, tank.pF);
      }
    }
    getHexSize() {
      return this.curPreset.sprites.hexSize.mul(this.curPreset.scale);
    }
    getAimSprite(variant) {
      return this.curPreset.sprites.overlays.aim[variant];
    }
    getHexSprite(variant, light) {
      if (light) {
        return this.curPreset.sprites.hexes.light[variant];
      }
      return this.curPreset.sprites.hexes.dark[variant];
    }
    getSiteSprite(variant, light) {
      if (light) {
        return this.curPreset.sprites.sites.light[variant];
      }
      return this.curPreset.sprites.sites.dark[variant];
    }
    getTankSprites(isPlayer, angleBody, angleTurret) {
      const len = this.curPreset.sprites.tanksBodies.length;
      const bodyIdx = Math.min(
        len - 1,
        Math.max(0, Math.round(angleBody / 360 * len))
      );
      const turretIdx = Math.min(
        len - 1,
        Math.max(0, Math.round(angleTurret / 360 * len))
      );
      let body = this.curPreset.sprites.tanksBodies[bodyIdx];
      let turret = this.curPreset.sprites.tanksTurrets[turretIdx];
      if (!isPlayer) {
        body = this.curPreset.sprites.enemyTanksBodies[bodyIdx];
        turret = this.curPreset.sprites.enemyTanksTurrets[turretIdx];
      }
      return { body, turret };
    }
    getHighlightSprite(variant) {
      return this.curPreset.sprites.overlays.highlights[variant];
    }
    getOverlaySprite(variant, light) {
      const overlays = this.curPreset.sprites.overlays.markers;
      if (light) {
        return overlays.light[variant];
      }
      return overlays.dark[variant];
    }
    getPathSprite(idx, variant) {
      const len = this.curPreset.sprites.overlays.paths.length;
      idx = idx % len;
      return this.curPreset.sprites.overlays.paths[idx][variant];
    }
  };

  // src/game-objects.ts
  function getTankById(tanks, id) {
    for (const tank of tanks) {
      if (tank.id === id) {
        return tank;
      }
    }
    return null;
  }
  function newTankFire(id, dir) {
    return { type: 2 /* Fire */, id, dir };
  }
  function newTankMove(id, path) {
    return { type: 1 /* Move */, id, path };
  }
  function newSmokeMark(p) {
    return { p, variant: SMOKE_MARK_IDX };
  }
  function newShrinkMark(p) {
    return { p, variant: SHRINK_MARK_IDX };
  }
  var GameState2 = class {
    constructor(config) {
      this.visibleHexes = /* @__PURE__ */ new Set();
      this.availableHexes = /* @__PURE__ */ new Set();
      this.conditionallyAvailableHexes = /* @__PURE__ */ new Set();
      this.turnOrder = [];
      this.overlays = [];
      this.explosion = { frac: 0, p: Vector.zero() };
      this.firingExplosion = { frac: 0, p: Vector.zero() };
      this.cameraShake = Vector.zero();
      this.hexes = new Map(
        config.hexes.map((h) => [
          h.p.toString(),
          { p: h.p, variant: h.variant, traversable: true, opacity: 1 }
        ])
      );
      this.sites = config.sites.map((s) => ({ p: s.p, variant: s.variant }));
      for (const site of this.sites) {
        const hex = this.hexes.get(site.p.toString());
        if (hex !== void 0) {
          hex.traversable = false;
        }
      }
      this.playerTanks = config.playerTanks.map((t) => ({
        id: t.id,
        p: t.p,
        pF: t.p,
        angleBody: 120,
        angleTurret: 134,
        path: [],
        shooting: false,
        shootingDir: 0,
        visible: true
      }));
      this.enemyTanks = config.enemyTanks.map((t) => ({
        id: t.id,
        p: t.p,
        pF: t.p,
        angleBody: 304,
        angleTurret: 288,
        path: [],
        shooting: false,
        shootingDir: 0,
        visible: false
      }));
      for (const et of this.enemyTanks.values()) {
        for (const pt of this.playerTanks.values()) {
          if (pt.p.gridDistance(et.p) <= config.visibilityRange) {
            et.visible = true;
            break;
          }
        }
      }
    }
  };

  // src/grid.ts
  var T_PRESS_TO_FIRE = 700;
  var TANK_ROTATION_SPEED = 100;
  var TANK_MAX_SPEED = 1.2;
  var FIRING_DURATION = 350;
  var FIRING_PAUSE = 300;
  var EXPLOSION_DURATION = 900;
  var EXPLOSION_PAUSE_DURATION = 250;
  var SHRINK_DURATION = 750;
  var Grid = class {
    constructor(gameState, displayDriver, config, notifier, audioDriver) {
      this.lastPoint = Vector.zero();
      this.curT = 0;
      this.pointerStartTime = 0;
      this.isPointerDown = false;
      this.curMode = 0 /* None */;
      this.curTank = null;
      this.turnResults = [];
      this.curTurnResultIdx = 0;
      this.prevResult = null;
      this.curResult = null;
      getCameraShake(0.5);
      this.gameState = gameState;
      this.displayDriver = displayDriver;
      this.config = {
        driveRange: config.driveRange,
        visibilityRange: config.visibilityRange,
        center: config.center
      };
      this.recalculateVisibleHexes();
      this.animationResolver = new ResolverIdle(this);
      this.notifier = notifier;
      this.audioDriver = audioDriver;
    }
    transition() {
      this.nextTurnResult();
      const nextAnimationResolver = this.getAnimationResolver();
      this.animationResolver = nextAnimationResolver;
      this.animationResolver.animate();
    }
    getTank(id) {
      const tank = getTankById(this.gameState.playerTanks, id) || getTankById(this.gameState.enemyTanks, id);
      if (tank === void 0) return null;
      return tank;
    }
    getAnimationResolver() {
      if (this.curResult === null) {
        return new ResolverIdle(this);
      }
      if (this.curResult.type === 256 /* EndTurn */) {
        return new ResolverFinish(this);
      }
      if (this.curResult.type === 1 /* Move2 */) {
        const tank = this.getTank(this.curResult.id);
        if (tank === null) return new ResolverError(this);
        return new ResolverMove2(this, this.curResult, tank);
      }
      if (this.curResult.type === 2 /* Move3 */) {
        const tank = this.getTank(this.curResult.id);
        if (tank === null) return new ResolverError(this);
        return new ResolverMove3(this, this.curResult, tank);
      }
      if (this.curResult.type === 3 /* Fire */) {
        const tank = this.getTank(this.curResult.id);
        if (tank === null) return new ResolverError(this);
        return new ResolverFire(this, this.curResult, tank);
      }
      if (this.curResult.type === 4 /* Explosion */) {
        if (this.curResult.destroyed) {
          const tank = this.getTank(this.curResult.id);
          if (tank === null) return new ResolverError(this);
          return new ResolverExplosion(this, this.curResult, tank);
        }
        return new ResolverExplosion(this, this.curResult);
      }
      if (this.curResult.type === 7 /* Shrink */) {
        return new ResolverShrink(this, this.curResult);
      }
      return new ResolverRest(this);
    }
    getActions() {
      const actions = [];
      for (const idx of this.gameState.turnOrder) {
        const tank = getTankById(this.gameState.playerTanks, idx);
        if (tank === null) continue;
        if (tank.shooting) {
          const shootingVec = idxToUnitVector(tank.shootingDir);
          if (shootingVec === null) continue;
          actions.push(newTankFire(idx, shootingVec));
        } else if (tank.path.length >= 1) {
          actions.push(newTankMove(idx, tank.path));
        }
      }
      return actions;
    }
    handlePointerStart(p) {
      this.lastPoint = p;
      this.isPointerDown = true;
      this.pointerStartTime = this.curT;
      if (this.curMode === 4 /* Animation */) {
        return;
      }
      const tank = this.getCollidingTank(p);
      if (tank !== null) {
        this.notifier.notify({ type: 16 /* TankManipulation */ });
        this.curMode = 2 /* TankNavigation */;
        tank.path = [];
        tank.shooting = false;
        tank.shootingDir = 0;
        this.curTank = tank;
        this.recalculateTraversable();
        this.saveOrder(tank.id);
        return;
      }
      this.curMode = 1 /* Drag */;
    }
    handlePointerMove(p) {
      if (!this.isPointerDown) return;
      switch (this.curMode) {
        case 0 /* None */:
          break;
        case 1 /* Drag */:
          this.handleDrag(p);
          break;
        case 2 /* TankNavigation */:
          if (this.curTank?.path.length === 0 && this.curT - this.pointerStartTime > T_PRESS_TO_FIRE && this.curTank?.p.eq(this.displayDriver.screenToGridCoords(p))) {
            this.curMode = 3 /* TankFire */;
            this.curTank.shooting = true;
            this.curTank.shootingDir = 0;
            this.gameState.availableHexes.clear();
            this.gameState.conditionallyAvailableHexes.clear();
            this.handleTankFire(p);
          } else {
            this.handleTankNavigation(p);
          }
          break;
        case 3 /* TankFire */:
          this.handleTankFire(p);
          break;
        case 4 /* Animation */:
          this.handleDrag(p);
          break;
      }
      this.lastPoint = p;
    }
    handlePointerEnd(p) {
      this.isPointerDown = false;
      if (this.curMode === 4 /* Animation */) return;
      if (this.curMode === 2 /* TankNavigation */ || this.curMode === 3 /* TankFire */) {
        this.handleEndTankNavigationFire();
      }
      this.curMode = 0 /* None */;
      this.curTank = null;
      this.recalculateTraversable();
    }
    tick() {
      this.animationResolver.animate();
      if (this.isPointerDown && this.curMode === 2 /* TankNavigation */) {
        this.handlePointerMove(this.lastPoint);
      }
    }
    handleStartAnimation() {
      this.handlePointerEnd(Vector.zero());
      this.curMode = 4 /* Animation */;
    }
    handleEndAnimation() {
      this.handlePointerEnd(Vector.zero());
      this.curMode = 0 /* None */;
      this.notifier.notify({ type: 15 /* AnimationEnd */ });
    }
    setT(t) {
      this.curT = t;
    }
    nextTurnResult() {
      this.prevResult = this.curResult;
      if (this.curTurnResultIdx >= this.turnResults.length) {
        this.curResult = null;
        return;
      }
      this.curResult = this.turnResults[this.curTurnResultIdx];
      this.curTurnResultIdx++;
    }
    peekTurnResult() {
      if (this.curTurnResultIdx >= this.turnResults.length) {
        return null;
      }
      return this.turnResults[this.curTurnResultIdx];
    }
    pushResults(turnResults) {
      this.clearPathsAndAims();
      if (this.curTurnResultIdx >= this.turnResults.length) {
        this.turnResults = turnResults;
        this.curTurnResultIdx = 0;
      } else {
        this.turnResults.push(...turnResults);
      }
      this.turnResults.push({ type: 256 /* EndTurn */ });
    }
    handleEndTankNavigationFire() {
      if (this.curTank !== null && this.curMode === 2 /* TankNavigation */ && this.curTank.path.length === 0) {
        this.removeOrder(this.curTank.id);
      }
    }
    clearPathsAndAims() {
      for (const tank of this.gameState.playerTanks) {
        tank.path = [];
        tank.shooting = false;
        tank.shootingDir = 0;
      }
    }
    saveOrder(id) {
      this.removeOrder(id);
      this.gameState.turnOrder.push(id);
    }
    removeOrder(id) {
      const idx = this.gameState.turnOrder.indexOf(id);
      if (idx !== -1) {
        this.gameState.turnOrder.splice(idx, 1);
      }
    }
    handleDrag(p) {
      if (this.lastPoint === null) return;
      this.displayDriver.addCameraOffset(p.sub(this.lastPoint));
    }
    handleTankFire(p) {
      if (this.curTank === null) return;
      const v = p.sub(this.displayDriver.gridToScreenCoords(this.curTank.p));
      this.curTank.shootingDir = Math.floor((v.angle() + 30) / 60) % 6;
    }
    handleTankNavigation(p) {
      if (this.curTank === null) return;
      const gridP = this.displayDriver.screenToGridCoords(p);
      if (this.curTank.path.length > this.config.driveRange) return;
      if (gridP.eq(this.curTank.p)) return;
      const lastOnPath = this.curTank.path.length > 0 ? this.curTank.path[this.curTank.path.length - 1] : this.curTank.p;
      if (!isNeighbor(lastOnPath, gridP)) return;
      if (includesVector(this.curTank.path, gridP)) return;
      if (!this.gameState.hexes.has(gridP.toString())) return;
      if (!this.gameState.hexes.get(gridP.toString())?.traversable) return;
      if (this.curTank.path.length === 0) {
        this.curTank.path.push(this.curTank.p);
      }
      this.curTank.path.push(gridP);
      this.recalculateTraversable();
    }
    recalculateTraversable() {
      this.recalculateAvailableHexes(this.gameState.availableHexes, false);
      this.recalculateAvailableHexes(
        this.gameState.conditionallyAvailableHexes,
        true
      );
    }
    recalculateAvailableHexes(set, conditional) {
      set.clear();
      if (this.curTank === null) {
        return;
      }
      let start = this.curTank.p;
      let range = this.config.driveRange;
      if (this.curTank.path.length > 0) {
        start = this.curTank.path[this.curTank.path.length - 1];
        range -= this.curTank.path.length - 1;
      }
      if (range <= 0) {
        return;
      }
      const unavailable = /* @__PURE__ */ new Set();
      if (!conditional) {
        for (const tank of this.gameState.playerTanks) {
          if (!tank.visible || tank.id === this.curTank.id) continue;
          unavailable.add(tank.p.toString());
        }
        for (const tank of this.gameState.enemyTanks) {
          if (!tank.visible) continue;
          unavailable.add(tank.p.toString());
        }
      }
      for (let i = 0; i < this.curTank.path.length - 1; i++) {
        if (unavailable.has(this.curTank.path[i].toString()) && !conditional) {
          set.clear();
          return;
        }
        unavailable.add(this.curTank.path[i].toString());
      }
      if (this.curTank.path.length > 0 && unavailable.has(
        this.curTank.path[this.curTank.path.length - 1].toString()
      ) && !conditional) {
        set.clear();
        return;
      }
      let frontier = [start];
      set.add(start.toString());
      for (let i = 0; i < range; i++) {
        let newFrontier = [];
        for (const p of frontier) {
          for (const n of p.neighbors()) {
            if (set.has(n.toString())) {
              continue;
            }
            const hex = this.gameState.hexes.get(n.toString());
            if (hex === void 0 || !hex.traversable) {
              continue;
            }
            if (unavailable.has(n.toString())) {
              continue;
            }
            set.add(n.toString());
            newFrontier.push(n);
          }
        }
        frontier = newFrontier;
      }
      set.delete(start.toString());
    }
    recalculateVisibleHexes() {
      this.gameState.visibleHexes.clear();
      for (const tank of this.gameState.playerTanks) {
        if (!tank.visible) continue;
        for (const hex of this.gameState.hexes.values()) {
          if (tank.p.gridDistance(hex.p) <= this.config.visibilityRange) {
            this.gameState.visibleHexes.add(hex.p.toString());
          }
        }
      }
    }
    getCollidingTank(p) {
      const gridP = this.displayDriver.screenToGridCoords(p);
      for (const tank of this.gameState.playerTanks) {
        if (tank.visible && tank.p.eq(gridP)) {
          return tank;
        }
      }
      return null;
    }
  };
  var ResolverFinish = class {
    constructor(grid) {
      this.grid = grid;
    }
    animate() {
      this.grid.handleEndAnimation();
      this.grid.transition();
    }
  };
  var ResolverIdle = class {
    constructor(grid) {
      this.grid = grid;
    }
    animate() {
      if (this.grid.peekTurnResult() === null) return;
      this.grid.handleStartAnimation();
      this.grid.transition();
    }
  };
  var ResolverError = class {
    constructor(grid) {
      this.grid = grid;
    }
    animate() {
      this.grid.transition();
    }
  };
  function areaUnderLine(y1, y2, t) {
    if (t <= 0) return 0;
    const low = Math.min(y1, y2);
    const diff = Math.abs(y1 - y2);
    const rect = low * t;
    if (t >= 1) return low + diff / 2;
    if (y1 <= y2) {
      return rect + t * t * diff / 2;
    }
    return rect + (1 - (1 - t) * (1 - t)) * diff / 2;
  }
  function normalize360(angle) {
    while (angle < 0) {
      angle += 360;
    }
    while (angle >= 360) {
      angle -= 360;
    }
    return angle;
  }
  function normalize180(angle) {
    while (angle < -180) {
      angle += 360;
    }
    while (angle >= 180) {
      angle -= 360;
    }
    return angle;
  }
  var ResolverMove2 = class {
    constructor(grid, result, tank) {
      this.grid = grid;
      this.result = result;
      this.startAngle = tank.angleBody;
      this.turretOffset = normalize360(tank.angleTurret - tank.angleBody);
      this.endAngle = unitVectorToIdx(result.p2.sub(result.p1)) * 60;
      this.dAngle = normalize180(this.endAngle - this.startAngle);
      this.tRotation = Math.abs(this.dAngle) / TANK_ROTATION_SPEED * 1e3;
      if (!this.result.start) {
        this.tRotation = 0;
      }
      this.startT = this.grid.curT;
      this.startF = this.result.p1;
      this.endF = this.result.p2;
      const mid = this.startF.add(this.endF).mul(0.5);
      if (this.result.start) {
        this.endF = mid;
      } else {
        this.startF = mid;
      }
      tank.p = this.result.start ? this.result.p1 : this.result.p2;
      this.tank = tank;
      this.grid.recalculateVisibleHexes();
      const d = this.endF.toPlaneCoords().sub(this.startF.toPlaneCoords()).length();
      const aul = areaUnderLine(0, 1, 1);
      this.tMove = d / (aul * TANK_MAX_SPEED) * 1e3;
      this.aul = aul;
      if (result.start) {
        this.y1 = 0;
        this.y2 = 1;
      } else {
        this.y1 = 1;
        this.y2 = 0;
      }
    }
    animate() {
      this.grid.audioDriver.startSound("driving");
      const elapsed = this.grid.curT - this.startT;
      const fracT1 = this.tRotation === 0 ? 1 : elapsed / this.tRotation;
      const fracT2 = (elapsed - this.tRotation) / this.tMove;
      this.animateRotation(fracT1);
      if (fracT2 >= 0) {
        this.animateMove(fracT2);
      }
    }
    animateRotation(fracT) {
      if (fracT <= 0) {
        this.tank.angleBody = this.startAngle;
        this.tank.angleTurret = normalize360(this.startAngle + this.turretOffset);
        return;
      }
      if (fracT >= 1) {
        this.tank.angleBody = this.endAngle;
        this.tank.angleTurret = normalize360(this.endAngle + this.turretOffset);
        return;
      }
      this.tank.angleBody = normalize360(this.startAngle + fracT * this.dAngle);
      this.tank.angleTurret = normalize360(
        this.tank.angleBody + this.turretOffset
      );
    }
    animateMove(fracT) {
      const frac = areaUnderLine(this.y1, this.y2, fracT) / this.aul;
      const p = this.startF.interpolate(this.endF, frac);
      this.tank.pF = p;
      if (frac >= 1) {
        this.grid.audioDriver.endSound("driving");
        this.grid.transition();
      }
    }
  };
  var ResolverMove3 = class {
    constructor(grid, result, tank) {
      this.grid = grid;
      this.result = result;
      const v1 = result.p2.sub(result.p1);
      const v2 = result.p3.sub(result.p2);
      this.turnType = 1 /* Wide */;
      this.low = 0.7;
      if (v1.eq(v2)) {
        this.turnType = 0 /* Straight */;
        this.low = 1;
      } else if (result.p1.gridDistance(result.p3) === 1) {
        this.turnType = 2 /* Sharp */;
        this.low = 0.3;
      }
      this.startAngle = unitVectorToIdx(v1) * 60;
      this.turretOffset = normalize360(tank.angleTurret - tank.angleBody);
      this.endAngle = unitVectorToIdx(v2) * 60;
      this.dAngle = normalize180(this.endAngle - this.startAngle);
      this.startT = this.grid.curT;
      this.p2 = result.p2;
      this.p1 = result.p1.add(result.p2).mul(0.5);
      this.p3 = result.p3.add(result.p2).mul(0.5);
      tank.p = this.p2;
      this.tank = tank;
      this.grid.recalculateVisibleHexes();
      const d1 = this.p2.toPlaneCoords().sub(this.p1.toPlaneCoords()).length();
      const d2 = this.p3.toPlaneCoords().sub(this.p2.toPlaneCoords()).length();
      const d = d1 + d2;
      const aul = areaUnderLine(1, this.low, 1);
      this.aul = aul;
      this.t = d / (aul * TANK_MAX_SPEED) * 1e3;
      const p1 = result.p1.add(result.p2).mul(0.5);
      const p5 = result.p2.add(result.p3).mul(0.5);
      const p2 = result.p2.add(p1.sub(result.p2).mul(0.7));
      const p4 = result.p2.add(p5.sub(result.p2).mul(0.7));
      const midToStart = p1.sub(result.p2);
      const midToEnd = p5.sub(result.p2);
      const p3 = result.p2.add(midToStart.add(midToEnd).mul(0.25));
      this.points = [p1, p2, p3, p4, p5];
      const lengths = [p2.sub(p1), p3.sub(p2), p4.sub(p3), p5.sub(p4)].map(
        (p) => p.toPlaneCoords().length()
      );
      const sum = lengths.reduce((s, l) => s + l, 0);
      this.fracs = [];
      let cur = 0;
      for (const l of lengths) {
        cur += l / sum;
        this.fracs.push(cur);
      }
    }
    animate() {
      this.grid.audioDriver.startSound("driving");
      const fracT = (this.grid.curT - this.startT) / this.t;
      let area = areaUnderLine(1, this.low, fracT * 2) / 2;
      if (fracT >= 0.5) {
        area += areaUnderLine(this.low, 1, (fracT - 0.5) * 2) / 2;
      }
      const frac = area / this.aul;
      this.tank.pF = interpolatePath(this.points, this.fracs, frac);
      const angleBody = normalize360(this.startAngle + fracT * this.dAngle);
      const angleTurret = normalize360(angleBody + this.turretOffset);
      this.tank.angleBody = angleBody;
      this.tank.angleTurret = angleTurret;
      if (fracT >= 1) {
        this.grid.audioDriver.endSound("driving");
        this.tank.pF = this.p3;
        this.tank.angleBody = this.endAngle;
        this.tank.angleTurret = normalize360(this.endAngle + this.turretOffset);
        this.grid.transition();
      }
    }
  };
  var ResolverFire = class {
    constructor(grid, result, tank) {
      this.playedFiringSound = false;
      this.grid = grid;
      this.tank = tank;
      this.startT = this.grid.curT;
      this.startAngle = tank.angleBody;
      this.turretOffset = normalize180(tank.angleTurret - tank.angleBody);
      this.endAngle = unitVectorToIdx(result.dir) * 60;
      const absAngleBetweenBodyAndDir = Math.abs(
        normalize180(this.endAngle - tank.angleBody)
      );
      if (absAngleBetweenBodyAndDir < 90) {
        this.dAngleBody = 0;
        this.dAngleTurret = normalize180(this.endAngle - tank.angleTurret);
        this.turretOnly = true;
        this.tRotation = Math.abs(this.dAngleTurret) / TANK_ROTATION_SPEED * 1e3;
      } else {
        this.dAngleBody = normalize180(this.endAngle - this.startAngle);
        this.dAngleTurret = -this.turretOffset;
        this.turretOnly = false;
        this.tRotation = Math.max(Math.abs(this.dAngleBody), Math.abs(this.dAngleTurret)) / TANK_ROTATION_SPEED * 1e3;
      }
      this.tFiring = FIRING_DURATION;
      this.tPause = FIRING_PAUSE;
      this.pFiring = this.tank.p.add(result.dir.mul(0.3));
    }
    animate() {
      const elapsed = this.grid.curT - this.startT;
      const fracT1 = this.tRotation === 0 ? 1 : elapsed / this.tRotation;
      const fracT2 = (elapsed - this.tRotation - this.tPause) / this.tFiring;
      this.animateRotation(fracT1);
      if (fracT2 >= 0) {
        this.animateFiring(fracT2);
      }
    }
    playFireSound() {
      if (this.playedFiringSound) {
        return;
      }
      this.playedFiringSound = true;
      this.grid.audioDriver.playSoundEffect("tank-firing");
    }
    animateFiring(frac) {
      this.playFireSound();
      this.grid.gameState.cameraShake = getCameraShake(frac).mul(0.04);
      if (frac >= 1) {
        this.grid.gameState.cameraShake = Vector.zero();
        this.grid.gameState.firingExplosion.frac = 0;
        this.grid.transition();
        return;
      }
      if (frac <= 0 || frac >= 1) {
        this.grid.gameState.firingExplosion.frac = 0;
        return;
      }
      this.grid.gameState.firingExplosion.frac = frac;
      this.grid.gameState.firingExplosion.p = this.pFiring;
    }
    animateRotation(frac) {
      if (frac <= 0) {
        return;
      }
      if (frac >= 1) {
        this.grid.audioDriver.endSound("turret-rotation");
        this.grid.audioDriver.endSound("driving");
        if (this.turretOnly) {
          this.tank.angleBody = this.startAngle;
          this.tank.angleTurret = this.endAngle;
          return;
        }
        this.tank.angleBody = this.endAngle;
        this.tank.angleTurret = this.endAngle;
        return;
      }
      if (this.turretOnly) {
        this.grid.audioDriver.startSound("turret-rotation");
        this.tank.angleBody = this.startAngle;
        this.tank.angleTurret = normalize360(
          this.startAngle + this.turretOffset + frac * this.dAngleTurret
        );
        return;
      }
      this.grid.audioDriver.startSound("driving");
      if (Math.abs(this.turretOffset) > 1) {
        this.grid.audioDriver.startSound("turret-rotation");
      }
      this.tank.angleBody = normalize360(
        this.startAngle + frac * this.dAngleBody
      );
      this.tank.angleTurret = normalize360(
        this.tank.angleBody + this.turretOffset + frac * this.dAngleTurret
      );
    }
  };
  var ResolverExplosion = class {
    constructor(grid, result, tank) {
      this.markAfter = 0.16;
      this.marked = false;
      this.playedExplosionSound = false;
      this.grid = grid;
      if (tank !== void 0) {
        this.tank = tank;
      }
      this.startT = this.grid.curT;
      this.p = result.p;
      this.tPause = EXPLOSION_PAUSE_DURATION;
      this.tExplosion = EXPLOSION_DURATION;
    }
    animate() {
      let fracExplosion = (this.grid.curT - this.startT - this.tPause) / this.tExplosion;
      let frac = (this.grid.curT - this.startT) / (this.tExplosion + 2 * this.tPause);
      if (!this.playedExplosionSound && fracExplosion >= 0) {
        this.playedExplosionSound = true;
        this.grid.audioDriver.playSoundEffect("explosion");
      }
      fracExplosion = Math.max(fracExplosion, 0);
      this.animateExplosion(fracExplosion);
      if (frac >= 1) {
        this.grid.gameState.cameraShake = Vector.zero();
        this.grid.recalculateVisibleHexes();
        this.grid.transition();
      }
    }
    animateExplosion(frac) {
      this.grid.gameState.cameraShake = getCameraShake(frac).mul(0.1);
      this.grid.gameState.explosion.frac = frac;
      this.grid.gameState.explosion.p = this.p;
      if (this.tank !== void 0 && !this.marked && frac >= this.markAfter) {
        this.marked = true;
        this.tank.visible = false;
        this.grid.gameState.overlays.push(newSmokeMark(this.tank.p));
      }
      if (frac >= 1) {
        this.grid.gameState.explosion.frac = 0;
      }
    }
  };
  var ResolverShrink = class {
    constructor(grid, result) {
      this.duration = SHRINK_DURATION;
      this.grid = grid;
      this.result = result;
      this.startT = this.result.started ? this.grid.curT : 0;
      this.center = this.grid.config.center;
    }
    animate() {
      if (!this.result.started) {
        this.markShrinkingNext();
        this.grid.transition();
        return;
      }
      const frac = (this.grid.curT - this.startT) / this.duration;
      if (frac < 0) return;
      if (frac >= 1) {
        for (const [key, hex] of this.grid.gameState.hexes.entries()) {
          if (hex.p.gridDistance(this.center) >= this.result.r) {
            this.grid.gameState.hexes.delete(key);
          }
        }
        this.grid.transition();
        return;
      }
      this.animateShrinking(frac);
    }
    markShrinkingNext() {
      for (const hex of this.grid.gameState.hexes.values()) {
        if (hex.p.gridDistance(this.center) == this.result.r) {
          this.grid.gameState.overlays.push(newShrinkMark(hex.p));
        }
      }
    }
    animateShrinking(frac) {
      const opacity = 1 - frac;
      for (const hex of this.grid.gameState.hexes.values()) {
        if (hex.p.gridDistance(this.center) >= this.result.r) {
          hex.opacity = opacity;
        }
      }
    }
  };
  var ResolverRest = class {
    constructor(grid) {
      this.grid = grid;
      this.turnResult = this.grid.curResult;
    }
    animate() {
      switch (this.turnResult.type) {
        case 6 /* Visible */:
          this.resolveVisibility(this.turnResult);
          break;
        case 5 /* Destroyed */:
          this.resolveDestroyed(this.turnResult);
          break;
        case 7 /* Shrink */:
          if (this.turnResult.started) {
            for (const [key, hex] of this.grid.gameState.hexes.entries()) {
              if (hex.p.gridDistance(this.grid.config.center) >= this.turnResult.r) {
                this.grid.gameState.hexes.delete(key);
              }
            }
          }
          break;
      }
      this.grid.recalculateVisibleHexes();
      this.grid.transition();
    }
    resolveDestroyed(res) {
      const tank = getTankById(this.grid.gameState.enemyTanks, res.id);
      if (tank === null) return;
      tank.visible = false;
      this.grid.gameState.overlays.push(newSmokeMark(res.p));
    }
    resolveVisibility(res) {
      const tank = getTankById(this.grid.gameState.enemyTanks, res.id);
      if (tank === null) return;
      tank.p = res.p;
      tank.pF = res.p;
      tank.visible = res.visible;
    }
  };
  function getCameraShake(frac) {
    if (frac <= 0 || frac >= 1) {
      return Vector.zero();
    }
    const mid = 0.25;
    const x = 5.5 * Math.sin(20.8 * Math.PI * frac + 2.3) + 2.2 * Math.sin(5.6 * Math.PI * frac + 5) + 1.8 * Math.sin(11.2 * Math.PI * frac + 1);
    const y = 4 * Math.sin(17.6 * Math.PI * frac - 2.5) + 2.8 * Math.sin(9.6 * Math.PI * frac + 4) + 1.6 * Math.sin(1.6 * Math.PI * frac + 0);
    const lim = frac <= mid ? 1 / mid * frac : 1 - (frac - mid) / (1 - mid);
    return new Vector(x, y).mul(lim);
  }

  // src/notifier.ts
  var Notifier = class {
    constructor(receiver) {
      this.receiver = receiver;
    }
    notify(event) {
      this.receiver.update(event);
    }
  };

  // src/ws-driver.ts
  function vectorReviver(key, value) {
    if (typeof value === "object" && "x" in value && "y" in value) {
      return new Vector(value.x, value.y);
    }
    return value;
  }
  var WsDriver = class {
    constructor(url, notifier) {
      this.open = false;
      this.notifier = notifier;
      this.conn = new WebSocket(url);
      this.conn.onopen = () => this.handleOpen();
      this.conn.onclose = () => this.handleClose();
      this.conn.onmessage = (e) => this.handleMessage(e);
    }
    send(msg) {
      if (!this.open) {
        return;
      }
      this.conn.send(JSON.stringify(msg));
    }
    sendStartGame(code) {
      const msg = {
        type: 1 /* JoinRoom */,
        roomCode: code
      };
      this.send(msg);
    }
    sendActions(actions) {
      const msg = {
        type: 2 /* SendTurn */,
        actions
      };
      this.send(msg);
    }
    sendQuitRoom() {
      const msg = {
        type: 3 /* QuitRoom */
      };
      this.send(msg);
    }
    handleOpen() {
      this.open = true;
      this.notifier.notify({ type: 3 /* WsOpen */ });
    }
    handleClose() {
      this.open = false;
      this.notifier.notify({ type: 4 /* WsClose */ });
    }
    handleMessage(e) {
      const msg = JSON.parse(e.data, vectorReviver);
      switch (msg.type) {
        case 1 /* StartGame */:
          this.notifier.notify({
            type: 0 /* StartGame */,
            config: msg.config
          });
          break;
        case 2 /* TurnResults */:
          this.notifier.notify({
            type: 1 /* ReceiveTurnResults */,
            turnResults: msg.turnResults
          });
          break;
        case 3 /* RoomJoined */:
          this.notifier.notify({
            type: 5 /* RoomJoined */
          });
          break;
        case 4 /* RoomDisconnected */:
          this.notifier.notify({
            type: 6 /* RoomDisconnected */
          });
          break;
        case 5 /* GameFinished */:
          this.notifier.notify({
            type: 2 /* GameFinished */,
            result: msg.result
          });
          break;
      }
    }
  };

  // src/audio-driver.ts
  var AUDIO_PATH = "/assets/sounds.mp3";
  var AudioCtx = window.AudioContext || window.webkitAudioContext;
  var CONFIG = {
    driving: { loopStart: 1, loopEnd: 15 },
    "turret-rotation": { loopStart: 19.5, loopEnd: 23 },
    "tank-firing": { start: 24.88, length: 1.1 },
    explosion: { start: 29, length: 4 }
  };
  var AudioDriver = class {
    constructor(notifier) {
      this.audioCtx = new AudioCtx();
      this.nodes = null;
      this.cachedGainLevels = {
        global: 0,
        game: 0
      };
      this.handleLoaded = (audio) => {
        this.nodes = this.getNodes(audio);
        this.notifier.notify({ type: 18 /* AudioLoadSuccess */ });
      };
      this.handleFail = () => {
        this.notifier.notify({ type: 17 /* AudioLoadFail */ });
      };
      fetch(AUDIO_PATH).then((r) => r.arrayBuffer()).then((b) => this.audioCtx.decodeAudioData(b)).then((a) => this.handleLoaded(a)).catch(this.handleFail);
      this.notifier = notifier;
    }
    getNodes(audioBuffer) {
      const masterSilencer = this.audioCtx.createGain();
      masterSilencer.gain.value = 0.4;
      const gainGlobal = this.audioCtx.createGain();
      gainGlobal.gain.value = this.cachedGainLevels.global;
      const gainGame = this.audioCtx.createGain();
      gainGame.gain.value = this.cachedGainLevels.game;
      const ambient = this.audioCtx.createBufferSource();
      ambient.buffer = audioBuffer;
      ambient.loopStart = 34.1;
      ambient.loopEnd = 37.2;
      ambient.loop = true;
      ambient.playbackRate.value = 0.85;
      ambient.start(0, 34.1);
      const silencerNode = this.audioCtx.createGain();
      silencerNode.gain.value = 0.2;
      const drivingGain = this.audioCtx.createGain();
      drivingGain.gain.value = 0;
      drivingGain.connect(gainGame);
      const drivingSourceNode = this.audioCtx.createBufferSource();
      drivingSourceNode.buffer = audioBuffer;
      drivingSourceNode.loopStart = CONFIG["driving"].loopStart;
      drivingSourceNode.loopEnd = CONFIG["driving"].loopEnd;
      drivingSourceNode.loop = true;
      drivingSourceNode.connect(drivingGain);
      drivingSourceNode.start(0, CONFIG["driving"].loopStart);
      const turretRotationGain = this.audioCtx.createGain();
      turretRotationGain.gain.value = 0;
      turretRotationGain.connect(gainGame);
      const turretRotationSourceNode = this.audioCtx.createBufferSource();
      turretRotationSourceNode.buffer = audioBuffer;
      turretRotationSourceNode.loopStart = CONFIG["turret-rotation"].loopStart;
      turretRotationSourceNode.loopEnd = CONFIG["turret-rotation"].loopEnd;
      turretRotationSourceNode.loop = true;
      turretRotationSourceNode.connect(turretRotationGain);
      turretRotationSourceNode.start(0, CONFIG["turret-rotation"].loopStart);
      masterSilencer.connect(this.audioCtx.destination);
      gainGlobal.connect(masterSilencer);
      gainGame.connect(gainGlobal);
      silencerNode.connect(gainGame);
      ambient.connect(silencerNode);
      return {
        audioBuffer,
        gainGame,
        gainGlobal,
        ambient,
        driving: drivingGain,
        "turret-rotation": turretRotationGain,
        "tank-firing": null,
        explosion: null
      };
    }
    setSoundInGame(play) {
      if (this.nodes === null) {
        this.cachedGainLevels.game = play ? 1 : 0;
        return;
      }
      this.nodes.gainGame.gain.value = play ? 1 : 0;
      if (play && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
    }
    setSoundGlobal(play) {
      if (this.nodes === null) {
        this.cachedGainLevels.global = play ? 1 : 0;
        return;
      }
      this.nodes.gainGlobal.gain.value = play ? 1 : 0;
      if (play && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
    }
    startSound(sound) {
      if (this.nodes === null) return;
      this.nodes[sound].gain.value = 1;
    }
    endSound(sound) {
      if (this.nodes === null) return;
      this.nodes[sound].gain.value = 0;
    }
    playSoundEffect(sound) {
      if (this.nodes === null) {
        return;
      }
      if (this.nodes[sound] !== null) {
        this.nodes[sound].disconnect();
      }
      const node = this.audioCtx.createBufferSource();
      node.buffer = this.nodes.audioBuffer;
      node.connect(this.nodes.gainGame);
      node.start(0, CONFIG[sound].start, CONFIG[sound].length);
      this.nodes[sound] = node;
    }
  };

  // src/game.ts
  var WS_URL = "ws";
  var AUDIO_FAIL_MESSAGE = "failed to load audio";
  function resultString(result) {
    switch (result) {
      case 1 /* Win */:
        return "you won!";
      case 2 /* Draw */:
        return "draw";
      case 3 /* Lose */:
        return "you lost...";
    }
  }
  function elementToScreenCoords(elementP) {
    return elementP.mul(window.devicePixelRatio).round();
  }
  var Game = class {
    constructor(ctx2) {
      this.grid = null;
      this.isPointerDown = false;
      this.layer = 0 /* UI */;
      this.freeze = false;
      this.notifier = new Notifier(this);
      this.audioDriver = new AudioDriver(this.notifier);
      this.wsDriver = new WsDriver(WS_URL, this.notifier);
      const canvas2 = ctx2.canvas;
      this.initEventListeners(canvas2);
      const inputElement = this.createInputElement();
      ctx2.canvas.parentNode?.insertBefore(inputElement, null);
      this.ui = new UI(this.notifier, inputElement);
      this.displayDriver = new DisplayDriver(ctx2, null, this.ui);
      window.addEventListener("resize", () => {
        this.resize();
      });
      this.resize();
      this.states = {
        mainMenu: new GameStateMainMenu(this),
        waitingForRoom: new GameStateWaitForRoom(this),
        waitingRoom: new GameStateWaitingRoom(this),
        inGame: new GameStateInGame(this)
      };
      this.state = this.states.mainMenu;
    }
    update(event) {
      this.state.update(event);
    }
    setState(state) {
      this.state = state;
      this.state.onEnter();
    }
    run() {
      this.draw(0);
    }
    initEventListeners(canvas2) {
      canvas2.addEventListener("pointerdown", (e) => {
        const screenP = elementToScreenCoords(new Vector(e.offsetX, e.offsetY));
        this.handlePointerStart(screenP);
      });
      canvas2.addEventListener("pointerup", (e) => {
        const screenP = elementToScreenCoords(new Vector(e.offsetX, e.offsetY));
        this.handlePointerEnd(screenP);
      });
      canvas2.addEventListener("pointermove", (e) => {
        const screenP = elementToScreenCoords(new Vector(e.offsetX, e.offsetY));
        this.handlePointerMove(screenP);
      });
      canvas2.addEventListener("wheel", (e) => {
        if (e.deltaY > 0) {
          this.handleZoomOut();
          return;
        }
        this.handleZoomIn();
      });
    }
    createInputElement() {
      const e = document.createElement("input");
      e.setAttribute("id", "in-game-input");
      e.setAttribute("type", "text");
      e.setAttribute("placeholder", "code");
      return e;
    }
    initGrid(config) {
      const gameState = new GameState2(config);
      this.grid = new Grid(
        gameState,
        this.displayDriver,
        config,
        this.notifier,
        this.audioDriver
      );
      this.displayDriver.gameState = gameState;
      this.displayDriver.reset();
    }
    removeGrid() {
      this.grid = null;
      this.displayDriver.gameState = null;
    }
    handleZoomIn() {
      this.displayDriver.handleZoomIn();
    }
    handleZoomOut() {
      this.displayDriver.handleZoomOut();
    }
    handlePointerStart(p) {
      this.isPointerDown = true;
      this.layer = this.ui.collides(p) ? 0 /* UI */ : 1 /* Grid */;
      if (this.layer === 0 /* UI */) {
        this.ui.handlePointerStart(p);
      } else {
        this.grid?.handlePointerStart(p);
      }
    }
    handlePointerEnd(p) {
      this.isPointerDown = false;
      if (this.layer === 0 /* UI */) {
        this.ui.handlePointerEnd(p);
      } else {
        this.grid?.handlePointerEnd(p);
      }
      this.layer = 0 /* UI */;
    }
    handlePointerMove(p) {
      if (!this.isPointerDown) return;
      if (this.layer === 0 /* UI */) {
        this.ui.handlePointerMove(p);
      } else {
        this.grid?.handlePointerMove(p);
      }
    }
    draw(curT) {
      this.displayDriver.draw(this.freeze);
      this.grid?.setT(curT);
      this.grid?.tick();
      requestAnimationFrame((t) => {
        this.draw(t);
      });
    }
    resize() {
      this.displayDriver.resize();
    }
  };
  var GameStateMainMenu = class {
    constructor(game2) {
      this.str = "main-menu";
      this.game = game2;
    }
    onEnter() {
      this.game.audioDriver.setSoundGlobal(false);
    }
    update(event) {
      switch (event.type) {
        case 3 /* WsOpen */:
          this.game.ui.setOnlineGameAvailability(true);
          break;
        case 4 /* WsClose */:
          this.game.freeze = false;
          this.game.ui.setOnlineGameAvailability(false);
          this.game.ui.addModal("connection lost");
          break;
        case 10 /* ButtonJoinRoom */:
          const code = this.game.ui.getRoomCode();
          this.game.wsDriver.sendStartGame(code);
          this.game.freeze = true;
          this.game.setState(this.game.states.waitingForRoom);
          break;
        case 17 /* AudioLoadFail */:
          this.game.ui.addModal(AUDIO_FAIL_MESSAGE);
          break;
        case 18 /* AudioLoadSuccess */:
          this.game.ui.allowUnmute();
          break;
      }
    }
  };
  var GameStateWaitForRoom = class {
    constructor(game2) {
      this.str = "wait-for-room";
      this.game = game2;
    }
    onEnter() {
      this.game.audioDriver.setSoundGlobal(false);
    }
    update(event) {
      switch (event.type) {
        case 3 /* WsOpen */:
          this.game.ui.setOnlineGameAvailability(true);
          break;
        case 4 /* WsClose */:
          this.game.freeze = false;
          this.game.ui.setOnlineGameAvailability(false);
          this.game.ui.addModal("connection lost");
          this.game.setState(this.game.states.mainMenu);
          break;
        case 5 /* RoomJoined */:
          this.game.freeze = false;
          this.game.ui.enableMode(1 /* WaitingRoom */);
          this.game.setState(this.game.states.waitingRoom);
          break;
        case 6 /* RoomDisconnected */:
          this.game.freeze = false;
          this.game.ui.addModal("cant join room");
          this.game.setState(this.game.states.mainMenu);
          break;
        case 17 /* AudioLoadFail */:
          this.game.ui.addModal(AUDIO_FAIL_MESSAGE);
          break;
        case 18 /* AudioLoadSuccess */:
          this.game.ui.allowUnmute();
          break;
      }
    }
  };
  var GameStateWaitingRoom = class {
    constructor(game2) {
      this.str = "waiting-room";
      this.game = game2;
    }
    onEnter() {
      this.game.audioDriver.setSoundGlobal(false);
    }
    update(event) {
      switch (event.type) {
        case 3 /* WsOpen */:
          this.game.ui.setOnlineGameAvailability(true);
          break;
        case 4 /* WsClose */:
          this.game.ui.setOnlineGameAvailability(false);
          this.game.ui.addModal("connection lost");
          this.game.ui.enableMode(0 /* Main */);
          this.game.setState(this.game.states.mainMenu);
          break;
        case 0 /* StartGame */:
          this.game.initGrid(event.config);
          this.game.ui.enableMode(2 /* InGame */);
          this.game.setState(this.game.states.inGame);
          break;
        case 6 /* RoomDisconnected */:
          this.game.ui.addModal("room disconnected");
          this.game.ui.enableMode(0 /* Main */);
          this.game.setState(this.game.states.mainMenu);
          this.game.freeze;
          break;
        case 12 /* ButtonQuitGame */:
          this.game.wsDriver.sendQuitRoom();
          this.game.ui.enableMode(0 /* Main */);
          this.game.setState(this.game.states.mainMenu);
          break;
        case 17 /* AudioLoadFail */:
          this.game.ui.addModal(AUDIO_FAIL_MESSAGE);
          break;
        case 18 /* AudioLoadSuccess */:
          this.game.ui.allowUnmute();
          break;
      }
    }
  };
  var GameStateInGame = class {
    constructor(game2) {
      this.isAnimating = false;
      this.str = "in-game";
      this.modalQueue = [];
      this.gameFinished = false;
      this.counterIncoming = 0;
      this.counterFinished = 0;
      this.game = game2;
    }
    onEnter() {
      this.game.audioDriver.setSoundGlobal(true);
      this.isAnimating = false;
      this.modalQueue = [];
      this.gameFinished = false;
      this.counterIncoming = 0;
      this.counterFinished = 0;
      this.game.ui.setSendTurnAvailability(true);
    }
    update(event) {
      switch (event.type) {
        case 1 /* ReceiveTurnResults */:
          this.counterIncoming++;
          this.game.grid?.pushResults(event.turnResults);
          this.game.ui.setSendTurnAvailability(false);
          this.isAnimating = true;
          break;
        case 2 /* GameFinished */:
          this.gameFinished = true;
          this.game.ui.setSendTurnAvailability(false);
          if (this.isAnimating) {
            this.modalQueue.push(resultString(event.result));
            return;
          }
          this.game.ui.addModal(resultString(event.result));
          break;
        case 4 /* WsClose */:
          this.game.ui.setSendTurnAvailability(false);
          this.game.ui.setOnlineGameAvailability(false);
          this.game.ui.addModal("server disconnected");
          this.game.removeGrid();
          this.game.ui.enableMode(0 /* Main */);
          this.game.setState(this.game.states.mainMenu);
          break;
        case 6 /* RoomDisconnected */:
          this.game.ui.setSendTurnAvailability(false);
          if (this.gameFinished) {
            return;
          }
          if (this.isAnimating) {
            this.modalQueue.push("room disconnected");
            return;
          }
          this.game.ui.addModal("room disconnected");
          this.game.removeGrid();
          this.game.ui.enableMode(0 /* Main */);
          this.game.setState(this.game.states.mainMenu);
          break;
        case 8 /* ButtonZoomIn */:
          this.game.handleZoomIn();
          break;
        case 9 /* ButtonZoomOut */:
          this.game.handleZoomOut();
          break;
        case 12 /* ButtonQuitGame */:
          if (!this.gameFinished) {
            this.game.wsDriver.sendQuitRoom();
          }
          this.game.removeGrid();
          this.game.ui.enableMode(0 /* Main */);
          this.game.setState(this.game.states.mainMenu);
          break;
        case 11 /* ButtonSendTurn */:
          if (this.game.grid === null) return;
          this.game.ui.setSendTurnAvailability(false);
          const actions = this.game.grid.getActions();
          this.game.wsDriver.sendActions(actions);
          break;
        case 15 /* AnimationEnd */:
          this.counterFinished++;
          if (this.counterFinished === this.counterIncoming) {
            this.isAnimating = false;
            this.game.ui.setSendTurnAvailability(!this.gameFinished);
            for (const modalText of this.modalQueue) {
              this.game.ui.addModal(modalText);
            }
          }
          break;
        case 16 /* TankManipulation */:
          if (!this.gameFinished && !this.isAnimating) {
            this.game.ui.setSendTurnAvailability(true);
          }
          break;
        case 17 /* AudioLoadFail */:
          this.game.ui.addModal(AUDIO_FAIL_MESSAGE);
          break;
        case 18 /* AudioLoadSuccess */:
          this.game.ui.allowUnmute();
          break;
        case 13 /* ButtonUnmute */:
          this.game.ui.setAudioButton(true);
          this.game.audioDriver.setSoundInGame(true);
          break;
        case 14 /* ButtonMute */:
          this.game.ui.setAudioButton(false);
          this.game.audioDriver.setSoundInGame(false);
          break;
      }
    }
  };

  // src/app.ts
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var game = new Game(ctx);
  game.run();
})();
