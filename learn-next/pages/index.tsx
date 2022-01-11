import type { InferGetStaticPropsType } from "next";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
}

const Home = ({
  allDataProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [products, setProducts] = useState(allDataProducts);

  return (
    <>
      <div className="container">
        <h1 className="text-3xl font-medium mt-[64px] ">All Products</h1>
        <div className="grid grid-cols-4 gap-5 mt-[64px]">
          {products.map((item: Product) => (
            <div
              key={item.id}
              className="flex-1 bg-white border-[1px] border-[#DFDFDF] hover:shadow-xl p-4 rounded-3xl hover:border-black hover:border-[1px] transition duration-300 relative"
            >
              <div className="flex items-center ">
                <img className="rounded-xl" src={item.img} alt="" />
              </div>
              <h2 className="text-xl font-medium mt-[20px] text-colorParagraph">
                {item.title}
              </h2>
              <p className="text-base mt-[20px] text-colorParagraph">
                price :
                <span className="font-medium text-red-400"> ${item.price}</span>
              </p>
              <p className="text-[14px] mt-[20px] text-gray-500 ">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://api-products-server.herokuapp.com/products");
  const allDataProducts = await res.json();
  return {
    props: {
      allDataProducts,
    },
  };
};

export default Home;
