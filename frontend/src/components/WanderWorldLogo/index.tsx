import styled from '@emotion/styled';
import '../../Fonts/Font.css';
import '../../App.css';

interface Props {
    readonly className: string;
}

export const WanderWorldLogo = ({className}: Props) => {
    return (
        <div className={`wander-world-logo ${className}`}>WanderWorld</div>
    )
}