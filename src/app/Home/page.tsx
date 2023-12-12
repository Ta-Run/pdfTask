"use client"
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { fetchData } from '../redux/slice';
import { useDispatch } from 'react-redux';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function PdfHome() {
  const [numPages, setNumPages] = useState<number | any | undefined>();
  const [pageNumber, setPageNumber] = useState<number | any>(1);
  const [selectedFile, setSelectedFile] = useState<File | null | any>(null);
  const usedispatch: any = useDispatch();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setSelectedFile(file);
    }
  }

  useEffect(() => {
    const data = usedispatch(fetchData())
    data.then((res: any) => {
      console.log(res)
    })
  })

  const nextPage = () => {
    const pageData: any = numPages
    for (let i = 1; i <= pageData; i++) {
      setPageNumber(i)
    }
  }

  return (
    <div className='' >
      <div className='h-screen flex items-center justify-center '>
        <form className=' h-48 max-h-full ... border-4 rounded-xl border-emerald-400 '>
          <input type="file" onChange={(e) => handleFileChange(e)} />
        </form>
      </div>

      <div className='flex items-center...'>
        <Document className="py-12" file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page className="py-12" devicePixelRatio={1} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={1.5} loading={"Loading page…"} />
        </Document>
      </div>
      <div >
        Page {pageNumber} of {numPages || 0}
        <select>
          <option value="">{numPages}</option>
        </select>
      </div>
    </div>
  );
}
export default PdfHome;
