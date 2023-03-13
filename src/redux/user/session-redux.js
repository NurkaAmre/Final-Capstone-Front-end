// API data

// Actions
const FULLFILED = 'Book-frontend/user/user-signup/FULLFILED';
const LOGOUT = 'Book-frontend/user/user-signup/LOGOUT';
// const ADD_RESERVATION = 'reservations/reseravtions/ADD_RESERVATION';
// const REMOVE_MSG = 'reservations/reservations/REMOVE8MSG';
// const CREATE_RESERVATION_LINK = 'http://127.0.0.1:3000/api/v1/reservation';
// const REMOVE_RESERVATIONS = 'reservations/reservations/REMOVE_RESERVATIONS';

// Initial state
const initialState = {
  user: {},
  // reservations: [],
  message: '',
  creationMsg: '',
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FULLFILED:
      return {
        ...state,
        ...action.payload.obj,
      };

    case LOGOUT:
      return initialState;

      // case ADD_RESERVATION:
      //   if (action.payload.newReservation) {
      //     return {
      //       ...state,
      //       reservations: [...state.reservations, action.payload.newReservation],
      //       creationMsg: action.payload.msg,
      //     };
      // //   }
      //   return {
      //     ...state,
      //     creationMsg: action.payload.msg,
      //   };

      // case REMOVE_RESERVATIONS:
      //   return {
      //     ...state,
      //     reservations: [...state.reservations.filter((item) =>
      // item.book_id !== action.payload)],
      //   };

      // case REMOVE_MSG:
      //   return {
      //     ...state,
      //     creationMsg: action.payload,
      //   };

    default:
      return state;
  }
};

// Action Creators
// const setReservationAction = (reservation) => ({
//   type: ADD_RESERVATION,
//   payload: reservation,
// });

// const setMsgAction = () => ({
//   type: REMOVE_MSG,
//   payload: '',
// });

const fullfiled = (obj) => ({
  type: FULLFILED,
  payload: { obj },
});

const logout = () => ({
  type: LOGOUT,
});

// const setRemoveReservationsAction = (id) => ({
//   type: REMOVE_RESERVATIONS,
//   payload: id,
// });

const userSession = (obj, endpoint) => async (dispatch) => fetch(`http://127.0.0.1:3000/api/v1/${endpoint}`, {
  method: 'POST',
  body: JSON.stringify(obj),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then((data) => {
    dispatch(fullfiled(data));
  });

// const fetchReservation = (data) => async (dispatch) => {
//   await fetch(CREATE_RESERVATION_LINK, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then((result) => result.json())
//     .then((res) => {
//       const result = {
//         msg: res.message,

//       };
//       dispatch(setReservationAction(result));
//     });
// };

export default userReducer;
export {
  fullfiled, userSession, logout,
};
