const state = {
  senarios: 0,
  hasLastSenarioImg: false,
  senariosData: {},
  activeSenario: null,
  menuPosition: {},
  Lernziele: null,
  LernPfadName: null,
  senariosOrder: [], // Inside componentData
};
const mutations = {
  updateOrder: (state, data) => {

    const senariosData = {};
    Object.entries(state.senariosData).forEach(([key, value], index) => {
      // Modify the key as needed
      const updatedKey = `Senario-${index + 1}`;
      // Store the updated key-value pair in the new object
      senariosData[updatedKey] =
        state.senariosData[data.updatedOrder[index].split("?")[1]];
    });
    state.senariosData = {};

    setTimeout(() => {
      state.senariosData = senariosData;
    }, 50);
  },
};

export default {
  state,
  mutations,
};
