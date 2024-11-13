import { useQuery } from "@tanstack/react-query";
import FilterCustom from "./FilterCustom";
import { FaCity } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { FaClipboardUser } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { GiSkills } from "react-icons/gi";

import {
  getCitiesApi,
  getDesiredLevelsApi,
  getEducationLevelsApi,
  getExperienceLevelsApi,
  getProfessionsApi,
} from "../../../services/api/publicApi";

interface IResAPI {
  id: number;
  name: string;
}

interface IFilterSortProps {
  filterCity: number;
  setFilterCity: (value: number) => void;
  filterDesiredLevel: number;
  setFilterDesiredLevel: (value: number) => void;
  filterProfession: number;
  setFilterProfession: (value: number) => void;
  filterExperienceLevel: number;
  setFilterExperienceLevel: (value: number) => void;
  filterEducationLevel: number;
  setFilterEducationLevel: (value: number) => void;
}

const FilterSort: React.FC<IFilterSortProps> = ({
  filterCity,
  setFilterCity,
  filterDesiredLevel,
  setFilterDesiredLevel,
  filterProfession,
  setFilterProfession,
  filterExperienceLevel,
  setFilterExperienceLevel,
  filterEducationLevel,
  setFilterEducationLevel,
}) => {
  const { data: cityOptions } = useQuery({
    queryKey: ["cities", 1],
    queryFn: () => getCitiesApi(1),
    select: (cityData) =>
      cityData.data.map((item: IResAPI) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: desiredLevelOptions } = useQuery({
    queryKey: ["desiredlevel"],
    queryFn: () => getDesiredLevelsApi(),
    select: (cityData) =>
      cityData.data.map((item: IResAPI) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: professionOptions } = useQuery({
    queryKey: ["professionsApi"],
    queryFn: () => getProfessionsApi(),
    select: (cityData) =>
      cityData.data.map((item: IResAPI) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: experienceLevelOptions } = useQuery({
    queryKey: ["experienceLevelOptions"],
    queryFn: () => getExperienceLevelsApi(),
    select: (cityData) =>
      cityData.data.map((item: IResAPI) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: educationOptions } = useQuery({
    queryKey: ["getEducationLevelsApi"],
    queryFn: () => getEducationLevelsApi(),
    select: (cityData) =>
      cityData.data.map((item: IResAPI) => ({
        value: item.id,
        label: item.name,
      })),
  });
  return (
    <div className="ml-2 my-3 mt-4 w-full flex items-center gap-2">
      <FilterCustom
        placehoder="Thành phố"
        options={cityOptions}
        icon={<FaCity />}
        title="Thành phố"
        setSelect={setFilterCity}
        select={filterCity}
      />
      <FilterCustom
        placehoder="Cấp độ mong muốn"
        options={desiredLevelOptions}
        icon={<FaClipboardUser />}
        title="Cấp độ mong muốn"
        setSelect={setFilterDesiredLevel}
        select={filterDesiredLevel}
      />
      <FilterCustom
        placehoder="Chuyên ngành"
        options={professionOptions}
        icon={<MdWork />}
        title="Chuyên ngành"
        setSelect={setFilterProfession}
        select={filterProfession}
      />
      <FilterCustom
        placehoder="Kinh nghiệm"
        options={experienceLevelOptions}
        icon={<GiSkills />}
        title="Kinh nghiệm"
        setSelect={setFilterExperienceLevel}
        select={filterExperienceLevel}
      />
      <FilterCustom
        placehoder="Trình độ"
        options={educationOptions}
        icon={<FaUserGraduate />}
        title="Trình độ"
        setSelect={setFilterEducationLevel}
        select={filterEducationLevel}
      />
    </div>
  );
};

export default FilterSort;
