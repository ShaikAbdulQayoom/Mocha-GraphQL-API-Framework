import { expect } from 'chai';

import axios from 'axios';
import fs from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

describe('GraphQL API Tests', () => {
  it('should retrieve visits by build', async () => {
    const graphqlEndpoint = "https://dev-sb-api.advantage-eclinical.com/studyBuilder";
    const queryPath = 'C:/Users/srika/AsbApiAutomation/Graphql_queries/versions.graphql';
    const query = await fs.readFile(queryPath, 'utf8');
    const variablesPath = 'C:/Users/srika/AsbApiAutomation/Graphql_variables/variables.json';
    const variables = JSON.parse(await fs.readFile(variablesPath, 'utf8'));
try {
      const response = await axios.post(
        graphqlEndpoint,
        { query, variables },
        {
          headers: {
          
            'Authorization': ``,
            'Content-Type': 'application/json',
          },
        }

      );
      console.log(response);
       
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('data');
        expect(response.data.data).to.have.property('ctversions');
        expect(response.data.data.ctversions).to.be.an('array');
        const ctVersions = response.data.data.ctversions;
        expect(ctVersions).to.have.lengthOf(5); // Assuming you expect 5 items in the array
         expect(ctVersions[0].ct_version).to.equal('2019-12-20');
        expect(ctVersions[1].ct_version).to.be.null;
      
  
      } catch (error) {
        // Handle errors
        console.error('GraphQL Error:', error.message);
        console.log('GraphQL Response Data:', JSON.stringify(error.response?.data, null, 2));
  
        // Rethrow the error if necessary
        throw error;
      }
    });
  });
