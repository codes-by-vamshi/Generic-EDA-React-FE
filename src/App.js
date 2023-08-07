import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { uploadCsvFile } from './Api/uploadCsv';
import { TopLevelItem } from './Components/TopLevelItem';
import { Get5Rows } from './Components/Get5Rows';
import { GetInfo } from './Components/GetInfo';
import { MakePlots } from './Components/MakePlots';
function App() {
  const csvFileInputRef = useRef(null);
  const [csvState, setCsvState] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [colNamesIncluded, setColNamesIncluded] = useState('');
  const [colNames, setColNames] = useState('');
  const [apiImages, setApiImages] = useState('');
  const [topLevelItem, setTopLevelItem] = useState('');

  const generateUniqueCode = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const uniqueCode = timestamp + random;
    return uniqueCode;
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCsvState(file);
  };

  const setColIncludedStatus = async (val) => {
    setColNamesIncluded(val);
    setColNames('');
    setApiImages('');
    setTopLevelItem('');

    const uniqueCodeGenerated = generateUniqueCode();
    setUniqueCode(uniqueCodeGenerated);
    try {
      if (csvState) {
        const myColNames = await uploadCsvFile(csvState, uniqueCodeGenerated, val);
        setTimeout(() => {
          setColNames(myColNames);
        }, 500) // Did this so I can block user from clicking as soon as he selects Yes or No
      }
    } catch (e) {
      //
    }
  }

  const setTopLevelItemWrapper = (val) => {
    setApiImages('');
    setTopLevelItem(val);
  }

  const handleImages = (key, imgPaths) => {
    setApiImages({
      [key]: imgPaths,
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Generic Exploratory Data Analysis</h1>
        <h2>Developed by Sai Krishna Vamshi Devarasetty</h2>
        <div>Please email at dskvamshi1998@gmail.com for reporting bugs, suggestions and feedbacks</div>
        <br />

        <div className='upload-btn' onClick={() => csvFileInputRef.current.click()}>
          <FontAwesomeIcon icon={faCloudArrowUp} style={{ color: "#ffffff", }} />
          <span className='upload-btn-txt'>UPLOAD CSV</span>
        </div>
        <input
          type="file"
          accept=".csv"
          ref={csvFileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        {Boolean(csvState) && <div className='uploaded-file-txt'><span style={{ color: '#fff' }}>File Uploaded: </span> {csvState.name}</div>}

        <div className='column--names-included'>
          <div>Does 1st row in csv has column names ?</div>
          <div className='radio-btn-container'>
            <label className={`radio-btn ${colNamesIncluded === true ? 'selected' : ''}`}>
              <input
                type="radio"
                value="Yes"
                checked={colNamesIncluded === true}
                onChange={(event) => { setColIncludedStatus(true); }}
              />
              Yes
            </label>
            <label className={`radio-btn ${colNamesIncluded === false ? 'selected' : ''}`}>
              <input
                type="radio"
                value="No"
                checked={colNamesIncluded === false}
                onChange={(event) => { setColIncludedStatus(false); }}
              />
              No
            </label>
          </div>
        </div>

        <TopLevelItem
          item={topLevelItem}
          setMyItem={setTopLevelItemWrapper}
          uniqueCode={uniqueCode}
          colNamesIncluded={colNamesIncluded}
          unClickable={!(csvState && colNamesIncluded.toString())}
          handleImages={handleImages}
        />

        {topLevelItem === 'get5Rows' && <Get5Rows apiImages={apiImages} />}
        {topLevelItem === 'getInfo' && <GetInfo apiImages={apiImages} />}
        {topLevelItem === 'plotting' && <MakePlots apiImages={apiImages} />}
      </header>
    </div>
  )
}

export default App;
