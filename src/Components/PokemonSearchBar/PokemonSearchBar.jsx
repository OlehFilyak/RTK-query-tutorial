import { useState } from "react";
import { useGetPokemonByNameQuery } from "../../redux/helpers/pokemonAPI";
import Spinner from "../Spinner";

function PokemonSearchBar() {
  const [pokemonName, setPokemonName] = useState("");
  const { data, error, isFetching, isError } = useGetPokemonByNameQuery(
    pokemonName,
    {
      skip: pokemonName === "",
    }
  );
  console.log(data);
  console.log(error);
  console.log(isFetching);
  console.log(isError);

  const showNotFoundError = isError && error.originalStatus === 404;
  const showPokemonData = data && !isFetching && !isError;

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.currentTarget.elements.pokemonName.value);
    e.currentTarget.reset();
  };

  return (
    <div>
      <h1>Введіть ім'я покумона, або номер id</h1>
      <form autoComplete="off" onClick={handleSubmit}>
        <input type="text" name="pokemonName" />
        <button type="submit">Search</button>
      </form>

      {isFetching && <Spinner />}

      {showNotFoundError && (
        <p>
          Упс, покемона с имененем <b>{pokemonName}</b> нет
        </p>
      )}

      {showPokemonData && (
        <>
          <h2>{data.name}</h2>
          <img src={data.sprites.front_default} alt={data.name} />
        </>
      )}
    </div>
  );
}

export default PokemonSearchBar;
