import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Home } from "../templates/Home/index";

export default function HomePage() {
  return <Home />;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ["common"]),
    },
  };
}
