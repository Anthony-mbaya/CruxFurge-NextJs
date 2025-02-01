import "server-only";
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

if(!writeClient.config().token){
    throw new Error(
        "Sanity token is not set. Please set the SANITY_TOKEN environment variable."
    )
}
