import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRequette, defaultValue } from 'app/shared/model/requette.model';

export const ACTION_TYPES = {
  FETCH_REQUETTE_LIST: 'requette/FETCH_REQUETTE_LIST',
  FETCH_REQUETTE: 'requette/FETCH_REQUETTE',
  CREATE_REQUETTE: 'requette/CREATE_REQUETTE',
  UPDATE_REQUETTE: 'requette/UPDATE_REQUETTE',
  DELETE_REQUETTE: 'requette/DELETE_REQUETTE',
  RESET: 'requette/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRequette>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RequetteState = Readonly<typeof initialState>;

// Reducer

export default (state: RequetteState = initialState, action): RequetteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REQUETTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REQUETTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REQUETTE):
    case REQUEST(ACTION_TYPES.UPDATE_REQUETTE):
    case REQUEST(ACTION_TYPES.DELETE_REQUETTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REQUETTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REQUETTE):
    case FAILURE(ACTION_TYPES.CREATE_REQUETTE):
    case FAILURE(ACTION_TYPES.UPDATE_REQUETTE):
    case FAILURE(ACTION_TYPES.DELETE_REQUETTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REQUETTE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REQUETTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REQUETTE):
    case SUCCESS(ACTION_TYPES.UPDATE_REQUETTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REQUETTE):
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

const apiUrl = 'api/requettes';

// Actions

export const getEntities: ICrudGetAllAction<IRequette> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_REQUETTE_LIST,
    payload: axios.get<IRequette>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRequette> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REQUETTE,
    payload: axios.get<IRequette>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRequette> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REQUETTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRequette> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REQUETTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRequette> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REQUETTE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
