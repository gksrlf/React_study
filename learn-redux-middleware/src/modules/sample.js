import { createAction, handleActions } from 'redux-actions'
import { call, put, takeLatest } from '@redux-saga/core/effects'
import * as api from '../lib/api'
import { startLoading, finishLoading } from './loading'
import createRequestThunk from '../lib/createRequestThunk'
import createRequestSaga from '../lib/createRequestSaga'

//  액션 타입을 선언합니다.
//  한 요청당 세 개를 만들어야 합니다.

const GET_POST = 'sample/GET_POST'
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS'
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE'

const GET_USERS = 'sample/GET_USERS'
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS'
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE'

export const getPost = createAction(GET_POST, (id) => id)
export const getUsers = createAction(GET_USERS)

const getPostSaga = createRequestSaga(GET_POST, api.getPost)
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers)

export function* sampleSaga() {
	yield takeLatest(GET_POST, getPostSaga)
	yield takeLatest(GET_USERS, getUsersSaga)
}

//  초기 상태를 선언합니다.
//  요청의 로딩 중 상태는 loading이라는 객체에서 관리합니다.

const initialState = {
	loading: {
		GET_POST: false,
		GET_USERS: false,
	},
	post: null,
	users: null,
}

const sample = handleActions(
	{
		[GET_POST_SUCCESS]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				GET_POST: false, //  요청 완료
			},
			post: action.payload,
		}),

		[GET_USERS_SUCCESS]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				GET_USERS: false, //  요청 완료
			},
			users: action.payload,
		}),
	},
	initialState,
)

export default sample
