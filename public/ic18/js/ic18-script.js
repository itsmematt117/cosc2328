// IC18 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis


/*

1) Prop drilling is when data gets pushed through multiple components to get to a specific destination. It becomes a problem when there is more code to maintain and you have to keep track of the various components involved.

2) Create creates the Context, Provide designates a component that it will be available to (usually its children). Finally, Consume is used where the information is actually needed.

3) It has access because it uses the created HabitatContext to access the information.

4) It must be created at the top of the page outside of a component. We place it at the top because it's scope is limited to everything below it. 

5) You would need to add it in the App's return, beneath ModeToggle.

*/

// -- 
const HabitatContext = React.createContext();

// --- COmpos

const Header = () => {
    const {mode} = React.useContext(HabitatContext);
    return (
        <header>
            <h1> Pixel's Habitat</h1>
            <p>{mode === 'day' ? ' Day Mode' : ' Night Mode'}</p>
        </header>
    );
};

const HabitatView = () => {
    const {mode} = React.useContext(HabitatContext);
    return (
        <div className="scene">
            {mode === 'day' ? ' ☀️ 🌿 🐾' : ' ☾ ✨ 🐾'}

        </div>
    );
};

const ModeToggle = () => {
    const { mode, toggleMode } = React.useContext(HabitatContext);
    return (
        <div className="controls">
            <button onClick={toggleMode}>
                {mode === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
            </button>
        </div>
    );
};

const App = () => {
    const [mode, setMode] = React.useState('day');
    const toggleMode = () => setMode(prev => prev === 'day' ? 'night' : 'day');

    return (
        <HabitatContext.Provider value={{mode, toggleMode }}>
        <div className={"habitat " + mode}>
            <Header />
            <HabitatView />
            <ModeToggle />
        </div>
        </HabitatContext.Provider>
    );

};


// --- Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
