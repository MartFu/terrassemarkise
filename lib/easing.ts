/**
 * Easing function for smooth animations
 * @param x - Progress value between 0 and 1
 * @returns Eased value between 0 and 1
 */
export const easeOutQuart = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

// Optional: Additional easing functions you might find useful
export const easeInQuart = (x: number): number => {
  return x * x * x * x;
};

export const easeInOutQuart = (x: number): number => {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};

export const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

export const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

export const easeOutBack = (x: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
