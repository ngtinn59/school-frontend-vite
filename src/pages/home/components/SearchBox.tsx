import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import Wrapper from "../../../components/Wrapper";
import {
  COLOR_SECONDARY,
  HOMEPAGE_SKILLS_TRENDING,
} from "../../../utils/constants";
import { useSelector } from "react-redux";
import { getUserAuthentication } from "../../../services/redux/user";
import { FaUserTie } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  getCitiesApi,
  getProfessionsApi,
} from "../../../services/api/publicApi";
import { useState } from "react";

interface SearchBoxProps {
  reuse?: boolean;
  professionId?: string;
  cityId?: string;
  keyword?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  reuse,
  professionId,
  cityId,
  keyword,
}) => {
  const [professionIdValue, setProfessionIdValue] = useState(professionId);
  const [cityIdValue, setCityIdValue] = useState(cityId);
  const [keywordValue, setKeywordValue] = useState(keyword);

  const user = useSelector(getUserAuthentication);

  const { data: professionsData } = useQuery({
    queryKey: ["professions"],
    queryFn: () => getProfessionsApi(),
    select: (professionsData) => professionsData.data,
  });
  const professions: { value: string; label: string }[] = professionsData
    ? professionsData.map((profession: { id: number; name: string }) => ({
        value: profession.id,
        label: profession.name,
      }))
    : [];

  const { data: citiesData } = useQuery({
    queryKey: ["cities"],
    queryFn: () => getCitiesApi(1),
    select: (citiesData) => citiesData.data,
  });
  const cities: { value: string; label: string }[] = citiesData
    ? citiesData.map((city: { id: number; name: string }) => ({
        value: city.id,
        label: city.name,
      }))
    : [];

  return (
    <section className="bg-gradient-to-r from-gray-950 from-40% to-blue-800 py-4 pb-12">
      <Wrapper className="grid grid-cols-1 gap-4">
        {!reuse && (
          <Title type="h2" className="text-white">
            {"674 IT Jobs 'Chất' " + (user.name ? "for " + user.name : "")}
          </Title>
        )}

        <Form
          className="6 flex flex-col flex-nowrap gap-2 md:flex-row"
          method="POST"
        >
          <Dropdown
            name="city"
            options={cities}
            icon={<FontAwesomeIcon icon={faLocationDot} />}
            containerClassName="h-12 font-semibold"
            onChange={(e) => setCityIdValue(e.target.value)}
            value={cityIdValue}
          />

          <Dropdown
            name="profession"
            options={professions}
            icon={<FaUserTie className="mt-1" />}
            containerClassName="h-12 font-semibold"
            onChange={(e) => setProfessionIdValue(e.target.value)}
            value={professionIdValue}
          />

          <div className="flex flex-1 flex-row md:gap-2">
            <Input
              containerClassName="flex-1 flex flex-col"
              type="text"
              name="keyword"
              required
              placeholder="Enter keyword skill (Java, iOS...), job title, company..."
              value={keywordValue}
              onChange={(e) => setKeywordValue(e.target.value)}
            />

            <Button
              buttonType="primary"
              type="submit"
              className="-ml-1 h-12 rounded-e-lg rounded-s-none px-4 md:ml-0 md:rounded-lg"
            >
              <FontAwesomeIcon icon={faSearch} />
              <span className="ml-2 hidden md:inline">Search</span>
            </Button>
          </div>
        </Form>

        {!reuse && (
          <div className="flex flex-row flex-wrap gap-2">
            <Title type="h-3" className="font-semibold text-gray-100">
              Trending now:
            </Title>
            {HOMEPAGE_SKILLS_TRENDING.map((skill, index) => (
              <Button
                buttonType="colored"
                className="rounded-2xl border border-solid border-gray-400 px-2 py-1 text-sm hover:bg-gray-600 hover:text-white hover:opacity-100"
                backgroundColor={COLOR_SECONDARY}
                textColor="rgb(107,114,128)"
                key={index}
              >
                {skill}
              </Button>
            ))}
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default SearchBox;
