import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import FormSuppliers from './FormSuppliers';
import { SupplierFormProvider } from '../useSuppliersForm';

function SupplierFormWrapper() {
  return (
    <SupplierFormProvider>
      <LayoutProvider>
        <FormSuppliers />
      </LayoutProvider>
    </SupplierFormProvider>
  );
}

export default SupplierFormWrapper;
