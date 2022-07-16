import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const withPrivate = (Component) => {
  return function WithPrivate(props) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.currentUser && !auth.isValidated) {
      router.replace("/");
      return <div></div>;
    }

    return <Component authContext={auth} {...props} />;
  };
};

export default withPrivate;
