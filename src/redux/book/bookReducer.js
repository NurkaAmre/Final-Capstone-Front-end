import axios from 'axios';

// const BASE_URL = 'http://127.0.0.1:3000/api/v1/books';
const FETCH_BOOKS = 'FETCH_BOOKS';

const initialState = {
  books: [
    // {
    //   title: 'Book-1',
    //   author: 'Author-1',
    //   id: 1,
    // },
    // {
    //   title: 'Book-2',
    //   author: 'Author-2',
    //   id: 2,
    // },
  ],
  error: null,
  status: 'loading',
};

const getBooksAction = (books) => ({
  type: FETCH_BOOKS,
  payload: books,
});

console.log('helo');

export const getBooks = () => async (dispatch) => {
  await axios({
    method: 'get',
    url: 'https://api.spacexdata.com/v3/missions',
    responseType: 'json',
  })
    .then((res) => {
      console.log(res.data, 'urreesd');
      dispatch(getBooksAction(res.data));
    });
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        books: [state.books, ...action.payload],
        status: 'success',
      };
    default:
      return state;
  }
};

export default booksReducer;

