"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getHomeCarouselBySection } from "@/redux/slices/carouselSlice";
import HomeApplianceHeroSection from "./HomeApplianceHeroSection";
import WatchHeroSection from "./WatchHeroSection";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function FullBackgroundHeroSection() {
  const dispatch = useDispatch();
  const { carousel } = useSelector((state) => state.carousel);
  const [sectionId, setSectionId] = useState(null); // <-- state
  const { id } = useParams();

  useEffect(() => {
    const id = localStorage.getItem("sectionId");
    setSectionId(id);
    if (id) {
      dispatch(getHomeCarouselBySection(id));
    }
  }, [dispatch]);

  const slides = carousel?.length ? carousel : carousel?.mainCarousels || [];
const sectionName = slides[0]?.section?.name; 

if (sectionName?.toLowerCase() === "watches") {
  return <WatchHeroSection slides={slides} />;
} else {
  return <HomeApplianceHeroSection slides={slides} />;
}
}

