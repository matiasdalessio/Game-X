import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import swal from 'sweetalert'
import userActions from '../redux/actions/userActions'
import Chat from './Chat'
import SimplePopover from "./Popover";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Cart from './Cart'



const Header = (props) =>{ 

        console.log(props)
    
    const [openChat, setOpenChat] = useState(false)
    const [favouritesList, setFavouriteslist] = useState([])
    const visibility = props.open ? "visible" : "hidden"

    const logOut=(()=> {
        swal({
            title: "Are you sure that you want to Log Out?",
            text: "You can Log in again, anyway",
            icon: "warning",
            buttons: ["No Way!", "I'm Sure!"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                props.removeUserInfo()
                swal("Okay then, see you later!", {
                    icon: "success",
                });
            } 
        });
    })


    useEffect(()=>{
        if(props.userLogged && props.favouritesList.length){
            const fetchProducts = async()=>{
                const list = await props.getProductsOnList(props.userLogged.id)
                setFavouriteslist(list)
            } 
            fetchProducts()
        }else{
            setFavouriteslist([])
        }
    // eslint-disable-next-line
    },[props.favouritesList])

    
    let image = ""
    
    if ( props.userLogged  && props.userLogged.imageUrl) {
        image = props.userLogged.imageUrl
    } else if ( props.userLogged && !props.userLogged.imageUrl && props.userLogged.avatar) {
        image = props.userLogged.avatar      
    } else {
        image = "/assets/generic-user-icon.jpg"
    }
    const [reloaded, setReloaded]=useState(false)
    useEffect(()=>{
        setReloaded(!reloaded)
    }, [props.inCart])
    const [displayModal, setDisplayModal] = useState(false)
    const openCloseModal = ()=>{
        setDisplayModal(!displayModal)
    }
    var modal = {
        display : displayModal ? 'flex' : 'none',
    }
    console.log(props.inCart)
    return(
        <>
            <div className='containHeader animate__animated animate__fadeIn animate__delay-1s'>
                <NavLink to='/'>
                    <div className='logoHeader'>
                        <div className='gifLogo animate__animated animate__fadeInLeft animate__delay-1s' style={{backgroundImage:'url("../assets/logoGif.gif")'}}></div>
                        <h1 className='nameLogoHeader animate__animated animate__fadeIn animate__delay-3s'>Game-X</h1>
                    </div>
                </NavLink>
                <div className='animate__animated animate__fadeIn animate__delay-1s'style={{display:'flex', flexDirection:'row'}}>
                    <div className='navbarMenu '>
                            <div className="navigation" style={{marginRight:'100px'}}>
                                <input type="checkbox"/>
                                <span></span>
                                <span></span>
                                <div className="menuNav" >
                                    <NavLink to='/'><li>Home</li></NavLink>
                                    <NavLink to='/games'><li>Games</li></NavLink>
                                    <NavLink to='/hardware'><li>Hardware</li></NavLink>
                                    {props.userLogged && props.userLogged.rol === "admin" && <NavLink to='/admin'><li >Adm Panel</li></NavLink>}
                                    {!props.userLogged && <NavLink to='/access'><li>Access</li></NavLink>}
                                    <li className='cartHeader' onClick={openCloseModal}><FontAwesomeIcon icon={faShoppingCart} className='iconHeaderCart'/>{props.allCart.length}</li>
                                </div>
                            </div>
                    </div>
                    <div className='profileBody animate__animated animate__fadeIn animate__delay-2s'>
                            <div className="nav">
                                <input type="checkbox"/>
                                <div style={{backgroundImage: `url("${image}")`}} className="avatarHeader" />
                                {props.userLogged &&
                                <div className="menu">
                                    <SimplePopover favouritesList={favouritesList} props={props.props}/>
                                    <li >My Buys</li>
                                    <li onClick={()=> setOpenChat(!openChat)}>Chat</li>
                                    <li onClick={(e)=>logOut(e.target)}>LogOut</li>
                                </div>}
                            </div>
                    </div>
                </div>
                <div className="popOverBody" style={{visibility: visibility}}>        
                    <div className="con-tooltip left">
                        <p> Left </p>
                        <div className="tooltip ">
                            <p>Left</p>
                        </div>

                    </div>
                </div>
                <Chat open = {openChat}/>
            </div>  
            <div style={modal}>
                <Cart openCloseModal={openCloseModal} props={props.props}/> 
            </div>  
        </>   
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged,
        favouritesList: state.userReducer.favouritesList,
        allCart: state.cartReducer.allCart
    }
  }
  const mapDispatchToProps = {
    removeUserInfo :  userActions.removeUserInfo,
    getProductsOnList: userActions.getProductsOnList
  
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Header)