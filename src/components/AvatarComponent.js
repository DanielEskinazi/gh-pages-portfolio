import React from 'react'
import { Avatar } from '@material-ui/core'
import avatar from "../avatar.jpeg";

export default function AvatarComponent() {
    return (
        <div>
            <Avatar alt="avatar" src={avatar} />
        </div>
    )
}
