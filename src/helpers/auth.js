const isUserSigned = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    return true;
  }

  return false;
};

export default isUserSigned;
