import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '../components/common';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <Card>
          <CardBody className="text-center">
            <div className="text-6xl font-bold text-eco-600 mb-4">404</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Página no encontrada
            </h1>
            <p className="text-gray-600 mb-6">
              La página que buscas no existe o ha sido movida.
            </p>
            <motion.a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-eco-600 text-white rounded-lg hover:bg-eco-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Volver al inicio
            </motion.a>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;
