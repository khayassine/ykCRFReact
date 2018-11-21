import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFichePatient, defaultValue } from 'app/shared/model/fiche-patient.model';

export const ACTION_TYPES = {
  FETCH_FICHEPATIENT_LIST: 'fichePatient/FETCH_FICHEPATIENT_LIST',
  FETCH_FICHEPATIENT: 'fichePatient/FETCH_FICHEPATIENT',
  CREATE_FICHEPATIENT: 'fichePatient/CREATE_FICHEPATIENT',
  UPDATE_FICHEPATIENT: 'fichePatient/UPDATE_FICHEPATIENT',
  DELETE_FICHEPATIENT: 'fichePatient/DELETE_FICHEPATIENT',
  RESET: 'fichePatient/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFichePatient>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FichePatientState = Readonly<typeof initialState>;

// Reducer

export default (state: FichePatientState = initialState, action): FichePatientState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FICHEPATIENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FICHEPATIENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FICHEPATIENT):
    case REQUEST(ACTION_TYPES.UPDATE_FICHEPATIENT):
    case REQUEST(ACTION_TYPES.DELETE_FICHEPATIENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FICHEPATIENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FICHEPATIENT):
    case FAILURE(ACTION_TYPES.CREATE_FICHEPATIENT):
    case FAILURE(ACTION_TYPES.UPDATE_FICHEPATIENT):
    case FAILURE(ACTION_TYPES.DELETE_FICHEPATIENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FICHEPATIENT_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FICHEPATIENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FICHEPATIENT):
    case SUCCESS(ACTION_TYPES.UPDATE_FICHEPATIENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FICHEPATIENT):
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

const apiUrl = 'api/fiche-patients';

// Actions

export const getEntities: ICrudGetAllAction<IFichePatient> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FICHEPATIENT_LIST,
    payload: axios.get<IFichePatient>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IFichePatient> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FICHEPATIENT,
    payload: axios.get<IFichePatient>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFichePatient> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FICHEPATIENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFichePatient> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FICHEPATIENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFichePatient> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FICHEPATIENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
