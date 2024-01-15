import { useEffect } from "react";
import { useSendLogoutMutation } from "../../Features/Auth/authApiSlice";
import { useNavigate,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../Features/Auth/authSlice";

const CatalogueHeader = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const logout = async () => {
    try {
      await sendLogout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">RetailerShop</a>
      </div>
      {isLoggedIn ?(
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <FontAwesomeIcon icon={faCartShopping} size="xl" />
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <FontAwesomeIcon icon={faUser} size="xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <button onClick={logout}>
                  <div className="flex justify-between">
                    <div>Logout</div>
                    <div>
                      {isLoading && (
                        <span className="loading loading-spinner loading-sm"></span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>) : (
          <Link to="/login" className="btn btn-ghost text-xl">Login</Link>
        )
      }
    </div>
  );
};

export default CatalogueHeader;
