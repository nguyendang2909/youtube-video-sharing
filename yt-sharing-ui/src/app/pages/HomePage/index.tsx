import { HomePageContent } from 'containers/Page/HomagePageContent';
import { PageHeader } from 'containers/Page/PageHeader';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Homepage" />
      </Helmet>
      <PageHeader />
      <HomePageContent />
    </>
  );
}
