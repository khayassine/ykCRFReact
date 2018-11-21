import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRegleValidation, defaultValue } from 'app/shared/model/regle-validation.model';

export const ACTION_TYPES = {
  FETCH_REGLEVALIDATION_LIST: 'regleValidation/FETCH_REGLEVALIDATION_LIST',
  FETCH_REGLEVALIDATION: 'regleValidation/FETCH_REGLEVALIDATION',
  CREATE_REGLEVALIDATION: 'regleValidation/CREATE_REGLEVALIDATION',
  UPDATE_REGLEVALIDATION: 'regleValidation/UPDATE_REGLEVALIDATION',
  DELETE_REGLEVALIDATION: 'regleValidation/DELETE_REGLEVALIDATION',
  RESET: 'regleValidation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRegleValidation>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RegleValidationState = Readonly<typeof initialState>;

// Reducer

export default (state: RegleValidationState = initialState, action): RegleValidationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REGLEVALIDATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REGLEVALIDATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REGLEVALIDATION):
    case REQUEST(ACTION_TYPES.UPDATE_REGLEVALIDATION):
    case REQUEST(ACTION_TYPES.DELETE_REGLEVALIDATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REGLEVALIDATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REGLEVALIDATION):
    case FAILURE(ACTION_TYPES.CREATE_REGLEVALIDATION):
    case FAILURE(ACTION_TYPES.UPDATE_REGLEVALIDATION):
    case FAILURE(ACTION_TYPES.DELETE_REGLEVALIDATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REGLEVALIDATION_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REGLEVALIDATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REGLEVALIDATION):
    case SUCCESS(ACTION_TYPES.UPDATE_REGLEVALIDATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REGLEVALIDATION):
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

const apiUrl = 'api/regle-validations';

// Actions

export const getEntities: ICrudGetAllAction<IRegleValidation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_REGLEVALIDATION_LIST,
    payload: axios.get<IRegleValidation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRegleValidation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REGLEVALIDATION,
    payload: axios.get<IRegleValidation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRegleValidation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REGLEVALIDATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRegleValidation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REGLEVALIDATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRegleValidation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REGLEVALIDATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
