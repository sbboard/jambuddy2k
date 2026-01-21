import './App.scss';
import { Zoom } from './components/zoom/Zoom';
import { Debug } from './components/debug/Debug';
import { Pet } from './components/pet/Pet';

export const App = () => {

    return (
        <div className="App">
            <Debug />
            <Pet />
            <Zoom/>
        </div>
    );
};
