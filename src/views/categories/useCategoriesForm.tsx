import React from 'react';
import { useForm } from 'src/hooks/';
import { UseForm } from 'src/hooks/useForm';
import { FORM_VALUES } from './form/Form';

interface ICategoryFormContext {
  form: UseForm<any>;
}

interface ICategoryFormConsumer {
  children: (context: ICategoryFormContext) => JSX.Element;
}

interface ICategoryFormProvider {
  children: JSX.Element;
}

const CategoryFormContext = React.createContext({} as ICategoryFormContext);

const useCategoryForm = () => React.useContext(CategoryFormContext);

export const CategoryFormConsumer = ({ children }: ICategoryFormConsumer) => (
  <CategoryFormContext.Consumer>
    {children}
  </CategoryFormContext.Consumer>
);

export const CategoryFormProvider = ({ children }: ICategoryFormProvider) => {
  const form = useForm(FORM_VALUES);

  return (
    <CategoryFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </CategoryFormContext.Provider>
  );
};

export default useCategoryForm;
