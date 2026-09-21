export const CHECKED_AT = '2026-08-12';

export type SensGame = {
  id: string;
  name: string;
  yaw: number;
  engine: string;
};

const GAMES: SensGame[] = [
  { id: 'valorant', name: '无畏契约', yaw: 0.07, engine: 'Unreal Engine 4' },
  { id: 'cs2', name: 'CS2', yaw: 0.022, engine: 'Source 2' },
  { id: 'apex', name: 'Apex 英雄', yaw: 0.022, engine: 'Source' },
  { id: 'ow2', name: '守望先锋 2', yaw: 0.0066, engine: 'Overwatch' }
];

export function listGames() {
  return GAMES.slice();
}

export function getGame(id: string) {
  return GAMES.find((g) => g.id === id) || GAMES[0];
}

export const SensGames = { CHECKED_AT, list: listGames, get: getGame };
