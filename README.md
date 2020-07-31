# IBM_CFC_2020_Hackathon-Exam_Evaluation_on_Air

## Short Description:
#### What's the problem?
Education has been deeply disrupted with the onset and spread of COVID-19. And while online classes and learning apps have come in, evaluating subjective exams, which are more difficult and time-consuming to score, still remains an unanswered question. Finding an efficient, long lasting solution to easily conduct and grade subjective exams, with minimum efforts will mark a new chapter in education.

#### How can technology help?
Educational institutes can conduct subjective exams through new mediums and educators can spend minimum effort in evaluating student answers. Helping students develop critical thinking capabilities and grading them through an unbiased approach is important as we shape the future of education.

#### The idea
Innovation approaches to grading and evaluation is important as educators and students both discover new ways of learning beyond the classrooms. Providing a set of open source tools, backed by IBM Cloud and Watson Services, will enable educators to easily assess students understanding of concepts, without having to manually go through each and every student exam response.
![Image of Exam_on_Air_1](https://github.com/Chify/IBM_CFC_2020_Hackathon-Exam_Evaluation_on_Air/blob/master/documents/Exam_on_air_1.PNG)

## Exams & Evaluations On-Air
With COVID, the traditional examination process where students gather at an examination center to write exams is now a thing of the fading past. But, remotely evaluating students understanding of the concept and critical thinking capabilities still remains a challenge for institutions. Educational institutes need to adopt new ways of conducting and evaluating subjective based exams, both at school and university levels to bridge this gap.  

#### Way forward for exams 
Through a combination of new age technologies, educators can now easily define evaluation parameters and set the question paper for an exam from anywhere. Students can remotely access these exams based on the designated exam schedule and partake the exam through any means – by filling in the answers online, by narrating the answers or by sending in images of the answers written on paper. Exams & Evaluations On-Air can intelligently read student responses and generate exam scores without the hassle of evaluation centers and dedicated trained faculties.   

#### Manage exams remotely 
Institutions can now conduct exams without the hassles of infrastructure availability and logistics coordination. Students too benefit from the ease of taking exams in any way, from the comfort of their homes. 

#### Quick, unbiased results 
Exams and Evaluations on- Air leverages modern digital technology to constantly train and update itself with response components to a question. This reduces intervention from educators and ensures that a student is correctly graded and is not subjected to misinterpretations of response and incorrect grading. 
![Image of Exam_on_Air_2](https://github.com/Chify/IBM_CFC_2020_Hackathon-Exam_Evaluation_on_Air/blob/master/documents/Exam_on_air_2.PNG)

## High Level Process Flow:
![Image of Process Flow Diagram](https://github.com/Chify/IBM_CFC_2020_Hackathon-Exam_Evaluation_on_Air/blob/master/documents/High_Level_Process_Flow.PNG)

## Architecture Diagram:
![Image of Architecture Diagram](https://github.com/Chify/IBM_CFC_2020_Hackathon-Exam_Evaluation_on_Air/blob/master/documents/Architecture_Diagram.PNG)

## Demo Video
[![Exam-Evaluation-on-Air](https://github.com/Chify/IBM_CFC_2020_Hackathon-Exam_Evaluation_on_Air/blob/master/documents/Demo%20video.PNG)](https://youtu.be/9Mi-By0NpUg)

## Benefits:
  - Education institutions and exam boards benefit from 80% reduction in cost, from setting up , conducting and evaluating subjective exams
  - Opens up new channels for writing exams - handwritten exams, voice-based answers for blind students as well as online written exams 
  - Unbiased, hassle free evaluations 
  - The solution as well as the whole end to end process model can be utilized beyond schools and college examinations
  - A model which can work out greatly during pandemic or any other crisis time as well as during normal times

## Roadmap:
![Roadmap](https://github.com/Chify/IBM_CFC_2020_Hackathon-Exam_Evaluation_on_Air/blob/master/documents/Road_map.PNG)

# Getting Started with project setup:
The below instructions will help in doing a local setup to check the application flow.

### Softwares required:
  - IBM Cloud Services - IBM Watson Knowledge Studio and NLU Services (for building question bank and answer keys)
  - Node JS (UI application with Two personas Teacher and Student)
  - Apache Solr (repository to store the individual question paper set and to generate scores)

### Steps for Training and deploying models in IBM:
   Please [Refer](/Source_code/IBM_Docs) this link for the documentation
### Steps to setup Solr in local:
1. Download Solr-8.3.1.zip from official [Solr repository](https://archive.apache.org/dist/lucene/solr/8.3.1/) and unzip the package
2. Start Solr instance using command line from '/Solr_installation/bin' directory
    >solr start -p 8983
3. Create New collection named as 'Exam_on_Air' using command line from '/Solr_installation/bin' directory
   >solr create -c Exam_on_Air
4. Inside "\Solr_Installation\server\solr\Exam_on_Air\conf folder" replace the "managed-schema" file with [managed-schema](/Source_code/Solr_Conf/managed-schema)
5. To Enable Cors for the application to access Solr, replace web.xml from path " \Solr_Installation\server\solr-webapp\webapp\WEB-INF" with [web.xml](/Source_code/Solr_Conf/web.xml)
6. Restart Solr from '/Solr_installation/bin' directory
    >solr restart -p 8983
### Steps to run the code:
  1. Download or clone the code package
  2. Download the entity details created in IBM Cloud ([Refer file Download Entities from IBM Knowledge Studio.docx](/Source_code/IBM_Docs))
  3. Update the downloaded files content in this file '/Source_code/UI/src/assets/data/6th_Science_MidTerm.json'
  4. We will also require the below details from the workspace created in IBM ([Refer file IBM training Model.docx](/Source_code/IBM_Docs))
      - Api key
      - URL
      - Model Id
      - Version
  5. Update the above details in the JSON file available in '\Source_code\UI\src\assets\data\dbDetails.json' (The details already present in this file are just dummy data)
  6. After performing the above steps, Open command prompt and go into the project folder ‘\Source_code\UI’ and execute the following commands
  
  ```
    - npm install (this will install all the required node modules)
    - node server
  ```
  
 Finally, access ‘localhost:3000’ in the browser

## Conclusion
Examination conduction, management and evaluation can be effectively done during Covid-19 pandemic with the help of ‘Exams & Evaluations On-Air’. This solution is more generic and does not have to be limited to the pandemic situations. It can be put to use at all times. 
