import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import FormItems from './FormInventory';
import { InventoryFormProvider } from '../useInventoryForm';

function EventFormWrapper() {
  return (
    <InventoryFormProvider>
      <LayoutProvider>
        <FormItems />
      </LayoutProvider>
    </InventoryFormProvider>
  );
}

export default EventFormWrapper;
