import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
