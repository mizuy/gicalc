/** PubMed PMID、またはすでに PubMed の URL ならそのまま返す */
export function pubmedUrl(pubmed: string): string {
  const trimmed = pubmed.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://pubmed.ncbi.nlm.nih.gov/${trimmed}/`;
}
