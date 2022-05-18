import React, { Fragment } from 'react'
import { Spinner, Button, Input, CardTitle } from 'reactstrap'

import '../css/universalInput.css'

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
    editPassword: boolean,
    changeInput: (e: React.FormEvent<HTMLInputElement>, key: string) => void,
    universalEditSendButton: (methodParam: string) => void,
    changePasswordMode: (checkboxValue: boolean) => void,
}

function universalInput(
    methodArgs: string,
    parameterObject: passedParameter,
) {
    return (
    <Fragment>
                {
                    parameterObject.dataState.loading 
                        ? <Spinner className='spinner' /> 
                        : (
                            Object.keys(parameterObject.dataState.input).map((el: any) => {
                                if(el === "gender") {
                                    return (
                                        <Input
                                            key={el}
                                            type='select' 
                                            className='inputDiv' 
                                            value={parameterObject.dataState.input[el as keyof AddUser["input"]][0]}
                                            onChange={(e) => parameterObject.changeInput(e, el)}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Input>
                                    )
                                }
                                return (
                                    <div key={el}>
                                        <Input
                                            required
                                            aria-required
                                            className='inputDiv'
                                            placeholder={el} 
                                            value={parameterObject.dataState.input[el as keyof AddUser["input"]][0]} 
                                            onChange={(e) => parameterObject.changeInput(e, el)}
                                            invalid={!parameterObject.dataState.input[el as keyof AddUser["input"]][1] as any as boolean}
                                            type={
                                                el === "password" 
                                                    ? "password"
                                                    : "text"
                                            }
                                            style={{
                                                "textTransform": el === "email"
                                                    ? "lowercase"
                                                    : "none"
                                            }}
                                        />
                                        {
                                            !parameterObject.dataState.input[el as keyof AddUser["input"]][1] as any as boolean
                                                ? <p style={{"color": "red"}}>{el} tidak valid / tidak boleh kosong !</p>
                                                : <Fragment />
                                        }
                                    </div>
                                )
                            })
                        )
                }
                {
                    methodArgs === "Edit"
                        ? (
                            <div className='divChecbox'>
                                <Input className='passwordCheckbox' type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => parameterObject.changePasswordMode(e.target.checked)} checked={parameterObject.editPassword} />
                                <h4 className='passwordCheckParagraph'>Edit password for {parameterObject.paramFor}</h4>
                            </div>
                        )
                        : <Fragment />
                }
                <Button 
                    color='primary' 
                    className='userAddButton' 
                    onClick={() => parameterObject.universalEditSendButton(methodArgs)} 
                    disabled={parameterObject.dataState.loading}
                >
                    {methodArgs} {parameterObject.paramFor}
                </Button>
    </Fragment>
    )
}

export const UniversalInput = universalInput