import { UniversalInput } from '../universalInput'
import { UniversalTable } from '../universalTable'
import { UniversalBackButton } from '../universalButtonBackEdit'

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
    universalEditSendButton: (methodParam: string) => void
}

interface deleteStructure {
    uid: string,
    username: string
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
    tableAction: (method: string, uid: string, deleteData: deleteStructure) => void
) {
    return UniversalTable(
        "user",
        "delete", 
        data, 
        dataLoading,
        (method, uid, deleteData) => tableAction(method, uid, deleteData)
    )
}

export const DeleteUser = deleteUser

function editUser(
    data: Array<string>, 
    dataLoading: boolean,
    tableAction: (method: string, uid: string) => void,
    editMode: boolean,
    parameterObject: passedParameter,
) {
    if(editMode) {
        return UniversalBackButton(
            UniversalTable(
                "user",
                "edit", 
                data, 
                dataLoading,
                (method, uid) => tableAction(method, uid),
            ),
            UniversalInput(
                "Edit",
                parameterObject,
            ),
            editMode,
            parameterObject.paramFor,
            (method, uid) => tableAction(method, uid)
        )
    }
    return UniversalTable(
        "user",
        "edit", 
        data, 
        dataLoading,
        (method, uid) => tableAction(method, uid),
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
        "user",
        "list", 
        data, 
        dataLoading,
        (method) => tableAction(method),
    )
}

export const ListUser = listUser