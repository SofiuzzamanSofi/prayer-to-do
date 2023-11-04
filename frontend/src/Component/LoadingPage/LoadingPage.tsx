import { FC } from 'react';
import loadingImage from "../../assets/Animation .gif"
import style from "./LoadingPage.module.css"

interface LoadingPageProps {

};

const LoadingPage: FC<LoadingPageProps> = ({ }) => {
    return (
        <div className={style.loading_image_div}>
            <img className={style.loading_image} src={loadingImage} alt="loading-image" />
        </div>
    );
};

export default LoadingPage;