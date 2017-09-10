
import {ActionType, WindowMessage} from "../../mpi";

export type GrpcState = any[];

const initialState: GrpcState = [];

export default function grpcReducer(state : GrpcState = initialState, action: WindowMessage) {

    // const { id, payload } = action;
    //
    // switch (action.action) {
    //
    //     case ActionType.REQUEST_START:
    //
    //         return {
    //             ...state,
    //             [id]: payload
    //         }
    //
    //
    // }

    return [...state, action.payload];


    // console.log('grpc reducer', state, action);
    //
    // return state;
}