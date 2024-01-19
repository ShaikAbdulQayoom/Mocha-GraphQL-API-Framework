import { expect } from 'chai';

import axios from 'axios';
import fs from 'fs/promises';
import dotenv from 'dotenv';

describe('GraphQL API Tests', () => {
  it('should retrieve visits by build', async () => {
    const graphqlEndpoint = "https://dev-sb-api.advantage-eclinical.com/studyBuilder";
    const query = `mutation saveUserPref($input: UserPrefInput) {
      saveUserPref(input: $input)
    }
  
    `;
   
      const variables = {
        "userid": "e.srikanth@emmes.com",
        "appid": "SB",
        "env": "ADMIN",
        "role": "CLINIC"
      };
  
    // const authorizationToken = 'eyJraWQiOiJJTjhraElkamVvQjhUR1NrMnk1UWhtNE5SWkJNLWpLLWhOWWpsVzNqa19BIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkdKVE02MHRqbUladFFtMURiOF9ESVk0U2ZOSnJOeE0tdmlwVFhZX2F6aGsub2FyMXpya29wNEJoYm1BZmsyOTciLCJpc3MiOiJodHRwczovL2VtbWVzLm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTcwNTM3OTgzNywiZXhwIjoxNzA1MzgzNDM3LCJjaWQiOiIwb2EydTkxbnY2a0ROaXdLdTI5NyIsInVpZCI6IjAwdWt4ZGpsN2drck9MVVJUMjk3Iiwic2NwIjpbInByb2ZpbGUiLCJlbWFpbCIsIm9mZmxpbmVfYWNjZXNzIiwib3BlbmlkIl0sImF1dGhfdGltZSI6MTcwNTM3OTc2Niwic3ViIjoiZS5zcmlrYW50aEBlbW1lcy5jb20ifQ.pKCTbTKFGsFtaEmUNiL1uW1nLCqWqX8040WjZBvw0gIpHd5NfmPh99go_WlpwBVLIJUdaPshMgWuSKg5hpVe5i93ByR4LoUcfGGrqs1QhHQ0eRCSWkYA-CrxRLDAdq0eOe7_SOXjmPDJk5ttDOkH9rLw8kC-UpZjEqP7XSwW-gVe7IQnczx3NU4KrfdOCkmNyVTzupbO5E6SDZrVYe4uJIP9n28m8Var4pVOSnuqX2DaR6qk_bK9E57CBGblziDKHHFVqu3FsJINKRxJwkKcE644llkvEs2HfGDMwY6TAl8BFpbh_iShop6GUSMbKNYLSi6rbyOX3nKM0ypgQPTOaw';

    try {
      const response = await axios.post(
        graphqlEndpoint,
        { query, variables },
        {
          headers: {
            'Authorization': `eyJraWQiOiJJTjhraElkamVvQjhUR1NrMnk1UWhtNE5SWkJNLWpLLWhOWWpsVzNqa19BIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmpDa21rU3RQRThMMXhoZm5NdVBiUEY2TDlmQVpwRENlMmY0WVBoeUNTMTQub2FyMXpybWZ4a0JWQlRyUU4yOTciLCJpc3MiOiJodHRwczovL2VtbWVzLm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTcwNTM4MzY0NiwiZXhwIjoxNzA1Mzg3MjQ2LCJjaWQiOiIwb2EydTkxbnY2a0ROaXdLdTI5NyIsInVpZCI6IjAwdWt4ZGpsN2drck9MVVJUMjk3Iiwic2NwIjpbIm9wZW5pZCIsIm9mZmxpbmVfYWNjZXNzIiwiZW1haWwiLCJwcm9maWxlIl0sImF1dGhfdGltZSI6MTcwNTM3OTc2Niwic3ViIjoiZS5zcmlrYW50aEBlbW1lcy5jb20ifQ.RO-S2PD4mwG3UjT36wsj2bNwAwFnIW8Gnr-9OdHymmuK2MfcBYXhSf8-FDCQdouJzJEqclZfg6me4OrVuNYNCm0tWp-qb9i2vQ_uaHkqKUoKznzJrNnGYNmdTMFmxEsAg4mHQh0VP3u41zrZ8DhGahr1D4BNGxLhBtmDBk-ZoHgyo4JLu5JRRvxptcKqlZ9IpLK97BJCQqxmqyxnhSLwwfRaar8ZPIsH205CiMfBH5jPpnM5nSVE6v7rdo6J1rkTOEG-DIVktlRLHtt6hVXORsiC8jvCUIQ8zQ0pF_l2qqKNjIPE9wUo0UZ99MXZrINJHRwL9Sd82IYKuJqbxewOHQ`,
            'Content-Type': 'application/json',
          },
        }

      );
      console.log('GraphQL Response Status:', response.status);
      console.log('GraphQL Response Headers:', response.headers);
   // Log parts of the response, excluding circular structures
   const responseWithoutCircular = {
    status: response.status,
    headers: response.headers,
    data: response.data,
    config: response.config,
  };

  console.log('GraphQL Response:', JSON.stringify(responseWithoutCircular, null, 2));
  const saveUserPrefData = response?.data?.data?.saveUserPref;

  if (saveUserPrefData) {
    console.log('saveUserPref Data:', JSON.stringify(saveUserPrefData, null, 2));

   

  } else {
    console.error('GraphQL Response does not contain expected data structure.');
  }

 
  expect(response.status).to.equal(200);

  

} catch (error) {
 
  console.error('GraphQL Error:', error.message);
  console.log('GraphQL Response Data:', JSON.stringify(error.response?.data, null, 2));

  throw error;
}
  });
});