import styles from "./LoadButton.module.scss";

const LoadButton = ({ onClick, isLoading }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
};
export default LoadButton;
