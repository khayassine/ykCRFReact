import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISousRegion, defaultValue } from 'app/shared/model/sous-region.model';

export const ACTION_TYPES = {
  FETCH_SOUSREGION_LIST: 'sousRegion/FETCH_SOUSREGION_LIST',
  FETCH_SOUSREGION: 'sousRegion/FETCH_SOUSREGION',
  CREATE_SOUSREGION: 'sousRegion/CREATE_SOUSREGION',
  UPDATE_SOUSREGION: 'sousRegion/UPDATE_SOUSREGION',
  DELETE_SOUSREGION: 'sousRegion/DELETE_SOUSREGION',
  RESET: 'sousRegion/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISousRegion>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SousRegionState = Readonly<typeof initialState>;

// Reducer

export default (state: SousRegionState = initialState, action): SousRegionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SOUSREGION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SOUSREGION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SOUSREGION):
    case REQUEST(ACTION_TYPES.UPDATE_SOUSREGION):
    case REQUEST(ACTION_TYPES.DELETE_SOUSREGION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SOUSREGION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SOUSREGION):
    case FAILURE(ACTION_TYPES.CREATE_SOUSREGION):
    case FAILURE(ACTION_TYPES.UPDATE_SOUSREGION):
    case FAILURE(ACTION_TYPES.DELETE_SOUSREGION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOUSREGION_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOUSREGION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SOUSREGION):
    case SUCCESS(ACTION_TYPES.UPDATE_SOUSREGION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SOUSREGION):
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

const apiUrl = 'api/sous-regions';

// Actions

export const getEntities: ICrudGetAllAction<ISousRegion> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SOUSREGION_LIST,
    payload: axios.get<ISousRegion>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISousRegion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SOUSREGION,
    payload: axios.get<ISousRegion>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISousRegion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SOUSREGION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISousRegion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SOUSREGION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISousRegion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SOUSREGION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
