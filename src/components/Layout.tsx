import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <NavBar />
      <main className="flex-1 p-6">
        <Outlet /> {/* ici s’affichera Dashboard, Expense, etc. */}
      </main>
    </div>
  );
}
