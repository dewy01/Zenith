import { useContext, useEffect, useRef } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { PdfContext } from '~/context/PdfContext';
import { Trans } from '@lingui/macro';
import { NavLink } from 'react-router-dom';

(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const PdfPreview = () => {
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

  return (
    <Box>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            sx={(theme) => ({
              color: theme.palette.getContrastText(theme.palette.primary.main),
            })}
            component={NavLink}
            to="/notes"
          >
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
