'use client';
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { fetchProducts } from "../sanity/lib/client";
import { useEffect, useState } from "react";
 
const builder = imageUrlBuilder(sanityClient);
function urlFor(source:any) {
  return builder.image(source);
}

interface Product {
  id: number;
  title: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: any;
  rating: {
      rate: number;
      count: number;
  };// Update if specific image type is known
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      console.log("Products fetched:", data); // Debugging output
      setProducts(data);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <div
            key={product.id} // Handle missing id
            className="bg-white rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <Image
              src={product?.image ? urlFor(product.image).url(): "/no-image.jpg"} // Fallback image
              alt={product?.name ?? "No name available"}
              width={500}
              height={500}
              className="object-cover rounded-md w-full h-[200px]"
            />
            <h2 className="text-md font-bold text-gray-800 w-[250px] mt-4">
              {product.name} // Handle missing name
            </h2>
            <p className="text-gray-600 text-lg my-4 px-2">
              {product.description && product.description.length > 100
                ? `${product.description.slice(0, 60)}...`
                : product.description}
            </p>
            <p className="text-xl font-semibold text-green-600">
              ${product.price}  {/* Default price if missing */}
            </p>
            <p className="mt-2 text-gray-500 italic">
              Category: {product.category }  {/* Default category */}
            </p>
            <Link
              href={`./products/${product.id}`}
              className="px-4 py-2 bg-gradient-to-r from-blue-700 border-t-2 via-blue-500 to-blue-300 border-b text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;


  
