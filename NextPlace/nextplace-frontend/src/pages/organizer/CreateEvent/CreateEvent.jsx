import { useState } from 'react';

// Un componente de icono para reutilizar los iconos del formulario
const FormIcon = ({ children, className }) => (
  <span className={`material-icons-outlined absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${className}`}>
    {children}
  </span>
);

const CreateEvent = () => {
  // Usamos 'useState' para manejar los datos del formulario
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
  });

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">Next</span>
            <span className="text-2xl font-bold text-pink-500">Place</span>
          </div>
          <button className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors">
            Crear Evento
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8">
            <svg className="h-7 w-7 text-pink-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h1 className="text-2xl font-semibold text-gray-700">Detalles del Evento</h1>
          </div>

          <form className="space-y-6">
            {/* Nombre del evento */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="eventName">Nombre del evento*</label>
              <input
                className="w-full bg-gray-100 border-transparent rounded-lg py-3 px-4 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                id="eventName"
                name="eventName"
                placeholder="ej. Conferencia de Tecnología 2025"
                type="text"
                value={formData.eventName}
                onChange={handleChange}
              />
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="date">Fecha*</label>
                <div className="relative">
                  <input
                    className="w-full bg-gray-100 border-transparent rounded-lg py-3 px-4 pr-10 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  <FormIcon className="right-3">calendar_today</FormIcon>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="time">Hora*</label>
                <div className="relative">
                  <input
                    className="w-full bg-gray-100 border-transparent rounded-lg py-3 px-4 pr-10 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                  <FormIcon className="right-3">schedule</FormIcon>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="location">Ubicación*</label>
              <div className="relative">
                <FormIcon className="left-3">location_on</FormIcon>
                <input
                  className="w-full bg-gray-100 border-transparent rounded-lg py-3 px-4 pl-10 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  id="location"
                  name="location"
                  placeholder="ej. Universidad Centroamericana José Simeón Cañas"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="category">Categoría*</label>
              <div className="relative">
                <FormIcon className="left-3">bookmark_border</FormIcon>
                <select
                  className="w-full bg-gray-100 border-transparent rounded-lg py-3 px-4 pl-10 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 appearance-none"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>Selecciona Una Categoría</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="musica">Música</option>
                  <option value="arte">Arte y Cultura</option>
                  <option value="deportes">Deportes</option>
                </select>
                <FormIcon className="right-3">expand_more</FormIcon>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="description">Descripción*</label>
              <textarea
                className="w-full bg-gray-100 border-transparent rounded-lg py-3 px-4 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-none"
                id="description"
                name="description"
                placeholder="Describe tu evento, incluye detalles importantes como agenda, requisitos, etc."
                rows="5"
                maxLength="750"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <p className="text-right text-xs text-gray-500 mt-1">{formData.description.length}/750 caracteres</p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center mb-1">
            <span className="text-xl font-bold text-gray-800">Next</span>
            <span className="text-xl font-bold text-pink-500">place</span>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">The art of living in one click</p>
        </div>
      </footer>
    </div>
  );
};

export default CreateEvent;