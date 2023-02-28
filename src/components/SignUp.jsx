import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "./Form";
import { setUser } from "store/slices/userSlice";
import { useState} from "react";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorDescription, setErrorDescription] = useState("");
  const [spinner, setSpinner] = useState(null);
  const auth = getAuth();
  const handleRegister = (email, password) => {
    fetch(
      `https://b24-9sdu4m.bitrix24.ru/rest/1/${password}/task.item.getlist.json`
    )
      .then((response) => response.json())
      .then((data) =>{
    if(data!==null&&data.error!=='INVALID_CREDENTIALS'){
       createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.id,
            token: user.accessToken,
            data: data.result,
          })
        );
          navigate("/tasks");
      })
      .catch((error) => {
        const errorMessage = error.message;
         if (errorMessage == "Firebase: Error (auth/missing-email).") {
          setErrorDescription( "Fill in the email field!");
          setSpinner(!spinner);
        }
        if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
          setErrorDescription( "The user already exists!");
          setSpinner(!spinner);
        }
        if (errorMessage == "Firebase: Error (auth/invalid-email).") {
          setErrorDescription( "Invalid email!");
          setSpinner(!spinner);
        }
        if (errorMessage == "Firebase: Error (auth/internal-error).") {
          setErrorDescription( "Fill in the password field!");
          setSpinner(!spinner);
        }

      });
    }
    else{
      setErrorDescription( "Incorrect password (webhook)!");
    }
      })
  };
  return (
    <Form
      header="Register"
      title="register"
      text="You have an account."
      path="/login"
      action="Log In "
      handleClick={handleRegister}
      error={errorDescription}
      spinner={spinner}
    />
  );
};
export default SignUp;
