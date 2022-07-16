import Show from "./wrapper/Show";
import { useProducts } from "../utils/contexts/productsContext";
import { useAuth } from "../utils/contexts/AuthContext";
import { XIcon } from "./reusable/icons";
import ActiveLink from "./wrapper/ActiveLink";
import Logo from "./Logo";

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const { navIsOpen, setNavIsOpen } = useProducts();

  const handleLogout = async () => await logout();

  return (
    <>
      <nav
        className={`${
          navIsOpen === true ? "translate-x-0" : "-translate-x-full"
        } sidebar`}
      >
        <div className="flex flex-col h-full justify-between w-full">
          <div className="flex flex-col w-max space-y-4">
            <Logo className="flex flex-col items-center" />
            <ActiveLink
              href="/dashboard/users"
              activeClassname="py-0 w-max"
              className="py-0"
            >
              Users
            </ActiveLink>
            <ActiveLink
              href="/dashboard"
              activeClassname="py-0 w-max"
              className="py-0"
            >
              Orders
            </ActiveLink>
            <ActiveLink
              href="/dashboard/products"
              activeClassname="py-0 w-max"
              className="py-0"
            >
              Products
            </ActiveLink>
            <ActiveLink
              href="/dashboard/sales"
              activeClassname="py-0 w-max"
              className="py-0"
            >
              Sales
            </ActiveLink>
          </div>
          <button
            onClick={handleLogout}
            className="border rounded-md px-4 py-2 hover:bg-teal-400 hover:border-transparent hover:text-white transition-all"
          >
            LOGOUT
          </button>
          {/* <div className="flex flex-col">
            <div>
              <h3>{currentUser && currentUser.uid}</h3>
            </div>
            <button onClick={handleLogout} className="btn-primary-filled">
              log out of account
            </button>
          </div> */}
        </div>

        {/* SIDEBAR CLOSE BTN */}
        <button
          className="absolute top-4 right-4 btn-scale"
          onClick={() => setNavIsOpen(false)}
        >
          <XIcon />
        </button>
      </nav>

      {/* OVERLAY */}
      <Show when={navIsOpen}>
        <div
          onClick={() => setNavIsOpen(false)}
          className="fixed z-20 inset-0 w-full h-full bg-slate-900 600 opacity-30 lg:hidden"
        ></div>
      </Show>
    </>
  );
};

export default Sidebar;
