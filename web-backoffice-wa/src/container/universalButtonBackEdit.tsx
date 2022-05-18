import React, { ReactNode, Fragment } from 'react'
import { Button } from 'reactstrap'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

import '../css/containers/universalButtonBackEdit.css'

interface deleteStructure {
    uid: string,
    username: string
}

function universalBackButton(
    children: ReactNode, 
    inputComponent: ReactNode, 
    editMode: boolean,
    paramFor: string,
    editBack: (argParam: string, blank: string, deleteBlank: deleteStructure) => void,
) {
    return (
        editMode 
            ? (
                <Fragment>
                    <Button color='light' onClick={() => editBack("edit", "", {
                        uid: "",
                        username: "",
                    })}>
                        <BsFillArrowLeftCircleFill className='arrowIcon' /> Back to edit another {paramFor}
                    </Button>
                    {inputComponent}
                </Fragment>
            ) 
            : {children}
        
    )
}

export const UniversalBackButton = universalBackButton