// IC17 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

console.log('React version:', React.version);
console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');


// -- Component
const TamagotchiPet = () => {
    // State - hunger: 0 =full , 100= starving; energy 0 = exhausted, 100= rested
    const [hunger, setHunger] = React.useState(50);
    const [energy, setEnergy] = React.useState(50);

    // event handlers
    const feedPet = () => {
        setHunger(Math.max(0, hunger - 15));
    };

    const playWithPet = () => {
        setEnergy(Math.max(0, energy - 10));
        setHunger(Math.min(100, hunger + 5));
    };

    const restPet = () => {
        setEnergy(Math.min(100, energy + 20));
        setHunger(Math.min(100, hunger + 8));
    };

    // -- Conditional rendering helper
    const getPetMood = () => {
        if (hunger > 75) return ')-: Starving!';
        if (energy < 25) return 'zzzzzz Exhausted!!'
        if (hunger < 30 && energy > 70) return ':D Thriving!';
        return ':l Okay';
    };

    // --- JSX
    return (
        <div className="pet-card">
            <h1> *paws* Pixel</h1>
            <div className="stats">
                <p className="stat">*FOOD* Hunger: {hunger}</p>
                <p className="stat">*ENG* Energy: {energy}</p>

            </div>
            <div className="mood">{getPetMood()}</div>
            <div className="controls">
                <button onClick={feedPet}>*FOOD* Feed </button>
                <button onClick={playWithPet}>*TOY* Play </button>
                <button onClick={restPet}>*SLEEPY* Rest </button>
            </div>


        </div>
    );

};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TamagotchiPet />);