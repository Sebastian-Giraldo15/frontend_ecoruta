import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '../../components/common';

export const CompanyRequests: React.FC = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Solicitudes Asignadas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona las solicitudes de recolección asignadas a tu empresa
          </p>
        </div>

        <Card>
          <CardBody>
            <p className="text-gray-600">
              Gestión de solicitudes en desarrollo...
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default CompanyRequests;
