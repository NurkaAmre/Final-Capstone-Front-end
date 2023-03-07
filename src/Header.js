import React from 'react';

const headerStyle = {
  background: 'black',
  height: '15vh',
  // lineHeight: "15vh"
};
function Header(props) {
  return (
    <div style={headerStyle}>
      <button type="button" className="ui button" onClick={() => props.handleFormSwitch('signUp')}>Sign Up</button>
      <button type="button" className="ui button" onClick={() => props.handleFormSwitch('login')}>Log In</button>
    </div>
  );
}

export default Header;
