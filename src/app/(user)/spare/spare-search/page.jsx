"use client"
import Header from "@/components/user/spare/Header";
import React, { Suspense } from "react";
import SearchResultsPage from "./components/ProductCard";
import Footer from "@/components/landing/Footer";

function Page() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div className="p-6 text-center">Loading search...</div>}>
      <SearchResultsPage />

      </Suspense>
      <Footer></Footer>
    </div>
  );
}

export default Page;
