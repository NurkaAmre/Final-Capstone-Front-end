import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../helpers/api';
import InputChange from './hooks/inputChange';
import UserFileUpload from './hooks/userFileUpload';
import Container from './reusable/container/Container';
import FileUpload from './reusable/inputFields/FileUpload';
import Input from './reusable/inputFields/input';
import isUserSigned from '../../helpers/auth';
import Nav from '../navbar/nav';
/* eslint-disable jsx-a11y/label-has-associated-control */

const AddBook = () => {
  const [title, handleTitleChange] = InputChange('');
  const [author, handleAuthorChange] = InputChange('');
  const [genre, handleGenreChange] = InputChange('');
  const [isbn, handleIsbnChange] = InputChange('');
  const [publisher, handlePublisherChange] = InputChange('');
  const [price, handlePriceChange] = InputChange('');
  const [pages, handlePagesChange] = InputChange('');
  const [language, handleLanguageChange] = InputChange('');
  const [date, handleDateChange] = InputChange('');
  const { file, preview, handleFileChange } = UserFileUpload();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserSigned()) {
      navigate('/signin');
    }
  }, [navigate]);

  const canBeSaved = [title, author, genre, isbn, publisher, price, pages, language].every(Boolean);

  const data = {
    book_cover_images: {
      [date]: preview,
    },
    date_of_publication: date,
    title,
    author,
    genre,
    isbn,
    publisher,
    price: parseInt(price, 10),
    pages: parseInt(pages, 10),
    language,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canBeSaved) {
      fetch(`${baseURL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(() => {
          navigate('/');
        })
        .catch((error) => error);
    }
  };

  return (
    <section className="add-book-root">
      <Nav />
      <Container>

        <div className="form-container">
          <span className="flex flex-column center hero margin">
            <h1>Add New Book</h1>
          </span>
          <form onSubmit={handleSubmit} className="flex flex-column add-form">
            <label htmlFor="bookTitle">
              Book title:
              <Input
                id="bookTitle"
                type="text"
                value={title}
                onChange={(input) => handleTitleChange(input)}
              />
            </label>

            <label>
              Book Author:
              <Input
                type="text"
                value={author}
                onChange={(input) => handleAuthorChange(input)}
              />
            </label>

            <label>
              Book genre:
              <Input
                type="text"
                value={genre}
                onChange={(input) => handleGenreChange(input)}
              />
            </label>

            <label>
              Book ISBN:
              <Input
                type="text"
                value={isbn}
                onChange={(input) => handleIsbnChange(input)}
              />
            </label>

            <label>
              Book Price:
              <Input
                type="text"
                value={price}
                onChange={(input) => handlePriceChange(input)}
              />
            </label>

            <label>
              Book pages:
              <Input
                type="text"
                value={pages}
                onChange={(input) => handlePagesChange(input)}
              />
            </label>

            <label>
              Book Publisher:
              <Input
                type="text"
                value={publisher}
                onChange={(input) => handlePublisherChange(input)}
              />
            </label>

            <label>
              Language:
              <Input
                type="text"
                value={language}
                onChange={(input) => handleLanguageChange(input)}
              />
            </label>

            <label>
              Published Date:
              <Input
                type="date"
                value={date}
                onChange={(input) => handleDateChange(input)}
              />
            </label>

            <div className="file-upload">
              <FileUpload
                type="upload"
                className="file-input"
                file={file}
                preview={preview}
                handleFileChange={(input) => handleFileChange(input)}
              />
            </div>

            <button type="submit" className="addbtn">Add Book</button>
          </form>
        </div>
      </Container>
    </section>

  );
};

export default AddBook;
