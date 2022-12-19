import { store } from '@books-client/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouting } from './Routing';

import { StyledAppWrapper } from './styled/StyledAppWrapper';

export function App() {
    const logOut = () => {
        // console.log('Log out');
    };

    return (
        <Provider store={store}>
            <BrowserRouter>
                <StyledAppWrapper>
                    <AppRouting />
                </StyledAppWrapper>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
