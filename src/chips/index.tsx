import type {Component} from './types';

import styles from './styles.module.css';

const Chips: Component = ({as: Component = 'li', children}) => (
    <Component className={styles.chips}>
        <span className={styles["chips-text"]}>
            {children}
        </span>
    </Component>
);

export default Chips;
