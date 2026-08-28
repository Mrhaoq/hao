const SensGames = (function () {
  const CHECKED_AT = '2026-08-12';

  const GAMES = [
    { id: 'valorant', name: '无畏契约', yaw: 0.07, engine: 'Unreal Engine 4' },
    { id: 'cs2', name: 'CS2', yaw: 0.022, engine: 'Source 2' },
    { id: 'apex', name: 'Apex 英雄', yaw: 0.022, engine: 'Source' },
    { id: 'ow2', name: '守望先锋 2', yaw: 0.0066, engine: 'Overwatch' }
  ];

  function list() {
    return GAMES.slice();
  }

  function get(id) {
    return GAMES.find(function (g) { return g.id === id; }) || GAMES[0];
  }

  return { CHECKED_AT: CHECKED_AT, list: list, get: get };
})();
