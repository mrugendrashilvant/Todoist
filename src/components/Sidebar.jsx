import React from 'react'

export default function Sidebar({ selectedTab, setSelectedTab }) {
    const [name, setname] = React.useState("");
    function changeStateNow(value) {
        setSelectedTab(value);
        setname(value);
        console.log(name, value)
    }
    return (
        <>
            <div className="sidebar">
                <div className={name === "INBOX" ? "active" : "nothing"} onClick={() => { changeStateNow("INBOX") }}><i className="bi bi-inbox-fill"></i> Inbox</div>
                <div className={name === "TODAY" ? "active" : "nothing"} onClick={() => { changeStateNow("TODAY") }}><i className="bi bi-calendar2-day"></i> Today</div>
                <div className={name === "NEXT_7" ? "active" : "nothing"} onClick={() => { changeStateNow("NEXT_7") }}><i className="bi bi-calendar-event"></i> Next 7 days</div>
            </div>
        </>
    )
}
