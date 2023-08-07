import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { BeatLoader } from 'react-spinners';

function App() {
  const [csvFile, setCsvFile] = useState('');
  const [colNamesIncluded, setColNamesIncluded] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgPaths, setImgPaths] = useState([])
  const [plot, setPlot] = useState('');
  const [viz, setViz] = useState('');
  const [vizLoading, setVizLoading] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');
  const [col, setCol] = useState([])
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    setImgPaths([]);
    setColNamesIncluded('');
    setPlot('')
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCsvFile(file)
  };

  const generateUniqueCode = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const uniqueCode = timestamp + random;
    return uniqueCode;
  }

  const uploadCsvFile = async (comp) => {
    setPlot(comp);
    setImgPaths([])
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', csvFile);
      let uniqueCodeGenerated = uniqueCode;
      if (['ShowTop5Rows', 'GetInfo', 'DoPlotting'].includes(comp)) {
        uniqueCodeGenerated = generateUniqueCode()
      }
      if (comp === 'ShowTop5Rows') {
        const resp = await axios.post('http://localhost:5000/api/basic', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Unique-Identity': uniqueCodeGenerated,
            'Col-Names-Included': colNamesIncluded,
          },
        });
        setImgPaths(resp.data);
      } else if (comp === 'GetInfo') {
        const resp = await axios.post('http://localhost:5000/api/basicInfo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Unique-Identity': uniqueCodeGenerated,
            'Col-Names-Included': colNamesIncluded,
          },
        });
        setImgPaths(resp.data);
      } else if (comp === 'DoPlotting') {
        const resp = await axios.post('http://localhost:5000/api/startPloting', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Unique-Identity': uniqueCodeGenerated,
            'Col-Names-Included': colNamesIncluded,
          },
        });
        setCol(resp.data);
      }
      setPlot(comp);
      setUniqueCode(uniqueCodeGenerated);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const getViz = async (viz) => {
     setViz(viz)
     try {
      setVizLoading(true)
      if(viz === "PieChart") {
        const formData = {
          type: viz,
          selectedCol: col[0]
        }
        const resp = await axios.post('http://localhost:5000/api/getPlot', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Unique-Identity': uniqueCode,
          },
        });
      }
      setVizLoading(false)
     } catch(error) {
      setVizLoading(false)
     }
  }

  useEffect(() => {
    setImgPaths([])
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Generic Exploratory Data Analysis</h1>
        <h2>Developed by Sai Krishna Vamshi Devarasetty</h2>
        <div>Please email at dskvamshi1998@gmail.com for reporting bugs, suggestions and feedbacks</div>
        <br />

        <div className='upload-btn' onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faCloudArrowUp} style={{ color: "#ffffff", }} />
          <span className='upload-btn-txt'>UPLOAD CSV</span>
        </div>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        {Boolean(csvFile) && <div className='uploaded-file-txt'><span style={{ color: '#fff' }}>File Uploaded: </span> {csvFile.name}</div>}

        <div className='column--names-included'>
          <div>Does 1st row in csv has column names ?</div>
          <div className='radio-btn-container'>
            <label className={`radio-btn ${colNamesIncluded === 'Yes' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="Yes"
                checked={colNamesIncluded === true}
                onChange={(event) => { setColNamesIncluded(true); setImgPaths([]);  setPlot('');}}
              />
              Yes
            </label>
            <label className={`radio-btn ${colNamesIncluded === 'No' ? 'selected' : ''}`}>
              <input
                type="radio"
                value="No"
                checked={colNamesIncluded === false}
                onChange={(event) => { setColNamesIncluded(false); setImgPaths([]); setPlot('');}}
              />
              No
            </label>
          </div>
        </div>
        <div className='submit-btn-container'>
          <div className={`submit-btn ${plot === 'ShowTop5Rows' ? 'selected' : ''}`} onClick={() => uploadCsvFile('ShowTop5Rows')}>
            {loading && plot === 'ShowTop5Rows' ? (
              <BeatLoader
                size={10}
                color={'#ffffff'}
              />
            ) : (
              'Get Top 5 Rows'
            )}
          </div>
          <div className={`submit-btn ${plot === 'GetInfo' ? 'selected' : ''}`} onClick={() => uploadCsvFile('GetInfo')}>
            {loading && plot === 'GetInfo' ? (
              <BeatLoader
                size={10}
                color={'#ffffff'}
              />
            ) : (
              'Get Info'
            )}
          </div>
          <div className={`submit-btn ${plot === 'DoPlotting' ? 'selected' : ''}`} onClick={() => uploadCsvFile('DoPlotting')}>
            {loading && plot === 'DoPlotting' ? (
              <BeatLoader
                size={10}
                color={'#ffffff'}
              />
            ) : (
              'Make Plots'
            )}
          </div>
        </div>

        {plot === 'ShowTop5Rows' && Boolean(imgPaths?.length) && <div className='dhHead-container'>
          <div>Showing Top 5 Rows of all columns</div>
          {imgPaths.map((data, index) => <img src={`http://localhost:5000/api/images/${uniqueCode}/dfHead/${index}.png`} />
          )}</div>}
        {plot === 'GetInfo' && Boolean(imgPaths?.length) && <div className='dhHead-container'>
          <div>
            <div>Null Value Count of Each column</div>
            <img src={`http://localhost:5000/api/images/${uniqueCode}/details/nullInfo.png`} />
          </div>
          <div>
            <div>Description of Numerical Variables</div>
            <img src={`http://localhost:5000/api/images/${uniqueCode}/details/describe.png`} />
          </div>
        </div>}
        {plot === 'DoPlotting' && Boolean(col?.length) && <div className='dhHead-container'>
          <div>Lets do some plotting</div>
          <div className='viz-btn-container'>
            <div className='viz-btn' onClick={() => getViz('PieChart')}>
              {vizLoading && viz === 'PieChart' ? (
                <BeatLoader
                  size={10}
                  color={'#ffffff'}
                />
              ) : (
                'Pie Chart'
              )}
            </div>
            <div className='viz-btn' onClick={() => getViz('BarChart')}>
              {vizLoading && viz === 'BarChart' ? (
                <BeatLoader
                  size={10}
                  color={'#ffffff'}
                />
              ) : (
                'Bar Chart'
              )}
            </div>
            <div className='viz-btn' onClick={() => getViz('BoxPlot')}>
              {vizLoading && viz === 'BoxPlot' ? (
                <BeatLoader
                  size={10}
                  color={'#ffffff'}
                />
              ) : (
                'Box Plot'
              )}
            </div>
          </div>
        </div>}
      </header>
    </div>
  );
}

export default App;
