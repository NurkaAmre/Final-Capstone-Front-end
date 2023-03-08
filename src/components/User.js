import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';

/* eslint-disable */
const User = ({ currUser, setCurrUser }) => {
  const [show, setShow] = useState(true);

  if (currUser) {
    return (
      <div>
        Hello
        {' '}
        {currUser.email}

        <Logout setCurrUser={setCurrUser} />
      </div>
    );
  }

  return (
    <div>
      {
                show
                  ? <Login setCurrUser={setCurrUser} setShow={setShow} />
                  : <Signup setCurrUser={setCurrUser} setShow={setShow} />
            }
    </div>
  );
};

export default User;
