import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '../../components/common';

export const CompanyRoutes: React.FC = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Planificación de Rutas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Optimiza las rutas de recolección para mayor eficiencia
          </p>
        </div>

        <Card>
          <CardBody>
            <p className="text-gray-600">
              Planificación de rutas en desarrollo...
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default CompanyRoutes;
