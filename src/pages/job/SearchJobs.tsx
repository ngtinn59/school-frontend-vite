import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import { getSearchJobs } from "../../services/job/jobs-service";
import SearchBox from "../home/components/SearchBox";
import Job from "./components/search-jobs/Job";
import SuggestedJobs from "./components/search-jobs/SuggestedJobs";
import { JobType } from "../../utils/type";
import JobsList from "./common/JobsList";

const SearchJobs: React.FC = () => {
  const { searchText } = useParams<{
    searchText: string;
  }>();

  const professionId = searchText ? searchText.split("&")[0].split("=")[1] : "";
  const cityId = searchText ? searchText.split("&")[1].split("=")[1] : "";
  const keyword = searchText ? searchText.split("&")[2].split("=")[1] : "";

  const { data: searchedJobData } = useQuery({
    queryKey: ["searchedJobData", searchText],
    queryFn: () => getSearchJobs(searchText || ""),
    select: (jobDetailData) => jobDetailData.data,
  });

  if (!searchedJobData) {
    return <Loading />;
  }

  console.log(searchedJobData);

  const searchedJob: JobType[] = searchedJobData.searched_jobs;
  const suggestedJobs: JobType[] = searchedJobData.suggested_jobs;
  console.log(searchedJob);
  console.log(suggestedJobs);

  return (
    <div className="mt-2">
      <SearchBox
        reuse
        professionId={professionId}
        cityId={cityId}
        keyword={keyword}
      />

      <div className="mx-auto my-2 max-w-screen-lg px-2 transition-all duration-1000">
        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <div className="w-full space-y-4 overflow-hidden rounded-md bg-white p-1 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)] md:w-[60%]">
            <Title type="h4">
              {`${searchedJob.length} job(s) found for "${keyword}"`}
            </Title>

            <JobsList
              jobs={searchedJob}
              classNameResponsive="grid-cols-1 p-0 md:grid-cols-1 lg:grid-cols-1"
            />
          </div>

          <div className="w-full space-y-4 overflow-hidden rounded-md bg-white p-1 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)] md:w-[40%]">
            <SuggestedJobs jobs={suggestedJobs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
