import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from '../public/assets/img/nerdyfactory_logo.png'
import { Fragment } from "react";

export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white">
      <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}

const Header = () => {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  return (
    <header
      className={clsx(`${"flex items-center " + (isRoot ? "justify-center" : "justify-start")}`, {
        "mb-8": isRoot,
        "mb-2": !isRoot,
      })}
    >
      <div className={"max-w-md"}>
        {isRoot ? <LargeTitle /> : <SmallTitle />}
      </div>
    </header>
  );
};

const LargeTitle = () => (
  <Link href="/">
    <div className="flex flex-col items-center">
      <img className="flex-auto mb-3" src={Logo} width="50" height="50" />
      <h1>
        <a
          className={clsx(
            "nf-title text-3xl font-black leading-none text-black no-underline font-display  mb-5",
            "sm:text-5xl",
            "dark:text-white"
          )}
        >
          Nerdy Blog
        </a>
      </h1>
    </div>
  </Link>
);

const SmallTitle = () => (
  <Link href="/">
    <div className="flex flex-row items-center justify-center">
      <img className="flex-auto mr-3" src={Logo} width="30" height="30" />
      <h1>
        <a
          className={clsx(
            "nf-title text-2xl font-black text-black no-underline font-display",
            "dark:text-white"
          )}
        >
          Nerdy Blog
        </a>
      </h1>
    </div>
  </Link>
);
