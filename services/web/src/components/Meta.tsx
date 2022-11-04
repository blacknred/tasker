import Head from 'next/head';

const defaultProps = {
  title: '',
  keywords: '',
  description: ''
}

const Meta = ({ title, keywords, description }: IMetaProps & typeof defaultProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
}

Meta.defaultProps = defaultProps;

export default Meta;
export interface IMetaProps {
  title?: any,
  keywords?: string,
  description?: string
}