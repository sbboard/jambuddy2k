import './App.scss';
import { Debug } from './components/debug/Debug';
import { Pet } from './components/pet/Pet';

export const App = () => {

    return (
        <div className="App">
            <Debug />
            <Pet />
        </div>
    );
};
