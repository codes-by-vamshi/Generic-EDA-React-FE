import { API_ENDPOINT } from '../Api/ApiConstants'
import '../css/makePlots.css'

export const MakePlots = ({ apiImages }) => {
    if (!!!apiImages['plotting']) return null
    return (
        <div className='plotting-container'>
            {apiImages['plotting'].map((data, index) => {
                if (index === 0) {
                    return <div>
                        <div>Histogram's showing Frequency Distribution of Numerical Columns</div>
                        <img src={`${API_ENDPOINT}/api/images/${data}`} />
                    </div>

                } else if (index === 1) {
                    return <div>
                        <div>Heatmap showing correlation among Numerical Columns</div>
                        <img src={`${API_ENDPOINT}/api/images/${data}`} />
                    </div>

                } else if (index === 2) {
                    return <div>
                        <div>Following are plots showing distribution of Categorical Columns</div>
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