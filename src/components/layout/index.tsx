/* eslint-disable react/no-children-prop */
import React from 'react';
import Layout from './Layout';
import { LayoutProvider } from './useLayout';

interface LayoutWrapperProps {
  children: JSX.Element | JSX.Element[] | undefined;
}

function LayoutWrapper(props: LayoutWrapperProps) {
  const { children } = props;
  return (
    <LayoutProvider>
      <Layout>
        {children}
      </Layout>
    </LayoutProvider>
  );
}

export default LayoutWrapper;
