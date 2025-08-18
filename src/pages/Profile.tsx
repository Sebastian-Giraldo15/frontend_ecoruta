import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '../components/common';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona tu información personal y configuraciones
          </p>
        </div>

        <Card>
          <CardBody>
            <p className="text-gray-600">
              Página de perfil en desarrollo...
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
