
export default function EventDetail() {
  const event = {
    nombre: 'Cumbre de Innovación Tecnológica 2024',
    fechaTexto: '15 de marzo de 2024',
    horarioTexto: '9:00 AM – 6:00 PM',
    lugar: 'Centro de Convenciones, NYC',
    descripcion: 'Únete a líderes tecnológicos en una jornada de innovación, networking y aprendizaje.',
    tickets: [
      {
        tipo: 'Admisión General',
        descripcion: 'Entrada estándar',
        precio: 45,
        disponible: 150,
      },
      {
        tipo: 'Experiencia VIP',
        descripcion: 'Experiencia premium con beneficios exclusivos',
        precio: 120,
        disponible: 25,
      },
      {
        tipo: 'Oferta Especial',
        descripcion: 'Oferta de descuento por tiempo limitado',
        precio: 35,
        disponible: 5,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Título y datos */}
      <h1 className="text-3xl font-bold mb-2">{event.nombre}</h1>
      <p className="text-gray-600 mb-4">
        {event.fechaTexto} · {event.horarioTexto} · {event.lugar}
      </p>

      {/* Descripción */}
      <p className="text-gray-700 mb-8">{event.descripcion}</p>

      {/* Tipos de tickets */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {event.tickets.map((ticket) => (
          <div key={ticket.tipo} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-lg">{ticket.tipo}</h3>
            <p className="text-sm text-gray-600 mt-1">{ticket.descripcion}</p>
            <p className="mt-2 font-bold text-blue-600">${ticket.precio}</p>
            <p className="text-sm mt-1 text-green-600">
              {ticket.disponible} disponible
            </p>
          </div>
        ))}
      </div>

      {/* Botón Reservar */}
      <div className="flex justify-between items-center bg-gray-50 border rounded-lg p-4">
        <p className="text-sm text-gray-600">Compra segura con Stripe</p>
        <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
          Reservar ya
        </button>
      </div>

      {/* Progreso visual */}
      <div className="mt-6">
        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <span className="font-medium text-blue-700">Tickets</span>
          <span>›</span>
          <span>Detalles</span>
          <span>›</span>
          <span>Pago</span>
        </div>
        <div className="h-1 bg-gray-200 rounded mt-2">
          <div className="h-1 w-1/3 bg-blue-600 rounded" />
        </div>
      </div>
    </div>
  );
}
