"use client"
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { fetchData } from '../redux/slice';
import { useDispatch } from 'react-redux';
import styles from './home.module.css'

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
    <div >
      <div className={styles.container} >
        <form >
          <input className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 " type="file" onChange={(e) => handleFileChange(e)} />
        </form>
      </div>
      <div className="flex justify-around ">
        <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
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
