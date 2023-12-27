const currentYear = new Date().getFullYear();

export default {
  footer: <p>{currentYear} © Faruk</p>,
  head: ({ meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: 'Read More →',
  postFooter: null,
  darkMode: true,
  navs: [],
};
