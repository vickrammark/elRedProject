import { useDispatch, useSelector } from "react-redux";
import classes from "./CartTable.module.css";
import NoProduct from "../../../../assets/NoProductItem.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { productActions } from "../../../../Store/productReducer";
import { MODAL_OPENED_BY } from "../../../../Constants/Constant.Js";
import { INITIATED_TABLE_BY } from "../../../../Constants/Constant.Js";
const CartTable = ({
  cartItems,
  changeHeader,
  setOpenModal,
  setChangeInitiatedFrom,
  edit,
  setOpenedModalBy
}) => {
  const dispatch = useDispatch();
  const deleteItem = (product) => {
    dispatch(productActions.deleteProductInCart({ ...product }));
  };
  if (cartItems.length === 0) {
    return <div className={classes.emptyContainer}>No Item added!!</div>;
  }
  return (
    <div
      className={`${classes.container} ${changeHeader ? classes.shrink : ""}`}
    >
      <table
        className={`${classes.tableContainer} ${
          changeHeader ? classes.pullContainerUp : ""
        }`}
      >
        <thead className={classes.tableHead}>
          <tr className={classes.tableHeader}>
            <th
              className={`${classes.tableHeaderItem} ${classes.tableProduct}`}
            >
              Products
            </th>
            <th
              className={`${classes.tableHeaderItem} ${classes.tableQuantity}`}
            >
              Quantity
            </th>
            <th className={`${classes.tableHeaderItem} ${classes.tablePrice}`}>
              Price
            </th>
            {changeHeader && (
              <th
                className={`${classes.editContainer}`}
                onClick={() => {
                  setOpenModal(true);
                  setChangeInitiatedFrom(INITIATED_TABLE_BY.FROM_TABLE);
                  setOpenedModalBy(MODAL_OPENED_BY.EDIT)
                  dispatch(
                    productActions.setSelectedTableItem({
                      selectedTableItem: cartItems[0],
                    })
                  );
                }}
              >
                Edit
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ color: " rgb(150, 21, 21)" }}
                />
              </th>
            )}
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {cartItems.map((item, index) => {
            return (
              <tr
                key={index}
                className={classes.dataRow}
                onClick={() => {
                  if (!edit) {
                    return;
                  }
                  setChangeInitiatedFrom("table");
                  dispatch(
                    productActions.setSelectedTableItem({
                      selectedTableItem: item,
                    })
                  );
                }}
              >
                <td className={classes.tableDataItemProduct}>
                  <div className={classes.productLableContainer}>
                    <div className={classes.productImageContainer}>
                      <img
                        src={
                          item.productDetail.productImages.length > 0
                            ? item.productDetail.productImages[0]
                            : NoProduct
                        }
                        alt={"Product Image"}
                        className={classes.image}
                      />
                    </div>
                    <div className={classes.productDetailContainer}>
                      <div className={classes.productName}>
                        {item.productDetail.itemDescription}
                      </div>
                      <div className={classes.productSaleDescription}>
                        {item.selectedVariant.saleDescription}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={classes.tableDataItem}>{item.quantity}</td>
                <td className={classes.tableDataItemPriceContainer}>
                  <div className={classes.priceContainer}>
                    <div className={classes.price}>
                      {item.productDetail.currency.symbol}
                      {item.price}
                    </div>
                    {!changeHeader && edit && (
                      <div
                        className={classes.closeContainer}
                        onClick={() => {
                          deleteItem(item);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faClose}
                          className={classes.faClose}
                        />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default CartTable;
