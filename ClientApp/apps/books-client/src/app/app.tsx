import { Header } from '@books-client/ui';
import { BrowserRouter } from 'react-router-dom';
import { AppRouting } from './Routing';

import { StyledAppWrapper } from './styled/StyledAppWrapper';

export function App() {
  const logOut = () => {
    console.log('Log out');
  };

  return (
    <BrowserRouter>
      <StyledAppWrapper>
        <AppRouting />
      </StyledAppWrapper>
    </BrowserRouter>
  );
}

export default App;
