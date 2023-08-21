/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Any } from './Any';
import type { Boolean } from './Boolean';
import type { String } from './String';

export type Config = {
    key: String;
    description: String;
    private: Boolean;
    value: Any;
    jsonSchema: Record<string, any>;
};

