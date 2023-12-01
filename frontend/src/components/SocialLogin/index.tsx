import styled from '@emotion/styled';
import KakaotalkImg from '../../assets/kakaotalk_sharing_btn_medium.png';
import GoogleImg from '../../assets/googleLogo.png';
import FacebookImg from '../../assets/페이스북_로고_심볼형_RGB.png';

interface Props {
    readonly className: string;
}

const Container = styled.div`
    display: flex;
    gap: 40px;
    height: 39px;
    width: 147px;
`;

const KakaotalkLogo = styled.img`
    height: 33px;
    object-fit: cover;
    width: 33px;
`;

const GoogleLogo = styled.img`
    height: 32px;
    object-fit: cover;
    width: 39px;
`;

const FacebookLogo = styled.img`
    height: 32px;
    object-fit: cover;
    width: 32px;
`;

export const SocialLogin = ({className}: Props) => {
    return (
        <Container className={`social-login ${className}`}>
            <KakaotalkLogo src={KakaotalkImg} />
            <GoogleLogo src={GoogleImg} />
            <FacebookLogo src={FacebookImg} />
        </Container>
    );
}