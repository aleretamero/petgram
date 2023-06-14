import { useParams } from 'react-router-dom';
import { Feed } from '../../Feed';
import { Head } from '../../../components/Head';

export const UserProfile = () => {
  const { user } = useParams();

  return (
    <>
      {typeof user === 'string' && <Head title={user} />}
      <section className="container mainContainer">
        <h1 className="title">{user}</h1>
        <Feed user={user} />
      </section>
    </>
  );
};
