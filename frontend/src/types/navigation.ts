export type AppView = 'landing' | 'research' | 'workflow' | 'about';

export type ResearchWorkspaceState = 
  | 'input'        // Question form ready
  | 'submitting'   // Request initiated
  | 'researching'  // Request in progress (timeline shown)
  | 'results'      // Dossier display
  | 'error';       // Error state

export interface NavItem {
  id: AppView;
  label: string;
  path?: string;
  badge?: string;
}

export interface StoredInvestigation {
  id: string;
  question: string;
  timestamp: number;
  runId?: string;
  status: 'completed' | 'failed';
}
