const Catalog = (function () {
  const SITE = {
    name: 'Hao 的工具',
    tagline: '个人站点。测评、抽奖、笔记和以后的小工具，都在这一个网址里。'
  };

  const ITEMS = [
    {
      id: 'personality',
      name: '多维度人格测评',
      aliases: ['MBTI', '16型', '大五', 'OCEAN', '九型', 'DISC', '霍兰德'],
      tags: ['心理', '测评', '离线'],
      summary: '五档 Likert、7 模块约 220 题。完整版/快速版，本地续答，可导出 JSON 与 PDF。',
      path: '/personality/',
      status: 'live',
      data: 'local',
      shareable: true
    },
    {
      id: 'valorant-sens',
      name: '无畏契约灵敏度工坊',
      aliases: ['VAL', '瓦罗兰特', '灵敏度', 'PSA', 'Aimlabs', '打靶', '爆头', '工坊', '转换', 'CS2', 'DPI', 'eDPI', 'cm360'],
      tags: ['游戏', 'FPS', '工具', '离线'],
      summary: '爆头点射测手感，生成可填入无畏契约的腰射灵敏度',
      path: '/valorant-sens/',
      status: 'live',
      data: 'local',
      shareable: true
    }
  ];

  function list() {
    return ITEMS.filter(function (item) { return item.status !== 'hidden'; });
  }

  function get(id) {
    return ITEMS.find(function (item) { return item.id === id; }) || null;
  }

  return { SITE: SITE, list: list, get: get };
})();
