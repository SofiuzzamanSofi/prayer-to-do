import { FC } from 'react';
import loadingImage from "../../assets/loadingBlackBg.gif"

interface LoadingPageProps {

};

const LoadingPage: FC<LoadingPageProps> = ({ }) => {
    return (
        <div>
            <img src={loadingImage} alt="loading-image" />
        </div>
    );
};

export default LoadingPage;