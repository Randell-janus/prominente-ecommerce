import Link from "next/link";
import { useRouter } from "next/router";
import { useProducts } from "../../utils/contexts/productsContext";

const ActiveLink = ({ href, children, className, activeClassname }) => {
  const { setNavIsOpen } = useProducts();
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        onClick={() => setNavIsOpen(false)}
        className={`${
          router.pathname == href
            ? `active-nav ${activeClassname}`
            : `${className} default-nav`
        } font-semibold border-b-4 py-9 border-transparent`}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
