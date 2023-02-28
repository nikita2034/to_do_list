import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "./Form";
import { setUser } from "store/slices/userSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorDescription, setErrorDescription] = useState("");
  const [spinner, setSpinner] = useState(null);
  let errorMessage = "";
  
  const handleLogin = (email, password) => {
    const auth = getAuth();
    fetch(
      `https://b24-9sdu4m.bitrix24.ru/rest/1/${password}/task.item.getlist.json`
    )
      .then((response) => response.json())
      .then((data) => {
        signInWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            dispatch(
              setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                data: data.result,
              })
            );
            navigate("/tasks");
          })
          .catch((error) => {
            errorMessage = error.message;
            if (errorMessage == "Firebase: Error (auth/user-not-found).") {
              setErrorDescription(
                "The user was not found. Check that your username and correct!");
              setSpinner(!spinner);
            }
            if (errorMessage == "Firebase: Error (auth/internal-error).") {
              setErrorDescription("Fill in the password field!");
              setSpinner(!spinner);
            }
            if (errorMessage == "Firebase: Error (auth/invalid-email).") {
              setErrorDescription("Invalid email value!");
              setSpinner(!spinner);
            }
            if (errorMessage == "Firebase: Error (auth/wrong-password).") {
              setErrorDescription("Wrong password!");
              setSpinner(!spinner);
            }
          });
      });
  };

  return (
    <Form
      header="Log In"
      title="sign in"
      text="Don't have an account?"
      path="/register"
      action="Register"
      error={errorDescription}
      spinner={spinner}
      handleClick={handleLogin}
    />
  );
};

export { Login };
