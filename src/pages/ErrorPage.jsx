/*Компонент ErrorPage предназначен для отрисовки страницы с 404 ошибком при переходе на несуществующую страницу */
import s from "./ErrorPage.module.css";
import error from "../404error.png";
const ErrorPage = () => {
  return (
    <div className={s.error}>
      <img src={error} />
      <div className={s.error_message}>Page Not Found</div>
    </div>
  );
};

export default ErrorPage;
