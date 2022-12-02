import * as config from '../../config.json'
import * as default_config from '../../default_config.json'

export interface Config {
    version: number
    hostname: string
    port: number
}

export function importConfig() : Config {
    if(default_config.version > config.version)
        throw('your config.json is obsolete')

    return config as Config;
}
