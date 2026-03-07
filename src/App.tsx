import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
import Dashboard from './shared/components/layout/Dashboard';
import Exercises from './features/exercises/components/ExercisesManager';
import AuthProvider from './features/auth/context/AuthProvider';
import ProtectedRoute from './shared/components/routes/ProtectedRoute';
import PublicRoute from './shared/components/routes/PublicRoute';
import Trains from './features/trains/components/TrainsManager';
import TrainSessions from './features/trainSessions/components/TrainSessions';
import Train from './features/trains/components/TrainManger';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/train-sessions" replace />} />

          {/* Auth */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Dashboard />}>
              <Route path="/managment">
                <Route path="/managment/exercises" element={<Exercises />} />
                <Route path="/managment/trains">
                  <Route index element={<Trains />} />
                  <Route path="/managment/trains/:id" element={<Train />} />
                </Route>
              </Route>
              <Route path="/train-sessions" element={<TrainSessions />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App
