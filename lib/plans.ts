export type Plan = {
  tier: number;
  /** Joining fee, in lakhs. */
  fee: number;
  /** Business target for years 1 to 5, in lakhs. */
  targets: [number, number, number, number, number];
};

// From the EXIM Story PDF (Part 8). Amounts are in lakhs; 100 lakhs = 1 crore.
export const plans: Plan[] = [
  { tier: 1, fee: 3, targets: [25, 50, 100, 200, 400] },
  { tier: 2, fee: 4, targets: [50, 100, 200, 400, 800] },
  { tier: 3, fee: 5, targets: [100, 200, 400, 800, 1600] },
  { tier: 4, fee: 10, targets: [200, 400, 800, 1600, 3200] },
  { tier: 5, fee: 15, targets: [400, 800, 1600, 3200, 6400] },
  { tier: 6, fee: 25, targets: [800, 1600, 3200, 6400, 12800] },
  { tier: 7, fee: 50, targets: [1600, 3200, 6400, 12600, 25600] },
];

export const totalTarget = (plan: Plan) => plan.targets.reduce((sum, n) => sum + n, 0);
