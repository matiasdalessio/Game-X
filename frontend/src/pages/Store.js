import React from "react"
import { connect } from 'react-redux';
import Header from "../components/Header";
import CardProduct from "../components/Store/CardProduct";
import CarruselStore from "../components/Store/CarruselStore";
import hardwareActions from '../redux/actions/hardwareActions';
import gamesActions from '../redux/actions/gamesActions';
import HeroStore from "../components/Store/HeroStore";
import Loader from '../components/Loader';
import StoreGame from "../components/Store/StoreGame";



class Store extends React.Component {

    

    toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    state = {
        games: [],
        hardware: [],
    }

    componentDidMount() {
        this.toTop()
        this.props.loadHardwares()
        this.props.loadGames()      
        this.setState({ games: this.props.allGames })
    }
    render() {

        return (
            <>
                {!this.props.allGames.length
                    ? (
                        <Loader />
                    )
                    : (
                        <>
                        <Header props={this.props.history}/>
                            <div className="containerStore">
                                <HeroStore heroGames={!this.props.preLoaderGames ? this.props.allGames.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 6) : this.props.allGames} />
                                <StoreGame />
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 style={{ fontSize: '2rem', color: 'white' }}>New games</h3>
                                    <div className="containerSlider" >
                                        {/* <CarruselStore games={this.props.allGames.splice(0, 8)} /> */}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        allHardwares: state.hardwareReducer.allHardwares,
        allGames: state.gamesReducer.allGames,
    }
}
const mapDispatchToProps = {
    loadHardwares: hardwareActions.loadHardwares,
    loadGames: gamesActions.loadGames
}
export default connect(mapStateToProps, mapDispatchToProps)(Store)
