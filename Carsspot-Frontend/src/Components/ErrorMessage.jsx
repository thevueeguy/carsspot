import React from 'react'
import { Alert } from "react-bootstrap"
const ErrorMessage = ({ children, variant }) => {
  return (
    <div className="col-lg-7">
        <Alert variant={variant}>{children}</Alert>
    </div>
  )
}

ErrorMessage.defaultProps = {
  variant: "info"
}

export default ErrorMessage