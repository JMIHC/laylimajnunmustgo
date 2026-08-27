const US_GEO = '["103644278"]';

export function linkedinPeopleSearch(keywords: string): string {
  const geoUrn = encodeURIComponent(US_GEO);
  const kw = encodeURIComponent(keywords);
  return `https://www.linkedin.com/search/results/people/?keywords=${kw}&geoUrn=${geoUrn}&origin=GLOBAL_SEARCH_HEADER`;
}

export function webSearch(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
