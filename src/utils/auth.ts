export const savePasswordForEmail = (email: string, password: string) => {
    const encoded = btoa(password);
    const savedData = JSON.parse(localStorage.getItem("user_pass_map") || "{}");
    savedData[email] = encoded;
    localStorage.setItem("user_pass_map", JSON.stringify(savedData));
  };
  
  export const checkPasswordForEmail = (email: string, inputPassword: string) => {
    const savedData = JSON.parse(localStorage.getItem("user_pass_map") || "{}");
    const savedEncodedPassword = savedData[email];
    if (!savedEncodedPassword) return false;
    return btoa(inputPassword) === savedEncodedPassword;
  };
  