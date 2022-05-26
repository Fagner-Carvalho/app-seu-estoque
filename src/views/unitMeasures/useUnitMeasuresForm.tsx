import React from 'react';
import { useForm } from 'src/hooks/';
import { UseForm } from 'src/hooks/useForm';
import { FORM_VALUES } from './form/Form';

interface IUnitMeasureFormContext {
  form: UseForm<any>;
}

interface IUnitMeasureFormConsumer {
  children: (context: IUnitMeasureFormContext) => JSX.Element;
}

interface IUnitMeasureFormProvider {
  children: JSX.Element;
}

const UnitMeasureFormContext = React.createContext({} as IUnitMeasureFormContext);

const useUnitMeasureForm = () => React.useContext(UnitMeasureFormContext);

export const UnitMeasureFormConsumer = ({ children }: IUnitMeasureFormConsumer) => (
  <UnitMeasureFormContext.Consumer>
    {children}
  </UnitMeasureFormContext.Consumer>
);

export const UnitMeasureFormProvider = ({ children }: IUnitMeasureFormProvider) => {
  const form = useForm(FORM_VALUES);

  return (
    <UnitMeasureFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </UnitMeasureFormContext.Provider>
  );
};

export default useUnitMeasureForm;
