import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const OauthCallback = ({ handleJWT }) => {

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token")

  useEffect(() => {
    if(token) {
      handleJWT(token);
    }
    navigate("/")

  }, [token, navigate, handleJWT]);

  return (
    <h1 className="text-center">Authentication...</h1>
  )
}
export default OauthCallback;