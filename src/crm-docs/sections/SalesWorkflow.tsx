import type { ReactNode } from 'react';
import {
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
  DocTable,
  DocTimeline,
  DocUl,
} from '../CrmDocsPrimitives';

const LEAD_STAGE_ROWS: (string | ReactNode)[][] = [
  ['HOT', 'Registered for Demo', 'Student paid registration fee.'],
  ['HOT', 'Demo Attended', 'Student attended demo (verify attendance).'],
  ['HOT', 'Ready for admission', 'Ready to proceed with admission (with or without demo).'],
  ['HOT', 'Need more follow-up', 'Interested post-demo but needs more nurturing before admission.'],
  ['WARM', 'Ready for Registration', 'Ready to pay registration.'],
  ['WARM', 'Walk-in', 'Physical walk-in for inquiry.'],
  ['WARM', 'In follow-up', 'Needs more time before registration.'],
  ['WARM', 'Call back', 'Did not pick up / will call back (e.g., short DNP window).'],
  ['WARM', 'Planned next month', 'Explicit timeline to next month.'],
  ['WARM', 'Join later', 'Interest exists but timeline unknown.'],
  ['COLD', 'Financial issue', 'Genuine affordability concern but interest remains.'],
  ['COLD', 'Duplicate enquiry', 'Duplicate record detected in CRM.'],
  ['COLD', 'Switch off', 'Phone powered off—plan retries.'],
  ['COLD', 'Already enrolled elsewhere', 'Joined another institute (even after registration in some cases).'],
  ['COLD', 'Not responding after registration', 'DNP ~10 days post-registration.'],
  ['COLD', 'Not responding after demo', 'DNP ~10 days post-demo.'],
  ['COLD', 'Not responding after presales', 'No contact ~5 days after handoff / invalid number.'],
  ['Not interested', 'Not connected', 'No response after extended attempt cadence (e.g., 30 tries).'],
  ['Admitted (closed)', 'Admission done', 'Final successful closure.'],
];

