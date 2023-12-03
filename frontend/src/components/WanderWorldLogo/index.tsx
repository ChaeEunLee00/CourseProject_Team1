import styled from '@emotion/styled';
import '../../Fonts/Font.css';
import '../../App.css';

interface Props {
    readonly className: string;
}

export const WanderWorldLogo = ({className}: Props) => {
    const handleReload = () => {
        if (className=='login'){
            window.location.reload();
        }
        else if (className=='signup'){
            window.location.assign('/..');
        }
        else{
            window.location.assign('/main');
        }
    };

    return (
        <div onClick={handleReload} className={`wander-world-logo ${className}`}>WanderWorld</div>
    )
}