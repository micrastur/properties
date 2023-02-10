import { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { PROPERTIES_FIELDS } from './constants/common';

function SearchBox(props) {
  const [searchInputState, setSearchInputState] = useState('');

  useEffect(() => {
    let searchedPropertiesIds = [];

    if(searchInputState) {
      props.properties.forEach((property) => {
        if (property[PROPERTIES_FIELDS.SHORT_DESCRIPTION].indexOf(searchInputState) !== -1) {
          searchedPropertiesIds.push(property[PROPERTIES_FIELDS.PROPERTY_ID]);
        }
      })
    } else {
      searchedPropertiesIds = props.allPropertiesIds;
    }
    props.onSearch(searchedPropertiesIds);
  }, [
    searchInputState,
    props.allPropertiesIds,
    props.onSearch
  ])

  const onChangeSearchInput = useCallback(
    (e) => setSearchInputState(e.target.value),
    [setSearchInputState]
  );

  const arePropertiesLoaded = props?.properties
    && Array.isArray(props?.properties)
    && props?.properties?.length > 0

  return (
    <div className="mt-5 relative">
      <input
        placeholder="Enter a search term"
        className="px-5 py-3 border-gray-400 border rounded w-full"
        value={searchInputState}
        onChange={onChangeSearchInput}
        disabled={!arePropertiesLoaded}
      />

      <FaSearch className="absolute top-3.5 right-3.5 text-gray-400" size={20} />
    </div>
  );
};

SearchBox.defaultProps = {
  properties: [],
};

SearchBox.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape({
    property_id: PropTypes.string || PropTypes.number,
    short_description: PropTypes.string,
  })),
  onSearch: PropTypes.func.isRequired,
  allPropertiesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default memo(SearchBox);
