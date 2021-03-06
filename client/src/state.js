import React, { createContext, useContext, useReducer } from 'react';
import axios from './utils/axios';

const TYPES = {
  SET_ACTIVE_SHIPS: 'SET_ACTIVE_SHIPS',
  UPDATE_SHIP: 'UPDATE_SHIP',
  REMOVE_SHIP: 'REMOVE_SHIP',
  SELECT_SHIP: 'SELECT_SHIP',
  CREATE_SHIP: 'CREATE_SHIP',
};

const initialState = {
  activeShips: [],
  selectedShip: null,
};

const GlobalState = createContext([]);

const reducer = (state, { type, value }) => {
  switch (type) {
    case TYPES.SET_ACTIVE_SHIPS:
      return {
        ...state,
        activeShips: value,
      };
    case TYPES.UPDATE_SHIP:
      return {
        ...state,
        activeShips: state.activeShips.map(shi =>
          shi.id === value.id ? { ...shi, ...value } : shi,
        ),
      };
    case TYPES.REMOVE_SHIP:
      return {
        ...state,
        activeShips: state.activeShips.filter(shi => shi.id !== value),
      };
    case TYPES.SELECT_SHIP:
      return {
        ...state,
        selectedShip: state.activeShips.find(shi => shi.id === value),
      };
    case TYPES.CREATE_SHIP:
      return {
        ...state,
        selectedShip: value,
        activeShips: [...state.activeShips, value],
      };
    default:
      return state;
  }
};

export const StateProvider = ({ children, initialState: existingState }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...existingState,
  });

  return (
    <GlobalState.Provider value={[state, dispatch]}>
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalState);

  const actions = {
    fetchShips: async () => {
      const { data } = await axios.get('/ships');
      dispatch({ type: TYPES.SET_ACTIVE_SHIPS, value: data });
    },
    updateShip: async ship => {
      dispatch({ type: TYPES.UPDATE_SHIP, value: ship });
      await axios.put(`/ships/${ship.id}`, ship);
    },
    removeShip: async shipID => {
      await axios.delete(`/ships/${shipID}`);
      dispatch({ type: TYPES.REMOVE_SHIP, value: shipID });
    },
    selectShip: async shipID => {
      dispatch({ type: TYPES.SELECT_SHIP, value: shipID });
    },
    createShip: async payload => {
      const { data } = await axios.post('/ships', payload);
      dispatch({ type: TYPES.CREATE_SHIP, value: data });
    },
  };

  return [state, actions];
};
