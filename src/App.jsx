import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router'
import { GameRoute } from './routes/game.jsx'
import { Theme } from '@radix-ui/themes'
// sui
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
})

import './styles.css'
import '@radix-ui/themes/styles.css'
import { router } from './routes/routes'

const queryClient = new QueryClient()

export default function App() {
  return (
    <Theme accentColor="cyan" className="theme-provider">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
          <WalletProvider>
            <RouterProvider router={router} />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  )
}
