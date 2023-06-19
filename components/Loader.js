import React from 'react'
import { BeatLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="loader" style={{"display" : "flex", "justifyContent" : "center" }}>
            <BeatLoader
                color="white"
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loader