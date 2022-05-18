import { UniversalInput } from '../universalInput'
import { UniversalTable } from '../universalTable'
import { UniversalBackButton } from '../universalButtonBackEdit'

interface AddUserStruct {
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
    dataState: AddUserStruct,
    editPassword: boolean,
    changeInput: (e: React.FormEvent<HTMLInputElement>, key: string) => void,
    universalEditSendButton: (methodParam: string) => void,
    changePasswordMode: (checkboxValue: boolean) => void,
}

interface deleteStructure {
    uid: string,
    username: string
}

function listUserAdmin(
    data: Array<string>, 
    dataLoading: boolean,
    tableAction: (method: string, uid: string, deleteData: deleteStructure) => void,
    editMode: boolean,
    parameterObject: passedParameter,
) {
    const inputParameter: any = !parameterObject.editPassword 
        ? {
            ...parameterObject,
            dataState: {
                ...parameterObject.dataState,
                input: {
                    email: [parameterObject.dataState.input.email[0], parameterObject.dataState.input.email[1]],
                    username: [parameterObject.dataState.input.username[0], parameterObject.dataState.input.username[1]],
                    gender: [parameterObject.dataState.input.gender[0], parameterObject.dataState.input.gender[1]],
                }
            }
        }
        : parameterObject
    if(editMode) {
        return UniversalBackButton(
            UniversalTable(
                "admin",
                data, 
                dataLoading,
                (method, uid, deleteData) => tableAction(method, uid, deleteData),
            ),
            UniversalInput(
                "Edit",
                inputParameter,
            ),
            editMode,
            parameterObject.paramFor,
            (method, uid, deleteData) => tableAction(method, uid, deleteData)
        )
    }
    return UniversalTable(
        "admin",
        data, 
        dataLoading,
        (method, uid, deleteData) => tableAction(method, uid, deleteData),
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