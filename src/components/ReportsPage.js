import React, { useContext } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import DataContext from '../DataContext';
import axios from 'axios';

// Define styles
const pageStyles = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyles = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f5f5f5',
  textAlign: 'left',
};

const tdStyles = {
  border: '1px solid #ddd',
  padding: '8px',
};

const buttonStyles = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  summary: {
    marginBottom: 20,
    fontSize: 12,
  },
});

// PDF Report Component
const PdfReport = ({ invoices }) => {
  const totalBilled = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPaid = invoices
    .filter((invoice) => invoice.status === 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const outstanding = totalBilled - totalPaid;

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.summary}>
          <Text>Total Billed: ${totalBilled.toFixed(2)}</Text>
          <Text>Total Paid: ${totalPaid.toFixed(2)}</Text>
          <Text>Outstanding: ${outstanding.toFixed(2)}</Text>
        </View>

        <View style={pdfStyles.table}>
          {/* Table Header */}
          <View style={[pdfStyles.tableRow, pdfStyles.tableHeader]}>
            <Text style={pdfStyles.tableCell}>ID</Text>
            <Text style={pdfStyles.tableCell}>Date</Text>
            <Text style={pdfStyles.tableCell}>Customer</Text>
            <Text style={pdfStyles.tableCell}>Amount</Text>
            <Text style={pdfStyles.tableCell}>Status</Text>
          </View>

          {/* Table Rows */}
          {invoices.map((invoice) => (
            <View key={invoice.id} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCell}>{invoice.id}</Text>
              <Text style={pdfStyles.tableCell}>{invoice.date}</Text>
              <Text style={pdfStyles.tableCell}>{invoice.customerName}</Text>
              <Text style={pdfStyles.tableCell}>${invoice.amount.toFixed(2)}</Text>
              <Text style={pdfStyles.tableCell}>{invoice.status}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// Reports Page Component
const ReportsPage = () => {
  const { data, setData } = useContext(DataContext);

  // Function to handle marking an invoice as paid
  const handleMarkPaid = async (index) => {
    try {
      console.log('Marking invoice as paid:', index + 1); // Debugging

      // Update Google Sheets
      const response = await axios.put(`http://localhost:5000/api/mark-paid/${index + 1}`, {
        paid: 'TRUE', // Send the new paid status
      });

      console.log('Backend response:', response.data); // Debugging

      // Update local state to reflect the change
      const updatedData = data.map((row, i) => {
        if (i === index + 1) { // +1 to skip the header row
          const updatedRow = [...row];
          updatedRow[8] = 'TRUE'; // Update the 9th column (Paid) to 'TRUE'
          return updatedRow;
        }
        return row;
      });

      setData(updatedData); // Update the state
      console.log('Local state updated:', updatedData); // Debugging
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };

  // Map data to invoices
  const invoices = data.slice(1).map((row, index) => ({
    id: index + 1,
    date: row[0],
    customerName: row[1],
    amount: parseFloat(row[6].replace('$', '').replace(',', '')), // Parse price (column 7)
    status: row[8] === 'TRUE' ? 'Paid' : 'Billed', // Use column 9 for Paid status
  }));

  // Calculate totals
  const totalBilled = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPaid = invoices
    .filter((invoice) => invoice.status === 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const outstanding = totalBilled - totalPaid;

  return (
    <div style={pageStyles}>
      <h1>Sales Report</h1>

      {/* Totals */}
      <div>
        <p>Total Billed: ${totalBilled.toFixed(2)}</p>
        <p>Total Paid: ${totalPaid.toFixed(2)}</p>
        <p>Outstanding: ${outstanding.toFixed(2)}</p>
      </div>

      {/* Invoices Table */}
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>ID</th>
            <th style={thStyles}>Date</th>
            <th style={thStyles}>Customer</th>
            <th style={thStyles}>Amount</th>
            <th style={thStyles}>Status</th>
            <th style={thStyles}>Paid</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={invoice.id}>
              <td style={tdStyles}>{invoice.id}</td>
              <td style={tdStyles}>{invoice.date}</td>
              <td style={tdStyles}>{invoice.customerName}</td>
              <td style={tdStyles}>${invoice.amount.toFixed(2)}</td>
              <td style={tdStyles}>{invoice.status}</td>
              <td
                style={tdStyles}
                className="cursor-pointer"
                onClick={() => handleMarkPaid(index)}
              >
                {invoice.status === 'Paid' ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-gray-400">Mark as paid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Generate PDF Button */}
      <div style={{ marginTop: '20px' }}>
        <PDFDownloadLink
          document={<PdfReport invoices={invoices} />}
          fileName="sales_report.pdf"
        >
          {({ loading }) =>
            loading ? (
              <button style={buttonStyles}>Loading PDF...</button>
            ) : (
              <button style={buttonStyles}>Download PDF Report</button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ReportsPage;