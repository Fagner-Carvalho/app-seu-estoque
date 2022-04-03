import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import ListItems from './ListItems';

function EventFormWrapper() {
  return (
    <LayoutProvider>
      <ListItems />
    </LayoutProvider>
  );
}

export default EventFormWrapper;
