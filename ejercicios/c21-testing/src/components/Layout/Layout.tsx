import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout