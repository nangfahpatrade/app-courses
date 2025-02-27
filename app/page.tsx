// app/page.tsx



import PageFromLocale from './[locale]/page'
export default function HomePage() {
    return (
      <PageFromLocale params={{ locale: 'th' }} />
    );
  }