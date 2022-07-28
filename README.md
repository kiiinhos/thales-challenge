
<h1 align="center"> Thales Challenge</h1>

<p align="center">
  <img width="460" height="300" src="https://static.cryptoid.com.br/wp-content/uploads/2021/12/thales-group-logo.png">
</p>

## Descripton
<p align="center">This project was created in order to manipulate JSON files in AWS S3 services using Lambda (Nodejs) and exposing via ApiGetway</p>

## Challege
 This challenge requires the candidate to use at least the following AWS resources:

* S3 bucket (used to store files)
* Lambda (used to process requests)
* API Gateway (used to make requests)
* The candidate is free to add any other features or settings that he/she finds interesting.
* The entire application can be done directly from the graphical interface of the AWS Console, but the candidate can use available frameworks (e.g.
serverless) to complete the challenge.
* Suggested languages:
Python or
Javascript (Node.js)
* The project will be analyzed by the team and then removed to avoid further problems.

## Problem

* The system needs to manage JSON files stored in the cloud through commands sent by URL.

## Solution

* For this solution I use an API Gateway tool to export the endpoints that will be responsible for executing the actions, I used Lambda as an intermediary tool to manipulate the files in S3 with 3 different functions.
* All requests require Content-type and APP-KEY
![alt text](https://miro.medium.com/max/1400/1*mV6ykK7T_CzqXPqllLORnQ.jpeg)

