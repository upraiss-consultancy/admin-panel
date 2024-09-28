import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Box, Grid, Typography } from '@mui/material';
export const generatePDF = (data, ref) => {
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



const Invoice = React.forwardRef(({ data }, ref) => {
  return (
    <>
      {console
        .log(data, "PDF DATA")}
      {/* <div
      ref={ref}
      style={{
        width: '210mm', // A4 width
        minHeight: '297mm', // A4 height
        backgroundColor: '#f5f5f5',
        padding: '20px',
        // display: "none"
      }}
      
    >
      <h1>Invoice</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>{key}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
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
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">
                  Bill To:
                </Typography>
                <Typography variant="body2">BGGS SOLUTIONS PRIVATE LIMITED</Typography>
                <Typography variant="body2">
                  South West Delhi, Delhi - 110075
                </Typography>
                <Typography variant="body2">GSTIN: 07AAACXXXXXX1ZD</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body2">Invoice No: INV305</Typography>
                <Typography variant="body2">Date: 23-09-2024</Typography>
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
                    <Grid item xs={2}>
                      <Typography variant="body2" fontWeight="bold">
                        Rate
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
                    <Grid item xs={2}>
                      <Typography variant="body2">₹ {data?.fare[0]?.driver_amount}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2">₹ 1,470.00</Typography>
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
                      <Typography variant="body2">Driver Night Charges</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">996423</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">1</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2">₹ 200.00</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2">₹ 210.00</Typography>
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
                <Typography variant="body2">Sub Total: ₹{data?.fare[0]?.company_amount + 
data?.fare[0]?.driver_amount
}</Typography>
                <Typography variant="body2">GST: ₹{data?.fare[0]?.gst}</Typography>
                <Typography variant="h6" fontWeight="bold">
                  Total Amount: ₹1,680.00
                </Typography>
                <Typography variant="body2">
                  Amount in Words: One Thousand Six Hundred and Eighty Rupees Only
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