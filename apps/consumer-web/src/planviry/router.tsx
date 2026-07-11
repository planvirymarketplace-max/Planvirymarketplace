'use client';

import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams as useNextSearchParams, useParams as useNextParams } from 'next/navigation';
import NextLink from 'next/link';

interface RouteLocation {
  pathname: string;
  search: string;
  hash: string;
}

export function useLocation(): RouteLocation {
  const pathname = usePathname() || '/';
  const searchParams = useNextSearchParams();
  const search = searchParams ? `?${searchParams.toString()}` : '';
  const [hash, setHash] = React.useState('');
  React.useEffect(() => {
    setHash(window.location.hash);
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return useMemo(() => ({
    pathname,
    search,
    hash
  }), [pathname, search, hash]);
}

export type NavigateFunction = (
  to: string,
  options?: { replace?: boolean },
) => void;

export function useNavigate(): NavigateFunction {
  const router = useRouter();
  return (to: string, options?: { replace?: boolean }) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
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
  const router = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useNextSearchParams();
  
  const params = useMemo(() => {
    return new URLSearchParams(nextSearchParams?.toString() || '');
  }, [nextSearchParams]);

  const setSearchParams = React.useCallback((
    next:
      | URLSearchParams
      | string
      | Record<string, string>
      | ((prev: URLSearchParams) => URLSearchParams | string | Record<string, string>),
  ) => {
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
    const newUrl = pathname + (queryString ? `?${queryString}` : '');
    router.push(newUrl);
  }, [pathname, params, router]);

  return [params, setSearchParams];
}

interface ParamsContextValue {
  params: Record<string, string>;
}
const ParamsContext = createContext<ParamsContextValue>({ params: {} });

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  const ctx = useContext(ParamsContext);
  return (ctx.params || {}) as T;
}

interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  replace?: boolean;
  children?: ReactNode;
}

export function Link({ to, replace, children, onClick, ...rest }: LinkProps) {
  const navigate = useNavigate();
  return (
    <NextLink
      href={to}
      replace={replace}
      onClick={(e) => {
        if (onClick) onClick(e);
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
    </NextLink>
  );
}

export function Navigate({
  to,
  replace,
}: {
  to: string;
  replace?: boolean;
}) {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(to, { replace });
  }, [to, replace, navigate]);
  return null;
}

interface RouteProps {
  path: string;
  element: ReactNode;
}

export function Route({ element }: RouteProps): ReactNode {
  return element;
}

// displayName so the Routes child filter works.
(Route as unknown as { displayName: string }).displayName = 'Route';

interface RoutesProps {
  children: ReactNode;
}

function matchPath(
  pattern: string,
  pathname: string,
): Record<string, string> | null {
  // Normalize: strip trailing slash (except root)
  const p = pattern.endsWith('/') && pattern.length > 1 ? pattern.slice(0, -1) : pattern;
  const target = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  const patternParts = p.split('/').filter(Boolean);
  const pathParts = target.split('/').filter(Boolean);

  // Handle wildcard route
  if (p === '*') return {};

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

export function Routes({ children }: RoutesProps) {
  const pathname = usePathname() || '/';
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

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export const HashRouter = BrowserRouter;

export function useEnsureHash(): void {
  // No-op in standard path routing
}
