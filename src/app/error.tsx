'use client'

import { useEffect } from "react"
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
            <p>Что-то пошло не так</p>
            <button className={styles['root__button']} onClick={() => reset()}>Попробовать снова</button>
        </div>
    )
}