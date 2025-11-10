import {createClient} from 'https://cdn.jsdelivr.net/npm/@sanity/client@8.11.3/+esm'

export const client = createClient({
  projectId: '6lrir7ep', // Yahan apna Project ID daalein
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2024-07-01', 
})