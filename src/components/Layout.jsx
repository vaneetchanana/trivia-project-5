import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {

    const [apiOptions, setApiOptions] = useState({
        category: 'any',
        number: 10
    })

    return (
        <Outlet context={{ apiOptions: apiOptions, setApiOptions: setApiOptions }} />
    )
}

export default Layout