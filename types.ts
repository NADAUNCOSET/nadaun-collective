export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WorkItem {
  id: string;
  client: string;
  title: string;
  category: string;
  image: string;
}

export interface InsightResponse {
  insight: string;
  trends: string[];
}
