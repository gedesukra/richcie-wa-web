import { ReactNode, Fragment } from 'react'
import { Button } from 'reactstrap'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

import '../../css/containers/User/userEdit.css'

function userEdit(
    children: ReactNode, 
    inputComponent: ReactNode, 
    editMode: boolean,
    paramFor: string,
    editBack: (argParam: string) => void,
) {
    return (
        editMode 
            ? (
                <Fragment>
                    <Button color='light' onClick={() => editBack("edit")}>
                        <BsFillArrowLeftCircleFill className='arrowIcon' /> Back to edit another {paramFor}
                    </Button>
                    {inputComponent}
                </Fragment>
            ) 
            : {children}
        
    )
}

export const UserEdit = userEdit