import React from 'react';
import {
  TopNavBar,
  CategoryNav,
  Footer,
} from '../navigation';

export default function NavFooterWrapper({ children }) {
  return (
    <div style={{
      backgroundColor: '#fff',
    }}
    >
      <TopNavBar />
      <CategoryNav />
      <div
        className="container dark-gray-background"
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
