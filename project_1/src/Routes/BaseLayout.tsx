import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const BaseLayout: React.FC = () => {
  return (
    <div className="mx-10">
      <Header />
      <div className="max-w-[1074px] min-w-[675px] m-auto mt-[30px]">
        <Navigation />
        {/* В этом месте будет отображаться контент вложенных роутов */}
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
