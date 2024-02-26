import moment from "moment";
import { DexieJsTable } from "./schema";
import PATH_CONSTANTS from "../../../Routes/pathConstants";
import { useNavigate } from "react-router-dom";
import { toProperCase } from "../../../Routes/Storage/utils";
import ArrayBufferAsImage from "../../../Components/ImageRendering/ArrayBufferAsImage";

type RenderTableProps<T> = {
  tableName: 'JIGS' | 'PRIMERS' | 'ARTICLES'
  entries: T[];
  entriesModel: DexieJsTable<T>;
};

interface SpecialProps {
  id?: number
  created_at: number;
}

const RenderTable = <T extends SpecialProps>({ tableName, entries, entriesModel }: RenderTableProps<T>) => {

  const navigate = useNavigate()

  const onRowClick = (id: number) =>
    navigate(PATH_CONSTANTS.STORAGE[tableName].VIEW_SINGLE + `?id=${id}`);

  return (<>
    <table className="table w-full">
      <thead>
        <tr>
          {Object.keys(entriesModel)
            .filter(key => (key !== 'id'))
            .map(key => <th key={`header-${key}`}>{toProperCase(key).replaceAll('_', ' ')}</th>)}
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, i) => (
          <tr key={`table-row-${i}`} onClick={() => onRowClick(entry.id!)} className="cursor-pointer hover:bg-white/10">
            {Object.keys(entriesModel)
              .filter(key => (key !== 'id' && key !== 'created_at'))
              .map((key, j) => {
                const data = entry[key as keyof T]
                const reactKey = `table-row-${i}-col-${j}`
                return data !== undefined && data !== null
                  ? <td key={reactKey}>{
                    typeof data === 'string'
                      ? data
                      : data instanceof ArrayBuffer
                        ? <ArrayBufferAsImage arrayBuffer={data} />
                        : data.toString() // Handle other non-string, non-ArrayBuffer types
                  }</td>
                  : <td key={reactKey} className='text-neutral-500'>-</td>

              })}

            <td>{moment(entry.created_at).fromNow()}</td>
          </tr>

        ))}
      </tbody>
    </table>
  </>
  )
}

export default RenderTable