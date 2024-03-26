import { useCheckout } from "@lib/context/checkout-context"

export default function YourDetail() {
  const { register } = useCheckout()

  return (
    <>
      <div className="w-full flex flex-col items-start gap-5">
        <h1 className="font-bold text-primary-700 text-[25px] font-WildMango">
          Your Details
        </h1>

        <div className="w-full grid grid-cols-1 lg:grid-cols-4 place-items-stretch items-center gap-x-5 gap-y-8 ">
          <div>
            <label
              htmlFor="email"
              className="w-1/4 uppercase text-primary-700 text-sm font-bold "
            >
              Email
              <span className="text-red-500 text-lg ml-0.5   ">*</span>
            </label>
          </div>
          <div className="col-span-3 flex flex-col items-start flex-1 relative">
            <input
              type="email"
              className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="Enter your email address"
            />
            <span className="absolute left-0 -bottom-5 text-xs">
              You can create an account after checkout
            </span>
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="w-1/4 uppercase text-primary-700 text-sm font-bold "
            >
              First Name
              <span className="text-red-500 text-lg ml-0.5   ">*</span>
            </label>
          </div>
          <div className="w-full flex flex-col items-start flex-1 relative">
            <input
              type="firstName"
              className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
              {...register("shipping_address.first_name", {
                required: {
                  value: true,
                  message: "First Name is required",
                },
              })}
              placeholder="Enter First Name"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="w-1/4 uppercase text-primary-700 text-sm font-bold "
            >
              Last Name
              <span className="text-red-500 text-lg ml-0.5   ">*</span>
            </label>
          </div>
          <div className="w-full flex flex-col items-start flex-1 relative">
            <input
              type="lastName"
              className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
              {...register("shipping_address.last_name", {
                required: {
                  value: true,
                  message: "Last Name is required",
                },
              })}
              placeholder="Enter Last Name"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="w-1/4 uppercase text-primary-700 text-sm font-bold "
            >
              Mobile Number
              <span className="text-red-500 text-lg ml-0.5   ">*</span>
            </label>
          </div>
          <div className="w-full col-span-1 flex flex-col items-start flex-1 relative">
            <input
              type="phone"
              className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
              {...register("shipping_address.phone", {
                required: {
                  value: true,
                  message: "Mobile Number is required",
                },
              })}
              placeholder="Enter Mobile Number"
            />
          </div>

          <div className="row-start-4">
            <label
              htmlFor="phone"
              className="w-1/4 uppercase text-primary-700 text-sm font-bold "
            >
              BILLING ADDRESS
              <span className="text-red-500 text-lg  ml-0.5 ">*</span>
            </label>
          </div>
          <div className="w-full row-start-4 col-span-3 flex flex-col items-start flex-1 relative">
            <input
              type="phone"
              className="w-full bg-white px-2 py-3 border border-primary-700 text-black text-sm rounded-md font-medium"
              {...register("billing_address.address_1")}
              placeholder="Start Typing Your Address Or Postcode"
            />
          </div>
        </div>
      </div>
    </>
  )
}
