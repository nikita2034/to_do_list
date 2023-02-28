import s from "./ErrorPage.module.css"
import error from '../404error.png';
const ErrorPage=()=>{
    return(
        <div className={s.error}>
          <img src={error}/>
          <div className={s.error_message}>Page Not Found</div>
        </div>
    )
}

export default ErrorPage