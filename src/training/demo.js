import {createStore} from 'redux';



var inittialState ={
    status: false,
    sort:{
        by:'name',
        value:1
    }

}


var reducer =(state = inittialState, action)=>{
    if(action.type ==='CHANGE_STATUS'){
        state.status =!state.status
        return state
    }
    if(action.type=== 'SORT'){
        state.sort={
            by:action.sort.by,
            value:action.sort.value
        }
        return state;
        
    }   
    return state;
}
const store = createStore(reducer)
console.log( 'defaul state:',store.getState());
//action// - - thay doi status - - //
var action ={type:'CHANGE_STATUS'}

store.dispatch(action)
console.log( 'defaul state:',store.getState());
/////////////////////
var action2 ={
    type:'SORT',
    sort:{
        by:'name',
        value: -1
    }
}
store.dispatch(action2)
console.log( 'sort:',store.getState());