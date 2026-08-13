const AboutUs = () => {
  return (
    <section id="about" className="border-b border-line py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl font-bold mb-4">About</h2>
        <p className="text-ink-soft max-w-[56ch]">
          Coded Cheese is named after my daughter — cheese is her favorite food, and left to her own
          devices she'd eat it at nearly every meal. The name stuck. I'm a one-person software shop; I
          like apps that do one thing well, ship fast, and don't take themselves too seriously —{" "}
          <strong className="text-ink font-semibold">
            good software, like good cheese, just needs the right ingredients, time, and a bit of culture.
          </strong>
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
