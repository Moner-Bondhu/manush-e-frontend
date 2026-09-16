export type GameEvent = {
  event_type: string;
  payload: Record<string, unknown>;
  occurred_at: string;
};

export type GameRun = {
  sessionId: number | null;
  startedAt: number;
  events: GameEvent[];
  challenge: Record<string, unknown>;
};
