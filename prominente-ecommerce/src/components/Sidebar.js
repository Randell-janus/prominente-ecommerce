import Link from "next/link";
import { useAuth } from "../utils/contexts/AuthContext";
import ActiveLink from "./wrapper/ActiveLink";
import { CloseSidebar } from "./general/icons";
import Show from "./wrapper/Show";

const Sidebar = () => {
  const { navIsOpen, setNavIsOpen, currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <nav
        className={`${
          navIsOpen === true ? "translate-x-0" : "-translate-x-full"
        } sidebar`}
      >
        <div className="flex flex-col text-2xl h-full justify-between w-max">
          <div className="flex flex-col space-y-4">
            <ActiveLink
              href="/"
              className="text-underline"
              activeClassname="py-1 w-max"
            >
              HOME
            </ActiveLink>
            <ActiveLink
              href="/cart"
              className="text-underline"
              activeClassname="py-1 w-max"
            >
              CART
            </ActiveLink>
            <ActiveLink
              href="/profile"
              className="text-underline"
              activeClassname="py-1 w-max"
            >
              PROFILE
            </ActiveLink>
          </div>

          <Show when={!currentUser}>
            <div className="flex flex-col space-y-4">
              <Link href="/login">
                <a className="nav-icons hover:text-teal-500">LOGIN</a>
              </Link>
              <Link href="/signup">
                <a className="nav-icons hover:text-teal-500">SIGN UP</a>
              </Link>
            </div>
          </Show>
          <Show when={currentUser}>
            <button
              onClick={handleLogout}
              className="nav-icons hover:text-teal-500"
            >
              LOGOUT
            </button>
          </Show>
        </div>

        {/* SIDEBAR CLOSE BTN */}
        <button
          className="absolute top-4 right-4 btn-scale"
          onClick={() => setNavIsOpen(false)}
        >
          <CloseSidebar />
        </button>
      </nav>

      {/* OVERLAY */}
      <Show when={navIsOpen}>
        <div
          onClick={() => setNavIsOpen(false)}
          className="fixed z-20 inset-0 w-full h-full bg-slate-900 600 opacity-30 md:hidden"
        ></div>
      </Show>
    </>
  );
};

export default Sidebar;
