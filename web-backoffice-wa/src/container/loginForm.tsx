import {Card, CardBody, Input, CardTitle, Button} from 'reactstrap'

function loginForm() {
    return(
        <div>
            <Card body outline className='loginForm'>
                <CardBody>
                <CardTitle tag="h5"> Admin login backoffice </CardTitle>
                <Input
                    bsSize="sm"
                    placeholder="enter username"
                />
                <Input
                    bsSize="sm"
                    placeholder="enter password"
                />
                <br />
                <Button className='loginButton' onClick={() => console.log("test")}>
                    Login
                </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export const Form = loginForm