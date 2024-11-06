import { Vector } from "./vector.js";

export const SPRITES_96 = {
  hexSize: new Vector(96, 56),
  hexes: {
    light: [
      {
        start: new Vector(0, 836),
        size: new Vector(96, 64),
        offset: new Vector(-48, -28),
      },
      {
        start: new Vector(101, 64),
        size: new Vector(96, 64),
        offset: new Vector(-48, -28),
      },
      {
        start: new Vector(101, 192),
        size: new Vector(96, 64),
        offset: new Vector(-48, -28),
      },
    ],
    dark: [
      {
        start: new Vector(101, 0),
        size: new Vector(96, 64),
        offset: new Vector(-48, -28),
      },
      {
        start: new Vector(101, 128),
        size: new Vector(96, 64),
        offset: new Vector(-48, -28),
      },
      {
        start: new Vector(101, 256),
        size: new Vector(96, 64),
        offset: new Vector(-48, -28),
      },
    ],
  },
  overlays: {
    paths: [
      {
        "01": {
          start: new Vector(578, 573),
          size: new Vector(50, 28),
          offset: new Vector(-2, -5),
        },
        "02": {
          start: new Vector(376, 28),
          size: new Vector(77, 28),
          offset: new Vector(-29, -5),
        },
        "04": {
          start: new Vector(376, 112),
          size: new Vector(77, 28),
          offset: new Vector(-29, -23),
        },
        "05": {
          start: new Vector(578, 657),
          size: new Vector(50, 28),
          offset: new Vector(-2, -23),
        },
        "12": {
          start: new Vector(518, 754),
          size: new Vector(58, 23),
          offset: new Vector(-29, 0),
        },
        "13": {
          start: new Vector(376, 196),
          size: new Vector(77, 28),
          offset: new Vector(-48, -5),
        },
        "15": {
          start: new Vector(802, 810),
          size: new Vector(30, 46),
          offset: new Vector(-1, -23),
        },
        "23": {
          start: new Vector(578, 741),
          size: new Vector(50, 28),
          offset: new Vector(-48, -5),
        },
        "24": {
          start: new Vector(833, 0),
          size: new Vector(30, 46),
          offset: new Vector(-29, -23),
        },
        "34": {
          start: new Vector(578, 825),
          size: new Vector(50, 28),
          offset: new Vector(-48, -23),
        },
        "35": {
          start: new Vector(289, 895),
          size: new Vector(77, 28),
          offset: new Vector(-48, -23),
        },
        "45": {
          start: new Vector(376, 930),
          size: new Vector(58, 23),
          offset: new Vector(-29, -23),
        },
        "0": {
          start: new Vector(0, 945),
          size: new Vector(48, 10),
          offset: new Vector(0, -5),
        },
        "1": {
          start: new Vector(727, 730),
          size: new Vector(35, 25),
          offset: new Vector(-6, -2),
        },
        "2": {
          start: new Vector(727, 805),
          size: new Vector(35, 25),
          offset: new Vector(-29, -2),
        },
        "3": {
          start: new Vector(578, 938),
          size: new Vector(48, 10),
          offset: new Vector(-48, -5),
        },
        "4": {
          start: new Vector(727, 880),
          size: new Vector(35, 25),
          offset: new Vector(-29, -23),
        },
        "5": {
          start: new Vector(767, 0),
          size: new Vector(35, 25),
          offset: new Vector(-6, -23),
        },
        arrowR: {
          start: new Vector(727, 480),
          size: new Vector(36, 22),
          offset: new Vector(-12, -11),
        },
        arrowL: {
          start: new Vector(727, 546),
          size: new Vector(36, 22),
          offset: new Vector(-24, -11),
        },
      },
      {
        "01": {
          start: new Vector(578, 601),
          size: new Vector(50, 28),
          offset: new Vector(-2, -5),
        },
        "02": {
          start: new Vector(376, 56),
          size: new Vector(77, 28),
          offset: new Vector(-29, -5),
        },
        "04": {
          start: new Vector(376, 140),
          size: new Vector(77, 28),
          offset: new Vector(-29, -23),
        },
        "05": {
          start: new Vector(578, 685),
          size: new Vector(50, 28),
          offset: new Vector(-2, -23),
        },
        "12": {
          start: new Vector(518, 777),
          size: new Vector(58, 23),
          offset: new Vector(-29, 0),
        },
        "13": {
          start: new Vector(376, 224),
          size: new Vector(77, 28),
          offset: new Vector(-48, -5),
        },
        "15": {
          start: new Vector(802, 856),
          size: new Vector(30, 46),
          offset: new Vector(-1, -23),
        },
        "23": {
          start: new Vector(578, 769),
          size: new Vector(50, 28),
          offset: new Vector(-48, -5),
        },
        "24": {
          start: new Vector(833, 46),
          size: new Vector(30, 46),
          offset: new Vector(-29, -23),
        },
        "34": {
          start: new Vector(578, 853),
          size: new Vector(50, 28),
          offset: new Vector(-48, -23),
        },
        "35": {
          start: new Vector(289, 923),
          size: new Vector(77, 28),
          offset: new Vector(-48, -23),
        },
        "45": {
          start: new Vector(453, 926),
          size: new Vector(58, 23),
          offset: new Vector(-29, -23),
        },
        "0": {
          start: new Vector(101, 940),
          size: new Vector(48, 10),
          offset: new Vector(0, -5),
        },
        "1": {
          start: new Vector(727, 755),
          size: new Vector(35, 25),
          offset: new Vector(-6, -2),
        },
        "2": {
          start: new Vector(727, 830),
          size: new Vector(35, 25),
          offset: new Vector(-29, -2),
        },
        "3": {
          start: new Vector(633, 869),
          size: new Vector(48, 10),
          offset: new Vector(-48, -5),
        },
        "4": {
          start: new Vector(727, 905),
          size: new Vector(35, 25),
          offset: new Vector(-29, -23),
        },
        "5": {
          start: new Vector(767, 25),
          size: new Vector(35, 25),
          offset: new Vector(-6, -23),
        },
        arrowR: {
          start: new Vector(727, 502),
          size: new Vector(36, 22),
          offset: new Vector(-12, -11),
        },
        arrowL: {
          start: new Vector(727, 568),
          size: new Vector(36, 22),
          offset: new Vector(-24, -11),
        },
      },
      {
        "01": {
          start: new Vector(578, 629),
          size: new Vector(50, 28),
          offset: new Vector(-2, -5),
        },
        "02": {
          start: new Vector(376, 84),
          size: new Vector(77, 28),
          offset: new Vector(-29, -5),
        },
        "04": {
          start: new Vector(376, 168),
          size: new Vector(77, 28),
          offset: new Vector(-29, -23),
        },
        "05": {
          start: new Vector(578, 713),
          size: new Vector(50, 28),
          offset: new Vector(-2, -23),
        },
        "12": {
          start: new Vector(518, 800),
          size: new Vector(58, 23),
          offset: new Vector(-29, 0),
        },
        "13": {
          start: new Vector(376, 252),
          size: new Vector(77, 28),
          offset: new Vector(-48, -5),
        },
        "15": {
          start: new Vector(802, 902),
          size: new Vector(30, 46),
          offset: new Vector(-1, -23),
        },
        "23": {
          start: new Vector(578, 797),
          size: new Vector(50, 28),
          offset: new Vector(-48, -5),
        },
        "24": {
          start: new Vector(833, 92),
          size: new Vector(30, 46),
          offset: new Vector(-29, -23),
        },
        "34": {
          start: new Vector(578, 881),
          size: new Vector(50, 28),
          offset: new Vector(-48, -23),
        },
        "35": {
          start: new Vector(376, 0),
          size: new Vector(77, 28),
          offset: new Vector(-48, -23),
        },
        "45": {
          start: new Vector(518, 731),
          size: new Vector(58, 23),
          offset: new Vector(-29, -23),
        },
        "0": {
          start: new Vector(518, 942),
          size: new Vector(48, 10),
          offset: new Vector(0, -5),
        },
        "1": {
          start: new Vector(727, 780),
          size: new Vector(35, 25),
          offset: new Vector(-6, -2),
        },
        "2": {
          start: new Vector(727, 855),
          size: new Vector(35, 25),
          offset: new Vector(-29, -2),
        },
        "3": {
          start: new Vector(633, 879),
          size: new Vector(48, 10),
          offset: new Vector(-48, -5),
        },
        "4": {
          start: new Vector(727, 930),
          size: new Vector(35, 25),
          offset: new Vector(-29, -23),
        },
        "5": {
          start: new Vector(767, 50),
          size: new Vector(35, 25),
          offset: new Vector(-6, -23),
        },
        arrowR: {
          start: new Vector(727, 524),
          size: new Vector(36, 22),
          offset: new Vector(-12, -11),
        },
        arrowL: {
          start: new Vector(727, 590),
          size: new Vector(36, 22),
          offset: new Vector(-24, -11),
        },
      },
    ],
    highlights: [
      {
        start: new Vector(197, 94),
        size: new Vector(92, 50),
        offset: new Vector(-46, -25),
      },
      {
        start: new Vector(197, 144),
        size: new Vector(92, 50),
        offset: new Vector(-46, -25),
      },
      {
        start: new Vector(197, 194),
        size: new Vector(92, 50),
        offset: new Vector(-46, -25),
      },
    ],
    aim: [
      {
        start: new Vector(633, 825),
        size: new Vector(48, 22),
        offset: new Vector(0, -11),
      },
      {
        start: new Vector(727, 205),
        size: new Vector(39, 23),
        offset: new Vector(-6, -2),
      },
      {
        start: new Vector(727, 228),
        size: new Vector(39, 23),
        offset: new Vector(-33, -2),
      },
      {
        start: new Vector(633, 847),
        size: new Vector(48, 22),
        offset: new Vector(-48, -11),
      },
      {
        start: new Vector(727, 251),
        size: new Vector(39, 23),
        offset: new Vector(-33, -21),
      },
      {
        start: new Vector(727, 274),
        size: new Vector(39, 23),
        offset: new Vector(-6, -21),
      },
    ],
    markers: {
      light: [
        {
          start: new Vector(0, 900),
          size: new Vector(94, 45),
          offset: new Vector(-46, -21),
        },
        {
          start: new Vector(197, 244),
          size: new Vector(92, 50),
          offset: new Vector(-46, -25),
        },
      ],
      dark: [
        {
          start: new Vector(101, 895),
          size: new Vector(94, 45),
          offset: new Vector(-46, -21),
        },
        {
          start: new Vector(197, 294),
          size: new Vector(92, 50),
          offset: new Vector(-46, -25),
        },
      ],
    },
  },
  tanksBodies: [
    {
      start: new Vector(681, 466),
      size: new Vector(44, 23),
      offset: new Vector(-23, -15),
    },
    {
      start: new Vector(681, 282),
      size: new Vector(46, 24),
      offset: new Vector(-24, -15),
    },
    {
      start: new Vector(633, 729),
      size: new Vector(48, 24),
      offset: new Vector(-25, -15),
    },
    {
      start: new Vector(633, 421),
      size: new Vector(48, 26),
      offset: new Vector(-25, -16),
    },
    {
      start: new Vector(633, 29),
      size: new Vector(48, 28),
      offset: new Vector(-25, -17),
    },
    {
      start: new Vector(633, 57),
      size: new Vector(48, 28),
      offset: new Vector(-25, -17),
    },
    {
      start: new Vector(681, 0),
      size: new Vector(46, 30),
      offset: new Vector(-24, -18),
    },
    {
      start: new Vector(681, 558),
      size: new Vector(43, 31),
      offset: new Vector(-22, -19),
    },
    {
      start: new Vector(681, 914),
      size: new Vector(40, 31),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(727, 332),
      size: new Vector(37, 31),
      offset: new Vector(-19, -19),
    },
    {
      start: new Vector(802, 0),
      size: new Vector(31, 30),
      offset: new Vector(-16, -19),
    },
    {
      start: new Vector(833, 672),
      size: new Vector(27, 30),
      offset: new Vector(-14, -19),
    },
    {
      start: new Vector(890, 243),
      size: new Vector(22, 29),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(863, 124),
      size: new Vector(26, 30),
      offset: new Vector(-13, -19),
    },
    {
      start: new Vector(802, 30),
      size: new Vector(31, 30),
      offset: new Vector(-15, -19),
    },
    {
      start: new Vector(727, 612),
      size: new Vector(35, 31),
      offset: new Vector(-17, -19),
    },
    {
      start: new Vector(727, 0),
      size: new Vector(40, 31),
      offset: new Vector(-19, -19),
    },
    {
      start: new Vector(681, 589),
      size: new Vector(43, 31),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(681, 30),
      size: new Vector(46, 30),
      offset: new Vector(-22, -18),
    },
    {
      start: new Vector(578, 909),
      size: new Vector(48, 29),
      offset: new Vector(-23, -18),
    },
    {
      start: new Vector(633, 85),
      size: new Vector(48, 28),
      offset: new Vector(-23, -17),
    },
    {
      start: new Vector(633, 447),
      size: new Vector(48, 26),
      offset: new Vector(-23, -16),
    },
    {
      start: new Vector(633, 753),
      size: new Vector(48, 24),
      offset: new Vector(-23, -15),
    },
    {
      start: new Vector(681, 306),
      size: new Vector(46, 24),
      offset: new Vector(-22, -15),
    },
    {
      start: new Vector(681, 489),
      size: new Vector(44, 23),
      offset: new Vector(-21, -15),
    },
    {
      start: new Vector(681, 330),
      size: new Vector(46, 24),
      offset: new Vector(-22, -16),
    },
    {
      start: new Vector(633, 629),
      size: new Vector(48, 25),
      offset: new Vector(-23, -16),
    },
    {
      start: new Vector(633, 473),
      size: new Vector(48, 26),
      offset: new Vector(-23, -16),
    },
    {
      start: new Vector(633, 113),
      size: new Vector(48, 28),
      offset: new Vector(-23, -17),
    },
    {
      start: new Vector(633, 141),
      size: new Vector(48, 28),
      offset: new Vector(-23, -17),
    },
    {
      start: new Vector(681, 120),
      size: new Vector(46, 28),
      offset: new Vector(-22, -17),
    },
    {
      start: new Vector(681, 682),
      size: new Vector(43, 28),
      offset: new Vector(-21, -17),
    },
    {
      start: new Vector(727, 93),
      size: new Vector(40, 28),
      offset: new Vector(-19, -16),
    },
    {
      start: new Vector(727, 394),
      size: new Vector(37, 28),
      offset: new Vector(-18, -16),
    },
    {
      start: new Vector(802, 120),
      size: new Vector(31, 28),
      offset: new Vector(-15, -16),
    },
    {
      start: new Vector(833, 732),
      size: new Vector(27, 26),
      offset: new Vector(-13, -15),
    },
    {
      start: new Vector(890, 301),
      size: new Vector(22, 26),
      offset: new Vector(-11, -15),
    },
    {
      start: new Vector(863, 184),
      size: new Vector(26, 26),
      offset: new Vector(-13, -15),
    },
    {
      start: new Vector(802, 148),
      size: new Vector(31, 28),
      offset: new Vector(-16, -16),
    },
    {
      start: new Vector(727, 674),
      size: new Vector(35, 28),
      offset: new Vector(-18, -16),
    },
    {
      start: new Vector(727, 121),
      size: new Vector(40, 28),
      offset: new Vector(-21, -16),
    },
    {
      start: new Vector(681, 710),
      size: new Vector(43, 28),
      offset: new Vector(-22, -17),
    },
    {
      start: new Vector(681, 148),
      size: new Vector(46, 28),
      offset: new Vector(-24, -17),
    },
    {
      start: new Vector(633, 169),
      size: new Vector(48, 28),
      offset: new Vector(-25, -17),
    },
    {
      start: new Vector(633, 197),
      size: new Vector(48, 28),
      offset: new Vector(-25, -17),
    },
    {
      start: new Vector(633, 499),
      size: new Vector(48, 26),
      offset: new Vector(-25, -16),
    },
    {
      start: new Vector(633, 654),
      size: new Vector(48, 25),
      offset: new Vector(-25, -16),
    },
    {
      start: new Vector(681, 232),
      size: new Vector(46, 25),
      offset: new Vector(-24, -16),
    },
  ],
  tanksTurrets: [
    {
      start: new Vector(802, 758),
      size: new Vector(31, 13),
      offset: new Vector(-10, -19),
    },
    {
      start: new Vector(767, 889),
      size: new Vector(32, 13),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(767, 902),
      size: new Vector(32, 13),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(802, 771),
      size: new Vector(31, 13),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(833, 248),
      size: new Vector(30, 13),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(833, 534),
      size: new Vector(29, 14),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(863, 94),
      size: new Vector(27, 15),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(863, 542),
      size: new Vector(25, 16),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(890, 656),
      size: new Vector(21, 17),
      offset: new Vector(-10, -20),
    },
    {
      start: new Vector(913, 139),
      size: new Vector(19, 18),
      offset: new Vector(-10, -20),
    },
    {
      start: new Vector(913, 806),
      size: new Vector(17, 18),
      offset: new Vector(-9, -20),
    },
    {
      start: new Vector(913, 824),
      size: new Vector(17, 18),
      offset: new Vector(-9, -20),
    },
    {
      start: new Vector(913, 420),
      size: new Vector(18, 19),
      offset: new Vector(-9, -20),
    },
    {
      start: new Vector(913, 659),
      size: new Vector(17, 19),
      offset: new Vector(-8, -20),
    },
    {
      start: new Vector(913, 842),
      size: new Vector(17, 18),
      offset: new Vector(-8, -20),
    },
    {
      start: new Vector(913, 157),
      size: new Vector(19, 18),
      offset: new Vector(-9, -20),
    },
    {
      start: new Vector(890, 673),
      size: new Vector(21, 17),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(863, 791),
      size: new Vector(24, 17),
      offset: new Vector(-14, -20),
    },
    {
      start: new Vector(863, 109),
      size: new Vector(27, 15),
      offset: new Vector(-16, -20),
    },
    {
      start: new Vector(833, 642),
      size: new Vector(28, 15),
      offset: new Vector(-17, -20),
    },
    {
      start: new Vector(833, 261),
      size: new Vector(30, 13),
      offset: new Vector(-19, -19),
    },
    {
      start: new Vector(802, 784),
      size: new Vector(31, 13),
      offset: new Vector(-20, -19),
    },
    {
      start: new Vector(767, 915),
      size: new Vector(32, 13),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(767, 928),
      size: new Vector(32, 13),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(802, 797),
      size: new Vector(31, 13),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(767, 781),
      size: new Vector(32, 14),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(767, 795),
      size: new Vector(32, 14),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(802, 678),
      size: new Vector(31, 14),
      offset: new Vector(-20, -19),
    },
    {
      start: new Vector(833, 194),
      size: new Vector(30, 14),
      offset: new Vector(-19, -19),
    },
    {
      start: new Vector(833, 505),
      size: new Vector(29, 15),
      offset: new Vector(-18, -20),
    },
    {
      start: new Vector(863, 32),
      size: new Vector(27, 16),
      offset: new Vector(-16, -21),
    },
    {
      start: new Vector(863, 808),
      size: new Vector(24, 17),
      offset: new Vector(-14, -22),
    },
    {
      start: new Vector(890, 586),
      size: new Vector(21, 18),
      offset: new Vector(-11, -23),
    },
    {
      start: new Vector(913, 175),
      size: new Vector(19, 18),
      offset: new Vector(-9, -23),
    },
    {
      start: new Vector(913, 678),
      size: new Vector(17, 19),
      offset: new Vector(-8, -24),
    },
    {
      start: new Vector(913, 860),
      size: new Vector(17, 18),
      offset: new Vector(-8, -24),
    },
    {
      start: new Vector(913, 457),
      size: new Vector(18, 18),
      offset: new Vector(-9, -24),
    },
    {
      start: new Vector(913, 878),
      size: new Vector(17, 18),
      offset: new Vector(-9, -24),
    },
    {
      start: new Vector(913, 697),
      size: new Vector(17, 19),
      offset: new Vector(-9, -24),
    },
    {
      start: new Vector(913, 193),
      size: new Vector(19, 18),
      offset: new Vector(-10, -23),
    },
    {
      start: new Vector(890, 604),
      size: new Vector(21, 18),
      offset: new Vector(-10, -23),
    },
    {
      start: new Vector(863, 825),
      size: new Vector(24, 17),
      offset: new Vector(-10, -22),
    },
    {
      start: new Vector(863, 48),
      size: new Vector(27, 16),
      offset: new Vector(-11, -21),
    },
    {
      start: new Vector(833, 657),
      size: new Vector(28, 15),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(833, 208),
      size: new Vector(30, 14),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(802, 692),
      size: new Vector(31, 14),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(767, 809),
      size: new Vector(32, 14),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(767, 823),
      size: new Vector(32, 14),
      offset: new Vector(-11, -19),
    },
  ],
  enemyTanksBodies: [
    {
      start: new Vector(681, 512),
      size: new Vector(44, 23),
      offset: new Vector(-23, -15),
    },
    {
      start: new Vector(681, 354),
      size: new Vector(46, 24),
      offset: new Vector(-24, -15),
    },
    {
      start: new Vector(633, 777),
      size: new Vector(48, 24),
      offset: new Vector(-25, -15),
    },
    {
      start: new Vector(633, 525),
      size: new Vector(48, 26),
      offset: new Vector(-25, -16),
    },
    {
      start: new Vector(633, 225),
      size: new Vector(48, 28),
      offset: new Vector(-25, -17),
    },
    {
      start: new Vector(633, 253),
      size: new Vector(48, 28),
      offset: new Vector(-25, -17),
    },
    {
      start: new Vector(681, 60),
      size: new Vector(46, 30),
      offset: new Vector(-24, -18),
    },
    {
      start: new Vector(681, 620),
      size: new Vector(43, 31),
      offset: new Vector(-22, -19),
    },
    {
      start: new Vector(727, 31),
      size: new Vector(40, 31),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(727, 363),
      size: new Vector(37, 31),
      offset: new Vector(-19, -19),
    },
    {
      start: new Vector(802, 60),
      size: new Vector(31, 30),
      offset: new Vector(-16, -19),
    },
    {
      start: new Vector(833, 702),
      size: new Vector(27, 30),
      offset: new Vector(-14, -19),
    },
    {
      start: new Vector(890, 272),
      size: new Vector(22, 29),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(863, 154),
      size: new Vector(26, 30),
      offset: new Vector(-13, -19),
    },
    {
      start: new Vector(802, 90),
      size: new Vector(31, 30),
      offset: new Vector(-15, -19),
    },
    {
      start: new Vector(727, 643),
      size: new Vector(35, 31),
      offset: new Vector(-17, -19),
    },
    {
      start: new Vector(727, 62),
      size: new Vector(40, 31),
      offset: new Vector(-19, -19),
    },
    {
      start: new Vector(681, 651),
      size: new Vector(43, 31),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(681, 90),
      size: new Vector(46, 30),
      offset: new Vector(-22, -18),
    },
    {
      start: new Vector(633, 0),
      size: new Vector(48, 29),
      offset: new Vector(-23, -18),
    },
    {
      start: new Vector(633, 281),
      size: new Vector(48, 28),
      offset: new Vector(-23, -17),
    },
    {
      start: new Vector(633, 551),
      size: new Vector(48, 26),
      offset: new Vector(-23, -16),
    },
    {
      start: new Vector(633, 801),
      size: new Vector(48, 24),
      offset: new Vector(-23, -15),
    },
    {
      start: new Vector(681, 378),
      size: new Vector(46, 24),
      offset: new Vector(-22, -15),
    },
    {
      start: new Vector(681, 535),
      size: new Vector(44, 23),
      offset: new Vector(-21, -15),
    },
    {
      start: new Vector(681, 402),
      size: new Vector(46, 24),
      offset: new Vector(-22, -16),
    },
    {
      start: new Vector(633, 679),
      size: new Vector(48, 25),
      offset: new Vector(-23, -16),
    },
    {
      start: new Vector(633, 577),
      size: new Vector(48, 26),
      offset: new Vector(-23, -16),
    },
    {
      start: new Vector(633, 309),
      size: new Vector(48, 28),
      offset: new Vector(-23, -17),
    },
    {
      start: new Vector(633, 337),
      size: new Vector(48, 28),
      offset: new Vector(-23, -17),
    },
    {
      start: new Vector(681, 176),
      size: new Vector(46, 28),
      offset: new Vector(-22, -17),
    },
    {
      start: new Vector(681, 738),
      size: new Vector(43, 28),
      offset: new Vector(-21, -17),
    },
    {
      start: new Vector(727, 149),
      size: new Vector(40, 28),
      offset: new Vector(-19, -16),
    },
    {
      start: new Vector(727, 422),
      size: new Vector(37, 28),
      offset: new Vector(-18, -16),
    },
    {
      start: new Vector(802, 176),
      size: new Vector(31, 28),
      offset: new Vector(-15, -16),
    },
    {
      start: new Vector(833, 758),
      size: new Vector(27, 26),
      offset: new Vector(-13, -15),
    },
    {
      start: new Vector(890, 327),
      size: new Vector(22, 26),
      offset: new Vector(-11, -15),
    },
    {
      start: new Vector(863, 210),
      size: new Vector(26, 26),
      offset: new Vector(-13, -15),
    },
    {
      start: new Vector(802, 204),
      size: new Vector(31, 28),
      offset: new Vector(-16, -16),
    },
    {
      start: new Vector(727, 702),
      size: new Vector(35, 28),
      offset: new Vector(-18, -16),
    },
    {
      start: new Vector(727, 177),
      size: new Vector(40, 28),
      offset: new Vector(-21, -16),
    },
    {
      start: new Vector(681, 766),
      size: new Vector(43, 28),
      offset: new Vector(-22, -17),
    },
    {
      start: new Vector(681, 204),
      size: new Vector(46, 28),
      offset: new Vector(-24, -17),
    },
    {
      start: new Vector(633, 365),
      size: new Vector(48, 28),
      offset: new Vector(-25, -17),
    },
    {
      start: new Vector(633, 393),
      size: new Vector(48, 28),
      offset: new Vector(-25, -17),
    },
    {
      start: new Vector(633, 603),
      size: new Vector(48, 26),
      offset: new Vector(-25, -16),
    },
    {
      start: new Vector(633, 704),
      size: new Vector(48, 25),
      offset: new Vector(-25, -16),
    },
    {
      start: new Vector(681, 257),
      size: new Vector(46, 25),
      offset: new Vector(-24, -16),
    },
  ],
  enemyTanksTurrets: [
    {
      start: new Vector(802, 706),
      size: new Vector(31, 13),
      offset: new Vector(-10, -19),
    },
    {
      start: new Vector(767, 837),
      size: new Vector(32, 13),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(767, 850),
      size: new Vector(32, 13),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(802, 719),
      size: new Vector(31, 13),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(833, 222),
      size: new Vector(30, 13),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(833, 520),
      size: new Vector(29, 14),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(863, 64),
      size: new Vector(27, 15),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(863, 526),
      size: new Vector(25, 16),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(890, 622),
      size: new Vector(21, 17),
      offset: new Vector(-10, -20),
    },
    {
      start: new Vector(913, 67),
      size: new Vector(19, 18),
      offset: new Vector(-10, -20),
    },
    {
      start: new Vector(913, 716),
      size: new Vector(17, 18),
      offset: new Vector(-9, -20),
    },
    {
      start: new Vector(913, 734),
      size: new Vector(17, 18),
      offset: new Vector(-9, -20),
    },
    {
      start: new Vector(913, 401),
      size: new Vector(18, 19),
      offset: new Vector(-9, -20),
    },
    {
      start: new Vector(913, 602),
      size: new Vector(17, 19),
      offset: new Vector(-8, -20),
    },
    {
      start: new Vector(913, 752),
      size: new Vector(17, 18),
      offset: new Vector(-8, -20),
    },
    {
      start: new Vector(913, 85),
      size: new Vector(19, 18),
      offset: new Vector(-9, -20),
    },
    {
      start: new Vector(890, 639),
      size: new Vector(21, 17),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(863, 740),
      size: new Vector(24, 17),
      offset: new Vector(-14, -20),
    },
    {
      start: new Vector(863, 79),
      size: new Vector(27, 15),
      offset: new Vector(-16, -20),
    },
    {
      start: new Vector(833, 612),
      size: new Vector(28, 15),
      offset: new Vector(-17, -20),
    },
    {
      start: new Vector(833, 235),
      size: new Vector(30, 13),
      offset: new Vector(-19, -19),
    },
    {
      start: new Vector(802, 732),
      size: new Vector(31, 13),
      offset: new Vector(-20, -19),
    },
    {
      start: new Vector(767, 863),
      size: new Vector(32, 13),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(767, 876),
      size: new Vector(32, 13),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(802, 745),
      size: new Vector(31, 13),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(149, 940),
      size: new Vector(32, 14),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(767, 739),
      size: new Vector(32, 14),
      offset: new Vector(-21, -19),
    },
    {
      start: new Vector(767, 941),
      size: new Vector(31, 14),
      offset: new Vector(-20, -19),
    },
    {
      start: new Vector(833, 166),
      size: new Vector(30, 14),
      offset: new Vector(-19, -19),
    },
    {
      start: new Vector(833, 490),
      size: new Vector(29, 15),
      offset: new Vector(-18, -20),
    },
    {
      start: new Vector(863, 0),
      size: new Vector(27, 16),
      offset: new Vector(-16, -21),
    },
    {
      start: new Vector(863, 757),
      size: new Vector(24, 17),
      offset: new Vector(-14, -22),
    },
    {
      start: new Vector(890, 550),
      size: new Vector(21, 18),
      offset: new Vector(-11, -23),
    },
    {
      start: new Vector(913, 103),
      size: new Vector(19, 18),
      offset: new Vector(-9, -23),
    },
    {
      start: new Vector(913, 621),
      size: new Vector(17, 19),
      offset: new Vector(-8, -24),
    },
    {
      start: new Vector(913, 770),
      size: new Vector(17, 18),
      offset: new Vector(-8, -24),
    },
    {
      start: new Vector(913, 439),
      size: new Vector(18, 18),
      offset: new Vector(-9, -24),
    },
    {
      start: new Vector(913, 788),
      size: new Vector(17, 18),
      offset: new Vector(-9, -24),
    },
    {
      start: new Vector(913, 640),
      size: new Vector(17, 19),
      offset: new Vector(-9, -24),
    },
    {
      start: new Vector(913, 121),
      size: new Vector(19, 18),
      offset: new Vector(-10, -23),
    },
    {
      start: new Vector(890, 568),
      size: new Vector(21, 18),
      offset: new Vector(-10, -23),
    },
    {
      start: new Vector(863, 774),
      size: new Vector(24, 17),
      offset: new Vector(-10, -22),
    },
    {
      start: new Vector(863, 16),
      size: new Vector(27, 16),
      offset: new Vector(-11, -21),
    },
    {
      start: new Vector(833, 627),
      size: new Vector(28, 15),
      offset: new Vector(-11, -20),
    },
    {
      start: new Vector(833, 180),
      size: new Vector(30, 14),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(802, 664),
      size: new Vector(31, 14),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(767, 753),
      size: new Vector(32, 14),
      offset: new Vector(-11, -19),
    },
    {
      start: new Vector(767, 767),
      size: new Vector(32, 14),
      offset: new Vector(-11, -19),
    },
  ],
  explosion: [
    {
      start: new Vector(48, 952),
      size: new Vector(1, 1),
      offset: new Vector(0, 0),
    },
    {
      start: new Vector(934, 397),
      size: new Vector(14, 17),
      offset: new Vector(-13, 0),
    },
    {
      start: new Vector(863, 485),
      size: new Vector(25, 21),
      offset: new Vector(-18, -4),
    },
    {
      start: new Vector(727, 450),
      size: new Vector(36, 30),
      offset: new Vector(-23, -13),
    },
    {
      start: new Vector(681, 426),
      size: new Vector(45, 40),
      offset: new Vector(-27, -21),
    },
    {
      start: new Vector(578, 139),
      size: new Vector(54, 51),
      offset: new Vector(-31, -29),
    },
    {
      start: new Vector(453, 601),
      size: new Vector(62, 61),
      offset: new Vector(-35, -36),
    },
    {
      start: new Vector(376, 356),
      size: new Vector(69, 69),
      offset: new Vector(-38, -42),
    },
    {
      start: new Vector(376, 280),
      size: new Vector(76, 76),
      offset: new Vector(-41, -47),
    },
    {
      start: new Vector(289, 677),
      size: new Vector(81, 82),
      offset: new Vector(-43, -52),
    },
    {
      start: new Vector(289, 284),
      size: new Vector(86, 89),
      offset: new Vector(-45, -57),
    },
    {
      start: new Vector(197, 600),
      size: new Vector(89, 94),
      offset: new Vector(-45, -61),
    },
    {
      start: new Vector(197, 0),
      size: new Vector(92, 94),
      offset: new Vector(-46, -65),
    },
    {
      start: new Vector(101, 575),
      size: new Vector(94, 93),
      offset: new Vector(-46, -68),
    },
    {
      start: new Vector(101, 320),
      size: new Vector(95, 89),
      offset: new Vector(-46, -69),
    },
    {
      start: new Vector(101, 409),
      size: new Vector(95, 86),
      offset: new Vector(-46, -70),
    },
    {
      start: new Vector(0, 670),
      size: new Vector(97, 85),
      offset: new Vector(-47, -71),
    },
    {
      start: new Vector(0, 585),
      size: new Vector(98, 85),
      offset: new Vector(-48, -71),
    },
    {
      start: new Vector(0, 418),
      size: new Vector(99, 85),
      offset: new Vector(-49, -72),
    },
    {
      start: new Vector(0, 333),
      size: new Vector(100, 85),
      offset: new Vector(-50, -72),
    },
    {
      start: new Vector(0, 0),
      size: new Vector(101, 84),
      offset: new Vector(-51, -72),
    },
    {
      start: new Vector(0, 84),
      size: new Vector(101, 84),
      offset: new Vector(-52, -72),
    },
    {
      start: new Vector(0, 168),
      size: new Vector(101, 83),
      offset: new Vector(-52, -71),
    },
    {
      start: new Vector(0, 251),
      size: new Vector(101, 82),
      offset: new Vector(-52, -71),
    },
    {
      start: new Vector(0, 503),
      size: new Vector(99, 82),
      offset: new Vector(-51, -71),
    },
    {
      start: new Vector(0, 755),
      size: new Vector(97, 81),
      offset: new Vector(-49, -70),
    },
    {
      start: new Vector(101, 495),
      size: new Vector(95, 80),
      offset: new Vector(-48, -70),
    },
    {
      start: new Vector(101, 668),
      size: new Vector(94, 79),
      offset: new Vector(-47, -69),
    },
    {
      start: new Vector(197, 444),
      size: new Vector(91, 78),
      offset: new Vector(-45, -68),
    },
    {
      start: new Vector(197, 522),
      size: new Vector(90, 78),
      offset: new Vector(-44, -68),
    },
    {
      start: new Vector(197, 834),
      size: new Vector(87, 76),
      offset: new Vector(-42, -67),
    },
    {
      start: new Vector(289, 373),
      size: new Vector(86, 76),
      offset: new Vector(-41, -67),
    },
  ],
  smallExplosion: [
    {
      start: new Vector(566, 942),
      size: new Vector(8, 10),
      offset: new Vector(-6, -17),
    },
    {
      start: new Vector(934, 796),
      size: new Vector(11, 11),
      offset: new Vector(-7, -18),
    },
    {
      start: new Vector(934, 414),
      size: new Vector(13, 12),
      offset: new Vector(-8, -20),
    },
    {
      start: new Vector(934, 187),
      size: new Vector(15, 14),
      offset: new Vector(-8, -22),
    },
    {
      start: new Vector(913, 211),
      size: new Vector(19, 17),
      offset: new Vector(-10, -24),
    },
    {
      start: new Vector(890, 353),
      size: new Vector(22, 18),
      offset: new Vector(-11, -25),
    },
    {
      start: new Vector(890, 0),
      size: new Vector(23, 22),
      offset: new Vector(-12, -27),
    },
    {
      start: new Vector(863, 926),
      size: new Vector(23, 23),
      offset: new Vector(-12, -28),
    },
    {
      start: new Vector(863, 558),
      size: new Vector(24, 22),
      offset: new Vector(-12, -27),
    },
    {
      start: new Vector(863, 463),
      size: new Vector(25, 22),
      offset: new Vector(-12, -27),
    },
    {
      start: new Vector(863, 440),
      size: new Vector(25, 23),
      offset: new Vector(-12, -27),
    },
    {
      start: new Vector(890, 22),
      size: new Vector(23, 21),
      offset: new Vector(-11, -26),
    },
    {
      start: new Vector(890, 43),
      size: new Vector(23, 20),
      offset: new Vector(-11, -26),
    },
    {
      start: new Vector(890, 531),
      size: new Vector(21, 19),
      offset: new Vector(-10, -25),
    },
    {
      start: new Vector(913, 228),
      size: new Vector(19, 17),
      offset: new Vector(-9, -24),
    },
    {
      start: new Vector(913, 543),
      size: new Vector(18, 15),
      offset: new Vector(-9, -23),
    },
  ],
  sites: {
    light: [
      {
        start: new Vector(289, 449),
        size: new Vector(84, 51),
        offset: new Vector(-43, -29),
      },
      {
        start: new Vector(197, 910),
        size: new Vector(81, 38),
        offset: new Vector(-41, -23),
      },
      {
        start: new Vector(101, 747),
        size: new Vector(94, 74),
        offset: new Vector(-46, -63),
      },
      {
        start: new Vector(289, 797),
        size: new Vector(77, 49),
        offset: new Vector(-39, -28),
      },
      {
        start: new Vector(289, 0),
        size: new Vector(87, 73),
        offset: new Vector(-43, -56),
      },
      {
        start: new Vector(197, 694),
        size: new Vector(88, 70),
        offset: new Vector(-47, -64),
      },
      {
        start: new Vector(197, 344),
        size: new Vector(92, 50),
        offset: new Vector(-46, -28),
      },
      {
        start: new Vector(289, 551),
        size: new Vector(82, 63),
        offset: new Vector(-48, -38),
      },
      {
        start: new Vector(289, 146),
        size: new Vector(87, 69),
        offset: new Vector(-47, -48),
      },
    ],
    dark: [
      {
        start: new Vector(289, 500),
        size: new Vector(84, 51),
        offset: new Vector(-43, -29),
      },
      {
        start: new Vector(289, 759),
        size: new Vector(81, 38),
        offset: new Vector(-41, -23),
      },
      {
        start: new Vector(101, 821),
        size: new Vector(94, 74),
        offset: new Vector(-46, -63),
      },
      {
        start: new Vector(289, 846),
        size: new Vector(77, 49),
        offset: new Vector(-39, -28),
      },
      {
        start: new Vector(289, 73),
        size: new Vector(87, 73),
        offset: new Vector(-43, -56),
      },
      {
        start: new Vector(197, 764),
        size: new Vector(88, 70),
        offset: new Vector(-47, -64),
      },
      {
        start: new Vector(197, 394),
        size: new Vector(92, 50),
        offset: new Vector(-46, -28),
      },
      {
        start: new Vector(289, 614),
        size: new Vector(82, 63),
        offset: new Vector(-48, -38),
      },
      {
        start: new Vector(289, 215),
        size: new Vector(87, 69),
        offset: new Vector(-47, -48),
      },
    ],
  },
};
