import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCompanyDetail } from "../../services/company/featuredCompany-service";
import { CompanyDetailType } from "../../utils/type";
import Loading from "../../components/Loading";
import Banner from "./components/Banner";
import Header from "./components/Header";
import AboutCompany from "./components/AboutCompany";
import Jobs from "./components/Jobs";
import ContactInfo from "./components/ContactInfo";
import MapInfo from "./components/MapInfo";
import SocialMedia from "./components/SocialMedia";
import { APIProvider } from "@vis.gl/react-google-maps";
import Title from "../../components/Title";

const Company: React.FC = () => {
  const companyNameAndcompanyId = useParams<{
    companyNameAndcompanyId: string;
  }>().companyNameAndcompanyId?.split("-");
  const companyId =
    companyNameAndcompanyId?.[companyNameAndcompanyId.length - 1];

  const { data: companyDetail } = useQuery({
    queryKey: ["companyDetail", companyId],
    queryFn: () => getCompanyDetail(companyId),
    select: (companyDetailData) => companyDetailData.data,
  });

  if (!companyDetail) {
    return <Loading />;
  }
  window.scrollTo(0, 0);

  const data: CompanyDetailType = companyDetail;

  return (
    <div className="mx-auto mt-2 max-w-screen-md px-2 transition-all duration-1000 xl:max-w-screen-lg">
      <Banner data={data} />

      <Header data={data} />

      <div className="flex flex-col justify-between gap-2 py-4 md:flex-row">
        <div className="w-full rounded-md p-2 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)] md:w-[60%]">
          <AboutCompany data={data} />
          <Jobs data={data} />
        </div>

        <div className="w-full rounded-md p-2 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)] md:w-[40%]">
          <ContactInfo data={data} />
          <SocialMedia data={data} />

          <Title type="h4" className="mt-4 text-[var(--text-color-bold)]">
            Address
          </Title>
          <APIProvider apiKey="AIzaSyC52sX6DS9XwK8fRjgiyJIFB8KXEMHmPIA">
            <MapInfo latitute={data.latitude} longitude={data.longitude} />
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default Company;
