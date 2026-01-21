import './App.scss';
import { Zoom } from './components/zoom/Zoom';
import { Debug } from './components/debug/Debug';
import { Pet } from './components/pet/Pet';
import useDebug from './hooks/useDebug';

export const App = () => {

    const { debugActive } = useDebug();

    return (
        <div className="App">
            {debugActive && <Debug />}
            <Pet />
            <Zoom />
        </div>
    );
};
