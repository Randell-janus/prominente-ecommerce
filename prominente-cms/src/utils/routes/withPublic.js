import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const withPublic = (Component) => {
  return function WithPublic(props) {
    const auth = useAuth();
    const router = useRouter();

    if (auth.currentUser && auth.isValidated) {
      router.replace("/dashboard/products");
      return <div></div>;
    }

    return <Component authContext={auth} {...props} />;
  };
};

export default withPublic;
