import { useEffect } from "react";
import "./orderStyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetOrderDataFromDB,
  orderSelector,
} from "../../redux/reducers/orderReducer";
import Spinner from "react-spinner-material";

function Order() {
  const { order, isLoading } = useSelector(orderSelector);
  const dispatch = useDispatch();

  // Use useEffect to dispatch the action to get order data when the component mounts
  useEffect(() => {
    dispatch(asyncGetOrderDataFromDB());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner radius={120} color={"#333"} stroke={4} visible={true} />
        </div>
      ) : (
        <div className="order-container">
          {order.length ? (
            <>
              <h1 className="order-header-container">Your Order</h1>
              {order.map((order, index) => (
                <div className="order-details-container" key={index}>
                  <h2>Ordered On:- {order.date}</h2>
                  <table>
                    <thead>
                      <tr>
                        <th className="title-container">Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.itemOrdered.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.qty}</td>
                          <td>{item.price * item.qty}</td>
                        </tr>
                      ))}

                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="total-price-container">
                          {order.totalPrice}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </>
          ) : (
            <div className="noDataFound-container">
              <p>No Order Found!</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Order;
