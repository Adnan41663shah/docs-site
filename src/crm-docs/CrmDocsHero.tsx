import { motion } from 'framer-motion';
import { BookOpen, GitBranch, LayoutDashboard, Shield, Users } from 'lucide-react';
import { DocCard, DocGrid } from './CrmDocsPrimitives';

export function CrmDocsHero() {
  return (
    <div
      id="docs-welcome"
      data-doc-section
      className="scroll-mt-[calc(var(--docs-header-h,3.5rem)+0.75rem)] border-b border-slate-200/70 pb-16 pt-2 dark:border-slate-800/70"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl border border-slate-200/80 bg-white px-6 py-12 shadow-sm ring-1 ring-slate-200/40 dark:border-slate-800/90 dark:bg-slate-950 dark:shadow-none dark:ring-slate-800/60 sm:px-10 sm:py-14"
      >
        <div className="relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            CloudBlitz CRM
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
            Documentation Portal
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Welcome to the CRM Documentation Portal. This guide helps your teams understand the complete inquiry
            lifecycle—workflows, responsibilities, dashboards, follow-ups, admissions, conversions, and administration—so
            you can operate the system with confidence.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">What this CRM does:</strong> centralizes leads from calls,
            website, and manual entry; routes them through Presales qualification; forwards sales-ready opportunities to
            Sales; tracks follow-ups, lead stages, conversions, and admissions; and gives Admins visibility, controls, and
            configuration across the organization.
          </p>
        </div>

        <DocGrid cols={3} className="mt-10">
          <DocCard title="Inquiry lifecycle" tone="accent">
            <p>
              Capture → qualify → forward → attend → nurture → convert → admit—with a full audit trail on every inquiry.
            </p>
          </DocCard>
          <DocCard title="Role-based access" tone="accent">
            <p>
              Presales, Sales, and Admin each see tailored queues, dashboards, and actions aligned to how they work day to
              day.
            </p>
          </DocCard>
          <DocCard title="Integrations" tone="accent">
            <p>
              Website forms and IVR/TeleCMI can create or enrich inquiries automatically, reducing manual data entry while
              preserving history.
            </p>
          </DocCard>
        </DocGrid>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              icon: GitBranch,
              title: 'Workflows',
              text: 'End-to-end paths from new lead to admission, including edge cases and ownership rules.',
            },
            {
              icon: LayoutDashboard,
              title: 'Dashboards',
              text: 'KPI cards and charts with explicit date logic so you interpret metrics correctly.',
            },
            {
              icon: Users,
              title: 'Teams',
              text: 'Presales vs Sales responsibilities, plus how Admin supervises and intervenes.',
            },
            {
              icon: Shield,
              title: 'Governance',
              text: 'Users, centers, master data, reports, and operational safeguards.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="flex min-w-0 gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/55"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
                <p className="mt-1 text-xs leading-relaxed break-words text-slate-600 dark:text-slate-400">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-slate-300/70 bg-white/70 px-4 py-3.5 text-sm text-slate-600 shadow-inner dark:border-slate-600 dark:bg-slate-900/45 dark:text-slate-300">
          <BookOpen className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
          <span>
            Use the sidebar to jump to any topic. On mobile, open the menu to browse sections. Each page explains{' '}
            <em>what</em> it does, <em>who</em> uses it, and <em>which actions</em> to take—including validations and
            business rules.
          </span>
        </div>
      </motion.div>

      <DocGrid cols={2} className="mt-12">
        <DocCard title="Presales responsibilities">
          <p>
            First contact, duplicate-safe intake, status hygiene, follow-up discipline, center queues, and forwarding only
            when a lead is genuinely sales-ready.
          </p>
        </DocCard>
        <DocCard title="Sales responsibilities">
          <p>
            Claim (Attend) forwarded work, own the pipeline, maintain lead stages, complete follow-ups, reassign when
            needed, and record conversions and admissions accurately.
          </p>
        </DocCard>
      </DocGrid>

      <DocCard title="High-level architecture (logical)" className="mt-4" tone="muted">
        <p className="font-mono text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
          Channels (Web / IVR / Manual) → Presales queue → Qualification & follow-ups → Forward to Sales → Center queues &
          ownership → Lead stages → Conversion / Admission → Reporting & admin controls → Master data (Settings)
        </p>
      </DocCard>
    </div>
  );
}
