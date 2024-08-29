import axios from "axios";
import Card from "./components/card";
import Link from "next/link";
import { api, routes } from "./routes/routes";

export default async function Home() {
  const response = await axios.get(`${api.API_URL}${routes.Products}`);
  const data = response.data;

  return (
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-6 sm:my-8 md:my-10 lg:my-12">
        PRODUCTS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item: any) => (
          <Link href={`products/${item.id}`} key={item.id}>
              <Card productName={item.productName} price={item.price} />
          </Link>
        ))}
      </div>
    </div>
  );
}
