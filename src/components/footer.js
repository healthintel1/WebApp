import { Link } from "gatsby"
import React from "react"

const Footer = ({ siteTitle }) => (
    <footer
        style={{
            position: 'relative',
            background: `white`,
            marginTop: '5rem',
            display: 'flex',
            flexDirection: 'row',
        }}
    >
        <div
            className={'flex'}
            style={{
                margin: `0 auto`,
                padding: `1.45rem 1.0875rem`,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <p style={{ margin: 10, fontSize: '1.2rem' }}>
               powered by
            </p>
            <img height={80} src={require("../images/HealthIntelLogo.svg")}/>
        </div>
    </footer>
);

export default Footer
