import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (login, password, email, image = false, api) => {
    setIsLoading(true);
    setError(null);

    const data = new FormData();
    data.append("login", login);
    data.append("password", password);
    data.append("email", email);
    if (image) {
      data.append("image", image);
    }

    const response = await fetch(api + "/user/signup", {
      method: "POST",
      body: data,
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
