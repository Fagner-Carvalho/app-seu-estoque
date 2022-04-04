import React, { useState } from 'react';

interface ILayoutContext {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
}

interface ILayoutConsumer {
  children: (context: ILayoutContext) => JSX.Element;
}

interface ILayoutProvider {
  children: JSX.Element;
}

const LayoutContext = React.createContext({} as ILayoutContext);

const useLayout = () => React.useContext(LayoutContext);

export const LayoutConsumer = ({ children }: ILayoutConsumer) => (
  <LayoutContext.Consumer>
    {children}
  </LayoutContext.Consumer>
);

export const LayoutProvider = ({ children }: ILayoutProvider) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <LayoutContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default useLayout;
