import React from 'react';

const headerStyle = {
  background: 'black',
  height: '15vh',
  // lineHeight: "15vh"
};
function Header(props) {
  const { handleFormSwitch } = props || { handleFormSwitch: () => {} };
  return (
    <div style={headerStyle}>
      <button type="button" className="ui button" onClick={() => handleFormSwitch('signUp')}>Sign Up</button>
      <button type="button" className="ui button" onClick={() => handleFormSwitch('login')}>Log In</button>
    </div>
  );
}

export default Header;
