import React, { useRef } from 'react';
import { Button, IconButton } from '@mui/material';
import Invoice from './pdfGenerator'; // Invoice component that receives data as props
import { generatePDF } from './pdfGenerator'; // Common PDF generator function

const GenerateInvoiceButton = ({ rowData }) => {
  const invoiceRef = useRef(); // Reference for the Invoice component


  return (
    <div>
      {/* Hidden Invoice component for the current row */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <Invoice ref={invoiceRef} data={rowData} />
      </div>

      {/* Button to trigger PDF generation */}
      <Button
        sx={{ backgroundColor: '#DD781E', height: 40, color: "#fff" }}
        onClick={() => generatePDF( invoiceRef)}
      >
        Generate Invoice
      </Button>
    </div>
  );
};

export default GenerateInvoiceButton;
