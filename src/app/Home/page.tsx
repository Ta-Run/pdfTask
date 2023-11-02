"use client"
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function PdfHome() {
  const [numPages, setNumPages] = useState<number | undefined>();
  const [pageNumber, setPageNumber] = useState<number | any>(1);
  const [selectedFile, setSelectedFile] = useState<File | null | any>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      // const fileURL = URL.createObjectURL(file); // Convert File to URL
      setSelectedFile(file);
    }
  }

  return (
    <div className='bg-blue-500 md:bg-green-500 '>
      <div className="flex justify-around  ,shadow hover:shadow-lg" >
        <form >
          <input type="file" onChange={(e) => handleFileChange(e)} />
        </form>
      </div>
      <div className="flex justify-around ">
        <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page className="py-12" devicePixelRatio={1} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={1.5} loading={"Loading page…"} />
        </Document>
      </div>
      <div className="flex justify-around ">
        Page {pageNumber} of {numPages || 0}
      </div>
    </div>
  );
}
export default PdfHome;
