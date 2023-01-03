import './App.css';
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';
import Info from './pages/Info';
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
        <main>
          <h1>Welcome to the arms mbon landing page</h1>
          //markdown goes in here
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