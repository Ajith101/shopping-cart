import React, { useEffect } from "react";
import Layout from "./../layout/Layout";
import CartCard from "../components/CartCard";
import { useAppStore } from "../../store/appStore";
import { useNavigate } from "react-router-dom";
import { PiSmileySadFill } from "react-icons/pi";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, getUserCart, user } = useAppStore();
  const displaycart = cart?.map((itemes, id) => {
    return <CartCard item={itemes} key={id} />;
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    getUserCart();
  }, []);

  let initialValue = 0;
  let total = Math.ceil(
    cart?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      initialValue
    ) * 81
  );

  return (
    <Layout>
      <div className="flex min-h-screen w-full flex-col py-5 gap-5 md:flex-row lg:p-[60px]">
        <div className="w-full text-slate-600 md:w-[70%] shadow-md border-[1px] bg-white p-2 rounded-lg">
          <div className="my-[40px] flex flex-col rounded-[4px] bg-slate-100  md:p-[15px]">
            <h2 className="text-[18px] font-[700]">Your Cart</h2>
            <h3>Total Itemes : {cart?.length} </h3>
          </div>
          <div className="flex flex-col gap-3 lg:ml-[120px]">{displaycart}</div>
          {!cart?.length && (
            <div className="flex flex-col justify-center items-center">
              <p className="text-[24px] text-black font-bold">cart is empty</p>{" "}
              <br />
              <PiSmileySadFill size={35} color="black" />
            </div>
          )}
        </div>
        {cart?.length ? (
          <div className="my-[40px] flex w-full flex-col md:w-[30%] md:p-[8px]">
            <div className="rounded-[4px] shadow-lg">
              <div className="flex flex-col rounded-[4px] bg-slate-200 p-[15px]">
                <h2 className="text-[18px] font-[700]">You Pay</h2>
                <h3>Check Our order Policy</h3>
              </div>
              <div className="rounded-[4px] bg-slate-600 p-[15px] text-white">
                You Can Pay .... on This Order
              </div>
              <div className="flex flex-col gap-[8px] rounded-[4px] bg-slate-50 p-[15px]">
                <h2 className="border-b-[1px] py-[4px] text-[18px] font-[700]">
                  Total Price {"₹"} {total}
                </h2>
                <h3 className="border-b-[1px] py-[4px]">
                  Distributor Price -20
                </h3>
                <h3 className="border-b-[1px] py-[4px]">Discount 40</h3>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Cart;
