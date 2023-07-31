import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import PokemonList from "./components/PokemonList/PokemonList";
import LoadButton from "./components/LoadButton/LoadButton";
import { Loading } from "react-loading-dot";
import PokemonInfo from "./components/PokemonInfo/PokemonInfo.jsx";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 12;
        setIsLoading(true);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }

        const data = await response.json();

        if (data.results.length === 0) {
          setIsLoading(false);
          return;
        }

        const pokemonDataList = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);

            if (!pokemonResponse.ok) {
              throw new Error("Failed to fetch Pokemon details");
            }

            return await pokemonResponse.json();
          })
        );

        setPokemonData((prevData) => {
          const uniqueNewData = pokemonDataList.filter(
            (pokemon) =>
              !prevData.some(
                (existingPokemon) => pokemon.id === existingPokemon.id
              )
          );
          return [...prevData, ...uniqueNewData];
        });
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 12);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div className={styles.home}>
      <div className={styles.home__headline}>
        <h1>Pokedex</h1>
      </div>
      {isLoading ? (
        <Loading duration={"0.3s"} background={"#000"} />
      ) : (
        <div className={styles.home__content}>
          <div className={styles.home__content_list}>
            <PokemonList
              pokemonData={pokemonData}
              onPokemonClick={handlePokemonClick}
            />
            <LoadButton onClick={handleLoadMore} />
          </div>
          <div className={styles.home__content_info}>
            {selectedPokemon && <PokemonInfo data={selectedPokemon} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
