import { useState, useEffect } from 'react';
import SummaryCard from './components/SummaryCard';
import DataTable from './components/DataTable';
import LoadingSpinner from './components/LoadingSpinner';
import { usersData } from './data/dummyData';

function App() {
  // Start with sidebar closed on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return window.innerWidth >= 1024; // lg breakpoint
  });
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle menu item click - close sidebar on mobile
  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Column definitions for the DataTable
  const tableColumns = [
    {
      header: 'ID',
      accessor: 'id',
      sortable: true,
      hideOnMobile: true,
    },
    {
      header: 'Name',
      accessor: 'name',
      sortable: true,
    },
    {
      header: 'Email',
      accessor: 'email',
      sortable: true,
      hideOnMobile: true,
      render: (value) => (
        <span className="break-all sm:break-normal">{value}</span>
      ),
    },
    {
      header: 'Role',
      accessor: 'role',
      sortable: true,
    },
    {
      header: 'Status',
      accessor: 'status',
      sortable: true,
      render: (value) => {
        const statusColors = {
          Active: 'bg-green-100 text-green-800',
          Inactive: 'bg-red-100 text-red-800',
          Pending: 'bg-yellow-100 text-yellow-800',
        };
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      },
    },
    {
      header: 'Revenue',
      accessor: 'revenue',
      sortable: true,
      hideOnMobile: true,
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      header: 'Created At',
      accessor: 'createdAt',
      sortable: true,
      hideOnMobile: true,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen 
            ? 'w-64' 
            : 'w-0 lg:w-20'
        } bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col fixed lg:static h-full z-30 lg:z-auto overflow-hidden lg:overflow-visible`}
      >
        {/* Sidebar Content */}
        <div className={`${sidebarOpen ? 'flex' : 'hidden lg:flex'} flex-col h-full ${sidebarOpen ? 'w-64' : 'lg:w-20'}`}>
        {/* Sidebar Header */}
        <div className={`p-4 sm:p-5 border-b border-gray-700 ${sidebarOpen ? 'flex items-center justify-between' : 'lg:flex lg:justify-center'}`}>
          {sidebarOpen && (
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight whitespace-nowrap">Admin Panel</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-3 sm:p-4">
          <ul className="space-y-1.5 sm:space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-2.5 sm:gap-3 justify-start' : 'lg:justify-center'} gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                    activeMenu === item.id
                      ? 'bg-blue-600 text-white shadow-lg font-semibold'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white font-medium'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <span>{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-700">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm sm:text-base">A</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-white truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@example.com</p>
              </div>
            )}
          </div>
        </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
              {menuItems.find((item) => item.id === activeMenu)?.label || 'Dashboard'}
            </h2>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Icon */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer hover:ring-2 ring-blue-300 transition-all">
                <span className="text-white font-semibold text-xs sm:text-sm">AU</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <LoadingSpinner size="lg" message="Loading dashboard..." />
            ) : (
              <>
            {/* Dashboard Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-5 sm:mb-6">
              <SummaryCard
                title="Total Users"
                value="12,345"
                growth="+12%"
                icon="👥"
                bgColor="bg-blue-100"
                textColor="text-blue-600"
                iconBgColor="bg-blue-100"
              />
              <SummaryCard
                title="Revenue"
                value="$45,678"
                growth="+8%"
                icon="💰"
                bgColor="bg-green-100"
                textColor="text-green-600"
                iconBgColor="bg-green-100"
              />
              <SummaryCard
                title="Orders"
                value="1,234"
                growth="+5%"
                icon="🛒"
                bgColor="bg-purple-100"
                textColor="text-purple-600"
                iconBgColor="bg-purple-100"
              />
              <SummaryCard
                title="Growth Percentage"
                value="+23.5%"
                growth="+4.2%"
                icon="📈"
                bgColor="bg-orange-100"
                textColor="text-orange-600"
                iconBgColor="bg-orange-100"
              />
            </div>

            {/* Data Table */}
            {activeMenu === 'dashboard' && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">
                  Users Data Table
                </h3>
                <DataTable data={usersData} columns={tableColumns} itemsPerPage={10} />
              </div>
            )}

            {/* Main Content Card for other menus */}
            {activeMenu !== 'dashboard' && (
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">
                  Welcome to {menuItems.find((item) => item.id === activeMenu)?.label}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  This is the main content area for your admin dashboard. You can add charts, tables, forms, or any other content here.
                </p>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">
                    <strong className="font-semibold">Active Menu:</strong> {menuItems.find((item) => item.id === activeMenu)?.label}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    <strong className="font-semibold">Sidebar Status:</strong> {sidebarOpen ? 'Expanded' : 'Collapsed'}
                  </p>
                </div>
              </div>
            )}
            </>
            )}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default App;