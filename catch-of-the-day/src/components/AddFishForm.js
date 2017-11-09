import React from 'react';

class AddFishForm extends React.Component
{
    createFish(event){
        event.preventDefault();
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            description: this.description.value,
            image: this.image.value,
        };
        this.props.addFish(fish);
        this.fishform.reset();
    }



    render()
    {
        return(
            <form ref={(input) => this.fishform = input} className="fish-edit" onSubmit={(e) => this.createFish(e)}>
                <input ref={(input) => this.name = input} type="text" placeholder="Fish Name"/>
                <input ref={(input) => this.price = input} type="text" placeholder="Fish Price"/>
                <select ref={(input) => this.status = input}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={(input) => this.description = input} type="text" placeholder="Fish Desc"/>
                <input ref={(input) => this.image = input} type="text" placeholder="Fish Image"/>
                <button type="submit">+ Add Item</button>
            </form>
        );
    }
}

AddFishForm.propTypes={
  addFish: React.PropTypes.func.isRequired
};

export default AddFishForm;