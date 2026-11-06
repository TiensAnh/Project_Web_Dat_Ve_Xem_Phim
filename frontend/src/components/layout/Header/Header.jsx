import classNames from 'classnames/bind';
import style from './Header.module.css';
import Logo from '../../../assets/Logo/Logo.png';
import ArrowTop from '../../../assets/Icon/ArrowTop';
import Box_Search from './component/BoxSearch/Box_Search.jsx';
import AuthModal from './component/AuthModal/AuthModal.jsx';
import { useEffect, useRef, useState } from 'react';
const cx = classNames.bind(style);

function Header({ isFixed = true }) {
    const [isOpen,setIsOpen] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenAuth, setIsOpenAuth] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
    const searchref = useRef(null);
    const nav_items = [
        { id: 1, title: 'Lịch chiếu', path: '/lich-chieu' },
        { id:2,title: 'Rạp chiếu',type:'dropdown',
            children: [
                { id: 'all', name: 'Xem tất cả các rạp', path: '/rap-chieu' },
                { id: 'cgv', name: 'CGV', path: '/rap-chieu/cgv' },
                { id: 'lotte', name: 'Lotte Cinema', path: '/rap-chieu/lotte' },
                { id: 'galaxy', name: 'Galaxy Cinema', path: '/rap-chieu/galaxy' },
                { id: 'bhd', name: 'BHD Star', path: '/rap-chieu/bhd' },
                { id: 'beta', name: 'Beta Cinemas', path: '/rap-chieu/beta' },
                { id: 'cinestar', name: 'Cinestar', path: '/rap-chieu/cinestar' },
                { id: 'megags', name: 'Mega GS', path: '/rap-chieu/megags' },
            ],
        },
        { id:3,title: 'Phim chiếu', path: '/phim-chieu' },
        { id:4,title: 'Blog', path: '/blog' },
    ];

    useEffect(()=>{
        const handleScrollLock = ()=>{
            if(isOpen&&window.innerWidth < 992){
                    document.body.style.overflow ='hidden';
            }
            else{
                document.body.style.overflow ='unset';
            }
        }
        handleScrollLock();
        window.addEventListener('resize',handleScrollLock);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('resize',handleScrollLock);
        };
    },[isOpen]);
    useEffect(()=>{
        const handleCloseSearch = (event)=>{
            if(isOpenSearch && searchref.current && !searchref.current.contains(event.target)){
                setIsOpenSearch(false);
            }
        }
        document.addEventListener('mousedown',handleCloseSearch);
        return()=>{
            document.removeEventListener('mousedown',handleCloseSearch)
        }
    },[isOpenSearch])
    
    return(
        <header className={cx('wrapper', { 'not-fixed': !isFixed })}> 
            <div className = {cx('inner')}>              
                {/* Logo */}
                <div className = {cx('logo')}>
                    <a href="/"><img src={Logo} alt = "Logo TianMovie"/></a>
                </div>
                {/* Menu */} 
                <nav className = {cx('main-nav')}>
                    <ul className = {cx('menu')}> 
                        {nav_items.map((item,index )=>( 
                            <li key={index} className={cx('menu-items')}>
                                <a href={item.path}     
                                className={cx('menu-item-link',{'menu-item-link-dropdown': item.type === 'dropdown'})}
                                >
                                    <span>{item.title}</span>
                                    {item.children && <ArrowTop className={cx('menu-arrow')}/>}
                                </a>
                                {item.children && 
                                <ul className={cx('dropdown', {   'grid-2-col' : item.children.length> 4})}>
                                    {item.children.map((child,idx)=>(
                                        <li key = {idx} className={cx('dropdown-item')}> <a href={child.path} className={cx('dropdown-link')}>{child.name}</a></li>
                                    ))}
                                </ul>
                                }
                            </li>
                        ))}
                    </ul>
                    
                </nav>
                {/* mobile menu */}
                <div className={cx('action')}>
                    {/* search */}
                    <div className = {cx('search')} ref={searchref}>
                        <button className={cx('search-btn',{'search-btn-after': isOpenSearch})}
                            onClick={()=> setIsOpenSearch(!isOpenSearch)}
                        ><i className="fa-solid fa-magnifying-glass"></i></button>

                        <div className={cx('container-modal-search-relative', {'open-search' : isOpenSearch})}>
                            <Box_Search onClose={() => setIsOpenSearch(false)} />
                        </div>
                    </div>
                    {/* tabs */}
                    <div className= {cx('mobile-menu')}>
                        <button className = {cx('mobile-menu-btn')} onClick={()=> setIsOpen(!isOpen)}>
                            {isOpen ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars"></i>}
                        </button>
                    </div>
                </div>
                
                
                {/* login */}
                <div className = {cx('login')}>
                    <button 
                        className = {cx('login-btn')}
                        onClick={() => {
                            setAuthMode('login');
                            setIsOpenAuth(true);
                        }}
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
            {/* end inner */}
            <div className={cx('search-overlay', { 'open-overlay': isOpenSearch })} 
                onClick={() => setIsOpenSearch(false)}
            />
            <div className={cx('mobile-list', {open:isOpen} )} style= {{backgroundColor : 'white'}}>
                <nav> 
                    <ul className={cx('mobile-menu-list')}>   
                        {nav_items.map((item,index) =>(
                            <li key ={index} className={cx('mobile-menu-item-wrapper')}>
                                {item.children ? (
                                    <>
                                        <div 
                                            className={cx('mobile-item-header')}
                                            onClick={() => setOpenMobileSubmenu(prev => prev === item.id ? null : item.id)}
                                        >
                                            <span className={cx('mobile-item-title')}>{item.title}</span>
                                            <i className={cx('fa-solid', 'fa-chevron-down', 'mobile-arrow', {
                                                'mobile-arrow-rotated': openMobileSubmenu === item.id
                                            })}></i>
                                        </div>
                                        {openMobileSubmenu === item.id && (
                                            <ul className={cx('mobile-submenu')}>
                                                {item.children.map((child, idx) => (
                                                    <li key={idx} className={cx('mobile-submenu-item')}>
                                                        <a 
                                                            href={child.path} 
                                                            className={cx('mobile-submenu-link')}
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {child.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <div className={cx('mobile-item-header')}>
                                        <a 
                                            href={item.path} 
                                            className={cx('mobile-item-link')}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.title}
                                        </a>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className = {cx('mobile-action')}>
                        <button 
                            className = {cx('mobile-login-btn')}
                            onClick={() => {
                                setAuthMode('login');
                                setIsOpenAuth(true);
                                setIsOpen(false);
                            }}
                        >
                            Đăng nhập
                        </button>
                    </div>
                </nav>
            </div>

            {/* Popup Đăng nhập & Đăng ký */}
            <AuthModal 
                isOpen={isOpenAuth} 
                onClose={() => setIsOpenAuth(false)} 
                mode={authMode} 
                setMode={setAuthMode} 
            />
        </header>
    );
}
export default Header;
