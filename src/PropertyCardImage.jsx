import PropTypes from 'prop-types';

const PropertyCardImage = (props) => (
  <>
    {
        props.photo
        ? <img src={`https://mr0.homeflow.co.uk/${props.photo}`} alt={props.address} />
        : <div className='h-full flex justify-center items-center'>
            <p className='text-lg'>No Image Provided</p>
          </div>
    }
  </>
);

PropertyCardImage.propTypes = {
  photo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([undefined]),
  ]),
  address: PropTypes.string.isRequired,
};

export default PropertyCardImage;