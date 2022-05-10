import { Spinner, Table, Button, Input, CardTitle } from 'reactstrap'

import { UniversalInput } from './universalInput'
import { UniversalTable } from './UniversalTable/universalTable'
import { UserEdit } from './userEdit'

import '../../css/containers/User/user.css'

interface AddUser {
    input: {
        email: any[],
        password: any[],
        username: any[],
        gender: any[],
    },
    loading: boolean,
    msg: string,
}

interface passedParameter {
    paramFor: string,
    dataState: AddUser,
    changeInput: (e: React.FormEvent<HTMLInputElement>, key: string) => void,
    universalEditSendButton: (role: string, methodParam: string) => void
}

export function addUser(
    parameterObject: passedParameter
) {
    return UniversalInput(
        "Add",
        parameterObject,
    )
}

export const AddUser = addUser

function deleteUser(
    data: Array<string>, 
    dataLoading: boolean, 
    tableAction: (arg: string) => void
) {
    return UniversalTable(
        "delete", 
        data, 
        dataLoading,
        (methodArg: string) => tableAction(methodArg)
    )
}

export const DeleteUser = deleteUser

function editUser(
    data: Array<string>, 
    dataLoading: boolean,
    tableAction: (arg: string) => void,
    editMode: boolean,
    parameterObject: passedParameter,
) {
    if(editMode) {
        return UserEdit(
            UniversalTable(
                "edit", 
                data, 
                dataLoading,
                (arg) => tableAction(arg),
            ),
            UniversalInput(
                "Edit",
                parameterObject,
            ),
            editMode,
            parameterObject.paramFor,
            (arg) => tableAction(arg)
        )
    }
    return UniversalTable(
        "edit", 
        data, 
        dataLoading,
        (arg) => tableAction(arg),
    )
}

export const EditUser = editUser

// list user component
function listUser(
    data: Array<string>, 
    dataLoading: boolean,
    tableAction: (arg: string) => void,
) {
    return UniversalTable(
        "list", 
        data, 
        dataLoading,
        (arg) => tableAction(arg),
    )
}

export const ListUser = listUser