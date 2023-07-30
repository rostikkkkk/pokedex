import styles from "./PokemonCard.module.scss";
import LazyLoad from "react-lazy-load";
const typeColors = {
  normal: "#A8A878",
  fire: "#F19B98",
  water: "#6890F0",
  electric: "#FFE597",
  grass: "#9FD282",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A085AD",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};
const PokemonCard = ({ name, types, imageUrl }) => {
  return (
    <div className={styles.card}>
      <LazyLoad height={165} offset={100}>
        <img className={styles.card__image} src={imageUrl} alt={name} />
      </LazyLoad>
      <div className={styles.card__info}>
        <h3>{name}</h3>
        <div className={styles.card__info_types}>
          {types.map((type, index) => (
            <div
              key={index}
              style={{ backgroundColor: typeColors[type.toLowerCase()] }}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
