'use client'

import { useEffect } from "react"
import Text from "@/shared/components/Text";
import Button from "@/shared/components/Button";
import styles from "./error.module.scss"

export default function Error({
    error,
    reset,
}: {
    error: Error & {digest? : string};
    reset: ()=> void
}) {
    useEffect(()=>{
      console.error(error)
    }, [error])

    return(
        <div className={styles.root}>
            <Text className={styles['root__text']} view="p-20">Что-то пошло не так</Text>
            <Button className={styles['root__button']} onClick={() => reset()}>Попробовать снова</Button>
        </div>
    )
}