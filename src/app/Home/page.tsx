"use client"
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function PdfHome() {
  const [numPages, setNumPages] = useState<number | any|undefined>();
  const [pageNumber, setPageNumber] = useState<number | any>(1);
  const [selectedFile, setSelectedFile] = useState<File | null | any>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

    // console.log(numPages)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      // const fileURL = URL.createObjectURL(file); // Convert File to URL
      setSelectedFile(file);
    }
  }

  const nextPage=()=>{
    const pageData:any=numPages
    for(let i=1;i<=pageData;i++){
      setPageNumber(i)
    }
  }
console.log(pageNumber)
  return (
    <div className='bg-teal-100 '>
      <div className="flex justify-around  ,shadow hover:shadow-lg" >
        <form >
          <input type="file" onChange={(e) => handleFileChange(e)} />
        </form>
      </div>
      <div className="flex justify-around ">
        <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
        {/* {numPages.map((index: any)=>{
           console.log("index",index)
        })} */}
          <Page className="py-12" devicePixelRatio={1} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={1.5} loading={"Loading page…"} />
        </Document>
      </div>
      <div className="flex justify-around ">
        Page {pageNumber} of {numPages || 0}
      <select>
        <option value="">{numPages}</option>
      </select>
       <button onClick={nextPage}>loadpge</button>
      </div>
    </div>
  );
}
export default PdfHome;
