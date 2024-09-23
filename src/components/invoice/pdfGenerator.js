import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Box, Grid, Typography } from '@mui/material';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 5,
    borderBottom: '1pt solid black',
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    textAlign: 'right',
  },
});
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
      <Document>
        <Page size="A4" style={pdfStyles.page}>
          {/* Header Section */}
          <View style={pdfStyles.header}>
            <Text style={pdfStyles.bold}>DRIVEASSIST TECHNOLOGIES INDIA PRIVATE LIMITED</Text>
            <Text>Address Line 1, City, Postal Code</Text>
            <Text>GSTIN: 07AAxxxxEXXXZZ</Text>
          </View>

          {/* Bill To Section */}
          <View>
            <Text style={pdfStyles.bold}>Bill To:</Text>
            <Text>BGGS SOLUTIONS PRIVATE LIMITED</Text>
            <Text>Address Line 1, City, Postal Code</Text>
            <Text>GSTIN: 07AAxxxxEXXXZZ</Text>
          </View>

          {/* Invoice Information */}
          <View>
            <Text>Invoice No: INV305</Text>
            <Text>Date: 23-09-2024</Text>
            <Text>Due Date: 23-09-2024</Text>
          </View>

          {/* Table */}
          <View style={pdfStyles.table}>
            {/* Table Header */}
            <View style={pdfStyles.tableRow}>
              <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>S.No</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>Item Description</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>HSN</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>Qty</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>Rate</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>Taxable Value</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>GST</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>Amount</Text>
            </View>

            {/* Table Rows */}
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCell}>1</Text>
              <Text style={pdfStyles.tableCell}>Driver Charges</Text>
              <Text style={pdfStyles.tableCell}>998515</Text>
              <Text style={pdfStyles.tableCell}>1</Text>
              <Text style={pdfStyles.tableCell}>1,400</Text>
              <Text style={pdfStyles.tableCell}>1,400.00</Text>
              <Text style={pdfStyles.tableCell}>70</Text>
              <Text style={pdfStyles.tableCell}>1,470.00</Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCell}>2</Text>
              <Text style={pdfStyles.tableCell}>Driver Night Charges</Text>
              <Text style={pdfStyles.tableCell}>996423</Text>
              <Text style={pdfStyles.tableCell}>1</Text>
              <Text style={pdfStyles.tableCell}>200</Text>
              <Text style={pdfStyles.tableCell}>200.00</Text>
              <Text style={pdfStyles.tableCell}>10</Text>
              <Text style={pdfStyles.tableCell}>210.00</Text>
            </View>
          </View>

          {/* Payment and Total Section */}
          <View>
            <Text>Total Amount: ₹1,680.00</Text>
            <Text>Amount in Words: One Thousand Six Hundred and Eighty Only</Text>
          </View>

          {/* Footer */}
          <View style={pdfStyles.footer}>
            <Text>Authorized Signatory</Text>
          </View>
        </Page>
      </Document>
    </>
  );
});

export default Invoice;