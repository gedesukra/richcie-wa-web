import { UniversalInput } from '../universalInput'
import { UniversalTable } from '../universalTable'
import { UniversalBackButton } from '../universalButtonBackEdit'

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

function listUserAdmin(
    data: Array<string>, 
    dataLoading: boolean,
    tableAction: (arg: string) => void,
) {
    return UniversalTable(
        "admin",
        "list", 
        data, 
        dataLoading,
        (method) => tableAction(method),
    )
}

export const ListUserAdmin = listUserAdmin

function addUserAdmin(
    parameterObject: passedParameter
) {
    return UniversalInput(
        "Add",
        parameterObject,
    )
}

export const AddUserAdmin = addUserAdmin

function editUserAdmin(
    data: Array<string>, 
    dataLoading: boolean,
    tableAction: (method: string, uid: string) => void,
    editMode: boolean,
    parameterObject: passedParameter,
) {
    if(editMode) {
        return UniversalBackButton(
            UniversalTable(
                "admin",
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
        "admin",
        "edit", 
        data, 
        dataLoading,
        (method, uid) => tableAction(method, uid),
    )
}

export const EditUserAdmin = editUserAdmin

function deleteUserAdmin(
    data: Array<string>, 
    dataLoading: boolean, 
    tableAction: (method: string, uid: string, deleteData: deleteStructure) => void
) {
    return UniversalTable(
        "admin",
        "delete", 
        data, 
        dataLoading,
        (method, uid, deleteData) => tableAction(method, uid, deleteData)
    )
}

export const DeleteUserAdmin = deleteUserAdmin