import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Sku from './sku.tsx'

function Main() {
  const [page, setPage] = useState('cierre');

  return (
    <>
      <div className="fixed top-0 left-0 bg-emerald-500 p-5 shadow-2xl w-full z-50">
        <div className="flex justify-end gap-4">
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('cierre'); }} className="px-3 py-2 rounded transition-colors duration-200 hover:bg-gray-200 active:bg-gray-300">
            Cierre
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('sku'); }} className="px-3 py-2 rounded transition-colors duration-200 hover:bg-gray-200 active:bg-gray-300">
            SKU
          </a>
        </div>
      </div>
      
      {page === 'cierre' ? <App /> : <Sku />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)