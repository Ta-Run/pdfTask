"use client"
import { useState } from 'react';
import { Document, Page,pdfjs  } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

function PdfHome() {
  const [numPages, setNumPages] = useState<number|undefined>();
  const [pageNumber, setPageNumber] = useState<number|any>(1);

  console.log(pageNumber)
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    console.log('hello');
    console.log(numPages)
    setNumPages(numPages);
  }
  console.log(numPages)

  return (
    <div>
    <Document file="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} />
    </Document>
    {numPages !== undefined && (
      <div>
        {Array.from(
          new Array(numPages),
          (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          )
        )}
      </div>
    )}
    <p>
      Page {pageNumber} of {numPages || 0}
    </p>
  </div>
  );
}
export default PdfHome;
