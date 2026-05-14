import {
  DocAccordion,
  DocAlert,
  DocCard,
  DocFlow,
  DocFormula,
  DocGrid,
  DocH2,
  DocH3,
  DocOl,
  DocP,
  DocSection,
  DocUl,
} from '../CrmDocsPrimitives';

export function AdminWorkflowSections() {
  return (
    <>
      <DocSection id="admin-role">
        <DocH2>Admin role — responsibilities & scope</DocH2>
        <DocP>
          Admins combine operator, coach, and platform owner duties: they can cross department boundaries, override when
          policy allows, and maintain the configuration layer that keeps everyone aligned.
        </DocP>
        <DocUl
          items={[
            'View and intervene on Presales and Sales inquiries (edit, forward, attend, reassign).',
            'Bulk reassign Sales inquiries to balance workload.',
            'Mark or reverse conversion/admission states when business policy permits.',
            'Delete inquiries (destructive—use sparingly with audit awareness).',
            'Manage users, center permissions, TeleCMI mappings, and master data.',
            'Consume global dashboards and CSV exports for operational reviews.',
          ]}
        />
      </DocSection>

      <DocSection id="admin-all-inquiries">
        <DocH2>All Inquiries page (Admin)</DocH2>
        <DocP>
          Global <strong>active Presales</strong> control tower—excludes items already forwarded to Sales or admitted, so the queue
          stays actionable for first-mile work.
        </DocP>
        <DocH3>Queue toggles</DocH3>
        <DocUl
          items={[
            <>
              <strong>All:</strong> entire eligible Presales backlog.
            </>,
            <>
              <strong>New:</strong> untouched auto/intake leads (website/IVR bias, no follow-up, no forward, limited edits).
            </>,
            <>
              <strong>In progress:</strong> everything that is no longer “new.”
            </>,
          ]}
        />
        <DocAlert variant="warning" title="Default landing behavior">
          Admin views often default to <em>New</em> so untouched inbound volume is cleared first.
        </DocAlert>
        <DocH3>Filters</DocH3>
        <DocUl
          items={[
            'Course, location, status, created-by (specific Presales user), and created date range.',
            'Always set both ends of a date range for predictable analytics.',
          ]}
        />
        <DocP>
          Export obeys the same filter context for leadership-ready spreadsheets.
        </DocP>
      </DocSection>

      <DocSection id="admin-sales-inquiries">
        <DocH2>Sales Inquiries page (Admin)</DocH2>
        <DocP>
          Entire Sales department pipeline with operational super-powers (export dataset, multi-select reassignment).
        </DocP>
        <DocH3>Queue semantics</DocH3>
        <DocUl
          items={[
            <>
              <strong>New:</strong> no assignee yet (unattended).
            </>,
            <>
              <strong>In progress:</strong> assignee present (owned pipeline).
            </>,
            <>
              <strong>All:</strong> union of the two.
            </>,
          ]}
        />
        <DocP>
          Lead stage cells prefer the latest sales follow-up stage when present; otherwise they fall back to inquiry status or
          conversion/admission badges.
        </DocP>
        <DocH3>Bulk tools</DocH3>
        <DocOl
          items={[
            'Enter row selection mode from the overflow menu.',
            'Pick multiple inquiries, then launch reassignment to a target sales user.',
            'Export CSV for the currently filtered grid (useful for external war rooms).',
          ]}
        />
        <DocAlert variant="info" title="Counts follow filters">
          Tab counts recompute on the filtered dataset—changing users or locations will shift New vs In Progress totals.
        </DocAlert>
      </DocSection>

      <DocSection id="admin-my-inquiries">
        <DocH2>My Inquiries (Admin)</DocH2>
        <DocP>
          Same dual-tab pattern as Sales: <strong>My attended</strong> (you claimed) vs <strong>My raised</strong> (you sourced). Use it when
          you personally carry a bag in addition to oversight duties.
        </DocP>
      </DocSection>

      <DocSection id="admin-my-followups">
        <DocH2>My Follow-Ups (Admin)</DocH2>
        <DocP>
          Pending vs completed tabs mirror Sales/Presales logic so Admins can clear their own tasks or demonstrate best practices
          in the CRM.
        </DocP>
      </DocSection>

      <DocSection id="admin-inquiry-details">
        <DocH2>Inquiry Details page (Admin)</DocH2>
        <DocP>
          Master control surface: every high-impact action converges here—forward, attend, reassign, convert, admit, delete,
          and full timeline visibility.
        </DocP>
        <DocUl
          items={[
            'Forwarding auto-closes Presales follow-ups to prevent duplicate outreach.',
            'Reassignment may auto-close the previous owner’s pending tasks per system rules—confirm downstream owners follow up.',
            'Deletion is irreversible; ensure legal/compliance alignment before confirming.',
          ]}
        />
      </DocSection>

      <DocSection id="admin-admitted">
        <DocH2>Admitted Students page (Admin)</DocH2>
        <DocP>
          Organization-wide admission register with the same My vs All toggles, search, course/location filters, and admission-date sorting used elsewhere—scaled to every center you govern.
        </DocP>
      </DocSection>

      <DocSection id="admin-dashboard">
        <DocH2>Dashboard (Admin)</DocH2>
        <DocP>
          Executive-grade overview with mixed date semantics: Presales cards lean on <strong>created</strong> timestamps while Sales cards emphasize <strong>forwarded</strong> intake (with safe fallbacks).
        </DocP>
        <DocAlert variant="warning" title="Stage-aware filtering">
          Because each widget answers a different business question, numbers will not always rise or fall together—validate conclusions using the metric definitions below.
        </DocAlert>
        <DocH3>Top stat cards</DocH3>
        <DocUl
          items={[
            <>
              <strong>Total enquiries:</strong>{' '}
              <DocFormula>Presales inquiries + Sales inquiries</DocFormula> in range.
            </>,
            <>
              <strong>Converted / Admitted:</strong> event counts using <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">convertedAt</code> /{' '}
              <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">admittedAt</code>.
            </>,
            <>
              <strong>Overall conversion %:</strong>{' '}
              <DocFormula>(Converted ÷ Sales inquiries) × 100</DocFormula>.
            </>,
            <>
              <strong>Average response time:</strong>{' '}
              <DocFormula>Σ(attendedAt − forwardedAt) ÷ eligible inquiries</DocFormula>, displayed in human-readable units.
            </>,
          ]}
        />
        <DocH3>Funnel & analytics blocks</DocH3>
        <DocUl
          items={[
            'End-to-end funnel visual aligns to the same KPI definitions for storytelling to leadership.',
            'Performance chart buckets hourly for “Today” and daily for wider ranges.',
            'Source donut + per-source conversion bars highlight channel efficiency.',
            'Center and course analytics expose geography/program bottlenecks.',
            'Top performer boards rank Sales and Presales reps using transparent tie-breakers (conversion rate, admissions, volume).',
          ]}
        />
        <DocGrid cols={2}>
          <DocCard title="Recent activity">
            Streams high-signal events (create, claim, forward, IVR, edits) filtered by the same global date window for quick audits.
          </DocCard>
          <DocCard title="Trend arrows">
            Compare each KPI to the prior equal-length window, with caps to prevent absurd percentages when baselines are tiny.
          </DocCard>
        </DocGrid>
      </DocSection>

      <DocSection id="admin-calls">
        <DocH2>Calls page (Admin)</DocH2>
        <DocP>
          Governance-oriented missed-call queue with direction filters (inbound/outbound/all). Use it to verify service levels
          on telephony-originated demand.
        </DocP>
        <DocP>
          As soon as a newer call or manual activity supersedes the “latest missed” state, the row drops—act while the signal is hot.
        </DocP>
      </DocSection>

      <DocSection id="admin-reports">
        <DocH2>Reports pages</DocH2>
        <DocP>
          Two-tab workspace: <strong>Presales report</strong> and <strong>Sales report</strong>. Controls along the top adjust the dataset sent
          from the API; the name search narrows rows client-side for readability only.
        </DocP>
        <DocH3>Controls</DocH3>
        <DocUl
          items={[
            'Today / All time shortcuts plus relative presets (last week/month/year) and custom from/to.',
            'Export writes CSV for the active tab using server-side filters—may ignore the name search box.',
          ]}
        />
        <DocH3>Presales columns</DocH3>
        <DocP>
          Created count, forwarded count, follow-ups completed, pending follow-ups (excluding forwarded inquiries), and a detail modal per user with nested date filters.
        </DocP>
        <DocH3>Sales columns</DocH3>
        <DocP>
          Attended, conversions, admissions, conversion rate, follow-up completion stats, pending counts, plus drill-down modals that normalize “latest follow-up per inquiry” logic for fairness.
        </DocP>
        <DocAlert variant="tip" title="Modal counters">
          Displays such as “12 / 40” mean filtered subset vs total rows returned for that modal tab—use them to catch partial filter effects.
        </DocAlert>
        <DocAccordion title="Deep dive: Presales detail modal" defaultOpen={false}>
          <DocP className="mt-0">
            The eye action opens a modal with Created Inquiries and Pending Follow-ups subtabs. Date chips inside the modal
            re-filter the already-fetched dataset—counters show filtered vs total rows. Each inquiry row includes its own
            drill-through to the full detail page.
          </DocP>
        </DocAccordion>
        <DocAccordion title="Deep dive: Sales detail modal" defaultOpen={false}>
          <DocP className="mt-0">
            Attended inquiries use engagement proxies (first follow-up date if present, otherwise last update) for quick
            “what did this rep touch today?” reviews. Pending follow-ups collapse to the latest open item per inquiry so
            managers see realistic workload—not historical noise.
          </DocP>
        </DocAccordion>
      </DocSection>

      <DocSection id="admin-users">
        <DocH2>User management</DocH2>
        <DocP>
          Provision and maintain human access: Office 365 directory sync, local CRM users, roles, activation, and center entitlements.
        </DocP>
        <DocH3>Tabs & menus</DocH3>
        <DocUl
          items={[
            <>
              <strong>Office365 tab:</strong> read Entra ID directory, sync users into CRM, map TeleCMI agents via the overflow menu.
            </>,
            <>
              <strong>Local tab:</strong> maintain native CRM accounts with pagination-friendly tools.
            </>,
          ]}
        />
        <DocGrid cols={3}>
          <DocCard title="Edit">
            Opens role + center permissions. Auto-syncs an Office user locally on first edit if needed.
          </DocCard>
          <DocCard title="Activate / deactivate">
            Toggles login eligibility; deactivation forces logout of live sessions.
          </DocCard>
          <DocCard title="Delete">
            Removes local records after confirmation (never for protected admin self-account).
          </DocCard>
        </DocGrid>
        <DocAlert variant="danger" title="Safety rails">
          Admins cannot deactivate or delete themselves; last-admin role demotion is blocked to avoid lockout.
        </DocAlert>
      </DocSection>

      <DocSection id="admin-settings">
        <DocH2>Settings page</DocH2>
        <DocP>
          Master data for dropdowns and validation: courses, locations, inquiry statuses, mediums, and lead stage/sub-stage catalogues. Every downstream form, filter, and report references these values.
        </DocP>
        <DocAlert variant="danger" title="Draft vs saved">
          Edits stay local until <strong>Save Changes</strong> succeeds—navigating away without saving discards draft mutations.
        </DocAlert>
        <DocFlow
          steps={[
            { label: 'Pick the correct tab for the entity you need.', variant: 'primary' },
            { label: 'Add, rename, reorder, or deactivate items as per governance policy.', variant: 'default' },
            { label: 'Repeat across other tabs if you are doing a coordinated launch.', variant: 'default' },
            { label: 'Click Save Changes once to persist atomically.', variant: 'success' },
            { label: 'Smoke-test inquiry forms and filters to verify the new catalogue.', variant: 'warning' },
          ]}
        />
      </DocSection>
      <DocSection id="admin-website-resubmissions">
        <DocH2>Website Resubmissions Page (Admin)</DocH2>
        <DocP>
          A dedicated, real-time monitoring queue for inquiries that have been re-submitted through the website by students who already exist in the system (matched by phone number).
        </DocP>
        <DocH3>Key features & logic</DocH3>
        <DocUl
          items={[
            'Accessed via the Globe/Website icon in the top navigation bar.',
            'As an Admin, you can view resubmitted inquiries from all departments (both Presales and Sales).',
            'Focuses strictly on action: Inquiries appear here only if their latest activity is a "Website Form Resubmission".',
            'Real-time dismissal: The moment any user logs a new follow-up or meaningful activity, the inquiry is instantly and automatically removed from this list.',
            'Streamlined UI: The search bar has been intentionally omitted to encourage clearing the queue quickly rather than using it as a general search page.',
          ]}
        />
        <DocAlert variant="info" title="Why this matters">
          Repeat website submissions signal high intent or urgency from the student. This dashboard ensures they are prioritized and addressed immediately without getting lost in the broader queues.
        </DocAlert>
      </DocSection>
    </>
  );
}
