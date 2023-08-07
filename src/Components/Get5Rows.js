import '../css/get5Rows.css'

export const Get5Rows = ({apiImages}) => {
    if (!!!apiImages['get5Rows']) return null
    return (
        <div className='dhHead-container'>
            <div>Showing Top 5 Rows of all columns</div>
            {apiImages['get5Rows'].map((data, index) => <img src={`http://localhost:5000/api/images/${data}`} />)}
        </div>
    )

}