import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import { ReactNode } from 'react';

type ConditionalLinkWithStateProps = {
  name: string
  // Generic item with optional id and name, should be retrieved from indexedDb as an entry from table
  item: { id?: number; name?: string };
  viewPath: string; // Path to view the item
  createPath: string; // Path to create the item
  linkBackStates: {
    allreadyExists: any,
    doesNotExist: any
  }
  importedItemName?: string; // Name of the item if it's being imported and doesn't exist in the database yet
};

const ConditionalLinkWithState: React.FC<ConditionalLinkWithStateProps> = ({
  name,
  item,
  viewPath,
  createPath,
  linkBackStates,
  importedItemName,
}) => (
  <div>
    {item.id ? (
      // Item exists in db
      <Link
        to={`${viewPath}?id=${item.id}`}
        state={linkBackStates.allreadyExists}
        className='rounded-md bg-white/5 hover:bg-white/10 cursor-pointer px-2 py-1 flex'
      >
        {item.name}
      </Link>
    ) : (
      // Item does NOT exist in db
      <div>
        <span className='pr-2'>{importedItemName ?? 'Not assigned'}</span>
        <Link to={createPath} state={linkBackStates.doesNotExist}>
          <span data-tooltip-id={`tooltip-item${name}`}>
            <FontAwesomeIcon icon={faExclamationCircle} className="cursor-pointer text-red-500 hover:text-gray-200" />
          </span>
        </Link>
        <Tooltip
          id={`tooltip-item${name}`}
          clickable
          opacity={'100%'}
          place="bottom"
          classNameArrow="border border-gray-600"
          delayHide={200}
          className="z-30 max-w-[350px] border border-gray-600 text-white"
          style={{ backgroundColor: '#1D232A' }}
        >
          <div className="py-2 text-left">
            <span>{`${name} not found in the database. Consider adding it by clicking`}&nbsp;
              <Link to={createPath} className='bg-[#CA5160] rounded-md px-2 pb-1'
                state={linkBackStates.doesNotExist}
              >here
              </Link>
            </span>
          </div>
        </Tooltip>
      </div>
    )}
  </div>
);

export default ConditionalLinkWithState;