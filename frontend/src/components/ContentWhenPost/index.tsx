import styled from "@emotion/styled";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { SetStateAction, useRef, useState } from "react";
import { PictureOutlined, VideoCameraOutlined } from "@ant-design/icons";
import type Delta from "quill-delta";

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

const AttachmentIcons = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
`;

const AttachmentIcon = styled.div`
    cursor: pointer;
    margin-right: 10px;
`;

export const ContentWhenPost: React.FC<ContentWhenPostProps> = ({setContent}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [quillValue, setQuillValue] = useState<string>("");

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link"],
            ["clean"],
            ["image", "video"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
    ];


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            // 이미지나 비디오를 다루는 게 필요하면 추가
            console.log("Selected file:", file);
        }
    };

    return (
        <Container>
            <QuillContainer
                theme="snow"
                modules={modules}
                formats={formats}
                value={quillValue}
                onChange={(value: string) => setQuillValue(value)}
                placeholder="Write down detailed information about the trip..."
            />
            {/* <AttachmentIcons>
                <AttachmentIcon onClick={() => fileInputRef.current?.click()}>
                    <PictureOutlined />
                </AttachmentIcon>
                <AttachmentIcon>
                    <VideoCameraOutlined />
                </AttachmentIcon>
            </AttachmentIcons>
            <input type="file" accept="image/*,video/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} /> */}
        </Container>
    )
}