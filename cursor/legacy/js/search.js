const CatalogSearch = (function () {
  function matches(item, query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return true;
    const hay = [item.name, item.summary]
      .concat(item.aliases || [])
      .concat(item.tags || [])
      .join(' ')
      .toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function filter(query) {
    return Catalog.list().filter(function (item) { return matches(item, query); });
  }

  function renderCards(grid, items) {
    grid.replaceChildren();
    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'shell-empty';
      empty.textContent = '没有匹配的功能。试试「测评」或「MBTI」。';
      grid.appendChild(empty);
      return;
    }
    items.forEach(function (item) {
      const a = document.createElement('a');
      a.className = 'shell-card';
      a.href = item.path;

      const h2 = document.createElement('h2');
      h2.textContent = item.name;

      const p = document.createElement('p');
      p.textContent = item.summary;

      const tags = document.createElement('div');
      tags.className = 'shell-card-tags';
      (item.tags || []).forEach(function (t) {
        const span = document.createElement('span');
        span.textContent = t;
        tags.appendChild(span);
      });

      a.appendChild(h2);
      a.appendChild(p);
      a.appendChild(tags);
      grid.appendChild(a);
    });
  }

  function bindHome(gridId, inputId) {
    const grid = document.getElementById(gridId);
    const input = document.getElementById(inputId);
    if (!grid) return;

    function refresh() {
      const q = input ? input.value : '';
      renderCards(grid, filter(q));
    }

    refresh();
    if (input) {
      input.addEventListener('input', refresh);
    }
  }

  return { matches: matches, filter: filter, renderCards: renderCards, bindHome: bindHome };
})();
