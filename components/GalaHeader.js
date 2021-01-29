function GalaHeader() {
  return (
    <div>
      <div className="relative pt-4 border-b-4 border-white border-opacity-5 from-first-blue to-last-blue bg-gradient-to-b">
        <header id="header" className="container mx-auto border-white">
          <div>
            <img className="px-4 mx-auto" src="/images/gala-logo.png" />
          </div>
          <div>LINKS</div>
        </header>
      </div>
      <section>
        <div
          className="h-32 bg-left bg-no-repeat bg-auto bg-cover md:h-56 "
          style={{
            backgroundImage: "url(/images/school.jpg)",
            backgroundPositionY: "80%",
          }}
        ></div>
      </section>
    </div>
  )
}
export default GalaHeader
