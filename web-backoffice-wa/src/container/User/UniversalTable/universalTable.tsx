import { Fragment } from 'react'
import { Spinner, Table, Button } from 'reactstrap'
import '../../../css/containers/User/UserInnerContainer/innerUser.css'

function universalTable(
    action: string, 
    displayData: Array<string>, 
    loading: boolean,
    tableActionButton: (methodParam: string) => void,
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
            {action} user that registered on whatsapp app
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
                                                <td>
                                                    {displayObject.id}
                                                </td>
                                                <td>
                                                    {displayObject.username}
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
                                                                    onClick={() => tableActionButton(displayObject.action)}
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