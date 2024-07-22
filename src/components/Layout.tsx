import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex justify-center w-full h-screen">
      <main className="w-[46rem] min-w-[23rem]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
