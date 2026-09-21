import { type ReactNode } from 'react';
import { SITE } from '../catalog';

type ShellProps = {
  search?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children: ReactNode;
};

export function Shell({ search = false, searchValue = '', onSearchChange, children }: ShellProps) {
  return (
    <>
      <header className="shell-header">
        <div className="shell-header-inner">
          <a className="shell-brand" href="/">{SITE.name}</a>
          {search ? (
            <div className="shell-search-wrap">
              <input
                type="search"
                className="shell-search"
                id="catalog-search"
                placeholder="搜索功能，如 MBTI、灵敏度"
                autoComplete="off"
                aria-label="搜索功能"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          ) : (
            <div className="shell-spacer" />
          )}
          <div className="shell-right">
            {!search ? (
              <a className="shell-home-link" href="/">返回首页</a>
            ) : null}
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
