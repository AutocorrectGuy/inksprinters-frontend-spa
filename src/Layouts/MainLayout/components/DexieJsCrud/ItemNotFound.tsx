
const ItemNotFound = (itemName: { itemName: string }) =>
  <div className='grow flex flex-col items-center justify-center'>
    <span className='text-2xl text-neutral-500'>{`No ${itemName} found`}</span>
  </div>

export default ItemNotFound