import React from "react";
import styles from "./PokemonInfo.module.scss";

const PokemonInfo = ({ data }) => {
  const { name, id, sprites, stats, moves, weight } = data;
  const formattedId = String(id).padStart(3, "0");
  const sortedStats = [...stats].sort((a, b) =>
    a.stat.name.localeCompare(b.stat.name)
  );
  return (
    <div className={styles.info}>
      <img src={sprites?.front_default} alt={name} />
      <div className={styles.info__content}>
        <h1>
          {name} #{formattedId}
        </h1>
        <table className={styles.info__content_table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Fire</th>
            </tr>
          </thead>
          <tbody>
            {sortedStats.map((item) => (
              <tr key={item.stat.url}>
                <td>{item.stat.name}</td>
                <td>{item.base_stat}</td>
              </tr>
            ))}
            <tr>
              <td>Weight</td>
              <td>{weight}</td>
            </tr>
            <tr>
              <td>Total Moves</td>
              <td>{moves.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokemonInfo;
