import React, {ChangeEvent, useState} from 'react';

interface FileInputProps {
    onFileChange: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange }) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(file);
        }
    };

    return (
        <input type='file' accept='image/*' onChange={handleFileChange} />
    );
};

export default FileInput;