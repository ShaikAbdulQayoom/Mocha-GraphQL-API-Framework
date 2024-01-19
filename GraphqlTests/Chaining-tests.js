import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
const authorizationToken = process.env.AUTHORIZATION_TOKEN;

async function createResource() {
    try {
        const createResponse = await axios.post(
            graphqlEndpoint,
            { query: createQuery, variables: createVariables },
            {
                headers: {
                    'Authorization': `Bearer ${authorizationToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const resourceId = createResponse.data.data.createResource.id;
        return resourceId;
    } catch (error) {
        console.error('Error creating resource:', error.message);
        throw error;
    }
}

async function getResourceById(resourceId) {
    try {
        const getResponse = await axios.post(
            graphqlEndpoint,
            { query: getQuery, variables: { id: resourceId } },
            {
                headers: {
                    'Authorization': `Bearer ${authorizationToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const resourceData = getResponse.data.data.getResource;
        return resourceData;
    } catch (error) {
        console.error('Error fetching resource by ID:', error.message);
        throw error;
    }
}

async function updateResource(resourceId, updatedData) {
    try {
        const updateResponse = await axios.post(
            graphqlEndpoint,
            { query: updateQuery, variables: { id: resourceId, ...updatedData } },
            {
                headers: {
                    'Authorization': `Bearer ${authorizationToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const updatedResource = updateResponse.data.data.updateResource;
        return updatedResource;
    } catch (error) {
        console.error('Error updating resource:', error.message);
        throw error;
    }
}

async function deleteResource(resourceId) {
    try {
        const deleteResponse = await axios.post(
            graphqlEndpoint,
            { query: deleteQuery, variables: { id: resourceId } },
            {
                headers: {
                    'Authorization': `Bearer ${authorizationToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const deleteStatus = deleteResponse.data.data.deleteResource.success;
        return deleteStatus;
    } catch (error) {
        console.error('Error deleting resource:', error.message);
        throw error;
    }
}

// Example usage:
(async () => {
    try {
        // Create a resource
        const createdResourceId = await createResource();
        console.log('Created Resource ID:', createdResourceId);

        // Fetch the created resource by ID
        const fetchedResource = await getResourceById(createdResourceId);
        console.log('Fetched Resource:', fetchedResource);

        // Update the resource
        const updatedResource = await updateResource(createdResourceId, { /* updated data */ });
        console.log('Updated Resource:', updatedResource);

        // Delete the resource
        const deleteStatus = await deleteResource(createdResourceId);
        console.log('Delete Status:', deleteStatus);
    } catch (error) {
        console.error('Chaining GraphQL API requests failed:', error.message);
    }
})();