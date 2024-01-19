import { expect } from 'chai';
import axios from 'axios';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

describe('GraphQL FUNCTIONS API CRUD Tests', () => {
  let retrievedFunctionId;
  let authorizationHeader;
  let graphqlEndpoint;

  beforeEach(() => {
    authorizationHeader = {
      'Authorization': `eyJraWQiOiJJTjhraElkamVvQjhUR1NrMnk1UWhtNE5SWkJNLWpLLWhOWWpsVzNqa19BIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnBzbmx6Y3FHTlpBU1h5YWNQSmRYcG9ibGt1d3NlT1FSaTdjZ1NhbVhoOW8ub2FyMXp4MWE2OWhiMXJXYm0yOTciLCJpc3MiOiJodHRwczovL2VtbWVzLm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTcwNTU1NzAxMCwiZXhwIjoxNzA1NTYwNjEwLCJjaWQiOiIwb2EydTkxbnY2a0ROaXdLdTI5NyIsInVpZCI6IjAwdWhvMWJsY291MHAwQ1JkMjk3Iiwic2NwIjpbIm9mZmxpbmVfYWNjZXNzIiwicHJvZmlsZSIsIm9wZW5pZCIsImVtYWlsIl0sImF1dGhfdGltZSI6MTcwNTU1NjkyMSwic3ViIjoicy5xYXlvb21AZW1tZXMuY29tIn0.ofNeMJmeag5OGEK_PtsJNmHHtuLIT3uemKNzhQkddP6Zir5N3sK-8KSvIcKsinrn_1SfsWaOoV4nij54t_kcwCuBdZpoASEEIHtDTonWMIQSmyVU5WJS2bzgGP-6UeDtDuCbw_NtZmDSjTaQaHtqDGS7ALdxqxnIKc58xW0PaqkUjYyLuR6YV3-mddzJCmWCL3l2o37wY93pTvBLJeRzPZClYCSA70zIGUuA60JPSFo7w967facQ6oWLzKIEHjkxn-4CN6ve8G_IKRzsQ2VpTn5FcxsICOk_pPjUMLUCKj0e_YQYTuI9cofC-A1870EFVdhGEVOqWui6ISBpe7OEwQ`,
      'Content-Type': 'application/json',
    };
    graphqlEndpoint = "https://dev-sb-api.advantage-eclinical.com/studyBuilder";
  });
  
  //-----------------------------------------Create Function------------------------------------------------------------
  it('should create a resource', async () => {
    const queryPath = 'C:/Users/DELL/Downloads/AsbApiAutomation/Graphql_queries/Functions/CreateFunction.graphql';
    const query = await fs.readFile(queryPath, 'utf8');
    const variablesPath = 'C:/Users/DELL/Downloads/AsbApiAutomation/Graphql_variables/Functions_var/CreateFunction.json';
    const variables = JSON.parse(await fs.readFile(variablesPath, 'utf8'));

    try {
      const createResponse = await axios.post(
        graphqlEndpoint,
        { query, variables },
        {
          headers: authorizationHeader
        }
      );
      console.log(createResponse);
      console.log(JSON.stringify(createResponse.data, null, 2));
      expect(createResponse.status).to.equal(200);

    } catch (error) {
      console.error('GraphQL Error:', error.message);
      console.log('GraphQL Response Data:', JSON.stringify(error.response?.data, null, 2));
      throw error;
    }
  });

  //------------------------------------Retrieve Function-------------------------------------------------------------------------------------
  it('should retrieve the created resource', async () => {
    const queryPath = 'C:/Users/DELL/Downloads/AsbApiAutomation/Graphql_queries/Functions/GetFunction.graphql';
    const query = await fs.readFile(queryPath, 'utf8');
    const variablesPath = 'C:/Users/DELL/Downloads/AsbApiAutomation/Graphql_variables/Functions_var/GetFunction.json';
    const variables = JSON.parse(await fs.readFile(variablesPath, 'utf8'));
    try {
      const retrieveResponse = await axios.post(
        graphqlEndpoint,
        { query, variables },

        {
          headers: authorizationHeader
        }

      );

      expect(retrieveResponse.status).to.equal(200);
      expect(retrieveResponse.data).to.have.property('data');
      const functions = retrieveResponse.data.data.functions;
      expect(functions).to.be.an('array');
      expect(functions).to.have.length.greaterThan(0);
      const targetFunctionName = '12745';
      const targetFunction = functions.find(func => func.name === targetFunctionName);
      expect(targetFunction, `Function with name '${targetFunctionName}' not found`).to.not.be.undefined;
      retrievedFunctionId = targetFunction.functionid;
      console.log(`Function ID for ${targetFunctionName}:`, retrievedFunctionId);
    } catch (error) {
      console.error('GraphQL Error:', error.message);
      console.log('GraphQL Response Data:', JSON.stringify(error.response?.data, null, 2));
      throw error;
    }
  });
  
  //------------------------------------Update Function-------------------------------------------------------------------------------
  it('should update the created resource', async () => {
    const queryPath = 'C:/Users/DELL/Downloads/AsbApiAutomation/Graphql_queries/Functions/UpdateFunction.graphql';
    const query = await fs.readFile(queryPath, 'utf8');
    const variablesPath = 'C:/Users/DELL/Downloads/AsbApiAutomation/Graphql_variables/Functions_var/UpdateFunction.json';
    const updateVariables = JSON.parse(await fs.readFile(variablesPath, 'utf8'));
    updateVariables.functionid = retrievedFunctionId;

    try {
      const updateResponse = await axios.post(
        graphqlEndpoint,
        { query, variables: updateVariables },
        {
          headers: authorizationHeader
        }
      );
      expect(updateResponse.status).to.equal(200);
    } catch (error) {
      console.error('GraphQL Error:', error.message);
      console.log('GraphQL Response Data:', JSON.stringify(error.response?.data, null, 2));
      throw error;
    }
  });
  
  //-----------------------------------------Delete Function-------------------------------------------------------------------------
  it('should delete the created resource', async () => {
    const queryPath = 'C:/Users/DELL/Downloads/AsbApiAutomation/Graphql_queries/Functions/DeleteFunction.graphql';
    const query = await fs.readFile(queryPath, 'utf8');
    const variablesPath = 'C:/Users/DELL/Downloads/AsbApiAutomation/Graphql_variables/Functions_var/DeleteFunction.json';
    const deleteVariables = JSON.parse(await fs.readFile(variablesPath, 'utf8'));
    deleteVariables.functionid = retrievedFunctionId;
    try {
      const deleteResponse = await axios.post(
        graphqlEndpoint,
        { query, variables: deleteVariables },
        {
          headers: authorizationHeader
        }
      );
      expect(deleteResponse.status).to.equal(200);
    } catch (error) {
      console.error('GraphQL Error:', error.message);
      console.log('GraphQL Response Data:', JSON.stringify(error.response?.data, null, 2));
      throw error;
    }
  });
});