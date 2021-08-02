
// import getters from './getters'

/**
 * 注释
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
const system = {
	state: {
		agentId: ''
	},
	mutations: {
		updateAgent (state, newAgent) {
			state.agentId = newAgent
		}
	},
	actions: {
	}
}

export default system
