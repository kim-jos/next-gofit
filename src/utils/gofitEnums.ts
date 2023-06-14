export const GymTypes = {
  pilates: { ko: "필라테스", en: "Pilates" },
  yoga: { ko: "요가", en: "Yoga" },
  crossfit: { ko: "크로스핏", en: "Crossfit" },
  dance: { ko: "댄스", en: "Dance" },
  squash: { ko: "스쿼시", en: "Squash" },
  spinning: { ko: "스피닝", en: "Spinning" },
  climbing: { ko: "클라이밍", en: "Climbing" },
  ballet: { ko: "발레", en: "Ballet" },
  jiuJitSu: { ko: "주짓수", en: "Jiu-JitSu" },
  boxing: { ko: "복싱", en: "boxing" },
} as const;
type ButtonName = (typeof GymTypes)[keyof typeof GymTypes];
