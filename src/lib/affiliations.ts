export interface Affiliation {
  id: string;
  name: string;
  logoUrl: string;
  link: string;
  description?: string;
}

export const AFFILIATIONS: Affiliation[] = [
  {
    id: "1",
    name: "Austrian Physiotherapy Association",
    logoUrl: "/logos/apa.svg",
    link: "https://example.com",
    description: "Professional association for physiotherapists in Austria",
  },
  {
    id: "2",
    name: "European Respiratory Society",
    logoUrl: "/logos/ers.svg",
    link: "https://example.com",
    description: "Leading medical organization for respiratory health",
  },
  {
    id: "3",
    name: "Vienna Medical Chamber",
    logoUrl: "/logos/wmk.svg",
    link: "https://example.com",
    description: "Official medical regulatory body in Vienna",
  },
  {
    id: "4",
    name: "International Society of Physiotherapy",
    logoUrl: "/logos/isp.svg",
    link: "https://example.com",
    description: "Global network of physiotherapy professionals",
  },
  {
    id: "5",
    name: "Austrian Health Ministry",
    logoUrl: "/logos/bmg.svg",
    link: "https://example.com",
    description: "Federal ministry responsible for health policy",
  },
  {
    id: "6",
    name: "Sports Medicine Austria",
    logoUrl: "/logos/sma.svg",
    link: "https://example.com",
    description: "Specialized sports medicine organization",
  },
];

// Helper to get affiliations grouped by columns for grid layout
export function getAffiliationsByColumns(columns: number = 3): Affiliation[][] {
  const result: Affiliation[][] = Array.from({ length: columns }, () => []);
  AFFILIATIONS.forEach((affiliation, index) => {
    result[index % columns].push(affiliation);
  });
  return result;
}