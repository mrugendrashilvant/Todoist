import React from 'react';
import Task from './Task';
import Sidebar from './Sidebar';

export default function Content() {
    const [selectedTab, setSelectedTab] = React.useState("INBOX")
    return (
        <>
            <section className="content">
                <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <Task selectedTab={selectedTab} />
            </section>
        </>
    )
}
