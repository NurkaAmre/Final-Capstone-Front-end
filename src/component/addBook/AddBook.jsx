import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../helpers/api';
import InputChange from './hooks/InputChange';
import UseFileUpload from './hooks/useFileUpload';
import Container from './resusable/container/Container';
import FileUpload from './resusable/inputFields/FileUpload';
import Input from './resusable/inputFields/Input';
import isUserSigned from '../../helpers/auth';

const AddBook = () => {
  const [name, handleNameChange] = InputChange('');
  const [type, handleTypeChange] = InputChange('');
  const [genre, handleGenreChange] = InputChange('');
  const [desc, handleDescChange] = InputChange('');
  const [singleColor, handleColorChange] = InputChange('');
  const [cost, handleCostChange] = InputChange('');
  const [pages, handlePagesChange] = InputChange('');
  const { file, preview, handleFileChange } = UseFileUpload();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserSigned()) {
      navigate('/signin');
    }
  }, [navigate]);
  const canBeSaved = [name, genre, desc, cost, pages].every(Boolean);
  const data = {
    images: {
      [singleColor]: preview,
    },
    color: [singleColor],
    name,
    book_type: type,
    genre,
    description: desc,
    cost: parseFloat(cost),
    pages: parseInt(pages, 10),
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
            label="Book Name"
            type="text"
            value={name}
            onchange={(input) => handleNameChange(input)}
          />

          <Input
            label="Book Type"
            type="text"
            value={type}
            onchange={(input) => handleTypeChange(input)}
          />

          <Input
            label="Book genre"
            type="text"
            value={genre}
            onchange={(input) => handleGenreChange(input)}
          />
          <Input
            label="Book Description"
            type="text"
            value={desc}
            onchange={(input) => handleDescChange(input)}
          />
          <Input
            label="Booking Cost"
            type="text"
            value={cost}
            onchange={(input) => handleCostChange(input)}
          />
          <Input
            label="Book pages"
            type="text"
            value={pages}
            onchange={(input) => handlePagesChange(input)}
          />
          <Input
            label="Book Color"
            type="text"
            value={singleColor}
            onchange={(input) => handleColorChange(input)}
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