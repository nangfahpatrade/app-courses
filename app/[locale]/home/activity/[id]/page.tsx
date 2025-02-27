import SubActivity from '@/app/components/home/subactivity';


interface Params {
  id: string;
}

type PageProps = {
  params: Params;
};

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <SubActivity params={params} />
    </div>
  );
};

export default Page;
