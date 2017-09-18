import React from 'react';
import {
  TopNavBar,
  CategoryNav,
  Footer,
} from '../Navigation';

export default function NavFooterWrapper({ children }) {
  return (
    <div>
      <TopNavBar />
      <CategoryNav />
      <div
        className="container"
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
