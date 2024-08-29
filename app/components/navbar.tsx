import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { routes } from "../routes/routes";

export default function NavBar() {
  return (
    <div className="px-8 h-[4.2rem]  flex justify-between items-center shadow-[0px_0.5px_2px_black]  max-1090:px-16 max-sm:px-3 bg-white text-black">
      <div className="w-36 min-w-36  h-[3rem] flex justify-start items-center ">
        <Link href="/">
          <h1 className="font-bold text-xl">E-Commerce</h1>
        </Link>
      </div>
      <div className="font-[400] text-[0.9rem] h-[3rem] flex  justify-between items-center mx-5 max-md:hidden">
        <div className="flex justify-center items-center gap-5">
          <Link href={`${routes.Products}/${routes.AddProducts}`}>
            <p className="cursor-pointer hover:text-blue-500 transition">
              Add Product
            </p>
          </Link>
          <Link href={`${routes.Products}/${routes.EditProducts}`}>
            <p className="cursor-pointer hover:text-blue-500 transition">
              Edit Product
            </p>
          </Link>
        </div>
      </div>
      <div className=" w-36  h-[3rem] flex  justify-end items-center gap-2">
        <Link href={routes.Cart}>
          <BsCart className="text-[1.3rem] cursor-pointer hover:text-blue-500 transition" />
        </Link>
      </div>
    </div>
  );
}
