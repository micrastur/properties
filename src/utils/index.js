import { PROPERTIES_FIELDS } from "../constants/common";

const isDataArray = (data) => Array.isArray(data);

const getDefaultProperty = (property) => ({
  ...property,
  [PROPERTIES_FIELDS.PROPERTY_ID]: property[PROPERTIES_FIELDS.PROPERTY_ID]?.toString() || '',
  [PROPERTIES_FIELDS.SHORT_DESCRIPTION]: property[PROPERTIES_FIELDS.SHORT_DESCRIPTION] || '',
  [PROPERTIES_FIELDS.DISPLAY_ADDRESS]: property[PROPERTIES_FIELDS.DISPLAY_ADDRESS] || '',
  [PROPERTIES_FIELDS.PRICE]: property[PROPERTIES_FIELDS.PRICE] || '',
  [PROPERTIES_FIELDS.PHOTOS]: property[PROPERTIES_FIELDS.PHOTOS] || [],
})

export const getPropertiesMapper = (properties) => properties && isDataArray(properties)
  ? properties.reduce((mapper, property) => ({
      ...mapper,
      [property[PROPERTIES_FIELDS.PROPERTY_ID]]: property,
  }), {})
  : {};

export const getPropertiesDescriptions = (properties) => {
  let descriptionsData = [];

  if (properties && isDataArray(properties)) {
    descriptionsData = properties?.reduce((existingDescriptions, property) => {
      const { short_description, property_id } = property;

      const existingPropertyDescription = short_description
        && typeof short_description === 'string'
        && short_description?.length > 0;

      return existingPropertyDescription
        ? [
          ...existingDescriptions,
          {
            property_id,
            short_description,
          }
        ]
        : existingDescriptions
      }, []);
  }

  return descriptionsData;
};

const handleError = (error) => {
  console.log(error.message);
}

export const fetchProperties = () => fetch('/property-data.json')
  .then(async(response) => {
    const data = await response.json();
    const propertiesElements = data?.result?.properties?.elements;

    if (propertiesElements && isDataArray(propertiesElements)) {
      return propertiesElements.map((element) => getDefaultProperty(element));
    } else {
      throw new Error('No data provided');
    }
  })
  .catch((error) => handleError(error));

export const getIndexOfItem = ({ data, item }) => data.indexOf(item);

export const getUpdatedArrayAfterRemove = ({
  data,
  itemToRemove
}) => {
  let updatedData = [];

  if (isDataArray(data)) {
    const removedItemIndex = getIndexOfItem({ data, item: itemToRemove});

    updatedData =  [
      ...data.slice(0, removedItemIndex),
      ...data.slice(removedItemIndex + 1),
    ]
  }

  return updatedData;
};

export const getOrderedSavedProperties = ({savedPropertiesIds, allPropertiesIds}) => allPropertiesIds
  .filter((propertyId) => savedPropertiesIds.includes(propertyId)
);
