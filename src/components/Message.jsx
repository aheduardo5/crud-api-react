/* eslint-disable react/prop-types */

export const Message = ({error}) => {
  return (
    <div className="alert alert-danger" role="alert">
    <strong>{`Data ${error.statusText}. Try again later`}</strong>
  </div>
  )
}
