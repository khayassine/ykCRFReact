import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITypeComposant, defaultValue } from 'app/shared/model/type-composant.model';

export const ACTION_TYPES = {
  FETCH_TYPECOMPOSANT_LIST: 'typeComposant/FETCH_TYPECOMPOSANT_LIST',
  FETCH_TYPECOMPOSANT: 'typeComposant/FETCH_TYPECOMPOSANT',
  CREATE_TYPECOMPOSANT: 'typeComposant/CREATE_TYPECOMPOSANT',
  UPDATE_TYPECOMPOSANT: 'typeComposant/UPDATE_TYPECOMPOSANT',
  DELETE_TYPECOMPOSANT: 'typeComposant/DELETE_TYPECOMPOSANT',
  RESET: 'typeComposant/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITypeComposant>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TypeComposantState = Readonly<typeof initialState>;

// Reducer

export default (state: TypeComposantState = initialState, action): TypeComposantState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TYPECOMPOSANT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TYPECOMPOSANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TYPECOMPOSANT):
    case REQUEST(ACTION_TYPES.UPDATE_TYPECOMPOSANT):
    case REQUEST(ACTION_TYPES.DELETE_TYPECOMPOSANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TYPECOMPOSANT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TYPECOMPOSANT):
    case FAILURE(ACTION_TYPES.CREATE_TYPECOMPOSANT):
    case FAILURE(ACTION_TYPES.UPDATE_TYPECOMPOSANT):
    case FAILURE(ACTION_TYPES.DELETE_TYPECOMPOSANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TYPECOMPOSANT_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TYPECOMPOSANT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TYPECOMPOSANT):
    case SUCCESS(ACTION_TYPES.UPDATE_TYPECOMPOSANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TYPECOMPOSANT):
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

const apiUrl = 'api/type-composants';

// Actions

export const getEntities: ICrudGetAllAction<ITypeComposant> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TYPECOMPOSANT_LIST,
    payload: axios.get<ITypeComposant>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITypeComposant> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TYPECOMPOSANT,
    payload: axios.get<ITypeComposant>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITypeComposant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TYPECOMPOSANT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITypeComposant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TYPECOMPOSANT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITypeComposant> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TYPECOMPOSANT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
