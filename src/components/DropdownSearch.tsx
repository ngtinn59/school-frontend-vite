/* eslint-disable @typescript-eslint/no-explicit-any */
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { ComponentSelectionWithSearchType } from "../utils/type";
import Input from "./Input";

type Props = {
  className?: string;
  id: string;
  data: any[];
  handleChangeValues?: (a: any[]) => void;
  currentValues?: any[];
};

export default function DropdownSearch({
  className,
  data,
  handleChangeValues,
  currentValues,
  id,
}: Props) {
  const [selected, setSelected] = useState(
    currentValues as ComponentSelectionWithSearchType[]
  );
  const [isShowSelectBox, setIsShowSelectBox] = useState(false);
  const [query, setQuery] = useState("");
  const filterSelection = useMemo(
    () =>
      query === "" && selected.length == 0
        ? data
        : data.filter((selection: ComponentSelectionWithSearchType) => {
            return (
              selection.name
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, "")) &&
              !selected.map((item) => item.name).includes(selection.name)
            );
          }),
    [query, selected, data]
  );

  useEffect(() => {
    setSelected(currentValues as ComponentSelectionWithSearchType[]);
  }, [currentValues]);
  useEffect(() => {
    selected.length !== 0 && handleChangeValues && handleChangeValues(selected);
  }, [selected, handleChangeValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownSearchElement = document.getElementById(id);
      if (
        dropdownSearchElement &&
        !dropdownSearchElement.contains(event.target as Node)
      ) {
        setIsShowSelectBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="relative z-10">
      <div
        className={`flex flex-row items-center rounded-r-md relative  ${className}`}
        onClick={() => setIsShowSelectBox(true)}
      >
        <FontAwesomeIcon icon={faSearch} className="px-4 text-inherit " />
        <Input
          inputGroupType="no-style"
          name="search-skill"
          inputClassName={`flex-1 p-3 rounded-r-md focus:outline-4 focus:outline-primary font-medium text-base bg-transparent`}
          placeholder="Skills"
          onChange={(event) => {
            setQuery(event.target.value);
            setIsShowSelectBox(true);
          }}
        />
        <FontAwesomeIcon icon={faChevronDown} className="absolute right-4" />
      </div>
      <ul
        id={id}
        className={`absolute z-100 w-full top-[100%] mt-2 border border-gray-200 border-solid   shadow-md bg-white rounded-md overflow-hidden ${
          isShowSelectBox ? "" : "hidden"
        }`}
      >
        {filterSelection.length === 0 && query != "" ? (
          <li className="px-4 py-2 hover:bg-primary cursor-pointer hover:text-white font-medium">
            No result found
          </li>
        ) : (
          filterSelection.map((item: ComponentSelectionWithSearchType) => (
            <li
              key={item.id}
              onClick={() => {
                setSelected([...selected, item]);
                setIsShowSelectBox(false);
              }}
              className="px-4 py-2 hover:bg-primary cursor-pointer hover:text-white text-normal font-medium text-base"
            >
              {item.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
