import Study from '@/app/components/user/study';
import React from 'react';

interface Params {
  id: string;
}

type PageProps = {
  params: Params;
};

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <Study params={params} />
    </div>
  );
};

export default Page;