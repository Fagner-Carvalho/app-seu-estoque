import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import FormCategories from './FormCategories';
import { CategoryFormProvider } from '../useCategoriesForm';

function EventFormWrapper() {
  return (
    <CategoryFormProvider>
      <LayoutProvider>
        <FormCategories />
      </LayoutProvider>
    </CategoryFormProvider>
  );
}

export default EventFormWrapper;
