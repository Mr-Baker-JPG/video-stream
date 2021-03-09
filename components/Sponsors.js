import Image from "next/image"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

const items = [
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo2.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo3.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo4.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo5.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo6.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo7.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo8.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo9.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo10.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo11.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo12.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo13.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo14.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo15.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo16.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
  <div className="relative block bg-white border md:mx-24 md:px-24">
    <Image
      src="/images/sponsors/Fitted Sponsor Logo17.jpg"
      layout="responsive"
      height={300}
      width={600}
    />
  </div>,
]

const Sponsors = () => {
  return (
    <div className="mx-auto mt-4 text-center">
      <p className="mb-2 font-bold">Thanks to our sponsors:</p>
      <AliceCarousel
        className="shadow-xl"
        autoPlay
        autoPlayStrategy="none"
        autoPlayInterval={15000}
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
