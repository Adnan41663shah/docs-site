import { useEffect } from 'react';
import CrmDocsLayout from './crm-docs/CrmDocsLayout';

const DOCUMENT_TAB_TITLE = 'CloudBlitz CRM Documentation';

function App() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = DOCUMENT_TAB_TITLE;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return <CrmDocsLayout />;
}

export default App;
