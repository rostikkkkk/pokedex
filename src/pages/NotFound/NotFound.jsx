import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className={styles.error}>
      <div className="container">
        <div className={styles.error__content}>
          <h1> The page is not found!</h1>
          <span>404 Error</span>
          <Link to="/">
            <button>Return to Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
