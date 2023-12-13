import { openmrsFetch } from '@openmrs/esm-framework';
import useSWR from 'swr';
import { EnhancedAdherenceEncounter } from '../types/index';

export const useEnhancedAdherence = (patientUuid: string) => {
  const adherenceSessionsSummaryUrl = `/ws/rest/v1/encounter?patient=${patientUuid}&encounterType=54df6991-13de-4efc-a1a9-2d5ac1b72ff8&v=full`;
  const { data, mutate, error, isLoading } = useSWR<{ data: { results: Array<Record<string, unknown>> } }>(adherenceSessionsSummaryUrl, openmrsFetch);

  return {
    data: data?.data ? data?.data?.results : null,
    isError: error,
    isLoading: isLoading,
  };
};
