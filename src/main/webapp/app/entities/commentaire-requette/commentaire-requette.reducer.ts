import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICommentaireRequette, defaultValue } from 'app/shared/model/commentaire-requette.model';

export const ACTION_TYPES = {
  FETCH_COMMENTAIREREQUETTE_LIST: 'commentaireRequette/FETCH_COMMENTAIREREQUETTE_LIST',
  FETCH_COMMENTAIREREQUETTE: 'commentaireRequette/FETCH_COMMENTAIREREQUETTE',
  CREATE_COMMENTAIREREQUETTE: 'commentaireRequette/CREATE_COMMENTAIREREQUETTE',
  UPDATE_COMMENTAIREREQUETTE: 'commentaireRequette/UPDATE_COMMENTAIREREQUETTE',
  DELETE_COMMENTAIREREQUETTE: 'commentaireRequette/DELETE_COMMENTAIREREQUETTE',
  RESET: 'commentaireRequette/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICommentaireRequette>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CommentaireRequetteState = Readonly<typeof initialState>;

// Reducer

export default (state: CommentaireRequetteState = initialState, action): CommentaireRequetteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMMENTAIREREQUETTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMMENTAIREREQUETTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMMENTAIREREQUETTE):
    case REQUEST(ACTION_TYPES.UPDATE_COMMENTAIREREQUETTE):
    case REQUEST(ACTION_TYPES.DELETE_COMMENTAIREREQUETTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMMENTAIREREQUETTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMMENTAIREREQUETTE):
    case FAILURE(ACTION_TYPES.CREATE_COMMENTAIREREQUETTE):
    case FAILURE(ACTION_TYPES.UPDATE_COMMENTAIREREQUETTE):
    case FAILURE(ACTION_TYPES.DELETE_COMMENTAIREREQUETTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMMENTAIREREQUETTE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMMENTAIREREQUETTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMMENTAIREREQUETTE):
    case SUCCESS(ACTION_TYPES.UPDATE_COMMENTAIREREQUETTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMMENTAIREREQUETTE):
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

const apiUrl = 'api/commentaire-requettes';

// Actions

export const getEntities: ICrudGetAllAction<ICommentaireRequette> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COMMENTAIREREQUETTE_LIST,
    payload: axios.get<ICommentaireRequette>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICommentaireRequette> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMMENTAIREREQUETTE,
    payload: axios.get<ICommentaireRequette>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICommentaireRequette> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMMENTAIREREQUETTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICommentaireRequette> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMMENTAIREREQUETTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICommentaireRequette> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMMENTAIREREQUETTE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
