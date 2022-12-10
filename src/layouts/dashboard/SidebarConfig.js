// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Регрессии МНК',
    path: '/dashboard/mnk',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Калькулятор',
    path: '/dashboard/calculator',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Монте-Карло',
    path: '/dashboard/monte-carlo',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Оптимальное УД ЭВМ',
    path: '/dashboard/optimization-ram',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Оптимизация аренды ТС',
    path: '/dashboard/optimization-ts',
    icon: getIcon('eva:pie-chart-2-fill')
  }
];

export default sidebarConfig;
