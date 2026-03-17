"use client";

import Text from "@components/Text";
import CartIcon from "@components/icons/CartIcon";
import UserIcon from "@components/icons/UserIcon";
import logo from "@public/logo.png";
import { useStore } from "@stores/global/RootStore";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import HeartIcon from "../icons/HeartIcon/HeartIcon";
import LogoutIcon from "../icons/LogoutIcon";

import styles from "./Header.module.scss";

const Header = observer(() => {
  const { cartStore, authStore, WishlistStore } = useStore();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 754);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  if (!isClient) {
    return (
      <header className={styles.header}>
        <div className={styles["header__container"]}>
          <div className={styles["header__logo"]}>
            <Image src={logo} alt="Shop logo" width={130} height={42} />
          </div>
          <div className={styles["header__icons"]}>
            <div className={styles["header__icons--link--wish"]}>
              <HeartIcon />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles["header__container"]}>
        <div className={styles["header__logo"]}>
          <Image src={logo} alt={"Shop logo"} width={130} height={42} />
        </div>

        {isMobile && (
          <button
            className={cn(styles.hamburger, {
              [styles.hamburgerOpen]: menuOpen,
            })}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span />
            <span />
            <span />
          </button>
        )}

        {!isMobile && (
          <nav className={styles["header__nav"]}>
            <Link
              href="/products"
              className={cn(styles["header__nav--link"], {
                [styles.active]: isActive("/products"),
              })}
            >
              <Text
                className={cn(styles["header__nav--text"], {
                  [styles.active]: isActive("/products"),
                })}
              >
                Products
              </Text>
            </Link>
          </nav>
        )}

        {isMobile && (
          <div
            className={cn(styles["header__nav--mobile"], {
              [styles["header__nav--open"]]: menuOpen,
            })}
          >
            <Link
              href="/products"
              className={cn(styles["header__nav--link"], {
                [styles.active]: isActive("/products"),
              })}
              onClick={() => setMenuOpen(false)}
            >
              <Text
                className={cn(styles["header__nav--text"], {
                  [styles.active]: isActive("/products"),
                })}
              >
                Products
              </Text>
            </Link>

            <div className={styles["mobile-icons"]}>
              <Link
                href={authStore.isAuthenticated ? "/wishlist" : "#"}
                onClick={(e) => {
                  if (!authStore.isAuthenticated) {
                    e.preventDefault();
                    router.push("/login");
                  }
                }}
                className={styles["header__icons--link--wish"]}
              >
                <HeartIcon />
                {authStore.isAuthenticated && WishlistStore.totalItems > 0 && (
                  <span className={styles["header__icons--badge"]}>
                    {WishlistStore.totalItems}
                  </span>
                )}
              </Link>
              <Link
                href={authStore.isAuthenticated ? "/cart" : "#"}
                onClick={(e) => {
                  if (!authStore.isAuthenticated) {
                    e.preventDefault();
                    router.push("/login");
                  }
                }}
                className={styles["header__icons--link--cart"]}
              >
                <CartIcon />
                {authStore.isAuthenticated && cartStore.totalItems > 0 && (
                  <span className={styles["header__icons--link--cart--badge"]}>
                    {cartStore.totalItems}
                  </span>
                )}
              </Link>
              {authStore.isAuthenticated ? (
                <button
                  onClick={() => {
                    authStore.logout();
                    if (pathname === "/cart" || pathname === "/wishlist") {
                      router.push("/products");
                    }
                  }}
                  className={styles["header__icons--logout"]}
                >
                  <LogoutIcon width={24} height={24} />
                </button>
              ) : (
                <Link
                  href="/login"
                  className={styles["header__icons--link--user"]}
                >
                  <UserIcon />
                </Link>
              )}
            </div>
          </div>
        )}

        {!isMobile && (
          <div className={styles["header__icons"]}>
            <Link
              href={authStore.isAuthenticated ? "/wishlist" : "#"}
              onClick={(e) => {
                if (!authStore.isAuthenticated) {
                  e.preventDefault();
                  router.push("/login");
                }
              }}
              className={styles["header__icons--link--wish"]}
            >
              <HeartIcon />
              {authStore.isAuthenticated && WishlistStore.totalItems > 0 && (
                <span className={styles["header__icons--badge"]}>
                  {WishlistStore.totalItems}
                </span>
              )}
            </Link>
            <Link
              href={authStore.isAuthenticated ? "/cart" : "#"}
              onClick={(e) => {
                if (!authStore.isAuthenticated) {
                  e.preventDefault();
                  router.push("/login");
                }
              }}
              className={styles["header__icons--link--cart"]}
            >
              <CartIcon />
              {authStore.isAuthenticated && cartStore.totalItems > 0 && (
                <span className={styles["header__icons--link--cart--badge"]}>
                  {cartStore.totalItems}
                </span>
              )}
            </Link>
            {authStore.isAuthenticated ? (
              <button
                onClick={() => {
                  authStore.logout();
                  if (pathname === "/cart" || pathname === "/wishlist") {
                    router.push("/products");
                  }
                }}
                className={styles["header__icons--logout"]}
              >
                <LogoutIcon width={24} height={24} />
              </button>
            ) : (
              <Link
                href="/login"
                className={styles["header__icons--link--user"]}
              >
                <UserIcon />
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
});

export default Header;
