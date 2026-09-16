import axios from 'axios';
import type { GameEvent, GameRun } from './types';

const api = axios.create({ baseURL: import.meta.env.VITE_API_ENDPOINT });

const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('api_token')}` });

export async function startGame(slug: string, profileId: number): Promise<GameRun> {
  const response = await api.post(`/games/${slug}/sessions`, { profile_id: profileId }, { headers: headers() });
  return { sessionId: response.data.data.session.id, startedAt: Date.now(), events: [], challenge: response.data.data.challenge || {} };
}

export async function completeGame(run: GameRun, metrics: Record<string, unknown>): Promise<void> {
  if (!run.sessionId) return;
  if (run.events.length) {
    await api.post(`/game-sessions/${run.sessionId}/events`, { events: run.events }, { headers: headers() });
  }
  await api.post(`/game-sessions/${run.sessionId}/complete`, {
    duration_ms: Date.now() - run.startedAt,
    metrics,
  }, { headers: headers() });
}
