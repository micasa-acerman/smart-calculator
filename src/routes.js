import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import RegressionPage from './pages/RegressionPage';
import ComputingCalculatorPage from './pages/ComputingCalculatorPage';
import CalculatorPage from './pages/CalculatorPage';
import NotFound from './pages/Page404';
import RAMOptimizationPage from './pages/RAMOptimizationPage';
import TransportOptimizationPage from './pages/TransportOptimizationPage';
import MainPage from './pages/MainPage';
import TechnologySystemPage from './pages/TechnologySystemPage';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <MainPage /> },
        { path: 'mnk', element: <RegressionPage /> },
        { path: 'calculator', element: <CalculatorPage /> },
        { path: 'monte-carlo', element: <ComputingCalculatorPage /> },
        { path: 'optimization-ram', element: <RAMOptimizationPage /> },
        { path: 'optimization-ts', element: <TransportOptimizationPage /> },
        { path: 'optimization-tech', element: <TechnologySystemPage /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
