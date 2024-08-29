/*mport * as React from 'react'

import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

import { QueryClientProvider } from '../node_modules/@tanstack/react-query/build/legacy/QueryClientProvider'
import { QueryClient } from '../node_modules/@tanstack/react-query/build/legacy/QueryClientProvider'

import App from './App'

import './index.css'*/


import { QueryClientProvider } from '../node_modules/@tanstack/react-query/build/legacy/QueryClientProvider';
import { QueryClient } from '../node_modules/@tanstack/query-core/build/legacy/queryClient'

import * as React from 'react';
//import { ReactDOM } from 'react-dom' 
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
     <App />
    </QueryClientProvider>
  </React.StrictMode>
)
