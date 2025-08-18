import React, { useEffect, useState } from 'react';
import tipoResiduoService from '../../services/api/tipo-residuo.service';
import type { TipoResiduo } from '../../types/api.types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Pagination } from '../../components/common/Pagination';
import { Select } from '../../components/common/Select';
import { Textarea } from '../../components/common/Textarea';

const categorias = [
  { value: 'organico', label: 'Orgánico' },
  { value: 'reciclable', label: 'Reciclable' },
  { value: 'peligroso', label: 'Peligroso' },
  { value: 'otro', label: 'Otro' },
];

export const AdminTiposResiduos = () => {
  const [tiposResiduos, setTiposResiduos] = useState<TipoResiduo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingTipoResiduo, setEditingTipoResiduo] = useState<TipoResiduo | null>(null);
  const [filterCategoria, setFilterCategoria] = useState<string>('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'organico',
    subcategoria: '',
    activo: true
  });

  const fetchTiposResiduos = async (page: number) => {
    try {
      setLoading(true);
      const response = await tipoResiduoService.list({
        page,
        categoria: filterCategoria || undefined
      });
      setTiposResiduos(response.results);
      setTotalPages(Math.ceil(response.count / 10));
      setError(null);
    } catch (err) {
      setError('Error al cargar los tipos de residuos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiposResiduos(currentPage);
  }, [currentPage, filterCategoria]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTipoResiduo) {
        await tipoResiduoService.update(editingTipoResiduo.id, formData);
      } else {
        await tipoResiduoService.create(formData);
      }
      setModalOpen(false);
      fetchTiposResiduos(currentPage);
      setFormData({ 
        nombre: '', 
        descripcion: '', 
        categoria: 'organico', 
        subcategoria: '', 
        activo: true 
      });
      setEditingTipoResiduo(null);
    } catch (err) {
      setError('Error al guardar el tipo de residuo');
      console.error(err);
    }
  };

  const handleEdit = (tipoResiduo: TipoResiduo) => {
    setEditingTipoResiduo(tipoResiduo);
    setFormData({
      nombre: tipoResiduo.nombre,
      descripcion: tipoResiduo.descripcion || '',
      categoria: tipoResiduo.categoria,
      subcategoria: tipoResiduo.subcategoria || '',
      activo: tipoResiduo.activo
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este tipo de residuo?')) {
      try {
        await tipoResiduoService.delete(id);
        fetchTiposResiduos(currentPage);
      } catch (err) {
        setError('Error al eliminar el tipo de residuo');
        console.error(err);
      }
    }
  };

  if (loading && tiposResiduos.length === 0) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Tipos de Residuos</h1>
        <Button onClick={() => setModalOpen(true)}>
          Nuevo Tipo de Residuo
        </Button>
      </div>

      <div className="mb-6">
        <Select
          label="Filtrar por categoría"
          value={filterCategoria}
          onChange={(e) => setFilterCategoria(e.target.value)}
          options={[
            { value: '', label: 'Todas las categorías' },
            ...categorias
          ]}
          className="w-64"
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiposResiduos.map((tipoResiduo) => (
          <Card key={tipoResiduo.id} className="p-4">
            <h3 className="text-lg font-semibold mb-2">{tipoResiduo.nombre}</h3>
            <p className="text-gray-600 mb-2">
              Categoría: {categorias.find(c => c.value === tipoResiduo.categoria)?.label}
            </p>
            {tipoResiduo.subcategoria && (
              <p className="text-gray-600 mb-2">
                Subcategoría: {tipoResiduo.subcategoria}
              </p>
            )}
            {tipoResiduo.descripcion && (
              <p className="text-gray-600 mb-2">
                {tipoResiduo.descripcion}
              </p>
            )}
            <p className="text-gray-600">
              Estado: {tipoResiduo.activo ? 'Activo' : 'Inactivo'}
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => handleEdit(tipoResiduo)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(tipoResiduo.id)}>
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
          setEditingTipoResiduo(null);
          setFormData({ 
            nombre: '', 
            descripcion: '', 
            categoria: 'organico', 
            subcategoria: '', 
            activo: true 
          });
        }}
        title={editingTipoResiduo ? 'Editar Tipo de Residuo' : 'Nuevo Tipo de Residuo'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          
          <Select
            label="Categoría"
            value={formData.categoria}
            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            options={categorias}
          />

          <Input
            label="Subcategoría (opcional)"
            value={formData.subcategoria}
            onChange={(e) => setFormData({ ...formData, subcategoria: e.target.value })}
          />

          <Textarea
            label="Descripción (opcional)"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            rows={3}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.activo}
              onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
              className="h-4 w-4 text-blue-600"
            />
            <label className="text-gray-700">Activo</label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => {
                setModalOpen(false);
                setEditingTipoResiduo(null);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {editingTipoResiduo ? 'Guardar Cambios' : 'Crear Tipo de Residuo'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTiposResiduos;
