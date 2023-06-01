import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const  AlredyLoggedInProtectRoute = ({ children }) => {

  const { isLoading, isSeller } = useSelector((state) => state.seller);
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (isSeller) {
      return <Navigate to={`/dashboard`} replace />;
    }
    return children;
  }
};

export default AlredyLoggedInProtectRoute;
