import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import ListInventory from './ListInventory';

function EventFormWrapper() {
  return (
    <LayoutProvider>
      <ListInventory />
    </LayoutProvider>
  );
}

export default EventFormWrapper;
