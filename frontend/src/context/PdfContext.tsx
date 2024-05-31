import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface PdfContextProps {
  htmlContent: string;
  setHtmlContent: Dispatch<SetStateAction<string>>;
}

export const PdfContext = createContext<PdfContextProps>({
  htmlContent: '',
  setHtmlContent: () => {},
});

interface PdfProviderProps {
  children: ReactNode;
}

export const PdfProvider: React.FC<PdfProviderProps> = ({ children }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  return (
    <PdfContext.Provider value={{ htmlContent, setHtmlContent }}>
      {children}
    </PdfContext.Provider>
  );
};
