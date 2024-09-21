import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    <div
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
    </div>
  );
});

export default Invoice;