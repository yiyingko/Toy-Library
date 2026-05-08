import './AboutPage.css';
import aboutImg from '../../assets/images/about.png';

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-page__content">
        <h1 className="about-page__title">
          “Sharing toys, growing imaginations.”
        </h1>

        <p className="about-page__text">
          We believe that play is one of the most powerful ways children learn,
          grow, and explore the world around them.
        </p>

        <p className="about-page__text">
          Toy Library is a community-driven platform that helps families share
          and borrow toys, making play more accessible, affordable, and
          sustainable. Instead of letting toys sit unused, we give them a second
          life—reducing waste while keeping playtime fresh and exciting.
        </p>

        <p className="about-page__text">
          For parents, it means less clutter and more value. For children, it
          means endless opportunities to discover something new. And for our
          community, it’s a small step towards a more thoughtful and connected
          way of living.
        </p>
      </section>

      <img
        src={aboutImg}
        alt="Children playing with shared toys"
        className="about-page__img"
      />
    </main>
  );
}

export default AboutPage;
