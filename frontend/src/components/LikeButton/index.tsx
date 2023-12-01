import styled from '@emotion/styled';
import React, { useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const Container = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

export const LikeButton= () => {
    const [isChecked, setIsChecked] = useState(false);
    const [count, setCount] = useState('');

    const handleLikeButtonClicked = () => {
        isChecked ? setIsChecked(false) : setIsChecked(true);
    };

    return (
        <Container>
            {isChecked ? 
                <HeartFilled className='like-button red' onClick={handleLikeButtonClicked} />
                : <HeartOutlined className='like-button' onClick={handleLikeButtonClicked} />
            }
            <h3>{count}</h3>
        </Container>
    );
};
