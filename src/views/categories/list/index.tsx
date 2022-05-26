import React from 'react';
import { LayoutProvider } from 'src/components/layout/useLayout';
import ListCategories from './ListCategories';

function CategoryFormWrapper() {
  return (
    <LayoutProvider>
      <ListCategories />
    </LayoutProvider>
  );
}

export default CategoryFormWrapper;
