import { ActionFunctionArgs, Navigate } from "react-router-dom";
import FeatureArticle from "./components/FeatureArticle";
import PlatformUSP from "./components/PlatformUSP";
import SearchBox from "./components/SearchBox";
import TopEmployer from "./components/TopEmployer";

export default function HomePage() {
  return (
    <Navigate
      to="/profile"
      replace={true}
      state={{ alert: "You need sign in to access this feature!" }}
    />
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search box */}
      <SearchBox />

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
      `/it-jobs/${formDataObject.keyword}${
        formDataObject.city ? `/${formDataObject.city}` : ""
      }`
    );
  }
  return null;
}
