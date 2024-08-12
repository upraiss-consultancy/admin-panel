import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';
import InvoiceTemplate from './InvoiceTemplate'; // adjust the path as necessary

const packageDetails = [
  { name: 'Package Name', value: 'Premium Package' },
  { name: 'Booking Type', value: 'Round Trip' },
  { name: 'Car Type', value: 'Sedan' },
  { name: 'Trip Type', value: 'Local' },
  { name: 'Pickup State', value: 'California' },
  { name: 'Pickup City', value: 'Los Angeles' },
  { name: 'Dropoff State', value: 'Nevada' },
  { name: 'Dropoff City', value: 'Las Vegas' },
  { name: 'Hours Package', value: '5 Hours' },
  { name: 'Days Package', value: '1 Day' },
  { name: 'Max Distance', value: '300 km' },
  { name: 'Driver Charge', value: '$100' },
  { name: 'Extra Charge', value: '$50' },
  { name: 'Convenience Charge', value: '$20' },
  { name: 'Company Charge', value: '$150' },
  { name: 'Basic Total', value: '$320' },
  { name: 'Gst', value: '$16' },
  { name: 'Total', value: '$336' },
];

const App = () => {
  const generatePDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('invoice.pdf');
    });
  };

  return (
    <div>
      <InvoiceTemplate packageDetails={packageDetails} />
      <Button variant="contained" color="primary" onClick={generatePDF} sx={{ mt: 2 }}>
        Download PDF
      </Button>
    </div>
  );
};

export default App;
