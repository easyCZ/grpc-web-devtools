import { combineReducers } from 'redux'
import grpc, {GrpcState} from './grpc';
import {RootAction} from "../actions/index";



interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    grpc: GrpcState,
}



const rootReducer = combineReducers<RootState>({
    grpc
});

export default rootReducer;
