import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import FormUnitMeasures from './FormUnitMeasures';
import { UnitMeasureFormProvider } from '../useUnitMeasuresForm';

function EventFormWrapper() {
  return (
    <UnitMeasureFormProvider>
      <LayoutProvider>
        <FormUnitMeasures />
      </LayoutProvider>
    </UnitMeasureFormProvider>
  );
}

export default EventFormWrapper;
