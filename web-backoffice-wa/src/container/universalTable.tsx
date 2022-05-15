import { Fragment } from 'react'
import { Spinner, Table, Button } from 'reactstrap'
import '../css/containers/universalTable.css'

interface deleteStructure {
    uid: string,
    username: string,
    role: string,
}

function universalTable(
    paramFor: string,
    action: string, 
    displayData: Array<string>, 
    loading: boolean,
    tableActionButton: (methodParam: string, uid: string, deleteData: deleteStructure) => void,
) {
    interface userDataStructure {
        id: string,
        username: string,
        email: string,
        gender: string,
        created: string,
        updated: string,
    }

    return (
        <Fragment>
            {action} {paramFor} that registered on whatsapp app
            <div className='userListTable'>
                {
                    loading
                        ? <Spinner className='spinner' />
                        : (
                            <Table
                                borderless
                                hover
                                responsive
                                size=""
                            >
                                <thead>
                                    <tr>
                                        {Object.keys(JSON.parse(displayData[0])).map((key) => <th key={key} style={{ textAlign: "center" }}>{key}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayData.map((elObject: string, index: number) => {
                                        const displayObject: any = JSON.parse(elObject) as userDataStructure
                                        displayObject.action = action
                                        return (
                                            <tr key={index} className='userListTableData'>
                                                {
                                                    paramFor === "user" 
                                                        ? <></>
                                                        : <td>
                                                            {displayObject.id}
                                                        </td>
                                                }
                                                <td>
                                                    {paramFor === "user" ? displayObject.id : JSON.stringify(displayObject.authenticated)}
                                                </td>
                                                <td>
                                                    {paramFor === "user" ? displayObject.username : displayObject.adminname}
                                                </td>
                                                <td>
                                                    {displayObject.email}
                                                </td>
                                                <td>
                                                    {displayObject.gender}
                                                </td>
                                                <td>
                                                    {displayObject.created}
                                                </td>
                                                <td>
                                                    {displayObject.updated}
                                                </td>
                                                {
                                                    displayObject.action !== "list" 
                                                        ? (
                                                            <td>
                                                                <Button 
                                                                    color={displayObject.action === "delete" ? "danger" : "info"}
                                                                    style={{color: "white", textTransform: "uppercase"}}
                                                                    onClick={() => tableActionButton(displayObject.action, displayObject.id, {
                                                                        uid: displayObject.id,
                                                                        username: displayObject.username,
                                                                        role: paramFor,
                                                                    })}
                                                                >
                                                                    {displayObject.action}
                                                                </Button>
                                                            </td>
                                                        ) : <></>
                                                }
                                                
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>

                        )
                }
            </div>
        </Fragment>
    )
}

export const UniversalTable = universalTable