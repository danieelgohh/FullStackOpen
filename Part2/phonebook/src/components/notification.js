const Notification = ({ message, errMessage }) => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const errStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null && errMessage === null)
    {
        return null
    }

    else if (message != null && errMessage === null)
    {
        return (
            <div style={successStyle}>
                {message}
            </div>
        )
    }

    else if (message === null && errMessage != null)
    {
        return (
            <div style={errStyle}>
                {errMessage}
            </div>
        )
    }

}

export default Notification