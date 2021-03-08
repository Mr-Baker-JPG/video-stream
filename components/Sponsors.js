import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

const items = [
  <img src="/images/sponsors/Acadiana Gastro Logo.png" />,
  <img src="/images/sponsors/Order of Malta.png" />,
  <img src="/images/sponsors/a-plus-glass-logo.png" />,
  <img src="/images/sponsors/acadiana obgyn color.png" />,
  <img src="/images/sponsors/Acadiana Pools.png" />,
  <img src="/images/sponsors/Angelle Arch.jpg" />,
  <img src="/images/sponsors/BB eye care color.jpeg" />,
  <img src="/images/sponsors/Acadiana Gastro Logo.png" />,
  <img src="/images/sponsors/Order of Malta.png" />,
  <img src="/images/sponsors/BHCA color.png" />,
  <img src="/images/sponsors/Bonadventure.jpeg" />,
  <img src="/images/sponsors/Braniff Construction.png" />,
  <img src="/images/sponsors/Dean Agency Logo Blue.jpg" />,
  <img src="/images/sponsors/DT2 Blue.png" />,
  <img src="/images/sponsors/Acadiana Gastro Logo.png" />,
  <img src="/images/sponsors/Order of Malta.png" />,
  <img src="/images/sponsors/Lake Area Anesthesia.png" />,
  <img src="/images/sponsors/Serra Club.png" />,
  <img src="/images/sponsors/Storage.png" />,
  <img src="/images/sponsors/vestra.svg" />,
  <img src="/images/sponsors/wexler animal hospital logo.jpg" />,
]

const Sponsors = () => {
  return (
    <div className="w-full min-h-0 px-8 py-8 mx-auto mt-8 bg-gray-400 border border-gray-300 rounded-lg shadow-lg">
      <p className="mb-2 font-bold">Thanks to our sponsors:</p>
      <AliceCarousel
        autoPlay
        autoPlayStrategy="none"
        autoPlayInterval={1000}
        animationDuration={1000}
        animationType="fadeout"
        infinite
        animationEasingFunction={"ease-in-out"}
        disableButtonsControls={true}
        disableDotsControls={true}
        items={items}
      />
    </div>
  )
}

export default Sponsors
