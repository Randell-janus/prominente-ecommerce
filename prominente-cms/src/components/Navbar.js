import { useProducts } from "../utils/contexts/productsContext";
import { useAuth } from "../utils/contexts/AuthContext";
import ActiveLink from "./wrapper/ActiveLink";
import { Hamburger } from "./reusable/icons";
import Logo from "./Logo";

const Navbar = () => {
  const { setNavIsOpen } = useProducts();
  const { logout } = useAuth();

  const handleLogout = async () => await logout();

  return (
    <nav className="bg-white shadow">
      <div className="flex items-center justify-between h-20 sm:h-24 page-width-container">
        <Logo className="" />

        <button onClick={() => setNavIsOpen(true)} className="lg:hidden">
          <Hamburger />
        </button>
        <div className="space-x-12 hidden lg:flex items-center min-h-full">
          <ActiveLink href="/dashboard/users" className="">
            Users
          </ActiveLink>
          <ActiveLink href="/dashboard" className="">
            Orders
          </ActiveLink>
          <ActiveLink href="/dashboard/products" className="">
            Products
          </ActiveLink>
          <ActiveLink href="/dashboard/sales" className="">
            Sales
          </ActiveLink>
          <button
            onClick={handleLogout}
            className="border rounded-md px-4 py-2 hover:bg-teal-400 hover:border-transparent hover:text-white transition-all"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
