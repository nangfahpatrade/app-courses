import SubPortFolio from '@/app/components/home/subportfolio';
import React from 'react';

// Define the Params type with id as a required field
interface Params {
  id: string;
}

type PageProps = {
  params: Params;
};

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <SubPortFolio params={params} />
    </div>
  );
};

export default Page;
