import { FC } from 'react';
import Router from './routes/Router';
import 'antd/dist/reset.css';
import './styles/main.scss';
import Header from './components/Header';

const App: FC = () => {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};

export default App;