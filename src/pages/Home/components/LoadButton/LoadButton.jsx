import styles from "./LoadButton.module.scss";

const LoadButton = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadButton;
