

const HeroSection = () => {
  return (
    <section className="container h-auto max-h-[400px] mb-8 md:mb-12">
      <div className="w-full relative">
        <img 
          className="mx-auto max-w-full max-h-full object-cover opacity-90"
          src="/images/legacy.jpg"
          alt="heroImage" 
        />
      </div>
    </section> 
  )
}

export default HeroSection;