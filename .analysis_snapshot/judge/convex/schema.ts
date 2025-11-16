// convex/schemas.ts
export type UserDoc = {
  _id?: string;
  username: string;
  email?: string;
  createdAt: number;
  // Autumn customer id or entity id if using Autumn
  autumnCustomerId?: string;
};

export type MatchDoc = {
  _id?: string;
  hostId: string;
  guestId?: string | null;
  problemId: string;     // id or slug of coding problem
  createdAt: number;
  startedAt?: number | null;
  finishedAt?: number | null;
  state: 'created' | 'started' | 'finished' | 'cancelled';
  events: MatchEvent[];  // history of code edits, submissions, messages
  result?: MatchResult | null;
  // optional: billing or paid match info
  paid?: boolean;
  billing?: {
    autumnCustomerId?: string;
    productId?: string;
    checkoutUrl?: string;
    priceCents?: number;
  } | null;
};

export type MatchEvent = {
  id: string;
  type: 'cursor' | 'code' | 'message' | 'submission' | 'system';
  userId?: string | null;
  timestamp: number;
  payload: any; // keep flexible (e.g., {code, lang} or {cursorPos})
};

export type MatchResult = {
  winnerId?: string | null;
  loserId?: string | null;
  score?: { [userId: string]: number };
  reason?: string; // e.g. "timeout", "correct-solution", "forfeit"
};
