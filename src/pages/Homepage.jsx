import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <> 
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </>
  );
}