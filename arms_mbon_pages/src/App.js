import './App.css';
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';
import Info from './pages/Info';
import ReactMarkdown from 'react-markdown';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
function App() {
  const [data, setData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  //have a function here that monitors the hash and changes the page accordingly
  const [page, setPage] = useState(window.location.hash);
  function changePage() {
    setPage(window.location.hash);
  }
  useEffect(() => {
    window.addEventListener("hashchange", changePage);
    return () => {
      window.removeEventListener("hashchange", changePage);
    };
  }, []);

  //useffect that will trigger when the hash is changed
  //this will change the page to the page in the hash
  useEffect(() => {
    if (searchTerm != "") {
      //check if has contains searchterm
      if (window.location.hash.includes("searchterm")) {
        //if it does, replace the search term with the new search term
        window.location.hash = window.location.hash.replace(/searchterm=([^&]*)/, "searchterm=" + searchTerm);
        return;
      }else{
        window.location.hash = window.location.hash + "&searchterm=" + searchTerm;
      }
    }
  }, [page]);

  //useEffect that will trigger when the search term changes
  //this will change the hash to "currenthash"&"searchterm"=searchterm
  useEffect(() => {
    console.log("search term changed");
    console.log(searchTerm);
    console.log(window.location.hash);
    if (searchTerm !== "") {
      //check if the hash is not empty 
      if (window.location.hash == "") {
        //if it is not empty, add the search term to the hash
        window.location.hash = window.location.hash + "#info/AllOverview&searchterm=" + searchTerm;
        return;
      }
      //check if the hash already has a search term
      if (window.location.hash.includes("searchterm")) {
        //if it does, replace the search term with the new search term
        window.location.hash = window.location.hash.replace(/searchterm=([^&]*)/, "searchterm=" + searchTerm);
        return;
      }
      //if it doesn't, add the search term to the hash
      else{
        window.location.hash = window.location.hash + "&searchterm=" + searchTerm;
      }
    }
    else {
      window.location.hash = window.location.hash.replace(/&searchterm=([^&]*)/, "");
    }
  }, [searchTerm]);

  //useEffect that will trigger when the search term changes
  //this will look into the data and return the data that matches the search term
  useEffect(() => {
    console.log("search term changed");
    console.log(searchTerm);
    if (searchTerm !== "") {
      //check if the data is not empty
      if (originalData !== null) {
        //if it is not empty, go over each row in the array and check if the term is present in the dictionary
        //if it is, add it to the filtered originalData
        let filteredData = [];
        for (let i = 0; i < originalData.length; i++) {
          for (let key in originalData[i]) {
            try {
              const value = originalData[i][key].toUpperCase();
              const term = searchTerm.toUpperCase();
              if (value.includes(term)) {
                filteredData.push(originalData[i]);
                break;
              }
            }catch(err){
              continue;
            }
          }
        }
        //set the originalData to the filtered originalData
        setData(filteredData);
      }
    }
    else {
      //if the search term is empty, set the data back to the original data
      setData(originalData);
    }
  }, [searchTerm, originalData]);


  //return the page based on the hash 
  //if hash is empty, return home page
  //if hash is #about, return about page
  //if hash contains #info, return info page
  //if anything else, return 404 page
  if (page === "") {
    return (
      <>
      <NavBar searchTerm={searchTerm}  setSearchTerm={setSearchTerm}/>
        <main className='textlandingpage'>
        <h2 id="welcome-to-the-arms-mbon-landing-page-for-the-arms-mbon-github-space-">Welcome to the landing page for the ARMS-MBON GitHub</h2>
        <br></br>
        <p>  ARMS-MBON is a European Biodiversity Observation Network (MBON) of Autonomous Reef Monitoring Structures (ARMS) placed in the vicinity of marine stations, ports, marinas, and long-term ecological research sites (LTER) distributed over Europe and polar regions. The units are emplaced for months at a time and are populated by the surrounding hard-bottom communities, which are then analysed when the units are retrieved. The aim of ARMS-MBON is to assess the status of, and changes in, the hard-bottom communities of these near-coast environments, using DNA, image, and visual inspection methods. The project started in 2018, and from 2023 it will continue as part of EMBRC&#39;s <a href="https://www.embrc.eu/emo-bon" target="_blank">EMO BON</a> project. The webpage for the ARMS-MBON can be found <a href="https://arms-mbon.org/" target="_blank">here</a>, and you can learn more by reading <a href="https://www.frontiersin.org/articles/10.3389/fmars.2020.572680/full" target="_blank">this paper in Frontiers</a>.  </p>
        <p><em>  This is the landing page for all the data of ARMS-MBON, which we share via Github</em>. This GitHub space is where all the data are uploaded, quality controlled, semantically annotated, combined, and shared with others. As well as sharing all the ARMS-MBON outputs, the scripts and intermediate products arising from the quality control and combining processes can be found here. </p>
        <p>  Via the menu at the top of this page you can go directly to the GitHub repositories for </p>
        <ul>
          <li><strong>Data</strong> the data that are harvested from our various data sources, quality controlled (QCd), and then combined. These are mostly CSV files, with references to associated image and DNA data files.</li>
          <li><strong>Documentation</strong> the Handbook, SOPs, Data Management Plan, and ABS explanation. These are used by the ARMS-MBON partners in their field work.</li>
          <li><strong>Templates</strong> template CSV files for data provision and for sample labels. These are used by the ARMS-MBON partners in their field work.</li>
          </ul>

          <br></br>
          <p className='purple'><em><strong>For an overview of all the ARMS-MBON sampling events to-date, and their associated data...</strong></em></p>
          
          <p>...click on <strong>Data overview</strong> at the top menu. The four items listed there take you directly to the tables created from the combined data in the <a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/Combined" target="_blank">Combined data</a> repository.  </p>
          <ul>
          <li><em>Observatory data</em> for the observatory coordinates</li>
          <li><em>Sampling event data</em> for the metadata of each sampling event</li>
          <li><em>Image data</em> for links to the images taken during each sampling event.</li>
          <li><em>Omics data</em> for the ENA accession numbers for the COI, ITS, and 18S sequences that have been produced to date.</li>
          </ul>
          
          <p><strong>The Data repository</strong></p>
          <p>We have several folders in the <a href="https://github.com/arms-mbon/Data" target="_blank">Data repository</a>:</p>
          <ul>
          <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData" target="_blank"><strong>QualityControlledData</strong></a>
           <ul>  
            <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromGS" target="_blank"><em>FromGS</em></a>: We use a google sheet to record the material samples that have been collected from the ARMS units, and the <a href="https://www.ebi.ac.uk/ena/browser/">ENA</a> accession numbers of the DNA data extracted from those samples. The multiple tabs of the google sheet is downloaded here and subjected to some basic QC (checking the values are formatted correctly and are as expected). In this folder you will find the google sheets (four CSV files) and the QC outputs. </li>
            <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromPlutoF" target="_blank"><em>FromPlutoF</em></a>: We use <a href="https://plutof.ut.ee/en">PlutoF</a> as the data management platform to record metadata about each sampling event, and to store the images and manual observations made during the sampling events. These are downloaded, again subjected to some basic QC, and organised as a set of CSV files per station and one set of &quot;all data&quot; CSV files.</li>
            <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/Combined" target="_blank"><em>Combined</em></a>: After the QC checks have been passed on the GS and PlutoF data, these are combined to produce the following four spreadsheets (which can you also get to via the <strong>Data Overview</strong> menu item)</li>
             <ul>
               <li><em>Observatory data</em>: the observatory information such as their IDs, the ARMS unit IDs, locations, depths, habitat information.</li>
               <li><em>Sampling event data</em>: the dates, observatory and ARMS unit IDs, and associated information for each sampling event that has been performed to date. The number of associated data files (which are mostly images) are also given here, but links to the image themselves are in the next spreadsheet.</li>
               <li><em>Image data</em>: for each sampling event, the filenames and links (URLs) to the image files.</li>
               <li><em>Omics data</em>: the ENA accession numbers for the COI, ITS, and 18S sequences that have been produced to date, together with their negative control accession numbers and sample/event IDs.</li>
             </ul>
            <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromENA" target="_blank"><em>FromENA</em></a> Empty, ignore. </li>
           </ul>
        </li>
        <li><a href="https://github.com/arms-mbon/Data/tree/main/AnalysisData" target="_blank"><strong>Analysis data</strong></a> This will eventually to hold results of the analysis of the DNA data (empty at present).</li>
        <li><a href=""><strong>ReformattedData</strong></a> This is for ARMS data that are formatted for external data portals.</li>
        </ul>
        <br></br>
        <p>For the present, that is it :-). To access the data, click on whichever link (from the menu or the text here) to get to the GitHub repo/folder or directly to the spreadsheets. ENJOY!</p>
        <br></br>
        </main>
      </>
    );
  }
  if (page.includes("#info")) {
    return (
      <>
        <NavBar searchTerm={searchTerm}  setSearchTerm={setSearchTerm}/>
        <Info 
          hash={page} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          loading={loading}
          setLoading={setLoading}
          data={data}
          setData={setData}
          error={error}
          setError={setError}
          setOriginalData={setOriginalData}
        />
      </>
    );
  }
  return (  
    <>
      <main>
        <h1>404 Page</h1>
        <h1>current page {page}</h1>
      </main>
    </>
  );
}

export default App;