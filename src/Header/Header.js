import './Header.css';
import { Link } from 'react-router';
import { CheckSquare } from 'lucide-react';

function Header() {
    return (
        <header className='app-header'>
            <div className='app-width-45 app-header-main-title'>
                <CheckSquare size={32} className='' id='checksquare'/>
                <h1 className='app-margin-0'>Ma todo</h1>
            </div>
            <div className='app-width-45'>
                <Link className='app-header-nav-button' to="/about">A propos</Link>
            </div>
        </header>
    )
}

export default Header;