import Chips from '../chips';
import { useIntersectionOverflow } from '../hooks/use-overflow-observe';
import { DROPDOWN_BUTTON_TEXT } from './consts';
import styles from './styles.module.css';
import type { Component } from './types';
import { useId } from 'react';

const ChipsList: Component = ({items = [], style}) => {
    const popoverId = useId();

    const {
        containerRef: listRef,
        buttonRef,
        hiddenIndices,
    } = useIntersectionOverflow<HTMLUListElement, HTMLButtonElement>();

    if (items.length === 0) {
        return null;
    }

    const hiddenItems = items.filter((_, index) => hiddenIndices.includes(index));

    return (
        <div
            className={`${styles['chips-list-container']}`}
            style={style}
        >
            <ul className={styles['chips-list']} ref={listRef}>
                {items.map((item, index) => (
                    <li
                        key={`chip-${index}`}
                        className={styles['chips-item']}
                    >
                        <Chips>
                            {item}
                        </Chips>
                    </li>
                ))}
            </ul>
            {hiddenItems.length > 0 && (
                <>
                    <button
                        className={styles['more-button']}
                        popoverTarget={popoverId}
                        popoverTargetAction="toggle"
                        ref={buttonRef}
                    >
                        <Chips>{DROPDOWN_BUTTON_TEXT}</Chips>
                    </button>
                    <div
                        className={styles['dropdown']}
                        id={popoverId}
                        popover="auto"
                    >
                        <ul className={styles['dropdown-list']}>
                            {hiddenItems.map((item, index) => (
                                <Chips key={`dropdown-chip-${index}`}>
                                    {item}
                                </Chips>
                            ))}
                        </ul>
                    </div>
                </>
            )}

        </div>
    );
};

export default ChipsList;