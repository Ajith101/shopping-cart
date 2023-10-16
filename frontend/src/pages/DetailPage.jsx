import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAppStore } from "../../store/appStore";

const DetailPage = () => {
  const navigate = useNavigate();
  const { addCart } = useAppStore();
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();

  const getSingleProduct = async () => {
    try {
      const { data, status } = await axios(
        `https://ecommerce-backend-new.vercel.app/api/products/${id}`
      );
      setSingleProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleProduct();
    }
  }, [id]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <div className="py-[25px] w-full md:w-[90%] mx-auto rounded-xl bg-white px-2 flex h-fit flex-col gap-[60px] md:flex-row">
          <>
            {singleProduct ? (
              <>
                <div className="flex h-[320px] w-full items-center justify-center md:h-[550px] md:w-[450px]">
                  <img
                    src={singleProduct?.image}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </div>
                <div className="flex w-full flex-col gap-[20px] lg:w-[50%]">
                  <div className="flex flex-col gap-[5px]">
                    <h2 className="text-[16px] text-slate-400">
                      {singleProduct?.category}
                    </h2>
                    <h2 className="text-[22px] font-[700] sm:text-[32px]">
                      {singleProduct?.title}
                    </h2>
                  </div>
                  <div>
                    <h2 className="text-[16px] font-[600]">
                      {"₹  "}
                      <span className="text-red-500">
                        {Math.ceil(singleProduct?.price * 81)}
                      </span>
                    </h2>
                    <h2 className="text-[16px] font-[400]">
                      Rating {": "}
                      <span className="font-[700]">
                        {singleProduct?.rating?.rate}
                      </span>
                    </h2>
                  </div>
                  <h2 className="text-[16px] font-[400] text-slate-500">
                    {singleProduct?.description}
                  </h2>
                  <h2 className="text-[16px] font-[400]">
                    Quantity :{" "}
                    <span className="font-[700]">
                      {singleProduct?.rating?.count} nos
                    </span>
                  </h2>
                  <div className="flex items-center justify-start gap-2 md:gap-5">
                    <button className="cursor-pointer rounded-[4px] bg-sky-600 px-[30px] py-[10px] font-[600] text-white hover:opacity-80 lg:px-[60px]">
                      Buy Now
                    </button>
                    <button
                      onClick={() => addCart(singleProduct, navigate)}
                      className="cursor-pointer rounded-[4px] bg-teal-600 px-[60px] py-[10px] font-[600] text-white hover:opacity-80"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center text-[22px]">
                No Itemes Found
              </div>
            )}
          </>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;
