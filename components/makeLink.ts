import { pathToRegexp, compile, Key } from 'path-to-regexp';

export default function makeLink(to: string, params: any) {
  const keys: Key[] = [];
  pathToRegexp(to, keys);
  const build = compile(to);
  const hrefValues = keys.reduce((result, key) => {
    return { ...result, [key.name]: `[${key.name}]` };
  }, {});
  const href = decodeURIComponent(build(hrefValues));
  const as = build(params);
  return {
    href,
    as,
  };
}
