import Link from "next/link";
import Text from "@/shared/components/Text";
import styles from './not-found.module.scss'

export default function NotFound() {
    return(
        <div className={styles.root}>
            <Text view="title"> 404 </Text>
            <Text view="p-20" color="secondary">Страница не найдена</Text>
            <Link href = "/" className={styles['root__link']}>
            <Text view="p-16"> Вернуться на главную страницу</Text>
            </Link>
        </div>
    )
}