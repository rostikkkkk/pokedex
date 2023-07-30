import styles from "./Header.module.scss";
const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <span>Pokemon GO launch</span>
      </div>
    </div>
  );
};

export default Header;
