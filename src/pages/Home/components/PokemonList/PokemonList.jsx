import { useEffect, useMemo, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PokemonList.module.scss";
import Select from "react-select";
import LoadButton from "../LoadButton/LoadButton.jsx";
const PokemonList = ({ pokemonData, onPokemonClick, loadMoreClicked }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
  };
  useEffect(() => {
    if (loadMoreClicked) {
      setSelectedType(null);
    }
  }, [loadMoreClicked]);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getAllTypes = () => {
    const allTypes = new Set(
      pokemonData.flatMap(({ types }) => types.map(({ type }) => type.name))
    );
    return Array.from(allTypes);
  };
  const allTypes = useMemo(() => getAllTypes(), [pokemonData]);

  const options = [
    { value: "all", label: "All Types" },
    ...allTypes.map((type) => ({
      value: type,
      label: capitalizeFirstLetter(type),
    })),
  ];

  const filteredPokemonData = pokemonData.filter((pokemon) => {
    if (!selectedType) {
      return true;
    }
    if (selectedType.value === "all") {
      return true;
    }
    return pokemon.types.some(({ type }) => type.name === selectedType.value);
  });
  return (
    <>
      <Select
        value={selectedType}
        onChange={handleTypeChange}
        options={options}
        isSearchable={true}
        className={styles.select}
      />
      <div className={styles.list}>
        <AnimatePresence initial={false} persist>
          {filteredPokemonData.map((pokemon) => (
            <motion.div
              key={pokemon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PokemonCard
                key={pokemon.id}
                imageUrl={pokemon.sprites?.front_default}
                name={pokemon.name}
                types={pokemon.types.map(({ type }) => type.name)}
                onReceivePokemon={() => onPokemonClick(pokemon)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PokemonList;
