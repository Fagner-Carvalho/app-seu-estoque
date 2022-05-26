import React from 'react';
import { useForm } from 'src/hooks/';
import { UseForm } from 'src/hooks/useForm';
import { FORM_VALUES } from './form/Form';

interface IInventoryFormContext {
  form: UseForm<any>;
}

interface IInventoryFormConsumer {
  children: (context: IInventoryFormContext) => JSX.Element;
}

interface IInventoryFormProvider {
  children: JSX.Element;
}

const InventoryFormContext = React.createContext({} as IInventoryFormContext);

const useInventoryForm = () => React.useContext(InventoryFormContext);

export const InventoryFormConsumer = ({ children }: IInventoryFormConsumer) => (
  <InventoryFormContext.Consumer>
    {children}
  </InventoryFormContext.Consumer>
);

export const InventoryFormProvider = ({ children }: IInventoryFormProvider) => {
  const form = useForm(FORM_VALUES);

  return (
    <InventoryFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </InventoryFormContext.Provider>
  );
};

export default useInventoryForm;
