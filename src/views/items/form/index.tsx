import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import FormItems from './FormItems';
import { UserFormProvider } from '../useItemsForm';

function EventFormWrapper() {
  return (
    <UserFormProvider>
      <LayoutProvider>
        <FormItems />
      </LayoutProvider>
    </UserFormProvider>
  );
}

export default EventFormWrapper;
