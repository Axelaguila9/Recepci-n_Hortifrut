function App() {

  return (
    <div className="min-h-screen bg-white to-blue-500 flex items-start justify-center">                     
      
      
      <div className="w-full max-w-6xl px-4 pt-28">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">
            Cierre de Recepción - Zarzamora {new Date().toLocaleDateString('es-MX')}
          </h1>
        </div>
        <div className="mt-20 flex gap-6">
          <label className="block flex-1">
            <span className="text-sm font-medium text-gray-700 mb-2 block">
              Seleccionar Reporte Recepcional
            </span>
            <input 
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => console.log(e.target.files?.[0])}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 focus:outline-none p-2"
            />
          </label>
          
          <label className="block flex-1">
            <span className="text-sm font-medium text-gray-700 mb-2 block">
              Seleccionar Huella de Cosecha
            </span>
            <input 
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => console.log(e.target.files?.[0])}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 focus:outline-none p-2"
            />
          </label>
          
          <label className="block flex-1">
            <span className="text-sm font-medium text-gray-700 mb-2 block">
              Seleccionar Recepcion de Pallets
            </span>
            <input 
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => console.log(e.target.files?.[0])}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 focus:outline-none p-2"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;