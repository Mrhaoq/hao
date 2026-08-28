const Shell = (function () {
  function inject(options) {
    options = options || {};
    if (document.querySelector('.shell-header')) return;

    const header = document.createElement('header');
    header.className = 'shell-header';

    const inner = document.createElement('div');
    inner.className = 'shell-header-inner';

    const brand = document.createElement('a');
    brand.className = 'shell-brand';
    brand.href = '/';
    brand.textContent = (typeof Catalog !== 'undefined' && Catalog.SITE)
      ? Catalog.SITE.name
      : 'Hao 的工具';
    inner.appendChild(brand);

    if (options.search) {
      const wrap = document.createElement('div');
      wrap.className = 'shell-search-wrap';
      const input = document.createElement('input');
      input.type = 'search';
      input.className = 'shell-search';
      input.id = options.searchId || 'catalog-search';
      input.placeholder = '搜索功能，如 MBTI、灵敏度';
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('aria-label', '搜索功能');
      wrap.appendChild(input);
      inner.appendChild(wrap);
    } else {
      const spacer = document.createElement('div');
      spacer.className = 'shell-spacer';
      inner.appendChild(spacer);
    }

    const right = document.createElement('div');
    right.className = 'shell-right';
    if (!options.search) {
      const home = document.createElement('a');
      home.className = 'shell-home-link';
      home.href = '/';
      home.textContent = '返回首页';
      right.appendChild(home);
    }
    inner.appendChild(right);

    header.appendChild(inner);
    document.body.insertBefore(header, document.body.firstChild);
    document.body.classList.add('has-shell');
  }

  return { inject: inject };
})();
