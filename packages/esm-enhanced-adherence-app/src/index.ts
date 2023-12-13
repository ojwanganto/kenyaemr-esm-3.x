import { getAsyncLifecycle, defineConfigSchema, registerBreadcrumbs, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { dashboardMeta } from './dashboard.meta';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';

const moduleName = '@kenyaemr/esm-enhanced-adherence-app';

const options = {
  featureName: 'enhanced-adherence',
  moduleName,
};
export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const enhancedAdherenceComponent = getAsyncLifecycle(
  () => import('./enhanced-adherence/enhanced-adherence-sessions.component'),
  options,
);

export const enhancedAdherenceManagementDashboardLink = getSyncLifecycle(createDashboardLink({ ...dashboardMeta, moduleName }), options);

export function startupApp() {
  registerBreadcrumbs([]);
  defineConfigSchema(moduleName, configSchema);
}
