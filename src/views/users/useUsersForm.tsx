import React from 'react';
import { useForm } from 'src/hooks/';
import { UseForm } from 'src/hooks/useForm';

interface IUserFormContext {
  form: UseForm<any>;
}

interface IUserFormConsumer {
  children: (context: IUserFormContext) => JSX.Element;
}

interface IUserFormProvider {
  children: JSX.Element;
}

const UserFormContext = React.createContext({} as IUserFormContext);

const useUserForm = () => React.useContext(UserFormContext);

export const UserFormConsumer = ({ children }: IUserFormConsumer) => (
  <UserFormContext.Consumer>
    {children}
  </UserFormContext.Consumer>
);

export const UserFormProvider = ({ children }: IUserFormProvider) => {
  const form = useForm({});

  return (
    <UserFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};

export default useUserForm;
