import React from 'react';
import {
  TopNavBar,
  Footer,
} from '../Navigation';

export default function NavFooterWrapper({ children }) {
  return (
    <div>
      <TopNavBar />
      {children}
      <Footer />
    </div>
  );
}
