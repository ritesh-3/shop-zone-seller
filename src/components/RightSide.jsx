import React from 'react'
import Updates from './Updates'
import { styles } from '../styles/styles'

const RightSide = () => {
    return (
        <div className='RightSide'>
            <div className='flex flex-col justify-evenly items-center gap-6 mt-6'>
                <h1 className={`${styles.dashboardTitle} `} >Updates</h1>
                <Updates />
            </div>


        </div>
    )
}

export default RightSide
