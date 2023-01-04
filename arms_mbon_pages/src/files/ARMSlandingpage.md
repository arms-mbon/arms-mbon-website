## Welcome to the ARMS-MBON landing page for the ARMS-MBON GitHub space. 

The European ARMS programme (ARMS-MBON) is a Biodiversity Observation Network (MBON) of Autonomous Reef Monitoring Structures (ARMS) placed in the vicinity of marine stations, ports, marinas, and long-term ecological research sites (LTER) distributed over Europe and polar regions. The aim of ARMS-MBON is to assess the status of, and changes in, hard-bottom communities of near-coast environments, using DNA, image, and visual inspection methods. The project started in 2018; in 2023 it will continue as part of EMBRC's [EMO BON](https://www.embrc.eu/emo-bon) project. The webpage for the ARMS-MBON can be found [here](https://arms-mbon.org/), and you can learn more by reading [this paper in Frontiers](https://www.frontiersin.org/articles/10.3389/fmars.2020.572680/full).  

This is the landing page for all the data of ARMS-MBON, which are shared via its GitHub repositories. This GitHub space is where all the data are uploaded, quality controlled (QCd), merged, semantically annotated, and shared with others. As well as sharing all the ARMS outputs, the scripts and intermediate products arising from the quality control and merging process can be found here. 

Via the menu at the top of this page you can go directly to the GitHub repositories for 
- **Data** the data that are harvested from our various data management sites, QCd, and then combined. These are mostly CSV files, with associated references to image and DNA data files.
- **Documentation** the Handbook, SOPs, Data Management Plan, and ABS explanation. These are used by the ARMS-MBON partners in their field work.
- **Templates** template CSV files for data provision and for sample tube labels. These are used by the ARMS-MBON partners in their field work.

You can also get an overview of all the ARMS sampling events that have happened to-date by clicking on the **Data overview** menu item. These take you directly to the tables created from the [Combined data](https://github.com/arms-mbon/Data/tree/main/QualityControlledData/Combined), which are in the [QualityControlledData repository](https://github.com/arms-mbon/Data/tree/main/QualityControlledData).  
- _Observatory data_ for the observatory coordinates
- _Sampling event data_ for the metadata of each sampling event
- _Image data_ for links to the images taken during each sampling event.
- _Omics data_ for the ENA accession numbers for the COI, ITS, and 18S sequences that have been produced to date 

(See below for more detail).

***The Data repository***

We have several folders in the [Data repository](https://github.com/arms-mbon/Data)
- [**QualityControlledData**](https://github.com/arms-mbon/Data/tree/main/QualityControlledData)
  - [_FromGS_](https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromGS): We use a google sheet to record the material samples that have been collected and the [ENA](https://www.ebi.ac.uk/ena/browser/) accession numbers of the DNA data extracted from those samples. The multiple tabs of the google sheet is downloaded here and subjected to some basic QC (checking the values are formatted correctly and are as expected). In this folder you will find the google sheets (four CSV files) and the QC outputs. 
  - [_FromPlutoF_](https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromPlutoF): We use [PlutoF](https://plutof.ut.ee/en) as the data management platform to record metadata about each sampling event, and to store the images and manual observations made during the sampling events. These are downloaded, again subjected to some basic QC, and organised as a set of CSV files per station (in separate folderd), and one set of "all data" CSV files.
  - [_Combined_](https://github.com/arms-mbon/Data/tree/main/QualityControlledData/Combined): After the QC checks have been passed on the GS and PlutoF data, these are combined to produce four spreadsheets, which contain the following
    - Observatory data: the observatory information such as their IDs, the ARMS unit IDs, locations, depths, habitat information.
    - Sampling event data: the dates, observatory and ARMS unit IDs, and associated information for each sampling event that has been performed to date. The number of associated data files (which are mostly images) are also given here, but links to the image themselves are in the next spreadsheet.
    - Image data: for each sampling event, the filenames and links (URLs) to the image files.
    - Omics data: the ENA accession numbers for the COI, ITS, and 18S sequences that have been produced to date, together with their negative control accession numbers and sample/event IDs.
  - [_FromENA_](https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromENA) Empty, ignore. 
- [**Analysis data**](https://github.com/arms-mbon/Data/tree/main/AnalysisData) This will eventually to hold results of the analysis of the DNA data (empty at present).
- [**ReformattedData**]() This is for ARMS data that are formatted for external data portals.

