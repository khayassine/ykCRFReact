import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IValidationComposant, defaultValue } from 'app/shared/model/validation-composant.model';

export const ACTION_TYPES = {
  FETCH_VALIDATIONCOMPOSANT_LIST: 'validationComposant/FETCH_VALIDATIONCOMPOSANT_LIST',
  FETCH_VALIDATIONCOMPOSANT: 'validationComposant/FETCH_VALIDATIONCOMPOSANT',
  CREATE_VALIDATIONCOMPOSANT: 'validationComposant/CREATE_VALIDATIONCOMPOSANT',
  UPDATE_VALIDATIONCOMPOSANT: 'validationComposant/UPDATE_VALIDATIONCOMPOSANT',
  DELETE_VALIDATIONCOMPOSANT: 'validationComposant/DELETE_VALIDATIONCOMPOSANT',
  RESET: 'validationComposant/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IValidationComposant>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ValidationComposantState = Readonly<typeof initialState>;

// Reducer

export default (state: ValidationComposantState = initialState, action): ValidationComposantState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VALIDATIONCOMPOSANT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VALIDATIONCOMPOSANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VALIDATIONCOMPOSANT):
    case REQUEST(ACTION_TYPES.UPDATE_VALIDATIONCOMPOSANT):
    case REQUEST(ACTION_TYPES.DELETE_VALIDATIONCOMPOSANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VALIDATIONCOMPOSANT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VALIDATIONCOMPOSANT):
    case FAILURE(ACTION_TYPES.CREATE_VALIDATIONCOMPOSANT):
    case FAILURE(ACTION_TYPES.UPDATE_VALIDATIONCOMPOSANT):
    case FAILURE(ACTION_TYPES.DELETE_VALIDATIONCOMPOSANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VALIDATIONCOMPOSANT_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VALIDATIONCOMPOSANT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VALIDATIONCOMPOSANT):
    case SUCCESS(ACTION_TYPES.UPDATE_VALIDATIONCOMPOSANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VALIDATIONCOMPOSANT):
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

const apiUrl = 'api/validation-composants';

// Actions

export const getEntities: ICrudGetAllAction<IValidationComposant> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VALIDATIONCOMPOSANT_LIST,
    payload: axios.get<IValidationComposant>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IValidationComposant> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VALIDATIONCOMPOSANT,
    payload: axios.get<IValidationComposant>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IValidationComposant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VALIDATIONCOMPOSANT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IValidationComposant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VALIDATIONCOMPOSANT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IValidationComposant> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VALIDATIONCOMPOSANT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
