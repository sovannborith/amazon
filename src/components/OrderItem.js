import moment from "moment";

function OrderItem({
  id,
  amount,
  amountShipping,
  amountTotal,
  items,
  images,
  timestamp,
}) {
  return (
    <div className="relative border rounded-md bg-white">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD-MMM-YYYY")}</p>
        </div>
        <div className="">
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            {amount}$ - Next Day Delivery {amountShipping}$
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {images?.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images?.map((image, i) => (
            <img
              src={image}
              alt=""
              loading="lazy"
              className="h-20 object-contain sm:h-32"
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