export function SalesWorkflowSections() {
  return (
    <>
      <DocSection id="sales-lead-stages">
        <DocH2>Lead stage and sub-stage</DocH2>
        <DocP>
          Sales uses structured <strong>stages</strong> and <strong>sub-stages</strong> to communicate pipeline quality without
          reading every note. Pick the combination that best matches the last conversation—this powers analytics and
          coaching.
        </DocP>
        <DocAlert variant="info" title="How this differs from Presales “status”">
          Presales statuses describe early interest temperature. Sales lead stages describe counselor pipeline progress after
          attendance.
        </DocAlert>
        <DocTable headers={['Stage', 'Sub-stage', 'When to use']} rows={LEAD_STAGE_ROWS} />
      </DocSection>

      <DocSection id="sales-dashboard">
        <DocH2>Sales dashboard (overview)</DocH2>
        <DocP>
          Personal performance analytics for the selected window (Today, 7D, 30D, Quarter, Custom). Each KPI uses its own
          event timestamps—cards will not always move in lockstep.
        </DocP>
        <DocAlert variant="info" title="Trend calculation">
          Each card compares the current period to the immediately previous period of equal length.{' '}
          <DocFormula>Trend % = ((Current − Previous) / Previous) × 100</DocFormula>
          For response-time style metrics, <em>lower</em> is better.
        </DocAlert>
        <DocH3>Core KPI cards</DocH3>
        <DocUl
          items={[
            <>
              <strong>Assigned / attended inquiries:</strong> volume you actively worked in the period.
            </>,
            <>
              <strong>Conversions:</strong> count of inquiries marked converted where <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">convertedAt</code> falls in range.
            </>,
            <>
              <strong>Admissions:</strong> admitted flags with <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">admittedAt</code> in range.
            </>,
            <>
              <strong>Conversion rate:</strong>{' '}
              <DocFormula>(Conversions ÷ Assigned inquiries) × 100</DocFormula> (guards against divide-by-zero).
            </>,
            <>
              <strong>Average response time:</strong> mean of (attendedAt − forwardedAt) for eligible inquiries—shorter is better.
            </>,
          ]}
        />
        <DocH3>Charts</DocH3>
        <DocUl
          items={[
            <>
              <strong>Performance over time:</strong> daily (or hourly for “Today”) counts for inquiries, conversions, and admissions.
            </>,
            <>
              <strong>Lead source donut:</strong> contribution by channel; slice size reflects share of volume in range.
            </>,
          ]}
        />
        <DocGrid cols={2}>
          <DocCard title="Follow-up health">
            <strong>Overdue</strong> pending tasks past due time vs <strong>Upcoming</strong> future tasks—use together to plan your day.
          </DocCard>
          <DocCard title="Coaching tip">
            If totals look “odd,” verify you picked the right date preset—conversion spikes may lag attendance spikes by days or weeks.
          </DocCard>
        </DocGrid>
      </DocSection>

      <DocSection id="sales-admitted">
        <DocH2>Admitted students (Sales view)</DocH2>
        <DocP>
          Lists inquiries in admitted state for accountability and celebration tracking. Toggle between <strong>My Admissions</strong>{' '}
          and <strong>All Admissions</strong> (still scoped to centers you can access).
        </DocP>
        <DocUl
          items={[
            'Filter by search, course, location, and admission date range.',
            'Sort by admission date when reviewing recent closures.',
            'Reversing admission state is restricted—contact Admin if policy allows a correction.',
          ]}
        />
      </DocSection>

      <DocSection id="sales-conversions">
        <DocH2>Conversions page (Sales view)</DocH2>
        <DocP>
          Mirrors the admissions page but for the conversion milestone. Use <strong>My Conversions</strong> vs{' '}
          <strong>All Conversions</strong> depending on whether you are reviewing personal wins or center-wide outcomes.
        </DocP>
        <DocAlert variant="warning" title="Business rule">
          Mark conversion only when your organization defines that milestone as met (e.g., fee paid / seat confirmed). downstream reporting depends on discipline here.
        </DocAlert>
      </DocSection>

      <DocSection id="sales-followups">
        <DocH2>Sales My Follow-Ups</DocH2>
        <DocP>
          Identical conceptual model to Presales follow-ups but scoped to Sales-assigned work. This is your daily execution
          surface for callbacks and visits.
        </DocP>
        <DocH3>Actions</DocH3>
        <DocOl
          items={[
            <>
              <strong>Mark complete</strong> from the pending list—provide a closure message for auditability.
            </>,
            <>
              <strong>Export</strong> respects current filters and tab context (name search may not apply to export depending on implementation—verify before sharing externally).
            </>,
            'Use Overdue (pending tab) as your first sweep each morning.',
          ]}
        />
        <DocAlert variant="info" title="Single pending follow-up rule">
          If your pending follow-up exists, the UI may block creating another until you close the previous one—this prevents conflicting commitments on the same lead.
        </DocAlert>
      </DocSection>

      <DocSection id="sales-my-inquiries">
        <DocH2>My Inquiries (Sales)</DocH2>
        <DocP>Combined workspace for personal pipeline ownership.</DocP>
        <DocGrid cols={2}>
          <DocCard title="My attended inquiries">
            Everything currently assigned to you. Filters include attended date range, location, course, and quick presets.
            Sort by forwarded or attended timestamps to match your review style.
          </DocCard>
          <DocCard title="My raised inquiries">
            Manual leads you originated as Sales. Track your own sourcing in addition to forwarded Presales volume.
          </DocCard>
        </DocGrid>
      </DocSection>

      <DocSection id="sales-center-inquiries">
        <DocH2>Center inquiries page</DocH2>
        <DocP>
          Primary Sales queue for a center. Sidebar badges often surface counts of <strong>new</strong> (unattended) items needing
          attention.
        </DocP>
        <DocH3>Quick filters</DocH3>
        <DocUl
          items={[
            <>
              <strong>All:</strong> entire Sales-visible pipeline for the center.
            </>,
            <>
              <strong>New:</strong> forwarded but not yet attended / unassigned.
            </>,
            <>
              <strong>In progress:</strong> attended and owned by a sales user.
            </>,
          ]}
        />
        <DocP>
          Row click opens inquiry details. Use the dashboard shortcut to jump into that center’s analytics when planning team
          capacity.
        </DocP>
        <DocP>
          Date filters generally anchor to <strong>forwardedAt</strong> so you measure Sales SLA from the moment Presales handed off.
        </DocP>
      </DocSection>

      <DocSection id="sales-e2e">
        <DocH2>Sales inquiry workflow (end-to-end)</DocH2>
        <DocP>
          <strong>Entry:</strong> most work arrives via Presales forward; Sales can also raise net-new inquiries from the navbar
          when walk-ins or partner referrals occur.
        </DocP>
        <DocFlow
          steps={[
            { label: 'Forwarded inquiry lands in center queue as New.', variant: 'primary' },
            { label: 'Open details → click Attend to claim ownership.', variant: 'default' },
            { label: 'Complete the enforced first follow-up dialog to finish attendance.', variant: 'warning' },
            { label: 'Work the deal: WhatsApp, edits, reassign, structured lead stage updates.', variant: 'default' },
            { label: 'Convert when milestone met; admit when enrollment completes.', variant: 'success' },
            { label: 'If you lose the account, reassign with context in notes.', variant: 'danger' },
          ]}
        />
        <DocH3>Permissions snapshot</DocH3>
        <DocUl
          items={[
            'Edit + follow-up creation are limited to inquiries assigned to you (unless Admin).',
            'Converted / admitted flags may be irreversible for Sales—ask Admin for controlled corrections.',
            'Follow-up table + activity timeline provide audit evidence for disputes and QA.',
          ]}
        />
        <DocH3>Decision guide</DocH3>
        <DocTable
          headers={['Scenario', 'Action']}
          rows={[
            ['New row in Sales queue', 'Open → Attend immediately.'],
            ['Need another touchpoint', 'Add follow-up with explicit next datetime.'],
            ['Need another follow-up slot', 'Close prior pending follow-up first.'],
            ['Student meets conversion definition', 'Mark as converted from the action menu.'],
            ['Admission finalized', 'Mark as admitted.'],
            ['Wrong owner', 'Reassign to correct counselor with notes.'],
            ['Daily planning', 'Start from My Follow-Ups (Pending + Overdue).'],
          ]}
        />
        <DocH3>Mini lifecycle timeline</DocH3>
        <DocTimeline
          items={[
            {
              title: 'Forwarded',
              body: 'Inquiry becomes visible in Sales with history from Presales intact.',
            },
            {
              title: 'Attended',
              body: 'Ownership locked to you; SLA clock from forward → attend stops incrementing.',
            },
            {
              title: 'Nurture',
              body: 'Lead stages document micro-state; follow-ups orchestrate next conversations.',
            },
            {
              title: 'Outcome',
              body: 'Convert and/or admit—or document loss with truthful reasons.',
            },
          ]}
        />
      </DocSection>
      <DocSection id="sales-website-resubmissions">
        <DocH2>Website Resubmissions Page (Sales)</DocH2>
        <DocP>
          A dedicated queue highlighting your Sales leads who have re-submitted the website form, indicating renewed interest or an urgent question.
        </DocP>
        <DocH3>How it works</DocH3>
        <DocUl
          items={[
            'Access it by clicking the Globe/Website icon in the top navigation bar.',
            'As Sales, you will only see resubmissions for inquiries that belong to the Sales department.',
            'An inquiry appears here only when its most recent recorded activity is a "Website Form Resubmission".',
            'To clear an inquiry from this list, simply log a new follow-up or add meaningful activity. The inquiry will vanish from the queue instantly in real-time.',
          ]}
        />
        <DocAlert variant="info" title="Why this is useful">
          It acts as a high-priority "hot" list. If a student resubmits the form while already in your pipeline, they are trying to reach you right now. Calling them back immediately significantly improves conversion chances.
        </DocAlert>
      </DocSection>
    </>
  );
}
