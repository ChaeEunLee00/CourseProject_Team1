import React, {useState} from 'react';

const FileInput = ({ onFileChange }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onFileChange(file);
    };

    return (
        <input type='file' accept='image/*' onChange={handleFileChange} />
    );
};

export default FileInput;