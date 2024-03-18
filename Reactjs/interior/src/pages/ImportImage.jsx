import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const ImportImage = () => {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;
      setImage(imageData);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    // Xử lý khi người dùng nhấn nút Tải ảnh lên
    console.log(base64Image);
  };

  useEffect(() => {
    if (image) {
      const base64Data = image.split(',')[1]; // Lấy phần Base64 sau dấu phẩy
      setBase64Image(base64Data);
    }
  }, [image]);

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Tải ảnh lên</button>
      {base64Image && (
        <img src={`data:image/jpeg;base64,${base64Image}`} alt="Ảnh" />
      )}
    </div>
  );
};


