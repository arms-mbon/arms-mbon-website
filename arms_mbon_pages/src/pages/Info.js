//this page will be displayed if the hash is not empty and contains #info
//this page will display the info for the selected dataset
//this page will filter the data based on the search term
//this page will display the data in a table
import React from "react";
import { useEffect } from "react";
import { DATA_SOURCES , fetchData } from "../constants/constants";
const Info = (props) => {

    //get the info from the hash
    //the info will be the part of the hash after #info/
    //the info will be the part of the hash before the first &
    //if there is no & in the hash, the info will be the part of the hash after #info/
    const filetoget = props.hash.split("#info/")[1].split("&")[0];
    const searchTerm = props.searchTerm;

    useEffect(() => {
        props.setLoading(true);
        fetchData(DATA_SOURCES[filetoget]).then((data) => {
            props.setData(data);
            props.setOriginalData(data);
            props.setLoading(false);
        }).catch((error) => {
            props.setError(error);
            props.setLoading(false);
        });
    }, [filetoget]);


    if (props.loading) {
        return (
            <>
                <main>
                    <h1>Info Page</h1>
                    <h3>current page: {props.hash}</h3>
                    <h3>search term: {searchTerm}</h3>
                    <h3>file to get: {filetoget}</h3>
                    <h3>loading...</h3>
                </main>
            </>
        )
    }



    return (
        <main>
            <h1>Info Page</h1>
            <h3>current page: {props.hash}</h3>
            <h3>search term: {searchTerm}</h3>
            <h3>file to get: {filetoget}</h3>
            {props.data.length === 0 && <h3>no data</h3>}
            {props.data.length > 0 && 
            <table className="infotable">
                <thead>
                    <tr>
                        {Object.keys(props.data[0]).map((key) => {
                            return (
                                <th>{key}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((row) => {
                        return (
                            <tr>
                                {Object.keys(row).map((key) => {
                                    //first check if the first characters of the string are http
                                    //if they are, return a link
                                    try {
                                        if (row[key].substring(0, 4) === "http") {
                                            return (
                                                <td><a href={row[key
                                                ]} target="_blank">{row[key]}</a></td>
                                            )
                                        }
                                    } catch (error) {
                                        return (
                                            <td>{row[key]}</td>
                                        )
                                    }
                                    return (
                                        <td>{row[key]}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            }
        </main>
        
    );
};

export default Info;
