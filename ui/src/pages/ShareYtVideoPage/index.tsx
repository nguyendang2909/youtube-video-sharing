import { PageHeader } from 'containers/Page/PageHeader';
import { ShareYtVideoPageContent } from 'containers/Page/ShareVideoPageContent';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function ShareYtVideoPage() {
  return (
    <>
      <Helmet>
        <title>Share youtube video</title>
        <meta name="description" content="Share youtube video" />
      </Helmet>
      <PageHeader />
      <ShareYtVideoPageContent />
    </>
  );
}
