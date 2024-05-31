import React, { useContext, useEffect, useRef } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { PdfContext } from '~/context/PdfContext';
import { Trans } from '@lingui/macro';
import { NavLink } from 'react-router-dom';

pdfMake.vfs = { ...pdfFonts.pdfMake.vfs };

const PdfPreview: React.FC = () => {
  const { htmlContent } = useContext(PdfContext);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (htmlContent && iframeRef.current) {
      const pdfMakeDoc = htmlToPdfmake(htmlContent);
      const documentDefinition = {
        content: pdfMakeDoc,
        defaultStyle: {
          font: 'Roboto',
        },
      };
      pdfMake.createPdf(documentDefinition).getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        iframeRef.current!.src = url;
      });
    }
  }, [htmlContent]);

  // TODO: if iframe isn't proper, consider manual download and preview

  // const handleDownload = () => {
  //   if (htmlContent) {
  //     const pdfMakeDoc = htmlToPdfmake(htmlContent);
  //     const documentDefinition = {
  //       content: pdfMakeDoc,
  //       defaultStyle: {
  //         font: 'Arial',
  //       },
  //     };
  //     pdfMake.createPdf(documentDefinition).download('note.pdf');
  //   }
  // };

  return (
    <Box>
      <AppBar position="relative">
        <Toolbar>
          <IconButton component={NavLink} to="/notes">
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ paddingLeft: 3 }} variant="h6">
            <Trans>Preview</Trans>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={(theme) => ({
          flex: 1,
          width: '100%',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: theme.spacing(3),
        })}
      >
        <iframe
          style={{ border: 'none' }}
          ref={iframeRef}
          title="PDF Preview"
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export default PdfPreview;
