"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";


interface Products {
  id: number;
  image: string;
  title: string;
  description: string;
  price1: number;
  price2: number;
}

async function fetchProductById(id: string): Promise<Products> {
  const response = await fetch(`https://677d48094496848554c9e6f3.mockapi.io/test/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product. Status: ${response.status}`);
  }
  return await response.json();
}

function Carddetails({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<{ id: string } | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function resolveParams() {
      try {
        const resolvedParams = await paramsPromise;
        console.log("Resolved Params:", resolvedParams);
        setParams(resolvedParams);
      } catch (err) {
        setError("Failed to load params.");
        setLoading(false);
      }
    }
    resolveParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (params?.id) {
      const loadProduct = async () => {
        try {
          const data = await fetchProductById(params.id);
          console.log("Fetched Product:", data);
          setProduct(data);
        } catch (err) {
          setError("Failed to load product.");
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [params]);

  if (loading)
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error)
    return <div className="flex justify-center items-center h-screen">{error}</div>;

  const handleAddToCart = () => {

    if (product) {
      addToCart(product); // Pass the product object here
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Failed to add product to cart.");
    }
  };
  
  return (
    <>
    <Header/>
      <div className="container mx-auto p-6 flex flex-col lg:flex-row justify-center h-screen items-center gap-12">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-80 h-80 shadow-xl">
            <Image
              src={product?.image ?? ""}
              alt={product?.title ?? ""}
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product?.title}</h1>
          <p className="text-gray-600 mb-6">{product?.description}</p>
          <p className="text-sm text-gray-500">{`$${product?.price1} - $${product?.price2}`}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Carddetails;
