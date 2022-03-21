import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import FormUsers from './FormUsers';
import { UserFormProvider } from '../useUsersForm';

function EventFormWrapper() {
  return (
    <UserFormProvider>
      <LayoutProvider>
        <FormUsers />
      </LayoutProvider>
    </UserFormProvider>
  );
}

export default EventFormWrapper;
