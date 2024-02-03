import ClassList from '@/components/classes/ClassList'
import Head from 'next/head'
import React from 'react'

function index() {
    return (
        <div>
            <Head>
                <title>Classes Page</title>
            </Head>
            <main>
                <ClassList />
                
            </main>
        </div>
    )
}

export default index