import { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

function App() {
  const [codigo, setCodigo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [imagenBarcode, setImagenBarcode] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (mostrarModal && codigo && canvasRef.current) {
      try {
      JsBarcode(canvasRef.current, codigo, {
        format: 'CODE128',
        width: 4,           
        height: 100,        
        displayValue: true,
        fontSize: 20,       
        margin: 5          
      });
        
        const imagenUrl = canvasRef.current.toDataURL('image/png');
        setImagenBarcode(imagenUrl);
      } catch (error) {
        console.error('Error generando código de barras:', error);
      }
    }
  }, [mostrarModal, codigo]);

  const generarCodigoBarras = () => {
    if (codigo.trim()) {
      setMostrarModal(true);
    } else {
      alert('Por favor ingrese un código');
    }
  };

  const imprimirCodigoBarras = () => {
    if (!imagenBarcode) return;

    const ventana = window.open('', '_blank', 'width=800,height=600');
    
    if (ventana) {
      ventana.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Imprimir Etiqueta</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              background: white;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            .etiqueta {
              text-align: center;
              padding: 5mm;
            }
            .titulo {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 10px;
              color: #000;
            }
            img {
              max-width: 95%;
              height: auto;
            }
            @media print {
              @page {
                size: 100mm 52mm;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
                background: white;
              }
              .etiqueta {
                width: 100mm;
                height: 52mm;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 3mm;
              }
              .titulo {
                font-size: 40px;
                font-weight: bold;
                margin-bottom: 2mm;
              }
              img {
                max-width: 95mm;
                max-height: 40mm;
              }
            }
          </style>
        </head>
        <body>
          <div class="etiqueta">
            ${titulo ? `<div class="titulo">${titulo}</div>` : ''}
            <img src="${imagenBarcode}" alt="Código de barras">
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
        </html>
      `);
      ventana.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-start justify-center">                     
      
      <div className="w-full max-w-6xl px-4 pt-28">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Generador de SKU
          </h1>
        </div>
        <div className="mt-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700 block mb-2">
                Título (opcional)
              </span>
              <input 
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ejemplo: Producto X"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700 block mb-2">
                Ingrese código SKU
              </span>
              <input 
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                placeholder="Ejemplo: MCC12170NFNFST"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>
            
            <button 
              onClick={generarCodigoBarras}
              className="w-full mt-3 bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 active:bg-emerald-700 transition-colors font-medium shadow-md"
            >
              Generar Código de Barras
            </button>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Código de Barras</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                {titulo && (
                  <p className="text-base font-bold mb-3 text-gray-800">{titulo}</p>
                )}
                {imagenBarcode && (
                  <img src={imagenBarcode} alt="Código de barras" className="max-w-full mx-auto" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{codigo}</p>
              <div className="flex gap-3">
                <button 
                  onClick={imprimirCodigoBarras}
                  className="flex-1 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  Imprimir
                </button>
                <button 
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors shadow-md"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;