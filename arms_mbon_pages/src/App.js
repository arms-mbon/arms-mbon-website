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
        <center><p><img src="https://github.com/arms-mbon/arms-mbon-website/raw/main/arms_mbon_pages/src/armslogo.png" alt="arms logos"/> <img src="https://github.com/arms-mbon/arms-mbon-website/raw/main/arms_mbon_pages/src/mbonlogo.jpg" width="150" height="80" alt="mbon logo"/></p></center>
        <center><p><img src="https://github.com/arms-mbon/arms-mbon-website/raw/main/arms_mbon_pages/src/ARMSmainpiccy.png" alt="arms unit"/><hspace></hspace></p></center>
      

        <center><h2 id="welcome-to-the-arms-mbon-landing-page-for-the-arms-mbon-github-space-">Welcome to the landing page for the ARMS-MBON GitHub</h2></center>
        <br></br>
        <p>ARMS-MBON is a European Marine Biodiversity Observation Network (MBON) of Autonomous Reef Monitoring Structures (ARMS). The ARMS units are placed in the vicinity of marine stations, ports, marinas, and long-term ecological research sites (LTER) distributed over Europe and polar regions. The units are emplaced for months at a time and are populated by the surrounding hard-bottom communities. Once the units are retrieved, the organisms that colonised them are sampled and analysed. The aim of ARMS-MBON is to assess the status of, and changes in, the hard-bottom communities of these near-coast environments, using DNA (metabarcoding), image, and visual inspection methods. The project started in 2018, and from 2023 it will continue as part of EMBRC&#39;s <a href="https://www.embrc.eu/emo-bon" target="_blank">EMO BON</a> (European Marine Omics Biodiversity Observation Network) project. The webpage for the ARMS-MBON can be found <a href="https://arms-mbon.org/" target="_blank">here</a>, and you can learn more by reading <a href="https://www.frontiersin.org/articles/10.3389/fmars.2020.572680/full" target="_blank">this paper in Frontiers in Marine Research</a>.  </p>
        <p><em>  This is the landing page for all the data of ARMS-MBON which we share via Github</em>. This GitHub space is where all the event, sampling, image, and omics metadata are uploaded, quality controlled, semantically annotated, combined, and shared with others. Large datafiles are not archived in this GitHub space, but the references (URLs, links) to them are. The scripts and intermediate products arising from the quality control and combining processes can also be found here. </p>
        <p>  Via the menu at the top of this page you can go directly to the GitHub repositories for </p>
        <ul>
          <li><a href="https://github.com/arms-mbon/Data" target="_blank"><strong>Data</strong></a>: the metadata that are harvested from our various sources, quality controlled (QCd), and then combined.</li>
          <li><a href="https://github.com/arms-mbon/Documentation" target="_blank"><strong>Documentation</strong></a>: the Handbook, Standard Operating Procedures, Data Management Plan, and an explanation of working with the ABS (Access and Benefit Sharing) permits. These are used by the ARMS-MBON partners in their field work.</li>
          <li><a href="https://github.com/arms-mbon/Templates" target="_blank"><strong>Templates</strong></a>: template files for data provision and for sample labels. These are used by the ARMS-MBON partners in their field work.</li>
          </ul>

          <br></br>
          <p className='purple'><em><strong><font size="+1.5">For an overview of all the ARMS-MBON sampling events to-date and their associated data...</font></strong></em></p>
          <p>...click on <font color="purple"><em><strong>Data Overview</strong></em></font> in the menu at the top. The four items in that drop-down menu send you directly to the combined data tables.  </p>
          <ul>
          <li><a href="https://arms-mbon.github.io/arms-mbon-website/#info/ObservatoryData" target="_blank"><em>Observatory data</em></a>: for the observatory coordinates.</li>
          <li><a href="https://arms-mbon.github.io/arms-mbon-website/#info/SamplingEventData" target="_blank"><em>Sampling event data</em></a>: for the metadata of each sampling event.</li>
          <li><a href="https://arms-mbon.github.io/arms-mbon-website/#info/OmicsData" target="_blank"><em>Omics data</em></a>: for the ENA accession numbers for the COI, ITS, and 18S sequences that have been produced to date.</li>
          <li><a href="https://arms-mbon.github.io/arms-mbon-website/#info/ImageData" target="_blank"><em>Image and observation data</em></a>: for the download links to the images and manual observations taken during each sampling event.</li>
          </ul>
          <br></br>
          <p><strong><font size="+1.5">The Data repository</font></strong></p>
          <p>The metadata on the ARMS units, the events, the material samples, the images, and the omics are provided here. We use <a href="https://www.ebi.ac.uk/ena/browser/">ENA</a> to store the actual raw sequence files, and <a href="https://plutof.ut.ee/en" target="_blank">PlutoF</a> to store the ARMS images. </p>
          <p>We have several data folders in the <a href="https://github.com/arms-mbon/Data" target="_blank">Data repository</a>:</p>
          <ul>
          <li><a href="https://github.com/arms-mbon/Data/tree/main/AnalysisData" target="_blank"><strong>Analysis data</strong></a> This will eventually hold results of the analysis of the omics data.</li>
          <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData" target="_blank"><strong>QualityControlledData</strong></a>
           <ul>  
            <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromGS" target="_blank"><em>FromGS</em></a>: We use a google sheet to record the metadata for all material samples that have been collected from the ARMS units, and the <a href="https://www.ebi.ac.uk/ena/browser/">ENA</a> accession numbers of the DNA sequences extracted from those samples. The multiple tabs of the google sheet are downloaded to this folder, and subjected to some basic QC (checking the values are formatted correctly and are as expected). </li>
            <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromPlutoF" target="_blank"><em>FromPlutoF</em></a>: We use <a href="https://plutof.ut.ee/en" target="_blank">PlutoF</a> as the data management platform to record metadata about each sampling event, and to store the images and manual observations made during the sampling events. All these metadata and the links to the images and manual observations are downloaded to this folder and subjected to some basic QC. The metadata are organised in a set of CSV files (event, sample, and associated data) in a separate folder per station, with the metadata from all stations combined into a larger set of &quot;all data&quot; CSV files which can be found in this <em>FromPlutoF</em> folder.</li>
            <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/Combined" target="_blank"><em>Combined</em></a>: After the QC checks have been passed on the GS and PlutoF data, these are combined to produce the following four spreadsheets (which you can also get to via the <strong>Data Overview</strong> menu item)</li>
             <ul>
               <li><a href="https://github.com/arms-mbon/Data/blob/main/QualityControlledData/Combined/combined_ObservatoryData.csv" target="_blank"><em>Observatory data</em></a>: the list of observatories participating in the network, their coordinates, IDs, and various characteristics of each area.</li>
               <li><a href="https://github.com/arms-mbon/Data/blob/main/QualityControlledData/Combined/combined_SamplingEventData.csv" target="_blank"><em>Sampling event data</em></a>: a list of all the sampling events along with the metadata of each event. The number of associated data files for each event are also given here, but the links to the images/manual observation spreadsheets themselves are in the next spreadsheet.</li>
               <li><a href="https://github.com/arms-mbon/Data/blob/main/QualityControlledData/Combined/combined_OmicsData.csv" target="_blank"><em>Omics data</em></a>: a list of all the material samples collected and analysed by metabarcoding, and their ENA accession numbers for the COI, ITS, and 18S sequences that have been produced.</li>
               <li><a href="https://github.com/arms-mbon/Data/blob/main/QualityControlledData/Combined/combined_ImageData.csv" target="_blank"><em>Image and observation data</em></a>: a list of the images taken and manual observations recorded during each sampling event, and links (URLs) to download those.</li>
             </ul>
            <li><a href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromENA" target="_blank"><em>FromENA</em></a> In preparation, please ignore. </li>
           </ul>
        </li>
         <li><a href="https://github.com/arms-mbon/Data/tree/main/ReformattedData" target="_blank"><strong>Reformatted data</strong></a> This is for data that are provided to specific external data users, in specific formats.</li>
        </ul>
        <br></br>
        <p>For the present, that is it :-). To access the data, click on whichever link (from the menu or the text here) to get to the GitHub repo/folder or directly to the spreadsheets. ENJOY!</p>
        <br></br>
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