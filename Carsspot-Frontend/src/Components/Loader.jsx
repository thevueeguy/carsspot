import Container from 'react-bootstrap/esm/Container'
import React from 'react'
import BeatLoader from "react-spinners/BeatLoader"
const Loader = () => {
  return (
    <Container fluid className="d-flex justify-content-center py-3">
    <BeatLoader
        color='black'
        
        loading={true}
        size={15}
        margin={2}
    >
        <span className='sr-only'>Loading...</span>
    </BeatLoader>
    </Container>
  )
}

export default Loader