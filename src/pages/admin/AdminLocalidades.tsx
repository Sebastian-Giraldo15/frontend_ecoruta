import React, { useEffect, useState } from 'react';
import localidadService from '../../services/api/localidad.service';
import type { Localidad } from '../../types/api.types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Pagination } from '../../components/common/Pagination';
import { Select } from '../../components/common/Select';

const diasSemana = [
  { value: '1', label: 'Lunes' },
  { value: '2', label: 'Martes' },
  { value: '3', label: 'Miércoles' },
  { value: '4', label: 'Jueves' },
  { value: '5', label: 'Viernes' },
  { value: '6', label: 'Sábado' },
  { value: '7', label: 'Domingo' },
];

export const AdminLocalidades = () => {
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingLocalidad, setEditingLocalidad] = useState<Localidad | null>(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    dia_recoleccion_organicos: 1,
    activa: true
  });

  const fetchLocalidades = async (page: number) => {
    try {
      setLoading(true);
      const response = await localidadService.list(page);
      setLocalidades(response.results);
      setTotalPages(Math.ceil(response.count / 10));
      setError(null);
    } catch (err) {
      setError('Error al cargar las localidades');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocalidades(currentPage);
  }, [currentPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLocalidad) {
        await localidadService.update(editingLocalidad.id, formData);
      } else {
        await localidadService.create(formData);
      }
      setModalOpen(false);
      fetchLocalidades(currentPage);
      setFormData({ nombre: '', dia_recoleccion_organicos: 1, activa: true });
      setEditingLocalidad(null);
    } catch (err) {
      setError('Error al guardar la localidad');
      console.error(err);
    }
  };

  const handleEdit = (localidad: Localidad) => {
    setEditingLocalidad(localidad);
    setFormData({
      nombre: localidad.nombre,
      dia_recoleccion_organicos: localidad.dia_recoleccion_organicos,
      activa: localidad.activa
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta localidad?')) {
      try {
        await localidadService.delete(id);
        fetchLocalidades(currentPage);
      } catch (err) {
        setError('Error al eliminar la localidad');
        console.error(err);
      }
    }
  };

  if (loading && localidades.length === 0) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Localidades</h1>
        <Button onClick={() => setModalOpen(true)}>
          Nueva Localidad
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {localidades.map((localidad) => (
          <Card key={localidad.id} className="p-4">
            <h3 className="text-lg font-semibold mb-2">{localidad.nombre}</h3>
            <p className="text-gray-600">
              Día de recolección: {diasSemana.find(d => d.value === localidad.dia_recoleccion_organicos.toString())?.label}
            </p>
            <p className="text-gray-600">
              Estado: {localidad.activa ? 'Activa' : 'Inactiva'}
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => handleEdit(localidad)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(localidad.id)}>
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-6"
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingLocalidad(null);
          setFormData({ nombre: '', dia_recoleccion_organicos: 1, activa: true });
        }}
        title={editingLocalidad ? 'Editar Localidad' : 'Nueva Localidad'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          
          <Select
            label="Día de recolección"
            value={formData.dia_recoleccion_organicos.toString()}
            onChange={(e) => setFormData({ ...formData, dia_recoleccion_organicos: parseInt(e.target.value) })}
            options={diasSemana}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.activa}
              onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
              className="h-4 w-4 text-blue-600"
            />
            <label className="text-gray-700">Activa</label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => {
                setModalOpen(false);
                setEditingLocalidad(null);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {editingLocalidad ? 'Guardar Cambios' : 'Crear Localidad'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminLocalidades;
