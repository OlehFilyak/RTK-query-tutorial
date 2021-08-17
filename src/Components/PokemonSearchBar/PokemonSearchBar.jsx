import { useState } from "react";
import { useGetPokemonByNameQuery } from "../../redux/helpers/pokemonAPI";
import Spinner from "../Spinner";

function PokemonSearchBar() {
  const [pokemonName, setPokemonName] = useState("");
  const {
    data,
    error,
    isFetching,
    isError,
    isLoading,
    isUninitialized,
    isSuccess,
    refetch,
  } = useGetPokemonByNameQuery(pokemonName, {
    skip: pokemonName === "" || false,
    // skip: true, //true або false визначає умови, коли пропускати фетч
    pollingInterval: 1000,
    // selectFromResult: ({ data }) => ({    //Вибере пості зі заданим id
    //   post: data?.find((post) => post.id === id),
    // }),
    // refetchOnMountOrArgChange: true,
    // refetchOnFocus: true,
    // refetchOnReconnect: false,
  });
  console.log(data);
  console.log(error);
  console.log(isLoading); //Можна використовувати при першій загрузці

  console.log(isFetching); //Можна використовувати при наступних загрузках для видалення попередніх даних
  console.log(isError);
  console.log(isUninitialized);
  console.log(isSuccess);
  console.log(refetch);

  const showNotFoundError = isError && error.originalStatus === 404;
  const showPokemonData = data && !isFetching && !isError;

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.currentTarget.elements.pokemonName.value);
    e.currentTarget.reset();
  };

  return (
    <div>
      <h1>Введіть ім'я покемона, або номер id</h1>
      <form autoComplete="off" onClick={handleSubmit}>
        <input type="text" name="pokemonName" />
        <button type="submit">
          {isFetching && <Spinner size={16} />}
          Search
        </button>
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
