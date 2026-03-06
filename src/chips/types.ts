import type { FC } from 'react';

type Props = {
    as?: 'div' | 'li';
    children?: string;
};

export type Component = FC<Props>;
