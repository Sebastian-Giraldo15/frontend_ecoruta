import React from 'react';
import { motion } from 'framer-motion';

export const ServerError: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl font-bold text-red-600 mb-4">500</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error del servidor
          </h1>
          <p className="text-gray-600 mb-6">
            Ocurrió un error interno. Por favor, intenta más tarde.
          </p>
          <motion.a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-eco-600 text-white rounded-lg hover:bg-eco-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver al inicio
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default ServerError;
