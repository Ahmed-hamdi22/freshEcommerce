import { useState } from "react";

export default function CartProduct({
  product,
  removeItemFromCart,
  updateProductCount,
}) {
  let [count, setCount] = useState(product.count);

  return (
    <div className="mt-5 bg-white shadow-sm p-4 rounded">
      <div className="grid grid-cols-12 items-center border-b pb-3">
        {/* صورة المنتج */}
        <div className="col-span-12 md:col-span-2 text-center">
          <img
            src={product.product.imageCover}
            alt=""
            className="w-24 mx-auto"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="col-span-8 md:col-span-7 ps-4">
          <p className="font-semibold">{product.product.category.name}</p>
          <p className="font-semibold">Unit Price: {product.price} EGP</p>
          <p className="font-semibold text-green-600">
            Total: {product.price * count} EGP
          </p>
          <button
            onClick={() => removeItemFromCart(product.product._id)}
            className="text-red-600 mt-2 hover:border hover:border-red-600 px-2 py-1 rounded transition-all"
          >
            <i className="fa fa-trash me-1"></i> Remove
          </button>
        </div>

        {/* التحكم في الكمية */}
        <div className="col-span-4 md:col-span-3 flex justify-end items-center gap-3">
          <button
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
                updateProductCount(product.product._id, count - 1);
              }
            }}
            className="border border-green-600 px-3 py-1 rounded"
          >
            -
          </button>
          <p>{count}</p>
          <button
            onClick={() => {
              setCount(count + 1);
              updateProductCount(product.product._id, count + 1);
            }}
            className="border border-green-600 px-3 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
