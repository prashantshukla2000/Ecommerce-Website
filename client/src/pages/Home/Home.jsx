import React from "react";
import Slider from "../../components/Slider/Slider.jsx"
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts.jsx" 
import Categories from "../../components/Categories/Categories.jsx"
import Contact from "../../components/Contact/Contact.jsx"
import "./Home.scss";

const Home = () => {
return (
    <div className="home">
       <Slider />
       <FeaturedProducts type="featured"/>
       <Categories />
       <FeaturedProducts type="trending"/>
       <Contact />
    </div>
)
}
export default Home;