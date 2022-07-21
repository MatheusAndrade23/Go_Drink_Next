const title = 'Go Drink - Best Cocktails Recipes';
const description =
  'An open source website with over 600 different cocktails recipes from around the world.';

const SEO = {
  title,
  description,
  canonical: 'https://go-drink.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://go-drink.vercel.app',
    title,
    description,
    images: [
      {
        url: 'https://camo.githubusercontent.com/fd761b45d5f1988db10bf95f44148ae555f2d6fc84ce5ecfcb409f13437bb869/68747470733a2f2f696d672e6672656570696b2e636f6d2f666f746f732d6772617469732f6170726f78696d652d73652d636f6d2d626562696461732d64656c6963696f7361735f32332d323134393133323231352e6a70673f73697a653d363236266578743d6a7067',
        alt: title,
        width: 626,
        height: 283,
      },
    ],
  },
};

export default SEO;
