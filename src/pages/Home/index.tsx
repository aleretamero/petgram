import { Head } from '../../components/Head';
import { Feed } from '../Feed';

export const Home = () => {
  return (
    <>
      <Head title="Home" description="Home do site dogs, com feed de fotos." />
      <section className="container mainContainer">
        <Feed />
      </section>
    </>
  );
};
