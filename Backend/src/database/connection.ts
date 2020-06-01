import Knex from "knex"
import { development, test } from '../../knexfile'

const config = process.env.NODE_ENV === 'teste' ? test : development;

const connection = Knex(config)

export default connection