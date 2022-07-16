import Link from "next/link";

const Logo = ({ className }) => {
  return (
    <Link href="/">
      <a className={className}>
        <div className="flex items-center space-x-1 justify-center">
          <p className="text-lg md:text-xl tracking-wider md:tracking-widest font-extrabold italic">
            PROMINENTE
          </p>
        </div>
        <p className="text-[0.65rem] leading-3 md:text-xs font-medium tracking-tighter">
          ALUMINUM & GLASS SUPPLY
        </p>
      </a>
    </Link>
  );
};

export default Logo;
