import Link from "next/link";
import styles from './not-found.module.scss'

export default function NotFound() {
    return(
        <div className={styles.root}>
            <h1> 404 </h1>
            <p>Страница не найдена</p>
            <Link href = "/" className={styles['root__link']}>
            <p> Вернуться на главную страницу</p>
            </Link>
        </div>
    )
}