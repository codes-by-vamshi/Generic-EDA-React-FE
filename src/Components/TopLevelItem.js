import { useState } from 'react';
import '../css/topLevelItem.css';
import { BeatLoader } from 'react-spinners';
import { get5Rows } from '../Api/get5Rows';
import { getInfo } from '../Api/getInfo';
import { getPlots } from '../Api/getPlots';
export const TopLevelItem = ({ item, setMyItem, uniqueCode, colNamesIncluded, unClickable, handleImages }) => {
    const [loading, setLoading] = useState('');

    const itemClicked = async (val) => {
        if (unClickable) {
            return
        }
        setMyItem(val);
        setLoading(true);
        try {
            if (val === 'get5Rows') {
                const imgPaths = await get5Rows(uniqueCode, colNamesIncluded)
                handleImages(val, imgPaths)
            } else if(val === 'getInfo') {
                const imgPaths = await getInfo(uniqueCode, colNamesIncluded)
                handleImages(val, imgPaths)
            } else if(val === 'plotting') {
                const imgPaths = await getPlots(uniqueCode, colNamesIncluded)
                handleImages(val, imgPaths)
            }
        } catch (e) {

        }
        setLoading(false);
    }

    return (
        <div className='submit-btn-container'>
            <div className={`submit-btn ${item === 'get5Rows' ? 'selected' : ''} ${unClickable ? 'greyOut' : ''}`} onClick={() => itemClicked('get5Rows')}>
                {loading && item === 'get5Rows' ? (
                    <BeatLoader
                        size={10}
                        color={'#ffffff'}
                    />
                ) : (
                    'Get Top 5 Rows'
                )}
            </div>
            <div className={`submit-btn ${item === 'getInfo' ? 'selected' : ''} ${unClickable ? 'greyOut' : ''}`} onClick={() => itemClicked('getInfo')}>
                {loading && item === 'getInfo' ? (
                    <BeatLoader
                        size={10}
                        color={'#ffffff'}
                    />
                ) : (
                    'Get Info'
                )}
            </div>
            <div className={`submit-btn ${item === 'plotting' ? 'selected' : ''} ${unClickable ? 'greyOut' : ''}`} onClick={() => itemClicked('plotting')}>
                {loading && item === 'plotting' ? (
                    <BeatLoader
                        size={10}
                        color={'#ffffff'}
                    />
                ) : (
                    'Make Plots'
                )}
            </div>
        </div>
    )
}