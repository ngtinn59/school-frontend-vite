import { ActionFunctionArgs, redirect } from "react-router-dom";
import FeatureArticle from "./components/FeatureArticle";
import FeaturedCompanies from "./components/FeaturedCompanies";
import PlatformUSP from "./components/PlatformUSP";
import SearchBox from "./components/SearchBox";
import TopEmployer from "./components/TopEmployer";
import UrgentJobs from "./components/UrgentJobs";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Search box */}
      <SearchBox />

      <FeaturedCompanies />

      <UrgentJobs />

      {/* Platform's USP */}
      <PlatformUSP />

      {/* Top Employers */}
      <TopEmployer />

      {/* Features articles */}
      <FeatureArticle />
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const formDataObject: { [key: string]: FormDataEntryValue } = {};
  for (const [key, value] of form.entries()) {
    const convertValue = value
      .toString()
      .trim()
      .replace(/\s/g, "-")
      .toLowerCase();
    formDataObject[key] = convertValue;
  }
  if (formDataObject.keyword !== "") {
    return redirect(
      `/search-jobs/profession_id=${formDataObject.profession}&city_id=${formDataObject.city}&keyword=${formDataObject.keyword}`,
    );
  }
  return null;
}
