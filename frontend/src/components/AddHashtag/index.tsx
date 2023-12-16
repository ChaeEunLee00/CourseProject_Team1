import styled from "@emotion/styled";
import React, { useRef } from "react";

interface AddHashtagProps {
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>;
  hashtags: string[];
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  height: 60px;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

const HashtagInputText = styled.div`
  width: 180px;
  height: 50px;
  font-size: 25px;
  font-weight: bold;
`;

const HashtagInput = styled.input`
  width: 300px;
  height: 25px;
  padding-left: 5px;
  margin-bottom: 12px;
`;

const AddedHashtagsContainer = styled.div`
  width: 600px;
  margin-bottom: 12px;
  display: flex;
  flex-wrap:
`;

const AddedHashtag = styled.span`
  margin-right: 8px;
  font-weight: bold;
`;



export const AddHashtag: React.FC<AddHashtagProps> = ({setHashtags, hashtags}) => {
  const hashtagInputRef = useRef<HTMLInputElement>(null);

  const handleHashtagChange = () => {
    const inputValue = hashtagInputRef.current?.value || "";
    const lastChar = inputValue.charAt(inputValue.length -1);

    if (lastChar === " " && inputValue.trim() !== "") {
      const newHashtag = inputValue.trim().toLowerCase();
      setHashtags((prevHashtags) => [...prevHashtags, newHashtag]);
      hashtagInputRef.current!.value = ""; // Clear
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags((prevHashtags) => prevHashtags.filter((_, i) => i !== index));
  };

  return (
    <>
      <Container>
        <HashtagInputText>Hashtags :</HashtagInputText>
        <HashtagInput
          type="text"
          placeholder="Enter hashtags separated by spaces"
          onChange={handleHashtagChange}
          ref={hashtagInputRef}
        />
      </Container>
      <AddedHashtagsContainer>
        {hashtags.map((tag, index) => (
          <AddedHashtag key={tag}>
            #{tag}
            <span
              style={{cursor: "pointer", marginLeft: "4px"}}
              onClick={() => removeHashtag(index)}
            >
              &#10006;
            </span>
          </AddedHashtag>
        ))}
      </AddedHashtagsContainer>
    </>
  );
};