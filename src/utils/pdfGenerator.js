// utils/pdfGenerator.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.png'; // Import your logo (place it in the assets folder)

const generatePDF = (job) => {
  const doc = new jsPDF();

  // Add logo
  const imgWidth = 50; // Adjust the width of the logo
  const imgHeight = 20; // Adjust the height of the logo
  doc.addImage(logo, 'PNG', 10, 10, imgWidth, imgHeight);

  // Add title
  doc.setFontSize(18);
  doc.setTextColor(33, 150, 243); // Blue color for the title
  doc.text(`Invoice for ${job.name}`, 70, 20);

  // Add job details
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Black color for details
  doc.text(`Job ID: ${job.id}`, 10, 50);
  doc.text(`Date: ${job.date}`, 10, 60);
  doc.text(`Phone: ${job.phone}`, 10, 70);
  doc.text(`Address: ${job.address}`, 10, 80);
  doc.text(`Email: ${job.email}`, 10, 90);
  doc.text(`Info: ${job.info}`, 10, 100);
  doc.text(`Price: $${job.price}`, 10, 110);

  // Add a table for additional details
  const tableData = [
    ['Description', 'Quantity', 'Unit Price', 'Total'],
    [job.info, 1, `$${job.price}`, `$${job.price}`], // Example row
  ];

  doc.autoTable({
    startY: 120, // Position below the job details
    head: [tableData[0]],
    body: tableData.slice(1),
    headStyles: {
      fillColor: [33, 150, 243], // Blue header
      textColor: [255, 255, 255], // White text
    },
    bodyStyles: {
      textColor: [0, 0, 0], // Black text
    },
  });

  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100); // Gray color for footer
  doc.text('Thank you for choosing Wegener Sealing!', 10, doc.internal.pageSize.height - 10);

  // Save the PDF
  doc.save(`invoice_${job.id}.pdf`);
};

export default generatePDF;