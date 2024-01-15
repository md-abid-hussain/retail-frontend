import { useGetProductsQuery } from "./productApiSlice";
import ProductListItem from "./ProductListItem";

function ProductList() {
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
    //   const product = entities[id];
      //   return (
      //     <div key={id} className="card bordered shadow-lg">
      //       <div className="card-body">
      //         <h2 className="card-title">{product.title}</h2>
      //         <p>{product.description}</p>
      //       </div>
      //     </div>
      //   )
      return (
        <ProductListItem key={id} productId={id} />
      );
    });
  }

  return (
    <div className="">
      <div className="mx-auto max-w-3xl lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {content}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
