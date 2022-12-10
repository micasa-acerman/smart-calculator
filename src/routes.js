import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import RegressionPage from './pages/RegressionPage';
import CalculatorPage from './pages/CalculatorPage';
import NotFound from './pages/Page404';
import RAMOptimizationPage from './pages/optimization/RAMOptimizationPage';
import TransportOptimizationPage from './pages/optimization/TransportOptimizationPage';
import MainPage from './pages/main/MainPage';
import TechnologySystemPage from './pages/optimization/TechnologySystemPage';
import IntegralNavigation from './pages/integrals/IntegralNavigation';
import CalculateIntegralPage from './pages/integrals/CalculateIntegralPage';
import FunctionsNavigator from './pages/functions/FunctionsNavigator';
import CalculateExtremumPage from './pages/functions/CalculateExtremumPage';
import EquationsNavigation from './pages/equations/EquationsNavigation';
import CalculateEquationsRootPage from './pages/equations/CalculateEquationsRootPage';
import DifferentialEquationsNavigation from './pages/equations/DifferentialEquationsNavigation';
import OptimizationNavigation from './pages/optimization/OptimizationNavigation';

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
        { path: 'optimization', element: <OptimizationNavigation /> },
        { path: 'optimization/ram', element: <RAMOptimizationPage /> },
        { path: 'optimization/ts', element: <TransportOptimizationPage /> },
        { path: 'optimization/tech', element: <TechnologySystemPage /> },
        {
          path: 'integrals',
          element: <IntegralNavigation />
        },
        { path: 'integrals/monte-carlo', element: <CalculateIntegralPage /> },
        { path: 'functions', element: <FunctionsNavigator /> },
        { path: 'functions/extremum/monte-carlo', element: <CalculateExtremumPage /> },
        { path: 'equations', element: <EquationsNavigation /> },
        { path: 'equations/root/monte-carlo', element: <CalculateEquationsRootPage /> },
        { path: 'differential-equations', element: <DifferentialEquationsNavigation /> }
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
