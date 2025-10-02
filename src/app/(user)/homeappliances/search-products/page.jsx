"use client"
import React, { Suspense } from "react";
import Footer from "@/components/landing/Footer";
import Header from "@/components/user/homeappliance/Header";
import SearchResultsPage from "./components/ProductCards";

function Page() {
  return (
    <div>
      <Header/>
      <Suspense fallback={<div className="p-6 text-center">Loading search...</div>}>
      <SearchResultsPage />

      </Suspense>
      <Footer></Footer>
    </div>
  );
}

export default Page;
