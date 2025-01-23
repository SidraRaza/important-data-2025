'use client'
import Header from '@/components/Header'
import TopHeader2 from '@/components/TopHeader2'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from "react";



interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price1: number;
  price2: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 4;


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://677d48094496848554c9e6f3.mockapi.io/test");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:",);
        // Optionally set an error state
      }
    };
  
    fetchProducts();
  }, []);

  const startIdx = (currentPage - 1) * imagesPerPage;
  const currentProducts = products.slice(startIdx, startIdx + imagesPerPage);
  const totalImages = currentProducts.length;
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(products.length / imagesPerPage)) {
      setCurrentPage(page);
    }
  };
  return (
    <>
       <TopHeader2/>
        
        <Header/>
Shop Header
<div className="w-full  bg-[#FAFAFA] flex justify-center items-center py-4">
  <div className="w-full max-w-[1049px] lg:h-[44px] h-auto flex flex-col lg:flex-row justify-between items-center gap-4 px-4 lg:px-0 mx-auto">
    <h1 className="text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px] font-bold text-[#252B42]">
      Shop
    </h1>
    <div className="w-auto flex items-center gap-3">
      <h1 className="text-[14px] leading-[24px] font-bold text-[#252B42]">Home</h1>
      <Image
        src={'/arrow5.svg'}
        alt="arrow"
        width={15}
        height={15}
        className="w-[15px] h-[15px]"
      />
      <h1 className="text-[14px] leading-[24px] font-bold text-[#252B42]">Shop</h1>
    </div>
  </div>
</div>

{/* Product Section */}
<div className="w-full bg-[#FAFAFA] py-6">
  <div className="w-full max-w-[1188px] flex flex-wrap justify-center items-center gap-4 px-4 mx-auto">
    <Image
      src={'/r1.svg'}
      alt="product"
      width={205}
      height={223}
      className="w-[150px] h-[170px] md:w-[205px] md:h-[223px]"
    />
    <Image
      src={'/r2.svg'}
      alt="product"
      width={205}
      height={223}
      className="w-[150px] h-[170px] md:w-[205px] md:h-[223px]"
    />
    <Image
      src={'/r3.svg'}
      alt="product"
      width={205}
      height={223}
      className="w-[150px] h-[170px] md:w-[205px] md:h-[223px]"
    />
    <Image
      src={'/r5.svg'}
      alt="product"
      width={205}
      height={223}
      className="w-[150px] h-[170px] md:w-[205px] md:h-[223px]"
    />
    <Image
      src={'/r6.svg'}
      alt="product"
      width={205}
      height={223}
      className="w-[150px] h-[170px] md:w-[205px] md:h-[223px] hidden lg:block"
    />
  </div>
</div>

<div className="w-full h-auto py-4">
  <div className="w-full max-w-[1050px] flex flex-wrap lg:flex-nowrap justify-between items-center mx-auto gap-4 px-4 lg:gap-[80px]">
    <h1 className="text-[14px] leading-[24px] font-bold text-[#737373]">
      Showing all 12 results
    </h1>
    <Image
      src={'/sort.svg'}
      alt="arrow"
      width={177}
      height={46}
      className="w-[150px] h-[40px] lg:w-[177px] lg:h-[46px]"
    />
    <Image
      src={'/sort1.svg'}
      alt="arrow"
      width={252}
      height={50}
      className="w-[200px] h-[44px] lg:w-[252px] lg:h-[50px]"
    />
  </div>
</div>

        <div className='w-[1440px] h-[175px] hidden lg:block'>
            <Image src={'/123.svg'} alt="product" width={1440} height={175} className='w-[1440px] h-[175px]'/>
        </div>
        
    <div className="w-full lg:w-[1440px] lg:h-[488px] h-[1342px] hidden lg:block">
      {/* Top section with logo and link */}
      <div className="w-full h-[142px] flex justify-center flex-col items-center ">
  <div className="w-full max-w-[1049px] h-[58px] flex items-center justify-between border-b border-gray-300 pb-[15px] gap-4 mx-auto px-4">
    <h1 className="text-[24px] leading-[32px] font-bold text-center sm:text-left">Bandage</h1>
    <Image
      src="/link1.svg"
      alt="link"
      width={112}
      height={24}
      className="w-[112px] h-[24px]"
    />
  </div>
</div>

      {/* Main footer content */}
      <div className="w-full  lg:w-[1050px] h-auto flex flex-wrap lg:flex-nowrap justify-center lg:justify-between mx-auto items-start gap-10 lg:py-[100px]  py-[50px] px-4">
        {/* Company Info Section */}
        <div className="w-full sm:w-[148px] lg:w-[148px] h-[170px] flex flex-col gap-[20px]">
          <h1 className="text-[16px] leading-[24px] text-[#252B42] font-bold">Company Info</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">About Us</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">Carrier</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">We are hiring</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">Blog</h1>
        </div>

        {/* Legal Section */}
        <div className="w-full sm:w-[152px] lg:w-[152px] h-[170px] flex flex-col gap-[20px]">
          <h1 className="text-[16px] leading-[24px] text-[#252B42] font-bold">Legal</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">About Us</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">Carrier</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">We are hiring</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">Blog</h1>
        </div>

        {/* Features Section */}
        <div className="w-full sm:w-[148px] lg:w-[148px] h-[170px] flex flex-col gap-[20px]">
          <h1 className="text-[16px] leading-[24px] text-[#252B42] font-bold">Features</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">Business Marketing</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">User Analytic</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">Live Chat</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">Unlimited Support</h1>
        </div>

        {/* Company Info Section (repeated, you can update the content as needed) */}
        <div className="w-full sm:w-[152px] lg:w-[152px] h-[170px] flex flex-col gap-[20px]">
          <h1 className="text-[16px] leading-[24px] text-[#252B42] font-bold">Company Info</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">About Us</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">Carrier</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">We are hiring</h1>
          <h1 className="text-[14px] leading-[24px] text-[#737373]">Blog</h1>
        </div>

        {/* Get In Touch Section */}
        <div className="w-full sm:w-[321px] lg:w-[321px] h-[131px] flex flex-col gap-[20px]">
          <h1 className="text-[16px] leading-[24px] text-[#252B42] font-bold">Get In Touch</h1>
          <Image
            src="/link2.svg"
            alt="link"
            width={321}
            height={56}
            className="w-[321px] h-[56px]"
          />
          <h1 className="text-[14px] leading-[24px] text-[#737373] mb-14">Lore imp sum dolor Amit</h1>
        </div>
      </div>

      {/* Bottom footer text */}
      <div className="w-full h-[74px] bg-[#FAFAFA] flex items-center justify-center">
        <h1 className="text-[14px] leading-[24px] text-[#737373] text-center">
          Made With Love By Finland All Rights Reserved
        </h1>
      </div>   <div className="w-full my-[48px] h-[750px] flex justify-center items-center">
      <div className="w-full bg-[#FAFAFA] py-6">
  <div className="w-full max-w-[1188px] flex flex-wrap justify-center items-center gap-4 px-4 mx-auto">
    {currentProducts.map((product) => (
      <div key={product.id} className="text-center">
        <Link href={`/ProductList/${product.id}`}>
        <Image
          src={product.image}
          alt={product.title}
          width={205}
          height={223}
          className="w-[150px] h-[170px] md:w-[205px] md:h-[223px]"
        />
        </Link>
        <h2 className="text-[16px] font-semibold">{product.title}</h2>
        <p className="text-[14px] text-gray-500">{product.description}</p>
        <p className="text-[14px] text-[#737373]">{`$${product.price1} - $${product.price2}`}</p>
      </div>
    ))}
  </div>



        {/* Pagination Buttons */}
        <div className="flex justify-center items-center gap-2 mt-4">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Previous
  </button>
  <span className="text-gray-600">
  <button>{currentPage}</button>
  <button>{Math.ceil(products.length / imagesPerPage)}</button>
  </span>
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === Math.ceil(products.length / imagesPerPage)}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

      </div>
    </div>
    </div>
    </>
  )
}


export default ProductList;