export default function Brand({ className }) {
  return (
    <section className={`brand-partner text-center ${className}`}>
      <p>Events held by top & biggest global companies</p>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
        <img src="/images/apple-111.svg" alt="tickzone" />
        <img src="/images/Adobe.svg" alt="tickzone" />
        <img src="/images/slack-21.svg" alt="tickzone" />
        <img src="/images/spotify-11.svg" alt="tickzone" />
        <img src="/images/google-2015.svg" alt="tickzone" />
      </div>
    </section>
  );
}
