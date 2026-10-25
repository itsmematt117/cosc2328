/* HW7 – COSC 2328 – Professor McCurry
   Implemented by: Matthew Davis */

   const statusMessage = document.querySelector("#status-message");

   async function searchPokemon(name) {
        statusMessage.textContent = "Searching...";
        statusMessage.className = "";
        
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        
        if (!response.ok) {
            throw new Error("Uh oh, something bad happened! (error)");
        }
        const data = await response.json();
        const smallNamesInData = data.results.filter(pokeName => pokeName.name.length < 7);
        const sorted = [...smallNamesInData].sort(function(a, b){
            return a.name.length - b.name.length;
        });

        statusMessage.textContent = "";
        const root = ReactDOM.createRoot(document.querySelector("#root"));
        root.render(<App roster={sorted} />)
    } catch (error) {
        statusMessage.textContent = error.message;
        statusMessage.className = "status-error";
        document.querySelector("#root").innerHTML = " Something didn't work correctly.. try again";
    }
}

function PokemonCard(props) {
    return (
        <div className="pokemon-card">
            <img src={"https://placehold.co/150x150/4FC3F7/333333?text=" + props.name}
                alt = {props.name} />
            <h3>{props.name}</h3>
            <h3>{props.name.length}</h3>      
        </div>
    );
}

function PokemonRoster(props) {
    return (
        <div className="pokemon-roster">
            {props.roster.map(function (pokemon, index) {
                return (
                    <PokemonCard
                    key={index}
                    name={pokemon.name}
                    size={pokemon.name.length}
                    />
                );
            })}
        </div>
    );
}

function App(props) {
    return (<div>
        <h2>Showing {props.roster.length} short-named Pokemon, shortest name first</h2>
            <PokemonRoster roster={props.roster} />
        </div> 
    );
    
}

searchPokemon();
