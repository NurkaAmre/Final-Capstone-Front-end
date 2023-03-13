const url = 'http://localhost:3000/api/v1/books';
const FETCH_BOOKS = 'FETCH_BOOKS';

const initialState = {
  books: [],
  error: null,
  status: 'loading',
};

const getBooksAction = (books) => ({
  type: FETCH_BOOKS,
  payload: books,
});

export const getBooks = () => async (dispatch) => {
  const res = await fetch(url);
  const allBooks = res.json();
  console.log(allBooks, 'QQQQQQQQQQQ'); 
  dispatch(getBooksAction(allBooks));
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        books: action.payload,
        status: 'success',
      };
    default:
      return state;
  }
};
