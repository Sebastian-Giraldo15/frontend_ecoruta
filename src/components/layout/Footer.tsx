import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

/**
 * Componente Footer con información de la empresa y enlaces útiles
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'EcoRuta',
      links: [
        { name: 'Acerca de nosotros', href: '/about' },
        { name: 'Nuestros servicios', href: '/services' },
        { name: 'Cómo funciona', href: '/how-it-works' },
        { name: 'Impacto ambiental', href: '/environmental-impact' },
      ],
    },
    {
      title: 'Servicios',
      links: [
        { name: 'Recolección de residuos', href: '/services/collection' },
        { name: 'Reciclaje', href: '/services/recycling' },
        { name: 'Para empresas', href: '/services/companies' },
        { name: 'Programa de puntos', href: '/services/rewards' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { name: 'Centro de ayuda', href: '/help' },
        { name: 'Contacto', href: '/contact' },
        { name: 'Términos de servicio', href: '/terms' },
        { name: 'Política de privacidad', href: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sección principal del footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-eco-500 to-ocean-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EcoRuta</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Conectamos a las personas con empresas de recolección de residuos 
              para crear un futuro más sostenible y limpio para todos.
            </p>
            
            {/* Información de contacto */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-eco-400" />
                <span className="text-gray-300">Bogotá, Colombia</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-eco-400" />
                <span className="text-gray-300">+57 (1) 234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4 text-eco-400" />
                <span className="text-gray-300">info@ecoruta.co</span>
              </div>
            </div>
          </div>

          {/* Secciones de enlaces */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-eco-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-gray-800">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h3 className="text-lg font-semibold mb-2">
                Mantente informado
              </h3>
              <p className="text-gray-300 text-sm mb-4 md:mb-0">
                Recibe noticias sobre nuestros servicios y tips de sostenibilidad.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-2 rounded-l-md border-0 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-eco-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-eco-600 text-white rounded-r-md hover:bg-eco-700 focus:outline-none focus:ring-2 focus:ring-eco-500 transition-colors duration-200"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sección de estadísticas ambientales */}
        <div className="py-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-eco-400">15K+</div>
              <div className="text-sm text-gray-300">Kg Reciclados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ocean-400">2.5K+</div>
              <div className="text-sm text-gray-300">Usuarios Activos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-eco-400">180+</div>
              <div className="text-sm text-gray-300">Empresas Aliadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ocean-400">95%</div>
              <div className="text-sm text-gray-300">Satisfacción</div>
            </div>
          </div>
        </div>

        {/* Sección de redes sociales y copyright */}
        <div className="py-6 border-t border-gray-800">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a
                href="#"
                className="text-gray-400 hover:text-eco-400 transition-colors duration-200"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-eco-400 transition-colors duration-200"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-eco-400 transition-colors duration-200"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-eco-400 transition-colors duration-200"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            
            <div className="flex items-center text-sm text-gray-400">
              <span>© {currentYear} EcoRuta. Hecho con</span>
              <HeartIcon className="h-4 w-4 mx-1 text-red-500" />
              <span>para el planeta.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
