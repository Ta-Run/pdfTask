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

  return (
    <div className='md:container md:mx-auto px-4 rounded-md'>
      <div className='md:flex justify-center mt-14 box-border h-132 w-132 p-4 border-4 py-12 rounded-md'>
        <Document className="flex justify-center...  " file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page className="" devicePixelRatio={1} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={1.5} loading={"Loading page…"} />
        </Document>
        <form className='mt-8'>
          <input type="file" className='file:border file:border-solid ..' onChange={(e) => handleFileChange(e)} />
        </form>
        <div className='grid grid-cols-3 gap-4 place-items-end h-26 ...'>
          <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...">
            Save Changes
          </button>
        </div>
      </div>
      <div className='box-border h-132 w-132 p-4 border-4 mt-12 shadow-2xl rounded-md'>
        Add Filter and search bar data for get the data
        <input type="text" placeholder='Serach Pdf' />
        <button className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ...">
          Search
        </button>
      </div>

      <div className='md:flex justify-center my-8  rounded-md'>
        Recent Added Files
        <div className='sm:flex justify-center rounded-md'>
          <div className='mx-2 box-border h-56 w-56 p-4 border-4 shadow-2xl hover:bg-violet-200 rounded-md ...'>PDf1</div>
          <div className='mx-2 box-border h-56 w-56 p-4 border-4  shadow-2xl hover:bg-violet-200 rounded-md..'>PDf2</div>
        </div>
        <div className='sm:flex justify-center rounded-md'>
          <div className='mx-2 box-border h-56 w-56 p-4 border-4  shadow-2xl hover:bg-violet-200 rounded-md..'>PDf3</div>
        </div>
      </div>
    </div>
  );
}
export default PdfHome;
