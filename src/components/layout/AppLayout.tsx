import { FC, ReactNode } from 'react';
import Header from './Header';

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <div style={{ flexShrink: 0 }}>
      <Header />
    </div>
    <div style={{ flex: 1, overflow: 'auto' }}>
      {children}
    </div>
  </div>
);

export default AppLayout;