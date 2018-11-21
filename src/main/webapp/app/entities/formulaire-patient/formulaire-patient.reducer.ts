import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFormulairePatient, defaultValue } from 'app/shared/model/formulaire-patient.model';

export const ACTION_TYPES = {
  FETCH_FORMULAIREPATIENT_LIST: 'formulairePatient/FETCH_FORMULAIREPATIENT_LIST',
  FETCH_FORMULAIREPATIENT: 'formulairePatient/FETCH_FORMULAIREPATIENT',
  CREATE_FORMULAIREPATIENT: 'formulairePatient/CREATE_FORMULAIREPATIENT',
  UPDATE_FORMULAIREPATIENT: 'formulairePatient/UPDATE_FORMULAIREPATIENT',
  DELETE_FORMULAIREPATIENT: 'formulairePatient/DELETE_FORMULAIREPATIENT',
  RESET: 'formulairePatient/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFormulairePatient>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FormulairePatientState = Readonly<typeof initialState>;

// Reducer

export default (state: FormulairePatientState = initialState, action): FormulairePatientState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FORMULAIREPATIENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FORMULAIREPATIENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FORMULAIREPATIENT):
    case REQUEST(ACTION_TYPES.UPDATE_FORMULAIREPATIENT):
    case REQUEST(ACTION_TYPES.DELETE_FORMULAIREPATIENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FORMULAIREPATIENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FORMULAIREPATIENT):
    case FAILURE(ACTION_TYPES.CREATE_FORMULAIREPATIENT):
    case FAILURE(ACTION_TYPES.UPDATE_FORMULAIREPATIENT):
    case FAILURE(ACTION_TYPES.DELETE_FORMULAIREPATIENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FORMULAIREPATIENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FORMULAIREPATIENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FORMULAIREPATIENT):
    case SUCCESS(ACTION_TYPES.UPDATE_FORMULAIREPATIENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FORMULAIREPATIENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/formulaire-patients';

// Actions

export const getEntities: ICrudGetAllAction<IFormulairePatient> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FORMULAIREPATIENT_LIST,
  payload: axios.get<IFormulairePatient>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFormulairePatient> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FORMULAIREPATIENT,
    payload: axios.get<IFormulairePatient>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFormulairePatient> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FORMULAIREPATIENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFormulairePatient> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FORMULAIREPATIENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFormulairePatient> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FORMULAIREPATIENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
