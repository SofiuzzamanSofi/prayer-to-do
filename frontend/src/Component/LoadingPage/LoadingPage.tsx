import { FC } from 'react';
import loadingImage from "../../assets/loadingBlackBg.gif"
import style from "./LoadingPage.module.css"

interface LoadingPageProps {

};

const LoadingPage: FC<LoadingPageProps> = ({ }) => {
    return (
        <div>
            <img className={style.loading_image} src={loadingImage} alt="loading-image" />
        </div>
    );
};

export default LoadingPage;