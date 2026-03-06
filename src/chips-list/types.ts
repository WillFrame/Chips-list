import type {CSSProperties, FC} from 'react';

type Props = {
    items: string[];
    style?: CSSProperties;
}

export type Component = FC<Props>;
