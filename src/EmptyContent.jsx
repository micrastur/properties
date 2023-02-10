import { memo } from "react";

const EmptyContent = () => (
  <div className="full-h">
    <p className='text-2xl font-medium'>No property found</p>
  </div>
)

export default memo(EmptyContent);
