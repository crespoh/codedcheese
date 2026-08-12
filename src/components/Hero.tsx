const Hero = () => {
  return (
    <section className="border-b border-line py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-xl">
          <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight text-balance mb-4">
            I make small, useful apps — and this is where they'll live.
          </h1>
          <p className="text-ink-soft text-lg max-w-prose">
            Two are in the works right now: a screen-time app for co-parenting, and a spelling app for kids.
            Nothing's shipped yet, but they're close.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
