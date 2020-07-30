# IBM_CFC_2020_Hackathon-Exam_Evaluation_on_Air
POC to be able to conduct subjective examinations online. Configure the questions and the answer key and train the module for calculating the score.

### Short Description:
One of the most affected area in pandemic times is Education. Students can take online training or online classes, but there is no existing solution for subjective evaluation because of which the Examination counsel is forced to cancel/postpone the exams. There is also a big struggle to organize centralized evaluation centers  for teachers to do evaluation for already completed exams as well

So, the key objectives of this POC is to able to digitize the subjective examinations and generate score based on Machine Learning.

### High Level Process Flow:

### In Scope:

### Architecture Diagram:

### Benefits:

### Roadmap:

## Getting Started with project setup:
The below instructions will help in doing a local setup to check the application flow.

### Softwares required:
  - Apache Solr
  - Node JS
  - IBM Cloud access

### Training a model in IBM Watson Knowledge Studio:
### Steps for Training and deploying models in IBM
   Please [Refer](/Source_code/IBM_Docs) this link for the documentation
### Steps to setup Solr in local:
1. Download Solr-8.3.1.zip from official [Solr repository](https://archive.apache.org/dist/lucene/solr/8.3.1/) and unzip the package
2. Start Solr instance using command line from '/Solr_installation/bin' directory
    >solr start -p 8983
3. Create New collection named as 'Exam_on_Air' using command line from '/Solr_installation/bin' directory
   >solr create -c Exam_on_Air
4. Inside "\Solr_Installation\server\solr\Exam_on_Air\conf folder" replace the "manged schema" file with [managed-schema](/Source_code/Solr_Conf/managed-schema)
5. To Enable Cors for the application to access Solr, replace web.xml from path " \Solr_Installation\server\solr-webapp\webapp\WEB-INF" with [web.xml](/Source_code/Solr_Conf/web.xml)
6. Restart Solr from '/Solr_installation/bin' directory
    >solr restart -p 8983
### Steps to run the code:
  Download or clone the code package
  Go into the project folder ‘Exam-and-Evaluation-on-Air’
  Open command prompt and execute the following commands
  ```
    - npm install (this will install all the required node modules)
    - node server
  ```
  
 Finally, access ‘localhost:3000’ in the browser
