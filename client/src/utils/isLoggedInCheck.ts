const isLoggedInCheck = () => {
  try {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export default isLoggedInCheck;
