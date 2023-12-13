import React, { useMemo } from 'react';
import styles from './enhanced-adherence.scss';
import { useTranslation } from 'react-i18next';
import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';
import { usePagination } from '@openmrs/esm-framework';
import { PatientChartPagination } from '@openmrs/esm-patient-common-lib';
import { EnhancedAdherenceEncounter } from '../types';

interface AdherenceDataTableProps {
  data: Array<any>;
  tableHeaders: Array<any>;
  seriesStart: string;
}

const EnhancedAdherenceDataTable: React.FC<AdherenceDataTableProps> = ({ data, tableHeaders, seriesStart }) => {
  const { t } = useTranslation();
  console.log('our data: ', data)
  const pagesize = 5;
  const { results: paginatedData, goTo, currentPage } = usePagination(data ?? [], pagesize);

  const tableRows = useMemo(() => {
    return paginatedData?.map((payload) => ({
      id: `${payload.uuid}`,
      ...payload,
    }));
  }, [paginatedData]);

  return (
    <div className={styles.widgetCard}>
      <span>Series start: {seriesStart}</span>
      <DataTable rows={tableRows} headers={tableHeaders}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
      <PatientChartPagination
        currentItems={paginatedData.length}
        onPageNumberChange={({ page }) => goTo(page)}
        pageNumber={currentPage}
        pageSize={pagesize}
        totalItems={data.length}
      />
    </div>
  );
};

export default EnhancedAdherenceDataTable;
