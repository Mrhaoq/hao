import { useMemo, useState } from 'react';
import { filterCatalog, SITE } from '../shared/catalog';
import { Shell } from '../shared/shell/Shell';

function initialQuery(): string {
  const q = new URLSearchParams(window.location.search).get('q');
  return q ? q.trim() : '';
}

export function HomeApp() {
  const [query, setQuery] = useState(initialQuery);
  const items = useMemo(() => filterCatalog(query), [query]);

  function onSearchChange(value: string) {
    setQuery(value);
    const url = new URL(window.location.href);
    if (value.trim()) url.searchParams.set('q', value.trim());
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
  }

  return (
    <Shell search searchValue={query} onSearchChange={onSearchChange}>
      <main className="shell-main">
        <header className="shell-hero">
          <h1>{SITE.name}</h1>
          <p>{SITE.tagline}</p>
        </header>
        <div className="shell-grid">
          {items.length === 0 ? (
            <p className="shell-empty">没有匹配的功能。试试「测评」或「MBTI」。</p>
          ) : (
            items.map((item) => (
              <a key={item.id} className="shell-card" href={item.path}>
                <h2>{item.name}</h2>
                <p>{item.summary}</p>
                <div className="shell-card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </a>
            ))
          )}
        </div>
        <footer className="shell-footer">
          <p>数据默认只存在你的浏览器。测评入口也在「多维度人格测评」卡片里。</p>
        </footer>
      </main>
    </Shell>
  );
}
