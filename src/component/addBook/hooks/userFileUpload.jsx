import { useState } from 'react';

const UseFileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    }
  };

  return { file, preview, handleFileChange };
};

export default UseFileUpload;
