"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sanityClient } from "../../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";



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

const builder = imageUrlBuilder(sanityClient);
function urlFor(source:any) {
  return builder.image(source);
}


const Carddetails = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await sanityClient.fetch(
          `*[_types == product && id == $id][0]`, 
          { id: params.id }
         
        );
       
        console.log("Fetched product data:", productData);

        if (productData) {
          const product: Product = {
            id: productData.id,
            title:productData.title,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image,
            category: productData.category,
            rating: productData.rating,
          };
          setProduct(product);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <div className="text-center text-xl py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg py-10">{error}</div>;

  const handleAddToCart = () => {
    if (product) {
      const productWithNumberId:Product = { ...product, id: Number(product.id) };
      addToCart(productWithNumberId);
      toast.success("Product added to cart!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 flex flex-col lg:flex-row justify-center h-screen items-center gap-12">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-80 h-80 shadow-xl">
           <Image
                        src={product?.image ? urlFor(product.image).url(): "/no-image.jpg"} // Fallback image
                        alt={product?.name ?? "No name available"}
                        width={500}
                        height={500}
                        className="object-cover rounded-md w-full h-[200px]"
                      />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product?.name}</h1>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {product?.description}
          </p>
          <p className="text-2xl font-semibold text-blue-500 mb-6">
            ${product?.price}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-blue-700 border-t-2 via-blue-500 to-blue-300 border-b text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Carddetails;
