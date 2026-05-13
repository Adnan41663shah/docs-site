import { motion } from 'framer-motion';
import { DocsPrevNext } from '@/docs-ui/DocsPrevNext';
import { CrmDocsHero } from './CrmDocsHero';
import { InquiryAndPresalesSections } from './sections/InquiryAndPresales';
import { SalesWorkflowSections } from './sections/SalesWorkflow';
import { AdminWorkflowSections } from './sections/AdminWorkflow';

export interface CrmDocsContentProps {
  activeSectionId: string;
  orderedSectionIds: string[];
  idToLabel: Map<string, string>;
  onSelectSection: (id: string) => void;
}

export function CrmDocsContent({
  activeSectionId,
  orderedSectionIds,
  idToLabel,
  onSelectSection,
}: CrmDocsContentProps) {
  return (
    <motion.article
      data-docs-article
      className="docs-prose min-w-0"
      role="main"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-[720px] pb-12">
        <CrmDocsHero />
        <InquiryAndPresalesSections />
        <SalesWorkflowSections />
        <AdminWorkflowSections />
        <DocsPrevNext
          orderedIds={orderedSectionIds}
          idToLabel={idToLabel}
          activeId={activeSectionId}
          onSelect={onSelectSection}
        />
      </div>
    </motion.article>
  );
}
