import { memo } from "react";
import TailwindcssDropdown from "../../../../Components/Dropdowns/TailwindcssDropdown";
import { CategoryType, PlaceHoldersType } from "./Search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TailwindcssCheckbox from "../../../../Components/Checkboxes/TailwindcssCheckbox";

interface SearchBarProps {
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  category: CategoryType;
  onCategoryChange: (selected: CategoryType) => void;
  placeholders: PlaceHoldersType;
}

const SearchBar = memo<SearchBarProps>(({
  value,
  onInputChange,
  category,
  onCategoryChange,
  placeholders
}) => (
  <div className='flex flex-col justify-center p-4 bg-base-100/50 rounded-md'>
    <div className="text-2xl text-[#CFCBC4] font-semibold py-2">
      Find an Article
    </div>
    <div className='flex items-center h-14 relative bg-base-100 rounded-md group border border-gray-600 focus-within:ring-2 focus-within:ring-gray-600 hover:ring-2 hover:ring-gray-600'>
      <input
        value={value}
        onChange={onInputChange}
        className='input pl-11 placeholder:italic rounded-l-md border-0 rounded-r-none focus:outline-none focus:ring-0'
        placeholder={`e.g.: "${placeholders[category]} ..."`}
      />
      <FontAwesomeIcon icon={faSearch} className='text-gray-400 absolute w-4 h-4 left-4 scale-x-[-1]' />
      <TailwindcssDropdown
        items={Object.keys(placeholders) as CategoryType[]}
        selectedItem={category}
        onSelect={(selected) => onCategoryChange(selected as CategoryType)}
        btnClassName='bg-base-100 hover:text-[#CFCBC4] h-[54px] hover:bg-[#242c36] rounded-l-none rounded-r-md border-y-0 border-l-2 border-l-transparent hover:border-l-gray-600 border-r-0 focus:outline-none focus:ring-0 text-md w-[120px] justify-end gap-2'
        menuClassName='text-right bg-base-100'
        optionClassName='pr-8 hover:bg-[#242c36]'
      />
    </div>
  </div>
));

export default SearchBar