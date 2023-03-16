import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../helpers/api';
import InputChange from './hooks/inputChange';
import UserFileUpload from './hooks/userFileUpload';
import Container from './reusable/container/Container';
import FileUpload from './reusable/inputFields/FileUpload';
import Input from './reusable/inputFields/input';
import isUserSigned from '../../helpers/auth';

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
    date_of_publication: [date],
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
    <Container>
      <div className="form-container">
        <span className="flex flex-column center hero margin">
          <h1>Add New Book</h1>
        </span>
        <form onSubmit={handleSubmit} className="flex flex-column">
          <Input
            label="Book Title"
            type="text"
            value={title}
            onchange={(input) => handleTitleChange(input)}
          />

          <Input
            label="Book Author"
            type="text"
            value={author}
            onchange={(input) => handleAuthorChange(input)}
          />

          <Input
            label="Book genre"
            type="text"
            value={genre}
            onchange={(input) => handleGenreChange(input)}
          />

          <Input
            label="Book Isbn"
            type="text"
            value={isbn}
            onchange={(input) => handleIsbnChange(input)}
          />

          <Input
            label="Book Price"
            type="text"
            value={price}
            onchange={(input) => handlePriceChange(input)}
          />

          <Input
            label="Book pages"
            type="text"
            value={pages}
            onchange={(input) => handlePagesChange(input)}
          />

          <Input
            label="Book Publisher"
            type="text"
            value={publisher}
            onchange={(input) => handlePublisherChange(input)}
          />

          <Input
            label="Book Language"
            type="text"
            value={language}
            onchange={(input) => handleLanguageChange(input)}
          />

          <Input
            label="Book Date_of_publication"
            type="date"
            value={date}
            onchange={(input) => handleDateChange(input)}
          />

          <FileUpload
            type="upload"
            file={file}
            preview={preview}
            handleFileChange={(input) => handleFileChange(input)}
          />

          <button type="submit">Add Book</button>
        </form>
      </div>
    </Container>
  );
};

export default AddBook;
