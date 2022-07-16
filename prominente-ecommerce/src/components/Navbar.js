import Link from "next/link";

import Logo from "./Logo";
import { BellIcon, MobileMenu } from "./general/icons";
import { useAuth } from "../utils/contexts/AuthContext";
import { useCart } from "../utils/contexts/cartContext";
import ActiveLink from "./wrapper/ActiveLink";
import Show from "./wrapper/Show";
import { useNotif } from "../utils/contexts/NotifContext";

const Navbar = () => {
  const { currentUser, setNavIsOpen } = useAuth();
  const { totalBill, totalCartCount } = useCart();
  const { notifs, notifCount } = useNotif();

  return (
    <nav className="border-b fixed bg-white w-full h-max inset-0 z-10">
      <div className="page-width-container flex items-center justify-between h-20 sm:h-28">
        <Logo />

        <main className="flex space-x-10">
          <section className="hidden md:flex items-center space-x-8">
            <ActiveLink href="/">HOME</ActiveLink>
            <ActiveLink href="/cart">MY CART</ActiveLink>
            <ActiveLink href="/profile">ACCOUNT</ActiveLink>
          </section>

          <Show when={currentUser}>
            <section className="flex items-center space-x-6">
              <Link href="/notifications">
                <a className="relative nav-icons">
                  <Show when={notifCount > 0}>
                    <span className="bg-teal-400 rounded-full h-3 w-3 absolute -right-1 -top-1">
                      <span className="bg-teal-300 animate-ping rounded-full h-3 w-3 absolute -right-0"></span>
                    </span>
                  </Show>
                  <BellIcon className="h-6 w-6" />
                </a>
              </Link>
              <div className="hidden md:block text-left">
                <p className="text-xs text-gray-800">Total Balance</p>
                <p className="font-medium tracking-wider">₱{totalBill}.00</p>
              </div>
            </section>
          </Show>

          <Show when={!currentUser}>
            <section className="hidden md:flex items-center space-x-1">
              <Link href="/login">
                <a className="nav-icons hover:text-teal-500">LOG IN</a>
              </Link>
              <h2 className="font-extralight ">|</h2>
              <Link href="/signup">
                <a className="nav-icons hover:text-teal-500">SIGN UP</a>
              </Link>
            </section>
          </Show>

          <button
            className="block md:hidden btn-scale"
            onClick={() => setNavIsOpen(true)}
          >
            <MobileMenu />
          </button>
        </main>
      </div>
    </nav>
  );
};

export default Navbar;
