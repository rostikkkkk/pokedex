import styles from "./LoadButton.module.scss";

const LoadButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      Load More
    </button>
  );
};

export default LoadButton;
