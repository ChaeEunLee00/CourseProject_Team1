import styled from "@emotion/styled";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import { RangeStatic } from "quill";

interface ContentWhenPostProps {
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Container = styled.div`
    position: relative;
`;

const QuillContainer = styled(ReactQuill)`
    width: 600px;
    margin-top: 20px;
`;


export const ContentWhenPost: React.FC<ContentWhenPostProps> = ({setContent}) => {
    // imageAPI를 url에 저장하고 변수ㅓ럼 사용
    const imageApi = "http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/upload";
    const fileInputRef = useRef<ReactQuill | null>(null);
    // const quillRef = useRef(null);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {
            const file = input.files && input.files[0];
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            }
            

            try {
                const response = await axios.post(imageApi, formData);
                const imageUrl = response.data;
                console.log(imageUrl, imageUrl.type);
                const editor = fileInputRef.current?.getEditor();
                const range: RangeStatic | null = editor?.getSelection() || null;
                if (editor && range !== null) {
                    editor.insertEmbed(range.index, 'image', imageUrl);
                    editor.setSelection({
                        index: range.index + 1,
                        length: 0,
                        [Symbol('range')]: true,
                    });
                }
            } catch (error) {
                alert("event listener error : " + error);
            }
        });
    };

    const [quillValue, setQuillValue] = useState<string>("");

    const modules = useMemo(
        () => ({
          toolbar: {
            container: [
              [{ header: '1' }, { header: '2' }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
              ['image'],
            ],
            handlers: { image: imageHandler },
          },
          clipboard: {
            matchVisual: false,
          },
        }),
        [],
      );

    const formats = [
        "header",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
        "video",
    ];

    const handleQuillChange = (value: string) => {
        setQuillValue(value);
        setContent(value);
    }

    return (
        <Container>
            <QuillContainer
                theme="snow"
                ref={(ref) => (fileInputRef.current = ref)}
                modules={modules}
                formats={formats}
                value={quillValue}
                onChange={handleQuillChange}
                placeholder="Write down detailed information about the trip..."
            />
        </Container>
    )
}