import { Spinner } from "react-bootstrap";
const Loader = () => {
    return (
        <div style={{marginTop: '250px', marginLeft: '50%'}}>
            <Spinner animation="grow" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader