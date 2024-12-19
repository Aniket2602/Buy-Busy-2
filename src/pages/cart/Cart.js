import { useDispatch, useSelector } from "react-redux";
import "./cartStyle.css";
import {
  asyncDecreaseQtyOfProduct,
  asyncGetCartDataFromDB,
  asyncIncreaseQtyOfProduct,
  asyncRemoveAllProducts,
  asyncRemoveProductFromCart,
  cartSelector,
} from "../../redux/reducers/cartReducer";
import { asyncPurchaseItems } from "../../redux/reducers/orderReducer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "react-spinner-material";
import { useNavigate, useParams } from "react-router-dom";

function Cart() {
  const [isPurchase, setIsPurchase] = useState(false);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productsInCart, isLoading, totalPrice } = useSelector(cartSelector);

  // Fetch cart data when the component mounts
  useEffect(() => {
    dispatch(asyncGetCartDataFromDB());
  }, [dispatch]);

  // Function to increase the quantity of a product in the cart
  const handleIncreaseQty = (productData) => {
    try {
      dispatch(asyncIncreaseQtyOfProduct(productData));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Function to decrease the quantity of a product in the cart
  const handleDecreaseQty = (productData) => {
    try {
      const index = productsInCart.findIndex(
        (product) => product.id === productData.id
      );
      dispatch(asyncDecreaseQtyOfProduct(productData));
      if (productsInCart[index].qty === 1) {
        dispatch(asyncRemoveProductFromCart(productData.id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Function to handle product removal from the cart
  const handleRemoveFromCart = (productId) => {
    try {
      dispatch(asyncRemoveProductFromCart(productId));
      toast.success("Item removed from cart.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Function to handle the purchase of items in the cart
  const handleOrderItems = async (cartData) => {
    try {
      setIsPurchase(true);
      await dispatch(asyncPurchaseItems({ cartData, userId }));
      await dispatch(asyncRemoveAllProducts(productsInCart));
      toast.success("Order placed successfully! Check your purchase.");
      navigate(`/usersorder/${userId}/myorder`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsPurchase(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner radius={120} color={"#333"} stroke={4} visible={true} />
        </div>
      ) : (
        <div className="cart-container">
          {productsInCart.length ? (
            <>
              {/* Aside Section */}
              <aside className="product-total-container">
                <h3 className="filter-heading-styling">
                  Total Price:- &#8377;{totalPrice}/-
                </h3>
                <button
                  disabled={isPurchase}
                  onClick={() => handleOrderItems(productsInCart)}
                >
                  {isPurchase ? "Purchasing" : "Purchase"}
                </button>
              </aside>

              {/* Main Section (Product List Section) */}
              <main className="cart-list-container">
                {productsInCart.map((product, index) => (
                  <div className="cart-item-card" key={index}>
                    <div className="card-img-wrapper">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="card-details-wrapper">
                      <span className="span-title-styling">{product.name}</span>
                      <div className="product-details-container">
                        <span className="span-price-styling">
                          &#8377; {product.price}
                        </span>
                        <div className="product-quantity-container">
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/561/561179.png"
                            alt="Minus Logo"
                            onClick={() => handleDecreaseQty(product)}
                          />
                          <span>{product.qty}</span>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/561/561169.png"
                            alt="Plus Logo"
                            onClick={() => handleIncreaseQty(product)}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className="remove-cart-button"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      Remove From Cart
                    </button>
                  </div>
                ))}
              </main>
            </>
          ) : (
            <div className="noDataFound-container">
              <p>Your BuyBusy Cart is Empty!</p>
              <p className="subtitle">Shop today’s deals</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
