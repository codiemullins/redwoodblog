import { MantineProvider, MantineThemeOverride } from '@mantine/core'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'

import './index.css'
import './scaffold.css'

const myTheme: MantineThemeOverride = {
  colors: {
    'kelly-green': ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#66BB6A', '#4DB6AC', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20'],
  },
  primaryColor: 'kelly-green',
}

const App = () => (
  <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <AuthProvider>
          <RedwoodApolloProvider useAuth={useAuth}>
            <Routes />
          </RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  </MantineProvider>
)

export default App
