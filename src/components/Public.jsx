import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../Features/Products/productApiSlice";

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <a href="#" className="text-white text-2xl font-bold">
        RetailStore
      </a>
      <ul className="flex gap-4">
        <li>
          <Link to="/login" className="link">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="link">
            Register
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

const HeroSection = () => {
  return (
    <div className="bg-blue-500 text-white text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to RetailStore</h1>
      <p className="text-lg mb-8">
        Discover a world of quality products for every need.
      </p>
      <Link
        to="/catalogue"
        className="bg-white text-blue-500 py-2 px-6 rounded-full hover:bg-blue-400"
      >
        Shop Now
      </Link>
    </div>
  );
};

const FeaturedProducts = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery("productList", {
    pollingInterval: 20000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) {
    content = (
      <span className="loading loading-spinner loading-lg text-primary"></span>
    );
  }

  if (isError) {
    console.log(error);
    content = <div>{error?.data.message}</div>;
  }

  if (isSuccess) {
    const { ids } = products;

    content = ids.map((id) => {
      return (
        <ProductListItem key={id} productId={id} />
      );
    });
  }
  return (
  <div className="container mx-auto mt-8 p-4">
    <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {content}
        </div>
  </div>)
};

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4 text-center">
    <p>&copy; 2024 RetailStore. All rights reserved.</p>
  </footer>
);

const Public = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1">
      <HeroSection />
      <FeaturedProducts />
    </div>
    <Footer />
  </div>
);

const ProductListItem = ({ productId }) => {
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
          <h3 className="mt-4 text-sm">{product.title}</h3>
        </div>
      </div>
    );
  } else {
    return null;
  }
};



export default Public;
