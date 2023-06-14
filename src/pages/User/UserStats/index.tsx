import { useEffect, lazy, Suspense } from 'react';

const UserStatsGraphs = lazy(() => import('../UserStatsGraphs'));

import useFetch from '../../../hooks/useFetch';
import { GET_STATS } from '../../../api/api';

// Components
import { Head } from '../../../components/Head';
import { Loading } from '../../../components/Loading';
import { Error } from '../../../components/Error';
import { isTypeDataStats } from '../../../types/TypeData';

export const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const getData = async () => {
      const { url, options } = GET_STATS();
      await request(url, options);
    };
    getData();

    return () => {
      //
    };
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (isTypeDataStats(data)) {
    return (
      <>
        <Head title="Estatísticas" />
        <Suspense fallback={<div></div>}>
          <UserStatsGraphs data={data} />
        </Suspense>
      </>
    );
  } else return null;
};
