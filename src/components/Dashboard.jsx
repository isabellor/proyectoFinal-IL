
import ProtectedRoute from "../components/ProtectedRoute"; 

export default function Dashboard() {
  return (
    <ProtectedRoute> 
      <div className="container mt-5">
        <h1 className="text-center mb-4">Dashboard</h1>
        <p className="text-center">Bienvenido al panel de control. Aquí puedes gestionar tus productos, ver estadísticas y más.</p>
        {/* Aquí puedes agregar más componentes o funcionalidades del dashboard */}
      </div>
    </ProtectedRoute> 
  );
}











