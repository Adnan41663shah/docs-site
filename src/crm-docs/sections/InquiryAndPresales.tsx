import {
  DocAlert,
  DocBadge,
  DocBestPractice,
  DocCard,
  DocFlow,
  DocGrid,
  DocH2,
  DocH3,
  DocOl,
  DocP,
  DocSection,
  DocTable,
  DocUl,
} from '../CrmDocsPrimitives';

export function InquiryAndPresalesSections() {
  return (
    <>
      <DocSection id="inquiry-workflow">
        <DocH2>Overall inquiry workflow</DocH2>
        <DocP>
          This is the canonical lifecycle every team member should understand. Inquiries move from capture through
          Presales qualification, into Sales execution, and finally to conversion or admission—while Admins supervise,
          reassign, and configure the platform.
        </DocP>
        <DocFlow
          steps={[
            { label: 'A new inquiry is created (call, website, or manual entry).', variant: 'primary' },
            { label: 'Presales reviews details and contacts the student.', variant: 'default' },
            { label: 'Presales logs outcomes, updates status, and schedules follow-ups as needed.', variant: 'default' },
            { label: 'If unreachable, Presales schedules another follow-up.', variant: 'warning' },
            { label: 'If not interested, Presales records the reason and appropriate status.', variant: 'danger' },
            { label: 'If qualified, Presales forwards the inquiry to Sales.', variant: 'success' },
            { label: 'Sales reviews full history, attends (claims), and continues the journey.', variant: 'default' },
            { label: 'Sales maintains lead stage, messages, and follow-up cadence.', variant: 'default' },
            { label: 'Sales marks Converted when the student commits at that milestone.', variant: 'success' },
            { label: 'Sales marks Admitted when admission is completed.', variant: 'success' },
            { label: 'If the lead drops, Sales documents closure reasons.', variant: 'danger' },
            { label: 'Admin monitors queues, quality, users, reports, and master data.', variant: 'primary' },
          ]}
        />
        <DocAlert variant="danger" title="Operating rule">
          Every active inquiry must have accurate details, a clear owner where applicable, the latest customer message,
          and a truthful next action or follow-up date.
        </DocAlert>
        <DocBestPractice>
          Treat the inquiry timeline as the source of truth—future handovers (Presales → Sales) depend on complete notes
          and correct statuses.
        </DocBestPractice>
      </DocSection>

      <DocSection id="presales-workflow">
        <DocH2>Inquiry workflow for Presales</DocH2>
        <DocP>
          <strong>Who uses this:</strong> Presales counselors. <strong>Why:</strong> to intake, qualify, and prepare
          leads before Sales invests counselor time.
        </DocP>
        <DocH3>How an inquiry enters the system</DocH3>
        <DocUl
          items={[
            <>
              <strong>Manual:</strong> use <em>New Inquiry</em> in the navbar, complete required fields, submit.
            </>,
            <>
              <strong>Website:</strong> integrated forms can auto-create Presales inquiries (duplicate-safe by phone).
            </>,
            <>
              <strong>IVR / call:</strong> new numbers can auto-create a minimal phone-first inquiry; existing numbers
              attach activity to the current record.
            </>,
          ]}
        />
        <DocH3>Manual creation — field guide</DocH3>
        <DocUl
          items={[
            <>
              <strong>Required:</strong> phone, preferred location, source, and message.
            </>,
            <>
              <strong>Optional:</strong> name, city, course, status (defaults often to <DocBadge variant="warm">Warm</DocBadge>
              ).
            </>,
            <>
              While typing a phone number, the system checks for duplicates before you submit.
            </>,
          ]}
        />
        <DocH3>Creation actions (mutually exclusive)</DocH3>
        <DocP>Before submitting, choose one path—only one applies at creation time:</DocP>
        <DocGrid cols={3}>
          <DocCard title="No forward + no schedule">
            Inquiry stays in Presales for normal handling. Appears in All Inquiries and center queues.
          </DocCard>
          <DocCard title="Forward to Sales" tone="accent">
            Immediately moves the inquiry to Sales with “forwarded” semantics. Presales can no longer edit it; it appears
            in My Raised (Forwarded) for traceability.
          </DocCard>
          <DocCard title="Schedule follow-up">
            Stays in Presales and creates a pending follow-up on the date/time you select—visible under My Follow-Ups.
          </DocCard>
        </DocGrid>
        <DocH3>Duplicate phone handling</DocH3>
        <DocP>
          If the phone already exists, you’ll see a warning with <strong>Fetch</strong>. Fetch loads the existing inquiry,
          locks historical fields, and switches the form to “add message” mode—preventing duplicate records while preserving
          a single timeline.
        </DocP>
        <DocAlert variant="info" title="Why this matters">
          Duplicate suppression keeps reporting clean and ensures WhatsApp, calls, and follow-ups stay on one student
          record.
        </DocAlert>
        <DocH3>Daily execution loop</DocH3>
        <DocOl
          items={[
            'Open the inquiry from a list.',
            'Review details and the activity timeline.',
            'Edit inquiry, add or close follow-ups, or forward to Sales when qualified.',
          ]}
        />
        <DocH3>Automatic ownership for system-created leads</DocH3>
        <DocP>
          When the system auto-creates an inquiry, the first user who performs a meaningful edit or creates the first
          follow-up is treated as the creator for operational tracking—encouraging quick ownership of inbound leads.
        </DocP>
        <DocTable
          headers={['Scenario', 'Recommended action']}
          rows={[
            ['Early / nurturing lead', 'Create + schedule follow-up'],
            ['Qualified / sales-ready', 'Forward to Sales'],
            ['Same phone already exists', 'Fetch + add message (never duplicate)'],
            ['Uncertain quality', 'Create without forward; decide after discovery'],
          ]}
        />
        <DocAlert variant="warning" title="Follow-up rule">
          Typically one active pending follow-up per inquiry per user. Close the existing follow-up (with a closure
          message) before opening another, unless your org policy explicitly differs.
        </DocAlert>
      </DocSection>

      <DocSection id="presales-all-inquiries">
        <DocH2>All Inquiries page (Presales)</DocH2>
        <DocP>
          <strong>Purpose:</strong> primary working queue for Presales-visible inquiries. <strong>Filters:</strong> course,
          location, status, medium, and date help you segment outreach.
        </DocP>
        <DocH3>Presales status vocabulary</DocH3>
        <DocGrid cols={2}>
          <DocCard title="Hot">
            Strong intent—likely to progress soon. Use for genuinely qualified, responsive prospects.
          </DocCard>
          <DocCard title="Warm">
            Interested but needs nurturing, more information, or time before the next milestone.
          </DocCard>
          <DocCard title="Cold">
            Low urgency or long-cycle interest—still valid, but prioritize carefully against hotter backlog.
          </DocCard>
          <DocCard title="Not interested">
            Explicit rejection—document the reason so future campaigns respect the student’s decision.
          </DocCard>
        </DocGrid>
        <DocUl
          items={[
            'Scan for new items regularly—especially website/IVR “fresh” leads.',
            'Open each row to read the full story before calling.',
            'After every meaningful touch, update the inquiry and/or schedule the next step.',
          ]}
        />
        <DocBestPractice>
          Pair list filters with center queues when you are responsible for specific geographies.
        </DocBestPractice>
      </DocSection>

      <DocSection id="presales-my-raised">
        <DocH2>My Raised Inquiries page</DocH2>
        <DocP>
          Shows inquiries you personally created—helpful for accountability and revisiting your own pipeline contribution.
        </DocP>
        <DocH3>Remaining vs Forwarded (toggle filters)</DocH3>
        <DocGrid cols={2}>
          <DocCard title="Remaining">
            Your created inquiries still in Presales (not yet forwarded). Date filters use <strong>created date</strong>.
          </DocCard>
          <DocCard title="Forwarded (My Raised)" tone="accent">
            Inquiries you originated that reached Sales (forwarded by anyone). Date filters use <strong>forwarded date</strong>.
          </DocCard>
        </DocGrid>
        <DocAlert variant="warning" title="Date range tip">
          For predictable results, set both <em>From</em> and <em>To</em>. Single-sided ranges may not apply the backend
          window you expect.
        </DocAlert>
      </DocSection>

      <DocSection id="presales-followups">
        <DocH2>My Follow-Ups page (Presales)</DocH2>
        <DocP>
          Your operational task list. Pending items are commitments to contact or progress a student by a specific time.
        </DocP>
        <DocH3>Tabs</DocH3>
        <DocUl
          items={[
            <>
              <strong>Pending:</strong> actionable tasks. The list emphasizes your latest active follow-up per inquiry to
              reduce clutter.
            </>,
            <>
              <strong>Completed:</strong> historical closures for audit and coaching.
            </>,
            <>
              <strong>Overdue</strong> (pending tab): next follow-up datetime is already in the past—prioritize these.
            </>,
          ]}
        />
        <DocTable
          headers={['Filter', 'Behavior']}
          rows={[
            [
              'Time period',
              'All Time / Today / Upcoming (pending) / Custom range—each scopes the correct datetime field per tab.',
            ],
            ['Status / Center / Course', 'Narrows the task list to the segment you own.'],
          ]}
        />
        <DocAlert variant="info" title="Date logic">
          Pending tab filters against <strong>next follow-up date</strong>. Completed tab prefers <strong>completed date</strong>{' '}
          (with sensible fallbacks).
        </DocAlert>
      </DocSection>

      <DocSection id="presales-center-queues">
        <DocH2>Center-wise inquiry queues</DocH2>
        <DocP>
          Center-focused views (e.g., Nagpur, Pune) so Presales can prioritize geography-specific campaigns or staffing.
        </DocP>
        <DocH3>Quick filters</DocH3>
        <DocUl
          items={[
            <>
              <strong>All:</strong> every Presales inquiry for that center.
            </>,
            <>
              <strong>New:</strong> “Fresh” system-defined leads—typically auto-intake without follow-up, assignment, or
              substantive edits yet.
            </>,
            <>
              <strong>In Progress:</strong> everything that is no longer classified as New.
            </>,
          ]}
        />
      </DocSection>

      <DocSection id="presales-forwarding">
        <DocH2>Forwarding inquiries to Sales</DocH2>
        <DocP>
          Forwarding is the controlled handover from Presales to Sales. After forward, Presales loses edit rights on that
          inquiry; Sales becomes responsible for attending and progressing the deal.
        </DocP>
        <DocH3>Forward at creation</DocH3>
        <DocP>
          Select <strong>Forward to Sales</strong> in the create modal when the lead is already counselor-ready. The inquiry
          immediately appears in Sales queues as <em>new / unattended</em> until a sales user attends it.
        </DocP>
        <DocH3>Forward later from inquiry details</DocH3>
        <DocOl
          items={[
            'Open the inquiry detail page.',
            'Choose Forward to Sales and confirm the dialog.',
            'System moves department, updates assignment semantics, and auto-closes pending Presales follow-ups with an audit note.',
          ]}
        />
        <DocAlert variant="danger" title="Post-forward behavior">
          Pending Presales follow-ups on that inquiry are closed by the system to prevent duplicate work across departments.
        </DocAlert>
      </DocSection>

      <DocSection id="presales-auto">
        <DocH2>Automatic inquiry creation (call or website)</DocH2>
        <DocP>
          Auto-leads accelerate intake but still need human verification—names, courses, and intent may be partial at
          creation time.
        </DocP>
        <DocGrid cols={2}>
          <DocCard title="IVR / missed-call path">
            <DocUl
              items={[
                'New number → minimal Presales inquiry (often phone + source).',
                'Known number → call activity attaches to the existing inquiry.',
                'Enrich fields, add a message, and schedule follow-up or forward when qualified.',
              ]}
            />
          </DocCard>
          <DocCard title="Website path">
            <DocUl
              items={[
                'First submission → new inquiry.',
                'Repeat submissions with same phone → new activity note, not a duplicate record.',
                'Respond quickly; early contact improves conversion odds.',
              ]}
            />
          </DocCard>
        </DocGrid>
      </DocSection>

      <DocSection id="presales-dashboard">
        <DocH2>Presales dashboard</DocH2>
        <DocP>
          A personal performance snapshot for the selected period. Each KPI card intentionally uses a different timestamp
          field—counts may diverge and still be correct.
        </DocP>
        <DocGrid cols={3}>
          <DocCard title="Raised inquiries">Count of inquiries you created in the range (createdAt).</DocCard>
          <DocCard title="Forwarded by me">Handovers you executed (forwardedAt).</DocCard>
          <DocCard title="Overdue follow-ups">Pending items past due datetime.</DocCard>
          <DocCard title="Pending follow-ups">All open tasks you must execute.</DocCard>
          <DocCard title="Completed follow-ups">Closures you completed in the range.</DocCard>
        </DocGrid>
        <DocAlert variant="warning" title="Reading trends">
          Trend arrows compare the current period to the immediately previous period of equal length. Interpret direction
          based on whether higher or lower is “good” for that metric.
        </DocAlert>
      </DocSection>

      <DocSection id="presales-calls">
        <DocH2>Calls page (Presales view)</DocH2>
        <DocP>
          A live missed-call queue. Each row represents an inquiry whose latest telephony signal is a missed inbound
          attempt—ideal for rapid callback workflows.
        </DocP>
        <DocUl
          items={[
            'Click a row to jump straight into inquiry details.',
            'After you add meaningful activity (follow-up, edit, forward), the row typically leaves the queue.',
          ]}
        />
      </DocSection>
    </>
  );
}
