// components/PDFPreview.js
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';

const PDFPreview = ({ job, onClose }) => {
  const [pdfUrl, setPdfUrl] = React.useState(null);

  React.useEffect(() => {
    const generateAndPreviewPDF = async () => {
      // Generate the PDF blob
      const blob = await pdf(<InvoiceTemplate job={job} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    generateAndPreviewPDF();
  }, [job]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Invoice Preview</h2>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="Invoice Preview"
            className="w-full h-96 border"
          />
        ) : (
          <p>Loading preview...</p>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
          <a
            href={pdfUrl}
            download={`invoice_${job.id}.pdf`}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;