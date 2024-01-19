import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Layout, QueryResult, ModuleDetail } from '../components';



/** TRACKS gql query to retrieve all tracks */
const MODULESANDPARENTTRACK = gql`
    query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
        module(id: $moduleId) {
        id
        title
        content
        videoUrl
        }
        track(id: $trackId) {
        id
        title
        modules {
            id
            title
            length
        }
        }
    }
`;


/**
 * Track Page fetches a track's data from the gql query GET_TRACK
 * and provides it to the TrackDetail component to display
 */
 const Module = () => {

    const { trackId = "", moduleId = "" } = useParams();

    const { loading, error, data } = useQuery(MODULESANDPARENTTRACK, {
        variables: { trackId, moduleId },
    });

    return (
      <Layout fullWidth>
        <QueryResult error={error} loading={loading} data={data}>
            <ModuleDetail track={data?.track} module={data?.module}> 
            </ModuleDetail>
        </QueryResult>
      </Layout>
    );
  };
  
  export default Module;