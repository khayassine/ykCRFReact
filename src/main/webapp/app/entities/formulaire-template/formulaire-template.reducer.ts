import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFormulaireTemplate, defaultValue } from 'app/shared/model/formulaire-template.model';

export const ACTION_TYPES = {
  FETCH_FORMULAIRETEMPLATE_LIST: 'formulaireTemplate/FETCH_FORMULAIRETEMPLATE_LIST',
  FETCH_FORMULAIRETEMPLATE: 'formulaireTemplate/FETCH_FORMULAIRETEMPLATE',
  CREATE_FORMULAIRETEMPLATE: 'formulaireTemplate/CREATE_FORMULAIRETEMPLATE',
  UPDATE_FORMULAIRETEMPLATE: 'formulaireTemplate/UPDATE_FORMULAIRETEMPLATE',
  DELETE_FORMULAIRETEMPLATE: 'formulaireTemplate/DELETE_FORMULAIRETEMPLATE',
  RESET: 'formulaireTemplate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFormulaireTemplate>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FormulaireTemplateState = Readonly<typeof initialState>;

// Reducer

export default (state: FormulaireTemplateState = initialState, action): FormulaireTemplateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FORMULAIRETEMPLATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FORMULAIRETEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FORMULAIRETEMPLATE):
    case REQUEST(ACTION_TYPES.UPDATE_FORMULAIRETEMPLATE):
    case REQUEST(ACTION_TYPES.DELETE_FORMULAIRETEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FORMULAIRETEMPLATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FORMULAIRETEMPLATE):
    case FAILURE(ACTION_TYPES.CREATE_FORMULAIRETEMPLATE):
    case FAILURE(ACTION_TYPES.UPDATE_FORMULAIRETEMPLATE):
    case FAILURE(ACTION_TYPES.DELETE_FORMULAIRETEMPLATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FORMULAIRETEMPLATE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FORMULAIRETEMPLATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FORMULAIRETEMPLATE):
    case SUCCESS(ACTION_TYPES.UPDATE_FORMULAIRETEMPLATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FORMULAIRETEMPLATE):
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

const apiUrl = 'api/formulaire-templates';

// Actions

export const getEntities: ICrudGetAllAction<IFormulaireTemplate> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FORMULAIRETEMPLATE_LIST,
    payload: axios.get<IFormulaireTemplate>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IFormulaireTemplate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FORMULAIRETEMPLATE,
    payload: axios.get<IFormulaireTemplate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFormulaireTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FORMULAIRETEMPLATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFormulaireTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FORMULAIRETEMPLATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFormulaireTemplate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FORMULAIRETEMPLATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
