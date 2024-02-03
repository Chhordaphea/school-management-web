import TeacherList from '@/components/teacher/TeacherList'
import Head from 'next/head'
import React from 'react'

const index = () => {
    return (
        <div>
            <Head>
                <title>Teachers Page</title>
            </Head>
            <main>
                <TeacherList />
            </main>
        </div>
    )
}

export default index