import React, { useRef, useState } from 'react';
import styles from './enhanced-adherence.scss';
import { Tab, Tabs, TabList, TabPanel, TabPanels, StructuredListSkeleton, Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useLayoutType, useSession } from '@openmrs/esm-framework';
import { useEnhancedAdherence } from '../hooks/useEnhancedAdherenceSessions';
import { Printer } from '@carbon/react/icons';
import { useReactToPrint } from 'react-to-print';
import EnhancedAdherenceDataTable from './EnhancedAdherenceDataTable.component';
import EncounterTable from './encounter-table.component';
import { mapEncounters } from './encounter.resource';

interface EnhancedAdherenceProps {
  patientUuid: string;
}

const EnhancedAdherenceSessions: React.FC<EnhancedAdherenceProps> = ({ patientUuid }) => {
  const { data, isError, isLoading } = useEnhancedAdherence(patientUuid);
  const currentUserSession = useSession();
  const componentRef = useRef(null);
  const [printMode, setPrintMode] = useState(false);
  const layout = useLayoutType();
  const { t } = useTranslation();
  const isTablet = useLayoutType() == 'tablet';

  const printRef = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setPrintMode(true),
    onAfterPrint: () => setPrintMode(false),
    pageStyle: styles.pageStyle,
    documentTitle: 'Enhanced Adherence',
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handlePrint = async () => {
    await delay(500);
    printRef();
  };


  const tableHeaders = [
    {
      key: 'encDate',
      header: t('enconterDate', 'Encounter Date'),
    },
    {
      key: 'episodeStartDate',
      header: t('dateOFirstSession', 'Date of first session'),
    },
    {
      key: 'sessionNum',
      header: t('sesionNumber', 'Session Number'),
    }
  ];
  // If still loading
  if (isLoading) {
    return <StructuredListSkeleton role="progressbar" />;
  }

  // If there is an error
  if (isError) {
    return <span>{t('errorEnhancedAdherence', 'Error loading enhanced adherence history')}</span>;
  }

  if (Object.keys(data).length > 0) {
    
    return <div>
    {Object.entries(data).map((rowData) => 
      // <EnhancedAdherenceDataTable data={rowData} tableHeaders={tableHeaders} seriesStart={key} />
      <EncounterTable visits={mapEncounters(rowData)} showAllEncounters={false} />
    )}
    </div>
  } else {
    return (
      <div>No history of enhanced adherence counseling</div>
    );
  }



};

export default EnhancedAdherenceSessions;
