import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import ListUsers from './ListUsers';

function EventFormWrapper() {
  return (
    <LayoutProvider>
      <ListUsers />
    </LayoutProvider>
  );
}

export default EventFormWrapper;
