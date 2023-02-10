import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { PROPERTIES_FIELDS } from './constants/common';
import EmptyContent from './EmptyContent';
import Header from './Header';
import PropertyCard from './PropertyCard';
import SearchBox from './SearchBox';
import { fetchProperties, getIndexOfItem, getOrderedSavedProperties, getPropertiesDescriptions, getPropertiesMapper, getUpdatedArrayAfterRemove } from './utils';

const App = () => {
  const [propertiesState, setPropertiesState] = useState(null);
  const [savedPropertiesIdsState, setSavedPropertiesIdsState] = useState([]);
  const [searchedPropertiesState, setSearchedPropertiesState] = useState([]);

  const propertiesMapper = useMemo(
    () => getPropertiesMapper(propertiesState),
    [propertiesState]
  );

  const allPropertiesIds = useMemo(
    () => propertiesState
      ? propertiesState.map((property) => property[PROPERTIES_FIELDS.PROPERTY_ID])
      : [],
    [propertiesState]
  );

  const propertiesDescriptions = useMemo(
    () => getPropertiesDescriptions(propertiesState),
    [propertiesState]
  );

  const fetchPropertyData = useCallback(
    () => fetchProperties()
      .then((data) => {
          setPropertiesState(data);
          setSearchedPropertiesState(data);
      }),
    []
  );

  useEffect(() => {
    if (propertiesState === null) {
      fetchPropertyData();
    } 
  }, [
    propertiesState,
    fetchPropertyData
  ]);

  const onSearchProperties = useCallback((propertiesIds) => {
    if (propertiesIds.length !== searchedPropertiesState.length) {
      const searchedProperties = propertiesIds.map((propertyId) => propertiesMapper[propertyId])

      setSearchedPropertiesState(searchedProperties);
    }
  }, [
    searchedPropertiesState,
    propertiesMapper
  ]);

  const onSaveProperty = useCallback((triggeredPropertyId) => {
    let updatedSavedPropertiesIds = [];
    const triggeredPropertyIdIndex =  getIndexOfItem({
      data: savedPropertiesIdsState,
      item: triggeredPropertyId
    });

    if ( triggeredPropertyIdIndex !== -1) {
      updatedSavedPropertiesIds = getUpdatedArrayAfterRemove({
        data: savedPropertiesIdsState,
        itemToRemove: triggeredPropertyId,
      })
    } else {
      /*
      * orderedSavedProperties gets filtered properties ids by sequence
      * in case there is "show only saved properties" filter to keep an order in UI
      */
      updatedSavedPropertiesIds = getOrderedSavedProperties({
        savedPropertiesIds: [...savedPropertiesIdsState, triggeredPropertyId],
        allPropertiesIds,
      });
    }

    setSavedPropertiesIdsState(updatedSavedPropertiesIds);
  }, [
    allPropertiesIds,
    savedPropertiesIdsState
  ])

  return (
    <div className="container mx-auto min-h-full my-5">
      <Header>
        <SearchBox
          allPropertiesIds={allPropertiesIds}
          properties={propertiesDescriptions}
          onSearch={onSearchProperties}
        />
      </Header>

        {searchedPropertiesState.length > 0
          ? <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchedPropertiesState?.map(
                (property) => <PropertyCard
                  key={property[PROPERTIES_FIELDS.PROPERTY_ID]}
                  propertyId={property[PROPERTIES_FIELDS.PROPERTY_ID].toString()}
                  photo={property[PROPERTIES_FIELDS.PHOTOS]?.[0]}
                  address={property[PROPERTIES_FIELDS.DISPLAY_ADDRESS]}
                  price={property[PROPERTIES_FIELDS.PRICE]}
                  isSaved={savedPropertiesIdsState.includes(property[PROPERTIES_FIELDS.PROPERTY_ID])}
                  onSave={onSaveProperty}
                />
              )}
            </div>
          : <EmptyContent />
        }
    </div>
  );
}

export default memo(App);
