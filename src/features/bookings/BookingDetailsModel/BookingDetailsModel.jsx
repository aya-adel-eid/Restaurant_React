import style from "./BookingDetailsModel.module.css";
export function BookingDetailsModel({
  onClose,
  onConfirm,
  booking,
  onCancel,
  formatDate,
  statusStyles,
  flag,
  isConfirmPending = false,
  isCancelPending = false,
}) {
  return (
    <>
      {booking && flag ? (
        <div className=" w-full  px-2 bg-black/50 flex justify-center items-center fixed inset-0 z-50">
          <div className="bg-white p-8 rounded-2xl lg:w-2/4 w-full">
            {/* header */}
            <div className="flex justify-between items-center py-3">
              <div>
                <h3 className="text-lg lg:text-xl font-bold">
                  Booking Details
                </h3>
                <span className="text-gray-400 font-semibold">
                  #{booking._id.slice(-6)}
                </span>
              </div>
              <button onClick={onClose} className="cursor-pointer">
                <i className="fa-solid fa-xmark text-xl text-gray-500"></i>
              </button>
            </div>
            {/* status */}
            <div
              className={` font-bold px-4 py-1.5  rounded-3xl w-fit ${statusStyles[booking.status.toUpperCase()]} `}
            >
              <span></span>
              <span> {booking.status}</span>
            </div>
            {/* info */}
            <div className="py-3 flex flex-col gap-3">
              <div className="flex justify-between border-b border-gray-200 py-2 px-1">
                <h5 className="  flex gap-1.5 items-center">
                  <span>
                    <i className="fa-solid fa-user text-main-600"></i>
                  </span>
                  <span className="text-gray-500">Name</span>
                </h5>
                <h5 className="font-medium">{booking.user.name}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-0.5 px-1">
                <h5 className="  flex gap-1.5 items-center">
                  <span>
                    <i className="fa-solid fa-phone text-main-600"></i>
                  </span>
                  <span className="text-gray-500">Phone</span>
                </h5>
                <h5 className="font-medium">{booking.phone}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-0.5 px-1">
                <h5 className="  flex gap-1.5 items-center">
                  <span>
                    <i className="fa-solid fa-calendar text-main-600"></i>
                  </span>
                  <span className="text-gray-500">Date</span>
                </h5>
                <h5 className="font-medium">{formatDate(booking.date)}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-0.5 px-1">
                <h5 className="  flex gap-1.5 items-center">
                  <span>
                    <i className="fa-solid fa-clock text-main-600"></i>
                  </span>
                  <span className="text-gray-500">Time</span>
                </h5>
                <h5 className="font-medium">{booking.time}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-0.5 px-1">
                <h5 className="  flex gap-1.5 items-center">
                  <span>
                    <i className="fa-solid fa-users text-main-600"></i>
                  </span>
                  <span className="text-gray-500">Persons</span>
                </h5>
                <h5 className="font-medium">{booking.persons}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-0.5 px-1">
                <h5 className="  flex gap-1.5 items-center">
                  <span>
                    <i className="fa-solid fa-envelope text-main-600"></i>
                  </span>
                  <span className="text-gray-500">Email</span>
                </h5>
                <h5 className="font-medium">{booking.user.email}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-0.5 px-1">
                <h5 className="  flex gap-1.5 items-center">
                  <span>
                    <i className="fa-solid fa-arrow-rotate-right text-main-600"></i>
                  </span>
                  <span className="text-gray-500">Updated</span>
                </h5>
                <h5 className="font-medium">{formatDate(booking.updatedAt)}</h5>
              </div>
            </div>
            {/* actions */}
            <div className="flex justify-between items-center py-3 gap-3">
              <button
                className="px-4 py-0.5 rounded-2xl bg-green-600 w-full justify-center cursor-pointer
             text-white disabled:bg-gray-600/50 flex  items-center gap-1.5 "
                disabled={
                  booking.status === "cancelled" ||
                  isConfirmPending ||
                  isCancelPending
                }
                onClick={() => onConfirm(booking._id)}
              >
                <span>
                  {isConfirmPending ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-regular fa-circle-check"></i>
                  )}
                </span>
                <span>{isConfirmPending ? "Confirming..." : "Confirm"}</span>
              </button>
              <button
                className="px-4 py-0.5 rounded-2xl bg-red-600 w-full justify-center cursor-pointer
             text-white disabled:bg-red-600/50 flex  items-center gap-1.5 "
                disabled={
                  booking.status === "cancelled" ||
                  isCancelPending ||
                  isConfirmPending
                }
                onClick={() => onCancel(booking._id)}
              >
                <span>
                  {isCancelPending ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-regular fa-circle-xmark"></i>
                  )}
                </span>
                <span>{isCancelPending ? "Cancelling..." : "Cancel"}</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
