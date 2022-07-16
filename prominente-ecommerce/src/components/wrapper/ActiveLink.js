import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../../utils/contexts/AuthContext";

const ActiveLink = ({ href, children, className, activeClassname }) => {
  const router = useRouter();
  const { setNavIsOpen } = useAuth();

  return (
    <Link href={href}>
      <a
        onClick={() => setNavIsOpen(false)}
        className={
          router.pathname == href
            ? `active-nav ${activeClassname}`
            : `${className} nav-icons`
        }
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
