import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';
import { AuthDebugUtils } from './components/debug/AuthDebugUtils';

// Estilos globales
import './styles/globals.css';

/**
 * Componente principal de la aplicación
 */
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <AuthDebugUtils />
    </AuthProvider>
  );
}

export default App;
