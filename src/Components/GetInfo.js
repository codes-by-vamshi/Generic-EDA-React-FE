import { API_ENDPOINT } from '../Api/ApiConstants'
import '../css/getInfo.css'

export const GetInfo = ({ apiImages }) => {
    if (!!!apiImages['getInfo']) return null
    return (
        <div className='getInfo-container'>
            {apiImages['getInfo'].map((data, index) => {
                if (index === 0) {
                    return <div>
                        <div>Null Value Count of Each column</div>
                        <img src={`${API_ENDPOINT}/api/images/${data}`} />
                    </div>

                } else if (index === 1) {
                    return <div>
                        <div>Description of Numerical Variables</div>
                        <img src={`${API_ENDPOINT}/api/images/${data}`} />
                    </div>

                } else {
                    return <div>
                        <img src={`${API_ENDPOINT}/api/images/${data}`} />
                    </div>

                }
            })}
        </div>
    )

}