import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IComposantTemplate, defaultValue } from 'app/shared/model/composant-template.model';

export const ACTION_TYPES = {
  FETCH_COMPOSANTTEMPLATE_LIST: 'composantTemplate/FETCH_COMPOSANTTEMPLATE_LIST',
  FETCH_COMPOSANTTEMPLATE: 'composantTemplate/FETCH_COMPOSANTTEMPLATE',
  CREATE_COMPOSANTTEMPLATE: 'composantTemplate/CREATE_COMPOSANTTEMPLATE',
  UPDATE_COMPOSANTTEMPLATE: 'composantTemplate/UPDATE_COMPOSANTTEMPLATE',
  DELETE_COMPOSANTTEMPLATE: 'composantTemplate/DELETE_COMPOSANTTEMPLATE',
  RESET: 'composantTemplate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IComposantTemplate>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ComposantTemplateState = Readonly<typeof initialState>;

// Reducer

export default (state: ComposantTemplateState = initialState, action): ComposantTemplateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPOSANTTEMPLATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPOSANTTEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPOSANTTEMPLATE):
    case REQUEST(ACTION_TYPES.UPDATE_COMPOSANTTEMPLATE):
    case REQUEST(ACTION_TYPES.DELETE_COMPOSANTTEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPOSANTTEMPLATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPOSANTTEMPLATE):
    case FAILURE(ACTION_TYPES.CREATE_COMPOSANTTEMPLATE):
    case FAILURE(ACTION_TYPES.UPDATE_COMPOSANTTEMPLATE):
    case FAILURE(ACTION_TYPES.DELETE_COMPOSANTTEMPLATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPOSANTTEMPLATE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPOSANTTEMPLATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPOSANTTEMPLATE):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPOSANTTEMPLATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPOSANTTEMPLATE):
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

const apiUrl = 'api/composant-templates';

// Actions

export const getEntities: ICrudGetAllAction<IComposantTemplate> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COMPOSANTTEMPLATE_LIST,
    payload: axios.get<IComposantTemplate>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IComposantTemplate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPOSANTTEMPLATE,
    payload: axios.get<IComposantTemplate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IComposantTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPOSANTTEMPLATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IComposantTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPOSANTTEMPLATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IComposantTemplate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPOSANTTEMPLATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
