'use client'

import Link from 'next/link'
import { observer } from "mobx-react-lite";
import { usePathname } from 'next/navigation';
import logo from '@public/logo.png';
import UserIcon from "@components/icons/UserIcon/UserIcon";
import styles from './Header.module.scss';
import Text from "@components/Text";
import { useStore } from '@stores/global/RootStore';
import CartIcon from "@components/icons/CartIcon/CartIcon";
import cn from "classnames";
import Image from 'next/image';


export const Header = observer(() => {
    const { cartStore } = useStore();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;


    return (
        <header className={styles.header}>
            <div className={styles['header__container']}>
                 <div className={styles['header__logo']}>
                        <Image src={logo} alt={"Shop logo"} width={130} height={42} />
                    </div>
                <nav className={styles['header__nav']}>
                    <Link href="/products" className={cn(styles['header__nav--link'], { [styles.active]: isActive('/') })}>
                        <Text className={styles['header__nav--text']}>Products</Text>
                    </Link>
                    <span className={styles['header__nav--link-disables']}>
                        <Text color='secondary' className={styles['header__nav--text']}>Categories</Text>
                    </span>
                    <span className={styles['header__nav--link-disables']}>
                        <Text color="secondary" className={styles['header__nav--text']}>About us</Text>
                    </span>
                </nav>
                <div className={styles['header__icons']}>
                    <Link href="/cart" className={styles['header__icons--link--cart']}>
                        <CartIcon />
                        {cartStore.totalItems > 0 && (
                            <span className={styles['header__icons--link--cart--badge']}> {cartStore.totalItems} </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    )
});
