import Chips from './chips'
import styles from './styles.module.css'
import ChipsList from './chips-list'

const CHIP_ITEMS = [
    'тег 1',
    'тег 2',
    'тег 3',
    'привет мир',
    'как дела',
    'что делать',
    'погода',
];

function App() {
    return (
        <main className={styles.wrapper}>
            <h1 className={styles.title}>Chip List demo</h1>
            <section>
                <header>
                    <h2 className={styles.sectionDescription}>List of chips</h2>
                </header>
                <div className={styles['resize-box']}>
                    <ChipsList items={CHIP_ITEMS} />
                </div>
            </section>
            <section>
                <header>
                    <h2 className={styles.sectionDescription}>Chip component</h2>
                </header>
                <div className={styles['resize-box']}>
                    <Chips>Привет мир</Chips>
                </div>
            </section>
        </main>
    )
}

export default App
