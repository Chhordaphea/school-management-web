import StudentList from '@/components/student/StudentList'
import Head from 'next/head'
import React from 'react'

function index() {
    return (
        <div>
            <Head>
                <title>Students Page</title>
            </Head>
            <main>
                <StudentList />
                
            </main>
        </div>
    )
}

export default index