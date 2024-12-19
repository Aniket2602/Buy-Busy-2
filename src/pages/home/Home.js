import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-spinner-material";
import { toast } from "react-toastify";
import "./homeStyle.css";
import {
  asyncGetProductDataFromDB,
  productseActions,
  productsSelector,
} from "../../redux/reducers/productsReducer";
import { authSelector } from "../../redux/reducers/authenticationReducer";
import {
  asyncAddProductsToCart,
  asyncIncreaseQtyOfProduct,
  cartSelector,
} from "../../redux/reducers/cartReducer";

function Home() {
  const [submittingProduct, setSubmittingProduct] = useState(null);
  const { user, isLoggedIn } = useSelector(authSelector);
  const { productsInCart } = useSelector(cartSelector);
  const { filterProducts, maxPriceRange, isLoading } =
    useSelector(productsSelector);
  const dispatch = useDispatch();

  // Fetch all products from the database when the component is mounted
  useEffect(() => {
    dispatch(asyncGetProductDataFromDB());
  }, [dispatch]);

  // Handle search input changes and update the filtered product list
  const handleSearch = (searchText) => {
    dispatch(productseActions.setSearchTerm(searchText));
    dispatch(productseActions.setFilterSearch());
  };

  // Update the product list based on the selected maximum price range
  const handlePriceChange = (maxPrice) => {
    dispatch(productseActions.setMaxPriceRange(maxPrice));
    dispatch(productseActions.setFilterSearch());
  };

  // Handle changes to selected categories and filter the products accordingly
  const handleCategoriesChange = (category) => {
    dispatch(productseActions.setSelectedCategories(category));
    dispatch(productseActions.setFilterSearch());
  };

  // Add a product to the cart or increase its quantity if already in the cart
  const addProductToCart = async (userId, name, price, imageUrl) => {
    try {
      setSubmittingProduct(name);
      const index = productsInCart.findIndex(
        (product) => product.name === name
      );
      if (index === -1) {
        // Add product to cart if it doesn't exist
        await dispatch(
          asyncAddProductsToCart({ userId, name, price, imageUrl })
        );
        toast.success("Item added to cart!");
      } else {
        // Increase quantity if product is already in the cart
        await dispatch(asyncIncreaseQtyOfProduct(productsInCart[index]));
        toast.success("Quantity of item increased successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setSubmittingProduct(null);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner radius={120} color={"#333"} stroke={4} visible={true} />
        </div>
      ) : (
        <>
          <div className="home-container">
            {/* Search Bar Section */}
            <div className="search-bar-wrapper">
              <input
                type="text"
                placeholder="Search for Product by Name"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Aside Section (Filter Section) */}
            <aside className="product-filter-container">
              <form>
                <div className="range-input-container">
                  <h3 className="filter-heading-styling">Filter</h3>
                  <label htmlFor="price">Price: {maxPriceRange}</label>
                  <input
                    type="range"
                    id="price"
                    name="price"
                    min={1}
                    max={100000}
                    value={maxPriceRange}
                    onChange={(e) => handlePriceChange(e.target.value)}
                  />
                </div>
                <hr />
                <div className="category-input-section">
                  <h3 className="filter-heading-styling">Category</h3>
                  <div>
                    <input
                      type="checkbox"
                      id="Men's Clothing"
                      name="Men's Clothing"
                      onChange={() => handleCategoriesChange("Men's Clothing")}
                    />
                    <label htmlFor="Men's Clothing">Men's Clothing</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Women's Clothing"
                      name="Women's Clothing"
                      onChange={() =>
                        handleCategoriesChange("Women's Clothing")
                      }
                    />
                    <label htmlFor="Women's Clothing">Women's Clothing</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Jewelery"
                      name="Jewelery"
                      onChange={() => handleCategoriesChange("Jewelery")}
                    />
                    <label htmlFor="Jewelery">Jewelery</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Electronics"
                      name="Electronics"
                      onChange={() => handleCategoriesChange("Electronics")}
                    />
                    <label htmlFor="Electronics">Electronics</label>
                  </div>
                </div>
              </form>
            </aside>

            {/* Main Section (Product List Section) */}
            <main className="product-list-container">
              {filterProducts.length && !isLoading ? (
                filterProducts.map((product, index) => (
                  <div className="product-card" key={index}>
                    <div className="card-img-wrapper">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="card-details-wrapper">
                      <span className="span-title-styling">{product.name}</span>
                      <span className="span-price-styling">
                        &#8377; {product.price}
                      </span>
                    </div>
                    <button
                      onClick={
                        isLoggedIn
                          ? () =>
                              addProductToCart(
                                user.id,
                                product.name,
                                product.price,
                                product.imageUrl
                              )
                          : null
                      }
                    >
                      {submittingProduct === product.name
                        ? "Adding..."
                        : " Add to Cart"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="noDataFound-container">
                  <p>No product found....</p>
                </div>
              )}
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
