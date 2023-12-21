import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import MaternalHealthList from './esm-mch-app/views/maternal-health/maternal-health.component';
import { createDashboardGroup } from './clinical-view-group/createDashboardGroup';
import {
  ClinicalDashboardGroup,
  mchDashboardMeta,
  defaulterTracingDashboardMeta,
  htsDashboardMeta,
} from './dashboard.meta';
import DefaulterTracing from './defaulter-tracing/defaulter-tracing.component';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';

import './root.scss';

import HivTestingEncountersList from './esm-hts-app/views/hiv-testing/hiv-testing-services.component';
const moduleName = '@kenyaemr/esm-patient-clinical-view-app';

const options = {
  featureName: 'patient-clinical-view-app',
  moduleName,
};
export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

// Dashboard links
export const clinicalViewGroup = getSyncLifecycle(createDashboardGroup(ClinicalDashboardGroup), options);
export const mchDashboardLink = getSyncLifecycle(createDashboardLink(mchDashboardMeta), options);
export const defaulterTracingLink = getSyncLifecycle(createDashboardLink(defaulterTracingDashboardMeta), options);
export const htsDashboardLink = getSyncLifecycle(createDashboardLink(htsDashboardMeta), options);

// Views
export const mchClinicalView = getSyncLifecycle(MaternalHealthList, options);
export const defaulterTracing = getSyncLifecycle(DefaulterTracing, options);
export const htsClinicalView = getSyncLifecycle(HivTestingEncountersList, options);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
