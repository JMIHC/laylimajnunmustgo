const US_GEO = '["103644278"]';

export function linkedinPeopleSearch(keywords: string): string {
  const geoUrn = encodeURIComponent(US_GEO);
  const kw = encodeURIComponent(keywords);
  return `https://www.linkedin.com/search/results/people/?keywords=${kw}&geoUrn=${geoUrn}&origin=GLOBAL_SEARCH_HEADER`;
}

export function webSearch(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function linkedinJobsSearch(keywords: string, location: string): string {
  const params = new URLSearchParams({ keywords, location });
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

export function indeedJobsSearch(query: string, location: string): string {
  const params = new URLSearchParams({ q: query, l: location });
  return `https://www.indeed.com/jobs?${params.toString()}`;
}

export function jobBankSearch(query: string, location: string): string {
  const params = new URLSearchParams({ searchstring: query, locationstring: location });
  return `https://www.jobbank.gc.ca/jobsearch/jobsearch?${params.toString()}`;
}
