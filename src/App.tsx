import './App.css';
import { useAppSelector } from './app/hooks';
import { End } from './components/end/End';
import { Pet } from './components/pet/Pet';

export const App = () => {
    const { health } = useAppSelector(state => state.game);

    return <div className="App">{health ? <Pet /> : <End />}</div>;
};
