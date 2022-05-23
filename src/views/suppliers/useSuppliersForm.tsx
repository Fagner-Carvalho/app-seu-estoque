import React from 'react';
import { useForm } from 'src/hooks/';
import { UseForm } from 'src/hooks/useForm';
import { FORM_VALUES } from './form/Form';

interface ISupplierFormContext {
  form: UseForm<any>;
}

interface ISupplierFormConsumer {
  children: (context: ISupplierFormContext) => JSX.Element;
}

interface ISupplierFormProvider {
  children: JSX.Element;
}

const SupplierFormContext = React.createContext({} as ISupplierFormContext);

const useSupplierForm = () => React.useContext(SupplierFormContext);

export const SupplierFormConsumer = ({ children }: ISupplierFormConsumer) => (
  <SupplierFormContext.Consumer>
    {children}
  </SupplierFormContext.Consumer>
);

export const SupplierFormProvider = ({ children }: ISupplierFormProvider) => {
  const form = useForm(FORM_VALUES);

  return (
    <SupplierFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </SupplierFormContext.Provider>
  );
};

export default useSupplierForm;
