import './styles/App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AppRoutes from './components/Routes/Routes';
import Sidebar from './components/Sidebar';
import UserForm from './components/UserForm';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from './features/categories/categoriesSlice';
import { getProducts } from './features/products/productsSlice';


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch])

  return (
    <div className="app">
      <Header/>
      <UserForm/>
      <div className='container'>
        <Sidebar />
        <AppRoutes />
      </div>
      
      <Footer/>
    </div>
  );
}

export default App;
