import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  GlobeAmericasIcon,
  ArrowPathIcon,
  TruckIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import { Button, Card } from '../components/common';

/**
 * Landing Page principal de EcoRuta
 */
export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <ArrowPathIcon className="h-8 w-8" />,
      title: 'Fácil Solicitud',
      description: 'Solicita la recolección de tus residuos en pocos clics desde tu dispositivo.',
    },
    {
      icon: <TruckIcon className="h-8 w-8" />,
      title: 'Recolección Eficiente',
      description: 'Conectamos con empresas especializadas para una recolección puntual y responsable.',
    },
    {
      icon: <GiftIcon className="h-8 w-8" />,
      title: 'Sistema de Recompensas',
      description: 'Gana puntos por cada recolección y cámbialos por beneficios exclusivos.',
    },
    {
      icon: <GlobeAmericasIcon className="h-8 w-8" />,
      title: 'Impacto Ambiental',
      description: 'Contribuye al cuidado del planeta con cada acción de reciclaje.',
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Regístrate',
      description: 'Crea tu cuenta gratuita en EcoRuta',
    },
    {
      step: '2',
      title: 'Solicita',
      description: 'Programa la recolección de tus residuos',
    },
    {
      step: '3',
      title: 'Recicla',
      description: 'Empresa especializada recoge tus residuos',
    },
    {
      step: '4',
      title: 'Gana',
      description: 'Acumula puntos y obtén recompensas',
    },
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Cliente',
      content: 'EcoRuta ha transformado la manera en que manejo mis residuos. Es súper fácil y he ganado muchos puntos.',
      rating: 5,
    },
    {
      name: 'Eco Solutions',
      role: 'Empresa Recolectora',
      content: 'Gracias a EcoRuta hemos optimizado nuestras rutas y aumentado nuestra base de clientes.',
      rating: 5,
    },
    {
      name: 'Carlos Ruiz',
      role: 'Cliente',
      content: 'El sistema de recompensas es genial. Ya he canjeado varios productos con mis puntos EcoRuta.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-eco-50 via-white to-ocean-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                  <span className="block">Reciclaje</span>
                  <span className="block text-gradient">Inteligente</span>
                  <span className="block">para tu Ciudad</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Conectamos a las personas con empresas de recolección de residuos 
                  para crear un futuro más sostenible. Solicita, recicla y gana recompensas.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register">
                      <Button 
                        variant="primary" 
                        size="lg" 
                        rightIcon={<ArrowRightIcon className="h-5 w-5" />}
                        className="w-full sm:w-auto"
                      >
                        Comenzar Ahora
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button 
                        variant="secondary" 
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        Iniciar Sesión
                      </Button>
                    </Link>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    Gratis para siempre. Sin compromisos.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto w-full rounded-lg shadow-xl lg:max-w-md"
              >
                <div className="relative">
                  <img
                    className="w-full rounded-lg"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%2316a34a'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='white' text-anchor='middle' dy='0.3em'%3EEcoRuta App%3C/text%3E%3C/svg%3E"
                    alt="EcoRuta App"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-eco-400 to-ocean-400 opacity-20 rounded-lg"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-eco-600">15K+</div>
                <div className="text-sm text-gray-600">Kg Reciclados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean-600">2.5K+</div>
                <div className="text-sm text-gray-600">Usuarios Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-eco-600">180+</div>
                <div className="text-sm text-gray-600">Empresas Aliadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean-600">95%</div>
                <div className="text-sm text-gray-600">Satisfacción</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              ¿Por qué elegir EcoRuta?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Facilitamos el reciclaje con tecnología y compromiso ambiental
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover padding="lg" className="text-center h-full">
                  <div className="text-eco-600 flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              ¿Cómo funciona?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              En solo 4 pasos simples puedes comenzar a reciclar
            </p>
          </motion.div>

          <div className="mt-16">
            <div className="grid gap-8 md:grid-cols-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-eco-500 to-ocean-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                      {step.step}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-gray-300"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Historias reales de impacto ambiental
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card padding="lg" className="h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-eco-600 to-ocean-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              ¿Listo para comenzar tu viaje eco-amigable?
            </h2>
            <p className="mt-4 text-lg text-eco-100">
              Únete a miles de usuarios que ya están haciendo la diferencia
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-eco-600 hover:bg-gray-50"
                >
                  Crear Cuenta Gratis
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-eco-600"
                >
                  Conocer Más
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
