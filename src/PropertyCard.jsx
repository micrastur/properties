import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { FaBookmark } from 'react-icons/fa';
import PropertyCardImage from './PropertyCardImage';

const PropertyCard = (props) => {
  const onSaveProperty = useCallback(
    () => props.onSave(props.propertyId),
    [
      props.propertyId,
      props.onSave,
    ]
  );

  return (
    <div className="border-2 bg-gray-50 grid grid-rows-1">
      <div className="relative">
        <PropertyCardImage
            photo={props.photo}
            address={props.address}
        />

        <button className="absolute top-0 right-2" title="Click to bookmark this property">
          <FaBookmark
            className={props.isSaved ? 'text-red-400' :'text-yellow-400'}
            size="40"
            onClick={onSaveProperty}
          />
        </button>

        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">{props.price}</p>
      </div>

      <div className="px-3 py-2">
        <p>{props.address}</p>
      </div>
    </div>
  )
};

PropertyCard.propTypes = {
  propertyId: PropTypes.string.isRequired,
  photo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([undefined]),
  ]),
  address: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default PropertyCard;
