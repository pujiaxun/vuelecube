/**
 * Config schema:
 *
 * table: String, database table name
 * name: String, the config's key name
 * value: String|Number|Boolean, value of the configuration
 */

import db from '../../datastore';
import DEFAULT_CONFIGS from "../../constants/DefaultConfigs";

const state = {
  configs: {},
};

const mutations = {
  SET_CONFIGS(state, { configs }) {
    state.configs = configs;
  },
  UPDATE_CONFIG(state, { name, value }) {
    state.configs[name] = value;
  },
};

const CONFIGS_TABLE_NAME = 'configs';

const actions = {
  getConfigs({ commit }) {
    db.find({
      table: CONFIGS_TABLE_NAME,
    }, (_, configObjects) => {
      const customedConfigs = {};
      configObjects.forEach(({ name, value }) => {
        customedConfigs[name] = value;
      });

      // combine customed configs with default ones
      const configs = Object.assign({}, DEFAULT_CONFIGS, customedConfigs);
      commit('SET_CONFIGS', { configs });
    });
  },
  updateConfig({ commit }, { name, value }) {
    db.update({
      table: CONFIGS_TABLE_NAME,
      name,
    }, {
      table: CONFIGS_TABLE_NAME,
      name,
      value,
    }, { upsert: true }, () => {
      commit('UPDATE_CONFIG', { name, value });
    });
  },
};

const getters = {
  allConfigs: state => state.configs,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
