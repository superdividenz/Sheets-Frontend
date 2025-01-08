// components/InvoiceTemplate.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from './img/logo.png'; // Import the logo

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    color: '#333333',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  tableHeader: {
    backgroundColor: '#F5F5F5',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#888888',
  },
});

const InvoiceTemplate = ({ job }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          src={logo} // Use the imported logo
          style={styles.logo}
        />
        <Text style={styles.title}>Invoices</Text>
      </View>

      {/* Job Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Invoice Numbers:</Text>
        <Text style={styles.value}>{job.id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{job.date}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Customer Name:</Text>
        <Text style={styles.value}>{job.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Customer Email:</Text>
        <Text style={styles.value}>{job.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Customer Phone:</Text>
        <Text style={styles.value}>{job.phone}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Customer Address:</Text>
        <Text style={styles.value}>{job.address}</Text>
      </View>

      {/* Invoice Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Quantity</Text>
          <Text style={styles.tableCell}>Unit Price</Text>
          <Text style={styles.tableCell}>Total</Text>
        </View>

        {/* Table Row */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{job.info}</Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>{job.price}</Text>
          <Text style={styles.tableCell}>{job.price}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for choosing Wegener Sealing!</Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceTemplate;