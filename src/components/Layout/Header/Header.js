import { Fragment } from 'react';
import styles from './Header.module.css';
import bannerImage from '../../../assets/images/scoff-banner.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = () => {
    return <Fragment>
        <header className={styles.header}>
            <h1>SCOFF</h1>
            <HeaderCartButton />
        </header>
        <div className={styles['main-image']}>
            <img src={bannerImage} alt=''/>
        </div>
    </Fragment>
}

export default Header;