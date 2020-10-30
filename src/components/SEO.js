import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, type, url, image }) => {
  return (
    <Helmet>
      <title>{`Mocho Store${title ? ` | ${title}` : ''}`}</title>
      <meta
        property='og:title'
        content={`Mocho Store${title ? ` | ${title}` : ''}`}
      />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={image} />
      <link rel='canonical' href={url} />
    </Helmet>
  );
};

export default SEO;
