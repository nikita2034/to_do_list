/*Компонент App является корневым компонентом приложеня. Хранит роутинг приложения.*/
import ErrorPage from 'pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from 'pages/TaskPage';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LoginPage />} />
      <Route exact path='/register' element={<RegisterPage />} />
      <Route exact path='/tasks' element={<TaskPage />} />
      <Route exact path='/*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
