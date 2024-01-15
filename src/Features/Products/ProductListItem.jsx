import { useGetProductsQuery } from "./productApiSlice";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../Auth/authSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductListItem = ({ productId }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product } = useGetProductsQuery("productList", {
    selectFromResult: ({ data }) => ({
      product: data.entities[productId],
    }),
  });
  console.log(product);
  if (product) {
    return (
      <div className="p-4 card shadow-xl border-[0.01px] border-[#eeeeee] dark:border-[#2e2e2e]">
        <div className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={product.thumbnail}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm">{product.title.slice(0, 30)}...</h3>
          {isLoggedIn ? (
            <div className="flex mt-2 justify-between">
              <p className="text-lg font-medium border p-2 rounded-md">
                ₹{product.price}
              </p>
              <button className="bg-primary p-2 rounded-md text-lg text-primary-content px-4">
                Buy
              </button>
            </div>
          ) : (
            <div className="mt-2">
              <Link to="/login" className="btn btn-primary btn-sm">
                Login to see details
              </Link>
            </div>
          )}
          <div className="flex flex-col just flex-wrap gap-4 mt-4">
            <p>
              <span>
                {" "}
                <FontAwesomeIcon icon={faStar} size="sm" /> {product.rating}
              </span>{" "}
              <span className="text-blue-500 hover:underline">{`(${product.reviews})`}</span>
            </p>
            <div className="flex justify-between items-center">
            <p className="border px-2 py-1 rounded-xl">{product.category}</p>
            <p>{product.quantity} in stock</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductListItem;
