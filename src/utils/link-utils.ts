export function getParameterizedLink(href: string, searchParams: URLSearchParams) {
  if (!searchParams || searchParams.size === 0) {
    return href;
  }

  // Remove other parameters than what are whitelisted
  const allowedParams = ['lng'];
  searchParams.forEach((_value: string, key: string) => {
    const isAllowed = allowedParams.includes(key);
    if (!isAllowed) {
      searchParams.delete(key);
    }
  });

  // Check whether href contains searchparams already
  // If it does, use & as separator instead of ?
  const constainsSearchString = href.includes('?');
  const separator = constainsSearchString ? '&' : '?';

  return `${href}${separator}${searchParams.toString()}`;
}

export function getLanguageSearchParam(searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams();
  const language = searchParams.get('lng') || 'fi';

  newSearchParams.append('lng', language);
  return newSearchParams;
}
