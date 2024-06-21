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
  selectedNote: number | null;
  setSelectedNote: Dispatch<SetStateAction<number | null>>;
}

export const PdfContext = createContext<PdfContextProps>({
  htmlContent: '',
  setHtmlContent: () => {},
  selectedNote: null,
  setSelectedNote: () => {},
});

interface PdfProviderProps {
  children: ReactNode;
}

export const PdfProvider: React.FC<PdfProviderProps> = ({ children }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  return (
    <PdfContext.Provider
      value={{ htmlContent, setHtmlContent, selectedNote, setSelectedNote }}
    >
      {children}
    </PdfContext.Provider>
  );
};
