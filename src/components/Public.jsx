import { Link } from "react-router-dom";
const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <a href="#" className="text-white text-2xl font-bold">
        RetailStore
      </a>
      <ul className="flex gap-4">
        <li>
          <Link to='/login' className="link">Login</Link>
        </li>
        <li>
          <Link to='/register'  className="link">Register</Link>
        </li>
      </ul>
    </div>
  </nav>
);

const HeroSection = () => (
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

const FeaturedProducts = () => (
  <div className="container mx-auto mt-8 p-4">
    <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
  </div>
);

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
export default Public;
