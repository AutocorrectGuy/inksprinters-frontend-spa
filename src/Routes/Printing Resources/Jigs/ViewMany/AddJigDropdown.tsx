import { useNavigate } from 'react-router-dom';
import PATH_CONSTANTS from '../../../pathConstants';
import TailwindcssDropdown from '../../../../Components/Dropdowns/TailwindcssDropdown';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type RoutesMap = 'Create New' | 'Import XML'
type Routes = { [key in RoutesMap]: string }

const routes: Routes = {
  'Create New': PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.CREATE,
  'Import XML': PATH_CONSTANTS.PRINTING_RESOURCES.JIGS.CREATE_USING_XML
}

const AddJigDropdown = () => {
  const navigate = useNavigate();

  return (
    <TailwindcssDropdown
      items={['Create New', 'Import XML']}
      onSelect={(item) => navigate(routes[item as RoutesMap])}
      selectedItem='Add Jig'
      btnClassName='bg-[#CA5160] px-6 py-3 text-neutral-100 border-[#723748] text-md'
      optionClassName='text-center py-3 border-b last:border-b-0 border-b-[#723748] hover:bg-transparent hover:text-white'
      menuClassName='bg-[#CA5160] p-0'
      icon={faPlus}
      iconClassName='w-4 h-4'
    />
  );
};

export default AddJigDropdown;