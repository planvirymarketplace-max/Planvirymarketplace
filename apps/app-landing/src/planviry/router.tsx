'use client';

/**
 * Lightweight hash-based router that mimics the react-router-dom API surface
 * used by the Planviry app. Because the host Next.js project only exposes the
 * `/` route, all navigation is stored in `window.location.hash`
 * (e.g. `#/explore?tab=categories`).
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

/* ----------------------------- hash subscription ---------------------------- */

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHashSnapshot(): string {
  if (typeof window === 'undefined') return '#/';
  return window.location.hash || '#/';
}

function getServerHashSnapshot(): string {
  return '#/';
}

interface RouteLocation {
  pathname: string;
  search: string;
  hash: string;
}

function parseHash(rawHash: string): RouteLocation {
  // rawHash looks like "#/explore?tab=categories"
  const stripped = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash;
  if (!stripped) return { pathname: '/', search: '', hash: '' };

  let pathname = stripped;
  let search = '';
  let hash = '';

  const hashIdx = pathname.indexOf('#');
  if (hashIdx !== -1) {
    hash = pathname.slice(hashIdx);
    pathname = pathname.slice(0, hashIdx);
  }
  const queryIdx = pathname.indexOf('?');
  if (queryIdx !== -1) {
    search = pathname.slice(queryIdx);
    pathname = pathname.slice(0, queryIdx);
  }
  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  return { pathname, search, hash };
}

function useHashLocation(): RouteLocation {
  const rawHash = useSyncExternalStore(
    subscribe,
    getHashSnapshot,
    getServerHashSnapshot,
  );
  return useMemo(() => parseHash(rawHash), [rawHash]);
}

/* ------------------------------- navigation -------------------------------- */

function scrollToTop() {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export type NavigateFunction = (
  to: string,
  options?: { replace?: boolean },
) => void;

export function useNavigate(): NavigateFunction {
  return (to: string, options?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return;
    const target = to.startsWith('#') ? to : '#' + (to.startsWith('/') ? to : '/' + to);
    if (options?.replace) {
      const url = window.location.pathname + window.location.search + target;
      window.history.replaceState(null, '', url);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = target;
    }
    scrollToTop();
  };
}

export function useLocation(): RouteLocation {
  return useHashLocation();
}

export function useSearchParams(): [
  URLSearchParams,
  (
    next:
      | URLSearchParams
      | string
      | Record<string, string>
      | ((
          prev: URLSearchParams,
        ) => URLSearchParams | string | Record<string, string>),
  ) => void,
] {
  const { search, pathname } = useHashLocation();
  const params = useMemo(
    () => new URLSearchParams(search.startsWith('?') ? search.slice(1) : search),
    [search],
  );

  const setSearchParams: (
    next:
      | URLSearchParams
      | string
      | Record<string, string>
      | ((prev: URLSearchParams) => URLSearchParams | string | Record<string, string>),
  ) => void = (next) => {
    if (typeof window === 'undefined') return;
    let resolved: URLSearchParams | string | Record<string, string>;
    if (typeof next === 'function') {
      resolved = next(params);
    } else {
      resolved = next;
    }
    let queryString: string;
    if (typeof resolved === 'string') {
      queryString = resolved.startsWith('?') ? resolved.slice(1) : resolved;
    } else if (resolved instanceof URLSearchParams) {
      queryString = resolved.toString();
    } else {
      queryString = new URLSearchParams(resolved).toString();
    }
    const newHash = '#' + pathname + (queryString ? '?' + queryString : '');
    window.location.hash = newHash;
  };

  return [params, setSearchParams];
}

/* --------------------------------- params --------------------------------- */

interface ParamsContextValue {
  params: Record<string, string>;
}
const ParamsContext = createContext<ParamsContextValue>({ params: {} });

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  const ctx = useContext(ParamsContext);
  return ctx.params as T;
}

/* --------------------------------- Link ----------------------------------- */

interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  replace?: boolean;
  children?: ReactNode;
}

export function Link({ to, replace, children, onClick, ...rest }: LinkProps) {
  const navigate = useNavigate();
  const href = '#' + (to.startsWith('/') ? to : '/' + to);
  return (
    <a
      href={href}
      onClick={(e) => {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.altKey ||
          e.ctrlKey ||
          e.shiftKey
        ) {
          return;
        }
        e.preventDefault();
        navigate(to, { replace });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ------------------------------- Navigate --------------------------------- */

export function Navigate({
  to,
  replace,
}: {
  to: string;
  replace?: boolean;
}) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace });
  }, [to, replace, navigate]);
  return null;
}

/* ------------------------------ route matching ---------------------------- */

function matchPath(
  pattern: string,
  pathname: string,
): Record<string, string> | null {
  // Normalize: strip trailing slash (except root)
  const p = pattern.endsWith('/') && pattern.length > 1 ? pattern.slice(0, -1) : pattern;
  const target = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  const patternParts = p.split('/').filter(Boolean);
  const pathParts = target.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    const actual = pathParts[i];
    if (pp.startsWith(':')) {
      params[pp.slice(1)] = decodeURIComponent(actual);
    } else if (pp !== actual) {
      return null;
    }
  }
  return params;
}

interface RouteProps {
  path: string;
  element: ReactNode;
}
// Route is just a descriptor; Routes reads its props via children.
export function Route({ element }: RouteProps): ReactNode {
  return element;
}

interface RoutesProps {
  children: ReactNode;
}
export function Routes({ children }: RoutesProps) {
  const { pathname } = useHashLocation();
  const childArray = React.Children.toArray(children).filter(
    (c): c is React.ReactElement<RouteProps> =>
      React.isValidElement(c) && (c.type as { displayName?: string })?.displayName === 'Route',
  );

  for (const child of childArray) {
    const path = child.props.path;
    const matched = matchPath(path, pathname);
    if (matched) {
      return (
        <ParamsContext.Provider value={{ params: matched }}>
          {child.props.element}
        </ParamsContext.Provider>
      );
    }
  }

  return null;
}
// displayName so the Routes child filter works.
(Route as unknown as { displayName: string }).displayName = 'Route';

/* ------------------------------ BrowserRouter ------------------------------ */

export function BrowserRouter({ children }: { children: ReactNode }) {
  // Ensure there is always a hash so the app starts at "/".
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.location.hash) {
      // Don't force a redirect; treat empty hash as "/".
    }
  }, []);
  return <>{children}</>;
}

/* --------------------------- HashRouter alias ----------------------------- */
export const HashRouter = BrowserRouter;

/* --------------------------- default redirect ----------------------------- */

/** Convenience hook: ensure the hash starts with "#/" so the app boots at "/". */
export function useEnsureHash(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.location.hash) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search + '#/',
      );
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  }, []);
}
