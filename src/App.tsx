import './App.scss';
import { useAppSelector } from './app/hooks';
import { Debug } from './components/debug/Debug';
import { End } from './components/end/End';
import { Pet } from './components/pet/Pet';

export const App = () => {
    const { health } = useAppSelector(state => state.game);

    return (
        <div className="App">
            <Debug />
            {health !== 666 ? <Pet /> : <End />}
        </div>
    );
};
