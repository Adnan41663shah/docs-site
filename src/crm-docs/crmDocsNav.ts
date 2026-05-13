export interface CrmDocsNavLeaf {
  id: string;
  label: string;
}

export interface CrmDocsNavGroup {
  id: string;
  label: string;
  defaultOpen?: boolean;
  children: CrmDocsNavLeaf[];
}

/** Sidebar structure — IDs map to `data-doc-section` anchors in content. */
export const CRM_DOCS_NAV: CrmDocsNavGroup[] = [
  {
    id: 'overview',
    label: 'Overview',
    defaultOpen: true,
    children: [{ id: 'docs-welcome', label: 'Welcome & platform overview' }],
  },
  {
    id: 'inquiry-management',
    label: 'Inquiry Management',
    defaultOpen: true,
    children: [{ id: 'inquiry-workflow', label: 'Overall Inquiry Workflow' }],
  },
  {
    id: 'presales',
    label: 'Presales Workflow',
    defaultOpen: true,
    children: [
      { id: 'presales-workflow', label: 'Inquiry Workflow for Presales' },
      { id: 'presales-all-inquiries', label: 'All Inquiries Page' },
      { id: 'presales-my-raised', label: 'My Raised Inquiries Page' },
      { id: 'presales-followups', label: 'My Follow-Ups Page' },
      { id: 'presales-center-queues', label: 'Center-Wise Inquiry Queues' },
      { id: 'presales-forwarding', label: 'Forwarding Inquiries to Sales' },
      { id: 'presales-auto', label: 'If Inquiry Is Created Automatically by Call or Website' },
      { id: 'presales-dashboard', label: 'Presales Dashboard Explanation' },
      { id: 'presales-calls', label: 'Calls Page (Presales View)' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales Workflow',
    defaultOpen: true,
    children: [
      { id: 'sales-lead-stages', label: 'Lead Stage and Sub-Stage Explanation' },
      { id: 'sales-dashboard', label: 'Sales Dashboard (Overview)' },
      { id: 'sales-admitted', label: 'Admitted Students Page (Sales View)' },
      { id: 'sales-conversions', label: 'Conversions Page (Sales View)' },
      { id: 'sales-followups', label: 'Sales My Follow-Ups Page' },
      { id: 'sales-my-inquiries', label: 'My Inquiries Page (Sales)' },
      { id: 'sales-center-inquiries', label: 'Center Inquiries Page' },
      { id: 'sales-e2e', label: 'Sales Inquiry Workflow (End-to-End)' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin Controls',
    defaultOpen: true,
    children: [
      { id: 'admin-role', label: 'Admin Role: Responsibilities and Scope' },
      { id: 'admin-all-inquiries', label: 'All Inquiries Page' },
      { id: 'admin-sales-inquiries', label: 'Sales Inquiries Page' },
      { id: 'admin-my-inquiries', label: 'My Inquiries' },
      { id: 'admin-my-followups', label: 'My Follow-Ups' },
      { id: 'admin-inquiry-details', label: 'Inquiry Details Page' },
      { id: 'admin-admitted', label: 'Admitted Students Page' },
      { id: 'admin-dashboard', label: 'Dashboard' },
      { id: 'admin-calls', label: 'Calls Page' },
      { id: 'admin-reports', label: 'Reports Pages' },
      { id: 'admin-users', label: 'User Management Page' },
      { id: 'admin-settings', label: 'Settings Page' },
    ],
  },
];

export function flattenNavIds(groups: CrmDocsNavGroup[]): string[] {
  return groups.flatMap((g) => g.children.map((c) => c.id));
}

export interface DocsSearchEntry {
  id: string;
  title: string;
  group: string;
}

/** Flat list for global documentation search / prev-next order. */
export function getDocsSearchEntries(): DocsSearchEntry[] {
  return CRM_DOCS_NAV.flatMap((g) => g.children.map((c) => ({ id: c.id, title: c.label, group: g.label })));
}

export function findNavMeta(
  sectionId: string
): { groupLabel: string; leafLabel: string } | null {
  for (const g of CRM_DOCS_NAV) {
    const leaf = g.children.find((c) => c.id === sectionId);
    if (leaf) return { groupLabel: g.label, leafLabel: leaf.label };
  }
  return null;
}
