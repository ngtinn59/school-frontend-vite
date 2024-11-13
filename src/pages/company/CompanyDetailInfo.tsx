import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCompanyDetail } from "../../services/company/featuredCompany-service";
import { CompanyDetailType } from "../../utils/type";
import Loading from "../../components/Loading";

const CompanyDetailInfo: React.FC = () => {
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

  console.log(companyDetail);

  if (!companyDetail) {
    return <Loading />;
  }

  const data: CompanyDetailType = companyDetail;

  return (
    <div className="mx-auto mt-2 max-w-screen-md bg-red-100 px-2 transition-all duration-1000 xl:max-w-screen-lg">
      {data.name}
    </div>
  );
};

export default CompanyDetailInfo;
