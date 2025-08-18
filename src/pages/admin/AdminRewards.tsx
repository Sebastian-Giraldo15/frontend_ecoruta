import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '../../components/common';

export const AdminRewards: React.FC = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Recompensas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra todas las recompensas disponibles en la plataforma
          </p>
        </div>

        <Card>
          <CardBody>
            <p className="text-gray-600">
              Gestión de recompensas en desarrollo...
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminRewards;
