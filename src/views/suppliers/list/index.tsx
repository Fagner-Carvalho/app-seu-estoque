import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import ListSuppliers from './ListSuppliers';

function SupplierFormWrapper() {
  return (
    <LayoutProvider>
      <ListSuppliers />
    </LayoutProvider>
  );
}

export default SupplierFormWrapper;
