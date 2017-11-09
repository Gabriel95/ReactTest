import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'
import Fish from "./Fish";
import base from '../Base'

class App extends React.Component
{
    constructor()
    {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.deleteFish = this.deleteFish.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);

        //Initial State
        this.state = {
            fishes: {},
            order: {}
        };
    }


    componentWillMount()
    {
        //This runs before the app is render
        this.ref = base.syncState(`${this.props.params.storeid}/fishes`,
            {
                context: this,
                state: 'fishes'
            });

        //check if there any order in local storage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeid}`);

        if(localStorageRef)
        {
            //update our App component's state
            this.setState({
               order: JSON.parse(localStorageRef)
            });
        }

    }

    componentWillUnmount()
    {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState)
    {
        localStorage.setItem(`order-${this.props.params.storeid}`, JSON.stringify(nextState.order));
    }

    addFish(fish)
    {
        //update state
        const fishes = {...this.state.fishes};
        //add new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        //set states
        this.setState({fishes});
    }

    updateFish(key, updatedFish)
    {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }

    deleteFish(key)
    {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }

    loadSamples()
    {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder(key)
    {
        //take copy of state
        const order = {...this.state.order};
        //update or add the new number of the fish ordered
        order[key] = order[key] + 1 || 1;
        //update the state
        this.setState({order});
    }

    deleteOrder(key)
    {
        //take copy of state
        const order = {...this.state.order};
        //delete
        delete order[key];
        //update the state
        this.setState({order});
    }



    render()
    {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Sea Food Market"/>
                    <ul className={"list-of-fishes"}>
                        {
                            Object.keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes} params={this.props.params} deleteOrder={this.deleteOrder}/>
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    storeId={this.props.params.storeid}
                />
            </div>

        );
    }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;