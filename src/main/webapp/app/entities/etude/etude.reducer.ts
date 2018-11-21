import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEtude, defaultValue } from 'app/shared/model/etude.model';

export const ACTION_TYPES = {
  FETCH_ETUDE_LIST: 'etude/FETCH_ETUDE_LIST',
  FETCH_ETUDE: 'etude/FETCH_ETUDE',
  CREATE_ETUDE: 'etude/CREATE_ETUDE',
  UPDATE_ETUDE: 'etude/UPDATE_ETUDE',
  DELETE_ETUDE: 'etude/DELETE_ETUDE',
  RESET: 'etude/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEtude>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EtudeState = Readonly<typeof initialState>;

// Reducer

export default (state: EtudeState = initialState, action): EtudeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ETUDE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ETUDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ETUDE):
    case REQUEST(ACTION_TYPES.UPDATE_ETUDE):
    case REQUEST(ACTION_TYPES.DELETE_ETUDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ETUDE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ETUDE):
    case FAILURE(ACTION_TYPES.CREATE_ETUDE):
    case FAILURE(ACTION_TYPES.UPDATE_ETUDE):
    case FAILURE(ACTION_TYPES.DELETE_ETUDE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETUDE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETUDE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ETUDE):
    case SUCCESS(ACTION_TYPES.UPDATE_ETUDE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ETUDE):
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

const apiUrl = 'api/etudes';

// Actions

export const getEntities: ICrudGetAllAction<IEtude> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ETUDE_LIST,
  payload: axios.get<IEtude>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEtude> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ETUDE,
    payload: axios.get<IEtude>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEtude> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ETUDE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEtude> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ETUDE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEtude> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ETUDE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
