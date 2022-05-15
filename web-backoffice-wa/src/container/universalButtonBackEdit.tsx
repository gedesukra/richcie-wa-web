import { ReactNode, Fragment } from 'react'
import { Button } from 'reactstrap'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

import '../css/containers/universalButtonBackEdit.css'

function universalBackButton(
    children: ReactNode, 
    inputComponent: ReactNode, 
    editMode: boolean,
    paramFor: string,
    editBack: (argParam: string, blank: string) => void,
) {
    return (
        editMode 
            ? (
                <Fragment>
                    <Button color='light' onClick={() => editBack("edit", "")}>
                        <BsFillArrowLeftCircleFill className='arrowIcon' /> Back to edit another {paramFor}
                    </Button>
                    {inputComponent}
                </Fragment>
            ) 
            : {children}
        
    )
}

export const UniversalBackButton = universalBackButton