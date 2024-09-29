import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Box, Grid, Typography } from '@mui/material';
export const generatePDF = (ref) => {
  const input = ref.current; // Get the DOM element for the invoice
  html2canvas(input, { scale: 1 })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to image
      const pdf = new jsPDF('p', 'mm', 'a4'); // Create new jsPDF instance
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice.pdf`); // Save the PDF with dynamic name
    })
    .catch((err) => console.error('Error generating PDF: ', err));
};

const numberToWords = (num) => {
  const ones = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
  const tens = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];

  if (num === 0) return 'zero';

  let word = '';

  if (Math.floor(num / 1000) > 0) {
    word += ones[Math.floor(num / 1000)] + ' thousand ';
    num %= 1000;
  }

  if (Math.floor(num / 100) > 0) {
    word += ones[Math.floor(num / 100)] + ' hundred ';
    num %= 100;
  }

  if (num > 0) {
    if (num < 20) {
      word += ones[num];
    } else {
      word += tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        word += ' ' + ones[num % 10];
      }
    }
  }

  return word.trim();
};
const today = new Date();
const day = today.getDate();

// Get the current month (Months are zero-based, so we add 1)
const month = today.getMonth() + 1; 

// Get the current year
const year = today.getFullYear();
const Invoice = React.forwardRef(({ data, billToData }, ref) => {
  
  return (
    <>
      <Grid container justifyContent="center" maxWidth={'842px'}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Tax Invoice
          </Typography>
        </Grid>

        <Grid item xs={12} ref={ref}>
          {/* Invoice Design */}
          <Box border={1} p={2} mb={2} style={{ backgroundColor: '#fff' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  DRIVEASSIST TECHNOLOGIES INDIA PRIVATE LIMITED
                </Typography>
                <Typography variant="body2">
                  4436/1, NA, Gurugram, Haryana - 122003 | GSTIN: 07AAICXXXXXX1Z
                </Typography>
              </Grid>
              {
                Object.keys(billToData ? billToData : {})?.length > 0 && (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        Bill To:
                      </Typography>
                      <Typography variant="body2">{billToData?.
                        name}</Typography>
                      <Typography variant="body2">
                        {billToData?.address}
                      </Typography>
                      <Typography variant="body2">GSTIN: {billToData?.gstNo
                      }</Typography>
                    </Grid>
                  </>
                )
              }

              <Grid item xs={6} textAlign="right">
                <Typography variant="body2">Invoice No: INV305</Typography>
                <Typography variant="body2">Date: {day}-{month}-{year}</Typography>
              </Grid>

              {/* Table Header */}
              <Grid item xs={12}>
                <Box borderTop={1} borderBottom={1} p={1}>
                  <Grid container>
                    <Grid item xs={1}>
                      <Typography variant="body2" fontWeight="bold">
                        S.No
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2" fontWeight="bold">
                        Item Description
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2" fontWeight="bold">
                        HSN
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2" fontWeight="bold">
                        Qty
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2" fontWeight="bold">
                        Rate
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2" fontWeight="bold">
                        GST
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2" fontWeight="bold">
                        Amount
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* company_amount */}
              {/* Table Rows */}
              <Grid item xs={12}>
                <Box borderBottom={1} p={1}>
                  <Grid container>
                    <Grid item xs={1}>
                      <Typography variant="body2">1</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">Driver Charges</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">998515</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">1</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">₹ {data?.fare[0]?.driver_amount}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">₹ 0</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2">₹ {data?.fare[0]?.driver_amount}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box borderBottom={1} p={1}>
                  <Grid container>
                    <Grid item xs={1}>
                      <Typography variant="body2">2</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">Driver Travel Allowance</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">996423</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">1</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">₹ {
                        data?.fare[0]?.travel_allowance
                      }</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">₹ 0</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2">₹ {
                        data?.fare[0]?.travel_allowance
                      }</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box borderBottom={1} p={1}>
                  <Grid container>
                    <Grid item xs={1}>
                      <Typography variant="body2">2</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">Platform Fee</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">996423</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">1</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">₹ {
                        data?.fare[0]?.company_amount
                      }</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">₹ {
                        data?.fare[0]?.gst
                      }</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2">₹ {
                        data?.fare[0]?.company_amount + data?.fare[0]?.gst
                      }</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Total Amount */}
              <Grid item xs={6} textAlign="left">
                <Typography variant="h6" fontWeight="bold">
                  Payment Details
                </Typography>
                <Typography variant="body2">Bank: HDFC Bank</Typography>
                <Typography variant="body2">A/C Holder Name: DRIVEASSIST TECHNOLOGIES INDIA
                  PRIVATE LIMITED</Typography>
                <Typography variant="body2">Account No: 50200072734454</Typography>
                <Typography variant="body2">
                  IFSC Code: HDFC0000622
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body2">Total Amount: ₹{data?.fare[0]?.amount
                }</Typography>
                {/* <Typography variant="body2">GST: ₹{data?.fare[0]?.gst}</Typography>
                <Typography variant="h6" fontWeight="bold">
                  Total Amount: ₹1,680.00
                </Typography> */}
                <Typography variant="body2">
                  Amount in Words: {numberToWords(data?.fare[0]?.amount)}
                </Typography>
              </Grid>

              {/* Footer */}
              <Grid item xs={12} textAlign="right" mt={2}>
                <Typography variant="body2">Authorized Signatory</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

    </>
  );
});

export default Invoice;