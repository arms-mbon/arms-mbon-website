import axios from 'axios';

// all urls to data sources that need to be fetched are stored here
export const DATA_SOURCES = {
    "JSON_PLUTOF": "https://raw.githubusercontent.com/arms-mbon/Data/main/QualityControlledData/FromPlutoF/AllARMSPlutof.json",
    "AllSequences": "https://raw.githubusercontent.com/arms-mbon/Data/main/QualityControlledData/FromPlutoF/AllSequences.csv",
    "AllAccociatedData": "https://raw.githubusercontent.com/arms-mbon/Data/main/QualityControlledData/FromPlutoF/AllAssociatedData.csv",
    "AllMaterialSamples": "https://raw.githubusercontent.com/arms-mbon/Data/main/QualityControlledData/FromPlutoF/AllMaterialSamples.csv",
    "AllObservations": "https://raw.githubusercontent.com/arms-mbon/Data/main/QualityControlledData/FromPlutoF/AllObservations.csv",
    "AllOverview": "https://raw.githubusercontent.com/arms-mbon/Data/main/QualityControlledData/FromPlutoF/AllOverview.csv"
}

// functions to fetch data from the data sources
export const fetchData = async (url) => {
    const response = await axios.get(url);
    //check if data is in csv format or json format
    if (url.includes(".csv")) {
        return csvJSON(response.data);
    }
    return response.data;
}

// function that converts csv return data to json
export const csvJSON = (csv) => {
    var lines = csv.split("\n");
    var result = [];    
    var headers = lines[0].split(",");
    for(var i = 1; i < lines.length; i++){
        var obj = {};
        var currentline = lines[i].split(",");
        for(var j = 0; j < headers.length; j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}


