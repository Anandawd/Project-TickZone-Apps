export default function Hero() {
  return (
    <>
      <div className="hero">
        <div className="hero-headline">
          Experience the{" "}
          <span className="text-gradient-blue">Best Moments</span>{" "}
          <br className="d-none d-lg-block" />
          by <span className="text-gradient-pink">Joining</span> Our Exclusive
          Events
        </div>
        <p className="hero-paragraph">
          Dapatkan tiket untuk webinar, kursus, konser, dan event favorit Anda{" "}
          <br className="d-none d-lg-block" />
          dengan mudah dan cepat. Semua ada di satu tempat!
        </p>
        <a href="#grow-today" className="btn-green">
          Pesan Tiket Sekarang!
        </a>
      </div>

      <div className="d-flex flex-row flex-nowrap justify-content-center align-items-center gap-5 header-image">
        <img src="/images/1.png" alt="tickzone" className="img-1" />
        <img src="/images/2.png" alt="tickzone" className="img-2" />
        <img src="/images/1.png" alt="tickzone" className="img-1" />
      </div>
    </>
  );
}
