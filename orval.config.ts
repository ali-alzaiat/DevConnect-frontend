import { defineConfig } from 'orval';
import 'dotenv/config';

export default defineConfig({
  devConnect: {
    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      schemas: 'src/api/model',
      client: 'react-query',
      httpClient: 'axios',
      mock: true,
      override: {
        mutator: {
          path: 'axios-instance.ts',
          name: 'customFetch'
        },
        operations: {
          getAllProjects: {
            query: {
              useQuery: true // Force this POST endpoint to generate a useQuery hook
            }
          }
        }
      }
    },
    input: {
      target: `${process.env.VITE_BACKEND_URL}/api-yaml`
    }
  }
});
