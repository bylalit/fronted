import BestSellers from "../components/HomePageComp/BestSellers"
import FlashSale from "../components/HomePageComp/FlashSale"
import HeroSection from "../components/HomePageComp/HeroSection"
import LookBack from "../components/HomePageComp/LookBack"

const Home = () => {

  return (
    <>
        <HeroSection />
        <LookBack />
        <BestSellers />
        <FlashSale />
    </>
  )
}

export default Home
